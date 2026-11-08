# 第三幕美术补全（2026-11-07）

本目录按 `第三幕-美术补全清单.md` 生成 P0 静态素材与 P1 UI，占位和可用稿均为整数像素 PNG。`map_floor2.png` 是 256×160 二楼平面图，包含教室、饮水机、窗台、楼梯与招领点；九张 `silhouette_*.png` 从独立生成的剪影源图切出，统一为 96×96。题目名称和正确答案仍须由猜词玩法代码定义，图片本身没有答案信息。

新结尾大纲新增 `prop_notebook.png`：朱里的合页横式本子，24×32 透明 PNG、五色、不含可读姓名；`prop_notebook_preview.png` 仅供放大检视。可运行 `python tools/make_prop_notebook.py` 重建。当前尚未接入结尾剧情。

`assets/characters/{boy,girl,friend}/v2/manifest_act5.json` 与 `*_sheet_act5.png` 是追加版精灵表。旧 `manifest.json` 和 `*_sheet_v2.png` 未修改，旧动作索引保持不变。新表分别为和臣 47 帧、朱里 50 帧、由乃 56 帧，共追加 53 帧。清单写的 52 帧与逐项相加的 53 帧不一致，此处按逐项动作帧数制作。

静态道具、UI 和角色新增动作目前是**可供玩法接线及构图验证的像素占位稿**。角色帧从原有立绘动作逐帧改造，能分辨带球、射门、搬箱、贴海报等意图，但运动连续性和人体姿态仍需逐帧美术修订。尤其不能把这些帧直接当最终动画质量。目录页缩略图也只是基础色块构图。

P2 补充了三张 `cutscene_*.png`（使用现有学校场景与角色合成）、`inference_board_bg.png`、`yuno_feint_closeup.png` 和四张 `title_*.png`。这些是可放进分镜与 UI 的初稿，尤其过场图仍需构图精修。

接线所需的状态变体包括：`ui_pin_red/green/blue.png`、`ui_clue_frame_seen/remembered/guessed.png`、`ui_guess_slot_selected/correct/excluded.png`、`ui_task_dot_idle/active/done.png`，以及 `scoreboard_0_0.png` 到 `scoreboard_3_3.png` 的 16 种比分。完整文件名和尺寸可读取 `manifest.json`。

重建：在项目根目录运行 `python tools/build_act5_art.py`。脚本依赖 Pillow 和本地剪影源图；生成后的 PNG 与 JSON 已包含在项目中，游戏运行时无需脚本或源图。尚未将这些资产接入单独开发的小游戏。
