# HoneySky White Board · 官网静态站（v1.2.3）

零依赖、纯静态、可直接 `file://` 双击打开的官网。所有样式/脚本/图像都是本地文件，**没有 CDN、没有 Google Fonts、没有构建步骤**。

## 目录

```
website/
├─ index.html              单页页面（中文默认，data-i18n 驱动中英切换）
└─ assets/
   ├─ css/style.css        全部样式与设计令牌（:root 变量）
   ├─ js/main.js           文案表 COPY（zh/en）+ 语言切换 + 滚动渐显 + 导航态
   └─ img/                 产品截图（真机截图，清单见下方「产品截图」）
```

## 本地预览

- 直接双击 `website/index.html`（file:// 可用，导航、语言切换、渐显全部正常）。
- 或起一个静态服务（方便浏览器缓存策略接近线上）：
  ```bash
  cd website
  python -m http.server 8080      # 然后打开 http://127.0.0.1:8080
  ```

## v1.2.3 新增内容（页面上的「v1.2.3 新增」区块）

页面 `#whats-new` 用 6 张卡片（`.cards` 三列 → 两行 3+3；≤1024 两列、≤768 一列）介绍本版变化，文案键 `f6.*` 与 `n1.*`–`n6.*`（中英成对），卡片下方一行 `f6.history` 回顾 v1.2.2 的能力：

1. **讲台画面旋转**：讲台底部新增旋转按钮，循环 0°→90°→180°→270°；画面按旋转后的矩形等比适配，批注坐标随画面一起转，拍照 / 截图 / 问 AI 都用旋转后的画面。
2. **触摸书写更跟手**：触摸与手写笔分通道，合并 `GetIntermediateTouchPoints` 并按 0.8 DIP 去重后再平滑；渲染合并到每帧一次（最多 60 fps），慢设备不掉帧。
3. **双指缩放修复 + 掌压自动橡皮**：两指落下立即取消单指笔迹，缩放增量钳制在单帧 0.8–1.25；接触尺寸 ≥ 26 DIP 进临时橡皮、≤ 18 DIP 或抬起切回笔（`General.TouchPalmEraserEnabled` 默认开，设置里可关）。
4. **导入翻页不卡 + 页面边框与翻页条**：背景栅格化移出 UI 线程（后台任务 + 版本号丢弃过期结果），内存 LRU 4 页并预取前后页；有背景时页面四周 1px 边框 + 柔和投影，下方浮动「‹ 第 x / y 页 ›」。
5. **Dock 可调大小并显示名称**：图标下方显示功能名；`General.DockScale` 0.85–1.40（默认 1.10），设置 → 工具栏「Dock 大小」；窗口过窄时按可用宽度等比回退，不遮挡画布。
6. **检查更新实测**：发布后用已安装的 v1.2.2 走「检查更新」，GitHub 优先、失败切镜像，成功发现并下载 1.2.3。

### 许可区块调整（v1.2.3）

删除原「专有商业许可，不是开源软件。」一栏：标题改为「不开源，但正式版免费使用。」（`lic.title`），正文说明源码不公开、无试用期也无付费解锁（`lic.lead`）；列表由 4 条改为 3 条 —— **免费使用 / 不开源 / 第三方组件**（`lic.l1`–`lic.l3`，`lic.l4` 已删除，`COPY` 中英同步移除，i18n 键数 113 → 112）。页脚 `foot.prop` 同步改为「不开源 · 正式版免费」/「Closed source · free to use」。

### 历史：v1.2.2 新增内容

v1.2.2 的 6 条仍保留在页面上（通过卡片下方 `f6.history` 一句话回顾）：全屏 AI 浮窗置顶、关于页 GitHub 直达、更新先问 GitHub、启动不弹恢复提示、一键清除缓存、默认画笔/矩形沿用 v1.2.1。

### 历史：v1.2.1 新增内容

v1.2.1 的 6 条仍保留在页面上（通过卡片下方 `f6.history` 一句话回顾）：

1. **启动即全屏**：打开软件直接进入覆盖任务栏的真全屏；退出方式为右下角全屏按钮 / Esc / F11。
2. **翻页条上的全屏按钮**：右下角翻页条在「下一页」之后、缩放与适应窗口之前新增全屏按钮。
3. **缩略图只留三个**：左下页面缩略图条默认显示 3 个，数量在设置里可调 1–8。
4. **橡皮不再粘手**：修复「点橡皮后切直尺/画框 → 橡皮不取消、擦除圈跟鼠标、框画不出来」。
5. **品牌字闪光间隔可调**：About 页与白板左上角的 HoneySky 品牌字默认每 5 秒闪白一次，可在「设置 → 动画 → 品牌字闪光间隔」调整 2–30 秒（水印静止态即品牌橙，与动画同色）。
6. **左上角的水印**：常驻「图标 + 品牌字动画 + 版本号」，静止态为品牌橙，尺寸更小、更淡。

### 历史：v1.2.0 新增内容（已并入功能区块）

v1.2.0 的 8 条能力仍在页面上（`f1`–`f5` 功能区块与下载区），但不再单列卡片：

1. **浮动 Dock**：底部玻璃胶囊，可拖动并记忆位置，双击回中；图标带 ^ 角标展开二级面板（笔/荧光笔颜色·粗细·笔尖、橡皮含清屏滑块、移动/选择、四形状、直尺圆规、时钟倒计时、导入、AI）。
2. **导入为背景**：PDF 逐页 + 72–300 dpi、Word 内置排版重排（字号/行距可调）、图片；背景层可缩放讲解、清除、撤销。
3. **启动动画**：图标渐显 + Win10 式转圈 + 淡出，设置里可关。
4. **更新检测**：静默检查 GitHub Release（主源 + gh-proxy 镜像兜底，5–8 s 超时），新版可点击提示直达下载；⋯ 内也有「检查更新」。
5. **讲台拍照**：最多 8 张缓存、缩略图切换、照片上批注、叠加/并排对比、保存带批注合成图，退出可并入新页。
6. **AI 回答字号**：A− / 滑块 / A+（11–24），设置持久化。
7. **页面条与翻页条**：左下缩略图条、右下翻页与缩放条。
8. **全屏**：左上角半透明品牌、⋯ 内可最小化/退出全屏。

## 产品截图（8 张，已就位）

截图位于 `assets/img/`，均为真机截图（非渲染图、非 AI 生成）。每张 `<img>` 的 `width`/`height` 写的是**图片真实像素**，用于占位防跳动：

| 文件 | 真实像素 | 对应位置 / 画框 | `<figure class>` |
| --- | --- | --- | --- |
| `hero-main.png` | 1680×1050 | Hero 主视觉（整窗截图，圆角+投影贴边） | `shot shot--hero` |
| `brush.png` | 320×402 | 功能 1 · 书写与笔触（Dock 笔二级面板，竖版） | `shot shot--panel` |
| `clock.png` | 511×310 | 功能 2 · 时钟独立窗口（深色区左） | `shot shot--canvas shot--framed` |
| `countdown.png` | 515×435 | 功能 2 · 倒计时窗口（深色区右） | `shot shot--canvas shot--framed` |
| `podium.png` | 1920×1023 | 功能 3 · AI 讲台（照片讲解 + 批注 + 拍照，深底） | `shot shot--stage shot--framed` |
| `ai-booth.png` | 1240×900 | 功能 3 · AI 助手浮窗（白底回答 + 回答字号滑块） | `shot shot--canvas shot--framed` |
| `pages.png` | 1680×1050 | 功能 4 · 多页与缩放（深色区左） | `shot shot--stage shot--framed` |
| `settings.png` | 780×700 | 功能 4 · 设置与工具栏（深色区右） | `shot shot--stage shot--framed` |

### 布局规则（任意宽高比都不会裁切/变形）

- 未加 `--framed` 的图（`hero-main`、`brush`）**按图片自身比例**铺满容器：`.shot > img { width:100%; height:auto }`，容器没有固定 `aspect-ratio`。
- 加了 `--framed` 的图走「画框」：`.shot--framed { aspect-ratio: var(--shot-ar, 3/2); display:grid }` + 图片 `object-fit: contain`。**两列等高**，比例不符时留白由画框底色承担（不是黑边、不是裁切）。
  - 每组比例的变量在 `.duo--time`（`1.27`）/ `.duo--work`（`4/3`）/ `.duo--ai`（`3/2`）上，想调整就给对应 `.duo` 改 `--shot-ar`。
  - `.duo--time` 用 `1.27` 而不是 `4/3`：当前时钟截图 511×310（≈1.65）与倒计时 515×435（≈1.18）比例相差很大，`1.27` 是让两张图各自留白都约 15%、且两列仍然等高图注对齐的平衡值（画框是白底，白画布截图的留白看不出来）。
- 底色随内容：`--canvas` 白画布截图配白画框（时钟/倒计时/AI 助手）、`--stage` 深色界面截图配深画框 + 1px 亮边（讲台/整窗）、`--panel` 白底面板配白画框 + 限宽 420px（避免 320px 宽的面板被放大发虚；**不写死高度**，320×402 竖版图按自身比例向下伸展）。
- 图注 `figcaption.shot__cap` 是**画框下方静态块**（早先是压在图片底部的渐变遮罩，会挡住截图里的工具栏，已改）。

### 替换某张图

1. 同名覆盖 `assets/img/xxx.png`；
2. 把 `index.html` 里该 `<img>` 的 `width`/`height` 改成新图真实像素；
3. 若新图宽高比变化很大，按上面「布局规则」挑/调画框类（或者只改对应 `.duo` 的 `--shot-ar`），不需要改 `img` 尺寸逻辑；
4. `node artifacts/tools/measure-shots.mjs --url <file url> --out artifacts/screenshots/v122-site/_shots.json` 复核：看 `letterboxPct`（留白比例）、`overflowX`、`PROBLEMS`（应为 0）。

**当前 8 张的版本分布（2026-10-31 更新）**：`hero-main` / `pages` / `settings` 已换成 **v1.2.2 真机图**（同名覆盖，像素尺寸与 v1.2.1 图完全一致，`index.html` 的 `width/height` 无需改动）；`brush` / `podium` / `ai-booth` 沿用 v1.2.0；`clock` / `countdown` 沿用 v1.1.3（时间工具未改版）。8 张图都不含真实环境影像与个人信息。

> **v1.2.3 没有替换任何截图**：8 张图与 `index.html` 的 `width`/`height` 一律未动。页面显示的版本号来自 HTML/COPY（对外 1.2.3），图内水印仍是 v1.2.2，属历史截图 —— 用户明确要求不要为版本号重拍。

- `podium.png`：讲台讲解界面，画面是导入的照片（测试用 DOCX 排版图）与红色批注，左下角是照片 1/照片 2 缩略图、底部有「拍照」与摄像头下拉。摄像头画面仍来自 NVIDIA Broadcast 虚拟摄像头，**不包含任何真实环境影像**。
- `ai-booth.png`：真实 DeepSeek `deepseek-flash` 回答「解方程 x²-5x+6=0」的界面，块级公式正常渲染，底部有「回答字号 A− / 滑块 / A+」与 100%，状态行显示「余额：已关闭查询」。

### 截图版本分布（2026-10-31）

| 文件 | 来源 | 尺寸 | 内容 |
| --- | --- | --- | --- |
| `hero-main.png` | **v1.2.2 新图** | 1680×1050 | 主窗口：左上「图标 + 品牌字 + v1.2.2」水印 + 浮动 Dock + 左下页面缩略图条 + 右下翻页（含全屏按钮）/缩放条 + 手写与图形 |
| `brush.png` | **v1.2.0 新图** | **320×402（竖版，旧图 320×300）** | Dock 画笔二级面板：画笔/荧光笔切换、12 色、粗细 3px、三笔尖 |
| `pages.png` | **v1.2.2 新图** | 1680×1050 | 5 页白板；左下缩略图条只显示 3 个（第 3、4、5 页，第 5 页选中）+ 右下翻页条 5/5（含全屏按钮）+ 浮动 Dock |
| `settings.png` | **v1.2.2 新图** | 780×700 | 设置常规页（滚动到下半部分）：「启动时提示恢复未保存的文档（默认关闭）」、启动时恢复上次打开的文档、启动时显示动画（Splash）、启动时进入全屏（覆盖任务栏，Esc / F11 退出）、显示浮动工具条/页面缩略图（显示页数 3）/翻页条等开关 |
| `podium.png` | **v1.2.0 新图** | 1920×1023 | 讲台：照片背景 + 红色批注 + 照片缩略图 + 拍照按钮 |
| `ai-booth.png` | **v1.2.0 新图** | 1240×900 | AI 助手：deepseek-flash 因式分解回答 + 块级公式 + 回答字号滑块 |
| `clock.png` | 沿用 v1.1.3 | 511×310 | 独立时钟窗口（1.2.0 未改版） |
| `countdown.png` | 沿用 v1.1.3 | 515×435 | 独立倒计时窗口（1.2.0 未改版） |

尺寸只在 `brush.png` 上发生过变化（320×300 → 320×402）；v1.2.2 的 `hero-main` / `pages` / `settings` 与 v1.2.1 图像素完全一致，因此 `index.html` 三个 `<img>` 的 `width/height` 不需要改动（只同步了 alt 与图注文案）。`.shot--panel` 不写死高度，竖版图按自身比例向下伸展（不裁切、不压扁）。图注与 `img.*` 的 alt 文案已同步为新图内容。

页面暂时没有图位、可选补拍的截图：Dock 全景、6 个二级面板、关于页、导入背景（PDF/Word）、全屏状态。

### 截图替换状态（v1.2.2，2026-10-31；v1.2.3 未替换截图，本节为历史记录）

**v1.2.2 已替换 `hero-main` / `pages` / `settings`，其余 5 张沿用。** 三张新图是真机截图（Lead 提供于 `artifacts/screenshots/v122-shots/`，已同名覆盖到 `assets/img/`）：

| 文件 | 应体现的 v1.2.2 变化 | 状态 |
| --- | --- | --- |
| `hero-main.png` | 左上角水印版本号 v1.2.2；Dock / 缩略图条 / 翻页条（含全屏按钮）/缩放条 | **已替换（v1.2.2 真机图，1680×1050）** |
| `pages.png` | 5 页、缩略图条只显示第 3/4/5 页、翻页条 5/5（含全屏按钮） | **已替换（v1.2.2 真机图，1680×1050）** |
| `settings.png` | 常规页滚动到底：「启动时提示恢复未保存的文档（默认关闭）」「启动时进入全屏（覆盖任务栏，Esc / F11 退出）」等 | **已替换（v1.2.2 真机图，780×700）** |
| `brush.png` | 二级面板未变 | 沿用 v1.2.0（320×402） |
| `clock.png` / `countdown.png` | 时间工具未改版 | 沿用 v1.1.3 |
| `podium.png` / `ai-booth.png` | 讲台与 AI 助手未改版 | 沿用 v1.2.0 |

> 三张新图与旧图像素完全一致（1680×1050 / 1680×1050 / 780×700），因此 `index.html` 的 `width`/`height` 未改；已同步 `settings.png` 的 alt 与 `img.settings`（明确列出「启动时提示恢复未保存的文档（默认关闭）」等新开关），并重跑 `verify-site.mjs`（PROBLEMS 0）与 `measure-shots.mjs`（无横向溢出、三图 naturalWidth>0 且 contain 未裁切）。

验收截图目录：`artifacts/screenshots/v122-site/`（15 张 PNG + `_shots.json`；v1.2.2 真机原图另存于 `artifacts/screenshots/v122-shots/`）；v1.2.3 文案改动的复验截图在 `artifacts/screenshots/v123-site/`（15 张 PNG）。

## 文案与中英切换

- 所有可见文案集中在 `assets/js/main.js` 顶部的 `COPY` 表（`zh` / `en` 两份，键名一一对应）。
- 页面元素通过 `data-i18n="键名"` 取文本；图片 alt 用 `data-i18n-alt="键名"`。
- 新增一句文案 = ①HTML 里加 `data-i18n="newkey"` ②两份 COPY 里各加一条。**不要**把 i18n 挂到含子元素（如 `<span class="badge">`）的父节点上，否则切换语言会清掉子元素。
- 语言选择写入 `localStorage.honeysky-site-lang`，刷新后保持。

## 设计令牌

`assets/css/style.css` 顶部 `:root`：

```
--honey #f2a33c   --honey-strong #e08a1e   --sky #3c82f6
--ink #1d1d1f     --paper #fff             --paper-alt #f5f5f7
--dark-bg #0b0b0e --dark-card #1b1b20
--ease-out cubic-bezier(0.22,1,0.36,1)     --ease-spring cubic-bezier(0.34,1.56,0.64,1)
```

排版：Hero 标题 `clamp(46px, 7.2vw, 104px)` + `letter-spacing: -0.05em`；区块标题 `clamp(38px, 5vw, 72px)`。断点 1024 / 768 / 480；`prefers-reduced-motion: reduce` 下关闭全部动画并把渐显元素直接置为可见。

## 发布（GitHub Pages）

1. 把 `website/` 目录内容放到的 GitHub Pages 根（或仓库 `docs/` 目录）。
2. 仓库 Settings → Pages → Source 选分支与目录即可，无需构建。
3. 下载按钮目前统一指向 `https://github.com/ChenyangLT/HoneySky-White-Board/releases/latest`；正式发版后确认 Release 里确实带 `HoneySkyWhiteBoard-1.2.3-win-x64-setup.exe` / `-win-x64.msi` / `-win-x64-portable.zip` 与 `SHA256SUMS.txt`。

## 自检脚本（工作区 artifacts/tools/）

- `site-shot.mjs`：headless Chrome 逐屏截图 + 控制台报错收集（`node artifacts/tools/site-shot.mjs --url file:///.../index.html --outDir artifacts/screenshots/v112-site`）
- `verify-site.mjs`：资源/锚点/i18n 完整性、断点溢出、导航深浅联动、reduced-motion、键盘顺序
- `measure-shots.mjs`：真实渲染量测（每张图的自然尺寸 vs 画框尺寸、contain 缩放比、留白比例、是否越界、懒加载是否全部命中、控制台问题数）
- `gen-site-placeholders.ps1`：重新生成占位图（仅占位用）
