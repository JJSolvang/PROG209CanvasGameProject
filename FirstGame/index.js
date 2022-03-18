// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
document.body.appendChild(canvas);

var gameover = false;
setTimeout(secondPassed, 1000);
var timer = 30;
// Load Audio
var a = document.getElementById("collectSound");
var c = document.getElementById("crySound");

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";

// trainer image
var trainerReady = false;
var trainerImage = new Image();
trainerImage.onload = function () {
    trainerReady = true;
};
trainerImage.src = "images/trainer_0.png";
var walkingLeft = true;
var wFrames = 0;

// pokeball image
var pokeballReady = false;
var pokeballImage = new Image();
pokeballImage.onload = function () {
    pokeballReady = true;
};
pokeballImage.src = "images/pokeball.png";

// pokemon image
var pokemonReady = false;
var pokemonImage = new Image();
pokemonImage.onload = function () {
    pokemonReady = true;
};
pokemonImage.src = "images/pokemon.png";

// fence image
var fenceReady = false;
var fenceImage = new Image();
fenceImage.onload = function () {
    fenceReady = true;
};
fenceImage.src = "images/fence.png";

// Draw everything in the main render function
var render = function () {

    if (bgReady) {
        console.log('here2');
        ctx.drawImage(bgImage, 0, 0);
    }
    
    if (fenceReady) {
        for (var i = 0; i < 25; i++) {
            ctx.drawImage(fenceImage, (fence.x + (32 * i)), fence.y);
        }

        for (var i = 0; i < 25; i++) {
            ctx.drawImage(fenceImage, fence.x, (fence.y + (i * 32)));
        }

        for (var i = 0; i < 25; i++) {
            ctx.drawImage(fenceImage, (fence.x + (24 * 32)), (fence.y + (i * 32)));
        }

        for (var i = 0; i < 25; i++) {
            ctx.drawImage(fenceImage, (fence.x + (32 * i)), (fence.y + (24 * 32)));
        }
    }

    if (trainerReady) {
        ctx.drawImage(trainerImage, trainer.x, trainer.y);
    }
        
    if (pokeballReady) {
        ctx.drawImage(pokeballImage, pokeball.x, pokeball.y);
    }

    if (pokeballReady) {
        ctx.drawImage(pokemonImage, pokemon.x, pokemon.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "black";
    ctx.fillText("Pokéballs collected: " + pokeballsCaught + "/6", 32, 32);

    // Timer
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillStyle = "black";
    if (timer > 9) {
        ctx.fillText("Time: 0:" + timer, 32, 64);
    } else if (timer == 0) {
        ctx.fillText("Time: 0:00", 32, 64);
    } else {
        ctx.fillText("Time: 0:0" + timer, 32, 64);
    }

    if (timer == 0) {
        timer--;
    }
}

function secondPassed () {
    timer--;
    setTimeout(secondPassed, 1000);
}

// Game objects
var trainer = {
    speed: 256, // movement in pixels per second
    x: 400,  // where on the canvas are they?
    y: 400  // where on the canvas are they?
};

var pokeball = {
    // for this version, the pokeball does not move, so just and x and y
    x: 0,
    y: 0
};

var pokemon = {
    // for this version, the pokemon does not move, so just and x and y
    x: 0,
    y: 0
};


var fence = {
    // for this version, the fence does not move, so just and x and y
    x: 0,
    y: 0
};

var pokeballsCaught = 0;

// Reset the game when the player catches a pokeball
var reset = function () {
    trainer.x = canvas.width / 2;
    trainer.y = canvas.height / 2;
    
    //Place the pokeball somewhere on the screen randomly
    // but not in the fences, Article in wrong, the 64 needs to be 
    // fence 32 + fence 32 + char 32 = 96
    pokeball.x = 32 + (Math.random() * (canvas.width - 96));
    pokeball.y = 32 + (Math.random() * (canvas.height - 96));

    pokemon.x = 32 + (Math.random() * (canvas.width - 96));
    pokemon.y = 32 + (Math.random() * (canvas.height - 96));

    while ((pokemon.x == pokeball.x && pokemon.y == pokeball.y) && (pokemon.x == trainer.x && pokemon.y == trainer.y)) {
        pokemon.x = 32 + (Math.random() * (canvas.width - 96));
        pokemon.y = 32 + (Math.random() * (canvas.height - 96));
    }
};

var keysDown = {}; 

addEventListener("keydown", function (e) {
    console.log(e.keyCode + " down")
    keysDown[e.keyCode] = true;
}, false);
    
addEventListener("keyup", function (e) {
    console.log(e.keyCode + " up")
    delete keysDown[e.keyCode];
}, false);

// Update game objects
var update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        trainer.y -= trainer.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        trainer.y += trainer.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        trainer.x -= trainer.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        trainer.x += trainer.speed * modifier;
    }
};

// The main game loop
var main = function () {
    if (pokeballsCaught == 6)
    {
        ctx.font = "36px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = "black";
        ctx.fillText("Victory! You saved all of your Pokémon!", 400, 300);
    }
    else if (gameover == true) {
        ctx.font = "36px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = "black";
        ctx.fillText("Game over! You were eaten!", 400, 300);
    }
    else if (timer < 0) {
        ctx.font = "36px Helvetica";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = "black";
        ctx.fillText("Game over! Your time ran out!", 400, 300);
    }
    else {
        var now = Date.now();
        var delta = now - then;
        update(delta / 1000);
        render();
        then = now;
        //  Request to do this again ASAP
        requestAnimationFrame(main);
    }
};
    

// Update game objects
var update = function (modifier) {
    trainerImage.src = "images/trainer_0.png";

    if (38 in keysDown && (trainer.y > 12)) { // Player holding up
        trainer.y -= trainer.speed * modifier;
        if (walkingLeft == true) {
            trainerImage.src = "images/trainer_1.png";
            if (wFrames > 15) {
                walkingLeft = false;
                wFrames = 0;
            }
            wFrames++;
        }
        else if (walkingLeft == false) {
            trainerImage.src = "images/trainer_2.png";
            if (wFrames > 15) {
                walkingLeft = true;
                wFrames = 0;
            }
            wFrames++;
        }
    }
    if (40 in keysDown && (trainer.y < 736)) { // Player holding down
        trainer.y += trainer.speed * modifier;
        if (walkingLeft == true) {
            trainerImage.src = "images/trainer_1.png";
            if (wFrames > 15) {
                walkingLeft = false;
                wFrames = 0;
            }
            wFrames++;
        }
        else if (walkingLeft == false) {
            trainerImage.src = "images/trainer_2.png";
            if (wFrames > 15) {
                walkingLeft = true;
                wFrames = 0;
            }
            wFrames++;
        }
    }
    if (37 in keysDown && (trainer.x > 32)) { // Player holding left
        trainer.x -= trainer.speed * modifier;
        if (walkingLeft == true) {
            trainerImage.src = "images/trainer_1.png";
            if (wFrames > 15) {
                walkingLeft = false;
                wFrames = 0;
            }
            wFrames++;
        }
        else if (walkingLeft == false) {
            trainerImage.src = "images/trainer_2.png";
            if (wFrames > 15) {
                walkingLeft = true;
                wFrames = 0;
            }
            wFrames++;
        }
    }
    if (39 in keysDown && (trainer.x < 736)) { // Player holding right
        trainer.x += trainer.speed * modifier;
        if (walkingLeft == true) {
            trainerImage.src = "images/trainer_1.png";
            if (wFrames > 15) {
                walkingLeft = false;
                wFrames = 0;
            }
            wFrames++;
        }
        else if (walkingLeft == false) {
            trainerImage.src = "images/trainer_2.png";
            if (wFrames > 15) {
                walkingLeft = true;
                wFrames = 0;
            }
            wFrames++;
        }
    }

    // Are they touching?
    if (trainer.x <= (pokeball.x + 32) && pokeball.x <= (trainer.x + 32) && trainer.y <= (pokeball.y + 32) && pokeball.y <= (trainer.y + 32)) {
        a.currentTime = 0.1;
        a.play();
        ++pokeballsCaught;       // keep track of our “score”
        reset();       // start a new cycle
    }

    if (trainer.x <= (pokemon.x + 32) && pokemon.x <= (trainer.x + 32) && trainer.y <= (pokemon.y + 32) && pokemon.y <= (trainer.y + 32)) {
        
        c.currentTime = 0.4;
        c.play();gameover = true;       // End game
        reset();       // start a new cycle
    }
};

// Let's play this game!
var then = Date.now();
reset();
main();  // call the main game loop.
