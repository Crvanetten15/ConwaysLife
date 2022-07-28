//console.log("Connection Established");

//adding canvas to JS
var canvas = document.getElementById("gameCanvas");
var c = canvas.getContext("2d");

//Variables needed to run code
let density = 10;
let cols = 80;
let rows = 80;
let grid = make2DArray(cols, rows);
let prev_grid;

//creates a 2d Array
function make2DArray(cols, rows){
    let arr = new Array(cols);
    for (let j = 0; j < arr.length; j++){
        arr[j] = new Array(rows);
    }
    return arr;
}

//initial setup for the array numbers
function setupStart(){
    //TODO; currently only filling 1 section to check
    for(let i = 0; i < grid.length; i++) { // cols -1
        for (let j = 0; j < grid.length; j++) {
            if (i < 10 || j < 10 || i > 70 || j > 70 ){
                grid[i][j] = 0;
            }else {
            let thirty = Math.floor(Math.random() * 10);
            if (thirty > 3) {
                grid[i][j] = 0;
            }
            else {
                grid[i][j] = Math.floor(Math.random() * 2);
            }}
             // change this to fix
        }
    }
    prev_grid = grid;
}

function drawBoard(){
    for(let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            if (grid [i][j] === 1){
                drawBoxes(i,j, 1);
            }
            if (grid [i][j] === 0){
                drawBoxes(i,j, 0);
            }
        }
    }
}

function checkNeighbors(x, y){
    let state = 0;
    for(let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (prev_grid[(x + i + cols) % cols ][(y + j + rows) % rows ] === 1){
                state += 1;
            }
        }
    }
    if(prev_grid[x][y] === 1){
        state -= 1;
    }
    return state;
}

function run(){
    for(let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            let current = checkNeighbors(i,j);
            if(current < 2 && (grid[i][j] === 1)){
                grid[i][j] = 0;
            }
            else if (current > 3 && (grid[i][j] === 1)){
                grid[i][j] = 0;
            }
            else if (current === 3 && (grid[i][j] === 0)){
                grid[i][j] = 1;
            }

        }
    }
}


//Function to draw boxes
function drawBoxes(x, y, v){
    if (v == 0){
        c.beginPath();
        c.fillStyle = "white";
        c.rect(x * density, y* density, density, density);
        c.fill();
        c.closePath();
    }
    else if(v == 1){
        c.beginPath();
        c.fillStyle = "black";
        c.rect(x * density, y*density, density, density);
        c.fill();
        c.closePath();
    }

}

function Start(){
    setupStart();
    drawBoard();
}

function RecursivePageUpdate(){
        run();
        drawBoard();
        prev_grid = grid;
}


//- - - - - - - - - - - - - Method Calls to Perform Printing - - - - - - - - - - -
//Where we actually call the page to load
Start();

//Where we call the update
window.setInterval(RecursivePageUpdate, 500);

//Clear interval to stop if wanted










