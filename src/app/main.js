;(function () {
    'use strict';

    window.addEventListener('load', function () {
        const screen = document.getElementById('screen');
        if (!screen.getContext) {
            window.warn('This application is not supported by your browser.');
        }
        const ctx = screen.getContext('2d');

        const player = {
            color: 'red',
            x: 0,
            y: 0,
            width: 10,
            height: 30,
            speed: 3,
            air: 0,
            airMax: 15,
            momentum: 0,
            controls: {
                up: false,
                down: false,
                left: false,
                right: false,
                jump: false
            },
            collision: {
                upLeft: false,
                upRight: false,
                downLeft: false,
                downRight: false
            },
            cooldown: -1
        }

        const npcList = [
            // {
            //     color: 'blue',
            //     x: 0,
            //     y: 0,
            //     width: 15,
            //     height: 40,
            //     speed: 2,
            //     air: 0,
            //     airMax: 20,
            //     controls: {
            //         up: false,
            //         down: false,
            //         left: false,
            //         right: false,
            //         jump: false
            //     },
            //     cooldown: 20
            // }, {
            //     color: 'purple',
            //     x: 0,
            //     y: 0,
            //     width: 20,
            //     height: 15,
            //     speed: 5,
            //     air: 0,
            //     airMax: 7,d
            //     controls: {
            //         up: false,
            //         down: false,
            //         left: false,
            //         right: false,
            //         jump: false
            //     },
            //     cooldown: 25
            // }
        ];

        const tileList = [
            {
                color: 'black',
                x: 100,
                y: 0,
                width: 30,
                height: 30,
                collision: true
            },
            {
                color: 'black',
                x: 200,
                y: 20,
                width: 30,
                height: 30,
                collision: true
            }
        ];

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
            entity.collision.upLeft = false;
            entity.collision.upRight = false;
            entity.collision.downLeft = false;
            entity.collision.downRight = false;
            for (let i = 0; i < tileList.length; i++) {
                collision(entity, tileList[i])
            }

            if (entity.cooldown > 0) {
                entity.cooldown--;
            } else if (entity.cooldown !== -1) {
                entity.controls.right = Math.round(Math.random());
                entity.controls.left = Math.round(Math.random());
                entity.controls.jump = Math.round(Math.random());
                entity.cooldown = 20;
            }

            if (entity.controls.right && (entity.x < (screen.width - entity.width)) &&
                (
                    (entity.collision.downLeft && !entity.collision.downRight) ||
                    (!entity.collision.downLeft && !entity.collision.downRight) ||
                    (entity.collision.downLeft && entity.collision.downRight)
                ) && (
                    (entity.collision.upLeft && !entity.collision.upRight) ||
                    (!entity.collision.upLeft && !entity.collision.upRight) ||
                    (entity.collision.upLeft && entity.collision.upRight)
                )
            ) {
                entity.x += entity.speed;
            }
            if (entity.controls.left && entity.x > 0 &&
                (
                    (!entity.collision.downLeft && entity.collision.downRight) ||
                    (!entity.collision.downLeft && !entity.collision.downRight) ||
                    (entity.collision.downLeft && entity.collision.downRight)
                ) && (
                    (!entity.collision.upLeft && entity.collision.upRight) ||
                    (!entity.collision.upLeft && !entity.collision.upRight) ||
                    (entity.collision.upLeft && entity.collision.upRight)
                )
            ) {
                entity.x -= entity.speed;
            }

            if (entity.controls.jump && (entity.air < entity.airMax)) {
                entity.y += (entity.speed * 1.5);
                entity.air++;
            } else if (((entity.air >= entity.airMax) || (!entity.controls.jump && entity.air > 0)) &&
                (
                    (entity.collision.downLeft && entity.collision.upLeft) ||
                    (!entity.collision.downLeft && !entity.collision.upLeft) ||
                    (entity.collision.downLeft && entity.collision.upLeft)
                ) && (
                    (!entity.collision.downRight && !entity.collision.upRight) ||
                    (!entity.collision.downRight && !entity.collision.upRight) ||
                    (entity.collision.downRight && entity.collision.upRight)
                )
            ) {
                if (entity.y > 0) {
                    entity.y -= 2;
                    entity.air = entity.airMax;
                } else if (entity.y <= 0) {
                    entity.y = 0;
                    entity.air = 0;
                }
            }

            ctx.fillStyle = entity.color;
            ctx.moveTo(entity.x, entity.y);
            ctx.fillRect(entity.x, screen.height - entity.y - entity.height, entity.width, entity.height);
        }

        function drawTile(Tile) {
            ctx.fillStyle = Tile.color;
            ctx.moveTo(Tile.x, Tile.y);
            ctx.fillRect(Tile.x, screen.height - Tile.y - Tile.height, Tile.width, Tile.height);
        }

        function collision(entity, tile) {
            entity.collision.upLeft = entity.collision.upLeft ? entity.collision.upLeft :
                entity.x >= tile.x &&
                entity.x <= tile.x + tile.width &&
                entity.y + entity.height >= tile.y &&
                entity.y + entity.height <= tile.y + tile.height;
            entity.collision.upRight = entity.collision.upRight ? entity.collision.upRight :
                entity.x + entity.width >= tile.x &&
                entity.x + entity.width <= tile.x + tile.width &&
                entity.y + entity.height >= tile.y &&
                entity.y + entity.height <= tile.y + tile.height;
            entity.collision.downLeft = entity.collision.downLeft ? entity.collision.downLeft :
                entity.x >= tile.x &&
                entity.x <= tile.x + tile.width &&
                entity.y >= tile.y &&
                entity.y <= tile.y + tile.height;
            entity.collision.downRight = entity.collision.downRight ? entity.collision.downRight :
                entity.x + entity.width >= tile.x &&
                entity.x + entity.width <= tile.x + tile.width &&
                entity.y >= tile.y &&
                entity.y <= tile.y + tile.height;
        }

        function reDraw() {
            // background
            ctx.fillStyle = 'skyblue';
            ctx.fillRect(0, 0, screen.width, screen.height);

            for (let i = 0; i < tileList.length; i++) {
                drawTile(tileList[i]);
            }
            for (let i = 0; i < npcList.length; i++) {
                drawEntity(npcList[i]);
            }
            drawEntity(player);


            // debug
            ctx.fillStyle = 'black';
            ctx.fillText(`${player.collision.upLeft}, ${player.collision.upRight}`, 5, 10);
            ctx.fillText(`${player.collision.downLeft}, ${player.collision.downRight}`, 5, 20);

            requestAnimationFrame(reDraw);
        }

        reDraw();
    });
})();