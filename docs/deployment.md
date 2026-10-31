# HoneySky White Board 部署与运维指南

适用版本：1.2.1（1.0.0/1.1.0/1.1.1/1.1.2/1.1.3/1.2.0 升级说明见第 8 节）｜ 面向学校机房管理员、企业 IT 运维与批量部署场景 ｜ 更新日期：2026-10-31

日常使用说明见 `docs/user-guide.md`，安装包清单与源码构建见 `README.md`。

---

## 1. 系统要求

| 项目 | 要求 |
| --- | --- |
| 操作系统 | Windows 10 1809（10.0.17763）及以上、Windows 11；仅 x64，不支持 32 位与 ARM64 |
| 运行时 | 无需预装 .NET：发布物为**自包含**（自带 .NET 8 运行时与 WPF 组件） |
| 磁盘 | 安装后约 300 MB（自包含载荷）；用户数据按实际文档增长 |
| 显卡 | 支持 DirectX 9 及以上的显卡；软件渲染可用（性能降低） |
| 输入设备 | 鼠标、触摸屏、触控笔（压感需 Windows Ink 支持的数字笔） |
| 网络 | 可选。仅「网络授时」「问 AI（AI 助手）与讲台内问 AI」「DeepSeek 余额查询」需要网络，离线时自动回退/禁用 |
| 权限 | 安装与卸载需要管理员权限（perMachine）；日常运行**不需要**管理员权限 |

---

## 2. 部署形态选择

| 形态 | 适用 | 说明 |
| --- | --- | --- |
| EXE（Inno Setup） | 单机、少量机器、需要交互式卸载提示 | 图形向导，可静默 |
| MSI（WiX 5） | 域内组策略/Intune/SCCM 批量部署 | 标准 MSI，支持 `/qn` 静默与卸载 |
| 绿色便携版 zip | 机房漫游机、U 盘、无安装权限的临时机器 | 解压即用，数据写程序目录下 `Data\` |

同一台机器**只装一种**：EXE 与 MSI 同时安装会造成两套卸载信息与重复快捷方式。绿色版可与安装版共存，但要避免把便携目录放在 `Program Files`（不可写会回退到 `%LOCALAPPDATA%`）。

---

## 3. 静默安装

### 3.1 EXE 安装包（Inno Setup）

```bat
rem 静默安装到默认目录（C:\Program Files\HoneySky White Board）
HoneySkyWhiteBoard-1.2.1-win-x64-setup.exe /VERYSILENT /SUPPRESSMSGBOXES /NORESTART /SP- /LOG="%TEMP%\hswb-install.log"

rem 指定安装目录 + 不创建桌面图标（如安装脚本提供该任务）
HoneySkyWhiteBoard-1.2.1-win-x64-setup.exe /VERYSILENT /SUPPRESSMSGBOXES /NORESTART /DIR="D:\Apps\HoneySky White Board" /LOG="%TEMP%\hswb-install.log"
```

- `/VERYSILENT` 无界面；`/SUPPRESSMSGBOXES` 不弹确认框；`/LOG=` 输出安装日志便于审计。
- 静默安装不会自动启动程序（`skipifsilent`）。
- 退出码：`0` 成功，`非 0` 失败（详见日志）。

### 3.2 MSI 安装包（WiX）

```bat
rem 静默安装（全机器）
msiexec /i "HoneySkyWhiteBoard-1.2.1-win-x64.msi" /qn /norestart ALLUSERS=1 /l*v "%TEMP%\hswb-msi-install.log"

rem 静默卸载
msiexec /x "HoneySkyWhiteBoard-1.2.1-win-x64.msi" /qn /norestart /l*v "%TEMP%\hswb-msi-uninstall.log"

rem 仅解包（不安装），用于分发前检查文件清单
msiexec /a "HoneySkyWhiteBoard-1.2.1-win-x64.msi" /qb TARGETDIR="D:\hswb-unpack"
```

- 退出码 `0` 成功；`3010` 成功但需要重启；`1603` 致命错误（多为权限/文件占用/安装包损坏）。
- 静默安装/卸载都不会弹「是否删除用户数据」的对话框，**用户数据一律保留**。

---

## 4. 文件关联（.hswb）

安装包注册 `.hswb` 文件关联（ProgId：`HoneySkyWhiteBoard.Document`），双击白板文档即可用本软件打开；主程序启动时解析命令行中的 `.hswb` 路径并直接打开该文档（文件不存在时只记录 WARN 日志并正常启动，不弹错）。

若企业策略禁止修改 HKCR/文件关联，安装仍可成功，只是双击文档时需「打开方式」手动指定 `HoneySkyWhiteBoard.exe`。

---

## 5. 数据位置与重定向

| 场景 | 数据根目录 |
| --- | --- |
| 安装版（默认） | `%LOCALAPPDATA%\HoneySky White Board\` |
| 绿色便携版 | `程序目录\Data\`（目录不可写时回退到 `%LOCALAPPDATA%`） |
| 显式指定 | 环境变量 `HONEYSKY_DATA_DIR`（优先级最高） |

子目录：`Documents`（文档与自动保存副本）、`Settings`（`settings.json`、`api-key.dat`）、`Cache`、`Thumbnails`、`Recovery`（异常恢复）、`Logs`（`app.log`，不含密钥）。

- 数据按**当前 Windows 用户**隔离：同机多账号各自独立；漫游配置文件会随用户漫游。
- 建议不要把 `HONEYSKY_DATA_DIR` 指到慢速网络盘（自动保存与缩略图缓存会明显变慢）；确需集中存储时，让用户把 `.hswb` 保存到网络盘，本地数据目录保持在本机。
- 备份策略：备份 `Documents` 目录即可覆盖全部用户文档；`Settings` 含 DPAPI 加密的 API Key，跨机器复制后不可解密（需在新机器重新填写）。

---

## 6. 卸载与数据保留策略

- 交互式卸载（控制面板/开始菜单/`msiexec /x` 带界面）会启动 `HoneySkyCleanup.exe`，询问是否**同时删除个人文档、设置和缓存**，**默认不勾选**（保留数据）。
- 静默卸载不弹任何窗口，直接保留用户数据。
- 确需批量清理用户数据时，在卸载后单独执行（需逐用户上下文或指定数据根）：

```bat
rem 只读检查（不删除任何文件），退出码 0 表示检查通过
"C:\Program Files\HoneySky White Board\HoneySkyCleanup.exe" --check-only --data-root "%LOCALAPPDATA%\HoneySky White Board"
```

清理工具只处理数据根目录下的 `Documents`/`Settings`/`Cache`/`Thumbnails`/`Recovery`/`Logs` 六个子目录，不会触碰其他路径；删除前有二次确认。

---

## 7. 网络与安全

| 能力 | 目标 | 协议/端口 | 关闭方式 |
| --- | --- | --- | --- |
| 网络授时 | `ntp.aliyun.com`（SNTP）及设置中的 HTTP 时间源 | UDP 123 / HTTPS 443 | 设置 → 时钟相关开关，或断网时自动回退系统时间 |
| 更新检测 | `api.github.com` 的 Release 接口及镜像回退 | HTTPS 443 | 全部失败时静默跳过，不影响使用；不自动下载安装 |
| 问 AI（AI 助手）与讲台内问 AI | 用户自行配置的 OpenAI 兼容服务 BaseUrl | HTTPS 443（按 BaseUrl） | 不配置即完全不发起请求（默认状态未配置） |
| DeepSeek 余额 | DeepSeek 官方域名（仅官方接口时） | HTTPS 443 | 设置 → AI → 关闭余额查询 |

- 程序**不包含**遥测、崩溃上报、广告或任何后台自动上传；未经用户点击「发送」不会上传图片与文字。
- API Key 使用 Windows DPAPI（当前用户范围）加密存储在 `Settings\api-key.dat`，日志中不输出。
- 程序未做代码签名：高安全环境（AppLocker/WDAC/SmartScreen）请按发布包 SHA-256 建立允许规则，或先行测试放行。

---

## 8. v1.2.1 升级部署（1.2.0 → 1.2.1；1.0.0–1.2.0 也可直接升至 1.2.1）

1.2.1 与 1.2.0/1.1.3/1.1.2/1.1.1/1.1.0/1.0.0 使用同一数据目录（%LOCALAPPDATA%\HoneySky White Board\）、同一 MSI UpgradeCode 与同一 Inno AppId，**升级不需要迁移数据或改设置**；.hswb 文档保持向后兼容（旧文档可直接打开，阶段 B 以实际 formatVersion 核对）。

### 8.1 EXE（Inno Setup）就地升级

```bat
rem 直接运行 1.2.1 安装包覆盖安装（可覆盖 1.2.0/1.1.3/1.1.2/1.1.1/1.1.0/1.0.0，无需先卸载）
HoneySkyWhiteBoard-1.2.1-win-x64-setup.exe /VERYSILENT /SUPPRESSMSGBOXES /NORESTART /SP- /LOG="%TEMP%\hswb-upgrade.log"
```

- 安装器按相同 AppId 识别旧版本并覆盖程序文件；用户数据目录不在安装目录内，升级不会删除文档、设置与缓存。
- 升级完成后在「⋯ → 关于」应显示 1.2.1；旧 .hswb 可直接打开。
- 回滚：卸载 1.2.1 时保留用户数据，再安装 1.2.0 包即可（1.2.0 三产物仍在 dist）；更早版本的回滚包与 SHA-256 见 dist/checksums 下的对应清单。

### 8.2 MSI（WiX）MajorUpgrade

```bat
rem 直接安装 1.2.1 MSI，MajorUpgrade 自动移除旧版本（1.2.0 及更早）的 ProductCode 后再安装新版本
msiexec /i "HoneySkyWhiteBoard-1.2.1-win-x64.msi" /qn /norestart ALLUSERS=1 /l*v "%TEMP%\hswb-msi-upgrade.log"
```

- 升级依赖 UpgradeCode {B7D41E2A-9C33-4F6B-8E21-5A0C3D9F6B14} 保持不变；1.2.1 使用新 ProductCode {3F3B8A2E-5C9D-4E52-9C3A-0B7D6E1F9A24}（1.2.0 为 {76D23280-...}，1.1.3 为 {BFDCCCFB-...}，1.1.2 为 {09C801FF-...}，1.1.1 为 {5734561E-...}）。
- 不要把不同版本/不同封装形态交叉安装（例如 EXE 装旧版、MSI 装新版会留下两套卸载信息）。
- MSI 会阻止降级（1.2.1 已安装时再装更早版本会提示并回滚）；确需回滚先卸载 1.2.1（保留数据）再安装目标版本。

### 8.3 v1.2.1 新交互对部署的影响（含 1.2.0 界面行为）

- **启动即全屏**：1.2.1 启动后直接进入全屏，班级展示场景更快；需要窗口态时用顶栏「还原」或 `Esc`/`F11` 退出全屏。若机房使用窗口管理策略强制窗口尺寸，请实测是否被策略拉回窗口。
- **翻页条全屏按钮**：右下翻页条新增全屏开关，等效 F11；不影响既有缩放与适应页面按钮。
- **缩略图显示数量可设**：页面缩略图条只显示设定数量的页面，数量记入用户设置；还原卡/案例部署会使该设置回到默认值。
- **工具切换修复**：橡皮与形状互切不再取消工具，属纯行为修复，无部署影响。
- **关于页动画与水印**：品牌动画默认每 5 秒循环（可在设置→动画调整间隔 2–30 秒或关闭）；全屏水印不拦截鼠标。
- 1.2.0 引入的界面行为（Dock 位置记忆、启动动画 `--no-splash`、PDF/Word 导入缓存、更新检测、讲台拍照、B 站头像）仍适用，详见下方原条目。
- 顶栏改为一行的极简栏（40px），工具收到底部 Dock；`F11` 进入全屏（隐藏顶栏，左上角显示品牌水印）。纯界面变化，不需要额外权限。
- 底部 Dock 可左右拖动，位置写入用户设置（`General.DockOffsetRatio`，默认居中）；机房若使用桌面冻结/还原卡，用户拖动位置会被重置为默认，属预期。
- 启动动画（420×300 启动画面）可用命令行参数 `--no-splash` 跳过，或在「设置 → 通用」关闭「显示启动动画」；慢机器上动画最长等主窗口首帧就绪，不阻塞启动。
- 导入 PDF/Word 会把渲染后的背景位图缓存到 `%LOCALAPPDATA%\HoneySky White Board\Cache\import\`；大文件（>200 页）只渲染当前页附近。部署时按用户文档量预留磁盘（单页位图约数 MB，可在数据目录中清理）。
- 启动后约 3 秒会静默检查一次更新（访问 `api.github.com` 的 Release 接口，5 秒超时，失败自动切换镜像并静默跳过）；内网/无外网时不影响使用，也不会自动下载或安装。若机房需要完全禁网，保持默认即可，无需特别配置。
- 讲台拍照的照片只存在内存（单次会话最多 12 张），保存 PNG 时写入用户选择的目录（默认「文档」），不写安装目录。
- 「设置 → 关于」页会尝试加载作者 B 站头像（外网请求，失败回退内置图标），内网环境显示内置图标属正常。
- 1.2.1 的安装包、文档与官网同时发布在 GitHub 公开仓库（不含源码，专有许可）；企业内网无法访问 GitHub 时使用离线安装包与 SHA-256 清单校验。

### 8.4 升级后检查

1. 「⋯ → 关于」显示 1.2.1，数据目录正确。
2. 打开一份 1.0.0 或 1.1.x 保存的 .hswb，内容正常（旧文档按钢笔笔尖兼容读取）。
3. 资源管理器双击 .hswb 仍能打开（文件关联未被破坏）。
4. 旧用户数据与设置保留；卸载 1.2.1（静默）后数据仍在。
5. 界面为 v1.2.1 新布局：顶栏一行、底部 Dock、左下页面缩略图条、右下翻页条；点 Dock 最右「⋯」可打开设置。
6. 启动即为全屏；右下翻页条的全屏按钮可切换全屏/窗口；缩略图条按设置数量显示。

---

## 9. 批量部署检查清单

1. 在代表性机型（含触控一体机）上做一次冒烟：启动 → 书写 → 保存 `.hswb` → 关闭 → 双击文档重新打开。
2. 确认卸载后 `%LOCALAPPDATA%\HoneySky White Board` 仍在（数据保留策略生效）。
3. 确认杀软/EDR 未隔离安装目录下的自包含 exe/dll（首次分发建议加白名单）。
4. 若教室无外网：确认时钟回退提示可接受、AI 功能保持未配置状态。
5. 若使用触控笔：在目标机型上验证压感与手掌误触抑制是否符合预期（压感可在设置中关闭）。
6. 记录发布包 SHA-256（`dist/checksums/SHA256SUMS.txt`）归档，便于后续审计与升级比对。

---

## 10. 常见部署问题

| 现象 | 原因与处理 |
| --- | --- |
| 安装被 SmartScreen 拦截 | 未签名。核验 SHA-256 后「仍要运行」，或由 IT 预先放行哈希 |
| `1603` 安装失败 | 常见为文件被占用（先退出旧版本）、权限不足、或磁盘空间不足；查看 `/l*v` 日志定位 |
| 静默安装后无快捷方式 | 静默安装仍会创建开始菜单项；桌面图标取决于安装选项/策略（见安装脚本 Tasks） |
| 用户数据找不到 | 安装版在 `%LOCALAPPDATA%`（不是安装目录）；绿色版在程序目录 `Data\`；可用 `HONEYSKY_DATA_DIR` 覆盖 |
| 双击 `.hswb` 打不开 | 文件关联被其他软件占用，或策略禁止；改用程序内「文件 → 打开」 |
| AI 一直不可用 | 未配置服务（BYOK，软件不预置任何服务），需在设置 → AI 服务中填写 BaseUrl/Model/Key |

技术支持需要收集的信息：版本号（设置 → 关于）、`Logs\app.log`、复现步骤、是否需要网络授时/AI。
