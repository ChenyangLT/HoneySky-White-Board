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
        "HoneySky White Board 是为 Windows 打造的桌面白板：压感书写、尺规作图、时钟与倒计时独立窗口、浮动 Dock、文件导入背景、AI 讲台答题与 AI 助手。v1.2.3 优化触控书写与导入翻页，讲台画面可旋转，免费下载。",

      "hero.eyebrow": "Windows 桌面白板 · v1.2.3",
      "hero.product": "HoneySky White Board",
      "hero.tagline": "写在无边的画布上。",
      "hero.lead": "一支笔，一块无边的白板，和一个随时待命的 AI。为 Windows 打造，压感书写与全部工具都在本地运行。",
      "hero.cta1": "下载 Windows 版",
      "hero.cta2": "查看功能",
      "hero.note": "免费下载 · Windows 10 / 11 · x64",

      "img.hero": "HoneySky White Board 主界面：无边画布上手写与图形，左上角是「图标 + 品牌字 + 版本号」水印，底部浮动 Dock、左下角页面缩略图条、右下角翻页条（含全屏按钮）与缩放条",

      "features.kicker": "功能",
      "features.title": "为老师，也为每一个把想法画出来的人。",
      "features.lead": "从一支笔开始，到 AI 讲台答题。每一处细节都为「讲清楚一件事」而设计。",

      "f1.kicker": "书写与笔触",
      "f1.title": "像笔一样，像纸一样。",
      "f1.body": "笔迹平滑与压感整笔重绘，250 Hz 采样下依然跟手。橡皮可整笔擦除，也可局部擦除；手指绘画默认关闭，避免误触。",
      "f1.b1": "压感笔迹与实时光滑",
      "f1.b2": "局部擦除 / 整笔擦除两种橡皮",
      "f1.b3": "自动化笔迹，随手写就有体面",
      "img.brush": "Dock 的画笔二级面板：画笔 / 荧光笔切换、12 种颜色、粗细滑块与钢笔 / 马克笔 / 毛笔三种笔尖",

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
      "f3.lead": "把题目交给 AI 讲台：拍下纸张、贴入图片，AI 在白板上边写边讲，支持 LaTeX 公式。日常答疑则交给角落里的 AI 助手浮窗。",
      "f3.cap1": "AI 讲台 · 照片当背景，直接在照片上批注讲解",
      "f3.cap2": "AI 助手 · 随时呼出，回答字号可调",
      "f3.note": "AI 功能为可选能力，使用你自己的 OpenAI 兼容接口与 API Key；密钥经 Windows DPAPI 加密保存在本机。",
      "img.podium": "AI 讲台：导入的照片铺满画面，红色批注，左下角照片缩略图与底部拍照按钮",
      "img.aibooth": "AI 助手浮窗：DeepSeek 回答的因式分解过程，块级公式正常渲染，底部有回答字号滑块与余额状态",

      "f4.kicker": "页面与工具",
      "f4.title": "多页白板，工具栏按你的习惯排。",
      "f4.lead": "一节课不止一页：缩略图栏随手翻页，缩放与适应窗口一键到位。工具栏里的工具能显示、固定、上下调序，快捷键也可改。",
      "f4.cap1": "多页与缩放 · 缩略图、翻页、适应窗口",
      "f4.cap2": "设置 · 每条栏、每次启动行为，都能按需开关",
      "img.pages": "左下角页面缩略图条只显示 3 个缩略图（第 3、4、5 页），右下角翻页条含全屏按钮：共 5 页白板，当前第 5 页",
      "img.settings": "设置窗口的常规页（滚动到下半部分）：显示左侧页面栏、显示顶部栏（关闭即沉浸模式）、显示浮动工具条、显示左下角页面缩略图条（显示页数 3）、显示右下角翻页条、启动时恢复上次打开的文档、启动时提示恢复未保存的文档（默认关闭）、启动时显示动画（Splash）、启动时进入全屏（覆盖任务栏，Esc / F11 退出）",

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

      "f6.kicker": "v1.2.3 新增",
      "f6.title": "触屏更跟手，讲台能转。",
      "f6.lead": "这一版专治触控与讲解里的别扭：触摸书写合并中间点后更跟手，双指缩放不再抖，手掌大面积一压就变橡皮；讲台画面可以旋转；导入文件翻页不再卡，页面四周有了边框和翻页条；Dock 可以放大并在图标下显示名称。",
      "n1.title": "讲台画面可以转",
      "n1.body": "讲台底部新增旋转按钮，一下转 90°：0°→90°→180°→270° 循环。画面按旋转后的矩形等比适配，批注坐标跟着一起转；拍照、截图与问 AI 用的都是旋转后的画面。",
      "n2.title": "触摸书写更跟手",
      "n2.body": "触摸与手写笔分开处理：触摸的中间点全部合并，按最小间距去重后再平滑，笔迹不再一顿一顿；绘制合并到每帧一次，慢一点的设备上也不掉帧。",
      "n3.title": "双指缩放不再抽，手掌一压就橡皮",
      "n3.body": "两指一落下就取消单指笔画，缩放增量做了钳制，视图不再抖着乱跳。手写时手掌大面积接触屏幕会临时切成橡皮，接触变小或抬手就切回笔；这个行为在设置里可以关掉。",
      "n4.title": "导入翻页不卡了",
      "n4.body": "背景渲染搬到后台，过期结果直接丢掉，内存里最多缓存 4 页并预取前后页，翻页立即响应。有背景时页面四周多了一圈 1px 边框与柔和投影，下方还有「‹ 第 x / y 页 ›」翻页条。",
      "n5.title": "Dock 能放大，也会报名字",
      "n5.body": "Dock 默认比之前大一点，图标下方直接写着功能名（画笔、橡皮、导入、问 AI……）；「设置 → 工具栏」里的「Dock 大小」可在 0.85–1.40 之间调，窗口太窄时会按可用宽度收回，不遮挡画布。",
      "n6.title": "更新只提示，下载交给浏览器",
      "n6.body": "装的是旧版时点「检查更新」，应用只会提示「发现新版本」；点「查看」打开 GitHub Release 页面，下载和安装都在浏览器里完成——应用内不下载，也不会自动安装。检查顺序是先查 GitHub API，失败再自动切镜像源。",
      "f6.history": "v1.2.2 的全屏 AI 浮窗置顶、关于页 GitHub 直达、更新先问 GitHub、启动不弹恢复提示与一键清除缓存都还在。",

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

      "foot.version": "版本 1.2.3",
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
        "A desktop whiteboard for Windows: pressure-sensitive ink, ruler and compass, clock and countdown windows, a floating dock, file import as background, AI podium and assistant. v1.2.3 smooths touch writing and page flips, adds podium rotation, and is free to download.",

      "hero.eyebrow": "Desktop whiteboard for Windows · v1.2.3",
      "hero.product": "HoneySky White Board",
      "hero.tagline": "Draw without edges.",
      "hero.lead": "One pen, an infinite canvas, and an AI that is always on call. Built for Windows, with pressure-sensitive ink and every tool running locally.",
      "hero.cta1": "Download for Windows",
      "hero.cta2": "See features",
      "hero.note": "Free download · Windows 10 / 11 · x64",

      "img.hero": "HoneySky White Board main window: ink and shapes on an infinite canvas, a watermark with the icon, brand mark and version number in the top-left, a floating dock at the bottom, page thumbnails at the lower left, and the pager (now with a full-screen button) plus zoom at the lower right",

      "features.kicker": "Features",
      "features.title": "For teachers — and for anyone who thinks out loud.",
      "features.lead": "From a single stroke to AI explaining a problem on the board. Every detail is built for making one thing clear.",

      "f1.kicker": "Ink & strokes",
      "f1.title": "Feels like a pen. Feels like paper.",
      "f1.body": "Smoothed, pressure-sensitive strokes redrawn as a whole, still responsive at 250 Hz sampling. Erase whole strokes or rub out part of one; finger drawing is off by default to avoid stray marks.",
      "f1.b1": "Pressure sensitivity with real-time smoothing",
      "f1.b2": "Partial and whole-stroke erasers",
      "f1.b3": "Automatic stroke clean-up, so handwriting looks tidy",
      "img.brush": "The dock's brush panel: pen and highlighter tabs, twelve colors, a width slider and three pen tips — pen, marker and brush",

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
      "f3.lead": "Hand a problem to the AI podium: photograph the paper or drop in an image, and the AI works through it on the board, LaTeX included. For quick questions, the AI assistant floats in the corner.",
      "f3.cap1": "AI podium · a photo as the background, annotated right on the photo",
      "f3.cap2": "AI assistant · one hotkey away, with adjustable answer size",
      "f3.note": "AI is optional and uses your own OpenAI-compatible endpoint and API key; the key is encrypted with Windows DPAPI and stored locally.",
      "img.podium": "AI podium: a photo filling the screen, red annotations, photo thumbnails at the lower left and a capture button",
      "img.aibooth": "The floating AI assistant answering a factorization question with rendered block formulas, an answer text-size slider and the balance status",

      "f4.kicker": "Pages & tools",
      "f4.title": "Many pages. A tool bar that fits you.",
      "f4.lead": "A lesson rarely fits on one page: flip through the thumbnail rail, zoom and fit the board to the window in one click. Show, pin and reorder tools, and change their shortcuts.",
      "f4.cap1": "Pages & zoom · thumbnails, page flipping, fit to window",
      "f4.cap2": "Settings · every bar and every launch behavior can be toggled",
      "img.pages": "The page thumbnail strip at the lower left showing three thumbnails (pages 3, 4 and 5) and the pager at the lower right with its full-screen button, out of five pages, currently page 5",
      "img.settings": "The settings window's General tab, scrolled to the lower half: toggles for the page rail, top bar (off means immersive mode), floating toolbar, page thumbnail strip (showing 3), bottom-right pager, restore-last-document, prompt to restore unsaved documents (off by default), launch animation (splash) and Start in full screen (covers the taskbar, Esc / F11 to exit)",

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

      "f6.kicker": "New in v1.2.3",
      "f6.title": "Smoother touch. A podium that turns.",
      "f6.lead": "This release fixes the friction in touch and in explaining things: touch writing merges intermediate points and keeps up, pinch zoom no longer jitters, a palm switches to the eraser, the podium image rotates, imported pages flip without freezing and gain a border and pager, and the dock is larger with labels.",
      "n1.title": "Rotate the podium image",
      "n1.body": "A rotate button at the bottom of the podium turns the picture 90° at a time — 0° → 90° → 180° → 270°. The image fits the rotated rectangle, annotations rotate with it, and captures, screenshots and Ask AI all use the rotated view.",
      "n2.title": "Touch writing that keeps up",
      "n2.body": "Touch and pen are handled separately now: intermediate touch points are merged, de-duplicated by minimum spacing and smoothed, so strokes stop stuttering; drawing is batched to once per frame and holds up on slower hardware.",
      "n3.title": "Pinch that behaves, palm that erases",
      "n3.body": "Two fingers cancel the stroke in progress, and zoom steps are clamped so the view no longer jitters. Resting a palm on the screen temporarily switches to the eraser and switches back as the contact narrows or lifts — you can turn this off in Settings.",
      "n4.title": "Imported pages flip without the freeze",
      "n4.body": "Background rendering moved off the UI thread, stale results are dropped, up to four pages stay cached with the neighbours prefetched, and flips return immediately. Imported pages also get a 1px border with a soft shadow and a “‹ page x of y ›” pager underneath.",
      "n5.title": "A bigger dock that says what it does",
      "n5.body": "The dock is slightly larger by default and labels each icon — pen, eraser, import, Ask AI and so on. Settings → Toolbar has a Dock size control from 0.85 to 1.40; when the window is narrow it scales back so it never covers the canvas.",
      "n6.title": "Updates notify. Your browser downloads.",
      "n6.body": "On an older build, Check for updates only reports that a new version exists; View opens the GitHub release page, and the download and install happen in your browser — the app itself never downloads or installs anything. It asks the GitHub API first and switches to a mirror automatically if that fails.",
      "f6.history": "v1.2.2's topmost AI window in full screen, direct GitHub link on the About page, GitHub-first update check, quiet startup and one-click cache clearing are all still here.",

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

      "foot.version": "Version 1.2.3",
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
