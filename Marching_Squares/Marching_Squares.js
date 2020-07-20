var columns;
var rows;
var field = [];

// Set the resolution (the lower, the more lines)
var resolution = 5;
// Set the frequency of the lines (the bigger, the more frequent)
var increment = 0.05;
// Set the generation method (0 - random, 1 - perlin noise)
var generation = 1;

function setup() 
{
  createCanvas(500, 500);
  frameRate(5);
  
  // Set the number of columns and rows
  columns = 1 + width / resolution;
  rows = 1 + height / resolution;
  
  // Initialize an empty array
  for (let i = 0; i < columns; i++)
  {
    field[i] = [];
  }
}

function draw() 
{
  background(0);
  
  // Choose which corners are white and which are black
  switch (generation)
  {
    case 0:
      for (let i = 0; i < rows; i++)
      {
        for (let j = 0; j < columns; j++)
        {
          field[i][j] = int(random(2));
        }
      }
      break;
    case 1:
      let x_off = 0.0;
      for (let i = 0; i < rows; i++)
      {
        x_off += increment;
        let y_off = 0.0;
        for (let j = 0; j < columns; j++)
        {
          field[i][j] = round(noise(x_off, y_off));
          y_off += increment;
        }
      }
    break;
  }
  
  // Draw the dividing lines
  for (let i = 0; i < rows - 1; i++)
  {
    for (let j = 0; j < columns - 1; j++)
    {
      // Set x & y of each point
      let x = i * resolution;
      let y = j * resolution;
      
      // Calculate the middle point of each vertex of each square
      let a = createVector(x + resolution * 0.5, y);
      let b = createVector(x + resolution, y + resolution * 0.5);
      let c = createVector(x + resolution * 0.5, y + resolution);
      let d = createVector(x, y + resolution * 0.5);
      
      // Determine in which case the square is
      let square_case = binaryToDecimal(field[i][j], field[i + 1][j], field[i + 1][j + 1], field[i][j + 1]);
      
      stroke(255);
      strokeWeight(2);
      
      // Draw line accordingly
      switch(square_case)
      {
        case 0:
          break;
        case 1:
          line(c.x, c.y, d.x, d.y);
          break;
        case 2:
          line(b.x, b.y, c.x, c.y);
          break;
        case 3:
          line(b.x, b.y, d.x, d.y);
          break;
        case 4:
          line(a.x, a.y, b.x, b.y);
          break;
        case 5:
          line(a.x, a.y, d.x, d.y);
          line(b.x, b.y, c.x, c.y);
          break;
        case 6:
          line(a.x, a.y, c.x, c.y);
          break;
        case 7:
          line(a.x, a.y, d.x, d.y);
          break;
        case 8:
          line(a.x, a.y, d.x, d.y);
          break;
        case 9:
          line(a.x, a.y, c.x, c.y);
          break;
        case 10:
          line(a.x, a.y, b.x, b.y);
          line(c.x, c.y, d.x, d.y);
          break;
        case 11:
          line(a.x, a.y, b.x, b.y);
          break;
        case 12:
          line(b.x, b.y, d.x, d.y);
          break;
        case 13:
          line(b.x, b.y, c.x, c.y);
          break;
        case 14:
          line(c.x, c.y, d.x, d.y);
          break;
        case 15:
          break;
        default:
          break;
      }
    }
  }
}

// Function to convert a 4 digit binary number to a decimal number
function binaryToDecimal(i1, i2, i3, i4)
{
  return i1 * 8 + i2 * 4 + i3 * 2 + i4;
}
