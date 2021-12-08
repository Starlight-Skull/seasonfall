import {collision} from "./helpers.js";
import {entityList, tileList} from "./globals.js";

export function entityMovement(entity) {
    if (entity.frame.x > window.innerWidth || entity.frame.x < 0 || entity.frame.y > window.innerHeight * 1.5 || entity.frame.y < 0) {
        entity.frame.x = 0;
        entity.frame.y = 0;
    }

    if (entity.cooldown > 0) {
        entity.cooldown--;
    } else if (entity.cooldown !== -1) {
        entity.controls.up = Math.round(Math.random());
        entity.controls.right = Math.round(Math.random());
        entity.controls.left = Math.round(Math.random());
        entity.controls.jump = Math.round(Math.random());
        entity.cooldown = 100 / entity.speed;
    }

    entity.collision.up = false;
    entity.collision.down = false;
    entity.collision.left = false;
    entity.collision.right = false;
    for (let i = 0; i < tileList.length; i++) {
        collision(entity, tileList[i]);
    }

    if (entity.stats.invulnerable > 0) {
        entity.stats.invulnerable--;
    }

    if (entity.controls.right && !entity.collision.right && !(entity.controls.up && entity.air === 0)) {
        entity.frame.x += entity.speed;
        if (entity.animation !== entity.move) {
            entity.frame.currentFrame = 0;
            entity.animation = entity.move;
        }
        entity.frame.mirrored = false;
        if (entity.frame.currentFrame < entity.animation.frames - 1) {
            entity.frame.currentFrame += 0.3;
        } else {
            entity.frame.currentFrame = 0;
        }
    }
    if (entity.controls.left && !entity.collision.left && !(entity.controls.up && entity.air === 0)) {
        entity.frame.x -= entity.speed;
        if (entity.animation !== entity.move) {
            entity.frame.currentFrame = 0;
            entity.animation = entity.move;
        }
        entity.frame.mirrored = true;
        if (entity.frame.currentFrame < entity.animation.frames - 1) {
            entity.frame.currentFrame += 0.3;
        } else {
            entity.frame.currentFrame = 0;
        }
    }
    if (((entity.controls.left && entity.controls.right) || (!entity.controls.left && !entity.controls.right)) && !entity.controls.up && entity.animation !== entity.fall && !entity.controls.jump) {
        if (entity.animation !== entity.idle) {
            entity.frame.currentFrame = 0;
            entity.animation = entity.idle;
        }
        if (entity.frame.currentFrame < entity.animation.frames - 1) {
            entity.frame.currentFrame += 0.01;
        } else {
            entity.frame.currentFrame = 0;
        }
    }
    if (entity.air > 0 && entity.air <= entity.maxAir) {
        if (entity.animation !== entity.fall) {
            entity.frame.currentFrame = 0;
            entity.animation = entity.fall;
        }
        if (entity.frame.currentFrame < entity.animation.frames - 1) {
            entity.frame.currentFrame += 0.3;
        } else {
            entity.frame.currentFrame = 0;
        }
    }
    if (entity.collision.down && entity.air !== 0) {
        entity.frame.currentFrame = 0;
        entity.animation = entity.idle;
        if (!entity.controls.jump) {
            entity.air = 0;
        }
    }
    if (entity.controls.jump && (entity.air < entity.maxAir) && (!entity.collision.up)) {
        entity.frame.y += (entity.speed * 2);
        entity.air++;
        if (entity.animation !== entity.jump) {
            entity.frame.currentFrame = 0;
            entity.animation = entity.jump;
        }
        entity.frame.currentFrame = entity.air / entity.maxAir * entity.animation.frames - 1;
        if (entity.frame.currentFrame < entity.animation.frames - 1) {
            entity.frame.currentFrame += 1;
        }
    } else if ((entity.air > entity.maxAir) || (!entity.controls.jump && entity.air > 0) || !entity.collision.down) {
        entity.frame.y -= 9.81 * 1.5;
        entity.air = entity.maxAir;
    }
    if (entity.controls.up === true) {
        if (entity.animation !== entity.attack) {
            entity.frame.currentFrame = 0;
            entity.animation = entity.attack;
        }
        if (entity.frame.currentFrame < entity.animation.frames - 1) {
            entity.frame.currentFrame += 0.1;
        } else {
            for (let i = 0; i < entityList.length; i++) {
                let ent = collision(entity, entityList[i]);
                if (entity.frame.mirrored ? entity.collision.left : entity.collision.right) {
                    if (ent && ent.stats.hp > 0 && ent.stats.invulnerable === 0) {
                        ent.stats.hp -= entity.stats.damage;
                        ent.stats.invulnerable = 20;
                    } else if (ent && ent.stats.hp <= 0) {
                        entityList.splice(entityList.indexOf(ent), 1);
                    }
                }
            }
            entity.controls.up = 2;
        }
    }
}