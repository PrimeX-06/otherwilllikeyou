"""Side and back views for the 32x48 character masters."""
from sprite_design import Sprite


def girl_side():
    s = Sprite()
    spans = {3: (13, 20), 4: (11, 22), 5: (10, 24), 6: (9, 25), 7: (8, 26),
             8: (8, 26), 9: (7, 26), 10: (7, 26), 11: (7, 26), 12: (7, 25),
             13: (8, 25), 14: (8, 24), 15: (9, 24), 16: (10, 23), 17: (11, 22),
             18: (12, 21)}
    for y, (a, b) in spans.items():
        s.span(y, a, b, "H")
    face = {8: (9, 14), 9: (8, 16), 10: (8, 16), 11: (8, 16), 12: (8, 16),
            13: (9, 16), 14: (9, 16), 15: (10, 15), 16: (10, 14)}
    for y, (a, b) in face.items():
        s.span(y, a, b, "S")
    s.px(7, 12, "S")
    s.px(7, 13, "S")
    s.px(8, 13, "s")
    s.span(17, 11, 15, "S")
    s.span(18, 12, 14, "s")
    # torso + near arm
    s.span(19, 10, 21, "C")
    for y in range(20, 30):
        s.span(y, 10, 22, "C")
    for y in range(20, 30):
        s.span(y, 11, 13, "W")
    for y in range(20, 31):
        s.span(y, 8, 10, "C")
    s.span(31, 8, 9, "S")
    s.span(32, 8, 9, "S")
    # skirt
    for y in range(30, 36):
        w = 8 if y < 33 else 7
        s.span(y, w, 31 - w, "K")
    # near / far legs
    for y in range(35, 39):
        s.span(y, 11, 14, "S")
        s.span(y, 16, 19, "s")
    for y in range(39, 43):
        s.span(y, 11, 14, "L")
        s.span(y, 16, 19, "l")
    for y in range(43, 46):
        s.span(y, 8, 14, "B")
        s.span(y, 15, 19, "b")
    s.span(45, 8, 14, "b")
    # backpack bulge
    for y in range(21, 28):
        s.span(y, 22, 24, "T")
    s.span(21, 22, 23, "T")
    s.outline()
    # bangs + side lock
    bangs = {7: [(8, 15)], 8: [(8, 14)], 9: [(8, 12)]}
    for y, runs in bangs.items():
        for a, b in runs:
            s.span(y, a, b, "H")
    for y in range(10, 17):
        s.span(y, 16, 17, "H")
    # highlights / shadow
    for x, y in [(12, 4), (13, 4), (14, 4), (10, 5), (9, 6), (8, 7), (8, 9),
                 (9, 15), (21, 5), (22, 6), (23, 7), (24, 8)]:
        s.px(x, y, "h")
    for x, y in [(25, 10), (25, 11), (26, 12), (25, 13), (24, 15), (23, 16)]:
        s.px(x, y, "o")
    # clip on the back side
    for x, y in [(20, 8), (22, 8), (21, 9), (20, 10), (22, 10)]:
        s.px(x, y, "X")
    # eye + brow
    for yy in range(11, 14):
        for xx in range(9, 12):
            s.px(xx, yy, "I" if yy < 13 else "i")
    s.px(10, 11, "E")
    s.px(9, 10, "O")
    s.px(10, 10, "O")
    s.px(11, 10, "O")
    # mouth / blush
    s.px(9, 14, "R")
    s.px(10, 16, "M")
    s.px(11, 16, "M")
    # clothing details
    s.span(19, 10, 12, "c")
    s.span(20, 11, 12, "E")
    s.px(12, 21, "w")
    for y in range(22, 30):
        s.px(13, y, "c")
    s.px(14, 20, "T")
    for x in (10, 14, 18):
        s.px(x, 34, "k")
    s.span(35, 7, 23, "b")
    s.span(39, 11, 14, "w")
    s.span(39, 16, 19, "l")
    s.span(43, 8, 14, "b")
    return s


def boy_side():
    s = Sprite()
    spans = {2: (12, 21), 3: (10, 23), 4: (8, 24), 5: (7, 25), 6: (6, 26),
             7: (6, 26), 8: (7, 26), 9: (7, 25), 10: (8, 24), 11: (8, 24),
             12: (9, 23), 13: (9, 23)}
    for y, (a, b) in spans.items():
        s.span(y, a, b, "H")
    face = {8: (9, 14), 9: (8, 16), 10: (8, 16), 11: (8, 16), 12: (8, 16),
            13: (9, 16), 14: (9, 16), 15: (10, 15), 16: (10, 14)}
    for y, (a, b) in face.items():
        s.span(y, a, b, "S")
    s.px(7, 12, "S")
    s.px(7, 13, "S")
    s.px(8, 13, "s")
    s.span(17, 11, 15, "S")
    s.span(18, 12, 14, "s")
    # jacket + near arm
    s.span(19, 10, 21, "J")
    for y in range(20, 32):
        s.span(y, 10, 22, "J")
    for y in range(20, 30):
        s.span(y, 11, 13, "W")
    for y in range(20, 31):
        s.span(y, 8, 10, "J")
    s.span(31, 8, 9, "S")
    s.span(32, 8, 9, "S")
    # pants
    for y in range(31, 43):
        s.span(y, 10, 21, "P")
    for y in range(43, 46):
        s.span(y, 8, 14, "L")
        s.span(y, 15, 20, "l")
    s.span(45, 8, 14, "l")
    # backpack bulge
    for y in range(21, 28):
        s.span(y, 22, 24, "T")
    s.span(21, 22, 23, "T")
    s.outline()
    # spiky bangs
    bangs = {5: [(7, 9), (11, 13), (15, 17)], 6: [(6, 8), (10, 12), (14, 16)],
             7: [(6, 7), (9, 11), (13, 14)], 8: [(6, 7), (9, 10)],
             9: [(6, 7), (9, 10)], 10: [(6, 7)]}
    for y, runs in bangs.items():
        for a, b in runs:
            s.span(y, a, b, "H")
    for y in range(10, 17):
        s.span(y, 16, 17, "H")
    for x, y in [(11, 3), (12, 3), (9, 4), (8, 5), (13, 5), (16, 4), (17, 5),
                 (21, 4), (22, 5), (23, 6), (7, 8), (7, 10), (8, 13)]:
        s.px(x, y, "h")
    for x, y in [(24, 8), (25, 9), (25, 11), (24, 12), (23, 13)]:
        s.px(x, y, "o")
    # eye + brow
    for yy in range(11, 14):
        for xx in range(9, 12):
            s.px(xx, yy, "I" if yy < 13 else "i")
    s.px(10, 11, "E")
    s.px(9, 10, "O")
    s.px(10, 10, "O")
    s.px(11, 10, "O")
    s.px(9, 14, "R")
    s.px(10, 16, "M")
    s.px(11, 16, "M")
    # jacket details
    s.span(19, 10, 12, "j")
    s.span(20, 11, 12, "E")
    s.px(15, 20, "T")
    for y in range(22, 31):
        s.px(13, y, "j")
    s.span(31, 10, 21, "j")
    for x in (12, 16):
        s.px(x, 35, "p")
    s.px(12, 44, "l")
    s.px(13, 44, "l")
    return s


def girl_back():
    s = Sprite()
    spans = {3: (11, 20), 4: (9, 22), 5: (8, 23), 6: (7, 24), 7: (6, 25),
             8: (6, 25), 9: (6, 25), 10: (6, 25), 11: (6, 25), 12: (6, 25),
             13: (6, 25), 14: (6, 24), 15: (7, 24), 16: (7, 23), 17: (8, 22),
             18: (9, 21), 19: (10, 20)}
    for y, (a, b) in spans.items():
        s.span(y, a, b, "H")
    s.span(19, 12, 19, "S")
    s.span(19, 10, 21, "C")
    for y in range(20, 31):
        s.span(y, 9, 22, "C")
    s.span(31, 8, 9, "S")
    s.span(31, 22, 23, "S")
    s.span(32, 8, 9, "S")
    s.span(32, 22, 23, "S")
    for y in range(30, 36):
        w = 8 if y < 33 else 7
        s.span(y, w, 31 - w, "K")
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
    for x, y in [(10, 4), (11, 4), (12, 4), (9, 5), (8, 5), (8, 6), (7, 7),
                 (7, 8), (7, 10), (7, 12), (8, 14), (15, 6), (16, 8)]:
        s.px(x, y, "h")
    for x, y in [(24, 7), (25, 8), (25, 10), (24, 12), (24, 14), (23, 16),
                 (22, 18)]:
        s.px(x, y, "o")
    for y in range(7, 14):
        s.px(16, y, "o")
    for x, y in [(10, 19), (11, 19), (20, 19), (21, 19)]:
        s.px(x, y, "H")
    # clip: her left = viewer left from behind
    for x, y in [(9, 8), (11, 8), (10, 9), (9, 10), (11, 10)]:
        s.px(x, y, "X")
    # backpack
    for y in range(21, 29):
        s.span(y, 11, 20, "T")
    s.span(20, 12, 19, "T")
    for x in (11, 20):
        for y in range(21, 29):
            s.px(x, y, "b")
    s.span(24, 11, 20, "b")
    s.px(15, 25, "l")
    s.px(16, 25, "l")
    s.px(15, 26, "b")
    s.px(16, 26, "b")
    for x in (10, 14, 18, 22):
        s.px(x, 34, "k")
    s.span(35, 8, 23, "b")
    s.span(39, 11, 14, "w")
    s.span(39, 18, 21, "w")
    return s


def boy_back():
    s = Sprite()
    spans = {1: (13, 18), 2: (10, 21), 3: (8, 23), 4: (7, 24), 5: (6, 25),
             6: (5, 26), 7: (5, 26), 8: (7, 24), 9: (7, 24), 10: (8, 23),
             11: (8, 23), 12: (8, 23), 13: (8, 23)}
    for y, (a, b) in spans.items():
        s.span(y, a, b, "H")
    s.span(17, 12, 19, "S")
    s.span(18, 14, 17, "s")
    s.span(19, 10, 21, "J")
    for y in range(20, 32):
        s.span(y, 9, 22, "J")
    s.span(31, 8, 9, "S")
    s.span(31, 22, 23, "S")
    s.span(32, 8, 9, "S")
    s.span(32, 22, 23, "S")
    for y in range(31, 38):
        s.span(y, 10, 21, "P")
    for y in range(38, 43):
        s.span(y, 10, 14, "P")
        s.span(y, 17, 21, "P")
    for y in range(43, 46):
        s.span(y, 10, 15, "L")
        s.span(y, 17, 22, "L")
    s.span(45, 10, 15, "l")
    s.span(45, 17, 22, "l")
    s.outline()
    for x, y in [(13, 1), (14, 1), (17, 1), (18, 1), (10, 2), (11, 2), (15, 2),
                 (9, 4), (8, 5), (12, 5), (15, 4), (16, 5), (22, 4), (23, 5),
                 (24, 6), (8, 8), (8, 10), (23, 9), (23, 11), (22, 13)]:
        s.px(x, y, "h")
    for x, y in [(24, 7), (25, 8), (25, 10), (24, 11), (24, 13), (23, 13)]:
        s.px(x, y, "o")
    for x, y in [(16, 3), (17, 4), (16, 5), (15, 5)]:
        s.px(x, y, "o")
    # backpack
    for y in range(21, 30):
        s.span(y, 11, 20, "T")
    s.span(22, 12, 19, "T")
    for x in (11, 20):
        for y in range(21, 30):
            s.px(x, y, "b")
    s.span(25, 11, 20, "b")
    s.px(15, 26, "l")
    s.px(16, 26, "l")
    s.px(15, 27, "b")
    s.px(16, 27, "b")
    for y in range(34, 42):
        s.px(15, y, "j")
        s.px(16, y, "j")
    s.px(12, 44, "l")
    s.px(13, 44, "l")
    s.px(19, 44, "l")
    s.px(20, 44, "l")
    return s
