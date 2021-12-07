export class entity {
    constructor(hasCollision, cooldown, speed, maxHP, maxMP, maxAir, x, y, sprite, width, height, sX, sY, sWidth, sHeight, frames, currentFrame) {
        this.cooldown = cooldown || -1;
        this.frame = {
            x: x || 0,
            y: y || 0,
            width: width || 150,
            height: height || 250,
            sprite: sprite,
            sX: sX,
            sY: sY,
            sWidth: sWidth,
            sHeight: sHeight,
            frames: frames,
            currentFrame: currentFrame,
            mirrored: false
        };
        this.stats = {
            hp: maxHP|| 100,
            maxHP: maxHP || 100,
            mp: maxMP || 0,
            maxMP: maxMP || 0,
            xp: 0
        }
        this.speed = speed || 10;
        this.air = 0;
        this.maxAir = maxAir || 25;
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

export class tile {
    constructor(hasCollision, color, x, y, width, height) {
        this.frame = {
            x: x || 0,
            y: y || 0,
            width: width || 150,
            height: height || 150
        }
        this.color = color || 'black';
        this.hasCollision = hasCollision;
    }
}