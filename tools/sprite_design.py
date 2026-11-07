"""Draft the 32x48 character masters as pixel rows, render enlarged previews.

The final Aseprite file is built from the same row data (see build_sprites.py).
"""
from PIL import Image

W, H = 32, 48

PAL = {
    "O": "#241a1e",  # outline
    "o": "#33252a",  # deep hair shadow
    "H": "#3a2a2a",  # boy hair / girl hair dark
    "h": "#5b4038",  # hair light
    "g": "#7a5a4a",  # hair highlight
    "S": "#f2c9a2",  # skin
    "s": "#d9a17c",  # skin shadow
    "E": "#f7efe2",  # eye glint / collar white
    "I": "#332422",  # iris
    "i": "#4a3430",  # iris lower half
    "M": "#b5635c",  # mouth
    "R": "#e8a08a",  # blush
    "W": "#f2ead9",  # shirt
    "w": "#d8cbb8",  # shirt shadow
    "C": "#c9a98e",  # girl cardigan
    "c": "#a8856c",  # girl cardigan shadow
    "J": "#333846",  # boy jacket
    "j": "#242832",  # boy jacket shadow
    "K": "#4a3634",  # girl skirt
    "k": "#5d4642",  # girl skirt highlight
    "P": "#2b2a33",  # boy pants
    "p": "#3c3a45",  # boy pants highlight
    "L": "#eae2d4",  # white shoes / socks
    "l": "#bcae9b",  # shoe shadow
    "B": "#6b4a3a",  # brown shoes
    "b": "#4a332a",  # brown shoe shadow
    "T": "#6b4432",  # backpack strap
    "X": "#f0a48e",  # hair clip
}


class Sprite:
    def __init__(self):
        self.p = [[None] * W for _ in range(H)]

    def px(self, x, y, c):
        if 0 <= x < W and 0 <= y < H:
            self.p[y][x] = PAL.get(c, c)

    def span(self, y, x0, x1, c):
        for x in range(x0, x1 + 1):
            self.px(x, y, c)

    def clear(self, x0, y0, x1, y1):
        for y in range(y0, y1 + 1):
            for x in range(x0, x1 + 1):
                if 0 <= x < W and 0 <= y < H:
                    self.p[y][x] = None

    def rows(self, x, y, rows, legend=None):
        legend = legend or PAL
        for j, row in enumerate(rows):
            for i, ch in enumerate(row):
                if ch != ".":
                    self.px(x + i, y + j, legend[ch])

    def outline(self, color="O"):
        src = [row[:] for row in self.p]
        for y in range(H):
            for x in range(W):
                if src[y][x] is not None:
                    continue
                for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nx, ny = x + dx, y + dy
                    if 0 <= nx < W and 0 <= ny < H and src[ny][nx] not in (None, PAL["O"]):
                        self.p[y][x] = PAL.get(color, color)
                        break

    def image(self):
        im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        for y in range(H):
            for x in range(W):
                c = self.p[y][x]
                if c:
                    im.putpixel((x, y), tuple(int(c[i:i + 2], 16) for i in (1, 3, 5)) + (255,))
        return im


def girl_front():
    s = Sprite()
    spans = {
        3: (11, 20), 4: (9, 22), 5: (8, 23), 6: (7, 24), 7: (6, 25),
        8: (6, 25), 9: (6, 25), 10: (6, 25), 11: (6, 25), 12: (6, 25),
        13: (6, 25), 14: (6, 24), 15: (7, 24), 16: (7, 23), 17: (8, 22),
        18: (9, 21),
    }
    for y, (a, b) in spans.items():
        s.span(y, a, b, "H")
    face = {8: (10, 21), 9: (10, 21), 10: (10, 21), 11: (10, 21), 12: (10, 21),
            13: (10, 21), 14: (10, 21), 15: (10, 20), 16: (11, 19)}
    for y, (a, b) in face.items():
        s.span(y, a, b, "S")
    s.span(17, 12, 19, "S")
    s.span(18, 14, 17, "s")
    # cardigan torso / shirt
    s.span(19, 10, 21, "C")
    for y in range(20, 31):
        s.span(y, 9, 22, "C")
    for y in range(19, 31):
        s.span(y, 13, 18, "W")
    # arms
    for y in range(20, 31):
        s.span(y, 7, 9, "C")
        s.span(y, 22, 24, "C")
    s.span(31, 8, 9, "S")
    s.span(31, 22, 23, "S")
    s.span(32, 8, 9, "S")
    s.span(32, 22, 23, "S")
    # skirt
    for y in range(30, 36):
        w = 8 if y < 33 else 7
        s.span(y, w, 31 - w, "K")
    # bare legs, socks, shoes
    for y in range(35, 39):
        s.span(y, 11, 14, "S")
        s.span(y, 18, 21, "S")
    for y in range(39, 44):
        s.span(y, 11, 14, "L")
        s.span(y, 18, 21, "L")
    for y in range(43, 46):
        s.span(y, 10, 15, "B")
        s.span(y, 17, 22, "B")
    s.span(45, 10, 15, "b")
    s.span(45, 17, 22, "b")
    s.outline()
    # bangs, leaving the forehead open above the eyes
    bangs = {
        7: [(6, 25)],
        8: [(6, 8), (9, 11), (13, 16), (18, 20), (22, 25)],
        9: [(6, 7), (9, 10), (15, 16), (21, 22), (24, 25)],
        10: [(6, 7), (9, 9), (22, 22), (24, 25)],
    }
    for y, runs in bangs.items():
        for a, b in runs:
            s.span(y, a, b, "H")
    # hair highlights and shadow side
    for x, y in [(10, 4), (11, 4), (12, 4), (9, 5), (8, 5), (8, 6), (7, 7),
                 (7, 8), (7, 10), (7, 12), (8, 14), (23, 6), (24, 7), (24, 9)]:
        s.px(x, y, "h")
    for x, y in [(24, 10), (25, 11), (25, 12), (24, 13), (24, 14), (23, 16)]:
        s.px(x, y, "o")
    # jagged bob ends
    for x, y in [(10, 19), (11, 19), (20, 19), (21, 19), (9, 20), (22, 20)]:
        s.px(x, y, "H")
    # clip (viewer right)
    for x, y in [(22, 7), (25, 7), (23, 8), (24, 8), (23, 9), (24, 9), (22, 10), (25, 10)]:
        s.px(x, y, "X")
    # eyes: large dark iris, rounded, with glint and lighter lower half
    for ex in (10, 18):
        for dx, dy in [(1, 0), (2, 0), (0, 1), (1, 1), (2, 1), (3, 1),
                       (0, 2), (1, 2), (2, 2), (3, 2), (1, 3), (2, 3)]:
            s.px(ex + dx, 11 + dy, "I")
        s.px(ex + 2, 11, "E")
        s.px(ex + 1, 13, "i")
        s.px(ex + 2, 13, "i")
    # blush / mouth
    s.px(10, 15, "R")
    s.px(21, 15, "R")
    s.span(16, 14, 16, "M")
    # clothing details
    s.span(19, 10, 12, "c")
    s.span(19, 19, 21, "c")
    s.span(20, 13, 14, "E")
    s.span(20, 17, 18, "E")
    s.span(21, 15, 16, "W")
    s.px(15, 21, "w")
    s.span(22, 13, 18, "W")
    s.px(15, 25, "O")
    s.px(16, 28, "O")
    for y in range(22, 31):
        s.px(12, y, "c")
        s.px(19, y, "c")
    for y in range(20, 28):
        s.px(10, y, "T")
        s.px(21, y, "T")
    for x in (10, 14, 18, 22):
        s.px(x, 34, "k")
    s.span(35, 8, 23, "b")
    # sock cuffs and shoe tops
    s.span(39, 11, 14, "w")
    s.span(39, 18, 21, "w")
    s.span(43, 10, 15, "b")
    s.span(43, 17, 22, "b")
    return s


def boy_front():
    s = Sprite()
    spans = {
        1: (13, 18), 2: (10, 21), 3: (8, 23), 4: (7, 24), 5: (6, 25),
        6: (5, 26), 7: (5, 26), 8: (7, 24), 9: (7, 24), 10: (8, 23),
        11: (8, 23), 12: (8, 23), 13: (8, 23),
    }
    for y, (a, b) in spans.items():
        s.span(y, a, b, "H")
    face = {8: (10, 21), 9: (10, 21), 10: (10, 21), 11: (10, 21), 12: (10, 21),
            13: (10, 21), 14: (10, 21), 15: (10, 20), 16: (11, 19)}
    for y, (a, b) in face.items():
        s.span(y, a, b, "S")
    s.span(17, 12, 19, "S")
    s.span(18, 14, 17, "s")
    # jacket
    s.span(19, 10, 21, "J")
    for y in range(20, 32):
        s.span(y, 9, 22, "J")
    for y in range(19, 31):
        s.span(y, 13, 18, "W")
    # arms
    for y in range(20, 31):
        s.span(y, 7, 9, "J")
        s.span(y, 22, 24, "J")
    s.span(31, 8, 9, "S")
    s.span(31, 22, 23, "S")
    s.span(32, 8, 9, "S")
    s.span(32, 22, 23, "S")
    # pants: two legs
    for y in range(31, 38):
        s.span(y, 10, 21, "P")
    for y in range(38, 43):
        s.span(y, 10, 14, "P")
        s.span(y, 17, 21, "P")
    # shoes
    for y in range(43, 46):
        s.span(y, 10, 15, "L")
        s.span(y, 17, 22, "L")
    s.span(45, 10, 15, "l")
    s.span(45, 17, 22, "l")
    s.outline()
    # spiky bangs
    bangs = {
        5: [(6, 8), (10, 12), (14, 17), (19, 21), (23, 25)],
        6: [(6, 8), (10, 12), (14, 18), (20, 23), (24, 25)],
        7: [(6, 7), (9, 10), (13, 15), (17, 19), (21, 23), (24, 25)],
        8: [(7, 8), (9, 10), (20, 21), (23, 24)],
        9: [(7, 8), (9, 10), (21, 22), (24, 25)],
        10: [(7, 7), (24, 25)],
    }
    for y, runs in bangs.items():
        for a, b in runs:
            s.span(y, a, b, "H")
    # highlights / shadow
    for x, y in [(10, 3), (11, 4), (9, 4), (8, 5), (12, 5), (15, 4), (16, 5),
                 (22, 4), (23, 5), (24, 6), (7, 8), (7, 9), (7, 11), (23, 9),
                 (23, 10), (8, 12), (24, 12)]:
        s.px(x, y, "h")
    for x, y in [(24, 7), (25, 8), (25, 10), (24, 11), (24, 13), (23, 13)]:
        s.px(x, y, "o")
    # eyes
    for ex in (10, 18):
        for dx, dy in [(1, 0), (2, 0), (0, 1), (1, 1), (2, 1), (3, 1),
                       (0, 2), (1, 2), (2, 2), (3, 2), (1, 3), (2, 3)]:
            s.px(ex + dx, 11 + dy, "I")
        s.px(ex + 2, 11, "E")
        s.px(ex + 1, 13, "i")
        s.px(ex + 2, 13, "i")
    s.px(10, 15, "R")
    s.px(21, 15, "R")
    s.span(16, 14, 16, "M")
    # jacket details: collar, zip, straps
    s.span(19, 10, 12, "j")
    s.span(19, 19, 21, "j")
    s.span(20, 13, 14, "E")
    s.span(20, 17, 18, "E")
    s.span(21, 15, 16, "j")
    s.span(22, 13, 18, "W")
    for y in range(22, 31):
        s.px(12, y, "j")
        s.px(19, y, "j")
    for y in range(20, 28):
        s.px(10, y, "T")
        s.px(21, y, "T")
    s.px(15, 24, "O")
    s.px(16, 27, "O")
    s.span(31, 10, 21, "j")
    # pant creases
    for y in range(34, 42):
        s.px(13, y, "p")
        s.px(18, y, "p")
    # shoe laces
    s.px(12, 44, "l")
    s.px(13, 44, "l")
    s.px(19, 44, "l")
    s.px(20, 44, "l")
    return s


def sheet(sprites, path, scale=12, bg=(46, 44, 54, 255)):
    cols = len(sprites)
    out = Image.new("RGBA", (W * cols, H), bg)
    for i, sp in enumerate(sprites):
        out.paste(sp.image(), (i * W, 0), sp.image())
    out = out.resize((out.width * scale, out.height * scale), Image.NEAREST)
    out.save(path)


if __name__ == "__main__":
    import os
    os.makedirs("pixel-act1/ref", exist_ok=True)
    g = girl_front()
    b = boy_front()
    sheet([g, b], "pixel-act1/ref/front_draft.png", scale=12)
    print("rendered")
