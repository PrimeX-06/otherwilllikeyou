-- Door panels for the corridor. 64x128, four opening states for 302.
local function rgba(hex, a)
  local r = tonumber(hex:sub(1, 2), 16)
  local g = tonumber(hex:sub(3, 4), 16)
  local b = tonumber(hex:sub(5, 6), 16)
  return app.pixelColor.rgba(r, g, b, a or 255)
end

local function fill(img, x, y, w, h, hex)
  local c = rgba(hex)
  for yy = y, y + h - 1 do
    for xx = x, x + w - 1 do
      img:drawPixel(xx, yy, c)
    end
  end
end

local function draw_door(img, w, pal)
  if w <= 0 then return end
  fill(img, 0, 0, w, 128, pal.base)
  -- hinge side highlight and opening-side edge
  if w > 2 then
    fill(img, 0, 0, 1, 128, pal.edge)
    fill(img, w - 1, 0, 1, 128, pal.edge)
  end
  fill(img, 0, 0, w, 2, pal.edge)
  fill(img, 0, 126, w, 2, pal.edge)
  -- brushed vertical texture
  for x = 4, w - 2, 7 do
    fill(img, x, 4, 1, 120, pal.texture)
  end
  -- recessed panels
  if w >= 20 then
    local inner = w - 12
    fill(img, 6, 12, inner, 42, pal.panel)
    fill(img, 7, 13, inner - 2, 40, pal.panelLight)
    fill(img, 6, 64, inner, 46, pal.panel)
    fill(img, 7, 65, inner - 2, 44, pal.panelLight)
    fill(img, 6, 54, inner, 2, pal.edge)
    fill(img, 6, 110, inner, 2, pal.edge)
  elseif w >= 10 then
    fill(img, 3, 14, w - 6, 44, pal.panel)
    fill(img, 3, 66, w - 6, 42, pal.panel)
  end
  -- peephole
  if w >= 16 then
    local phx = w - 18
    fill(img, phx, 22, 3, 3, pal.edge)
    fill(img, phx + 1, 23, 1, 1, pal.brass)
  end
  -- handle on the opening edge
  if w >= 12 then
    local hx = w - 10
    fill(img, hx, 58, 3, 2, pal.brass)
    fill(img, hx + 1, 60, 2, 10, pal.brass)
    fill(img, hx + 2, 70, 1, 3, pal.brassDark)
  end
end

local function newdoor(path)
  local spr = Sprite(64, 128, ColorMode.RGB)
  spr.layers[1].name = "panel"
  return spr
end

local function cel(spr, frame)
  return spr:newCel(spr.layers[1], frame)
end

local P302 = {
  base = "6b3f32", edge = "3f241d", panel = "5b332a",
  panelLight = "7a4738", texture = "633a2e", brass = "d9b56a",
  brassDark = "a8823f",
}
local P301 = {
  base = "4a3a32", edge = "2e241f", panel = "3d2f29",
  panelLight = "5a463c", texture = "43342c", brass = "b8b4a8",
  brassDark = "7e7a70",
}

-- 302: four states
local d302 = newdoor()
for i, w in ipairs({64, 56, 30, 8}) do
  if i > 1 then d302:newFrame() end
  local img = cel(d302, i).image
  draw_door(img, w, P302)
  d302.frames[i].duration = 0.2
end
d302:saveAs("D:/解决内分泌失调/pixel-act1/assets/scenes/door302.aseprite")

-- 301: one closed door
local d301 = newdoor()
local img301 = cel(d301, 1).image
draw_door(img301, 64, P301)
d301.frames[1].duration = 0.2
d301:saveAs("D:/解决内分泌失调/pixel-act1/assets/scenes/door301.aseprite")

print("SAVED doors")
