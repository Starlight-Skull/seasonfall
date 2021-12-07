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
            speed: 2.5,
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
                up: false,
                down: false,
                left: false,
                right: false
            },
            cooldown: -1
        }

        const npcList = [
            {
                color: 'blue',
                x: 0,
                y: 0,
                width: 15,
                height: 40,
                speed: 2,
                air: 0,
                airMax: 20,
                controls: {
                    up: false,
                    down: false,
                    left: false,
                    right: false,
                    jump: false
                },
                collision: {
                    up: false,
                    down: false,
                    left: false,
                    right: false
                },
                cooldown: 20
            }, {
                color: 'purple',
                x: 0,
                y: 0,
                width: 20,
                height: 15,
                speed: 5,
                air: 0,
                airMax: 7,
                controls: {
                    up: false,
                    down: false,
                    left: false,
                    right: false,
                    jump: false
                },
                collision: {
                    up: false,
                    down: false,
                    left: false,
                    right: false
                },
                cooldown: 25
            }
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
            },
            {
                color: 'green',
                x: 0,
                y: -4,
                width: screen.width,
                height: 5,
                collision: true
            },
            {
                color: 'green',
                x: 0,
                y: screen.height - 1,
                width: screen.width,
                height: 5,
                collision: true
            },
            {
                color: 'green',
                x: -4,
                y: 0,
                width: 5,
                height: screen.height,
                collision: true
            },
            {
                color: 'green',
                x: screen.width - 1,
                y: 0,
                width: 5,
                height: screen.height,
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
            entity.collision.up = false;
            entity.collision.down = false;
            entity.collision.left = false;
            entity.collision.right = false;
            for (let i = 0; i < tileList.length; i++) {
                collision(entity, tileList[i]);
            }

            if (entity.cooldown > 0) {
                entity.cooldown--;
            } else if (entity.cooldown !== -1) {
                entity.controls.right = Math.round(Math.random());
                entity.controls.left = Math.round(Math.random());
                entity.controls.jump = Math.round(Math.random());
                entity.cooldown = 20;
            }

            if (entity.controls.right && !entity.collision.right) {
                entity.x += entity.speed;
            }
            if (entity.controls.left && !entity.collision.left) {
                entity.x -= entity.speed;
            }

            if (entity.collision.down && entity.air !== 0) {
                entity.air = 0;
            }
            if (entity.controls.jump && (entity.air < entity.airMax) && (!entity.collision.up)) {
                entity.y += (entity.speed * 1.5);
                entity.air++;
            } else if ((entity.air >= entity.airMax) || (!entity.controls.jump && entity.air > 0) || !entity.collision.down) {
                entity.y -= 2;
                entity.air = entity.airMax;
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
            if (tile.collision) {
                if (!entity.collision.up) {
                    entity.collision.up =
                        entity.x < tile.x + tile.width &&
                        entity.x + entity.width > tile.x &&
                        entity.y < tile.y &&
                        entity.y + entity.height >= tile.y;
                    if (entity.collision.up && (entity.y + entity.height !== tile.y) && (entity.y + entity.height - tile.y <= 3)) {
                        entity.y = tile.y - entity.height;
                    }
                }
                if (!entity.collision.down) {
                    entity.collision.down =
                        entity.x < tile.x + tile.width &&
                        entity.x + entity.width > tile.x &&
                        entity.y <= tile.y + tile.height &&
                        entity.y + entity.height > tile.y + tile.height;
                    if (entity.collision.down && (entity.y !== tile.y + tile.height) && (tile.y + tile.height - entity.y <= 3)) {
                        entity.y = tile.y + tile.height;
                    }
                }
                if (!entity.collision.left) {
                    entity.collision.left =
                        entity.x <= tile.x + tile.width &&
                        entity.x + entity.width > tile.x + tile.width &&
                        entity.y < tile.y + tile.height &&
                        entity.y + entity.height > tile.y;
                    if (entity.collision.left && (entity.x !== tile.x + tile.width) && (tile.x + tile.width - entity.x <= 2)) {
                        entity.x = tile.x + tile.width;
                    }
                }
                if (!entity.collision.right) {
                    entity.collision.right =
                        entity.x < tile.x &&
                        entity.x + entity.width >= tile.x &&
                        entity.y < tile.y + tile.height &&
                        entity.y + entity.height > tile.y;
                    if (entity.collision.right && (entity.x + entity.width !== tile.x) && (entity.x + entity.width - tile.x <= 2)) {
                        entity.x = tile.x - entity.width;
                    }
                }
            }

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
            ctx.fillText(`${player.collision.up}, ${player.collision.down}`, 5, 10);
            ctx.fillText(`${player.collision.left}, ${player.collision.right}`, 5, 20);
            ctx.fillText(`${player.air} /${player.airMax}`, 5, 30);

            requestAnimationFrame(reDraw);
        }

        reDraw();
    });
})();