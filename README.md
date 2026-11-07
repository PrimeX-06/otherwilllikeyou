# 我们的故事 · 像素叙事

**简体中文** · [English](README.en.md)

一个非商业的同人向像素恋爱故事。第一幕是楼道与房间里的手机射击小游戏，之后画面交给学校线：
走廊、黑板报、广播室、晚间广播，最后停在放学后白色护栏旁的一张 CG。

整个游戏是纯静态页面：**没有构建步骤，不需要服务器**。用 Chrome 双击 `prototype.html` 就能从头玩到结尾。

## 怎么玩

1. 双击 `prototype.html`（推荐 Chrome；`file://` 直接运行）。
2. 第一幕结束、手记打完后按 `E`，学校线会装进同一个页面的全屏框里继续，外层不换页。
3. 学校线一路往下：走廊 → 黑板报 → 广播室 → 晚间广播 → 广播后的走廊 → 靠栏杆的 CG。

常用按键：

| 操作 | 键 |
| --- | --- |
| 移动 | `WASD` / 方向键 |
| 互动 / 推进对白 | `E` / `Enter` |
| 暂停（第一幕、学校预览） | `Esc` |
| 重开当前幕 | `R` |

黑板报和广播小游戏还有各自的工具栏与节奏玩法，页面内会有提示。

## 目录

| 路径 | 内容 |
| --- | --- |
| `prototype.html` | 第一幕：楼道、房间、手机里的射击片段、结尾手记 |
| `school-preview.html` | 学校线开场与走廊场景；从第一幕手记之后接进来 |
| `act2/` | 黑板报与去广播室的过场 |
| `act3/` | 晚间广播节奏小游戏 |
| `act4/after-broadcast/` | 广播后的走廊，结尾靠栏杆 CG |
| `act5/` | 校园日常章节（独立入口 `daily.html`） |
| `assets/` | 角色、场景、CG、瓷砖等像素素材与 Aseprite 源文件 |
| `tools/` | 素材生成与导入脚本 |
| `game/dust-corridor/` | 第一幕手机里的射击游戏（基于 claude-of-duty 改造，MIT） |
| `*.md` | 设计、交接与素材说明 |

## 测试

需要 Node.js 和本机 Chrome（Playwright 使用 `channel: 'chrome'`）。第一次跑测试前先安装依赖：

```bash
# 在仓库根目录
cd game/dust-corridor
npm install
node tools/story-chain-check.mjs     # 第一幕 → 学校线 → 靠栏杆 CG 的整条流程
node tools/act2-link-check.mjs       # 第一幕手记 → 页面内第二幕
node tools/return-check.mjs          # 手机射击结束后的回家与手记
node tools/act2-ui-check.mjs         # 两幕共用的 E / Esc / R
node tools/ui-parity-probe.mjs       # 两幕界面并排截图
```

黑板报与广播各自还有自检（回到仓库根目录）：

```bash
node act2/tools/check.cjs
node act3/tools/check.cjs
node act5/tools/check.cjs
```

## 素材与上游

- 像素角色、场景和 CG 为本项目素材，按 MIT 发布。
- 第一幕手机里的射击游戏改造自 [claude-of-duty](https://github.com/Leonxlnx/claude-of-duty)（MIT）。
  它的 `LICENSE` 和版权声明保留在 `game/dust-corridor/LICENSE`。
- 运行时使用 Three.js；字体使用系统字体，不附带字体文件。

## 许可

本项目代码、文档与自制素材采用 MIT 许可证，见 [LICENSE](LICENSE)。
第三方组件与素材仍遵循各自原有的许可证与署名要求。

这是一个非商业的个人同人作品；故事中的人物与情节仅用于叙事，不构成对任何真实人物或商业作品的授权。
