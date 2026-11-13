# HoneySky White Board v1.2.7 发布说明

- 发布日期：2026-11-13
- 版本：1.2.7（AssemblyVersion / FileVersion 1.2.7.0）
- 安装包最低系统：Windows 10 1709（build 16299）x64 及以上

## 本版亮点

- **触控更稳**：重新梳理触摸、触控笔与鼠标的输入仲裁，手势与书写不再互相抢事件；多指同时落笔只有主触点产生笔迹，其余触点用于掌擦与手势。
- **写得更顺**：画笔增量渲染与橡皮局部重绘路径优化，长课连续书写与擦除更跟手（实测见下）。
- **时钟独立进程**：时钟窗口拆为独立进程，主窗口最小化或失焦也能稳定显示；时钟窗口右上角新增「图钉」，可一键让全部 HoneySky 窗口保持置顶/取消置顶（不影响其他程序）。
- **倒计时选择器**：倒计时可直接选择常用时长，少点几次。
- **多 NTP 时间源**：支持配置多个网络授时源与自定义服务器，按顺序回退，全部失败时按本机时间并提示。
- **讲台 Dock 精简**：讲台的 Dock 只保留书写相关功能，其余收进「⋯」，界面更干净，讲解时不易误触。
- **更广的系统兼容**：安装器最低系统下调至 **Windows 10 1709（build 16299）**，覆盖更多校园与机房旧机器。

## 本版实测数据

- 10000 对象整页重绘：142 ms 基线 → **47.0–71.7 ms**。
- 500 点实时预览延迟：P95 **1.19–1.80 ms**。
- 2000 对象局部擦除：P95 **3.5–5.5 ms**。
- 单测 1313 + UI 测试 50 全部通过；本版新增 35 例单测。

## 下载

| 形态 | 文件 | 字节 | SHA-256 |
| --- | --- | --- | --- |
| EXE 安装包 | HoneySkyWhiteBoard-1.2.7-win-x64-setup.exe | 81,417,436 | ea87d4ae8a13a320ad64fc526680a5eeb903507a6f61f122094cec61b0d8fbd4 |
| MSI 安装包 | HoneySkyWhiteBoard-1.2.7-win-x64.msi | 90,448,100 | f845c42d628e74d7800530f0278ad3b2eced4403424c4cd298910a7ab3250747 |
| 绿色便携版 | HoneySkyWhiteBoard-1.2.7-win-x64-portable.zip | 110,934,345 | 6431415aca396c738e82180aa51da6ceab66138001b6803bc7e05f99d61aa86c |

- EXE：个人/单机安装，向导式；MSI：企业/机房批量部署（msiexec、组策略）；绿色版：免安装，解压即用，数据在程序目录 Data\。
- 三种形态不要同时安装；EXE 与 MSI 二选一，绿色版与安装版可并存但各自独立保存数据位置。
- 校验：下载目录中的 SHA256SUMS.txt 为三产物 SHA-256，可用 certutil -hashfile <文件> SHA256 核对。

## 质量与验证

- 产物自检（Verify-Release）：**62 项检查通过 / 0 失败**——EXE 版本信息、MSI 属性与文件表（311 条）、开始菜单/桌面快捷方式、.hswb 文件关联注册表 4 行、zip 结构与 portable.marker、SHA-256 清单逐行一致、卸载清理工具只读冒烟。
- 升级实测（1.2.6.1 → 1.2.7）：**102 项断言全部通过 / 0 失败**——U1 EXE 覆盖安装（版本、.hswb 关联、用户数据保留）、U2 MSI MajorUpgrade（旧 ProductCode 注销、新 {61D4585B-2EFB-46DF-828A-BFD05A637F74} 注册）、U3 同版本重装、U5a EXE 降级（Inno 不阻止，如实记录）、U5b MSI 降级（1603 阻止并保留 1.2.7）、U6 绿色版覆盖（portable.marker 与 Data\Documents 保留）。
- MSI 最低系统检查修复：Windows Installer 会用兼容性版本号伪装真实系统（日志中 VersionNT=603、WindowsBuild=9600，本机实为 Windows 11 build 26100），原检查条件恒假，导致 1.2.7 MSI 升级返回 1603。改为读取注册表 CurrentBuildNumber 并与其比较（安装日志实测 HSWB_OS_BUILD=26100、LaunchConditions 返回值 1）后，MSI 升级恢复正常；EXE 侧 MinVersion=10.0.16299 未受影响。
- perMachine（需要管理员提升的机器级安装）未在构建机上验证，见下方已知说明。

## 从 1.2.6.1 升级

- EXE：直接运行 1.2.7 安装包覆盖安装，文档、设置、缓存与 .hswb 关联全部保留。
- MSI：msiexec /i "HoneySkyWhiteBoard-1.2.7-win-x64.msi" /qn /norestart；同一 UpgradeCode 自动 MajorUpgrade。
- 绿色版：用 1.2.7 的 zip 覆盖原目录，保留 Data\ 与 portable.marker。
- 卸载默认保留个人文档、设置与缓存；只有交互式卸载时勾选清理才会删除。

## 已知说明

- 本版**未做代码签名**：Windows SmartScreen 可能提示「未知发布者」，请核对 SHA-256 后选择「仍要运行」。
- 安装包最低系统为 Windows 10 1709（build 16299）x64；更早版本安装程序会直接提示不支持。低于 1709 的真实系统未在构建机上验证，仅完成安装器条件与 MSI 安装日志验证。
- 触控仲裁、掌擦与压感笔的验证覆盖程序侧逻辑与单测；构建机无触控屏与压感笔，真机手感需目标设备确认。
- 时钟独立进程由主程序以 --clock-only 参数启动第二个实例（安装目录仍只有一个 HoneySkyWhiteBoard.exe），卸载时随主程序一并移除；关机重启后不会自动启动。
- 更新检测、AI 讲解为可选功能，不配置即不发起网络请求。
- Release 资产支持直连下载：已用 HTTP Range GET 抽查（前 16 字节），返回 HTTP 206 且文件头为 4d5a5000（MZ）；完整文件仍请按 SHA-256 核对。
- perMachine 机器级安装/卸载未做真实 UAC 提权测试；域环境批量部署建议先在小范围验证。

## 完整变更

详见仓库中的 CHANGELOG.md 与 docs/release/v1.2.7-changes.md（含逐项验收结果）。