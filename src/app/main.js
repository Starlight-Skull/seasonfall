import {entityMovement} from "./movement.js";
import {border, npcList, player, tileList} from "./world.js";

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
    const debug = false;

    window.addEventListener('keydown', ev => {
        keyLogger(ev.key, true);
    });
    window.addEventListener('keyup', ev => {
        keyLogger(ev.key, false);
    });

    function keyLogger(key, down) {
        switch (key) {
            case 'w':
                player.controls.up = down;
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

    function drawEntity(entity) {
        entityMovement(entity);

        if (entity.frame.sprite === '' || debug) {
            ctx.fillStyle = 'yellow';
            ctx.moveTo(entity.frame.x, entity.frame.y);
            ctx.fillRect(entity.frame.x, screen.height - entity.frame.y - entity.frame.height, entity.frame.width, entity.frame.height);
        }
        if (entity.frame.sprite !== '') {
            if (entity.frame.mirrored) {
                ctx.setTransform(-1, 0, 0, 1, screen.width, 0);
                ctx.drawImage(
                    entity.frame.sprite,
                    entity.frame.sX + (entity.frame.sWidth * Math.round(entity.frame.currentFrame)),
                    entity.frame.sY,
                    entity.frame.sWidth,
                    entity.frame.sHeight,
                    screen.width - entity.frame.x - entity.frame.sWidth * 5 + Math.abs(entity.frame.width / 2 - entity.frame.sWidth * 5 / 2),
                    screen.height - entity.frame.y - entity.frame.sHeight * 5,
                    entity.frame.sWidth * 5,
                    entity.frame.sHeight * 5
                );
                ctx.setTransform(1, 0, 0, 1, 0, 0);
            } else {
                ctx.drawImage(
                    entity.frame.sprite,
                    entity.frame.sX + (entity.frame.sWidth * Math.round(entity.frame.currentFrame)),
                    entity.frame.sY,
                    entity.frame.sWidth,
                    entity.frame.sHeight,
                    entity.frame.x - Math.abs(entity.frame.width / 2 - entity.frame.sWidth * 5 / 2),
                    screen.height - entity.frame.y - entity.frame.sWidth * 5,
                    entity.frame.sWidth * 5,
                    entity.frame.sWidth * 5
                );
            }
        }

        if (entity.stats.mp !== 0) {
            ctx.fillStyle = 'black';
            ctx.fillRect(
                entity.frame.x + entity.frame.width / 2 - entity.stats.maxHP * 1.5 / 2 - 5,
                screen.height - entity.frame.y - entity.frame.height - 60,
                entity.stats.maxHP * 1.5 + 10,
                20
            );
            ctx.fillStyle = 'red';
            ctx.fillRect(
                entity.frame.x + entity.frame.width / 2 - entity.stats.hp * 1.5 / 2,
                screen.height - entity.frame.y - entity.frame.height - 55,
                entity.stats.hp * 1.5,
                10
            );
        } else {
            ctx.fillStyle = 'black';
            ctx.fillRect(
                entity.frame.x + entity.frame.width / 2 - entity.stats.maxHP * 1.5 / 2 - 5,
                screen.height - entity.frame.y - entity.frame.height - 45,
                entity.stats.maxHP * 1.5 + 10,
                20
            );
            ctx.fillStyle = 'red';
            ctx.fillRect(
                entity.frame.x + entity.frame.width / 2 - entity.stats.hp * 1.5 / 2,
                screen.height - entity.frame.y - entity.frame.height - 40,
                entity.stats.hp * 1.5,
                10
            );
        }
        if (entity.stats.mp !== 0) {
            ctx.fillStyle = 'black';
            ctx.fillRect(
                entity.frame.x + entity.frame.width / 2 - entity.stats.maxMP * 1.5 / 2 - 5,
                screen.height - entity.frame.y - entity.frame.height - 45,
                entity.stats.maxMP * 1.5 + 10,
                20
            );
            ctx.fillStyle = 'blue';
            ctx.fillRect(
                entity.frame.x + entity.frame.width / 2 - entity.stats.mp * 1.5 / 2,
                screen.height - entity.frame.y - entity.frame.height - 40,
                entity.stats.mp * 1.5,
                10
            );
        }
        if (entity.stats.xp !== 0) {
            ctx.fillStyle = 'black';
            ctx.fillRect(
                entity.frame.x + entity.frame.width / 2 - (entity.stats.xp.toString().length * 8) - 5,
                screen.height - entity.frame.y - entity.frame.height - 90,
                entity.stats.xp.toString().length * 16 + 10,
                30
            );
            ctx.fillStyle = 'yellow';
            ctx.font = '25px Roboto';
            ctx.fillText(
                entity.stats.xp,
                entity.frame.x + entity.frame.width / 2 - (entity.stats.xp.toString().length * 8),
                screen.height - entity.frame.y - entity.frame.height - 65
            );
        }
    }

    function drawTile(tile) {
        ctx.fillStyle = tile.color;
        ctx.moveTo(tile.frame.x, tile.frame.y);
        ctx.fillRect(tile.frame.x, screen.height - tile.frame.y - tile.frame.height, tile.frame.width, tile.frame.height);
    }

    function reDraw() {
        // background
        ctx.fillStyle = 'skyblue';
        ctx.fillRect(0, 0, screen.width, screen.height);

        for (let i = 0; i < border.length; i++) {
            drawTile(border[i]);
        }
        for (let i = 0; i < tileList.length; i++) {
            drawTile(tileList[i]);
        }
        for (let i = 0; i < npcList.length; i++) {
            drawEntity(npcList[i]);
        }
        drawEntity(player);

        // debug
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText(``, 5, 30);
        ctx.fillText(``, 5, 60);
        ctx.fillText(``, 5, 90);
        requestAnimationFrame(reDraw);
    }

    reDraw();
});