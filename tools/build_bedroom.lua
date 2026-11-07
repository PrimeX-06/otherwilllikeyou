-- Superseded: the act-1 bedroom background now comes from
-- tools/import_bedroom.py (暖光像素风卧室地图.png).  This hand-built layout is
-- kept only as an early reference.
-- Her bedroom, 512x288. Sparse: bed, desk, TV, window.
local OUT = "D:/解决内分泌失调/pixel-act1/assets/scenes/bedroom.aseprite"
local spr = Sprite(512, 288, ColorMode.RGB)
spr.layers[1].name = "wall"

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
local function px(img, x, y, hex) img:drawPixel(x, y, rgba(hex)) end
local function hline(img, x1, x2, y, hex) fill(img, x1, y, x2 - x1 + 1, 1, hex) end
local function vline(img, x, y1, y2, hex) fill(img, x, y1, 1, y2 - y1 + 1, hex) end
local function cel(name)
  local layer = spr:newLayer()
  layer.name = name
  return spr:newCel(layer, 1).image
end

-- ===================== wall =====================
spr.layers[1].name = "wall"
local wall = spr:newCel(spr.layers[1], 1).image
fill(wall, 0, 0, 512, 12, "efe4d2")
fill(wall, 0, 12, 512, 152, "e2d3bf")
fill(wall, 0, 164, 512, 8, "7a5a48")
fill(wall, 0, 164, 512, 1, "8f6c56")
-- soft light from the window
fill(wall, 216, 16, 128, 142, "e8d6bd")
fill(wall, 228, 16, 104, 142, "eeddc5")

-- window with evening sky and curtains
fill(wall, 228, 30, 104, 102, "6b5a4a")
fill(wall, 232, 34, 96, 94, "7a8fa8")
fill(wall, 232, 34, 96, 30, "9fb0c0")
fill(wall, 232, 64, 96, 28, "c9b7a8")
fill(wall, 232, 92, 96, 36, "e8b07a")
fill(wall, 232, 106, 96, 22, "c98f68")
fill(wall, 278, 34, 3, 94, "6b5a4a")
fill(wall, 232, 78, 96, 3, "6b5a4a")
fill(wall, 224, 132, 112, 4, "8a7a68")
-- curtains
fill(wall, 214, 26, 18, 112, "c9a98e")
fill(wall, 328, 26, 18, 112, "c9a98e")
for y = 32, 130, 16 do
  fill(wall, 218, y, 10, 2, "b08f74")
  fill(wall, 332, y, 10, 2, "b08f74")
end
fill(wall, 210, 22, 26, 4, "8a7a68")
fill(wall, 324, 22, 26, 4, "8a7a68")

-- a single faint wall mark
px(wall, 290, 152, "d2c2aa")
px(wall, 291, 152, "d2c2aa")
px(wall, 120, 144, "d2c2aa")

-- ===================== floor =====================
local floor = cel("floor")
fill(floor, 0, 172, 512, 116, "8a6a50")
for y = 172, 288, 16 do
  hline(floor, 0, 511, y, "7d5e46")
  fill(floor, 0, y + 2, 512, 1, "93745a")
end
for y = 172, 288, 16 do
  local start = (math.floor(y / 16) % 2 == 0) and 32 or 0
  for x = start, 512, 64 do vline(floor, x, y, y + 15, "7d5e46") end
end
-- window light pool
fill(floor, 216, 174, 128, 2, "a48262")
fill(floor, 232, 182, 96, 2, "a48262")
fill(floor, 246, 190, 68, 2, "9c7a5c")
-- shadows under furniture
fill(floor, 40, 220, 160, 4, "76573f")
fill(floor, 338, 244, 156, 4, "76573f")

-- ===================== bed =====================
local bed = cel("bed")
-- headboard against the left wall
fill(bed, 30, 106, 28, 74, "5e4030")
fill(bed, 32, 104, 24, 4, "7a5542")
fill(bed, 34, 110, 20, 64, "6b4a3a")
fill(bed, 34, 110, 2, 64, "7d5946")
-- bed frame and legs
fill(bed, 38, 150, 160, 56, "6b4a3a")
fill(bed, 38, 150, 160, 4, "7d5946")
fill(bed, 38, 202, 160, 6, "5e4030")
fill(bed, 44, 208, 8, 14, "5e4030")
fill(bed, 184, 208, 8, 14, "5e4030")
-- mattress (top surface + front side)
fill(bed, 46, 132, 144, 32, "efe6d6")
fill(bed, 46, 132, 144, 4, "f6efe2")
fill(bed, 46, 158, 144, 6, "d8cbb8")
-- pillow
fill(bed, 50, 124, 32, 16, "f6efe2")
fill(bed, 50, 124, 32, 2, "ffffff")
fill(bed, 52, 136, 28, 2, "d8cbb8")
-- blanket
fill(bed, 84, 134, 106, 24, "b57a6e")
fill(bed, 84, 134, 106, 3, "c98b7d")
for x = 92, 184, 16 do vline(bed, x, 138, 156, "9c655b") end
fill(bed, 84, 156, 106, 4, "9c655b")
fill(bed, 82, 132, 5, 30, "f2e9da")
-- phone between the two people, lying on the blanket
fill(bed, 140, 140, 12, 16, "2a2622")
fill(bed, 141, 141, 10, 12, "7fd0c6")
fill(bed, 142, 142, 8, 2, "a8e8dc")
px(bed, 146, 157, "2a2622")
for x = 146, 168 do px(bed, x, 158, "3a302a") end

-- ===================== desk + TV =====================
local desk = cel("desk")
fill(desk, 338, 166, 156, 8, "8a6a50")
fill(desk, 338, 166, 156, 2, "9d7a5c")
fill(desk, 338, 174, 156, 6, "6b4f3b")
fill(desk, 344, 180, 8, 64, "6b4f3b")
fill(desk, 480, 180, 8, 64, "6b4f3b")
fill(desk, 344, 240, 8, 4, "5e4030")
fill(desk, 480, 240, 8, 4, "5e4030")
-- TV on the desk
fill(desk, 372, 104, 84, 62, "2a2622")
fill(desk, 376, 108, 76, 54, "3a4650")
fill(desk, 376, 108, 76, 3, "5c6a74")
fill(desk, 380, 114, 22, 2, "52606a")
fill(desk, 380, 118, 14, 2, "46545e")
fill(desk, 404, 166, 20, 4, "2a2622")
fill(desk, 398, 170, 32, 4, "1e1a18")
-- window reflection
fill(desk, 426, 114, 16, 28, "46545e")
fill(desk, 430, 118, 8, 18, "52606a")
-- cable and outlet
for y = 166, 180 do px(desk, 418, y, "3a302a") end
fill(desk, 462, 138, 10, 12, "e8ddc9")
fill(desk, 464, 141, 2, 3, "5e4030")
fill(desk, 468, 141, 2, 3, "5e4030")

spr:saveAs(OUT)
print("SAVED " .. OUT .. " layers=" .. #spr.layers)
