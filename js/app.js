var px = 202; //width of canvas divided by 2;
var py = 415;


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
    var speed = Math.floor(Math.random() * 150) + 100;
       if (this.x > 501) {
        this.x = -50;
    }
    //console.log("Speed * dt is ", speed * dt);
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
    for ( var enemy in allEnemies) {
            ex = allEnemies[enemy].x;
            ey = allEnemies[enemy].y;
            var pceil = (Math.floor(this.y/101));
            var eceil = (Math.floor(ey/101));
            //console.log("x = " + this.x + " y = " + this.y + " Row = " + pceil);
            //console.log("Player Row: " + pceil);
            //console.log("Enemy # " + enemy + " Bug Row: " + eceil);
            /* This works -- if ((this.x <= ex + 50) && ((this.x + 50) > ex) && (this.y < ey + 50) && ((this.y + 50) > ey))
            //not required if ((this.x <= ex + 101) && ((this.x + 101) > ex))
            //not required if ((this.x <= allEnemies[enemy].x && this.x+101 >= allEnemies[enemy].x) && (this.y <= allEnemies[enemy].y && this.y+ 171 >= allEnemies[enemy].y))
            {
                //console.log(this.x, this.y, ex, ey, enemy);
                //alert("Collision")
                this.x = px;
                this.y = py;
            }*/
            if (pceil === eceil){
                if (((this.x < ex) && (ex < this.x + 68)) || ((ex < this.x) && (this.x < ex + 68))){
                    console.log ("!!!!COLLISION!!!!");
                    this.x = px;
                    this.y = py;
                }

            }

        }

    if (this.x <= 0) {
        this.x = 0;
    }
    else if (this.x > 404) {
        this.x = 404;
    }
    //else if (this.y === 0) {
    //    this.y = 415;
    //}
    if (this.y <= 0) {
        this.y = 415;
        console.log("Reached River, resetting");
    }
    else if (this.y > 415) {
        this.y = 415;
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys){
    /*if (keys === "up") {
        console.log ("T: Before y is " + this.y);
        if (this.y > -20) {
            this.y -= 83;
            console.log ("T: After y is " + this.y);
        }
    }
    else if (keys === "down") {
        if (this.y < 405) {
            this.y += 83;
        }
    }
    else if (keys == "right") {
        if (this.x < 404) {
            this.x += 101;
        }
    }
    else {
        if (this.x > 0) {
            this.x -= 101;
        }
    }*/

    // using switch statement
    switch (keys){
        case 'up':
            //if (this.y > -20) {
                console.log ("T: Before y is " + this.y);
                this.y -= 83;
                console.log ("T: After y is " + this.y);
                break;
            //}
        case 'down':
            //if (this.y < 403) {
                this.y += 83;
                break;
            //}
        case 'left':
            console.log ("L: Before x is " + this.x);
            //if (this.x !== 0) {
                this.x = this.x - 101;
                console.log ("L: After x is " + this.x);
                break;
            //}
        case 'right':
            console.log ("R: Before x is " + this.x)
            //if (this.x !== 404) {
                this.x += 101;
                console.log ("R: After x is " + this.x);
                break;
            //}
        //default:
        //    break;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

//var allEnemies = [new Enemy(400,60), new Enemy(100, 140), new Enemy(200, 225)];
var allEnemies = [new Enemy(400,60), new Enemy(100, 143), new Enemy(200, 226)];
var player = new Player(202, 415);
/*var allEnemies = [];

for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(-60, 60 + 80 *i ));
}*/


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