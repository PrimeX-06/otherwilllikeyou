# 黑板报 → 广播室过场模块

入口：[index.html](index.html)。直接双击可预览；从黑板报页面的完成卡点“继续 · 广播室”，或未完成退出卡点“先去广播室”，会带入 `?board=done|deferred`。

模块不依赖 `school-preview.html`，也不修改它。当前做到分镜 01–07：黑板报前退开、时间切换、走廊走到广播室、推门进入、和臣到共用播音桌左侧座位、回头看见右侧门口的朱里、朱里走到同一张桌子的右侧麦克风前。结尾的“开始广播”接入 `../../act3/broadcast.html?from=bridge`。

## 空间与操作

- 走廊的广播室门位于右侧；室内同一侧也是门。和臣从右门进入，向左走到前景桌位坐下。
- 和臣坐在唯一播音桌的左侧，麦克风就在面前。门在他身后的右边，因此听见门响后回头看朱里是成立的。
- 朱里从右侧门拿着稿纸进入，走到同一张桌子的右侧，先把稿纸递到桌边，再坐下。CG 和后续像素场景都保持门打开。
- 人物使用 v2 的 48×72 帧：和臣走近、入座、回头；朱里持稿入门、走近、递稿、入座。播音桌和麦克风按前景层遮挡下半身。
- 走廊按住 `D` / `→`，室内按住 `A` / `←`；可点“走过去”自动行走。到门／座位后按 `E` 或点按钮。对白用 `E`、`Enter` 或点击推进。

## 文件

| 文件 | 用途 |
| --- | --- |
| `index.html` / `styles.css` / `bridge.js` | 独立过场与状态机 |
| `layout.js` | 512×288 场景锚点、人物脚点和桌沿遮挡基准 |
| `assets/broadcast_corridor.png` | 512×288 的新走廊段，广播室门关闭 |
| `assets/broadcast_corridor_open.png` | 同门打开状态 |
| `assets/broadcast_room_single_desk.png` | 512×288 室内，唯一共用播音桌与关闭的右门 |
| `assets/broadcast_room_single_desk_open.png` | 同构图，右门打开并接到走廊 |
| `assets/cg_turn_to_zhuli_single_desk.png` | 和臣坐在桌后回望右侧门口的 CG |
| `assets/*_source.png` | 生图模型生成的高分辨率源稿，保留用于修改；游戏读取上述 512×288 场景图 |

角色复用 `../../assets/characters/{boy,girl}/v2/*_sheet_v2.png`。黑板作品预览由 `scene2.js` 在进入本模块前保存到 `localStorage` 的 `our-story-act2-board-preview-v1`；没有预览时回退到画板存档。广播互动接入时可从 `ready` 状态继续，调试口为 `window.__broadcastBridge.scene`。`node tools/check-handoff.cjs` 可验证递稿过渡并生成截图。
