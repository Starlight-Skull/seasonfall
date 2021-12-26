import {entityList, player, tileEntityList, tileList, weather, world} from "./globals.js";
import {debug} from "./globals.js";
import {entityMovement} from "./movement.js";

window.addEventListener('load', function () {
    const screen = document.getElementById('screen');
    if (!screen.getContext) {
        window.alert('This application is not supported by your browser.');
    }
    const ctx = screen.getContext('2d');
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;
    ctx.imageSmoothingEnabled = false;

    function drawTile(tile) {
        if (debug.showBoxes) {
            ctx.fillStyle = 'rgba(65,250,0,0.5)';
            ctx.fillRect(tile.frame.x, window.innerHeight - tile.frame.y - tile.frame.height, tile.frame.width, tile.frame.height);
        }
        ctx.drawImage(tile.sprite, tile.frame.x, window.innerHeight - tile.frame.y - tile.sprite.height * world.scale, tile.sprite.width * world.scale, tile.sprite.height * world.scale);
    }

    function drawEntity(entity) {
        entityMovement(entity);
        if (!entity.animation || debug.showBoxes) {
            ctx.fillStyle = 'rgba(250,0,250,0.5)';
            ctx.fillRect(entity.frame.x, window.innerHeight - entity.frame.y - entity.frame.height, entity.frame.width, entity.frame.height);
        }
        if (entity.animation) {
            if (entity.frame.mirrored) {
                ctx.setTransform(-1, 0, 0, 1, window.innerWidth * 1.5 - (player.frame.x + player.frame.width / 2), player.frame.y - window.innerHeight / 10);
                ctx.drawImage(entity.animation.sprite, entity.animation.x + (entity.animation.width * Math.round(entity.frame.currentFrame)), entity.animation.y, entity.animation.width, entity.animation.height, window.innerWidth - entity.frame.x - entity.animation.width * world.scale + Math.abs(entity.frame.width / 2 - entity.animation.width * world.scale / 2), window.innerHeight - entity.frame.y - entity.animation.height * world.scale, entity.animation.width * world.scale, entity.animation.height * world.scale);
                ctx.setTransform(1, 0, 0, 1, window.innerWidth / 2 - (player.frame.x + player.frame.width / 2), player.frame.y - window.innerHeight / 10);
            } else {
                ctx.drawImage(entity.animation.sprite, entity.animation.x + (entity.animation.width * Math.round(entity.frame.currentFrame)), entity.animation.y, entity.animation.width, entity.animation.height, entity.frame.x - Math.abs(entity.frame.width / 2 - entity.animation.width * world.scale / 2), window.innerHeight - entity.frame.y - entity.animation.width * world.scale, entity.animation.width * world.scale, entity.animation.width * world.scale);
            }
        }
        drawStats(entity);
    }

    function drawStats(entity) {
        ctx.fillStyle = 'black';
        ctx.fillRect(entity.frame.x + entity.frame.width / 2 - entity.stats.maxHP * 1.5 / 2 - 5, window.innerHeight - entity.frame.y - entity.frame.height - 60, entity.stats.maxHP * 1.5 + 10, 20);
        ctx.fillStyle = 'red';
        ctx.fillRect(entity.frame.x + entity.frame.width / 2 - entity.stats.hp * 1.5 / 2, window.innerHeight - entity.frame.y - entity.frame.height - 55, entity.stats.hp * 1.5, 10);
        if (entity.stats.mp !== 0) {
            ctx.fillStyle = 'black';
            ctx.fillRect(entity.frame.x + entity.frame.width / 2 - entity.stats.maxMP * 1.5 / 2 - 5, window.innerHeight - entity.frame.y - entity.frame.height - 45, entity.stats.maxMP * 1.5 + 10, 20);
            ctx.fillStyle = 'blue';
            ctx.fillRect(entity.frame.x + entity.frame.width / 2 - entity.stats.mp * 1.5 / 2, window.innerHeight - entity.frame.y - entity.frame.height - 40, entity.stats.mp * 1.5, 10);
        }

        ctx.fillStyle = 'black';
        ctx.fillRect(entity.frame.x + entity.frame.width / 2 - (entity.constructor.name.length * 8) - 5, window.innerHeight - entity.frame.y - entity.frame.height - 90, entity.constructor.name.length * 16 + 10, 30);
        ctx.fillStyle = 'white';
        ctx.font = '25px Roboto';
        ctx.fillText(`${entity.constructor.name}`, entity.frame.x + entity.frame.width / 2 - (entity.constructor.name.length * 8), window.innerHeight - entity.frame.y - entity.frame.height - 65);

        if (entity.stats.xp !== 0) {
            ctx.fillStyle = 'black';
            ctx.fillRect(entity.frame.x + entity.frame.width / 2 - (entity.stats.xp.toString().length * 8) - 5, window.innerHeight - entity.frame.y - entity.frame.height - 120, entity.stats.xp.toString().length * 16 + 10, 30);
            ctx.fillStyle = 'yellow';
            ctx.font = '25px Roboto';
            ctx.fillText(entity.stats.xp, entity.frame.x + entity.frame.width / 2 - (entity.stats.xp.toString().length * 8), window.innerHeight - entity.frame.y - entity.frame.height - 95);
        }
    }

    reDraw();
    function reDraw() {
        screen.width = window.innerWidth;
        screen.height = window.innerHeight;
        ctx.imageSmoothingEnabled = false;

        ctx.translate(window.innerWidth / 2 - (player.frame.x + player.frame.width / 2), player.frame.y - window.innerHeight / 10);

        ctx.fillStyle = 'skyblue';
        ctx.fillRect(0, window.innerHeight, world.width, window.innerHeight - world.height);
        for (let i = 0; i < tileList.length; i++) {
            drawTile(tileList[i]);
        }
        for (let i = 0; i < entityList.length; i++) {
            drawEntity(entityList[i]);
        }
        for (let i = 0; i < tileEntityList.length; i++) {
            drawTile(tileEntityList[i]);
        }
        drawEntity(player);

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.translate(0, 0);

        if (weather.time < weather.sunrise || weather.time > weather.sunset) {
            ctx.fillStyle = 'rgba(0,0,0,0.9)';
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
        }

        // debug
        if (debug.showTrackedEntity) {
            let tracked = player;
            ctx.fillStyle = 'black';
            ctx.font = '30px Arial';
            ctx.fillText(`anim: ${tracked.constructor.name} - ${tracked.animation.name} - ${Math.round(tracked.frame.currentFrame * 100) / 100 + 1}/${tracked.animation.frames}`, 5, 30);
            ctx.fillText(`pos: [${tracked.frame.x}, ${tracked.frame.y}]`, 5, 60);
            ctx.fillText(`move: ↑${tracked.controls.up} ↓${tracked.controls.down} ←${tracked.controls.left} →${tracked.controls.right} ▲${tracked.controls.jump}`, 5, 90);
            ctx.fillText(`${weather.time < weather.sunrise} ${weather.time > weather.sunset}`, 5, 120);
        }
        requestAnimationFrame(reDraw);
    }
});