# HoneySky White Board

HoneySky White Board（蜜空白板）是一款面向 Windows 10/11 x64 的桌面白板软件，用于在线授课、讲解、会议板书与个人草稿。它提供无限画布上的压感书写、屏幕直尺与圆规、时钟倒计时、摄像头与截图、以及可对接任意 OpenAI 兼容服务的 AI 讲解面板。

- 版本：1.2.3
- 平台：Windows 10 1809（10.0.17763）及以上，仅 x64
- 技术栈：C# / .NET 8 / WPF / SkiaSharp / MessagePack
- 开发者：Chen_yang_LT
- 许可：专有软件，见 LICENSE-PROPRIETARY.txt 与 EULA.txt

## 1. 功能

### 画布与书写
- 无限画布，鼠标、触摸、触控笔均可操作；触控笔按压感改变笔迹粗细。
- 钢笔、马克笔、毛笔三种笔尖（压感/等宽/强压感锥形），荧光笔半透明混色且同一笔迹内部不叠加透明度。
- 点笔/荧光笔/橡皮弹出二级面板，直接选颜色、粗细与笔尖；旧版文档按钢笔笔尖兼容读取。
- 局部擦除（按擦除圆形/胶囊切分笔迹，而不是用白色覆盖）与整笔擦除。
- 套索选择、移动、缩放；直线、箭头、矩形、椭圆图形工具。
- 单指/双指手势平移与以手势中心缩放；触摸默认不写字，可在设置中允许手指绘制。
- 撤销/重做；多页面；页面栏缩略图；自动保存与崩溃恢复。

### 屏幕教具
- 屏幕直尺：可拖动、旋转、调整长度，显示厘米/毫米刻度，可测量两点距离（未校准时标注“估算”）。
- 屏幕圆规：可设置圆心、半径与角度，确认后把圆绘制到画布。
- 时钟：大字号当前时间（默认字号 1.15、首次居中），支持网络授时（NTP/HTTP，可配置服务器，失败回退系统时间并标注）。
- 倒计时：设置时长、开始/暂停/继续/重置；剩余 3/2/1 秒逐秒提示音，结束播放另一种提示音。

### v1.1.3 改进（时钟与倒计时，历史）
- 时钟/倒计时独立窗口的文字渲染改为 Ideal 格式化模式 + 灰度抗锯齿，放大字号后不再发虚。
- 时钟时间默认字号由 1.0 提升到 1.15，首次打开居中显示，之后恢复用户保存的位置与字号。
- 倒计时最后 3 秒逐秒提示音，归零播放结束音效（可在时钟窗口设置中调整音量/静音）。

### AI 讲解（需自备 OpenAI 兼容服务）
- 支持摄像头拍照、本地图片、剪贴板图片、当前页面截图作为提问图片。
- 图片自动预处理：最长边不超过 2048 像素，最终不超过 2MB，并在界面显示压缩信息。
- 流式回答，支持 Markdown 与 LaTeX 公式渲染。
- 多轮对话，保留系统提示词、当前图片与最近 8 轮，按 token 估算预留 20% 上下文，超出时提示被省略的轮数。
- DeepSeek 官方接口下可在左下角查看账户余额（仅官方域名查询，失败显示“不可用”）。
- AI 讲台：全屏摄像头画面，可批注、拍照入白板、切换摄像头，并可对当前画面「问 AI」。
- 底栏「问 AI」浮条：只发送文字与对话历史，不自动附带白板截图。
- 分段超时（连接 15s / 首 token 60s / 流式空闲 60s / 总时长默认不限）与设置页「测试连接」。
- 所有网络请求均由用户操作触发；未配置时不发起任何请求。

### 界面与交互（v1.1）
- 无边框全屏主窗口：顶部 36px 顶栏（菜单/文档名/全屏/最小化/关闭），底部 64px 常驻控制栏。
- 左侧页面栏自动隐藏（左边缘热区滑出，`Ctrl+B` 固定）；浮动工具条可拖动并记忆位置。
- `F11` 沉浸模式隐藏顶栏；笔、荧光笔、橡皮的二级面板与三种笔尖。

### 界面与交互（v1.2.0）
- 极简顶栏：主菜单、H 品牌图标、文档名 + 版本徽标、最小化/最大化/关闭；写画区域更大。
- 底部 Dock：移动/选择、画笔、荧光笔、橡皮、形状、直尺/圆规、时钟/倒计时、导入、AI 讲台、问 AI、撤销/重做、更多（「⋯」）共 12 个入口；分组按钮右上角 ^ 提示二级面板，点击图标本体展开。
- Dock 可左右拖动并记忆位置（双击把手回中）；窄窗口时次要按钮自动收进「⋯」。
- 全屏（F11）隐藏顶栏，左上角显示半透明品牌水印；「⋯」在全屏下额外提供最小化/退出全屏。
- 页面导航：左下页面缩略图条（含新建页、可收起）+ 右下翻页条（翻页、缩放、适应页面）。
- 设置入口统一在「⋯ → 设置…」；「⋯」还含自定义工具栏、页面栏显隐、快捷键、导入、检查更新、关于。
- 启动动画（图标渐显 + 转圈 + 淡出，约 1.1 秒；--no-splash 可跳过，设置里可关闭）。
- 关于页品牌名逐字点亮动画、作者区块与 B 站头像（离线回退内置 H 图标）。

### 导入与讲台（v1.2.0）
- 导入 PDF / Word / 图片作为页面背景：PDF 每页高清渲染、可翻页与切换清晰度（96/150/200/300 DPI）；Word 提取文字后用内置排版渲染，可调字号 10–28 与行距 1.0–2.5；「适应页面」「清除背景」可撤销。
- 讲台拍照：拍照后进入图片讲解模式，最多缓存 12 张可切换；支持对比（仅原图 / 仅批注 / 叠加 50% / 按住看原图）与保存合成 PNG（默认存入文档目录）。
- 更新检测：启动后静默检查一次（约 5 秒超时，失败自动回退镜像），有新版弹 Toast 并可打开 Release 页面；「⋯ → 检查更新」可手动检查。
- AI 回答区字号可调（A− / 滑块 12–22 / A+），设置会记住。

### v1.2.3 更新（触控更顺、Dock 可调、讲台旋转）
- 触控书写更跟手：触摸笔迹走统一手势通道并做点合并/平滑，渲染按屏幕刷新率合并；双指缩放不再抖动，也不会和单指笔画抢。
- 手掌误触自动橡皮：大面积接触屏幕临时切橡皮，抬起或笔尖变细后自动恢复原工具；设置项默认开启，只对触摸生效。
- 导入 PDF/Word 翻页不卡顿：背景后台渲染、内存只留最近 4 页，翻页立即响应；首屏提示「正在渲染背景」。
- Dock 默认放大并有功能名称标签：图标下方显示「选择 / 画笔 / 橡皮 / 形状 …」；「设置 → 工具栏 → Dock 大小」可在 0.85–1.40 调整，窄窗口自动回退不遮挡。
- AI 讲台新增旋转按钮：0°/90°/180°/270° 四档循环，批注与拍照/问 AI 输出同步旋转。
- 导入页四周有细边框与投影，页面下方直接显示「‹ 第 x / y 页 ›」翻页条。

### v1.2.2 更新（全屏浮窗置顶、GitHub 直达、清除缓存）
- 全屏下问 AI 等浮窗置顶优先级最高：全屏白板上打开的浮窗始终位于最上层，退出全屏后恢复普通层级。
- 「设置 → 关于」新增 GitHub 仓库链接，点击直接用默认浏览器打开。
- 更新检查优先访问 GitHub Releases，失败后自动切换镜像；仍失败则静默跳过。
- 启动默认不再提示「上次未保存的文件」（可在「设置 → 常规」重新开启），Recovery 数据不会被自动删除。
- 「设置 → 关于」新增「清除缓存」按钮：只清理 Cache 与 Thumbnails，不动文档、设置、Recovery 与日志。

### v1.2.1 更新（历史）
- 启动即全屏：打开程序直接进入全屏白板，减少一次手动切换；退出全屏时恢复窗口/最大化状态。
- 右下翻页条「⛶」按钮可直接进入/退出全屏。
- 页面缩略图条只显示设定数量的页面（可在设置中调整），超出部分可滚动。
- 橡皮与形状工具互相切换时不再取消当前工具。
- 关于页品牌动画默认每 5 秒循环播放（可调）；全屏左上角品牌水印位置与透明度调整，不遮挡书写。

### 设置与数据
- 画布、工具、快捷键、AI 参数等设置持久化。
- API Key 使用 Windows DPAPI 加密保存在当前用户数据目录，日志不输出密钥。
- 中文界面，支持 Microsoft YaHei UI 字体与高 DPI。

## 2. 安装与运行

发布产物有三种形态，任选其一，不要同时安装 EXE 与 MSI。

### 2.1 EXE 安装包（Inno Setup）
- 文件：dist/installer/HoneySkyWhiteBoard-1.2.3-win-x64-setup.exe
- 双击后按向导安装，默认目录为 C:\Program Files\HoneySky White Board。
- 可选创建桌面快捷方式；开始菜单固定包含主程序与卸载入口。
- 卸载：Windows 设置 → 应用 → HoneySky White Board → 卸载，或开始菜单中的卸载快捷方式。
- 卸载时会启动清理工具询问是否同时删除个人文档、设置和缓存；默认不删除。
- 安装时注册 .hswb 文件关联（Windows 资源管理器双击白板文档即可打开），卸载时移除关联。

### 2.2 MSI 安装包（WiX）
- 文件：dist/installer/HoneySkyWhiteBoard-1.2.3-win-x64.msi
- 适合企业批量部署（msiexec /i 或组策略分发）。
- 安装目录、快捷方式与卸载行为与 EXE 版一致；交互式卸载会询问是否删除用户数据。
- 静默卸载（`msiexec /x` 不带 UI）不会弹窗，直接保留全部用户数据。
- 同样注册 .hswb 文件关联（写入 HKLM\SOFTWARE\Classes，卸载时由 Windows Installer 移除）。

### 2.3 绿色便携版
- 文件：dist/portable/HoneySkyWhiteBoard-1.2.3-win-x64-portable.zip
- 解压到任意可写目录（不要放在需要管理员权限的 Program Files 下），运行 HoneySkyWhiteBoard.exe。
- 便携判定：程序目录存在 portable.marker 文件或 Data 目录时，数据写入程序目录下的 Data\。
- 如果程序目录不可写，程序会自动回退到 %LOCALAPPDATA%\HoneySky White Board\，并在界面提示实际数据位置。
- 也可用环境变量 HONEYSKY_DATA_DIR 指定数据目录，优先级高于便携标记。

### 2.4 关于“未知发布者”
当前版本（1.2.3）未做代码签名，Windows SmartScreen 可能显示“Windows 已保护你的电脑”。这仅表示发布者证书缺失，不代表程序有问题。请核对官网提供的 SHA-256（dist/checksums），确认一致后点击“更多信息 → 仍要运行”。

## 3. 数据目录

默认数据根目录：
- 安装版：%LOCALAPPDATA%\HoneySky White Board\
- 绿色版：程序目录\Data\（不可写时回退到上述安装版路径）

子目录：

| 目录 | 内容 |
|---|---|
| Documents | 用户创建的白板文档与自动保存副本 |
| Settings | settings.json 设置文件与 api-key.dat（DPAPI 加密） |
| Cache | 临时缓存 |
| Thumbnails | 页面缩略图缓存 |
| Recovery | 崩溃恢复数据 |
| Logs | 运行日志（不含 API Key） |

卸载默认保留上述全部数据；只有用户在卸载清理工具中显式勾选“同时删除个人文档、设置和缓存”并确认后，才会删除这六个子目录。清理工具不会触碰数据根目录以外的任何文件。

## 4. 文件格式

白板文档扩展名为 .hswb，采用 ZIP 容器（manifest.json + document.msgpack.gz + 图片资源 + 缩略图），带 SHA-256 完整性校验。完整规范见 docs/file-format/hswb-format.md。

EXE 与 MSI 安装包会注册 .hswb 文件关联，安装后可直接双击文档打开；绿色版不写注册表，首次双击需在“打开方式”中选择 HoneySkyWhiteBoard.exe。如果其他程序抢占了 .hswb 关联，重新运行安装包即可恢复。

## 5. AI 配置

1. 打开 设置 → AI 讲解。
2. 填写 BaseUrl（例如 https://api.deepseek.com 或任意 OpenAI 兼容网关）、Model 与 API Key。
3. 保存后 API Key 经 DPAPI 加密写入 Settings\api-key.dat。
4. 在 AI 面板中拍照、选图或截取当前页面后提问。

注意：AI 服务由第三方提供，调用产生的费用与数据去向以该服务商的条款为准；本软件仅在用户主动提问时上传所选图片与文字。

## 6. 从源码构建

前置条件：
- Windows 10 1809+ x64
- .NET SDK 10.0.301（global.json 固定；可编译 net8.0 目标）
- Inno Setup 6（ISCC.exe，默认路径 C:\Users\<用户名>\AppData\Local\Programs\Inno Setup 6\ISCC.exe）
- WiX 5（wix 命令，需 WixToolset.UI.wixext 5.0.2 在 NuGet 缓存中）

一键构建（推荐）：

    powershell -ExecutionPolicy Bypass -File build\scripts\build.ps1

该脚本依次执行：restore → build Release → 自包含发布 App 与卸载清理工具 → 组装安装包载荷 → 编译 Inno Setup 安装包 → 编译 WiX MSI → 打包绿色版 zip → 生成 SHA-256 校验清单（dist/checksums）。产物输出到 dist/。

只构建单个项目：

    dotnet build src/HoneySky.App/HoneySky.App.csproj -c Release
    dotnet build src/HoneySky.Cleanup/HoneySky.Cleanup.csproj -c Release

产物目录：
- dist/installer/：HoneySkyWhiteBoard-<版本>-win-x64-setup.exe（Inno Setup）与 HoneySkyWhiteBoard-<版本>-win-x64.msi（WiX）
- dist/portable/：HoneySkyWhiteBoard-<版本>-win-x64-portable.zip（绿色版）
- dist/checksums/：SHA256SUMS.txt，每行“<SHA-256>  <相对 dist 的路径>”

构建完成后自检（只读，不修改产物）：

    powershell -ExecutionPolicy Bypass -File build\scripts\Verify-Release.ps1

自检内容：三种产物与校验清单是否存在；EXE 的版本信息（产品名/版本/公司）；MSI 的产品属性、UpgradeCode、文件表、快捷方式与 .hswb 文件关联注册表行；绿色版 zip 内的主程序、清理工具、portable.marker 与 Data 目录；SHA256SUMS 逐行复核；卸载清理工具的 --check-only 只读冒烟。全部通过时退出码为 0。

## 7. 已知限制

- 仅支持 x64 Windows，不支持 32 位与 ARM64。
- 未做代码签名（见 2.4）。
- 摄像头功能需要可用摄像头设备；无设备时给出中文提示。
- 网络授时与 AI 功能需要网络；离线时相关功能不可用或回退系统时间。
- 压感笔迹在无压感笔的构建机上仅用鼠标/触摸模拟验证，P95 延迟指标需在真实触控笔设备上复测。

## 8. 许可与第三方组件

- 本软件为专有软件，使用前请阅读 EULA.txt 与 LICENSE-PROPRIETARY.txt。
- 第三方组件与许可证见 THIRD_PARTY_NOTICES.md，许可证原文位于 docs/licenses/。
- 发布交付报告（产物体积、SHA-256、安装/卸载与文件关联验证记录、已知限制）见 docs/delivery-report.md；v1.0.0 定稿报告存档于 docs/release/delivery-report-v1.0.0.md，v1.0.0 产物与 SHA256SUMS-v1.0.0.txt 保留用于回滚。
- 本软件按“原样”提供，不附带明示或默示担保。

## 9. 目录结构（发布相关）

    assets/                 品牌图标（SVG/PNG/ICO）
    build/scripts/          一键构建脚本
    docs/delivery-report.md 发布交付报告
    docs/file-format/       .hswb 格式规范
    docs/licenses/          第三方许可证原文
    docs/release/           发布报告存档、升级验证计划、最终构建与校验原始日志
    docs/risks/             发布风险登记册
    installers/exe/         Inno Setup 脚本与中文语言文件
    installers/msi/         WiX 5 安装包定义
    src/HoneySky.Cleanup/   卸载数据清理工具
    dist/                   构建产物（构建后生成）
