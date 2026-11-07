local dir='D:/解决内分泌失调/pixel-act1/assets/scenes/'
local function color(s) return app.pixelColor.rgba(tonumber(s:sub(1,2),16),tonumber(s:sub(3,4),16),tonumber(s:sub(5,6),16),255) end
local function rect(im,x,y,w,h,c) for yy=y,y+h-1 do for xx=x,x+w-1 do if xx>=0 and xx<512 and yy>=0 and yy<288 then im:drawPixel(xx,yy,color(c)) end end end end
local function layer(s,n) local l=s:newLayer(); l.name=n; return s:newCel(l,1).image end
local function base(name)
 local s=Sprite(512,288,ColorMode.RGB); s.layers[1].name='walls_floor'; local a=s:newCel(s.layers[1],1).image
 rect(a,0,0,512,176,'e4d4bd'); rect(a,0,0,512,12,'927966'); rect(a,0,12,512,5,'b9a48b'); rect(a,0,168,512,8,'86695a'); rect(a,0,176,512,112,'b89a80')
 for y=176,288,14 do rect(a,0,y,512,1,'a88971') end
 for x=0,512,32 do rect(a,x,176,1,112,'aa8c75') end
 return s,a
end
local s,a=base('corridor')
local t=layer(s,'wall_tiles'); for x=0,512,12 do rect(t,x,17,1,150,'d3c4b0') end; for y=24,167,12 do rect(t,0,y,512,1,'d3c4b0') end
local b=layer(s,'doors_windows')
local function door(im,x) rect(im,x,40,66,136,'73574d'); rect(im,x+4,44,58,132,'513f3a'); rect(im,x+8,48,50,124,'866b58'); rect(im,x+11,51,44,65,'b9c1b3'); rect(im,x+31,51,2,65,'675a50'); rect(im,x+11,80,44,2,'675a50'); rect(im,x+42,134,3,4,'e0c58f'); rect(im,x-2,172,70,4,'604941') end
local function window(im,x) rect(im,x,49,100,80,'756256'); rect(im,x+4,53,92,72,'bdc8c0'); rect(im,x+4,53,92,29,'d1d9ca'); rect(im,x+49,53,3,72,'756256'); rect(im,x+4,86,92,3,'756256'); for xx=x+12,x+92,10 do rect(im,xx,53,1,72,'897f70') end; rect(im,x-2,129,104,4,'866b5b') end
door(b,358)
-- Open-air balcony: sky visible between red columns, continuous waist-high guardrail.
rect(b,31,29,309,117,'b6c9c8'); rect(b,31,29,309,28,'d2ded7')
for _,x in ipairs({30,133,236,339}) do rect(b,x,19,10,151,'9d6558'); rect(b,x+8,19,3,151,'c8927a') end
rect(b,30,143,320,4,'7f8582'); rect(b,30,147,320,4,'ffffff')
rect(b,30,151,320,25,'f3f3eb'); rect(b,30,174,320,3,'9b9d96')
for x=30,349,12 do rect(b,x,152,1,22,'dedfd9') end
rect(b,30,160,320,1,'ffffff'); rect(b,30,169,320,1,'e6e8e1');
 rect(b,0,17,18,151,'a76d59'); rect(b,18,17,3,151,'d2a489'); rect(b,432,17,6,151,'ac907b'); rect(b,441,17,71,151,'c8b29c'); rect(b,449,28,58,101,'846958'); rect(b,454,33,48,91,'e2d4bd')
local c=layer(s,'details'); rect(c,373,29,34,8,'765a50'); rect(c,376,31,28,4,'e0c8a2'); rect(c,39,26,32,42,'806657'); rect(c,42,29,26,36,'f0dfbd'); rect(c,298,27,30,39,'806657'); rect(c,301,30,24,33,'e9d9b9'); rect(c,432,151,80,17,'a98c73');
-- Leaning/conversation point, warm late-afternoon shadow on the balcony floor.
rect(c,50,179,278,2,'c8a989'); rect(c,76,184,235,1,'d5b49a');
rect(c,83,199,235,2,'9e846d'); rect(c,145,200,3,38,'9e846d')
s:saveAs(dir..'school_corridor.aseprite'); s:saveCopyAs(dir..'school_corridor.png'); s:close()
local q,f=base('classroom'); local w=layer(q,'windows_door'); door(w,18); window(w,365); rect(w,0,18,512,4,'c7b29a'); rect(w,0,162,512,5,'9e806b')
local bb=layer(q,'blackboard'); rect(bb,239,39,105,83,'6f5447'); rect(bb,243,43,97,75,'384f48'); rect(bb,247,47,89,67,'48645a'); rect(bb,250,113,82,2,'b7c4a7'); rect(bb,248,122,88,3,'af9277'); rect(bb,273,64,40,2,'bac9ad'); rect(bb,280,74,25,1,'a9bda5'); rect(bb,282,81,36,1,'a9bda5')
local d=layer(q,'desks_and_chairs')
local function desk(x,y)
 -- table top and separate legs
 rect(d,x,y,44,9,'765240'); rect(d,x+2,y+1,40,6,'bd8965'); rect(d,x+5,y+2,30,1,'e1b18a')
 rect(d,x+4,y+9,3,22,'765849'); rect(d,x+37,y+9,3,22,'765849')
 -- chair behind the near edge of each desk: back, seat, four legs
 rect(d,x+12,y+15,21,3,'4e3c37'); rect(d,x+14,y+18,17,11,'885f4f')
 rect(d,x+15,y+20,15,6,'b47e5e'); rect(d,x+11,y+29,23,4,'513d36')
 rect(d,x+13,y+33,3,10,'61483c'); rect(d,x+29,y+33,3,10,'61483c')
end
for _,p in ipairs({{100,175},{169,175},{238,175},{307,175},{376,175},{100,212},{169,212},{238,212},{307,212},{376,212},{100,249},{169,249},{238,249},{307,249},{376,249}}) do desk(p[1],p[2]) end
local clutter=layer(q,'clutter');
for _,p in ipairs({{105,177},{174,177},{243,177},{312,177},{381,177},{105,214},{174,214},{243,214},{312,214},{381,214},{105,251},{174,251},{243,251},{312,251},{381,251}}) do
 rect(clutter,p[1]+3,p[2]-2,10,2,'eee4c9'); rect(clutter,p[1]+4,p[2]-4,7,2,'f5ebd7')
 rect(clutter,p[1]+30,p[2]-1,5,3,'70665c'); rect(clutter,p[1]+34,p[2],2,2,'d8b79a')
end
for _,p in ipairs({{89,207},{158,244},{227,207},{296,244},{365,207},{434,244}}) do
 rect(clutter,p[1],p[2],8,13,'6e5b55'); rect(clutter,p[1]+1,p[2]+2,6,9,'9c7770'); rect(clutter,p[1]+2,p[2]-2,4,2,'6e5b55')
end
local h=layer(q,'details'); rect(h,102,29,53,74,'a27d66'); rect(h,106,33,45,66,'eee2c8'); rect(h,110,39,37,2,'bca68a'); rect(h,110,46,27,2,'bca68a'); rect(h,445,145,48,23,'926f59'); rect(h,448,148,42,18,'b89472')
q:saveAs(dir..'school_classroom.aseprite'); q:saveCopyAs(dir..'school_classroom.png'); q:close()
-- Ground-floor exterior. The central entrance leads to the corridor's left edge.
local e=Sprite(512,288,ColorMode.RGB); e.layers[1].name='school_facade'; local ew=e:newCel(e.layers[1],1).image
rect(ew,0,0,512,202,'d8cbb8'); rect(ew,0,0,512,18,'877a70'); rect(ew,0,18,512,4,'afa394')
for y=18,200,12 do rect(ew,0,y,512,1,'c2b6a7') end
for x=0,512,12 do rect(ew,x,18,1,182,'c2b6a7') end
-- Deep balcony fascia separates floors and casts a dark underside.
rect(ew,0,84,512,8,'726a64'); rect(ew,0,92,512,8,'a59a8d'); rect(ew,0,100,512,4,'e8dcc7'); rect(ew,0,184,512,11,'8e8072')
local ex=layer(e,'columns_windows');
for _,x in ipairs({35,121,319,405}) do
 rect(ex,x,28,62,51,'6c655f'); rect(ex,x+4,32,54,43,'a9c1c0'); rect(ex,x+29,32,3,43,'6c655f'); rect(ex,x+4,53,54,2,'6c655f');
 rect(ex,x,112,62,61,'6c655f'); rect(ex,x+4,116,54,53,'9fb8b9'); rect(ex,x+29,116,3,53,'6c655f'); rect(ex,x+4,143,54,2,'6c655f')
end
local rail=layer(e,'balcony_parapets');
-- Upper floor's broad, projecting opaque guardrail, broken by the red columns.
rect(rail,0,69,512,4,'766a61'); rect(rail,0,73,512,4,'ffffff'); rect(rail,0,77,512,23,'f1f2ed')
rect(rail,0,96,512,4,'9d8e7c');
for x=0,511,12 do rect(rail,x,78,1,18,'d8dad4') end
-- Lower floor parapet stops at the central entrance so the route reads clearly.
rect(rail,0,157,219,4,'796d62'); rect(rail,0,161,219,4,'ffffff'); rect(rail,0,165,219,20,'f1f2ed');
rect(rail,313,157,199,4,'796d62'); rect(rail,313,161,199,4,'ffffff'); rect(rail,313,165,199,20,'f1f2ed');
rect(rail,0,181,219,4,'9e8e7d'); rect(rail,313,181,199,4,'9e8e7d');
rect(ex,0,18,11,177,'8f5c52'); rect(ex,11,18,4,177,'ba8675'); rect(ex,493,18,15,177,'8f5c52');
rect(ex,231,107,70,78,'5b4f47'); rect(ex,236,111,60,74,'8c7965'); rect(ex,241,116,50,69,'3e3a37'); rect(ex,245,123,42,55,'b0bdb7'); rect(ex,265,123,3,55,'5d5c55'); rect(ex,245,147,42,3,'5d5c55')
local ground=layer(e,'courtyard'); rect(ground,0,195,512,93,'9d978d'); rect(ground,0,195,512,7,'7c776e'); for y=210,288,19 do rect(ground,0,y,512,1,'827e76') end; for x=12,512,48 do rect(ground,x,203,1,85,'8c877f') end
local detail=layer(e,'playground_details');
for _,x in ipairs({80,148,374,442}) do rect(detail,x,177,4,83,'328b70'); rect(detail,x-2,176,8,5,'4bb78a') end
rect(detail,82,181,68,3,'328b70'); rect(detail,376,181,68,3,'328b70'); for y=191,231,12 do rect(detail,82,y,68,2,'3da47b'); rect(detail,376,y,68,2,'3da47b') end
rect(detail,195,247,122,1,'ddd0b4'); rect(detail,214,265,84,1,'ddd0b4')
e:saveAs(dir..'school_exterior.aseprite'); e:saveCopyAs(dir..'school_exterior.png'); e:close()
print('saved school exterior, corridor, classroom')


