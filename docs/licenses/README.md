# 第三方许可文件索引

本目录集中存放 HoneySky White Board 1.0 随附的第三方组件许可证原文。各组件与许可证的对应关系见仓库根目录 THIRD_PARTY_NOTICES.md。

| 文件 | 内容 | 适用组件 |
|---|---|---|
| MIT.txt | MIT 许可证正文与各组件版权行 | SkiaSharp、MessagePack、CommunityToolkit.Mvvm、Microsoft.Extensions.DependencyInjection、System.Security.Cryptography.ProtectedData、WpfMath、.NET 8 运行时（以及仅测试使用的 FlaUI） |
| Apache-2.0.txt | Apache License 2.0 完整正文 | OpenCvSharp4 及其运行时包、OpenCV 本机库、xunit（仅测试） |
| BSD-2-Clause.txt | BSD 2-Clause 完整正文 | Markdig |
| OFL-1.1.txt | SIL Open Font License 1.1 官方模板 | WpfMath 内置字体（Computer Modern 等） |
| LGPL-2.1.txt | GNU Lesser General Public License 2.1 完整正文 | OpenCV 视频后端 opencv_videoio_ffmpeg4100_64.dll（FFmpeg） |
| BSD-3-Clause.txt | BSD 3-Clause 完整正文（OSI 官方页面取得） | PDFium 本机库（pdfium.dll，经 bblanchon.PDFium.Win32 分发） |
| pdfium-notice.txt | PDFium 本机库许可说明（打包方 Apache-2.0 + 上游 BSD-3-Clause） | bblanchon.PDFium.Win32 130.0.6721 / PDFium |
| pdftoimage-license.txt | PDFtoImage 的 MIT 许可证正文 | PDFtoImage 4.1.1（PDF 逐页渲染） |
| openxml-license.txt | Open XML SDK 的 MIT 许可证正文 | DocumentFormat.OpenXml 3.5.1 与 DocumentFormat.OpenXml.Framework 3.5.1（Word 文本提取） |
| skiasharp-license.txt | SkiaSharp 包内 LICENSE.txt 原文 | SkiaSharp 2.88.9 |
| skiasharp-third-party-notices.txt | SkiaSharp 包内 THIRD-PARTY-NOTICES.txt 原文 | SkiaSharp / HarfBuzzSharp 及其内嵌第三方组件 |
| wpfmath-font-licenses.md | WpfMath 包内 FONT-LICENSES.md 原文 | WpfMath 2.1.0 随附字体 |

补充说明：XamlMath.Shared.dll 是 WpfMath 2.1.0 的 MIT 许可依赖库，随程序分发，许可证原文见 MIT.txt。

说明：
- 上述许可证原文均直接来自对应 NuGet 包的许可文件或官方发布页面，未做改写。
- Microsoft .NET 8 运行时以 MIT 许可随自包含发布分发；其版权归 .NET Foundation and Contributors。
- 若未来新增第三方组件，必须同时在此目录补充许可证原文，并更新 THIRD_PARTY_NOTICES.md。
