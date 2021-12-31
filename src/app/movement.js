import {collision} from "./helpers.js";
import {entityList, player, tileEntityList, tileList, world} from "./globals.js";

export function entityMovement(entity) {
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
    if (entity.animation === entity.death && entity.stats.hp <= 0) {
        if (entity.frame.currentFrame < entity.animation.frames - 1) {
            entity.frame.currentFrame += entity.animation.speed;
        }
        entity.controls.attack = false;
        entity.controls.jump = false;
        entity.controls.down = false;
        entity.controls.left = false;
        entity.controls.right = false;
        for (let i = 0; i < tileList.length; i++) {
            collision(entity, tileList[i]);
        }
        if (!entity.collision.down && entity.hasCollision) {
            entity.frame.y -= 9.81 * 2;
        }
    } else {
        if (!entity.controls.attack && entity.frame.width !== entity.defaultWidth) {
            entity.frame.width = entity.defaultWidth;
            entity.frame.x += (entity.attackWidth - entity.defaultWidth) / 2;
        }
        if (entity !== player) {
            if (entity.cooldown > 0) {
                entity.cooldown--;
            } else if (entity.cooldown !== -1) {
                if (Math.abs(entity.frame.x - player.frame.x) < 500) {
                    entity.controls.attack = Math.abs(entity.frame.x - (player.frame.x + player.frame.width)) < 15 || Math.abs(player.frame.x - (entity.frame.x + entity.frame.width)) < 15;
                    if (player.frame.y - entity.frame.y > 0 && entity.air !== entity.maxAir) {
                        entity.controls.jump = true;
                        entity.controls.down = false;
                    } else if (entity.frame.y - player.frame.y > 0) {
                        entity.controls.jump = false;
                        entity.controls.down = true;
                    } else {
                        entity.controls.jump = false;
                        entity.controls.down = false;
                    }
                    if (entity.frame.x - (player.frame.x + player.frame.width) > 5 && (entity.frame.x - (player.frame.x + player.frame.width) < 500)) {
                        entity.controls.left = true;
                        entity.controls.right = false;
                    } else if (player.frame.x - (entity.frame.x + entity.frame.width) > 5 && (player.frame.x - (entity.frame.x + entity.frame.width) < 500)) {
                        entity.controls.left = false;
                        entity.controls.right = true;
                    }
                    entity.cooldown = 20;
                } else {
                    entity.controls.left = false;
                    entity.controls.right = false;
                }
            }
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
        if (entity.collision.down && entity.air !== 0) {
            if (!entity.controls.left && !entity.controls.right) {
                entity.frame.currentFrame = 0;
                entity.animation = entity.idle;
            }
            if (!entity.controls.jump) {
                entity.air = 0;
            }
        }
        if (entity.controls.right && !entity.collision.right && !(entity.controls.attack && (entity.air === 0 || entity.air === entity.maxAir))) {
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
        if (entity.controls.left && !entity.collision.left && !(entity.controls.attack && (entity.air === 0 || entity.air === entity.maxAir))) {
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
        if (((entity.controls.left && entity.controls.right) || (!entity.controls.left && !entity.controls.right)) && !entity.controls.attack && entity.animation !== entity.fall && !entity.controls.jump) {
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
        if (entity.controls.jump && (entity.air < entity.maxAir) && !entity.collision.up && entity.hasCollision) {
            entity.frame.y += 20;
            entity.air++;
            if (entity.animation !== entity.jump) {
                entity.frame.currentFrame = 0;
                entity.animation = entity.jump;
            }
            entity.frame.currentFrame = entity.air / entity.maxAir * entity.animation.frames - 1;
            if (entity.frame.currentFrame < entity.animation.frames - 1) {
                entity.frame.currentFrame += entity.animation.speed;
            }
        } else if (((entity.air > entity.maxAir) || (!entity.controls.jump && entity.air > (entity.maxAir / 2)) || !entity.collision.down) && entity.hasCollision) {
            entity.frame.y -= 9.81 * 2;
            entity.air = entity.maxAir;
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
        if (!entity.hasCollision) {
            entity.air = 0;
            if (entity.controls.jump) {
                entity.frame.y += entity.stats.speed;
            }
            if (entity.controls.down) {
                entity.frame.y -= entity.stats.speed;
            }
        }
        entity.collision.up = false;
        entity.collision.down = false;
        entity.collision.left = false;
        entity.collision.right = false;
        if (entity.controls.attack === true) {
            if (entity.animation !== entity.attack && !entity.controls.jump) {
                entity.frame.currentFrame = 0;
                entity.animation = entity.attack;
                entity.frame.width = entity.attackWidth;
                entity.frame.x -= (entity.attackWidth - entity.defaultWidth) / 2;
            }
            if (entity.frame.currentFrame < entity.animation.frames - 1) {
                entity.frame.currentFrame += entity.animation.speed;
            } else {
                for (let i = 0; i < entityList.length; i++) {
                    let entity2;
                    if (entity.constructor.name === 'Hero') {
                        entity2 = collision(entity, entityList[i], true);
                    } else {
                        entity2 = collision(entity, player, true);
                    }
                    if (entity2 && (entity.frame.mirrored ? entity.collision.left : entity.collision.right)) {
                        if (entity2.stats.hp > 0) {
                            entity2.stats.hp -= entity.stats.damage;
                        }
                        if (entity2.stats.hp <= 0 && entity2.animation !== entity2.death) {
                            entity2.animation = entity2.death;
                            entity2.frame.currentFrame = 0;
                            entity.stats.xp += entity2.stats.xp;
                        }
                    }
                }
                for (let i = 0; i < tileEntityList.length; i++) {
                    let tile;
                    if (entity.constructor.name === 'Hero') {
                        tile = collision(entity, tileEntityList[i], true);
                    }
                    if (tile) {
                        tile.activate();
                    }
                }
                entity.controls.attack = 2;
            }
        }
    }
}