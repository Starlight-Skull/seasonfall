import {entityList, player, tileEntityList, tileList, weather, world} from "./globals.js";
import {debug} from "./globals.js";
import {entityMovement} from "./movement.js";

window.addEventListener('load', function () {
    // setup for drawing
    const screen = document.getElementById('screen');
    if (!screen.getContext) {
        window.alert('This application is not supported by your browser.');
    }
    const ctx = screen.getContext('2d');
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;
    // has to be disabled so pixel art isn't blurry
    ctx.imageSmoothingEnabled = false;
    // call recursive main function
    let time = Date.now(), frames = 0, fps = 0;
    let light = 0;
    reDraw();

    function drawTile(tile) {
        if ((player.frame.x - (tile.frame.x + tile.frame.width) <= 1500) && (tile.frame.x - (player.frame.x + player.frame.width) <= 1500)) {
            // if frame is bigger, sprite is drawn multiple times to cover the whole size
            for (let i = 0; i < tile.frame.height; i += tile.sprite.height * world.scale) {
                for (let j = 0; j < tile.frame.width; j += tile.sprite.width * world.scale) {
                    // tile entities have animation frame instead
                    if (Object.getPrototypeOf(Object.getPrototypeOf(tile)).constructor.name === 'TileEntity') {
                        if (tile.frame.mirrored) {
                            ctx.setTransform(-1, 0, 0, 1, window.innerWidth * 1.5 - (player.frame.x + player.frame.width / 2), player.frame.y - window.innerHeight / 10);
                            ctx.drawImage(tile.animation.sprite, tile.animation.x + (tile.animation.width * Math.round(tile.frame.currentFrame)), tile.animation.y, tile.animation.width, tile.animation.height, window.innerWidth - tile.frame.x - tile.frame.width, window.innerHeight - tile.frame.y - tile.animation.height * world.scale, tile.animation.width * world.scale, tile.animation.height * world.scale);
                            ctx.setTransform(1, 0, 0, 1, window.innerWidth / 2 - (player.frame.x + player.frame.width / 2), player.frame.y - window.innerHeight / 10);
                        } else {
                            ctx.drawImage(tile.animation.sprite, tile.animation.x + (tile.animation.width * Math.round(tile.frame.currentFrame)), tile.animation.y, tile.animation.width, tile.animation.height, tile.frame.x, window.innerHeight - tile.frame.y - tile.animation.height * world.scale, tile.animation.width * world.scale, tile.animation.height * world.scale);
                        }
                    } else {
                        ctx.drawImage(tile.sprite, tile.frame.x + j, window.innerHeight - tile.frame.y - tile.sprite.height * world.scale - i, tile.sprite.width * world.scale, tile.sprite.height * world.scale);
                    }
                }
            }
            // draw a box to show the true hitbox
            if (debug.showBoxes) {
                if (Object.getPrototypeOf(Object.getPrototypeOf(tile)).constructor.name === 'TileEntity') {
                    ctx.fillStyle = 'rgba(0,71,250,0.5)';
                } else if (tile.hasCollision === 2) {
                    ctx.fillStyle = 'rgba(0,250,108,0.5)';
                } else if (tile.hasCollision === false) {
                    ctx.fillStyle = 'rgba(250,200,0,0.5)';
                } else {
                    ctx.fillStyle = 'rgba(65,250,0,0.5)';
                }
                ctx.fillRect(tile.frame.x, window.innerHeight - tile.frame.y - tile.frame.height, tile.frame.width, tile.frame.height);
            }
        }
    }

    function drawEntity(entity) {
        entityMovement(entity);
        // draw current sprite
        if (entity.animation) {
            // mirror if needed
            if (entity.frame.mirrored) {
                ctx.setTransform(-1, 0, 0, 1, window.innerWidth * 1.5 - (player.frame.x + player.frame.width / 2), player.frame.y - window.innerHeight / 10);
                ctx.drawImage(entity.animation.sprite, entity.animation.x + (entity.animation.width * Math.floor(entity.frame.currentFrame)), entity.animation.y, entity.animation.width, entity.animation.height, window.innerWidth - entity.frame.x - entity.animation.width * world.scale + Math.abs(entity.frame.width / 2 - entity.animation.width * world.scale / 2), window.innerHeight - entity.frame.y - entity.animation.height * world.scale, entity.animation.width * world.scale, entity.animation.height * world.scale);
                ctx.setTransform(1, 0, 0, 1, window.innerWidth / 2 - (player.frame.x + player.frame.width / 2), player.frame.y - window.innerHeight / 10);
            } else {
                ctx.drawImage(entity.animation.sprite, entity.animation.x + (entity.animation.width * Math.floor(entity.frame.currentFrame)), entity.animation.y, entity.animation.width, entity.animation.height, entity.frame.x - Math.abs(entity.frame.width / 2 - entity.animation.width * world.scale / 2), window.innerHeight - entity.frame.y - entity.animation.height * world.scale, entity.animation.width * world.scale, entity.animation.height * world.scale);
            }
        }
        // draw a box to show the true hitbox
        if (!entity.animation || debug.showBoxes) {
            ctx.fillStyle = 'rgba(250,0,250,0.5)';
            ctx.fillRect(entity.frame.x, window.innerHeight - entity.frame.y - entity.frame.height, entity.frame.width, entity.frame.height);
        }
        drawStats(entity);
    }

    function drawStats(entity) {
        if (entity.constructor.name === 'Hero') {
            // name
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(entity.frame.x + entity.frame.width / 2 - (debug.username.length * 8) - 5, window.innerHeight - entity.frame.y - entity.frame.height - 90, debug.username.length * 16 + 10, 30);
            ctx.fillStyle = 'rgba(255,255,255,1)';
            ctx.font = '25px Roboto';
            ctx.fillText(debug.username, entity.frame.x + entity.frame.width / 2 - (debug.username.length * 8), window.innerHeight - entity.frame.y - entity.frame.height - 65);
            // xp
            if (entity.stats.xp !== 0) {
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fillRect(entity.frame.x + entity.frame.width / 2 - (entity.stats.xp.toString().length * 8) - 5, window.innerHeight - entity.frame.y - entity.frame.height - 120, entity.stats.xp.toString().length * 16 + 10, 30);
                ctx.fillStyle = 'rgba(0,255,0,1)';
                ctx.font = '25px Roboto';
                ctx.fillText(entity.stats.xp, entity.frame.x + entity.frame.width / 2 - (entity.stats.xp.toString().length * 8), window.innerHeight - entity.frame.y - entity.frame.height - 95);
            }
        } else {
            // hp
            if (entity.stats.hp > 0) {
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fillRect(entity.frame.x + entity.frame.width / 2 - entity.stats.maxHP * 1.5 / 2 - 5, window.innerHeight - entity.frame.y - entity.frame.height - 60, entity.stats.maxHP * 1.5 + 10, 20);
                ctx.fillStyle = 'rgba(255,0,0,0.7)';
                ctx.fillRect(entity.frame.x + entity.frame.width / 2 - entity.stats.hp * 1.5 / 2, window.innerHeight - entity.frame.y - entity.frame.height - 55, entity.stats.hp * 1.5, 10);
            }
            // mp
            if (entity.stats.mp > 0) {
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fillRect(entity.frame.x + entity.frame.width / 2 - entity.stats.maxMP * 1.5 / 2 - 5, window.innerHeight - entity.frame.y - entity.frame.height - 40, entity.stats.maxMP * 1.5 + 10, 15);
                ctx.fillStyle = 'rgba(0,0,255,0.7)';
                ctx.fillRect(entity.frame.x + entity.frame.width / 2 - entity.stats.mp * 1.5 / 2, window.innerHeight - entity.frame.y - entity.frame.height - 40, entity.stats.mp * 1.5, 10);
            }
            // debug
            if (debug.showTrackedEntity) {
                let val = `${entity.controls.up ? '↑' : ''}${entity.controls.down ? '↓' : ''}${entity.controls.left ? '←' : ''}${entity.controls.right ? '→' : ''}${entity.controls.jump ? '▲' : ''}`;
                ctx.fillStyle = 'rgba(0,0,0,0.5)';
                ctx.fillRect(entity.frame.x + entity.frame.width / 2 - (val.length * 8) - 5, window.innerHeight - entity.frame.y - entity.frame.height - 90, val.length * 16 + 10, 30);
                ctx.fillStyle = 'rgba(255,255,255,1)';
                ctx.font = '25px Roboto';
                ctx.fillText(val, entity.frame.x + entity.frame.width / 2 - (val.length * 8), window.innerHeight - entity.frame.y - entity.frame.height - 65);
            }
        }
    }

    function reDraw() {
        frames++;
        if (Date.now() - time > 1000) {
            time = Date.now();
            fps = frames;
            frames = 0;
        }
        // update screen in case of window resize
        screen.width = window.innerWidth;
        screen.height = window.innerHeight;
        ctx.imageSmoothingEnabled = false;
        // move context to player
        ctx.translate(window.innerWidth / 2 - (player.frame.x + player.frame.width / 2), player.frame.y - window.innerHeight / 10);
        // draw world
        ctx.fillStyle = 'skyblue';
        ctx.fillRect(0, window.innerHeight, world.width, -world.height);
        for (let i = 0; i < tileList.length; i++) {
            drawTile(tileList[i]);
        }
        for (let i = 0; i < tileEntityList.length; i++) {
            drawTile(tileEntityList[i]);
        }
        for (let i = 0; i < entityList.length; i++) {
            drawEntity(entityList[i]);
        }
        drawEntity(player);
        // reset context
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.translate(0, 0);
        // light
        if (weather.time >= 1130 && weather.time <= 1230) {
            light = 0;
        } else if (weather.time >= weather.sunrise && weather.time < 1130) {
            light = ((1200 - weather.time) / (1200 - weather.sunrise)) - 0.15;
        } else if (weather.time > 1230 && weather.time <= weather.sunset) {
            light = ((weather.time - 1200) / (weather.sunset - 1200)) - 0.15;
        } else {
            light = 0.9;
        }
        ctx.fillStyle = 'rgba(0,0,0,' + light + ')';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        // player hp
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(20, 20, player.stats.maxHP * 5 + 10, 30);
        ctx.fillStyle = 'rgba(255,0,0,0.7)';
        ctx.fillRect(25, 25, player.stats.hp * 5, 20);
        // player mp
        if (player.stats.mp !== 0) {
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(20, 50, player.stats.maxMP * 5 + 10, 15);
            ctx.fillStyle = 'rgba(0,0,255,0.7)';
            ctx.fillRect(25, 50, player.stats.mp * 5, 10);
        }
        // debug info
        if (debug.showTrackedEntity) {
            let tracked = player;
            ctx.fillStyle = 'yellow';
            ctx.font = '30px Arial';
            ctx.fillText(`anim: ${tracked.constructor.name} - ${tracked.animation.name} - ${Math.round(tracked.frame.currentFrame * 100) / 100 + 1}/${tracked.animation.frames}`, 5, 30);
            ctx.fillText(`pos: [${tracked.frame.x}, ${tracked.frame.y}]         fps: ${fps} ${frames}`, 5, 60);
            ctx.fillText(`movement: ${tracked.controls.up ? '↑ ' : ''}${tracked.controls.down ? '↓ ' : ''}${tracked.controls.left ? '← ' : ''}${tracked.controls.right ? '→ ' : ''}${tracked.controls.jump ? '▲ ' : ''}`, 5, 90);
            ctx.fillText(`light: ${light}`, 5, 120);
        }
        requestAnimationFrame(reDraw);
    }
});