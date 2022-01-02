import {world} from "./globals.js";

let hero = new Image();
hero.src = './img/hero.png';
let missing_entity = new Image();
missing_entity.src= './img/missing_entity.png';
let rain = new Image();
rain.src = './img/rain.png';
let snow = new Image();
snow.src = './img/snow.png';
let skeleton = new Image();
skeleton.src = './img/skeleton.png';

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
        this.defaultWidth = width;
        this.attackWidth = width;
        this.animation = '';
        this.idle = this.missing;
        this.move = this.missing;
        this.attack = this.missing;
        this.jump = this.missing;
        this.fall = this.missing;
        this.death = this.missing;
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
            attack: false,
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
    constructor(x, y) {
        super(true, -1, 10, 15, 100, 25, 12, 0, x, y, 60, 155);
        this.attackWidth = 95;
        this.idle = new Animation(hero, 0, 32, 16, 32, 1, 1, 'idle');
        this.move = new Animation(hero, 0, 32, 16, 32, 6, 0.3, 'move');
        this.attack = new Animation(hero, 0, 0, 19, 32, 4, 0.3, 'attack');
        this.jump = new Animation(hero, 80, 32, 16, 32, 1, 1, 'jump');
        this.fall = new Animation(hero, 48, 32, 16, 32, 1, 1, 'fall');
        this.death = new Animation(skeleton, 0, 32, 16, 32, 1, 1, 'idle');
    }
}

export class Skeleton extends Entity {
    constructor(cooldown, x, y) {
        super(true, cooldown, 7, 10, 55, 0, 8, 1, x, y, 65, 155);
        this.attackWidth = 100
        this.idle = new Animation(skeleton, 0, 32, 16, 32, 1, 1, 'idle');
        this.move = new Animation(skeleton, 0, 32, 16, 32, 4, 0.4, 'move');
        this.attack = new Animation(skeleton, 0, 0, 16, 32, 2, 0.1, 'attack');
        this.jump = new Animation(skeleton, 16, 32, 16, 32, 1, 1, 'jump');
        this.fall = new Animation(skeleton, 48, 32, 16, 32, 1, 1, 'fall');
        this.death = new Animation(skeleton, 32, 0, 16, 32, 2, 0.1, 'death');
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

export class Rain extends TileEntity {
    constructor(x, y, width, height, mirrored) {
        super(false, x, y, width, height, rain, mirrored);
        this.rain = new Animation(this.sprite, 0, 0, 16, 16, 16, .5, 'rain');
        this.animation = this.rain;
        this.isSnow = false;
        this.activate = function () {
            if (this.isSnow) {
                this.animation.sprite = snow;
            } else {
                this.animation.sprite = rain;
            }
            if (this.frame.currentFrame < this.animation.frames - 1) {
                this.frame.currentFrame += this.animation.speed;
            } else {
                this.frame.currentFrame = 0;
            }
        }
    }
}