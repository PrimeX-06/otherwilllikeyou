// 512×288 逻辑坐标。场景素材、角色脚点和交互区共用这一份基准。
window.BROADCAST_BRIDGE_LAYOUT = Object.freeze({
  boardArt: { x: 298, y: 85, w: 171, h: 80 },
  boardBoy: { x: 348, y: 215 },
  boardGirl: { x: 420, y: 215 },
  corridor: { boyStartX: 68, footY: 232, doorX: 390, doorReachX: 387, signX: 410, signY: 56 },
  room: { entryX: 443, footY: 233, seatX: 166, seatReachX: 174, seatFootY: 211, girlEntryX: 438, girlStationX: 275, girlFootY: 233, girlSeatFootY: 211 },
  foreground: { sharedDesk: { x: 70, y: 188, w: 269, h: 75 } }
});
