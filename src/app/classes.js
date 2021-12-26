export class Entity {
    constructor(hasCollision, cooldown, speed, damage, maxHP, maxMP, maxAir, xp, x, y, width, height) {
        this.cooldown = cooldown || -1;
        let sprite = new Image();
        sprite.src = './img/missing_entity.png';
        this.missing = new SpriteSet(sprite, 0, 0, 36, 36, 1, 1, 'missing');
        this.frame = {
            x: x || 0,
            y: y || 0,
            width: width || 150,
            height: height || 250,
            currentFrame: 1,
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
            width: width || 150,
            height: height || 150
        }

        let img = new Image();
        img.src = `./img/${sprite || 'missing_tile'}.png`;
        this.sprite = img;
    }
}

export class TileEntity extends Tile {
    constructor(hasCollision, x, y, width, height, color) {
        super(hasCollision, x, y, width, height, color);
    }

    activate() {
    };
}

export class SpriteSet {
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

// todo add more sprites
// todo add more classes
export class Hero extends Entity {
    constructor(cooldown, x, y) {
        super(true, cooldown, 10, 5, 100, 25, 15, 1, x, y, 110, 155);

        let sprite = new Image();
        sprite.src = './img/kain_animations.png';

        this.idle = new SpriteSet(sprite, 36, 0, 36, 36, 1, 1, 'idle');
        this.move = new SpriteSet(sprite, 72, 0, 36, 36, 12, 0.3, 'move');
        this.attack = new SpriteSet(sprite, 36, 36, 36, 36, 3, 0.1, 'attack');
        this.jump = new SpriteSet(sprite, 36, 0, 36, 36, 1, 1, 'jump');
        this.fall = new SpriteSet(sprite, 36, 0, 36, 36, 1, 1, 'fall');
    }
}

export class Stick extends Entity {
    constructor(cooldown, x, y) {
        super(true, cooldown, 5, 5, 70, 0, 25, 1, x, y, 90, 160);

        let sprite = new Image();
        sprite.src = './img/stick.png';

        this.idle = new SpriteSet(sprite, 0, 0, 36, 36, 4, 0.01, 'idle');
        this.move = new SpriteSet(sprite, 0, 36, 36, 36, 4, 0.3, 'move');
        this.attack = new SpriteSet(sprite, 0, 72, 36, 36, 4, 0.1, 'attack');
        this.jump = new SpriteSet(sprite, 0, 108, 36, 36, 4, 1, 'jump');
        this.fall = new SpriteSet(sprite, 108, 108, 36, 36, 1, 0.3, 'fall');
    }
}

export class Door extends TileEntity {
    constructor(x, y, width, openWidth, height, sprite) {
        super(true, x, y, width, height, sprite);
        this.openWidth = openWidth;
        this.activate = function () {
            this.hasCollision = !this.hasCollision;
            let w = this.frame.width;
            this.frame.width = this.openWidth;
            this.openWidth = w;
        };
    }
}