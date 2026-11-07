# 生图模型人物动作素材

`*_source.png` 是生图模型生成的透明原图。`tools/package_generated_npcs.py` 仅负责从原图裁切、缩放、对齐动作帧和编码 GIF，不绘制人物。学校 HTML 现在使用坐姿 GIF；旧的纯白剪影不再用于教室。

| 文件 | 内容 |
| --- | --- |
| `boy_*`、`girl_*` 的 `walk_down/left/right/up.gif` | 四方向行走循环，各四帧 |
| `boy_*`、`girl_*` 的 `sit_left/right.gif` | 左右坐姿表情循环，各四帧 |
| `boy_wave.gif`、`girl_wave.gif` | 正面挥手循环，各四帧 |
| `*_idle_down/left/right/up.png` | 各方向站立帧 |
| `boy_sit.gif`、`girl_sit.gif` | 教室场景当前使用的坐姿 GIF，兼容简短文件名 |
| `*_sheet.png` | 对应的透明 48×72 帧图，横向四格 |
| `classroom_generated_preview.png` | 目前教室座位排布的静态预览 |

生成提示词要点：无头发的像素风学校人物、圆头和可见表情、低对比度校服、透明背景、同一人物的四帧动作、两行四列规则排列。后续动作图以首张正面行走图为人物与风格参考。右行与左坐由已生成的左行和右坐图镜像，未重新绘制。
