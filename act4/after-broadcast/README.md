# 晚间广播后 · 白色护栏

入口：[index.html](index.html)。第三幕广播完成卡的「一起走出广播室」直接进入本模块；也可以双击独立预览。

这是附带的下一幕指导稿在本项目里的实现：广播室右门外仍是项目已有的红砖／白瓷砖门侧走廊；镜头转到护栏一侧后，沿用现有 `school_corridor_railing_pixel.png` 的空间。楼梯口补了一张同构图背景，最后的背面靠栏杆画面沿用 `cg_corridor_lean_back.png`。没有把指导稿里泛称的场景当成另一所学校。

## 流程

1. 两人从广播室右门出来，门轻轻关上；聊几句刚才的广播。
2. 玩家按住 `A` / `←` 往左走，朱里贴近跟随。可在门侧走廊的教室窗前按 `E` 看一眼。
3. 镜头切到白色护栏一侧。两人聊作业；朱里叫住和臣，玩家按 `E` 在护栏边和她说话，再继续往前走。
4. 一张广播稿从朱里身边被风吹起，飘落在前方。玩家走近后按 `E`，和臣弯腰捡起，两人一起把纸角压平、夹好。
5. 留出一段没有对白的路。朱里递来一块饼干，在 CG 镜头里多聊几句；玩家继续走路后才接过。
6. 到楼梯口，两人先停在护栏前。玩家按 `E` 靠过去，聊完饼干和下一次一起走的事，再切到两人背对镜头靠栏杆的既有 CG。

右上角的「继续往前走」是鼠标／触屏的行走入口，再点一次「停一会儿」会停下。护栏谈话、捡起稿纸与递零食后需再次继续走；楼梯口需要主动走到朱里身边。走廊提示改为底部「旁白」字幕，简短按键说明保留在字幕角落；行走对白出现时角色会停步，可按 `E`／Enter 或点击翻页，也会定时继续。结尾可重看或返回广播。广播小游戏本体没有改动判定规则。

## 资源与验证

- 门侧走廊：`../../act2/broadcast-bridge/assets/broadcast_corridor*.png`
- 护栏：`assets/railing.png` 和带告示牌的 `assets/railing_notice.png`，从现有学校护栏图缩至 512×288，供不同走廊段使用
- 楼梯口：`assets/stairwell.png`，高分辨率源稿 `assets/stairwell_source.png`
- 递零食 CG：`assets/cg_snack_handoff.png`
- 结尾靠护栏 CG：`../../assets/scenes/cg_corridor_lean_back.png`
- 人物：`../../assets/characters/{boy,girl}/v2/*_sheet_v2.png`。对白使用说话姿态，拾稿纸使用弯腰姿态；护栏停留保持背面朝向，最后由既有靠栏杆 CG 承接。

运行 `node act4/after-broadcast/tools/check.cjs` 会走完主流程并生成 `previews/` 截图。调试状态可从 `window.__afterBroadcast.scene` 读取。
