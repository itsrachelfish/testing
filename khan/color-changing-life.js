/////////////////////////////////////////
// Fun facts!!
// This is Conway's game of life.
// For more information, check out the wikipedia page:
//   http://en.wikipedia.org/wiki/Conway's_Game_of_Life

////////////////////////////////////////
// Want to draw something?
// Press SPACE to pause~
// Press D to delete the entire grid!
// Press G to spawn a glider!
// Press B to spawn a blinker!
// Press P to spawn a pulsar!
// Press SHIFT for super blinky mode!
// Press CAPSLOCK for super pulsar mode!!

// Tip!
// Clicking active cells deletes them.
////////////////////////////////////////

// Grid color
stroke(242, 242, 242);

// Global variables for various game states
var paused = false;
var superBlink = false;
var superPulse = false;
var DEATH = false;

// how many loop ticks before drawing again
var drawDelay = 1;

// here's an array of the colors to fade
var colors = [
            // Red
            {'color': [255, 24, 24],
             'speed': 14},
             
            // Orange
            {'color': [255, 150, 24],
             'speed': 12},
            
            // Yellow
            {'color': [255, 255, 24],
             'speed': 10},
            
            // Green
            {'color': [24, 255, 24],
             'speed': 8},
            
            // Blue
            {'color': [24, 24, 255],
             'speed': 6},
            
             // Indigo
            {'color': [72, 24, 150],
             'speed': 4},
            
            // Violet
            {'color': [150, 24, 124],
             'speed': 2}            
            ];

// size of the grid
var gridLength = 44;
var squareSize = 400 / gridLength;


// initialize a 2D array of cells
// and their color!
var cells = [];
var cellColor = [];

for (var x = 0; x < gridLength; x += 1) {
    cells[x] = [];
    cellColor[x] = [];
    
    for (var y = 0; y < gridLength; y += 1) {
        cells[x][y] = 0;
        cellColor[x][y] = 0;
    }
}

// initialize a 2D array of cells for the next generation
var nextGen = [];
for (var x = 0; x < gridLength; x += 1) {
    nextGen[x] = [];
    for (var y = 0; y < gridLength; y += 1) {
        nextGen[x][y] = 0;
    }
}

// initialize a "glider". Try picking different cells
// and see what happens!
cells[10][10] = 1;
cells[11][10] = 1;
cells[9][10] = 1;
cells[11][9] = 1;
cells[10][8] = 1;

// initialize a blob!
cells[30][30] = 1;
cells[30][31] = 1;
cells[31][30] = 1;
cells[32][32] = 1;
cells[33][32] = 1;
cells[34][32] = 1;

var spawnGlider = function() {
    cells[10][10] = 1;
    cells[11][10] = 1;
    cells[9][10] = 1;
    cells[11][9] = 1;
    cells[10][8] = 1;    
};

var spawnBlinker = function() {
    cells[25][24] = 1;
    cells[25][25] = 1;
    cells[25][26] = 1;

};

var spawnPulsar = function() {
    // Top left, outer
    cells[29][32] = 1;
    cells[29][31] = 1;
    cells[29][30] = 1;
    cells[33][28] = 1;
    cells[32][28] = 1;
    cells[31][28] = 1;
    
    // Top left, inner
    cells[34][32] = 1;
    cells[34][31] = 1;
    cells[34][30] = 1;
    cells[33][33] = 1;
    cells[32][33] = 1;
    cells[31][33] = 1;
    
    // Top right, outer
    cells[41][32] = 1;
    cells[41][31] = 1;
    cells[41][30] = 1;
    cells[37][28] = 1;
    cells[38][28] = 1;
    cells[39][28] = 1;
    
    // Top right, inner
    cells[36][32] = 1;
    cells[36][31] = 1;
    cells[36][30] = 1;
    cells[37][33] = 1;
    cells[38][33] = 1;
    cells[39][33] = 1;
    
    // Bottom left, outer
    cells[29][36] = 1;
    cells[29][37] = 1;
    cells[29][38] = 1;
    cells[33][40] = 1;
    cells[32][40] = 1;
    cells[31][40] = 1;

    // Bottom left, inner
    cells[34][36] = 1;
    cells[34][37] = 1;
    cells[34][38] = 1;
    cells[33][35] = 1;
    cells[32][35] = 1;
    cells[31][35] = 1;
    
    // Bottom right, outer
    cells[41][36] = 1;
    cells[41][37] = 1;
    cells[41][38] = 1;
    cells[37][40] = 1;
    cells[38][40] = 1;
    cells[39][40] = 1;
    
    // Bottom right, inner
    cells[36][36] = 1;
    cells[36][37] = 1;
    cells[36][38] = 1;
    cells[37][35] = 1;
    cells[38][35] = 1;
    cells[39][35] = 1;
};

// this function determines whether or not a cell lives on
// to the next generation
var livesOn = function (x, y) {
    // first count the number of live neighbors
    var numNeighbors = 0;
    for (var i = -1; i <= 1; i +=1 ) {
        for (var j = -1; j <= 1; j += 1) {
            var neighborX = (x + i + gridLength) % gridLength;
            var neighborY = (y + j + gridLength) % gridLength;
            
            if (neighborX !== x || neighborY !== y) {
                if (cells[neighborX][neighborY] === 1) {
                    numNeighbors += 1;
                }
            }
            
        }
    }
    // if the cell is living and has 2 or 3 live neighbors...
    if (cells[x][y] === 1 &&
            (numNeighbors === 2 || numNeighbors === 3)) {
        return true;
    }
    // if the cell is dead and has exactly 3 neighbors...
    if (cells[x][y] === 0 && numNeighbors === 3) {
        return true;
    }
    // otherwise it's either overpopulated or underpopulated
    // and the cell is dead
    return false;
};

// This function increases or decreases numberFrom
// towards numberTo, at a rate of numberChange
// (For fading colors)
var normalize = function(numberFrom, numberTo, numberChange)
{
    var numberDifference = abs(numberTo - numberFrom);
    var newNumber;
    
    // Make sure you don't go past the numberTo!
    if(numberDifference < numberChange)
    {
        numberChange = numberDifference;
    }
    
    // Is number from smaller?
    if(numberFrom < numberTo)
    {
        // Make it bigger!
        newNumber = numberFrom + numberChange;
    }
    // Is number from bigger?
    else if(numberFrom > numberTo)
    {
        // Make it smaller!
        newNumber = numberFrom - numberChange;
    }
    // Oh hey, it's the same!
    else
    {
        newNumber = numberFrom;
    }
    
    return newNumber;
};

// This functon accepts an object containing:
// .step, an integer
//  -- The current fade step (what color this cell started as)
// .color, an array
//  -- The current color of this cell

// This function returns the same object,
// where the value of .color is faded and
// the value of .step is increased
// after the color fade has completed
var fadeColor = function(fade) {
    // Has this cell begun to fade yet?
    if(fade)
    {
        // If there is another color to fade into...
        if(colors[fade.step + 1])
        {
            // Normalize the current color,
            // With the color of the next fade step
            // At the speed defined in the object
            var red = normalize(fade.color[0],
                                colors[fade.step + 1].color[0],
                                colors[fade.step].speed);
                                
            var green = normalize(fade.color[1],
                                colors[fade.step + 1].color[1],
                                colors[fade.step].speed);

            var blue = normalize(fade.color[2],
                                colors[fade.step + 1].color[2],
                                colors[fade.step].speed);
            
            // If the colors haven't changed,
            // we're ready for the next step!
            if(fade.color[0] === red &&
                 fade.color[1] === green &&
                 fade.color[2] === blue)
            {
                fade.step++;
            }
            
            fade = {
              'step': fade.step,
              'color': [red, green, blue]      
            };
        }
    }
    // This cell hasn't even started fading!
    else
    {
        // Grab the first color from the colors array
        fade = {
            'step': 0,
            'color': [colors[0].color[0],
                      colors[0].color[1],
                      colors[0].color[2]]
        };
    }
    
    return fade;
};

var nextGeneration = function() {
    for (var x = 0; x < gridLength; x += 1) {
        for (var y = 0; y < gridLength; y += 1) {
            // set color and draw
            if (cells[x][y] === 1) {
                cellColor[x][y] = fadeColor(cellColor[x][y]);                

                fill(cellColor[x][y].color[0],
                     cellColor[x][y].color[1],
                     cellColor[x][y].color[2]);
            }
            else {
                fill(255, 255, 255);
                cellColor[x][y] = 0;
            }
            rect(x * squareSize, y * squareSize,
                    squareSize, squareSize);
            // build next generation array
            if (livesOn(x,y) && !DEATH) {
                nextGen[x][y] = 1;
            }
            else {
                nextGen[x][y] = 0;
            }
        }
    }
    // copy next generation into current generation array
    for (var i = 0; i < gridLength; i += 1) {
        for (var j = 0; j < gridLength; j += 1) {
            cells[i][j] = nextGen[i][j];
        }
    }
    
    // You don't need to keep killing things forever!
    DEATH = false;
    
    var randomSpawn;
    
    // Is super blinky mode activated?
    if(superBlink)
    {
        randomSpawn = (round(random(0, 1))) ? 3 : 5;
        if(superBlink % randomSpawn === 0) {
            spawnBlinker();        
        }
        
        superBlink++;
    }

    // Is super pulse mode activated?
    if(superPulse)
    {
        if(superPulse % round(random(4, 7))=== 0) {
            spawnPulsar();        
        }
        
        superPulse++;
    }
};

// draw loop!
var t = 0;
var draw = function() {
    // to keep the animation from going too fast, only
    // draw after the specified delay
    if (t === drawDelay) {
        nextGeneration();
        t = 0;
    }
    // only increment t if we are not paused
    if (!paused) {
        t += 1;
    }
};

// Toggle the cell when you click on it
var mouseClicked = function() {
    var x = floor(mouseX / squareSize);
    var y = floor(mouseY / squareSize);    
    
    // There's already a cell here?
    if(cells[x][y])
    {
        // Delete it!
        fill(255, 255, 255);
        cells[x][y] = 0;
    }
    // There's nothing here!
    else
    {
        // Happy fun cell spawning time!
        fill(199, 0, 209);
        cells[x][y] = 1;
    }
    
    // draw the updated cell
    rect(x * squareSize, y * squareSize,
        squareSize, squareSize);
};

// Clicking and dragging only draws
var mouseDragged = function() {
    var x = floor(mouseX / squareSize);
    var y = floor(mouseY / squareSize);
    cells[x][y] = 1;

    // draw the new cell
    fill(199, 0, 209);
    rect(x * squareSize, y * squareSize,
        squareSize, squareSize);
};

var keyPressed = function() {
    // press 'shift' for super blinky mode!
    if (keyCode === 16) {
        if(superBlink) {
            superBlink = false;
        }
        else {
            superBlink = 1;
        }
    } 
    // press 'capslock' for super pulse mode!
    if (keyCode === 20) {
        if(superPulse) {
            superPulse = false;
        }
        else {
            superPulse = 1;
        }
    }
    // press 'space' to pause!
    if (keyCode === 32) {
        paused = !paused;
    }
    // Press 'b' to spawn a blinker!
    if (keyCode === 66) {
        spawnBlinker();
    }
    // PRESS 'D' FOR DEATH MODE!!!
    if (keyCode === 68) {
        DEATH = !DEATH;
    }    
    // Press 'g' to spawn a glider!
    if (keyCode === 71) {
        spawnGlider();   
    }
    // Press 'p' to spawn a pulsar!
    if (keyCode === 80) {
        spawnPulsar();
    }
    debug(keyCode);
};
