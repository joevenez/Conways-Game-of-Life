class Cell{



  constructor(life,x,y){
    this.life = life;
    this.x = x;
    this.y = y;
    this.neighbours = 5;
  }

  //Set Neighbours for cells
  setNeighbours(num){
    this.neighbours = num;
  }

  //Determine and set colors for cells
  setColor(){
    if(this.neighbours < 2){
      return Cell.colours[0];
    }else if(this.neighbours > 3){
      return Cell.colours[2];
    }else{
      return Cell.colours[1];
    }
  }

}

//Colours for representing number of neighbours
/*
< 2 neighbours = Blue;
2 or 3 Neighbours = Green;
> 3 Neighbours = Red;
*/
Cell.colours = [[0,0,255],[0,255,0],[255,0,0]];
