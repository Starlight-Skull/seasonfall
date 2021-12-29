import {world} from "./globals.js";

export class Entity {
    constructor(hasCollision, cooldown, speed, damage, maxHP, maxMP, maxAir, xp, x, y, width, height) {
        this.cooldown = cooldown || -1;
        let sprite = new Image();
        sprite.src = './img/missing_entity.png';
        this.missing = new Animation(sprite, 0, 0, 32, 32, 1, 1, 'missing');
        this.frame = {
            x: x || 0,
            y: y || 0,
            width: width || 160,
            height: height || 160,
            currentFrame: 0,
            mirrored: false,
        };
        this.animation = '';
        this.idle = this.missing;
        this.move = this.missing;
        this.attack = this.missing;
        this.jump = this.missing;
        this.fall = this.missing;
        this.stats = {
            damage: damage || 0,
            invulnerable: 0,
            hp: maxHP || 100,
            maxHP: maxHP || 100,
            mp: maxMP || 0,
            maxMP: maxMP || 0,
            xp: xp || 0,
            speed: speed || 10
        }
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

export class Tile {
    constructor(hasCollision, x, y, width, height, sprite) {
        this.hasCollision = hasCollision; // 2 = only top collision
        this.frame = {
            x: x || 0,
            y: y || 0,
            width: width || 80,
            height: height || 80
        }
        // let img = new Image();
        // img.src = `./img/${sprite || 'missing_tile'}.png`;
        // this.sprite = img;
        this.sprite = sprite;
    }
}

export class TileEntity extends Tile {
    constructor(hasCollision, x, y, width, height, sprite, mirrored) {
        super(hasCollision, x, y, width, height, sprite);
        this.frame.currentFrame = 0;
        this.frame.mirrored = mirrored || false;
        this.animation = new Animation(this.sprite, 0, 0, 16, 16, 1, 1, 'missing')
    }

    activate() {
    };
}

export class Animation {
    constructor(sprite, x, y, width, height, frames, speed, name) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.frames = frames;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.name = name;
    }
}

export class Hero extends Entity {
    constructor(cooldown, x, y) {
        super(true, cooldown, 15, 10, 100, 25, 10, 0, x, y, 75, 155);
        let sprite = new Image();
        sprite.src = './img/kain_animations.png';
        this.idle = new Animation(sprite, 36, 0, 36, 36, 1, 1, 'idle');
        this.move = new Animation(sprite, 72, 0, 36, 36, 12, 0.3, 'move');
        this.attack = new Animation(sprite, 36, 36, 36, 36, 3, 0.2, 'attack');
        this.jump = new Animation(sprite, 36, 0, 36, 36, 1, 1, 'jump');
        this.fall = new Animation(sprite, 36, 0, 36, 36, 1, 1, 'fall');
    }
}

export class Stick extends Entity {
    constructor(cooldown, x, y) {
        super(true, cooldown, 5, 5, 70, 0, 25, 1, x, y, 90, 160);
        let sprite = new Image();
        sprite.src = './img/stick.png';
        this.idle = new Animation(sprite, 0, 0, 36, 36, 4, 0.01, 'idle');
        this.move = new Animation(sprite, 0, 36, 36, 36, 4, 0.3, 'move');
        this.attack = new Animation(sprite, 0, 72, 36, 36, 4, 0.1, 'attack');
        this.jump = new Animation(sprite, 0, 108, 36, 36, 4, 1, 'jump');
        this.fall = new Animation(sprite, 108, 108, 36, 36, 1, 0.3, 'fall');
    }
}

export class Door extends TileEntity {
    constructor(x, y, sprite, mirrored) {
        super(true, x, y, 20, 160, sprite, mirrored);
        this.closedWidth = 20;
        this.closed = new Animation(this.sprite, 0, 0, 16, 32, 1, 1, 'closed');
        this.openWidth = 80;
        this.open = new Animation(this.sprite, 16, 0, 16, 32, 1, 1, 'open');
        this.animation = this.closed;
        if (mirrored) {
            this.frame.x += this.animation.width * world.scale - this.frame.width;
        }
        this.activate = function () {
            if (this.frame.width === this.closedWidth) {
                if (mirrored) {
                    this.frame.x -= (this.openWidth - this.closedWidth);
                }
                this.hasCollision = false;
                this.frame.width = this.openWidth;
                this.animation = this.open;
            } else {
                if (mirrored) {
                    this.frame.x += (this.openWidth - this.closedWidth);
                }
                this.hasCollision = true;
                this.frame.width = this.closedWidth;
                this.animation = this.closed;
            }
        };
    }
}