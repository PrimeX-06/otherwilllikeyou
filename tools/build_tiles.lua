-- Corridor tileset, 16x16 tiles, 8 columns x 2 rows (128x32).
local OUT = "D:/解决内分泌失调/pixel-act1/assets/tilesets/corridor_tiles.aseprite"
local spr = Sprite(128, 32, ColorMode.RGB)
spr.layers[1].name = "tiles"

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

local FONT = {
  ["E"] = {"###", "#..", "##.", "#..", "###"},
  ["X"] = {"#.#", "#.#", ".#.", "#.#", "#.#"},
  ["I"] = {"###", ".#.", ".#.", ".#.", "###"},
  ["T"] = {"###", ".#.", ".#.", ".#.", ".#."},
}
local function text(img, x, y, str, hex)
  local cx = x
  for i = 1, #str do
    local g = FONT[str:sub(i, i)]
    if g then
      for row = 1, 5 do
        for col = 1, 3 do
          if g[row]:sub(col, col) == "#" then px(img, cx + col - 1, y + row - 1, hex) end
        end
      end
    end
    cx = cx + 4
  end
end

local img = spr:newCel(spr.layers[1], 1).image

local function tile(col, row)
  return col * 16, row * 16
end

-- 0 floor A
local x, y = tile(0, 0)
fill(img, x, y, 16, 16, "a9a196")
fill(img, x, y, 1, 16, "938c82")
fill(img, x, y, 16, 1, "938c82")
px(img, x + 6, y + 7, "b4aca0")
px(img, x + 12, y + 11, "9c948a")

-- 1 floor B
x, y = tile(1, 0)
fill(img, x, y, 16, 16, "aca49a")
fill(img, x, y, 1, 16, "938c82")
fill(img, x, y, 16, 1, "938c82")
px(img, x + 9, y + 5, "b8b0a4")
px(img, x + 4, y + 12, "9c948a")

-- 2 wall
x, y = tile(2, 0)
fill(img, x, y, 16, 16, "d8c8ae")
fill(img, x, y, 1, 16, "d0bfa5")
px(img, x + 11, y + 4, "c9b89e")
px(img, x + 3, y + 12, "c9b89e")

-- 3 baseboard
x, y = tile(3, 0)
fill(img, x, y, 16, 16, "7a5a48")
fill(img, x, y, 16, 1, "8f6c56")
fill(img, x, y + 12, 16, 4, "5e4234")

-- 4 ceiling
x, y = tile(4, 0)
fill(img, x, y, 16, 16, "e9dfcf")
fill(img, x, y + 14, 16, 2, "d0c4b0")

-- 5 door frame
x, y = tile(5, 0)
fill(img, x, y, 16, 16, "4f382c")
fill(img, x + 1, y + 1, 14, 14, "6d4a3a")
fill(img, x + 2, y + 2, 12, 12, "4f382c")

-- 6 door panel
x, y = tile(6, 0)
fill(img, x, y, 16, 16, "6b3f32")
fill(img, x, y, 16, 1, "3f241d")
fill(img, x, y, 1, 16, "3f241d")
fill(img, x + 3, y + 3, 10, 10, "5b332a")
fill(img, x + 4, y + 4, 8, 8, "7a4738")

-- 7 window
x, y = tile(7, 0)
fill(img, x, y, 16, 16, "6b5a4a")
fill(img, x + 2, y + 2, 12, 12, "bcd4d6")
fill(img, x + 2, y + 2, 12, 5, "cfe2e2")
fill(img, x + 7, y + 2, 2, 12, "6b5a4a")
fill(img, x + 2, y + 7, 12, 2, "6b5a4a")

-- 8 stair
x, y = tile(0, 1)
fill(img, x, y, 16, 16, "2a2622")
fill(img, x, y + 4, 16, 3, "3a3630")
fill(img, x, y + 9, 16, 3, "332f2a")
fill(img, x, y + 14, 16, 2, "3a3630")

-- 9 doormat
x, y = tile(1, 1)
fill(img, x, y, 16, 16, "5e322e")
fill(img, x + 1, y + 2, 14, 12, "7b3f3a")
for i = 0, 3 do fill(img, x + 3 + i * 3, y + 4, 1, 8, "a35a4a") end

-- 10 pipe
x, y = tile(2, 1)
fill(img, x, y, 16, 16, "d8c8ae")
fill(img, x, y + 2, 16, 3, "9a8a78")
fill(img, x, y + 2, 16, 1, "b0a08c")
fill(img, x + 5, y + 1, 2, 5, "7f7262")

-- 11 exit sign
x, y = tile(3, 1)
fill(img, x, y, 16, 16, "2f7d4f")
fill(img, x + 1, y + 3, 14, 10, "3a9460")
text(img, x, y + 6, "EXIT", "e8f2e8")

-- 12 ceiling light
x, y = tile(4, 1)
fill(img, x, y, 16, 16, "e9dfcf")
fill(img, x + 2, y + 4, 12, 3, "f4e6b8")
fill(img, x + 4, y + 3, 8, 1, "e8d9b0")

-- 13 scuffed wall
x, y = tile(5, 1)
fill(img, x, y, 16, 16, "d8c8ae")
px(img, x + 3, y + 6, "c2b299")
px(img, x + 4, y + 6, "c2b299")
px(img, x + 9, y + 10, "c9b89e")
px(img, x + 10, y + 11, "c9b89e")

-- 14 door handle plate
x, y = tile(6, 1)
fill(img, x, y, 16, 16, "6b3f32")
fill(img, x + 6, y + 3, 3, 2, "d9b56a")
fill(img, x + 7, y + 5, 2, 6, "d9b56a")
fill(img, x + 8, y + 11, 1, 2, "a8823f")

-- 15 empty tile stays transparent

spr:saveAs(OUT)
print("SAVED " .. OUT)
