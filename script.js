let paintbox = document.getElementById("paintbox");
let context = paintbox.getContext('2d');

class Box {
    constructor(size, color) {
        this.size = size;
        this.color = color;
        this.x = 0;
        this.y = 0;
    }
}

class Player extends Box {
    constructor() {
        super(50, "blue");
        this.x = 0;
        this.y = 225;
        this.speed = 0;
    }

    move() {
        this.x += this.speed;
        // keep player inside canvas
        if (this.x < 0) this.x = 0;
        if (this.x + this.size > paintbox.width) this.x = paintbox.width - this.size;
    }
}

class Enemy extends Box {
    constructor(speed) {
        super(50, "red");
        this.speed = speed;
    }

    move() {
        this.y += this.speed;

        // bounce bottom
        if (this.y + this.size > paintbox.height) {
            this.y = paintbox.height - this.size;
            this.speed = -Math.abs(this.speed);
        }

        // bounce top
        if (this.y < 0) {
            this.y = 0;
            this.speed = Math.abs(this.speed);
        }
    }
}

let player = new Player();
let e1 = new Enemy(4);
let e2 = new Enemy(6);
let e3 = new Enemy(12);

e1.x = 120;
e2.x = 240;
e3.x = 360;
// ensure initial y values
e1.y = 0;
e2.y = 200;
e3.y = 100;

function drawBox(box) {
    context.fillStyle = box.color;
    context.fillRect(box.x, box.y, box.size, box.size);
}

// use correct method name: addEventListener
// on mousedown -> move right; on mouseup -> stop
paintbox.addEventListener("pointerdown", () => {
    player.speed = 5; // change speed as needed
});
paintbox.addEventListener("pointerup", () => {
    player.speed = 0;
});
paintbox.addEventListener("pointerleave", () => {
    player.speed = 0;
});

function gameLoop() {
    // update
    e1.move();
    e2.move();
    e3.move();
    player.move();

    // render (use canvas width/height, not hard-coded)
    context.clearRect(0, 0, paintbox.width, paintbox.height);
    drawBox(player);
    drawBox(e1);
    drawBox(e2);
    drawBox(e3);

    // next frame
    window.requestAnimationFrame(gameLoop);
}

// start loop
gameLoop();
