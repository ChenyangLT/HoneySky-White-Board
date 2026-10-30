# 第三方组件与许可声明（THIRD_PARTY NOTICES）

HoneySky White Board 1.0（下称“本软件”）由 Chen_yang_LT 发布，包含下列第三方开源软件。各组件版权归其各自作者所有，并按下列许可证分发。完整许可证原文位于 docs/licenses/ 目录，本文件随安装包一起分发。

## 1. 随程序分发的运行时组件

| 组件 | 版本 | 许可证 | 用途 | 许可证原文 |
|---|---|---|---|---|
| SkiaSharp | 2.88.9 | MIT | 画布渲染、图像处理 | docs/licenses/MIT.txt、docs/licenses/skiasharp-license.txt |
| SkiaSharp.NativeAssets.Win32 | 2.88.9 | MIT（含第三方声明） | Skia 本机库（libSkiaSharp.dll） | docs/licenses/skiasharp-third-party-notices.txt |
| MessagePack (MessagePack-CSharp) | 2.5.198 | MIT | 文档数据序列化 | docs/licenses/MIT.txt |
| CommunityToolkit.Mvvm | 8.3.2 | MIT | MVVM 基础设施 | docs/licenses/MIT.txt |
| Microsoft.Extensions.DependencyInjection | 8.0.1 | MIT | 依赖注入 | docs/licenses/MIT.txt |
| System.Security.Cryptography.ProtectedData | 8.0.0 | MIT | 使用 DPAPI 加密 API Key | docs/licenses/MIT.txt |
| OpenCvSharp4 | 4.10.0.20240616 | Apache-2.0 | 摄像头图像处理 | docs/licenses/Apache-2.0.txt |
| OpenCvSharp4.runtime.win | 4.10.0.20240616 | Apache-2.0（随附 FFmpeg 视频后端为 LGPL-2.1） | OpenCV 本机库与 opencv_videoio_ffmpeg4100_64.dll | docs/licenses/Apache-2.0.txt、docs/licenses/LGPL-2.1.txt |
| WpfMath | 2.1.0 | MIT 与 OFL-1.1 | LaTeX 公式渲染 | docs/licenses/MIT.txt、docs/licenses/wpfmath-font-licenses.md |
| WpfMath 随附字体（Computer Modern 等） | 随 WpfMath 2.1.0 | SIL OFL 1.1 | 公式字体 | docs/licenses/OFL-1.1.txt、docs/licenses/wpfmath-font-licenses.md |
| XamlMath.Shared | 随 WpfMath 2.1.0 | MIT | WpfMath 的数学排版依赖库 | docs/licenses/MIT.txt |
| Markdig | 1.5.1 | BSD-2-Clause | Markdown 解析 | docs/licenses/BSD-2-Clause.txt |
| Microsoft .NET 8 运行时（Microsoft.NETCore.App / Microsoft.WindowsDesktop.App） | 8.0.x | MIT | 自包含运行时 | docs/licenses/MIT.txt |

## 2. 仅用于测试、不随安装包分发的组件

| 组件 | 版本 | 许可证 | 用途 |
|---|---|---|---|
| xunit | 2.9.2 | Apache-2.0 | 单元测试框架 |
| xunit.runner.visualstudio | 2.8.2 | Apache-2.0 | 测试运行器 |
| Microsoft.NET.Test.Sdk | 17.11.1 | MIT | 测试宿主 |
| FlaUI.UIA3 | 5.0.0 | MIT | UI 自动化测试 |

## 3. OpenCV 声明

本软件通过 OpenCvSharp4 使用 OpenCV 4.10 本机库。OpenCV 以 Apache License 2.0 发布，版权归 Intel Corporation、Willow Garage、NVIDIA 及其他贡献者所有。详见 https://opencv.org/license/ 与 docs/licenses/Apache-2.0.txt。

## 4. SkiaSharp 与 HarfBuzzSharp 内嵌第三方组件

SkiaSharp 的本机库内嵌 HarfBuzz、libpng、libjpeg-turbo、zlib、freetype 等组件，其声明与许可证原文完整收录在 docs/licenses/skiasharp-third-party-notices.txt。该文件由 SkiaSharp NuGet 包随附，本软件原样分发，未做修改。

## 5. SIL Open Font License 说明

WpfMath 随附的 Computer Modern 系列字体按 SIL Open Font License 1.1 分发。OFL 允许自由使用、修改和再分发，但要求：
- 修改后的字体不得使用原保留字体名称（Reserved Font Name）；
- 字体本身不得单独以任何价格出售；
- 再分发字体或其衍生作品时必须一并附带 OFL 许可证文本。

## 6. .NET 运行时

安装包与绿色版包含自包含的 .NET 8 运行时（Microsoft.NETCore.App 与 Microsoft.WindowsDesktop.App），依据 MIT 许可证分发，版权归 .NET Foundation and Contributors。详见 https://github.com/dotnet/runtime/blob/main/LICENSE.TXT。

## 7. FFmpeg（OpenCV videoio 视频后端）

OpenCvSharp4.runtime.win 4.10.0.20240616 随包附带 `opencv_videoio_ffmpeg4100_64.dll`，这是 OpenCV 官方构建的 FFmpeg 视频读写后端，基于 FFmpeg 并以 GNU Lesser General Public License 2.1（LGPL-2.1）分发。本软件未修改该 DLL，仅以独立动态库形式随 OpenCV 一起分发；其源码可从 https://ffmpeg.org/ 与 OpenCV 官方发布获取。LGPL-2.1 全文见 docs/licenses/LGPL-2.1.txt。用户可自行替换该动态库，只要替换版本与 OpenCV 4.10 的 videoio 接口兼容。

## 8. 免责与合规

- 本软件按“原样”提供，不附带任何明示或默示担保；第三方组件同样按其自身许可证分发。
- 如需重新分发本软件，必须保留本文件与 docs/licenses/ 目录下的全部许可文本。
- 若发现豁免或许可证错误，请联系 Chen_yang_LT 更正。
