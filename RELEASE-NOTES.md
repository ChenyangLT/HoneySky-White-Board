# HoneySky White Board 1.2.6.1 发布说明

- 发布日期：2026-11-03
- 版本：1.2.6.1（x64，Windows 10 1809 及以上 / Windows 11）
- 上一版：1.2.6

## 本次更新

**讲台更好用：**
- 讲台新增画面缩放 +/- 按钮，与白板一致显示当前倍数，可一键重置。
- 拍照后的照片直接进入相册，「▾」入口与照片条目合并，不再有独立的照片条与照片面板。
- 相册面板改为常驻：点画面空白或点缩略图都不会关闭，只有点相册右上角 ×、最小化或退出讲台才关闭。
- 最小化与退出讲台按钮移到下方底栏最右侧，右上角更清爽。
- 讲台笔/橡皮沿用白板：支持六种笔形，默认整笔擦除；可在「设置 → 展台」里选择跟随白板或单独指定。
- 照片默认不再保存到磁盘（只在本次讲台会话中保留）；需要长期保留时可在「设置 → 展台」打开保存，并设置保留天数（默认 1 天，可调 1–30 天）。

**窗口置顶更符合预期：**
- 白板、讲台、AI 窗口不再常驻置顶，只在打开或启动时激活到最前。
- 时钟/倒计时窗口继续保持始终置顶，直到你关闭它。

**设置更清楚：**
- 设置界面从 7 个页签细化为 10 个页签，新增「展台」与「更新」页，讲台与更新相关选项集中管理。

## 下载

| 文件 | 适用场景 |
| --- | --- |
| HoneySkyWhiteBoard-1.2.6.1-win-x64-setup.exe | 普通安装（推荐，支持静默安装与文件关联） |
| HoneySkyWhiteBoard-1.2.6.1-win-x64.msi | 域/批量部署（组策略、SCCM 等） |
| HoneySkyWhiteBoard-1.2.6.1-win-x64-portable.zip | 绿色版，解压即用（数据保存在程序目录 Data） |

## 校验值（SHA-256）

| 文件 | 大小 | SHA-256 |
| --- | --- | --- |
| HoneySkyWhiteBoard-1.2.6.1-win-x64-setup.exe | 81,408,931 B（77.64 MB） | f6382f6d624ebf9f837c4cc1ac8c9fa8c70cf29469c6a77e4640e9b669f48a0e |
| HoneySkyWhiteBoard-1.2.6.1-win-x64.msi | 90,415,208 B（86.23 MB） | b528fcb4369b0d5e14ea0abc4287ed92ecb46240bd36bb88dd9f8e5713e753ea |
| HoneySkyWhiteBoard-1.2.6.1-win-x64-portable.zip | 110,902,137 B（105.76 MB） | 53f01feaf59eb5edcaddac2283d892fa397f2fb158334ad90bd267cdeb37398e |

可在 PowerShell 中用 `Get-FileHash <文件> -Algorithm SHA256» 自行校验，或对照 Release 附带的 SHA256SUMS.txt。

## 发布信息

- GitHub Release：https://github.com/ChenyangLT/HoneySky-White-Board/releases/tag/v1.2.6.1
- 官网（GitHub Pages）：https://chenyanglt.github.io/HoneySky-White-Board/
- 安装包未做代码签名，首次运行可能被 SmartScreen 提示「未知发布者」，请用上面的 SHA-256 核对文件。

## 从 1.2.6 升级

- EXE：直接运行 1.2.6.1 安装包覆盖安装，用户文档、设置与缓存保留。
- MSI：同一 UpgradeCode 的 MajorUpgrade 覆盖安装；由于 MSI 只比较版本前三段，1.2.6.1 与 1.2.6 前三段相同，安装器依赖“允许同版本升级”配置完成覆盖，无需手工卸载。
- 绿色版：用新包覆盖旧目录即可，Data 目录与文档不受影响。
- 卸载仍默认保留 %LOCALAPPDATA%\HoneySky White Board 下的个人文档、设置与缓存；卸载时可在清理工具里选择一并删除。

## 已知限制

- 安装包未做代码签名，Windows SmartScreen / 杀毒软件可能提示“未知发布者”；请用 Release 附带的 SHA-256 自行校验。
- 展台不再常驻置顶后，若被投影或录屏软件遮挡，需要重新点击展台窗口激活。
- 设置「保留天数」只在打开“保存相册到磁盘”后生效；关闭时照片退出讲台即丢弃。
- 本版未包含代码签名、自动更新渠道变更或文件格式变更。
- 全屏白板只在窗口处于前台激活时置顶，切换到其他程序后会立即取消置顶（这是本版修复的行为）；时钟/倒计时仍始终置顶。
