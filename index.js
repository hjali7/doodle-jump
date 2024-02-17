// define var

const board = document.getElementById("board");
const context = board.getContext("2d");
board.height = 576;
board.width = 360;

// doodler var
const doodlerWidth = 40;
const doodlerHeight = 46;

let doodlerX = board.width / 2 - doodlerWidth / 2;
let doodlerY = board.height * 7 / 8 - doodlerHeight;

// doodler obj

let doodler = {
    img : null ,
    x : doodlerX ,
    y : doodlerY ,
    width : doodlerWidth ,
    height : doodlerHeight,
};

// game physics

let velacityX = 0;
let velacityY = 0;
const initialVelacity = -8;
const gravity = 0.4;

// platforms

let platformArrays = [];
const platformWidth = 60;
const platformHeight = 18;
let platformImg;

window.onload = () => {    
    const doodlerRightImg = new Image();
    doodlerRightImg.src = "./assets/doodler-right.png";

    const doodlerLeftImg = new Image();
    doodlerLeftImg.src = "./assets/doodler-left.png";
    doodler.img = doodlerLeftImg;

    doodlerLeftImg.onload = () => context.drawImage(doodler.img , doodler.x , doodler.y , doodler.width , doodler.height);

    platformImg = new Image();
    platformImg.src = "./assets/platform.png";
    velacityY = initialVelacity;
    DrawPlatforms();
    
    requestAnimationFrame(update);
  
    document.addEventListener("keydown", e => {
        if(e.code == "ArrowLeft" || e.code == "KeyA") {
            doodler.img = doodlerLeftImg;
            velacityX = -4;
        }else if( e.code == "ArrowRight" || e.code == "KeyD"){
            doodler.img = doodlerRightImg;
            velacityX = 4 ;
        }else if (e.code == "ArrowUp" || e.code == "KeyW") {
            velacityX = 0;
        };
    });
};

function update () {
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);
    
    doodler.x += velacityX;    
    if(doodler.x > board.width ) {
        doodler.x = 0 ;
    }else if (doodler.x + doodler.width < 0 ) {
        doodler.x = board.width ;
    };

    velacityY += gravity;
    doodler.y += velacityY;
    
    context.drawImage(doodler.img,doodler.x,doodler.y,doodler.width,doodler.height);

    for(let i = 0 ; i < platformArrays.length ; i++ ) {
        let platform = platformArrays[i];
        if(detectCollision(doodler , platform) && velacityY >= 0) velacityY = initialVelacity;
        context.drawImage(platform.img , platform.x , platform.y , platform.width , platform.height);
    };
};

function DrawPlatforms () {
    platformArrays = [];
    let startPlatform = {
        img : platformImg ,
        x : board.width /2 ,
        height : board.height - 50 ,
        width : platformWidth ,
        height : platformHeight,
    };

    platformArrays.push(startPlatform);
    
    for (let i = 0; i < 6; i++) {
        let randomX = Math.floor(Math.random() * board.width*3/4);
        let platform = {
            img : platformImg,
            x : randomX,
            y : board.height - 75*i - 150,
            width : platformWidth,
            height : platformHeight
        }
        platformArrays.push(platform);
    };
};

function detectCollision (a , b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
};