var resolution = 20;
var columns;
var rows;
var field = [];

function setup() 
{
  createCanvas(500, 500);
  
  columns = 1 + width / resolution;
  rows = 1 + height / resolution;
  for (let i = 0; i < columns; i++)
  {
    field[i] = [];
  }
  
  for (let i = 0; i < rows; i++)
  {
    for (let j = 0; j < columns; j++)
    {
      field[i][j] = int(random(2));
    }
  }
}

function draw() 
{
  background(127);
  
  for (let i = 0; i < rows; i++)
  {
    for (let j = 0; j < columns; j++)
    {
      stroke(field[i][j] * 255);
      strokeWeight(resolution * 0.5);
      point(i * resolution, j * resolution);
    }
  }
  
  for (let i = 0; i < rows - 1; i++)
  {
    for (let j = 0; j < columns - 1; j++)
    {
      let x = i * resolution;
      let y = j * resolution;
      
      let a = createVector(x + resolution * 0.5, y);
      let b = createVector(x + resolution, y + resolution * 0.5);
      let c = createVector(x + resolution * 0.5, y + resolution);
      let d = createVector(x, y + resolution * 0.5);
      
      stroke(255);
      strokeWeight(2);
      line(a.x, a.y, d.x, d.y);
    }
  }
}
