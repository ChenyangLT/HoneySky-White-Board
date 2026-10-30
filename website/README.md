# HoneySky White Board · 官网静态站（v1.1.2）

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

## 产品截图（8 张，已就位）

截图位于 `assets/img/`，均为真机截图（非渲染图、非 AI 生成）。每张 `<img>` 的 `width`/`height` 写的是**图片真实像素**，用于占位防跳动：

| 文件 | 真实像素 | 对应位置 / 画框 | `<figure class>` |
| --- | --- | --- | --- |
| `hero-main.png` | 1680×1050 | Hero 主视觉（整窗截图，圆角+投影贴边） | `shot shot--hero` |
| `brush.png` | 320×300 | 功能 1 · 书写与笔触（笔二级面板） | `shot shot--panel` |
| `clock.png` | 464×296 | 功能 2 · 时钟独立窗口（深色区左） | `shot shot--canvas shot--framed` |
| `countdown.png` | 467×405 | 功能 2 · 倒计时窗口（深色区右） | `shot shot--canvas shot--framed` |
| `podium.png` | 1920×1023 | 功能 3 · AI 讲台（黑底批注） | `shot shot--stage shot--framed` |
| `ai-booth.png` | 1240×900 | 功能 3 · AI 助手浮窗（白底对话界面） | `shot shot--canvas shot--framed` |
| `pages.png` | 1680×1050 | 功能 4 · 多页与缩放（深色区左） | `shot shot--stage shot--framed` |
| `settings.png` | 780×700 | 功能 4 · 设置与工具栏（深色区右） | `shot shot--stage shot--framed` |

### 布局规则（任意宽高比都不会裁切/变形）

- 未加 `--framed` 的图（`hero-main`、`brush`）**按图片自身比例**铺满容器：`.shot > img { width:100%; height:auto }`，容器没有固定 `aspect-ratio`。
- 加了 `--framed` 的图走「画框」：`.shot--framed { aspect-ratio: var(--shot-ar, 3/2); display:grid }` + 图片 `object-fit: contain`。**两列等高**，比例不符时留白由画框底色承担（不是黑边、不是裁切）。
  - 每组比例的变量在 `.duo--time`（`4/3`）/ `.duo--work`（`4/3`）/ `.duo--ai`（`3/2`）上，想调整就给对应 `.duo` 改 `--shot-ar`。
- 底色随内容：`--canvas` 白画布截图配白画框（时钟/倒计时）、`--stage` 深色界面截图配深画框 + 1px 亮边（讲台/整窗）、`--panel` 白底面板配白画框 + 限宽 420px（避免 320px 图被放大发虚）。
- 图注 `figcaption.shot__cap` 是**画框下方静态块**（早先是压在图片底部的渐变遮罩，会挡住截图里的工具栏，已改）。

### 替换某张图

1. 同名覆盖 `assets/img/xxx.png`；
2. 把 `index.html` 里该 `<img>` 的 `width`/`height` 改成新图真实像素；
3. 若新图宽高比变化很大，按上面「布局规则」挑/调画框类（或者只改对应 `.duo` 的 `--shot-ar`），不需要改 `img` 尺寸逻辑；
4. `node artifacts/tools/measure-shots.mjs --url <file url> --out artifacts/screenshots/v112-site-real/_shots.json` 复核：看 `letterboxPct`（留白比例）、`overflowX`、`PROBLEMS`（应为 0）。

8 张截图现已全部是真机截图（2026-10-30 抓取）：`podium.png` 的摄像头画面使用 NVIDIA Broadcast 虚拟摄像头（纯黑），不包含任何真实环境影像；`ai-booth.png` 是真实 DeepSeek 端点回答「x²-5x+6=0」的界面，余额查询已关闭（显示「余额：已关闭查询」）。

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
3. 下载按钮目前统一指向 `https://github.com/ChenyangLT/HoneySky-White-Board/releases/latest`（占位）；正式发版后确认 Release 里确实带 `HoneySkyWhiteBoard-1.1.2-win-x64-setup.exe` / `.msi` / `-portable.zip` 与 `SHA256SUMS.txt`。

## 自检脚本（工作区 artifacts/tools/）

- `site-shot.mjs`：headless Chrome 逐屏截图 + 控制台报错收集（`node artifacts/tools/site-shot.mjs --url file:///.../index.html --outDir artifacts/screenshots/v112-site`）
- `verify-site.mjs`：资源/锚点/i18n 完整性、断点溢出、导航深浅联动、reduced-motion、键盘顺序
- `measure-shots.mjs`：真实渲染量测（每张图的自然尺寸 vs 画框尺寸、contain 缩放比、留白比例、是否越界、懒加载是否全部命中、控制台问题数）
- `gen-site-placeholders.ps1`：重新生成占位图（仅占位用）
