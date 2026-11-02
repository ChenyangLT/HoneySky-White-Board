/* ==========================================================================
   HoneySky White Board — 官网交互（无依赖）
   1) 中英文案表 + 切换（默认中文，选择记在 localStorage）
   2) 滚动渐显（IntersectionObserver；不支持时直接显示）
   3) 毛玻璃导航滚动态
   4) 截图缺失时的灰色占位降级（防止破图）
   ========================================================================== */
(function () {
  "use strict";

  var STORAGE_KEY = "honeysky-site-lang";
  var GITHUB_RELEASES = "https://github.com/ChenyangLT/HoneySky-White-Board/releases/latest";

  /* ---------------- 文案表（所有可见文案集中在这里，便于替换） ---------------- */
  var COPY = {
    zh: {
      "nav.features": "功能",
      "nav.requirements": "系统要求",
      "nav.download": "下载",
      "nav.license": "许可",
      "nav.cta": "下载",

      "page.title": "HoneySky White Board — 写在无边的画布上",
      "page.desc":
        "A desktop whiteboard for Windows: pressure-sensitive ink, ruler and compass, clock and countdown windows, a floating dock, file import as background, AI podium and assistant. v1.2.6 lets the AI podium tune capture and display resolution, color temperature, saturation, contrast and brightness, zoom and pan, and keep an album for comparison; the rebuilt ink engine keeps 500 strokes smooth and adds straight-line, watercolor and chalk tips; PowerPoint pages decode once and prefetch the next; the clock and countdown live in their own window; About shows the author's avatar; updates can pick their own source. Free to download.",

      "hero.eyebrow": "Windows 桌面白板 · v1.2.6",
      "hero.product": "HoneySky White Board",
      "hero.tagline": "写在无边的画布上。",
      "hero.lead": "一支笔，一块无边的白板，和一个随时待命的 AI。为 Windows 打造，压感书写与全部工具都在本地运行。",
      "hero.cta1": "下载 Windows 版",
      "hero.cta2": "查看功能",
      "hero.note": "免费下载 · Windows 10 / 11 · x64",

      "img.hero": "HoneySky White Board v1.2.6 主界面：左上角蓝色带笔图标 + 品牌字 + 版本号水印，无边画布上手写与图形，底部浮动 Dock（画笔、橡皮、形状、直尺、时钟、导入、AI 讲台、问 AI），左下角页面缩略图条，右下角翻页条与缩放条",

      "features.kicker": "功能",
      "features.title": "为老师，也为每一个把想法画出来的人。",
      "features.lead": "从一支笔开始，到 AI 讲台答题。每一处细节都为「讲清楚一件事」而设计。",

      "f1.kicker": "书写与笔触",
      "f1.title": "像笔一样，像纸一样。",
      "f1.body": "笔迹平滑与压感整笔重绘，250 Hz 采样下依然跟手。橡皮可整笔擦除，也可局部擦除；手指绘画默认关闭，避免误触。",
      "f1.b1": "压感笔迹与实时光滑",
      "f1.b2": "局部擦除 / 整笔擦除两种橡皮",
      "f1.b3": "自动化笔迹，随手写就有体面",
    "f1.b4": "六种笔尖：钢笔 / 马克笔 / 毛笔 / 直线笔 / 水彩 / 粉笔",
      "img.brush": "Dock 的画笔二级面板：画笔 / 荧光笔切换、12 种颜色、粗细滑块，笔尖区两行排开钢笔 / 马克笔 / 毛笔 / 直线笔 / 水彩 / 粉笔六种笔尖",

      "common.new": "新",

      "f2.kicker": "时间工具",
      "f2.title": "时钟与倒计时，搬到独立窗口。",
      "f2.lead": "时钟与倒计时是始终置顶的独立窗口，不遮挡板书：字号与背景透明度都能调，字号放大后文字依然清晰。",
      "f2.cap1": "时钟 · 网络授时，字号与透明度即时可调",
      "f2.cap2": "倒计时 · 最后 3 秒逐秒提示音，结束音效可辨识",
      "img.clock": "独立时钟窗口：橙色秒数、日期、网络授时状态与「立即校准」，字号与背景透明度可调，放大后依然清晰",
      "img.countdown": "独立倒计时窗口：05:00 待开始，10 秒 / 1 分 / 5 分 / 10 分 / 25 分预设与自定义分钟，开始、暂停、继续、重置",

      "f3.kicker": "AI 讲台与助手",
      "f3.title": "讲解不再是一个人对着黑板。",
      "f3.lead": "把题目交给 AI 讲台：拍下纸张、贴入图片，AI 在白板上边写边讲，支持 LaTeX 公式；画面可调分辨率、色温与亮度，拍下的照片还能收进相册对比讲解。日常答疑则交给角落里的 AI 助手浮窗。",
      "f3.cap1": "AI 讲台 · 画面设置：分辨率、色温、亮度随手调",
      "f3.cap2": "AI 助手 · 随时呼出，回答字号可调",
      "f3.note": "AI 功能为可选能力，使用你自己的 OpenAI 兼容接口与 API Key；密钥经 Windows DPAPI 加密保存在本机。",
      "img.podium": "AI 讲台的「画面设置」面板：采集分辨率 1280×720、显示分辨率 1080p（长边 1920）与实际采集分辨率，色温 6500K 与饱和度 / 对比度 / 亮度滑块，底部是重置调色、重置缩放、恢复默认画面设置三个按钮",
      "img.aibooth": "AI 助手浮窗：DeepSeek 回答的因式分解过程，块级公式正常渲染，底部有回答字号滑块与余额状态",

      "f4.kicker": "页面与工具",
      "f4.title": "多页白板，工具栏按你的习惯排。",
      "f4.lead": "一节课不止一页：缩略图栏随手翻页，导入的文档有页码、滑条与目录，缩放与适应窗口一键到位。工具栏里的工具能显示、固定、上下调序，画布右键还能复制、剪切、粘贴与置顶置底。",
      "f4.cap1": "多页与缩放 · 缩略图、翻页、适应窗口",
      "f4.cap2": "设置 · 每条栏、每次启动行为，都能按需开关",
      "img.pages": "左下角页面缩略图条只显示 3 个缩略图（第 3、4、5 页），右下角翻页条含全屏按钮：共 5 页白板，当前第 5 页",
      "img.settings": "v1.2.6 设置窗口的常规页（滚动到下半部分）：叠加元素区的水印大小与右下操作条大小两个滑块各显示 100% 与「默认」按钮；新增「书写性能」区，笔画算法下拉为四档（自动 / 流畅优先 / 平衡 / 画质优先）并显示「当前：平衡」，下方列出各档对应机型；再往下是低配电脑的一键应用低配推荐与恢复默认",

      "f5.kicker": "还有这些",
      "f5.title": "用得越久，越觉得顺手。",
      "c1.title": "半透明荧光笔",
      "c1.body": "粉笔质感的高亮，叠在文字上不遮字，粗细可调。",
      "c2.title": "直尺与圆规",
      "c2.body": "屏幕上拉一把直尺，或画一个精确的圆，讲几何课很省事。",
      "c3.title": "自动保存与恢复",
      "c3.body": "定时自动保存，异常退出后下次启动可恢复上次的白板。",
      "c4.title": "背景与导出",
      "c4.body": "白板、纸张、深色背景随意换；一键导出高清图片。",
      "c5.title": "快捷键",
      "c5.body": "P 画笔、E 橡皮、K 时钟……常用操作都有快捷键。",
      "c6.title": "克制的界面",
      "c6.body": "浅色与深色主题，工具条与面板为课堂而不是为炫技而存在。",

      "f6.kicker": "v1.2.6 新增",
      "f6.title": "讲台更清楚，笔也更好写。",
      "f6.lead": "这一版把讲台和书写往前推了一截：AI 讲台可以调采集与显示分辨率、色温、饱和度、对比度、亮度，能缩放平移并把照片收进相册做对比；书写引擎重做后，2560×1440 单页连续写 500 笔依然跟手，还新增了直线笔、水彩、粉笔；PPT 切页同源只解码一次并预取下一页；时钟与倒计时搬进独立窗口；关于页显示作者头像；启动页更简洁，笔画算法有四个档位，更新还能自己选源。",
      "f6.cap1": "启动页 · 只剩品牌与进度，两个按钮已移入设置",
      "f6.cap2": "关于页 · 作者头像与 GitHub 入口",
      "img.splash": "v1.2.6 启动页：蓝色带笔图标、HoneySky White Board 与 v1.2.6，橙色进度圈与「正在加载画布…」，只剩品牌与进度，没有「即刻启动 / 以后直接显示」按钮",
      "img.about": "v1.2.6 设置 → 关于页：圆形作者头像与「Chen_yang_LT · 独立开发者」、品牌字扫光与 v1.2.6，作者卡片只保留 GitHub 仓库入口，另有检查更新、打开数据目录、清除缓存、第三方许可与软件更新卡",
      "n1.title": "讲台影像调得更准",
      "n1.body": "采集与显示分辨率分别可选（最高 1440p 或原始长边），色温 2000–10000K、饱和度、对比度、亮度都能调，并按设备组合记住：投影出来的画面不再发灰、偏色。",
      "n2.title": "讲台相册与对比",
      "n2.body": "一次讲课最多保留 24 张拍照，缩略图网格随时回看；可切换仅原图 / 仅批注 / 叠加 50%，按住即看原图，也能把当前画面连同批注存成 PNG。",
      "n3.title": "写得更顺，还多了三种笔尖",
      "n3.body": "书写引擎重做：连续 500 笔不掉帧；新增直线笔（两点预览、端点不抖）、水彩（多层低透明、边缘略深）、粉笔（颗粒不闪）；六种笔尖两行排开，选笔不再翻页。",
      "n4.title": "PPT 翻页不白屏",
      "n4.body": "同一个演示文稿只解码一次，切页前预取下一页；翻页先显示静态页或上一帧，动画多的 deck 也能连着讲，不会停下来刷新。",
      "n5.title": "时钟与倒计时独立成窗",
      "n5.body": "时钟与倒计时改为独立窗口：主窗最小化或切到别的程序仍能看到，关闭主窗时一起退出，恢复时不重建、不抢焦点。",
      "n6.title": "关于页有作者头像",
      "n6.body": "关于页显示作者头像与「Chen_yang_LT · 独立开发者」，联网时读取并缓存 24 小时，断网自动回退内置品牌图标；GitHub 入口保留。",
      "n7.title": "启动页与笔画算法按机器调",
      "n7.body": "启动页只剩图标、名称、版本与加载状态；设置里可切换四档笔画算法（自动 / 流畅优先 / 平衡 / 画质优先），低配电脑仍是一键推荐。",
      "n8.title": "更新源自己选",
      "n8.body": "更新弹窗与关于页新增更新源：自动（镜像优先）/ GitHub 直连 / gh-proxy.com 镜像 / ghproxy.net 镜像；某个源不可用自动回退，安装包与校验值必须同源，校验失败自动换源。",
      "f6.history": "v1.2.5 的导入铺满视口、PPT 动画、Word 阅读模式、右键整理、低配推荐与蓝色带笔图标都还在。",

      "req.kicker": "系统要求",
      "req.title": "几乎任何一台 Windows 电脑。",
      "req.lead": "安装包自带 .NET 8 运行时，不需要你另外装环境。",
      "req.k1": "系统",
      "req.v1": "Windows 10 1809+ / Windows 11",
      "req.k2": "架构",
      "req.v2": "x64",
      "req.k3": "内存",
      "req.v3": "4 GB 及以上",
      "req.k4": "运行时",
      "req.v4": ".NET 8（随包自带）",
      "req.note": "建议 1280×800 及以上分辨率；支持触控笔与触屏，也支持鼠标。",

      "dl.kicker": "下载",
      "dl.title": "选择一种方式装到电脑上。",
      "dl.lead": "三个安装形态，内容完全一致。所有产物都列在 GitHub Releases，并附 SHA-256 校验和。",
      "dl.tag1": "推荐",
      "dl.tag2": "批量部署",
      "dl.tag3": "免安装",
      "dl.c1.title": "安装包（EXE）",
      "dl.c1.body": "双击安装，自动创建桌面快捷方式与 .hswb 文件关联，可在系统设置里卸载。",
      "dl.c2.title": "安装包（MSI）",
      "dl.c2.body": "适合组策略、Intune 等企业分发，支持静默安装与标准卸载。",
      "dl.c3.title": "绿色版（ZIP）",
      "dl.c3.body": "解压即用，不写注册表；数据默认保存在本地应用数据目录，可随包携带。",
      "dl.get": "前往 GitHub Releases",
      "dl.sum": "SHA-256 校验和",
      "dl.sumBody": "每个产物的 SHA-256 都写在 Release 附件的 <code>SHA256SUMS.txt</code> 中，可用 <code>certutil -hashfile &lt;文件&gt; SHA256</code> 或 <code>Get-FileHash</code> 核对。",
      "dl.release": "Release 页面",
      "dl.sumFile": "SHA256SUMS.txt",
      "dl.note": "仅提供已签名的二进制分发包，不提供源码。Windows 首次运行时可能提示「未知发布者」，这是未做代码签名的正常表现。",

      "lic.kicker": "许可",
      "lic.title": "不开源，但正式版免费使用。",
      "lic.lead": "HoneySky White Board 的源码不公开，软件本身免费：没有试用期，也没有需要付费解锁的功能，下载安装就能用。",
      "lic.l1": "<strong>免费使用：</strong>在自己的电脑上安装使用不收费，个人与课堂场景都一样，不需要登录或激活。",
      "lic.l2": "<strong>不开源：</strong>源码不公开，Release 里提供的是安装包与文档；想了解具体实现了什么，可以看官网的功能说明或直接来问。",
      "lic.l3": "<strong>第三方组件：</strong>随包使用的开源库遵循各自许可，清单见 THIRD_PARTY_NOTICES。",
      "lic.repo": "GitHub 仓库",
      "lic.notices": "第三方声明",

      "foot.version": "版本 1.2.6",
      "foot.copy": "© 2026 Chen_yang_LT",
      "foot.prop": "不开源 · 正式版免费",
      "foot.repo": "GitHub",
      "foot.license": "许可",
      "foot.top": "返回顶部"
    },

    en: {
      "nav.features": "Features",
      "nav.requirements": "Requirements",
      "nav.download": "Download",
      "nav.license": "License",
      "nav.cta": "Download",

      "page.title": "HoneySky White Board — Draw without edges",
      "page.desc":
        "A desktop whiteboard for Windows: pressure-sensitive ink, ruler and compass, clock and countdown windows, a floating dock, file import as background, AI podium and assistant. v1.2.6 imports PDF, Word, PowerPoint and images filling about 80% of the viewport with a black frame and drop shadow, plays PowerPoint fade, fly-in and wipe animations in-app, adds a full-page Word reading mode, a canvas right-click menu with copy, cut, paste, duplicate, delete, bring-to-front, send-to-back and pin, and a one-click low-spec preset plus a new blue pencil icon. Free to download.",

      "hero.eyebrow": "Desktop whiteboard for Windows · v1.2.6",
      "hero.product": "HoneySky White Board",
      "hero.tagline": "Draw without edges.",
      "hero.lead": "One pen, an infinite canvas, and an AI that is always on call. Built for Windows, with pressure-sensitive ink and every tool running locally.",
      "hero.cta1": "Download for Windows",
      "hero.cta2": "See features",
      "hero.note": "Free download · Windows 10 / 11 · x64",

      "img.hero": "The HoneySky White Board v1.2.6 main window: in the top-left a watermark with the blue pencil icon, brand name and version; ink and shapes on an infinite canvas; a floating dock at the bottom (pen, eraser, shapes, ruler, clock, import, AI podium, ask AI); page thumbnails at the lower left; the pager and zoom controls at the lower right",

      "features.kicker": "Features",
      "features.title": "For teachers — and for anyone who thinks out loud.",
      "features.lead": "From a single stroke to AI explaining a problem on the board. Every detail is built for making one thing clear.",

      "f1.kicker": "Ink & strokes",
      "f1.title": "Feels like a pen. Feels like paper.",
      "f1.body": "Smoothed, pressure-sensitive strokes redrawn as a whole, still responsive at 250 Hz sampling. Erase whole strokes or rub out part of one; finger drawing is off by default to avoid stray marks.",
      "f1.b1": "Pressure sensitivity with real-time smoothing",
      "f1.b2": "Partial and whole-stroke erasers",
      "f1.b3": "Automatic stroke clean-up, so handwriting looks tidy",
    "f1.b4": "Six pen tips: pen, marker, brush, straight, watercolor and chalk",
      "img.brush": "The dock's brush panel: pen and highlighter tabs, twelve colors, a width slider, and six pen tips — pen, marker, brush, straight, watercolor and chalk — laid out over two rows",

      "common.new": "New",

      "f2.kicker": "Time tools",
      "f2.title": "Clock and countdown, now in their own window.",
      "f2.lead": "The clock and countdown live in an always-on-top window that never hides your notes: font size and background opacity are adjustable, and the digits stay crisp when you enlarge them.",
      "f2.cap1": "Clock · network time, adjustable size and opacity",
      "f2.cap2": "Countdown · a tick on each of the last 3 seconds, then a distinct end chime",
      "img.clock": "Standalone clock window with orange seconds, the date, network time sync status and a recalibrate button; font size and background opacity are adjustable and stay crisp when enlarged",
      "img.countdown": "Standalone countdown window: 05:00 not started, 10s / 1 / 5 / 10 / 25 minute presets plus a custom minute field, with start, pause, resume and reset",

      "f3.kicker": "AI podium & assistant",
      "f3.title": "You are no longer alone at the blackboard.",
      "f3.lead": "Hand a problem to the AI podium: photograph the paper or drop in an image, and the AI works through it on the board, LaTeX included; capture resolution, color temperature and brightness are adjustable, and photos can be filed into an album for side-by-side explanation. For quick questions, the AI assistant floats in the corner.",
      "f3.cap1": "AI podium · picture settings: resolution, color temperature and brightness",
      "f3.cap2": "AI assistant · one hotkey away, with adjustable answer size",
      "f3.note": "AI is optional and uses your own OpenAI-compatible endpoint and API key; the key is encrypted with Windows DPAPI and stored locally.",
      "img.podium": "The AI podium's picture settings: capture resolution 1280×720, display resolution 1080p (long edge 1920) and the actual capture resolution, color temperature 6500K with saturation, contrast and brightness sliders, and reset color, reset zoom and restore-defaults buttons",
      "img.aibooth": "The floating AI assistant answering a factorization question with rendered block formulas, an answer text-size slider and the balance status",

      "f4.kicker": "Pages & tools",
      "f4.title": "Many pages. A tool bar that fits you.",
      "f4.lead": "A lesson rarely fits on one page: flip through the thumbnail rail, and imported documents come with a page number, a scrubber and a table of contents. Zoom and fit the board to the window in one click, show, pin and reorder tools, change their shortcuts — and use the canvas right-click menu to copy, cut, paste, bring to front or send to back.",
      "f4.cap1": "Pages & zoom · thumbnails, page flipping, fit to window",
      "f4.cap2": "Settings · every bar and every launch behavior can be toggled",
      "img.pages": "The page thumbnail strip at the lower left showing three thumbnails (pages 3, 4 and 5) and the pager at the lower right with its full-screen button, out of five pages, currently page 5",
      "img.settings": "The v1.2.6 settings window's General tab, scrolled to the lower half: the Overlays section with watermark size and bottom-right pager size sliders showing 100% and a Reset button, then the new Ink performance section whose pen-algorithm dropdown offers four levels (auto, speed first, balanced, quality first) with the current one shown next to it and a device recommendation under each, and below that the one-click low-spec preset with its restore button",

      "f5.kicker": "And more",
      "f5.title": "The longer you use it, the better it fits.",
      "c1.title": "Translucent highlighter",
      "c1.body": "A chalk-soft highlight that never hides the text beneath it. Width adjustable.",
      "c2.title": "Ruler & compass",
      "c2.body": "Draw a straight line with an on-screen ruler, or a precise circle for geometry class.",
      "c3.title": "Auto-save & recovery",
      "c3.body": "Saves on a timer; if the app closes unexpectedly, your board is recovered next time.",
      "c4.title": "Backgrounds & export",
      "c4.body": "Whiteboard, paper or dark background; export a high-resolution image in one click.",
      "c5.title": "Shortcuts",
      "c5.body": "P for pen, E for eraser, K for clock — the things you do most have keys.",
      "c6.title": "A restrained interface",
      "c6.body": "Light and dark themes. Tool bars and panels exist for the classroom, not for show.",

      "f6.kicker": "New in v1.2.6",
      "f6.title": "A clearer podium. A better pen.",
      "f6.lead": "This release pushes the podium and the ink forward: the AI podium tunes capture and display resolution, color temperature, saturation, contrast and brightness, zooms and pans, and keeps up to 24 shots in an album for comparison. The ink engine was rebuilt — 500 strokes on a 2560×1440 page stay smooth — with three new tips: straight line, watercolor and chalk. PowerPoint pages decode once and prefetch the next slide; the clock and countdown move into their own window; the About page shows the author's avatar; the splash is simpler, ink algorithms come in four presets, and updates can pick their own source.",
      "f6.cap1": "Splash · just the brand and progress; both buttons live in Settings",
      "f6.cap2": "About page · the author's avatar and the GitHub entry",
      "img.splash": "The v1.2.6 splash screen: blue pencil icon, HoneySky White Board and v1.2.6, an orange progress ring and the loading message — only the brand and progress, with no start-now or skip-next-time buttons",
      "img.about": "Settings → About in v1.2.6: a round author avatar with Chen_yang_LT · Independent developer, the brand name with its sweep and v1.2.6, an author card that now only links to the GitHub repository, plus check for updates, open data folder, clear cache, third-party licenses and the software update card",
      "n1.title": "Podium imaging, tuned",
      "n1.body": "Capture and display resolution are chosen separately (up to 1440p or the sensor's native long edge), and color temperature from 2000 to 10000 K, saturation, contrast and brightness are all adjustable and remembered per device — projected output no longer looks washed out or tinted.",
      "n2.title": "A podium album, with comparison",
      "n2.body": "Up to 24 shots per session stay in a thumbnail grid; compare as photo only, annotations only, or a 50% overlay, hold to see the original, and save the current frame together with its annotations as a PNG.",
      "n3.title": "Smoother ink, and three new tips",
      "n3.body": "The ink engine is rebuilt for 500 strokes without dropped frames, and adds a straight-line pen with a two-point preview, watercolor with layered translucency and darker edges, and chalk with stable grain; all six tips sit in two rows, so no paging.",
      "n4.title": "PowerPoint pages without a blank frame",
      "n4.body": "Each deck decodes once and prefetches the next slide; flipping shows the static page or the previous frame first, so animation-heavy decks keep flowing instead of stalling.",
      "n5.title": "Clock and countdown in their own window",
      "n5.body": "The clock and countdown are separate windows now: they stay visible when the main window is minimized or you switch apps, close with it, and never steal focus when it is restored.",
      "n6.title": "An avatar on the About page",
      "n6.body": "About shows the author's avatar with Chen_yang_LT — independent developer, cached for 24 hours when online and falling back to the built-in icon offline; the GitHub entry stays.",
      "n7.title": "Splash and ink algorithms, tuned to your PC",
      "n7.body": "The splash keeps only the icon, name, version and loading state; Settings adds four ink algorithm presets — Auto, Smooth first, Balanced, Quality first — and the one-click low-spec recommendation remains.",
      "n8.title": "Update sources you can choose",
      "n8.body": "The update dialog and the About page now offer a source: Auto (mirror first) / GitHub direct / the gh-proxy.com mirror / the ghproxy.net mirror — matching the four options in the app. A failing source falls back automatically, the package and its SHA-256 list must come from the same source, and a failed check switches sources.",
      "f6.history": "v1.2.5's imports that fill the viewport, PowerPoint animations, Word reading mode, right-click tidying, low-spec preset and the blue pencil icon are all still here.",

      "req.kicker": "Requirements",
      "req.title": "Almost any Windows PC will do.",
      "req.lead": "The installer bundles the .NET 8 runtime, so there is nothing else to set up.",
      "req.k1": "OS",
      "req.v1": "Windows 10 1809+ / Windows 11",
      "req.k2": "Architecture",
      "req.v2": "x64",
      "req.k3": "Memory",
      "req.v3": "4 GB or more",
      "req.k4": "Runtime",
      "req.v4": ".NET 8 (bundled)",
      "req.note": "A display of 1280×800 or larger is recommended. Works with a stylus, a touch screen, or a mouse.",

      "dl.kicker": "Download",
      "dl.title": "Pick the way you want to install it.",
      "dl.lead": "Three packages, identical contents. Everything is listed on GitHub Releases together with SHA-256 checksums.",
      "dl.tag1": "Recommended",
      "dl.tag2": "Mass deployment",
      "dl.tag3": "Portable",
      "dl.c1.title": "Installer (EXE)",
      "dl.c1.body": "Double-click to install. Creates a desktop shortcut and the .hswb file association; uninstall from Windows Settings.",
      "dl.c2.title": "Installer (MSI)",
      "dl.c2.body": "For Group Policy, Intune and other enterprise distribution, with silent install and a standard uninstall.",
      "dl.c3.title": "Portable (ZIP)",
      "dl.c3.body": "Unzip and run. Writes nothing to the registry; data stays in your local app data folder and travels with the package.",
      "dl.get": "Go to GitHub Releases",
      "dl.sum": "SHA-256 checksums",
      "dl.sumBody": "The SHA-256 of every package is listed in <code>SHA256SUMS.txt</code> attached to the release. Verify with <code>certutil -hashfile &lt;file&gt; SHA256</code> or <code>Get-FileHash</code>.",
      "dl.release": "Release page",
      "dl.sumFile": "SHA256SUMS.txt",
      "dl.note": "Only signed binary distributions are provided — no source. Windows may warn about an unknown publisher on first run, because the build is not code-signed.",

      "lic.kicker": "License",
      "lic.title": "Not open source — free to use.",
      "lic.lead": "HoneySky White Board's source code is not published, but the app itself is free: no trial period, no paid unlocks. Download, install and use it.",
      "lic.l1": "<strong>Free to use:</strong> installing it on your own computers costs nothing, for personal and classroom use alike, with no sign-in or activation.",
      "lic.l2": "<strong>Closed source:</strong> the source is not published; releases ship installers and documentation. To see what it does, read the features on this site or just ask.",
      "lic.l3": "<strong>Third-party components:</strong> bundled open-source libraries keep their own licenses; see THIRD_PARTY_NOTICES.",
      "lic.repo": "GitHub repository",
      "lic.notices": "Third-party notices",

      "foot.version": "Version 1.2.6",
      "foot.copy": "© 2026 Chen_yang_LT",
      "foot.prop": "Closed source · free to use",
      "foot.repo": "GitHub",
      "foot.license": "License",
      "foot.top": "Back to top"
    }
  };

  var currentLang = "zh";

  function readStoredLang() {
    try {
      var stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "zh" || stored === "en") return stored;
    } catch (err) {
      /* file:// 或隐私模式下 localStorage 可能不可用，忽略即可 */
    }
    return "zh";
  }

  function storeLang(lang) {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (err) {
      /* 同上，忽略 */
    }
  }

  function textFor(lang, key) {
    var table = COPY[lang] || COPY.zh;
    if (Object.prototype.hasOwnProperty.call(table, key)) return table[key];
    return COPY.zh[key] || null;
  }

  function applyLang(lang) {
    currentLang = lang === "en" ? "en" : "zh";

    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";

    var title = textFor(currentLang, "page.title");
    if (title) document.title = title;
    var desc = textFor(currentLang, "page.desc");
    var descNode = document.querySelector('meta[name="description"]');
    if (desc && descNode) descNode.setAttribute("content", desc);

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      var value = textFor(currentLang, key);
      if (value == null) continue;
      // 少量文案含 <strong>/<code>，统一按 HTML 写入；其余为纯文本。
      nodes[i].innerHTML = value;
    }

    var alts = document.querySelectorAll("[data-i18n-alt]");
    for (var j = 0; j < alts.length; j++) {
      var altKey = alts[j].getAttribute("data-i18n-alt");
      var altValue = textFor(currentLang, altKey);
      if (altValue != null) alts[j].setAttribute("alt", altValue);
    }

    var buttons = document.querySelectorAll(".lang__btn");
    for (var k = 0; k < buttons.length; k++) {
      var isActive = buttons[k].getAttribute("data-lang") === currentLang;
      buttons[k].classList.toggle("is-active", isActive);
      buttons[k].setAttribute("aria-pressed", isActive ? "true" : "false");
    }

    storeLang(currentLang);
  }

  function initLang() {
    var buttons = document.querySelectorAll(".lang__btn");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function () {
        applyLang(this.getAttribute("data-lang"));
      });
    }
    applyLang(readStoredLang());
  }

  /* ---------------- 滚动渐显 ---------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add("is-visible");
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });

    for (var j = 0; j < items.length; j++) observer.observe(items[j]);
  }

  /* ---------------- 导航滚动态 ---------------- */
  function initNav() {
    var nav = document.getElementById("nav");
    if (!nav) return;

    var sections = document.querySelectorAll(".section--dark");

    // 顶部 30px 落在深色区块里时，导航换成深色毛玻璃（浅色区块上保持浅色）
    var overDark = function () {
      for (var i = 0; i < sections.length; i++) {
        var rect = sections[i].getBoundingClientRect();
        if (rect.top <= 30 && rect.bottom > 30) return true;
      }
      return false;
    };

    var queued = false;
    var sync = function () {
      queued = false;
      nav.classList.toggle("is-scrolled", window.scrollY > 8);
      nav.classList.toggle("is-dark", overDark());
    };
    var request = function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(sync);
    };

    sync();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
  }

  /* ---------------- 截图兜底：缺图时显示灰块而不是破图标 ---------------- */
  function initShots() {
    var shots = document.querySelectorAll("[data-shot]");
    for (var i = 0; i < shots.length; i++) {
      (function (shot) {
        var img = shot.querySelector("img");
        if (!img) return;
        var markEmpty = function () { shot.classList.add("is-empty"); };
        var markReady = function () { shot.classList.remove("is-empty"); };

        img.addEventListener("error", markEmpty);
        img.addEventListener("load", markReady);
        if (img.complete) {
          if (img.naturalWidth === 0) markEmpty();
          else markReady();
        }
      })(shots[i]);
    }
  }

  function boot() {
    initLang();
    initReveal();
    initNav();
    initShots();

    // 站内锚点滚动（file:// 下部分浏览器需要显式处理）
    var links = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function (event) {
        var id = this.getAttribute("href");
        if (!id || id === "#") return;
        var target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({
          behavior: window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          block: "start"
        });
        if (history.replaceState) history.replaceState(null, "", id);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
