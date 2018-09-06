let height = 800;
let width = 1000;
let currentGen;
let nextGen;
let size = 5;
let cols = Math.floor(width / size);
let rows = Math.floor(height / size);
let generationSpeed;
let cMode = false;
let check;
let span;


function setup(){
  //Create Javascript Canvas
  createCanvas(width + 1, height + 1);
  //create 2dArray for copying;
  nextGen = create2dArray(cols,rows);
  //create initial generation in 2d Array
  currentGen = populate2dArray(cols,rows);
  //Create Slider to change speed of generations
  generationSpeed = createSlider(2,45,2);
  generationSpeed.position(20, height + 10)
  //Create checkbox for coloured mode
  check = createCheckbox("Coloured",false);
  check.changed(cEvent);
  check.position(width -75, height + 10)
  check.class('tooltip');
  span = createSpan("Blue represents too few neighbours \
                     Red represents too many neighbours \
                     Green represents optimal number of neighbours");
  span.class("tooltiptext");
  span.parent(check);
}

function draw(){
  background(255);
  //Draw cells current generation
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      //count neighbouring cells that are alive
      let neighbours = countNeighbours(i,j);
      //Set cells current neighbours
      currentGen[i][j].setNeighbours(neighbours);
      if(!currentGen[i][j].life){
        //if false, cell is dead coloured white
        noFill();
        noStroke();
        rect(i * size, j * size, size, size);
      }else{
        //if true, cell is alive coloured black or colour depending on colourmode selected
        let col = currentGen[i][j].setColor();
        if(!cMode) {fill(0);} else {fill(col[0],col[1],col[2]);}
        rect(i * size, j * size, size, size);
      }
    }
  }

//Calculate next generation
if(frameCount%generationSpeed.value() == 0){
  //Compute next generation
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      //Decide whether cell dies or reproduces for the next generation
      nextGen[i][j].life = fate(currentGen[i][j].life, currentGen[i][j].neighbours);
      }
    }
  currentGen = nextGen;
  nextGen = create2dArray(cols,rows);
}
}




//Create 2 Dimensional Array and initialize values to true or false
function create2dArray(cols, rows){
  let arr =[];
  for(let i = 0; i < cols; i++){
    arr[i] = [];
    for(let j = 0; j < rows; j++){
      arr[i][j] = new Cell(false, i,j);
    }
  }
  return arr;
}

function populate2dArray(cols, rows){
  let arr =[];
  for(let i = 0; i < cols; i++){
    arr[i] = [];
    for(let j = 0; j < rows; j++){
      let num = Math.random();
      if(num > 0.75){
        arr[i][j] = new Cell(true,i,j);
      }else{
        arr[i][j] = new Cell(false,i,j);
      }
    }
  }
  return arr;
}

//count the number of alive neighbours of each cell
function countNeighbours(x,y){
  let num = 0;
  for(let i = -1; i <= 1; i++){
    for(let j = -1; j <= 1; j++){
      if((i != 0 || j != 0) && x + i >= 0  && x + i < currentGen.length && y + j >= 0  && y + j < currentGen[0].length  ){
        if(currentGen[x + i][y + j].life){
          num++;
        }
      }
    }
  }

  return num;
}

//decide status of cell for the next generation
function fate(alive, num){
  if(alive){
    if(num > 3 || num < 2 ){
      return false;
    }else{
      return true;
    }
  }else{
    if(num == 3){
      return true;
    }else{
      return false;
    }
  }
}

function cEvent(){
  if(this.checked()){
    cMode = true;
  }else{
    cMode = false;
  }
}














































//
