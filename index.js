// define var

const board = document.getElementById("board");
const context = board.getContext("2d");

// doodler var
const doodlerWidth = 46;
const doodlerHeight = 46;
let doodlerX = board.width * 2 + doodlerWidth /3 ;
let doodlerY = board.height * 3;

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
let gamePuase = false;

window.onload = () => {    
    const boardHeight = board.height = window.innerHeight;
    const boardWidth  = board.width = window.innerWidth;

    const doodlerRightImg = new Image();
    doodlerRightImg.src = "./assets/doodler-right.png";

    const doodlerLeftImg = new Image();
    doodlerLeftImg.src = "./assets/doodler-left.png";
    doodler.img = doodlerLeftImg;

    doodlerLeftImg.onload = () => context.drawImage(doodler.img , doodler.x , doodler.y , doodler.width , doodler.height);
    
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
        }
    });
};

function update () {
        requestAnimationFrame(update);
        context.clearRect(0, 0, board.width, board.height);
        doodler.x += velacityX;
        context.drawImage(
          doodler.img,
          doodler.x,
          doodler.y,
          doodler.width,
          doodler.height
        );
};
