import {player, world} from "./globals.js";

export function keyLogger(ev, down) {
    switch (ev.key) {
        case 'w':
        case 'z':
        case 'ArrowUp':
            player.controls.attack = (player.controls.attack === 2) ? (down ? 2 : false) : down;
            break;
        case 's':
        case 'ArrowDown':
            player.controls.down = down;
            break;
        case 'a':
        case 'q':
        case 'ArrowLeft':
            player.controls.left = down;
            break;
        case 'd':
        case 'ArrowRight':
            player.controls.right = down;
            break;
        case ' ':
            ev.preventDefault();
            player.controls.jump = down;
            break;
    }
}

export function formatUnixTime(timestamp, timezone) {
    // time is set to a simple format for easy use in calculations
    let date = new Date((timestamp + timezone) * 1000);
    return date.getUTCHours() * 100 + date.getUTCMinutes();
}

/**
 * Checks if the given entity is within the world border and moves it back if needed.
 * @param entity - The entity to check.
 */
export function borderControl(entity) {
    if (entity.frame.x > world.width) {
        entity.frame.x = world.width;
    }
    if (entity.frame.x < 0) {
        entity.frame.x = 0;
    }
    if (entity.frame.y > world.height) {
        entity.frame.y = world.height;
    }
    if (entity.frame.y < 0) {
        entity.frame.y = 0;
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
        if (
            entity.collision.left && entity.collision.right &&
            entity.frame.x <= object.frame.x &&
            entity.frame.x + entity.frame.width >= object.frame.x + object.frame.width &&
            !isAttack
        ) {
            entity.collision.left = false;
            entity.collision.right = false;
        }
        if (
            ((!values.up && entity.collision.up) || (!values.down && entity.collision.down) || (!values.left && entity.collision.left) || (!values.right && entity.collision.right)) &&
            ((entity.constructor.name !== 'Tile' && object.constructor.name === 'Hero') || (entity.constructor.name === 'Hero' && object.constructor.name !== 'Tile'))
        ) {
            return object;
        } else return false;
    } else return false;
}