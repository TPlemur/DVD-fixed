title = "DVD";

description = ``;

characters = [
`
      
   lll
 lllll
 l    
ll lll
ll lll
`,
`
 lllll
llllll
llllll
ll lll
 l lll
 l lll
`,
`
ll    
llllll
llllll
 l    
 l lll
 l lll
`,
`
   
   
ll 
ll 
 ll
 ll
`,
`
ll lll
 l
 lllll
   lll
      
`,
`
 ll l 
llll l
llllll
llllll
 lllll
`,
`
ll lll
ll    
llllll
llllll
ll    
`,
`
 ll
ll 
ll 
   
   
`
];

const G ={
   WIDTH: 150,
   HEIGHT: 150, 
   BPM: 80 //BPM of song - change as necessasary
};

dvdLogo = {
    pos: vec(G.WIDTH/2,G.HEIGHT/2),
    aPos: vec(-7,-3),
    bPos: vec(-1,-3),
    cPos: vec(5,-3),
    dPos: vec(9,-3),
    ePos: vec(-7,2),
    fPos: vec(-1,2),
    gPos: vec(5,2),
    hPos: vec(9,2)
}

//changes to a random color, use to switch colors
function randColor() {
    switch(floor(rnd(6))){
        case 0:
            color('black')
            break
        case 1:
            color('blue')
            break
        case 2:
            color('green')
            break
        case 3:
            color('cyan')
            break
        case 4:
            color('purple')
            break
        case 5:
            color('red')
            break
    }
}

options = {
    viewSize: {x: G.WIDTH, y:G.HEIGHT},
};

function update() {
    if (!ticks) {
    }
    
    randColor();
    //render logo based based on dvdLogo.pos
    char('a',dvdLogo.pos.x+dvdLogo.aPos.x,dvdLogo.pos.y+dvdLogo.aPos.y);
    char('b',dvdLogo.pos.x+dvdLogo.bPos.x,dvdLogo.pos.y+dvdLogo.bPos.y);
    char('c',dvdLogo.pos.x+dvdLogo.cPos.x,dvdLogo.pos.y+dvdLogo.cPos.y);
    char('d',dvdLogo.pos.x+dvdLogo.dPos.x,dvdLogo.pos.y+dvdLogo.dPos.y);
    char('e',dvdLogo.pos.x+dvdLogo.ePos.x,dvdLogo.pos.y+dvdLogo.ePos.y);
    char('f',dvdLogo.pos.x+dvdLogo.fPos.x,dvdLogo.pos.y+dvdLogo.fPos.y);
    char('g',dvdLogo.pos.x+dvdLogo.gPos.x,dvdLogo.pos.y+dvdLogo.gPos.y);
    char('h',dvdLogo.pos.x+dvdLogo.hPos.x,dvdLogo.pos.y+dvdLogo.hPos.y);
}

addEventListener("load", onLoad);