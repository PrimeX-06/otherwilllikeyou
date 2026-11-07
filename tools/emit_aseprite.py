"""Emit standalone Aseprite Lua builders (data + sprite construction)."""
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
import sprite_design as d
import variants as v

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PAL = d.PAL
REV = {}
for k, val in PAL.items():
    REV.setdefault(val.lower(), k)


def rows_for(sp):
    out = []
    for y in range(d.H):
        row = []
        for x in range(d.W):
            c = sp.p[y][x]
            if c is None:
                row.append(".")
            else:
                row.append(REV.get(c.lower(), "?"))
        out.append("".join(row))
    return out


def lua_escape(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')


def emit(name, frames, tags, outfile, durations):
    lines = []
    lines.append("local data = {")
    lines.append(f"  width = {d.W}, height = {d.H},")
    lines.append("  palette = {")
    for k, val in PAL.items():
        lines.append(f'    ["{k}"] = "{val[1:]}",')
    lines.append("  },")
    lines.append("  frames = {")
    for i, (fname, sp) in enumerate(frames, 1):
        ms = durations.get(fname, 120)
        lines.append(f'    {{ name = "{fname}", duration = {ms / 1000:.3f}, rows = {{')
        for row in rows_for(sp):
            lines.append(f'      "{row}",')
        lines.append("    } },")
    lines.append("  },")
    lines.append("  tags = {")
    for tname, a, b in tags:
        lines.append(f'    {{ name = "{tname}", from = {a}, to = {b} }},')
    lines.append("  },")
    lines.append("}")
    lines.append("")
    lines.append(f'local OUT = "{lua_escape(outfile)}"')
    lines.append("""
local spr = Sprite(data.width, data.height, ColorMode.RGB)
spr.layers[1].name = "character"
for i, fr in ipairs(data.frames) do
  if i > 1 then spr:newFrame() end
  local cel = spr:newCel(spr.layers[1], i)
  local img = cel.image
  for y, row in ipairs(fr.rows) do
    for x = 1, #row do
      local ch = row:sub(x, x)
      local hex = data.palette[ch]
      if hex then
        local r = tonumber(hex:sub(1, 2), 16)
        local g = tonumber(hex:sub(3, 4), 16)
        local b = tonumber(hex:sub(5, 6), 16)
        img:drawPixel(x - 1, y - 1, app.pixelColor.rgba(r, g, b, 255))
      end
    end
  end
  spr.frames[i].duration = fr.duration
end
for _, t in ipairs(data.tags) do
  local tag = spr:newTag(t.from, t.to)
  tag.name = t.name
end
spr:saveAs(OUT)
print("SAVED " .. OUT .. " frames=" .. #spr.frames .. " tags=" .. #spr.tags .. " palette=" .. #spr.palettes[1])
""")
    path = os.path.join(os.path.dirname(__file__), f"build_{name}.lua")
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        f.write("\n".join(lines))
    return path


def main():
    girl = v.all_girl()
    boy = v.all_boy()
    gpath = os.path.join(ROOT, "assets", "characters", "girl", "girl_master.aseprite").replace("\\", "/")
    bpath = os.path.join(ROOT, "assets", "characters", "boy", "boy_master.aseprite").replace("\\", "/")

    gtags = [
        ("idle_down", 1, 2), ("idle_left", 3, 3), ("idle_right", 4, 4), ("idle_up", 5, 5),
        ("walk_down", 6, 9), ("walk_left", 10, 13), ("walk_right", 14, 17), ("walk_up", 18, 21),
        ("sit_left", 22, 22), ("sit_right", 23, 23), ("wave", 24, 25),
    ]
    btags = [
        ("idle_down", 1, 2), ("idle_left", 3, 3), ("idle_right", 4, 4), ("idle_up", 5, 5),
        ("walk_down", 6, 9), ("walk_left", 10, 13), ("walk_right", 14, 17), ("walk_up", 18, 21),
        ("sit_left", 22, 22), ("sit_right", 23, 23),
    ]
    gdur = {"idle_down": 1600, "idle_down_blink": 140, "idle_left": 900, "idle_right": 900,
            "idle_up": 900, "sit_left": 900, "sit_right": 900, "wave_0": 280, "wave_1": 280}
    bdur = {"idle_down": 1600, "idle_down_blink": 140, "idle_left": 900, "idle_right": 900,
            "idle_up": 900, "sit_left": 900, "sit_right": 900}
    p1 = emit("girl", girl, gtags, gpath, gdur)
    p2 = emit("boy", boy, btags, bpath, bdur)
    print(p1)
    print(p2)
    print("frames:", len(girl), len(boy))


if __name__ == "__main__":
    main()
