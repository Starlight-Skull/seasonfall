import {collision} from "./helpers.js";
import {border, tileList} from "./world.js";

export function entityMovement(entity) {
    entity.collision.up = false;
    entity.collision.down = false;
    entity.collision.left = false;
    entity.collision.right = false;
    for (let i = 0; i < border.length; i++) {
        collision(entity, border[i]);
    }
    for (let i = 0; i < tileList.length; i++) {
        collision(entity, tileList[i]);
    }

    if (entity.cooldown > 0) {
        entity.cooldown--;
    } else if (entity.cooldown !== -1) {
        entity.controls.right = Math.round(Math.random());
        entity.controls.left = Math.round(Math.random());
        entity.controls.jump = Math.round(Math.random());
        entity.cooldown = 50 / entity.speed;
    }

    if (entity.controls.right && !entity.collision.right) {
        entity.frame.x += entity.speed;
        if (entity.frame.currentFrame < entity.frame.frames) {
            entity.frame.currentFrame += 0.3;
            entity.frame.mirrored = false
        } else {
            entity.frame.currentFrame = 0;
        }
    }
    if (entity.controls.left && !entity.collision.left) {
        entity.frame.x -= entity.speed;
        if (entity.frame.currentFrame < entity.frame.frames) {
            entity.frame.currentFrame += 0.3;
            entity.frame.mirrored = true;
        } else {
            entity.frame.currentFrame = 0;
        }
    }
    if ((entity.controls.left && entity.controls.right) || (!entity.controls.left && !entity.controls.right)) {
        entity.frame.currentFrame = 0;
    }

    if (entity.collision.down && entity.air !== 0) {
        entity.air = 0;
    }
    if (entity.controls.jump && (entity.air < entity.airMax) && (!entity.collision.up)) {
        entity.frame.y += (entity.speed * 2);
        entity.air++;
    } else if ((entity.air >= entity.airMax) || (!entity.controls.jump && entity.air > 0) || !entity.collision.down) {
        entity.frame.y -= 9.81 * 1.5;
        entity.air = entity.airMax;
    }
}