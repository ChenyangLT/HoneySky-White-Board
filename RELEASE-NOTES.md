# HoneySky White Board v1.2.6 发布说明

- 发布日期：2026-11-02（三产物构建完成于 2026-11-02 23:49–23:50，校验值为真实产物）
- 版本：1.2.6（上一版 1.2.5）
- 系统要求：Windows 10/11 64 位（x64），无需预装 .NET 运行时（自包含）
- 许可：专有软件，正式版可免费使用；不开源。安装包未做代码签名，首次运行 SmartScreen/杀毒软件可能提示“未知发布者”，请核对下方 SHA-256 后运行。

## 本版亮点

- **AI 讲台影像增强**：摄像头采集分辨率可选 640×480 / 720p / 1080p / 1440p / 设备默认，显示分辨率可选 720p / 1080p / 1440p / 原始长边；色温 2000–10000K、饱和度 0–200%、对比度与亮度 50–150% 可调并可重置，适合不同教室灯光与投影。
- **讲台缩放与相册**：画面可缩放 1.0–6.0（滚轮以光标为中心，中键/右键拖动平移，双击重置），批注与画面同步缩放；拍照最多缓存 24 张，底栏相册入口可网格浏览、点击讲解、删除单张、清空并保存合成 PNG，缓存可持久化到本地。
- **书写更跟手**：背景页与笔画渲染改为增量追加 + 自适应渲染比例，长笔画不再整页重建；新增钢笔/水彩/粉笔三种笔尖（共 6 种），水彩多层低透明、粉笔颗粒稳定不闪，旧笔型保持原样。
- **PPT 切页更稳**：同源文件复用动画引擎并预取下一页，切页时先显示静态页或上一帧再启动动画，减少白屏与冻结；低配机器自动降低动画帧率。
- **时钟真正独立**：时钟/倒计时窗口不再附属于主窗口，主窗最小化或失焦时仍可显示在其他软件之上；关闭主窗口时一并关闭，不残留进程。
- **更新源可选**：更新弹窗与关于页新增更新源选择（自动镜像优先 / GitHub 官方 / gh-proxy.com 镜像 / ghproxy.net 镜像），自动模式按镜像顺序回退，下载与 SHA-256 校验使用同一源顺序。
- **关于页作者头像**：自动获取作者头像并本地缓存 24 小时，失败时回退内置蓝色品牌图标；主界面所有品牌图标统一为蓝底带笔图标。
- **启动页与设置精简**：启动页只保留图标、名称、版本与进度；设置 → 常规新增「笔画算法」（自动 / 流畅优先 / 平衡 / 画质优先）并给出机型建议，改动即时生效。

## 下载

| 形态 | 文件 | 适用场景 |
| --- | --- | --- |
| EXE 安装包 | HoneySkyWhiteBoard-1.2.6-win-x64-setup.exe | 推荐；双击安装，注册 .hswb 文件关联，可按用户选择安装目录 |
| MSI 安装包 | HoneySkyWhiteBoard-1.2.6-win-x64.msi | 企业批量部署（msiexec），支持 MajorUpgrade 就地升级 |
| 绿色版 | HoneySkyWhiteBoard-1.2.6-win-x64-portable.zip | 解压即用，数据写在程序目录 Data 下（不可写时回退到 %LOCALAPPDATA%） |

## 校验值（SHA-256，真实产物）

| 文件 | 字节 | SHA-256 |
| --- | --- | --- |
| HoneySkyWhiteBoard-1.2.6-win-x64-setup.exe | 81,397,089 | e74858784ace48e730720e08a649a29873eb6601bf20e085da39baff200ff3ab |
| HoneySkyWhiteBoard-1.2.6-win-x64.msi | 90,439,788 | 15944a941c58d495cc594cf5251a499d2434f72b9fe6be7d3147bb447c445924 |
| HoneySkyWhiteBoard-1.2.6-win-x64-portable.zip | 110,896,499 | aa965916a0177d46b791342451bc73d05bb04f54ece7f83cfb78b22eac0cdb6a |

完整清单与逐行校验见 Release 附件 SHA256SUMS.txt（356 B，SHA-256 6156f97bad2adaf142ef4d8bbd2d1765a6e5516de2c6e33e62f255f206e8b1d2）。

- GitHub Release：https://github.com/ChenyangLT/HoneySky-White-Board/releases/tag/v1.2.6 （四个附件：EXE、MSI、绿色版 zip、SHA256SUMS.txt）
- 产品官网：https://chenyanglt.github.io/HoneySky-White-Board/
- 版本差异与完整验收记录：docs/release/v1.2.6-changes.md、docs/delivery-report.md

校验方式（Windows PowerShell）：

    Get-FileHash .\HoneySkyWhiteBoard-1.2.6-win-x64-setup.exe -Algorithm SHA256

比对结果与上表一致后再运行安装包。

## 从 1.2.5 升级

- EXE：直接运行 1.2.6 安装包覆盖安装，安装目录、数据与文件关联保留。
- MSI：msiexec /i HoneySkyWhiteBoard-1.2.6-win-x64.msi，MajorUpgrade 自动卸载旧版本再安装；ProductCode 为 {D523D5E7-D8BB-44A1-83F4-C1F5EF4FFD6B}，UpgradeCode 不变。
- 绿色版：把新 zip 解压覆盖到原程序目录（保留 Data 目录与 portable.marker）即可，用户数据不受影响。
- 用户数据默认保留在 %LOCALAPPDATA%\HoneySky White Board（文档 / 设置 / 缓存 / 缩略图 / 恢复 / 日志）；卸载时默认不删除，可在卸载向导中勾选「同时删除个人文档、设置和缓存」。

## 已知限制

- 安装包未做代码签名，SmartScreen 可能显示「未知发布者」，请用 SHA-256 核对文件。
- 摄像头相关功能需要本机摄像头与 Windows 隐私授权；无摄像头时讲台显示「未检测到摄像头」并可重试。
- 更新检测依赖 GitHub API 与镜像站点，网络受限时可能只能得到「暂时无法检查更新」，不影响主程序。
- AI 讲台相册默认最多 24 张（可在设置中调整）；相册缓存占用 %LOCALAPPDATA%\HoneySky White Board\Cache\PodiumAlbum。
- 只提供 x64 安装包；ARM64 与 32 位系统未验证。
- 目录/版本以 docs/release/v1.2.6-changes.md 与 docs/delivery-report.md 为准。
