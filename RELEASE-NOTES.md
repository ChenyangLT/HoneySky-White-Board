# HoneySky White Board v1.2.1 发布说明

> 公开版发布说明，随 GitHub Release v1.2.1 发布。本文件在阶段 A 先行编写，阶段 B 冻结后按实际实现复核措辞。

## 本次更新

- **启动即全屏**：打开程序直接进入全屏白板，减少一次手动切换。
- **翻页条全屏按钮**：右下翻页条的「⛶」可直接进入/退出全屏。
- **缩略图条可设数量**：页面缩略图条只显示设定数量的页面，超出可滚动，界面更清爽。
- **工具切换修复**：橡皮与形状工具互相切换时不再取消当前工具。
- **关于页动画**：品牌动画改为每 3 秒循环播放。
- **左上角水印**：全屏时的品牌水印重新调整位置与透明度，不遮挡书写。

## 下载

| 形态 | 文件 |
| --- | --- |
| EXE 安装包（Inno Setup） | `HoneySkyWhiteBoard-1.2.1-win-x64-setup.exe` |
| MSI 安装包（WiX，批量部署） | `HoneySkyWhiteBoard-1.2.1-win-x64.msi` |
| 绿色便携版 | `HoneySkyWhiteBoard-1.2.1-win-x64-portable.zip` |
| 校验清单 | `SHA256SUMS.txt` |

## 从 1.2.0 升级

- 直接运行 1.2.1 安装包覆盖安装即可，无需先卸载；文档、设置与缓存全部保留。
- MSI 版本使用同一 UpgradeCode，会通过 MajorUpgrade 自动移除 1.2.0 后再安装。
- 不支持同时安装 EXE 与 MSI 两种形态。

## 说明

- 安装包未做代码签名，首次运行时 Windows SmartScreen 可能提示「未知发布者」；请核对本页提供的 SHA-256 后选择「仍要运行」。
- 数据默认保存在 `%LOCALAPPDATA%\HoneySky White Board`；卸载默认保留，可勾选删除。
