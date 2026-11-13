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
        "HoneySky White Board 是为 Windows 打造的桌面白板：压感书写、尺规作图、时钟与倒计时独立窗口、浮动 Dock、文件导入背景、AI 讲台与 AI 助手。v1.2.7.2 把讲台画面调顺：画面设置面板不再被画面遮挡，采集与显示分辨率默认拉到最高，旋转画面更稳定；AI 抽屉的回答区随窗口自适应，左侧箭头即可收起；设置的「更新」页集中管理更新源、下载与已下载的安装包，配置可一键导出与导入，下载能取消、已下载的包能删除。免费下载。",

      "hero.eyebrow": "Windows 桌面白板 · v1.2.7.2",
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
      "img.brush": "Dock 的画笔二级面板：12 种颜色、粗细滑块，笔尖区两行排开钢笔 / 马克笔 / 毛笔 / 直线笔 / 水彩 / 粉笔六种笔尖；原来的荧光笔入口已移除",

      "common.new": "新",

      "f2.kicker": "时间工具",
      "f2.title": "时钟与倒计时，独立成窗。",
      "f2.lead": "时钟与倒计时跑在独立进程里，关掉白板也还在。时钟右上角的图钉打开时，所有 HoneySky 窗口一起置顶；关掉图钉，时钟只压在白板上方。倒计时可以上下滚轮选时间，网络授时有 5 个服务器可选。",
      "f2.cap1": "时钟 · 独立进程，关掉白板也还在",
      "f2.cap2": "倒计时 · 滚轮选时间，5 个授时服务器可选",
      "img.clock": "独立时钟窗口：橙色秒数、日期、网络授时状态与「立即校准」，字号与背景透明度可调，放大后依然清晰",
      "img.countdown": "独立倒计时窗口：05:00 待开始，10 秒 / 1 分 / 5 分 / 10 分 / 25 分预设；时、分、秒三列可点上下箭头或滚轮选择，开始、暂停、继续、重置",

      "f3.kicker": "AI 讲台与助手",
      "f3.title": "讲解不再是一个人对着黑板。",
      "f3.lead": "把题目交给 AI 讲台：打开即全屏，拍下纸张、贴入图片，AI 在白板上边写边讲，支持 LaTeX 公式；画面设置面板不再被画面挡住，采集与显示分辨率默认最高，旋转画面也稳定了，色温与亮度照旧可调；悬浮 Dock 可左右拖动、也能收起成小胶囊，拍照、相册、画面、旋转与问 AI 都在扩展条上，左下鸟瞰图拖动即可移动画面。日常答疑交给右侧抽屉里的 AI 助手——主界面与讲台各一个，回答区随窗口高度自适应，点左侧箭头就能把抽屉收起。",
      "f3.cap1": "AI 讲台 · 画面设置不再被按钮行遮挡，采集与显示默认最高",
      "f3.cap2": "AI 助手 · 回答区自适应，点左侧箭头收起",
      "f3.note": "AI 功能为可选能力，使用你自己的 OpenAI 兼容接口与 API Key；密钥经 Windows DPAPI 加密保存在本机。",
      "img.podium": "AI 讲台：黑底画面设置弹层完整显示在按钮行上方——采集分辨率「设备最高（自动）」、显示分辨率「原始（不缩放）」、实际采集 1280×720，调色与缩放可调；下方是拍照 / 相册 / 画面 / 旋转 / 问 AI 扩展条与悬浮 Dock",
      "img.aibooth": "白板画布与右侧 AI 抽屉：DeepSeek 回答 x²−5x+6=0 的因式分解步骤与答案，块级公式正常渲染；回答区自适应填满抽屉高度，左缘露出一枚 24×64 的展开 / 收起箭头把手，底部余额显示「已关闭查询」",

      "f4.kicker": "页面与工具",
      "f4.title": "多页白板，工具栏按你的习惯排。",
      "f4.lead": "一节课不止一页：缩略图栏随手翻页，导入的文档有页码、滑条与目录，缩放与适应窗口一键到位。工具栏里的工具能显示、固定、上下调序，画布右键还能复制、剪切、粘贴与置顶置底。",
      "f4.cap1": "多页与缩放 · 缩略图、翻页、适应窗口",
      "f4.cap2": "设置 · 更新项集中在「更新」页，下载可取消、可删除",
      "img.pages": "左下角页面缩略图条只显示 3 个缩略图（第 3、4、5 页），右下角翻页条含全屏按钮：共 5 页白板，当前第 5 页",
      "img.settings": "设置「更新」页：当前版本 v1.2.7.2，尚未检查；卡内含立即检查更新、查看发布页、更新内容与下载状态，更新源可选「自动（镜像优先）」或 GitHub 直连，并说明下载可取消、已下载的安装包可删除",

      "f5.kicker": "还有这些",
      "f5.title": "用得越久，越觉得顺手。",
      "c1.title": "半透明马克笔",
      "c1.body": "马克笔的半透明墨迹叠在文字上不遮字，粗细可调。",
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

      "f6.kicker": "v1.2.7.2 修正与增强",
      "f6.title": "讲台更顺，设置更集中。",
      "f6.lead": "这一版把讲台画面与设置收顺：画面设置面板不再被画面遮挡，采集与显示分辨率默认拉到最高，旋转画面更稳；AI 抽屉的回答区随窗口自适应，左侧箭头一键收起；设置的「更新」页集中管理更新源、检查、下载与已下载安装包，配置能一键导出与导入，下载可取消、已下载的包也能删除。",
      "f6.cap1": "启动页 · 只剩品牌与进度，两个按钮已移入设置",
      "f6.cap2": "关于页 · 品牌与 GitHub 入口",
      "img.splash": "启动页：蓝色带笔图标、HoneySky White Board 与版本号，橙色进度圈与「正在加载画布…」，只剩品牌与进度，没有「即刻启动 / 以后直接显示」按钮",
      "img.about": "设置 → 关于页：蓝色带笔图标、品牌字扫光、版本号，作者卡片保留 GitHub 仓库入口，另有检查更新、打开数据目录、清除缓存、第三方许可与软件更新卡",
      "n1.title": "画面设置不再被挡",
      "n1.body": "讲台的画面设置面板改成不会被画面盖住的浮层，调分辨率、色温、亮度时不必先把画面拖开，改完立即生效。",
      "n2.title": "采显默认最高",
      "n2.body": "采集与显示分辨率默认选最高档，投影出来更清楚；需要省性能时再往下调。",
      "n3.title": "旋转更稳",
      "n3.body": "画面旋转重新处理了坐标与尺寸，连续旋转不再错位或闪退，批注跟着画面一起转。",
      "n4.title": "AI 回答区自适应",
      "n4.body": "AI 抽屉的回答区随窗口高度伸缩，长回答在自己的区域里滚动，输入框与按钮始终固定在底部。",
      "n5.title": "左侧箭头收起",
      "n5.body": "抽屉左缘加了一枚收起箭头，讲课时点一下就把 AI 收走，需要时再滑出来。",
      "n6.title": "更新页集中管理",
      "n6.body": "设置新增「更新」页：更新源、立即检查、下载进度与已下载的安装包都在一处，不用再在关于页和弹窗之间来回找。",
      "n7.title": "配置导入导出",
      "n7.body": "设置可一键导出配置文件，换电脑或重装时导入即可恢复；导出的是可读的 JSON，便于备份。",
      "n8.title": "下载可取消可删除",
      "n8.body": "更新包下载中途可以取消，已下载的安装包也能直接删除，不再占着磁盘。",
      "f6.history": "v1.2.7.1 的笔刷修复、全屏讲台、右侧抽屉与图钉置顶都还在。",

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

      "foot.version": "版本 1.2.7.2",
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
        "A desktop whiteboard for Windows: pressure-sensitive ink, ruler and compass, clock and countdown windows, a floating dock, file import as background, AI podium and assistant. v1.2.7.2 smooths the podium picture: the picture settings panel is no longer hidden, capture and display default to the highest resolution, and rotation is stable; the AI drawer's answer area adapts to the window and collapses with the left arrow; Settings - Updates now gathers update sources, downloads and downloaded installers, settings can be exported and imported in one click, and downloads can be cancelled or deleted. Free download.",

      "hero.eyebrow": "Desktop whiteboard for Windows · v1.2.7.2",
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
      "img.brush": "The dock's brush panel: twelve colors and a width slider, with six pen tips - pen, marker, brush, straight, watercolor and chalk - laid out over two rows; the old highlighter tab has been removed",

      "common.new": "New",

      "f2.kicker": "Time tools",
      "f2.title": "Clock and countdown, in their own window.",
      "f2.lead": "The clock and countdown run in their own process and stay on screen after the board closes. With the pin on, every HoneySky window stays on top; turn it off and the clock only sits above the board. The countdown picks time with a wheel, and five NTP servers are available.",
      "f2.cap1": "Clock · its own process, still there after the board closes",
      "f2.cap2": "Countdown · wheel-picked time, five time servers",
      "img.clock": "Standalone clock window with orange seconds, the date, network time sync status and a recalibrate button; font size and background opacity are adjustable and stay crisp when enlarged",
      "img.countdown": "Standalone countdown window: 05:00 not started, with 10s / 1 / 5 / 10 / 25 minute presets; hour, minute and second columns can be set with the up/down arrows or the mouse wheel, plus start, pause, resume and reset",

      "f3.kicker": "AI podium & assistant",
      "f3.title": "You are no longer alone at the blackboard.",
      "f3.lead": "Hand a problem to the AI podium: it opens full screen, so photograph the paper or drop in an image and the AI works through it on the board, LaTeX included; the picture settings panel is no longer hidden behind the picture, capture and display resolution default to the highest option, rotation is stable, and color temperature and brightness are still adjustable; the floating dock can be dragged sideways or collapsed into a capsule, with capture, album, picture settings, rotation and ask-AI on its expanded strip, and a minimap at the lower left to move the view. For quick questions, the AI assistant is a right-side drawer - one on the board and one in the podium - its answer area grows with the window, and the left arrow tucks it away.",
      "f3.cap1": "AI podium · The picture panel no longer sits under the button bar, and capture and display default to the highest",
      "f3.cap2": "AI assistant · The answer area adapts, and the left arrow tucks it away",
      "f3.note": "AI is optional and uses your own OpenAI-compatible endpoint and API key; the key is encrypted with Windows DPAPI and stored locally.",
      "img.podium": "The AI podium: the dark picture-settings panel is fully visible above the button row — capture resolution “Device maximum (auto)”, display resolution “Original (no scaling)”, actual capture 1280×720, with color and zoom controls; below it are the capture / album / picture / rotate / ask-AI strip and the floating dock",
      "img.aibooth": "A whiteboard canvas with the AI drawer on the right: DeepSeek's factorization of x²−5x+6=0 with block formulas; the answer area fills the drawer, a 24×64 expand/collapse arrow handle sits on its left edge, and the balance reads “queries off”",

      "f4.kicker": "Pages & tools",
      "f4.title": "Many pages. A tool bar that fits you.",
      "f4.lead": "A lesson rarely fits on one page: flip through the thumbnail rail, and imported documents come with a page number, a scrubber and a table of contents. Zoom and fit the board to the window in one click, show, pin and reorder tools, change their shortcuts — and use the canvas right-click menu to copy, cut, paste, bring to front or send to back.",
      "f4.cap1": "Pages & zoom · thumbnails, page flipping, fit to window",
      "f4.cap2": "Settings · Updates live on one tab, and downloads can be cancelled or deleted",
      "img.pages": "The page thumbnail strip at the lower left showing three thumbnails (pages 3, 4 and 5) and the pager at the lower right with its full-screen button, out of five pages, currently page 5",
      "img.settings": "The Updates tab of Settings: current version v1.2.7.2, not checked yet; the card holds check-now, view-release, release notes and download status, the source can be “Automatic (mirror first)” or direct GitHub, and it notes that downloads can be cancelled and downloaded installers deleted",

      "f5.kicker": "And more",
      "f5.title": "The longer you use it, the better it fits.",
      "c1.title": "Translucent marker",
      "c1.body": "The marker lays down translucent ink that sits over text without hiding it, with adjustable width.",
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

      "f6.kicker": "Fixes and polish in v1.2.7.2",
      "f6.title": "A smoother podium. Tidier settings.",
      "f6.lead": "This release smooths the podium picture and gathers settings in one place: the picture settings panel is no longer hidden, capture and display default to the highest resolution, and rotation is stable; the AI drawer's answer area grows with the window and the left arrow tucks it away; Settings - Updates now gathers the update source, checks, downloads and downloaded installers, settings can be exported and imported in one click, and a download can be cancelled or its installer deleted.",
      "f6.cap1": "Splash · just the brand and progress; both buttons live in Settings",
      "f6.cap2": "About page · the brand and the GitHub entry",
      "img.splash": "The splash screen: blue pencil icon, HoneySky White Board and the version, an orange progress ring and the loading message — only the brand and progress, with no start-now or skip-next-time buttons",
      "img.about": "Settings → About: the blue pencil icon, the sweeping brand name and the version, an author card that links to the GitHub repository, plus check for updates, open data folder, clear cache, third-party licenses and the software update card",
      "n1.title": "Picture settings stay visible",
      "n1.body": "The podium's picture settings now sit in a layer the picture cannot cover, so resolution, color temperature and brightness can be changed without dragging the picture aside; changes apply at once.",
      "n2.title": "Highest resolution by default",
      "n2.body": "Capture and display resolution now default to the highest option for a sharper projected image; drop them a step if you need to save performance.",
      "n3.title": "Stable rotation",
      "n3.body": "Rotation now recomputes coordinates and sizes properly: repeated turns no longer shift the picture or crash, and annotations rotate with it.",
      "n4.title": "The AI answer area adapts",
      "n4.body": "The drawer's answer area grows and shrinks with the window; long answers scroll in their own pane while the input and buttons stay pinned at the bottom.",
      "n5.title": "Tuck it away with the left arrow",
      "n5.body": "A collapse arrow on the drawer's left edge puts the assistant away with one click mid-lesson, and it slides back when you need it.",
      "n6.title": "Updates gathered in one page",
      "n6.body": "A new Updates page in Settings brings the update source, a check-now button, download progress and downloaded installers together, instead of hopping between the About page and pop-ups.",
      "n7.title": "Export and import settings",
      "n7.body": "Export your settings to a file and import them on another PC or after a reinstall; the file is readable JSON, easy to back up.",
      "n8.title": "Cancel or delete downloads",
      "n8.body": "An update download can be cancelled part-way, and an installer you no longer need can be deleted, so it stops taking up disk space.",
      "f6.history": "The v1.2.7.1 brush fixes, full-screen podium, right-side drawer and the clock pin are all still here.",

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

      "foot.version": "Version 1.2.7.2",
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
