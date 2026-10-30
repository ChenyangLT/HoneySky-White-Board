# HoneySky 白板文档格式（.hswb）规范 v1

本文档描述 HoneySky White Board 1.0 的文档容器格式与内部数据结构，供备份、迁移、审阅以及第三方工具读取使用。
实现源码：src/HoneySky.Core/Serialization/（HswbFormat.cs、HswbManifest.cs、DocumentCodec.cs、HswbPackage.cs、DocumentMigrator.cs）。

## 1. 概述

- 扩展名：.hswb；资源管理器文件类型名称：HoneySky 白板文档。
- 外层容器：标准 ZIP（deflate 压缩，可选任意 ZIP 工具解包查看）。
- 文本编码：UTF-8。**本实现写出 manifest.json 时不带 BOM**（v1.0.0 修复：带 BOM 会让第三方 `JsonDocument.Parse(byte[])` 解析失败），读取端兼容带/不带 BOM。
- 当前写出格式版本：1.1（format_version = 1.1）；读取端接受 1.0 与 1.1（1.0 文档按默认笔尖读取，见第 5 节 StrokeObject 的 Key 15）。
- 校验：对压缩后的文档数据与每个图片资源分别记录 SHA-256（小写十六进制）。
- 安全性：MessagePack 使用 UntrustedData 模式反序列化，禁止类型注入；渲染层不执行脚本。
- 兼容策略：读取时 format_version 大于当前软件支持版本（> 1.1）将拒绝打开并提示升级；1.0 文档可直接读取，DocumentMigrator 负责归一化；写入器始终写 1.1。

## 2. ZIP 内部结构

    my-board.hswb                 (ZIP)
    ├── manifest.json             必需，UTF-8 JSON（无 BOM），描述元数据与校验和
    ├── document.msgpack.gz       必需，GZip 压缩的 MessagePack 文档数据
    ├── assets/images/<id>.<ext>  可选，图片资源（png/jpg/webp）
    └── previews/thumbnail.png    可选，首页缩略图（PNG）

条目名区分大小写，固定使用上述相对路径，不带前导斜杠。读取时缺少 manifest.json 或 document.msgpack.gz 会直接判定文件无效。

## 3. manifest.json

采用 System.Text.Json 序列化，属性名为 snake_case，缩进输出。示例：

    {
      "format_version": 1.1,
      "app_version": "1.1.2",
      "document_id": "3f1c9a7e5b6d4c2e8a0f1b2c3d4e5f60",
      "document_name": "未命名白板",
      "page_count": 3,
      "created_utc": "2026-10-30T10:00:00+00:00",
      "modified_utc": "2026-10-30T10:05:12+00:00",
      "document_sha256": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
      "assets": [
        {
          "id": "img_7f3a",
          "entry": "assets/images/img_7f3a.png",
          "mime_type": "image/png",
          "size": 48213,
          "sha256": "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae"
        }
      ],
      "preview_entry": "previews/thumbnail.png"
    }

字段说明：

| 字段 | 类型 | 必需 | 说明 |
|---|---|---|---|
| format_version | 数字（可带小数） | 是 | 容器与数据格式版本，当前写出 1.1；读取接受 1.0 与 1.1 |
| app_version | 字符串 | 否 | 写入时的软件版本，仅作记录 |
| document_id | 字符串 | 是 | 文档唯一标识（GUID 的 N 格式，32 位十六进制） |
| document_name | 字符串 | 否 | 文档名称，缺省为“未命名白板” |
| page_count | 整数 | 否 | 页面数量，用于快速展示 |
| created_utc | 时间 | 否 | 创建时间（ISO 8601，带时区偏移） |
| modified_utc | 时间 | 否 | 最后修改时间 |
| document_sha256 | 字符串 | 是 | document.msgpack.gz 的 SHA-256（小写十六进制） |
| assets | 数组 | 否 | 图片资源清单 |
| preview_entry | 字符串/空 | 否 | 缩略图条目路径；为空表示未内嵌缩略图 |

assets 数组元素字段：

| 字段 | 类型 | 说明 |
|---|---|---|
| id | 字符串 | 资源标识，与 ImageObject.AssetId 对应 |
| entry | 字符串 | ZIP 内条目路径，写入时为 assets/images/ + 安全化 id + 扩展名 |
| mime_type | 字符串 | image/png、image/jpeg、image/webp |
| size | 整数 | 原始字节数 |
| sha256 | 字符串 | 资源原始字节的 SHA-256 |

安全化规则：写入时 id 只保留字母、数字、连字符与下划线；若过滤后为空则使用随机 GUID。

## 4. document.msgpack.gz

- 内容：BoardDocument 的 MessagePack 二进制表示。
- MessagePack 序列化选项：ContractlessStandardResolver 之外的 Standard 解析器，并启用 Security 的 UntrustedData（仅允许已标注 [MessagePackObject] 的类型）。
- 压缩：GZip，CompressionLevel.Optimal（.NET 的 GZipStream）。
- SHA-256 校验的是压缩后的字节（即 ZIP 中的原样内容），与 manifest.document_sha256 比较。

### 4.1 对象模型与 MessagePack 键

所有对象均使用显式 Key 索引（不允许按属性名映射）。未列出的键属于保留字段，读取时应忽略。

BoardDocument

| Key | 类型 | 说明 |
|---|---|---|
| 0 | 整数 | schema_version，当前为 1 |
| 1 | 字符串 | document_id（GUID N 格式） |
| 2 | 字符串 | 文档名称，默认“未命名白板” |
| 3 | 时间 | created_utc |
| 4 | 时间 | modified_utc |
| 5 | 数组 | pages，BoardPage 列表 |
| 6 | 整数 | current_page_index（从 0 开始） |
| 7 | 字符串 | app_version |

BoardPage

| Key | 类型 | 说明 |
|---|---|---|
| 0 | 字符串 | page_id |
| 1 | 字符串 | 页面名称 |
| 2 | 字符串 | background_color，#AARRGGBB，默认 #FFFFFFFF |
| 3 | 对象 | viewport，ViewportState |
| 4 | 数组 | objects，BoardObject 列表（按 Z 排序绘制） |

BoardObject（抽象基类，Union 索引决定具体类型）

| Key | 类型 | 说明 |
|---|---|---|
| 0 | 字符串 | object_id |
| 1 | 整数 | z（绘制层级，越大越靠上） |
| Union 0 | 对象 | StrokeObject（笔迹） |
| Union 1 | 对象 | ShapeObject（图形） |
| Union 2 | 对象 | ImageObject（图片） |

StrokeObject（Key 10 起）

| Key | 类型 | 说明 |
|---|---|---|
| 10 | 字符串 | color，#AARRGGBB，默认 #FF1F2329 |
| 11 | 小数 | width，取值范围 0.25–96.0，默认 3.0 |
| 12 | 枚举 | kind：Pen=0、Highlighter=1 |
| 13 | 布尔 | pressure_enabled（是否按压感变宽） |
| 14 | 数组 | points，StrokePoint 列表（权威数据：原始采样点） |
| 15 | 枚举 | brush_tip：Pen=0、Marker=1、Brush=2；缺省按 Pen 读取（1.0 文档没有此字段） |

ShapeObject（Key 10 起）

| Key | 类型 | 说明 |
|---|---|---|
| 10 | 枚举 | kind：Line=0、Arrow=1、Rectangle=2、Ellipse=3 |
| 11 | 对象 | start，PointD |
| 12 | 对象 | end，PointD |
| 13 | 字符串 | stroke_color，#AARRGGBB |
| 14 | 字符串 | fill_color，#AARRGGBB，默认 #00000000（透明） |
| 15 | 小数 | stroke_width，默认 3.0 |

ImageObject（Key 10 起）

| Key | 类型 | 说明 |
|---|---|---|
| 10 | 字符串 | asset_id，对应 manifest.assets[].id |
| 11 | 对象 | rect，RectD（世界坐标） |
| 12 | 小数 | opacity，0.0–1.0，默认 1.0 |
| 13 | 小数 | rotation_degrees，默认 0 |

StrokePoint

| Key | 类型 | 说明 |
|---|---|---|
| 0 | 小数 | x（世界坐标） |
| 1 | 小数 | y（世界坐标） |
| 2 | 浮点 | pressure，0.0–1.0 |
| 3 | 整数 | timestamp_ms（相对笔迹开始的毫秒数） |
| 4 | 浮点 | tilt_x，默认 0 |
| 5 | 浮点 | tilt_y，默认 0 |

ViewportState

| Key | 类型 | 说明 |
|---|---|---|
| 0 | 小数 | center_x（世界坐标） |
| 1 | 小数 | center_y（世界坐标） |
| 2 | 小数 | zoom，范围 0.02–32.0，默认 1.0 |

PointD：Key 0 = x，Key 1 = y（均为小数）。
RectD：Key 0 = x，Key 1 = y，Key 2 = width，Key 3 = height（均为小数）。

## 5. 读取与校验流程（参考实现）

1. 以只读方式打开 ZIP；查找 manifest.json 并反序列化。
2. 校验 format_version 在 1.0 与当前支持版本（1.1）之间；大于 1.1 拒绝，1.0 归一化为 1.1。
3. 读取 document.msgpack.gz，计算 SHA-256 并与 manifest 比较，不匹配即报“文档校验失败”。
4. MessagePack 反序列化为 BoardDocument，再经 DocumentMigrator 归一化（不支持的版本报错，未来版本在此加入迁移步骤）。
5. 逐条读取 assets 清单中的条目并校验 SHA-256；缺失的条目跳过（图片显示为占位提示）。
6. 读取 previews/thumbnail.png（存在时）用于文件打开对话框缩略图。

## 6. 兼容性与版本演进

- 新增字段必须赋予新 Key 索引，不得复用或改变既有 Key 的含义。
- 删除字段时保留其 Key 编号不再使用（保留段）。
- 结构不兼容的变更必须提升 format_version，并在 DocumentMigrator 中实现从旧版本到新版本的迁移。
- 读取器必须能打开所有 format_version ≤ 当前版本的文档；写入器始终写当前版本。

### 6.1 v1.1 格式变更

- `format_version` 由 `1` 提升为 `1.1`：笔迹对象新增 `brush_tip`（Key 15），其余结构与 Key 编号不变。
- 读取 1.0 文档时 `brush_tip` 缺失，按 `Pen` 处理，渲染效果与旧版一致；保存后写为 1.1。
- 1.0 版读取器打开 1.1 文档会因 `format_version` 超范围而拒绝（符合“未来版本拒绝”策略），不尝试忽略新字段。

## 7. 互操作建议

- 只读工具可直接用 ZIP + JSON 解析 manifest，不需要 MessagePack 之外的依赖。
- 修改文档后必须重算 document_sha256，以及受影响资源的 sha256，否则软件会判定文件损坏。
- 不要依赖 ZIP 条目的物理顺序；按 manifest 与固定条目名定位。
- 时间字段统一使用 UTC 偏移表示，避免本地时区歧义。