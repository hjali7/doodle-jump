// define general game var

const board = document.getElementById("board");
const context = board.getContext("2d");
board.height = 575;
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

// game rules 

let gameOver = false;

// game score

let score = 0 ;
let maxScore = 0;

// game physics

let velacityX = 0;
let velacityY = 0;
const initialVelacity = -8;
const gravity = 0.4;

// platforms

let platformArrays = [];
const platformWidth = 60;
const platformHeight = 20;
let platformImg = new Image();
platformImg.src = "./assets/platform.png"

window.onload = () => {    
    const doodlerRightImg = new Image();
    doodlerRightImg.src = "./assets/doodler-right.png";

    const doodlerLeftImg = new Image();
    doodlerLeftImg.src = "./assets/doodler-left.png";
    doodler.img = doodlerLeftImg;

    doodlerLeftImg.onload = () => context.drawImage(doodler.img , doodler.x , doodler.y , doodler.width , doodler.height);

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
        }else if(e.code == "Space" && gameOver) {
            gameOver = false;
            score = 0;
            maxScore = 0 ;
            velacityY = initialVelacity;
            velacityX = 0;
            doodler = {
              img: doodlerLeftImg,
              x: doodlerX,
              y: doodlerY,
              width: doodlerWidth,
              height: doodlerHeight,
            };
            DrawPlatforms();
        };
    });
};

function update () {
    requestAnimationFrame(update);

    if(gameOver) {
        return;
    };
    
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

        if(velacityY < 0 && doodler.y < board.height * 3 /4) {
            platform.y -= initialVelacity;
        };
        
        if(detectCollision(doodler , platform) && velacityY >= 0) velacityY = initialVelacity;
        context.drawImage(platform.img , platform.x , platform.y , platform.width , platform.height);
    };

    while (platformArrays.length > 0 && platformArrays[0].y >= board.height) {
        platformArrays.shift();
        DrawNewPlatforms();
    };

    updataScore();
    document.querySelector("p").innerHTML = `score : ${score}`;
    if(doodler.y > board.height) {
        gameOver = true;
        context.fillStyle= "#fff";
        context.font = "bold 17px sans-serif";
        context.fillText("press 'space' to restart game :) " , board.width/2 - doodlerWidth*3 , board.height*7/8);
    }
};

function updataScore () {
    let points = Math.floor(50 * Math.random());
    if(velacityY < 0) {
        maxScore += points;
        if(score < maxScore) {
            score = maxScore;
        };
    }else if(velacityY >= 0) {
        maxScore -= points;
    }
}

function DrawPlatforms () {
    platformArrays = [];

    let startPlatform = {
      img: platformImg,
      x: board.width / 2,
      y: board.height - 150,
      width: platformWidth,
      height: platformHeight,
    };

    platformArrays.push(startPlatform);
    
    for (let i = 0; i < 6; i++) {
        let randomX = Math.floor(Math.random() * board.width*3/4);
        let platform = {
            img : platformImg,
            x : randomX,
            y : board.height - 85*i - 150,
            width : platformWidth,
            height : platformHeight
        }
        platformArrays.push(platform);
    };
};

function DrawNewPlatforms () {
    let randomX = Math.floor((Math.random() * board.width * 3) / 4);
    let platform = {
        img: platformImg,
        x: randomX,
        y: -platformHeight,
        width: platformWidth,
        height: platformHeight,
    };
    platformArrays.push(platform);
}

function detectCollision (a , b) {
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
};

