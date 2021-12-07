export function collision(entity, object) {
    if (entity.hasCollision && object.hasCollision) {
        if (!entity.collision.up) {
            entity.collision.up =
                entity.frame.x < object.frame.x + object.frame.width &&
                entity.frame.x + entity.frame.width > object.frame.x &&
                entity.frame.y < object.frame.y &&
                entity.frame.y + entity.frame.height >= object.frame.y &&
                object.hasCollision !== 2;
            if (entity.collision.up && (entity.frame.y + entity.frame.height !== object.frame.y) && (entity.frame.y + entity.frame.height - object.frame.y <= 30)) {
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
            } else if (entity.collision.down && (entity.frame.y !== object.frame.y + object.frame.height) && (object.frame.y + object.frame.height - entity.frame.y <= 30)) {
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
            if (entity.collision.left && (entity.frame.x !== object.frame.x + object.frame.width) && (object.frame.x + object.frame.width - entity.frame.x <= 20)) {
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
            if (entity.collision.right && (entity.frame.x + entity.frame.width !== object.frame.x) && (entity.frame.x + entity.frame.width - object.frame.x <= 20)) {
                entity.frame.x = object.frame.x - entity.frame.width;
            }
        }
    }
}