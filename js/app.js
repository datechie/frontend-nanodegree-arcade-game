'use strict';

var TILE_WIDTH = 101,
    TILE_HEIGHT = 83;

// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var speed = Math.floor(Math.random() * 200) + 100;
    // Ensure enemies do not continue to go offscreen
    if (this.x > 501) {
        this.x = -100;
    }
    //console.log("Speed * dt is ", speed * dt); /* - DEBUG STATEMENT */
    this.x += Math.floor(speed * dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
    // Check for Collisions with enemies
    this.collide();

    // Boundary checks to ensure player does not go off canvas
    // x boundary check
    if (this.x <= 0) {
        this.x = 0; /* We can't go too much to the left and disappear */
    }
    else if (this.x > 404) {
        this.x = 404; /* Max on the right */
    }

    // y boundary check
    if (this.y <= 0) {
        //console.log("Reached River, resetting"); /* - DEBUG STATEMENT */
        //alert("You have won!!!"); /* We can un-comment if we need a pop-up on reaching the top */
        // Since player has reched water, we need to reset player position
        this.x = 202;
        this.y = 415;
    }
    else if (this.y > 415) {
        this.y = 415; /* can't go too far at the bottom */
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Function to check for player/bug collisions
Player.prototype.collide = function() {
    for (var enemy = 0; enemy < allEnemies.length; enemy++) {
        // Getting shorter variables
        var ex = allEnemies[enemy].x;
        var ey = allEnemies[enemy].y;

        // Getting player and enemy rows
        var player_row = (Math.floor(this.y/101));
        var enemy_row = (Math.floor(ey/101));
        // If player and bug are in the same row, we will check only the x values to see if they are colliding or not.
        // The width has been set at 68 to get collisions when player and bug are actually closer. The width of 101 (image dimensions are 101 x 171)
        // results in collisions happening even if the player is farther from the bug and looks weird
        if ((player_row === enemy_row) && (((this.x < ex) && (ex < this.x + 68)) || ((ex < this.x) && (this.x < ex + 68)))) {
            //if (((this.x < ex) && (ex < this.x + 68)) || ((ex < this.x) && (this.x < ex + 68))) { /* Combined this if into the above if */
            //console.log ("!!!!COLLISION!!!!"); /* - DEBUG STATEMENT */
            // On collision, reset player to starting position
            this.x = 202;
            this.y = 415;
        }
    }
};

Player.prototype.handleInput = function(keys) {
    // using switch statement
    // Defining how and how much the player will move using the arrow keys
    switch (keys){
        case 'up':
            this.y -= TILE_HEIGHT; /* Moving up */
            break;
        case 'down':
            this.y += TILE_HEIGHT; /* Moving down */
            break;
        case 'left':
            this.x -= TILE_WIDTH; /* Moving left */
            break;
        case 'right':
            this.x += TILE_WIDTH; /* Moving right */
            break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Starting positions of enemies and player
var allEnemies = [new Enemy(400,60), new Enemy(100, 143), new Enemy(200, 226)];
var player = new Player(202, 415);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});