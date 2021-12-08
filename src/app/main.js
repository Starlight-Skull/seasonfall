import {entityList, player, tileEntityList, tileList} from "./globals.js";
import {debug} from "./globals.js";
import {entityMovement} from "./movement.js";

window.modPlayer = function (key, value) {
    switch (key) {
        case 'hp':
            player.stats.hp = value;
            break;
        case 'mp':
            player.stats.mp = value;
            break;
        case 'maxHP':
            player.stats.maxHP = value;
            break;
        case 'maxMP':
            player.stats.maxMP = value;
            break;
        case 'xp':
            player.stats.xp = value;
            break;
    }
}
window.logInternal = function (object) {
    switch (object) {
        case 'player':
            console.log(player);
            break;
    }
}

window.addEventListener('load', function () {
    const screen = document.getElementById('screen');
    if (!screen.getContext) {
        window.warn('This application is not supported by your browser.');
    }
    const ctx = screen.getContext('2d');
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;
    ctx.imageSmoothingEnabled = false;

    window.addEventListener('keydown', ev => {
        keyLogger(ev.key, true);
    });
    window.addEventListener('keyup', ev => {
        keyLogger(ev.key, false);
    });

    function keyLogger(key, down) {
        switch (key) {
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
                player.controls.jump = down;
                break;
        }
    }

    function drawTile(tile) {
        ctx.fillStyle = tile.color;
        ctx.moveTo(tile.frame.x, tile.frame.y);
        ctx.fillRect(tile.frame.x, window.innerHeight - tile.frame.y - tile.frame.height, tile.frame.width, tile.frame.height);
    }

    function drawEntity(entity) {
        entityMovement(entity);

        if (!entity.animation || debug.showBoxes) {
            ctx.fillStyle = 'rgba(250,0,250,0.5)';
            ctx.moveTo(entity.frame.x, entity.frame.y);
            ctx.fillRect(entity.frame.x, window.innerHeight - entity.frame.y - entity.frame.height, entity.frame.width, entity.frame.height);
        }
        if (entity.animation) {
            if (entity.frame.mirrored) {
                ctx.setTransform(-1, 0, 0, 1, window.innerWidth, 0);
                ctx.drawImage(entity.animation.sprite, entity.animation.x + (entity.animation.width * Math.round(entity.frame.currentFrame)), entity.animation.y, entity.animation.width, entity.animation.height, window.innerWidth - entity.frame.x - entity.animation.width * 5 + Math.abs(entity.frame.width / 2 - entity.animation.width * 5 / 2), window.innerHeight - entity.frame.y - entity.animation.height * 5, entity.animation.width * 5, entity.animation.height * 5);
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            } else {
                ctx.drawImage(entity.animation.sprite, entity.animation.x + (entity.animation.width * Math.round(entity.frame.currentFrame)), entity.animation.y, entity.animation.width, entity.animation.height, entity.frame.x - Math.abs(entity.frame.width / 2 - entity.animation.width * 5 / 2), window.innerHeight - entity.frame.y - entity.animation.width * 5, entity.animation.width * 5, entity.animation.width * 5);
            }
        }

        drawStats(entity);
    }

    function drawStats(entity) {
        // if (entity.stats.mp !== 0) {
        ctx.fillStyle = 'black';
        ctx.fillRect(entity.frame.x + entity.frame.width / 2 - entity.stats.maxHP * 1.5 / 2 - 5, window.innerHeight - entity.frame.y - entity.frame.height - 60, entity.stats.maxHP * 1.5 + 10, 20);
        ctx.fillStyle = 'red';
        ctx.fillRect(entity.frame.x + entity.frame.width / 2 - entity.stats.hp * 1.5 / 2, window.innerHeight - entity.frame.y - entity.frame.height - 55, entity.stats.hp * 1.5, 10);
        // } else {
        //     ctx.fillStyle = 'black';
        //     ctx.fillRect(entity.frame.x + entity.frame.width / 2 - entity.stats.maxHP * 1.5 / 2 - 5, window.innerHeight - entity.frame.y - entity.frame.height - 45, entity.stats.maxHP * 1.5 + 10, 20);
        //     ctx.fillStyle = 'red';
        //     ctx.fillRect(entity.frame.x + entity.frame.width / 2 - entity.stats.hp * 1.5 / 2, window.innerHeight - entity.frame.y - entity.frame.height - 40, entity.stats.hp * 1.5, 10);
        // }
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

    function reDraw() {
        // background
        ctx.fillStyle = 'skyblue';
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

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

        // debug
        // todo scale everything to window size
        let tracked = player;
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText(`${tracked.constructor.name} - ${tracked.animation.name} - ${Math.round(tracked.frame.currentFrame * 100) / 100 + 1}/${tracked.animation.frames}`, 5, 30);
        ctx.fillText(`[${tracked.frame.x}, ${tracked.frame.y}]`, 5, 60);
        ctx.fillText(`↑${tracked.controls.up} ↓${tracked.controls.down} ←${tracked.controls.left} →${tracked.controls.right} ▲${tracked.controls.jump}`, 5, 90);
        ctx.fillText(``, 5, 120);

        requestAnimationFrame(reDraw);
    }

    reDraw();
});