title = "DVD";

description = `[press] to the beat`;

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
   WIDTH: 200,
   HEIGHT: 150, 
   BPM: 76.555, //BPM of song - change as necessasary
   BPS: 76.555/60,
   BPT: (76.555/60)/60,
   BOUNDS_RIGHT:200-11,
   BOUNDS_LEFT:10,
   BOUNDS_TOP:6,
   BOUNDS_BOT:150-5,
   LASTCOLOR:0
};

dvdLogo = {
    pos: vec(G.WIDTH/2,G.HEIGHT/2),
    vel: vec(1/2, sqrt(3)/2),
    speed: 1,
    aPos: vec(-7,-3),
    bPos: vec(-1,-3),
    cPos: vec(5,-3),
    dPos: vec(9,-3),
    ePos: vec(-7,2),
    fPos: vec(-1,2),
    gPos: vec(5,2),
    hPos: vec(9,2),
    render: function render(){
        char('a',dvdLogo.pos.x+dvdLogo.aPos.x,dvdLogo.pos.y+dvdLogo.aPos.y);
        char('b',dvdLogo.pos.x+dvdLogo.bPos.x,dvdLogo.pos.y+dvdLogo.bPos.y);
        char('c',dvdLogo.pos.x+dvdLogo.cPos.x,dvdLogo.pos.y+dvdLogo.cPos.y);
        char('d',dvdLogo.pos.x+dvdLogo.dPos.x,dvdLogo.pos.y+dvdLogo.dPos.y);
        char('e',dvdLogo.pos.x+dvdLogo.ePos.x,dvdLogo.pos.y+dvdLogo.ePos.y);
        char('f',dvdLogo.pos.x+dvdLogo.fPos.x,dvdLogo.pos.y+dvdLogo.fPos.y);
        char('g',dvdLogo.pos.x+dvdLogo.gPos.x,dvdLogo.pos.y+dvdLogo.gPos.y);
        char('h',dvdLogo.pos.x+dvdLogo.hPos.x,dvdLogo.pos.y+dvdLogo.hPos.y);
    },
}

//calculates the distance to the next bounce
function calcDist(G,D){
    //figure out which side the next bounce will be on
    right = false
    topint = false
    bot = false
    left = false
    if(D.vel.x > 0 ){//is it possible to hit right
        if(D.vel.y < 0){//is it possible to hit top
            r = (G.BOUNDS_RIGHT-D.pos.x)/D.vel.x
            t = (G.BOUNDS_TOP-D.pos.y)/D.vel.y
            if(r<t){right = true}else{topint = true}
        }else{//is it possible to hit bot
            r = (G.BOUNDS_RIGHT-D.pos.x)/D.vel.x
            b = (G.BOUNDS_BOT-D.pos.y)/D.vel.y
            if(r<b){right = true}else{bot=true}
        }
    }else{ //is it possible to hit left
        if(D.vel.y < 0){//is it possible to hit top
            l = (G.BOUNDS_LEFT-D.pos.x)/D.vel.x
            t = (G.BOUNDS_TOP-D.pos.y)/D.vel.y
            if(l<t){left = true}else{topint=true}
        }else{//is it possible to hit bot
            l = (G.BOUNDS_LEFT-D.pos.x)/D.vel.x
            b = (G.BOUNDS_BOT-D.pos.y)/D.vel.y
            if(l<b){left = true}else{bot=true}
        }
    }
    if(topint){return abs((G.BOUNDS_TOP-D.pos.y)/D.vel.y)}
    if(bot){return abs((G.BOUNDS_BOT-D.pos.y)/D.vel.y)}
    if(left){return abs((G.BOUNDS_LEFT-D.pos.x)/D.vel.x)}
    if(right){return abs((G.BOUNDS_RIGHT-D.pos.x)/D.vel.x)}
}
//changes to a random color, use to switch colors
function randColor() {
    switch(floor(rnd(6))){
        case 0:
            if(G.LASTCOLOR ==0){
                color('blue');
                G.LASTCOLOR = 1;
            }
            else{
                color('black')
                G.LASTCOLOR = 0
            }
            break
        case 1:
            if(G.LASTCOLOR == 1){
                color('green');
                G.LASTCOLOR = 2;
            }
            else{
                color('blue')
                G.LASTCOLOR = 1;
            }
            break
        case 2:
            if(G.LASTCOLOR == 2){
                color('cyan');
                G.LASTCOLOR = 3;
            }
            else{
                color('green')
                G.LASTCOLOR = 2;
            }
            break
        case 3:
            if(G.LASTCOLOR == 3){
                color('purple');
                G.LASTCOLOR = 4;
            }
            else{
                color('cyan')
                G.LASTCOLOR = 3;
            }
            break
        case 4:
            if(G.LASTCOLOR == 4){
                color('red');
                G.LASTCOLOR = 5;
            }
            else{
                color('purple')
                G.LASTCOLOR = 4;
            }
            break
        case 5:
            if(G.LASTCOLOR == 5){
                color('black');
                G.LASTCOLOR = 0;
            }
            else{
                color('red')
                G.LASTCOLOR = 5;
            }
            break
    }
}

options = {
    viewSize: {x: G.WIDTH, y:G.HEIGHT},
    theme: 'crt'
};
var audio = new Audio('music.mp3');

function update() {
    if (!ticks) {
        //play music at start of game
        audio.play();
    }
    // end the game if music is finished
    if(audio.paused){
        end();
    }
    
    //update logo position, and reflect if necessasary
    dvdLogo.pos.x += dvdLogo.vel.x*dvdLogo.speed;
    dvdLogo.pos.y += dvdLogo.vel.y*dvdLogo.speed;
    //bounce off the top or the bottom
    if(dvdLogo.pos.y > G.BOUNDS_BOT || dvdLogo.pos.y < G.BOUNDS_TOP){
        particle(dvdLogo.pos.x, dvdLogo.pos.y, 40, 3, 90); //sparkles
        randColor(); //change color
        dvdLogo.vel.y *= -1; //actual bounce
        dvdLogo.speed = calcDist(G,dvdLogo)*G.BPT; //calculate new speed
    //bounce off the left or the right
    }else if(dvdLogo.pos.x > G.BOUNDS_RIGHT|| dvdLogo.pos.x < G.BOUNDS_LEFT){
        particle(dvdLogo.pos.x, dvdLogo.pos.y, 40, 3, 90); //sparkles
        randColor(); //change color
        dvdLogo.vel.x *= -1; //actual bounce
        dvdLogo.speed = calcDist(G,dvdLogo)*G.BPT; //calculate new speed
    }
    dvdLogo.pos.clamp(G.BOUNDS_LEFT,G.BOUNDS_RIGHT,G.BOUNDS_TOP,G.BOUNDS_BOT);

        //render logo 
        dvdLogo.render();
}

addEventListener("load", onLoad);