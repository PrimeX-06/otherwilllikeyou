-- Corridor scene, 512x288, Chinese residential building, third floor.
local OUT = "D:/解决内分泌失调/pixel-act1/assets/scenes/corridor.aseprite"
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

local function px(img, x, y, hex)
  img:drawPixel(x, y, rgba(hex))
end

local function hline(img, x1, x2, y, hex)
  fill(img, x1, y, x2 - x1 + 1, 1, hex)
end

local function vline(img, x, y1, y2, hex)
  fill(img, x, y1, 1, y2 - y1 + 1, hex)
end

-- 3x5 digits and a few letters, scale = 1 or 2.
local FONT = {
  ["0"] = {"###", "#.#", "#.#", "#.#", "###"},
  ["1"] = {".#.", "##.", ".#.", ".#.", "###"},
  ["2"] = {"###", "..#", "###", "#..", "###"},
  ["3"] = {"###", "..#", "###", "..#", "###"},
  ["4"] = {"#.#", "#.#", "###", "..#", "..#"},
  ["5"] = {"###", "#..", "###", "..#", "###"},
  ["6"] = {"###", "#..", "###", "#.#", "###"},
  ["7"] = {"###", "..#", "..#", "..#", "..#"},
  ["8"] = {"###", "#.#", "###", "#.#", "###"},
  ["9"] = {"###", "#.#", "###", "..#", "###"},
  ["E"] = {"###", "#..", "##.", "#..", "###"},
  ["X"] = {"#.#", "#.#", ".#.", "#.#", "#.#"},
  ["I"] = {"###", ".#.", ".#.", ".#.", "###"},
  ["T"] = {"###", ".#.", ".#.", ".#.", ".#."},
  ["F"] = {"###", "#..", "##.", "#..", "#.."},
}

local function text(img, x, y, str, scale, hex)
  local cx = x
  for i = 1, #str do
    local ch = str:sub(i, i)
    local g = FONT[ch]
    if g then
      for row = 1, 5 do
        for col = 1, 3 do
          if g[row]:sub(col, col) == "#" then
            fill(img, cx + (col - 1) * scale, y + (row - 1) * scale, scale, scale, hex)
          end
        end
      end
    end
    cx = cx + 4 * scale
  end
end

local function cel(name)
  local layer = spr:newLayer()
  layer.name = name
  return spr:newCel(layer, 1).image
end

-- ===================== wall =====================
spr.layers[1].name = "wall"
local wall = spr:newCel(spr.layers[1], 1).image
fill(wall, 0, 0, 512, 16, "e9dfcf")
fill(wall, 0, 16, 512, 152, "d8c8ae")
fill(wall, 0, 168, 512, 8, "7a5a48")
fill(wall, 0, 168, 512, 1, "8f6c56")
fill(wall, 0, 16, 512, 2, "c9bca6")

-- window at the far left, daylight
fill(wall, 14, 54, 68, 84, "6b5a4a")
fill(wall, 18, 58, 60, 76, "bcd4d6")
fill(wall, 18, 58, 60, 30, "cfe2e2")
fill(wall, 18, 104, 60, 30, "a9c2c0")
fill(wall, 46, 58, 4, 76, "6b5a4a")
fill(wall, 18, 92, 60, 4, "6b5a4a")
fill(wall, 12, 136, 72, 4, "8a7a68")
-- distant blocks seen through the window
fill(wall, 22, 112, 14, 22, "93adaa")
fill(wall, 40, 120, 10, 14, "9fb8b6")
fill(wall, 56, 116, 18, 18, "8fa8a5")
for i = 0, 5 do px(wall, 24 + i * 8, 113, "d7e6e4") end

-- ceiling lights
for _, lx in ipairs({96, 256, 416}) do
  fill(wall, lx - 14, 6, 28, 4, "f4e6b8")
  fill(wall, lx - 10, 4, 20, 2, "e8d9b0")
  hline(wall, lx - 16, lx + 15, 10, "c9bca6")
end

-- pipe run and brackets
fill(wall, 0, 24, 512, 3, "9a8a78")
hline(wall, 0, 511, 24, "b0a08c")
for x = 32, 480, 64 do
  fill(wall, x, 22, 3, 7, "7f7262")
end
-- conduit down to the meter box
fill(wall, 226, 27, 3, 57, "8a7a68")

-- ===================== floor =====================
local floor = cel("floor")
fill(floor, 0, 176, 512, 112, "a9a196")
-- wall-floor shadow
fill(floor, 0, 176, 512, 4, "8d857b")
-- 32x32 tiles with grout
for ty = 176, 288, 32 do
  for tx = 0, 512, 32 do
    local shade = ((tx / 32 + ty / 32) % 2 == 0) and "aca49a" or "a59d92"
    fill(floor, tx, ty, 32, 32, shade)
  end
end
for x = 0, 512, 32 do
  vline(floor, x, 176, 287, "8e877d")
end
for y = 192, 288, 16 do
  hline(floor, 0, 511, y, "938c82")
end
-- subtle floor reflections below the lights
for _, lx in ipairs({96, 256, 416}) do
  fill(floor, lx - 20, 196, 40, 2, "b2aa9e")
end
-- scuffs
for _, p in ipairs({{88,250},{92,251},{150,262},{360,244},{372,245},{430,270}}) do
  px(floor, p[1], p[2], "8e877d")
end

-- ===================== doors =====================
local doors = cel("doors")
local function doorway(x, y)
  -- frame
  fill(doors, x - 6, y - 4, 76, 132, "4f382c")
  fill(doors, x - 4, y - 2, 72, 130, "6d4a3a")
  -- dark opening
  fill(doors, x, y, 64, 128, "241c19")
  fill(doors, x, y, 64, 10, "1a1412")
  -- faint interior back wall and a shoe cabinet silhouette
  fill(doors, x + 4, y + 20, 56, 80, "2f2621")
  fill(doors, x + 8, y + 96, 48, 26, "1c1613")
  fill(doors, x + 12, y + 100, 40, 4, "2a211c")
  -- warm slit of light from inside
  fill(doors, x + 52, y + 6, 3, 40, "4a3a30")
end
doorway(104, 48)
doorway(320, 48)

-- plaques (kept on the wall, so they never move with the door)
local function plaque(x, y, label)
  fill(doors, x, y, 34, 16, "5c4234")
  fill(doors, x + 1, y + 1, 32, 14, "e8ddc9")
  text(doors, x + 5, y + 3, label, 2, "3a2a22")
end
plaque(174, 58, "301")
plaque(390, 58, "302")

-- doormats
fill(doors, 318, 178, 68, 10, "5e322e")
fill(doors, 320, 180, 64, 6, "7b3f3a")
for x = 322, 382, 6 do fill(doors, x, 181, 3, 4, "a35a4a") end
fill(doors, 102, 178, 68, 9, "5e322e")
fill(doors, 104, 180, 64, 5, "6d3a35")

-- ===================== props =====================
local props = cel("props")
-- meter box
fill(props, 206, 84, 44, 42, "5e6360")
fill(props, 208, 86, 40, 38, "8a8f8c")
fill(props, 214, 92, 28, 18, "b8c4be")
fill(props, 214, 92, 28, 2, "c8d4ce")
fill(props, 218, 96, 2, 10, "6e7a74")
fill(props, 222, 96, 2, 10, "6e7a74")
fill(props, 226, 96, 2, 10, "6e7a74")
fill(props, 240, 116, 6, 3, "5e6360")
fill(props, 226, 124, 3, 46, "8a7a68")

-- shoe rack beside 302
fill(props, 390, 148, 34, 28, "8a6a50")
fill(props, 390, 148, 34, 3, "9d7a5c")
fill(props, 390, 160, 34, 3, "6e523e")
fill(props, 390, 172, 34, 3, "6e523e")
for x = 392, 420, 28 do vline(props, x, 151, 175, "6e523e") end
-- shoes
fill(props, 394, 154, 10, 5, "3a2f2c")
fill(props, 407, 153, 12, 6, "5a3a30")
fill(props, 395, 164, 9, 5, "5a3a30")
fill(props, 408, 165, 11, 4, "3a2f2c")

-- fire extinguisher
fill(props, 438, 136, 10, 22, "b23a32")
fill(props, 439, 134, 8, 3, "8f2c26")
fill(props, 441, 130, 4, 4, "2a2422")
fill(props, 447, 140, 3, 12, "2a2422")
fill(props, 447, 152, 3, 3, "d9b56a")
fill(props, 434, 142, 4, 3, "5e6360")
fill(props, 434, 156, 4, 3, "5e6360")

-- stairwell opening and steps at the right end
fill(props, 450, 38, 52, 138, "2a2622")
fill(props, 450, 38, 52, 4, "4a443c")
-- descending steps
for i = 0, 6 do
  local sx = 452 + i * 7
  local sy = 150 + i * 4
  fill(props, sx, sy, 48 - i * 7, 4, i % 2 == 0 and "3a3630" or "332f2a")
end
-- railing
fill(props, 452, 76, 3, 100, "4a4742")
for y = 80, 172, 12 do
  fill(props, 455, y, 2, 8, "3f3c38")
end
fill(props, 452, 76, 46, 3, "55514a")

-- exit sign
fill(props, 456, 18, 46, 14, "2f7d4f")
fill(props, 458, 20, 42, 10, "3a9460")
text(props, 464, 22, "EXIT", 2, "e8f2e8")

-- small scuffs / stains near the floor
for _, p in ipairs({{82,158},{90,159},{252,150},{258,151},{288,164},{300,165}}) do
  px(wall, p[1], p[2], "c2b299")
end

spr:saveAs(OUT)
print("SAVED " .. OUT .. " layers=" .. #spr.layers .. " size=" .. spr.width .. "x" .. spr.height)
