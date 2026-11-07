# 白色人物动作包

用于学校及后续场景中的未命名人物占位。短发、长发两种轮廓分别对应现有男女主角的身形，但全身采用白色和浅灰色，不表示角色身份。

- `white_boy_master.aseprite`、`white_girl_master.aseprite`：可编辑的 Aseprite 源文件，单帧 48×72 像素。
- `white_boy_sheet.png`、`white_girl_sheet.png`：透明背景横向精灵图，各 25 帧，尺寸 1200×72 像素。
- 同名 `.json`：帧坐标、时长与动作标签。序号从 0 开始。
- `white_npc_preview.png`：放大 4 倍的静态动作预览。

| 动作 | 帧序号 |
| --- | --- |
| 正面待机 | 0–1 |
| 左、右、背面待机 | 2、3、4 |
| 向下走 | 5–8 |
| 向左走 | 9–12 |
| 向右走 | 13–16 |
| 向上走 | 17–20 |
| 向左、右坐 | 21、22 |
| 挥手 | 23–24 |

CSS 使用示例：元素宽高设为 48×72 像素，`background-image` 指向精灵图，`background-size:2500% 100%`。第 `i` 帧的 `background-position-x` 为 `i / 24 * 100%`。缩放时使用 `image-rendering: pixelated`。

重新生成：在项目根目录运行 `py tools/build_white_npcs.py`。脚本读取现有男女角色精灵的透明轮廓，生成白色版本，并写入 Aseprite 源文件。它不会改动原角色资源。
