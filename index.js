// define var

const board = document.getElementById("board");
const context = board.getContext("2d");

// doodler var

const doodlerWidth = 46;
const doodlerHeight = 46;
const doodlerX = board.width /2 - doodlerWidth / 2;
const doodlerY = board.height / 2 - doodlerHeight /2 ;

window.onload = () => {
    const boardHeight = board.height = window.innerHeight;
    const boardWidth  = board.width = window.innerWidth;
    console.log( board.width , window.innerWidth)
};