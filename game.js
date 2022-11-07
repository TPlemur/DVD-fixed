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
   BPM: 120, //BPM of song - change as necessasary
   BPS: 0,
   BPT: 0, //Beats per tick - actualy useful for distance calculation
   TPB: 0,
   MILISPERBEAT: 0, //number of miliseconds between ticks
   //offsets so that sprite bouces at edge of screen
   BOUNDS_RIGHT:200-11,
   BOUNDS_LEFT:10,
   BOUNDS_TOP:6,
   BOUNDS_BOT:150-5,
   LASTCOLOR:0, //ensures no color duplication
   TIMERWIDTH: 80, //the number of miliseconds on either side of a bounce that are valid for scoring
   TIMER: 0,
   LAST_CLOCK: 0, //used for getting the system clock
   DELTA_TIME: 0  //time between ticks
};
G.BPS = G.BPM/60;
G.BPT = G.BPS/60;
G.TPB = 1/G.BPT;
G.MILISPERBEAT = 60000/G.BPM;

dvdLogo = {
    pos: vec(G.WIDTH/2,G.HEIGHT/2), //location of center of sprite
    vel: vec(1/2, sqrt(3)/2),       //direction of movement
    normVel: vec(0,0),
    dist: 1,                       //distace travled per tick
    nextBounce: "foo",
    //offsets for the sprites
    aPos: vec(-7,-3),
    bPos: vec(-1,-3),
    cPos: vec(5,-3),
    dPos: vec(9,-3),
    ePos: vec(-7,2),
    fPos: vec(-1,2),
    gPos: vec(5,2),
    hPos: vec(9,2),
    //renders all sprites with appropreate offsets
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
dvdLogo.normVel.x = dvdLogo.vel.x/(sqrt(dvdLogo.vel.x**2+dvdLogo.vel.y**2));
dvdLogo.normVel.y = dvdLogo.vel.y/(sqrt(dvdLogo.vel.x**2+dvdLogo.vel.y**2));

//calculates the distance to the next bounce
function calcDist(G,D){
    //figure out which side the next bounce will be on
    right = false
    topint = false
    bot = false
    left = false
    if(D.normVel.x > 0 ){//is it possible to hit right
        if(D.normVel.y < 0){//is it possible to hit top
            r = (G.BOUNDS_RIGHT-D.pos.x)/D.normVel.x
            t = (G.BOUNDS_TOP-D.pos.y)/D.normVel.y
            if(r<t){right = true}else{topint = true}
        }else{//is it possible to hit bot
            r = (G.BOUNDS_RIGHT-D.pos.x)/D.normVel.x
            b = (G.BOUNDS_BOT-D.pos.y)/D.normVel.y
            if(r<b){right = true}else{bot=true}
        }
    }else{ //is it possible to hit left
        if(D.normVel.y < 0){//is it possible to hit top
            l = (G.BOUNDS_LEFT-D.pos.x)/D.normVel.x
            t = (G.BOUNDS_TOP-D.pos.y)/D.normVel.y
            if(l<t){left = true}else{topint=true}
        }else{//is it possible to hit bot
            l = (G.BOUNDS_LEFT-D.pos.x)/D.normVel.x
            b = (G.BOUNDS_BOT-D.pos.y)/D.normVel.y
            if(l<b){left = true}else{bot=true}
        }
    }
    //find dist by similar triangles
    if(topint){D.nextBounce = "t";return abs((G.BOUNDS_TOP-D.pos.y)/D.normVel.y)}
    if(bot){D.nextBounce = "b";return abs((G.BOUNDS_BOT-D.pos.y)/D.normVel.y)}
    if(left){D.nextBounce = "l";return abs((G.BOUNDS_LEFT-D.pos.x)/D.normVel.x)}
    if(right){D.nextBounce = "r";return abs((G.BOUNDS_RIGHT-D.pos.x)/D.normVel.x)}
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

//upload music file
var audio = new Audio('Disco Dance.mp3'); //'Disco Dance.mp3'

function update() {
    if (!ticks) {
        //play music at start of game
        audio.play();//reset everything
        dvdLogo.pos.x = G.WIDTH/2;
        dvdLogo.pos.y = G.HEIGHT/2;
        dvdLogo.vel = vec(1/2, sqrt(3)/2);
        dvdLogo.dist = calcDist(G,dvdLogo);
        G.TIMER = 0;
        G.LAST_CLOCK = Date.now();
    }
    //get time between ticks
    G.DELTA_TIME = Date.now() - G.LAST_CLOCK;
    G.LAST_CLOCK = Date.now();
    // end the game if music is finished
    if(audio.paused){
        end();
    }
    G.TIMER +=G.DELTA_TIME;

    netSpeed = dvdLogo.dist/G.MILISPERBEAT;
    //update logo position
    dvdLogo.pos.x += dvdLogo.normVel.x*netSpeed*G.DELTA_TIME;
    dvdLogo.pos.y += dvdLogo.normVel.y*netSpeed*G.DELTA_TIME;


    //check for input on beat
    if(input.isJustPressed){
        //check for within timerBuffer
        if(G.TIMER < G.TIMERWIDTH || G.TIMER > (G.MILISPERBEAT - G.TIMERWIDTH)){
            play("coin");
            addScore(10);
        }
        else{
            addScore(-1);
        }
    }

    //Maintains perfect sync with TPB
    if(G.TIMER >= G.MILISPERBEAT){ //detect if time/beat has been reached
        //detect if logo is out of bounds
        //bounce off the top or the bottom
        if(dvdLogo.nextBounce == "t"|| dvdLogo.nextBounce == "b"){
            particle(dvdLogo.pos.x, dvdLogo.pos.y, 40, 3, 90);  //sparkles
            randColor();                                        //change color
            dvdLogo.normVel.y *= -1;                            //actual bounce
            dvdLogo.dist = calcDist(G,dvdLogo);                 //calculate new distance
            G.TIMER -= 500;                                     //reset timer, but accounting for slop

        //bounce off the left or the right
        }else{
            particle(dvdLogo.pos.x, dvdLogo.pos.y, 40, 3, 90);  //sparkles
            randColor();                                        //change color
            dvdLogo.normVel.x *= -1;                            //actual bounce
            dvdLogo.dist = calcDist(G,dvdLogo);                 //calculate new speed
            G.TIMER -= 500;                                     //reset timer, but accounting for slop

        }
    }

    //ensure logo is never out of bounds at the end of a tick
    dvdLogo.pos.clamp(G.BOUNDS_LEFT,G.BOUNDS_RIGHT,G.BOUNDS_TOP,G.BOUNDS_BOT);

    //render logo 
    dvdLogo.render();
}

addEventListener("load", onLoad);