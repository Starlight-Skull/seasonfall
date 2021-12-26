import {player} from "./globals.js";

export function keyLogger(ev, down) {
    switch (ev.key) {
        case 'w':
            player.controls.up = (player.controls.up === 2) ? (down ? 2 : false) : down;
            break;
        case 's':
            player.controls.down = down;
            break;
        case 'a':
            player.controls.left = down;
            break;
        case 'd':
            player.controls.right = down;
            break;
        case ' ':
            ev.preventDefault();
            player.controls.jump = down;
            break;
    }
}

export function collision(entity, object, isAttack) {
    if (entity.hasCollision && (object.hasCollision || (Object.getPrototypeOf(Object.getPrototypeOf(object)).constructor.name === 'TileEntity' && isAttack))) {
        let values = {
            up: entity.collision.up,
            down: entity.collision.down,
            left: entity.collision.left,
            right: entity.collision.right
        }
        if (!entity.collision.up) {
            entity.collision.up =
                entity.frame.x < object.frame.x + object.frame.width &&
                entity.frame.x + entity.frame.width > object.frame.x &&
                entity.frame.y < object.frame.y &&
                entity.frame.y + entity.frame.height >= object.frame.y &&
                object.hasCollision !== 2;
            if (entity.collision.up && (entity.frame.y + entity.frame.height - object.frame.y <= 30) && object.constructor.name === 'Tile') {
                entity.frame.y = object.frame.y - entity.frame.height;
            }
        }
        if (!entity.collision.down) {
            entity.collision.down =
                entity.frame.x < object.frame.x + object.frame.width &&
                entity.frame.x + entity.frame.width > object.frame.x &&
                entity.frame.y <= object.frame.y + object.frame.height &&
                entity.frame.y > object.frame.y &&
                entity.frame.y + entity.frame.height > object.frame.y + object.frame.height;
            if (object.hasCollision === 2 && entity.controls.down) {
                entity.collision.down = false;
            } else if (entity.collision.down && (object.frame.y + object.frame.height - entity.frame.y <= 30) && object.constructor.name === 'Tile') {
                entity.frame.y = object.frame.y + object.frame.height;
            }
        }
        if (!entity.collision.left) {
            entity.collision.left =
                entity.frame.x <= object.frame.x + object.frame.width &&
                entity.frame.x + entity.frame.width > object.frame.x + object.frame.width &&
                entity.frame.y < object.frame.y + object.frame.height &&
                entity.frame.y + entity.frame.height > object.frame.y &&
                object.hasCollision !== 2;
            if (entity.collision.left && (object.frame.x + object.frame.width - entity.frame.x <= 20) && object.constructor.name === 'Tile') {
                entity.frame.x = object.frame.x + object.frame.width;
            }
        }
        if (!entity.collision.right) {
            entity.collision.right =
                entity.frame.x < object.frame.x &&
                entity.frame.x + entity.frame.width >= object.frame.x &&
                entity.frame.y < object.frame.y + object.frame.height &&
                entity.frame.y + entity.frame.height > object.frame.y &&
                object.hasCollision !== 2;
            if (entity.collision.right && (entity.frame.x + entity.frame.width - object.frame.x <= 20) && object.constructor.name === 'Tile') {
                entity.frame.x = object.frame.x - entity.frame.width;
            }
        }
        if (((!values.up && entity.collision.up) || (!values.down && entity.collision.down) || (!values.left && entity.collision.left) || (!values.right && entity.collision.right)) && ((entity.constructor.name !== 'Tile' && object.constructor.name === 'Hero') || (entity.constructor.name === 'Hero' && object.constructor.name !== 'Tile'))) {
            return object;
        } else return false;
    } else return false;
}