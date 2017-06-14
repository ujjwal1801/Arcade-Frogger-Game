    //Global variables
var b_width = 101;
var b_height = 83;
var hi_speed = 100;
var lo_speed = 800;
var score = 0;

//Updating the score on the webpage
var updateScore = function() {

   document.getElementById('score').innerHTML = score;
}

// Enemies our player must avoid
var Enemy = function(x, y) {
   // Variables applied to each of our instances go here,
   // we've provided one for you to get started

   // The image/sprite for our enemies, this uses
   // a helper we've provided to easily load images
   this.sprite = 'images/enemy-bug.png';
   this.x = x;
   this.y = y;
   this.speed = this.grabspeed();
};

//Function to generate speed of the enemy
Enemy.prototype.grabspeed = function() {
   return Math.floor(Math.random() * (hi_speed - lo_speed + 1) + lo_speed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
   // You should multiply any movement by the dt parameter
   // which will ensure the game runs at the same speed for
   // all computers.
   this.x = this.x + this.speed * dt;
   if (this.x > 500) {
      this.x -= 600;
      this.speed = this.grabspeed();
   }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function(x, y) {
   this.x = x;
   this.y = y;
   this.sprite = 'images/char-boy.png';
}
//my friend explained this piece of code to me

Player.prototype.update = function() {
   for (var i = 0; i < 3; i++) {
      if ((this.x < allEnemies[i].x + 73) && (this.x + 73 > allEnemies[i].x) && (this.y < allEnemies[i].y + 73) && (this.y + 73 > allEnemies[i].y)) {
         this.reset();
      }
   }
};

//Resetting the player
Player.prototype.reset = function() {
   this.x = 200;
   this.y = 400;
};


Player.prototype.render = function() {
   ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}; // Same as Enemy.prototype.render.


//Code to handle the keystrokes entered
Player.prototype.handleInput = function(key) {
   switch (key) {

      case 'up':
         if (this.y > 40)
            this.y = this.y - b_height;
         else if (this.y < 40) {
            this.reset();
            score++;
            updateScore();
         }
         break;
      case 'down':
         if (this.y < 400)
            this.y = this.y + b_height;
         break;
      case 'left':
         if (this.x > 10)
            this.x = this.x - b_width;
         break;
      case 'right':
         if (this.x < 400)
            this.x = this.x + b_width;
         break;
   }


};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [
   new Enemy(0, 43),
   new Enemy(0, 135),
   new Enemy(0, 215)
];

// Place the player object in a variable called player

var player = new Player(200, 400);


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