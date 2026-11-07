"""Walk, blink, sit and wave variants built from the four master views."""
import copy
from sprite_design import Sprite
import sprite_design as d
import sideback as sb


def mirror(sp):
    out = Sprite()
    for y in range(d.H):
        for x in range(d.W):
            out.p[y][x] = sp.p[y][d.W - 1 - x]
    return out


def blink(sp):
    s = copy.deepcopy(sp)
    for y in range(10, 15):
        for x in range(9, 23):
            if s.p[y][x] not in (d.PAL["O"], d.PAL["H"], d.PAL["h"], d.PAL["o"], d.PAL["X"]):
                s.p[y][x] = d.PAL["S"]
    for ex in (10, 18):
        for x in range(ex, ex + 4):
            s.px(x, 13, "O")
        s.px(ex, 14, "O")
    return s


def front_leg(s, x0, x1, lift, girl=True):
    """One front-facing leg, lifted by `lift` px."""
    bare_end = max(37, 39 - lift)
    sock_end = 43 - lift
    shoe_top = 43 - lift
    for y in range(36, bare_end + 1):
        s.span(y, x0, x1, "S")
    if girl:
        for y in range(bare_end + 1, sock_end + 1):
            s.span(y, x0, x1, "L")
        s.span(bare_end + 1, x0, x1, "w")
        for y in range(shoe_top, shoe_top + 3):
            s.span(y, x0 - 1, x1 + 1, "B")
        s.span(shoe_top + 2, x0 - 1, x1 + 1, "b")
    else:
        for y in range(36, shoe_top):
            s.span(y, x0, x1, "P")
        for y in range(shoe_top, shoe_top + 3):
            s.span(y, x0 - 1, x1 + 1, "L")
        s.span(shoe_top + 2, x0 - 1, x1 + 1, "l")


def shift_down(sp, n=1):
    out = Sprite()
    for y in range(d.H):
        for x in range(d.W):
            sy = y - n
            if 0 <= sy < d.H:
                out.p[y][x] = sp.p[sy][x]
    return out


def walk_front(sp, phase, girl=True):
    s = copy.deepcopy(sp)
    s.clear(6, 36, 25, 47)
    if phase == 0:
        front_leg(s, 11, 14, 0, girl)
        front_leg(s, 18, 21, 2, girl)
    elif phase == 1:
        front_leg(s, 11, 14, 2, girl)
        front_leg(s, 18, 21, 0, girl)
    elif phase == 2:
        front_leg(s, 10, 13, 0, girl)
        front_leg(s, 19, 22, 2, girl)
    else:
        front_leg(s, 12, 15, 2, girl)
        front_leg(s, 17, 20, 0, girl)
    return s


def leg_side(s, x0, lift=0, girl=True, far=False):
    skin = "s" if far else "S"
    sock = "l" if far else "L"
    shoe = "b" if far else "B"
    bare_end = 39 - lift
    sock_end = 43 - lift
    shoe_top = 43 - lift
    for y in range(36, bare_end + 1):
        s.span(y, x0, x0 + 3, skin)
    if girl:
        for y in range(bare_end + 1, sock_end + 1):
            s.span(y, x0, x0 + 3, sock)
        s.span(bare_end + 1, x0, x0 + 3, "w" if not far else "l")
    else:
        for y in range(36, shoe_top):
            s.span(y, x0, x0 + 3, "P")
    for y in range(shoe_top, shoe_top + 3):
        s.span(y, x0 - 2, x0 + 3, shoe)
    s.span(shoe_top + 2, x0 - 2, x0 + 3, shoe)


def walk_side(sp, phase, girl=True):
    s = copy.deepcopy(sp)
    s.clear(6, 35, 23, 47)
    # far leg first
    if phase == 0:
        leg_side(s, 15, 0, girl, far=True)
        leg_side(s, 9, 0, girl)
        arm_x = 7
    elif phase == 1:
        leg_side(s, 15, 2, girl, far=True)
        leg_side(s, 11, 0, girl)
        arm_x = 8
    elif phase == 2:
        leg_side(s, 9, 0, girl, far=True)
        leg_side(s, 14, 0, girl)
        arm_x = 9
    else:
        leg_side(s, 15, 2, girl, far=True)
        leg_side(s, 11, 0, girl)
        arm_x = 8
    # near arm swing
    s.clear(6, 20, 12, 33)
    for y in range(20, 31):
        s.span(y, arm_x, arm_x + 2, "C" if girl else "J")
    s.span(31, arm_x, arm_x + 1, "S")
    s.span(32, arm_x, arm_x + 1, "S")
    s.outline()
    return s


def sit(sp, girl=True):
    s = copy.deepcopy(sp)
    s.clear(5, 34, 24, 47)
    # thigh on the bed, lower leg hanging over the edge
    for y in range(32, 37):
        s.span(y, 7, 15, "K" if girl else "P")
    if girl:
        for y in range(36, 41):
            s.span(y, 7, 10, "S")
        for y in range(41, 43):
            s.span(y, 7, 10, "L")
        for y in range(43, 46):
            s.span(y, 6, 11, "B")
        s.span(45, 6, 11, "b")
    else:
        for y in range(36, 43):
            s.span(y, 7, 10, "P")
        for y in range(43, 46):
            s.span(y, 6, 11, "L")
        s.span(45, 6, 11, "l")
    s.outline()
    return s


def wave(sp, phase=0):
    s = copy.deepcopy(sp)
    s.clear(21, 20, 24, 33)
    # raised near arm, in front of the hair
    for y in range(18, 21):
        s.span(y, 23, 25, "C")
    for y in range(15, 18):
        s.span(y, 24, 26, "C")
    for y in range(12, 15):
        s.span(y, 24, 26, "S")
    if phase == 0:
        s.span(11, 25, 27, "S")
        s.span(12, 25, 27, "S")
        s.px(27, 12, "S")
    else:
        s.span(11, 26, 28, "S")
        s.span(12, 26, 28, "S")
        s.px(28, 11, "S")
    # dark separation against the hair, and a cuff
    for y in range(15, 21):
        s.px(23, y, "O")
    s.span(18, 23, 26, "c")
    s.outline()
    return s


def all_girl():
    down = d.girl_front()
    left = sb.girl_side()
    up = sb.girl_back()
    frames = [
        ("idle_down", down),
        ("idle_down_blink", blink(down)),
        ("idle_left", left),
        ("idle_right", mirror(left)),
        ("idle_up", up),
    ]
    for i in range(4):
        frames.append((f"walk_down_{i}", walk_front(down, i, True)))
    for i in range(4):
        frames.append((f"walk_left_{i}", walk_side(left, i, True)))
    for i in range(4):
        frames.append((f"walk_right_{i}", mirror(walk_side(left, i, True))))
    for i in range(4):
        frames.append((f"walk_up_{i}", walk_front(up, i, True)))
    sit_l = sit(left, True)
    frames.append(("sit_left", sit_l))
    frames.append(("sit_right", mirror(sit_l)))
    frames.append(("wave_0", wave(down, 0)))
    frames.append(("wave_1", wave(down, 1)))
    return frames


def all_boy():
    down = d.boy_front()
    left = sb.boy_side()
    up = sb.boy_back()
    frames = [
        ("idle_down", down),
        ("idle_down_blink", blink(down)),
        ("idle_left", left),
        ("idle_right", mirror(left)),
        ("idle_up", up),
    ]
    for i in range(4):
        frames.append((f"walk_down_{i}", walk_front(down, i, False)))
    for i in range(4):
        frames.append((f"walk_left_{i}", walk_side(left, i, False)))
    for i in range(4):
        frames.append((f"walk_right_{i}", mirror(walk_side(left, i, False))))
    for i in range(4):
        frames.append((f"walk_up_{i}", walk_front(up, i, False)))
    sit_l = sit(left, False)
    frames.append(("sit_left", sit_l))
    frames.append(("sit_right", mirror(sit_l)))
    return frames
