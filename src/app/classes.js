export class entity {
    constructor(hasCollision, cooldown, speed, maxHP, maxMP, maxAir, x, y, width, height) {
        this.cooldown = cooldown || -1;
        let sprite = new Image();
        sprite.src = './img/missing.png';
        this.missing = new spriteSet(sprite, 0, 0, 36, 36, 1, 'missing');
        this.frame = {
            x: x || 0,
            y: y || 0,
            width: width || 150,
            height: height || 250,
            currentFrame: 1,
            mirrored: false,
        };
        this.animation = this.missing;
        this.move = this.missing;
        this.attack = this.missing;
        this.idle = this.missing;
        this.stats = {
            hp: maxHP || 100,
            maxHP: maxHP || 100,
            mp: maxMP || 0,
            maxMP: maxMP || 0,
            xp: 0
        }
        this.speed = speed || 10;
        this.air = 0;
        this.maxAir = maxAir || 15;
        this.controls = {
            up: false,
            down: false,
            left: false,
            right: false,
            jump: false
        };
        this.collision = {
            up: false,
            down: false,
            left: false,
            right: false
        };
        this.hasCollision = hasCollision;
    }
}

export class hero extends entity {
    constructor(x, y) {
        super(true, -1, 10, 100, 25, 15, x, y, 110, 155);

        let sprite = new Image();
        sprite.src = './img/kain_animations.png';

        this.idle = new spriteSet(sprite, 36, 0, 36, 36, 1, 'idle');
        this.move = new spriteSet(sprite, 36, 0, 36, 36, 13, 'move');
        this.attack = new spriteSet(sprite, 36, 36, 36, 36, 3, 'attack');
    }
}

export class tile {
    constructor(hasCollision, color, x, y, width, height) {
        this.frame = {
            x: x || 0,
            y: y || 0,
            width: width || 150,
            height: height || 150
        }
        this.color = color || 'black';
        this.hasCollision = hasCollision; // 2 = only top collision
    }
}

export class spriteSet {
    constructor(sprite, x, y, width, height, frames, name) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.frames = frames;
        this.width = width;
        this.height = height;
        this.name = name;
    }
}