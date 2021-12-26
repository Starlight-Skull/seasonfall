import {collision} from "./helpers.js";
import {entityList, player, tileEntityList, tileList, world} from "./globals.js";

export function entityMovement(entity) {
    if (entity.frame.x > world.width || entity.frame.x < 0 || entity.frame.y > world.height || entity.frame.y < 0) {
        entity.frame.x = world.originX;
        entity.frame.y = world.originY;
    }
    if (entity.cooldown > 0) {
        entity.cooldown--;
    } else if (entity.cooldown !== -1) {
        entity.controls.up = Math.round(Math.random());
        entity.controls.right = Math.round(Math.random());
        entity.controls.left = Math.round(Math.random());
        entity.controls.jump = Math.round(Math.random());
        entity.cooldown = 100 / entity.stats.speed;
    }
    entity.collision.up = false;
    entity.collision.down = false;
    entity.collision.left = false;
    entity.collision.right = false;
    for (let i = 0; i < tileList.length; i++) {
        collision(entity, tileList[i]);
    }
    for (let i = 0; i < tileEntityList.length; i++) {
        collision(entity, tileEntityList[i]);
    }

    if (entity.air > 0 && entity.air <= entity.maxAir && !entity.controls.jump) {
        if (entity.animation !== entity.fall) {
            entity.frame.currentFrame = 0;
            entity.animation = entity.fall;
        }
        if (entity.frame.currentFrame < entity.animation.frames - 1) {
            entity.frame.currentFrame += entity.animation.speed;
        } else {
            entity.frame.currentFrame = 0;
        }
    }
    if (entity.collision.down && entity.air !== 0) {
        if (!entity.controls.left && !entity.controls.right) {
            entity.frame.currentFrame = 0;
            entity.animation = entity.idle;
        }
        if (!entity.controls.jump) {
            entity.air = 0;
        }
    }

    if (entity.controls.right && !entity.collision.right && !(entity.controls.up && (entity.air === 0 || entity.air === entity.maxAir))) {
        entity.frame.x += entity.stats.speed;
        if (entity.animation !== entity.move) {
            entity.frame.currentFrame = 0;
            entity.animation = entity.move;
        }
        entity.frame.mirrored = false;
        if (entity.frame.currentFrame < entity.animation.frames - 1) {
            entity.frame.currentFrame += entity.animation.speed;
        } else {
            entity.frame.currentFrame = 0;
        }
    }
    if (entity.controls.left && !entity.collision.left && !(entity.controls.up && (entity.air === 0 || entity.air === entity.maxAir))) {
        entity.frame.x -= entity.stats.speed;
        if (entity.animation !== entity.move) {
            entity.frame.currentFrame = 0;
            entity.animation = entity.move;
        }
        entity.frame.mirrored = true;
        if (entity.frame.currentFrame < entity.animation.frames - 1) {
            entity.frame.currentFrame += entity.animation.speed;
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
            entity.frame.currentFrame += entity.animation.speed;
        } else {
            entity.frame.currentFrame = 0;
        }
    }
    if (entity.controls.jump && (entity.air < entity.maxAir) && (!entity.collision.up)) {
        entity.frame.y += (entity.stats.speed * 2);
        entity.air++;
        if (entity.animation !== entity.jump) {
            entity.frame.currentFrame = 0;
            entity.animation = entity.jump;
        }
        entity.frame.currentFrame = entity.air / entity.maxAir * entity.animation.frames - 1;
        if (entity.frame.currentFrame < entity.animation.frames - 1) {
            entity.frame.currentFrame += entity.animation.speed;
        }
    } else if (((entity.air > entity.maxAir) || (!entity.controls.jump && entity.air > 0) || !entity.collision.down) && entity.hasCollision) {
        entity.frame.y -= 9.81 * 1.5;
        entity.air = entity.maxAir;
    }
    if (!entity.hasCollision) {
        entity.air = 0;
        if (entity.controls.down) {
            entity.frame.y -= (entity.stats.speed * 2);
        }
    }
    entity.collision.up = false;
    entity.collision.down = false;
    entity.collision.left = false;
    entity.collision.right = false;
    if (entity.controls.up === true) {
        if (entity.animation !== entity.attack) {
            entity.frame.currentFrame = 0;
            entity.animation = entity.attack;
        }
        if (entity.frame.currentFrame < entity.animation.frames - 1) {
            entity.frame.currentFrame += entity.animation.speed;
        } else {
            for (let i = 0; i < entityList.length; i++) {
                let ent;
                if (entity.constructor.name === 'Hero') {
                    ent = collision(entity, entityList[i], true);
                } else {
                    ent = collision(entity, player, true);
                }
                if (ent && entity.frame.mirrored ? entity.collision.left : entity.collision.right) {
                    if (ent.stats.hp > 0) {
                        ent.stats.hp -= entity.stats.damage;
                    } else if (ent.stats.hp <= 0) {
                        entityList.splice(entityList.indexOf(ent), 1);
                        entity.stats.xp += ent.stats.xp;
                    }
                }
            }
            for (let i = 0; i < tileEntityList.length; i++) {
                let til;
                if (entity.constructor.name === 'Hero') {
                    til = collision(entity, tileEntityList[i], true);
                }
                if (til) {
                    til.activate();
                }
            }
            entity.controls.up = 2;
        }
    }
}