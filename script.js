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
let e1 = new Enemy(1);
let e2 = new Enemy(2);

e1.x = 120;
e2.x = 240;
e1.y = 0;
e2.y = 200;

function drawBox(box) {
    context.fillStyle = box.color;
    context.fillRect(box.x, box.y, box.size, box.size);
}

function updateGame() {
    requestAnimationFrame(updateGame);

    context.clearRect(0, 0, paintbox.width, paintbox.height);

    e1.move();
    e2.move();

    drawBox(player);
    drawBox(e1);
    drawBox(e2);
}

updateGame();
