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
}

let player = new Player();
let e1 = new Enemy(10);
let e2 = new Enemy(20);

e1.x = 120;
e2.x = 240;

function drawBox(box) {
    context.fillStyle = box.color;
    context.fillRect(box.x, box.y, box.size, box.size);
}

setInterval(() => {
    context.clearRect(0, 0, 500, 500);

    e1.y += e1.speed;
    e2.y += e2.speed;

    drawBox(player);
    drawBox(e1);
    drawBox(e2);
}, 100);

