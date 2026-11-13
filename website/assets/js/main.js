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
        "HoneySky White Board 是为 Windows 打造的桌面白板：压感书写、尺规作图、时钟与倒计时独立窗口、浮动 Dock、文件导入背景、AI 讲台答题与 AI 助手。v1.2.7 让触控单指优先当前工具、双指缩放不再误画，画笔增量渲染与橡皮局部重绘让长课更跟手；时钟与倒计时改为独立进程、关掉白板仍显示，图钉一键置顶全部窗口；倒计时可用滚轮选时间、5 个授时服务器可选；讲台底栏只留书写操作并可贴底收起。免费下载。",

      "hero.eyebrow": "Windows 桌面白板 · v1.2.7",
      "hero.product": "HoneySky White Board",
      "hero.tagline": "写在无边的画布上。",
      "hero.lead": "一支笔，一块无边的白板，和一个随时待命的 AI。为 Windows 打造，压感书写与全部工具都在本地运行。",
      "hero.cta1": "下载 Windows 版",
      "hero.cta2": "查看功能",
      "hero.note": "免费下载 · Windows 10 / 11 · x64",

      "img.hero": "HoneySky White Board 主界面：左上角蓝色带笔图标 + 品牌字 + 版本号水印，无边画布上手写与图形，底部浮动 Dock（画笔、橡皮、形状、直尺、时钟、导入、AI 讲台、问 AI），左下角页面缩略图条，右下角翻页条与缩放条",

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
      "f2.title": "时钟与倒计时，独立成窗。",
      "f2.lead": "时钟与倒计时现在跑在独立进程里，关掉白板也还在；窗口右上角的图钉一键决定是否压住所有 HoneySky 窗口；倒计时可以上下滚轮选时间，网络授时有 5 个服务器可选。",
      "f2.cap1": "时钟 · 独立进程，关掉白板也还在",
      "f2.cap2": "倒计时 · 滚轮选时间，5 个授时服务器可选",
      "img.clock": "独立时钟窗口：橙色秒数、日期、网络授时状态与「立即校准」，字号与背景透明度可调，放大后依然清晰",
      "img.countdown": "独立倒计时窗口：05:00 待开始，10 秒 / 1 分 / 5 分 / 10 分 / 25 分预设；时、分、秒三列可点上下箭头或滚轮选择，开始、暂停、继续、重置",

      "f3.kicker": "AI 讲台与助手",
      "f3.title": "讲解不再是一个人对着黑板。",
      "f3.lead": "把题目交给 AI 讲台：拍下纸张、贴入图片，AI 在白板上边写边讲，支持 LaTeX 公式；画面可调分辨率、色温与亮度，底栏只留书写相关的操作、还能贴底收起，拍下的照片收进常驻相册对比讲解。日常答疑则交给角落里的 AI 助手浮窗。",
      "f3.cap1": "AI 讲台 · 相册：拍照收进相册，支持对比与保存",
      "f3.cap2": "AI 助手 · 随时呼出，回答字号可调",
      "f3.note": "AI 功能为可选能力，使用你自己的 OpenAI 兼容接口与 API Key；密钥经 Windows DPAPI 加密保存在本机。",
      "img.podium": "AI 讲台的相册面板：标题「相册 1/24 张 · 当前：照片 1」，缩略图与「照片 1」，说明「保存：关闭（仅本次会话）」，以及「拍照 / 本地图片 / 对比图片 / 保存图片 / 删除当前照片 / 退出图片讲解」与「清空相册」按钮",
      "img.aibooth": "AI 助手浮窗：DeepSeek 回答的因式分解过程，块级公式正常渲染，底部有回答字号滑块与余额状态",

      "f4.kicker": "页面与工具",
      "f4.title": "多页白板，工具栏按你的习惯排。",
      "f4.lead": "一节课不止一页：缩略图栏随手翻页，导入的文档有页码、滑条与目录，缩放与适应窗口一键到位。工具栏里的工具能显示、固定、上下调序，画布右键还能复制、剪切、粘贴与置顶置底。",
      "f4.cap1": "多页与缩放 · 缩略图、翻页、适应窗口",
      "f4.cap2": "设置 · 十个页签：展台页集中笔尖、橡皮与相册",
      "img.pages": "左下角页面缩略图条只显示 3 个缩略图（第 3、4、5 页），右下角翻页条含全屏按钮：共 5 页白板，当前第 5 页",
      "img.settings": "设置窗口的展台页：顶部十个页签（常规 / 外观 / 书写 / 展台 / 工具栏 / 快捷键 / 动画 / 更新 / AI 服务 / 关于）；笔尖可选跟随白板或六种笔形，橡皮可选整笔或局部并调半径；相册可开启自动保存、设置照片保留天数 1–30 天与相册容量 1–50 张，底部是恢复展台默认设置",

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

      "f6.kicker": "v1.2.7 新增",
      "f6.title": "写得更顺，时钟更自由。",
      "f6.lead": "这一版把触控和书写性能又推了一截：单指优先当前工具、双指缩放不再误画，画笔增量渲染与橡皮局部重绘让长课也不掉帧；时钟拆成独立进程，关掉白板仍能显示，图钉一键置顶所有 HoneySky 窗口；倒计时可以上下滚轮选时间，授时服务器有 5 个可选；讲台底栏只留书写相关操作，还能贴底收起。",
      "f6.cap1": "启动页 · 只剩品牌与进度，两个按钮已移入设置",
      "f6.cap2": "关于页 · 品牌与 GitHub 入口",
      "img.splash": "启动页：蓝色带笔图标、HoneySky White Board 与版本号，橙色进度圈与「正在加载画布…」，只剩品牌与进度，没有「即刻启动 / 以后直接显示」按钮",
      "img.about": "设置 → 关于页：蓝色带笔图标、品牌字扫光、版本号，作者卡片保留 GitHub 仓库入口，另有检查更新、打开数据目录、清除缓存、第三方许可与软件更新卡",
      "n1.title": "单指画，双指缩",
      "n1.body": "单指默认使用当前工具，双指缩放只缩画面、不落笔——触屏上写和缩放各走各的。",
      "n2.title": "画笔增量渲染，长课不掉帧",
      "n2.body": "笔迹改为增量渲染，只重绘变化的部分；连续写满一屏也不再整页重算，抬笔即见。",
      "n3.title": "橡皮只重绘擦过的地方",
      "n3.body": "擦除改为局部重绘，擦一笔只刷新那一小块；大面积擦除不再整页卡住。",
      "n4.title": "时钟在独立进程里跑",
      "n4.body": "时钟与倒计时移出白板进程，关掉白板窗口也不会一起消失；时间一直走着。",
      "n5.title": "右上角图钉，管住所有窗口",
      "n5.body": "时钟窗口右上角的图钉控制全部 HoneySky 窗口的置顶：钉住后白板、讲台与 AI 助手一起浮在最上层，松开恢复普通层级。",
      "n6.title": "时间用滚轮选",
      "n6.body": "倒计时的小时、分钟、秒可以直接上下滚动选择，不用反复点加减号；预设与自定义都保留。",
      "n7.title": "5 个授时服务器可选",
      "n7.body": "网络授时提供 5 个 NTP 服务器，默认自动挑一个，也可以自己指定；某个连不上就换下一个。",
      "n8.title": "讲台 Dock 只留书写，还能收起",
      "n8.body": "讲台底栏只保留笔、橡皮、颜色这些书写相关操作，一键贴到底边收起；讲解时画面更干净。",
      "f6.history": "v1.2.6.1 的讲台缩放、相册常驻、十页签设置与照片按天保留都还在。",

      "req.kicker": "系统要求",
      "req.title": "几乎任何一台 Windows 电脑。",
      "req.lead": "安装包自带 .NET 8 运行时，不需要你另外装环境。",
      "req.k1": "系统",
      "req.v1": "Windows 10 1709+ / Windows 11",
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

      "foot.version": "版本 1.2.7",
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
        "A desktop whiteboard for Windows: pressure-sensitive ink, ruler and compass, clock and countdown windows, a floating dock, file import as background, AI podium and assistant. v1.2.7 gives touch a single finger for the current tool and two fingers for zoom, makes brush rendering incremental and eraser repaints local so long lessons stay fluid; the clock and countdown run in their own process and survive closing the board, with a pin that puts every HoneySky window on top; the countdown picks time with a wheel, five NTP servers are available, and the podium bar keeps only writing tools and can tuck away. Free to download.",

      "hero.eyebrow": "Desktop whiteboard for Windows · v1.2.7",
      "hero.product": "HoneySky White Board",
      "hero.tagline": "Draw without edges.",
      "hero.lead": "One pen, an infinite canvas, and an AI that is always on call. Built for Windows, with pressure-sensitive ink and every tool running locally.",
      "hero.cta1": "Download for Windows",
      "hero.cta2": "See features",
      "hero.note": "Free download · Windows 10 / 11 · x64",

      "img.hero": "The HoneySky White Board main window: a watermark with the blue pencil icon, brand name and version in the top-left; ink and shapes on an infinite canvas; a floating dock at the bottom (pen, eraser, shapes, ruler, clock, import, AI podium, ask AI); page thumbnails at the lower left; the pager and zoom controls at the lower right",

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
      "f2.title": "Clock and countdown, in their own window.",
      "f2.lead": "The clock and countdown now run in their own process and stay on screen after the board closes; a pin in the corner decides whether they sit above every HoneySky window; the countdown picks time with a wheel, and five NTP servers are available.",
      "f2.cap1": "Clock · its own process, still there after the board closes",
      "f2.cap2": "Countdown · wheel-picked time, five time servers",
      "img.clock": "Standalone clock window with orange seconds, the date, network time sync status and a recalibrate button; font size and background opacity are adjustable and stay crisp when enlarged",
      "img.countdown": "Standalone countdown window: 05:00 not started, with 10s / 1 / 5 / 10 / 25 minute presets; hour, minute and second columns can be set with the up/down arrows or the mouse wheel, plus start, pause, resume and reset",

      "f3.kicker": "AI podium & assistant",
      "f3.title": "You are no longer alone at the blackboard.",
      "f3.lead": "Hand a problem to the AI podium: photograph the paper or drop in an image, and the AI works through it on the board, LaTeX included; capture resolution, color temperature and brightness are adjustable, the bar keeps only writing tools and tucks away at the bottom, and photos land in a permanent album for side-by-side explanation. For quick questions, the AI assistant floats in the corner.",
      "f3.cap1": "AI podium · album: captures filed for comparison and saving",
      "f3.cap2": "AI assistant · one hotkey away, with adjustable answer size",
      "f3.note": "AI is optional and uses your own OpenAI-compatible endpoint and API key; the key is encrypted with Windows DPAPI and stored locally.",
      "img.podium": "The AI podium's album panel: a header reading album, 1 of 24 shots, currently photo 1; the thumbnail with its label; a note that saving is off for this session; buttons for capture, local image, compare, save, delete and leave picture mode; and a clear-album action",
      "img.aibooth": "The floating AI assistant answering a factorization question with rendered block formulas, an answer text-size slider and the balance status",

      "f4.kicker": "Pages & tools",
      "f4.title": "Many pages. A tool bar that fits you.",
      "f4.lead": "A lesson rarely fits on one page: flip through the thumbnail rail, and imported documents come with a page number, a scrubber and a table of contents. Zoom and fit the board to the window in one click, show, pin and reorder tools, change their shortcuts — and use the canvas right-click menu to copy, cut, paste, bring to front or send to back.",
      "f4.cap1": "Pages & zoom · thumbnails, page flipping, fit to window",
      "f4.cap2": "Settings · ten tabs, with a Podium tab for pen tip, eraser and album",
      "img.pages": "The page thumbnail strip at the lower left showing three thumbnails (pages 3, 4 and 5) and the pager at the lower right with its full-screen button, out of five pages, currently page 5",
      "img.settings": "The Podium tab of the settings window, with ten tabs across the top (General, Appearance, Writing, Podium, Toolbar, Shortcuts, Animation, Updates, AI service, About): the pen tip can follow the board or be fixed to one of six shapes, the eraser works whole-stroke or partially with its own radius, the album can save to disk with a 1–30 day retention and a 1–50 shot capacity, and a restore-defaults button sits at the bottom",

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

      "f6.kicker": "New in v1.2.7",
      "f6.title": "Smoother ink. A clock that outlives the board.",
      "f6.lead": "This release pushes touch and ink performance further: one finger keeps the current tool while a two-finger pinch only zooms, and incremental brush rendering plus local eraser repaints keep long lessons fluid. The clock now runs in its own process and stays on screen after the board closes, with a pin that puts every HoneySky window on top; the countdown picks time with a wheel, five NTP servers are selectable, and the podium bar keeps only writing tools and tucks away at the bottom.",
      "f6.cap1": "Splash · just the brand and progress; both buttons live in Settings",
      "f6.cap2": "About page · the brand and the GitHub entry",
      "img.splash": "The splash screen: blue pencil icon, HoneySky White Board and the version, an orange progress ring and the loading message — only the brand and progress, with no start-now or skip-next-time buttons",
      "img.about": "Settings → About: the blue pencil icon, the sweeping brand name and the version, an author card that links to the GitHub repository, plus check for updates, open data folder, clear cache, third-party licenses and the software update card",
      "n1.title": "One finger draws, two fingers zoom",
      "n1.body": "On touch, a single finger drives the current tool and a two-finger pinch only zooms the picture — it never leaves a stroke. Drawing and zooming stop fighting each other.",
      "n2.title": "Incremental brush rendering",
      "n2.body": "Strokes are rendered incrementally, redrawing only what changed; filling the screen with ink no longer recomputes the whole page, and the ink is there as soon as the pen lifts.",
      "n3.title": "The eraser repaints only where it rubs",
      "n3.body": "Erasing repaints just the area you touched, so sweeping the eraser across a full board no longer stalls the page — useful when you clean up mid-lesson.",
      "n4.title": "A clock that survives the board",
      "n4.body": "The clock and countdown now run in their own process, so closing the board window does not take them with it; bring the board back whenever you need it and the time keeps running.",
      "n5.title": "A pin that owns every window",
      "n5.body": "The pin at the top-right of the clock window controls all HoneySky windows: pin it and the board, the podium and the AI assistant all float on top; unpin and they return to the normal layer.",
      "n6.title": "Pick the time with a wheel",
      "n6.body": "Hours, minutes and seconds scroll up and down like a wheel, instead of tapping plus and minus; the presets and the custom field are still there.",
      "n7.title": "Five time servers to choose from",
      "n7.body": "Network time offers five NTP servers — pick one yourself or let it choose automatically; if one is unreachable the next one takes over, so calibration never gets stuck.",
      "n8.title": "A podium bar for writing — and it tucks away",
      "n8.body": "The podium bar keeps only what writing needs (pen, eraser, color) and can tuck down against the bottom edge; the picture stays clean during a lesson, and it comes back when you need it.",
      "f6.history": "Everything from v1.2.6.1 — podium zoom, the permanent album, ten-tab Settings and day-based photo retention — is still here.",

      "req.kicker": "Requirements",
      "req.title": "Almost any Windows PC will do.",
      "req.lead": "The installer bundles the .NET 8 runtime, so there is nothing else to set up.",
      "req.k1": "OS",
      "req.v1": "Windows 10 1709+ / Windows 11",
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

      "foot.version": "Version 1.2.7",
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
