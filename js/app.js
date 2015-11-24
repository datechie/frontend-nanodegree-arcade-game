//var x = 100;
//var y = 100;
var row = 1;
var px = 202; //width of canvas divided by 2;
var py = 415;

/*var dim1 = {x: 50, y: 5, w: 50, h: 50}
var dim2 = {x: 20, y: 10, w: 60, h: 40}

var rect1 = Crafty.e("2D, Canvas, Color").attr(dim1).color("red");

var rect2 = Crafty.e("2D, Canvas, Color, Keyboard, Fourway").fourway(2).attr(dim2).color("blue");

rect2.bind("EnterFrame", function () {
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.h + rect1.y > rect2.y) {
        // collision detected!
        this.color("green");
    } else {
        // no collision
        this.color("blue");
    }
});*/

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
        /*if (Math.sqrt((this.x - allEnemies[enemy].x)*(this.x - allEnemies[enemy].x)+
            (this.y - allEnemies[enemy].y-10)*(this.y - allEnemies[enemy].y-10)) < 70) {
            this.x = px;
            this.y = py;
        }*/
            //this.lifes -=1;
            ex = allEnemies[enemy].x;
            ey = allEnemies[enemy].y;
            var pceil = (Math.floor(this.y/101));
            var eceil = (Math.floor(ey/101));
            console.log("x = " + this.x + " y = " + this.y + " Row = " + pceil);
            console.log("Player Row: " + pceil);
            console.log("Enemy # " + enemy + " Bug Row: " + eceil);
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
                    this.x = px;
                    this.y = py;
                }

            }

        }

   if (this.y < 0) {
        this.y = py;
        this.x = px;
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys){
    if (keys === "up") {
        if (this.y > -20) {
            this.y -= 83;
        }
    }
    else if (keys === "down") {
        if (this.y < 405) {
            this.y += 83;
        }
    }
    else if (keys == "right") {
        if (this.x < 403) {
            this.x += 101;
        }
    }
    else {
        if (this.x > 0) {
            this.x -= 101;
        }
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