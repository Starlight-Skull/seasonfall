;(function () {
    'use strict';

    window.addEventListener('load', function () {
        const screen = document.getElementById('screen');
        if (!screen.getContext) {
            window.warn('This application is not supported by your browser.');
        }
        const ctx = screen.getContext('2d');

        class entity {
            constructor(color, cooldown, width, height, speed, airMax, collides) {
                this.color = color || 'white';
                this.cooldown = cooldown || -1;
                this.frame = {
                    x: 0,
                    y: 0,
                    width: width || 15,
                    height: height || 25,
                };
                this.speed = speed || 2;
                this.air = 0;
                this.airMax = airMax || 15;
                this.controls = {
                    up: false,
                    down: false,
                    left: false,
                    right: false,
                    jump: false
                };
                this.collision = {
                    up: false,
                    down: false,
                    left: false,
                    right: false
                };
                this.collides = collides || true;
            }
        }

        class tile {
            constructor(color, collides, x, y, width, height) {
                this.frame = {
                    x: x || 0,
                    y: y || 0,
                    width: width || 15,
                    height: height || 15
                }
                this.color = color || 'black';
                this.collides = collides || false;
            }
        }

        const player = new entity()

        const npcList = [
            new entity('blue', 20, 40, 2, 2, 20),
            new entity('purple', 20, 15, 5, 7, 5, false)
        ];

        const tileList = [
            new tile('black', true, 100, 0, 30, 30),
            new tile('black', true, 200, 30, 30, 30),
            new tile('green', true, 0, -4, screen.width, 5),
            new tile('blue', true, 0, screen.height - 1, screen.width, 5),
            new tile('brown', true, -4, 0, 5, screen.height),
            new tile('brown', true, screen.width - 1, 0, 5, screen.height),
            new tile('yellow', false, 20),
            new tile('pink', 2, 100, 60, 30, 3)
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
            for (let i = 0; i < npcList.length; i++) {
                collision(entity, npcList[i]);
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
            }
            if (entity.controls.left && !entity.collision.left) {
                entity.frame.x -= entity.speed;
            }

            if (entity.collision.down && entity.air !== 0) {
                entity.air = 0;
            }
            if (entity.controls.jump && (entity.air < entity.airMax) && (!entity.collision.up)) {
                entity.frame.y += (entity.speed * 1.5);
                entity.air++;
            } else if ((entity.air >= entity.airMax) || (!entity.controls.jump && entity.air > 0) || !entity.collision.down) {
                entity.frame.y -= 2;
                entity.air = entity.airMax;
            }

            ctx.fillStyle = entity.color;
            ctx.moveTo(entity.frame.x, entity.frame.y);
            ctx.fillRect(entity.frame.x, screen.height - entity.frame.y - entity.frame.height, entity.frame.width, entity.frame.height);
        }

        function drawTile(tile) {
            ctx.fillStyle = tile.color;
            ctx.moveTo(tile.frame.x, tile.frame.y);
            ctx.fillRect(tile.frame.x, screen.height - tile.frame.y - tile.frame.height, tile.frame.width, tile.frame.height);
        }

        function collision(entity, object) {
            if (entity.collides && object.collides) {
                if (!entity.collision.up) {
                    entity.collision.up =
                        entity.frame.x < object.frame.x + object.frame.width &&
                        entity.frame.x + entity.frame.width > object.frame.x &&
                        entity.frame.y < object.frame.y &&
                        entity.frame.y + entity.frame.height >= object.frame.y &&
                        object.collides !== 2;
                    if (entity.collision.up && (entity.frame.y + entity.frame.height !== object.frame.y) && (entity.frame.y + entity.frame.height - object.frame.y <= 3)) {
                        entity.frame.y = object.frame.y - entity.frame.height;
                    }
                }
                if (!entity.collision.down) {
                    entity.collision.down =
                        entity.frame.x < object.frame.x + object.frame.width &&
                        entity.frame.x + entity.frame.width > object.frame.x &&
                        entity.frame.y <= object.frame.y + object.frame.height &&
                        entity.frame.y > object.frame.y &&
                        entity.frame.y + entity.frame.height > object.frame.y + object.frame.height;
                    if (entity.collision.down && (entity.frame.y !== object.frame.y + object.frame.height) && (object.frame.y + object.frame.height - entity.frame.y <= 3)) {
                        entity.frame.y = object.frame.y + object.frame.height;
                    }
                }
                if (!entity.collision.left) {
                    entity.collision.left =
                        entity.frame.x <= object.frame.x + object.frame.width &&
                        entity.frame.x + entity.frame.width > object.frame.x + object.frame.width &&
                        entity.frame.y < object.frame.y + object.frame.height &&
                        entity.frame.y + entity.frame.height > object.frame.y &&
                        object.collides !== 2;
                    if (entity.collision.left && (entity.frame.x !== object.frame.x + object.frame.width) && (object.frame.x + object.frame.width - entity.frame.x <= 2)) {
                        entity.frame.x = object.frame.x + object.frame.width;
                    }
                }
                if (!entity.collision.right) {
                    entity.collision.right =
                        entity.frame.x < object.frame.x &&
                        entity.frame.x + entity.frame.width >= object.frame.x &&
                        entity.frame.y < object.frame.y + object.frame.height &&
                        entity.frame.y + entity.frame.height > object.frame.y &&
                        object.collides !== 2;
                    if (entity.collision.right && (entity.frame.x + entity.frame.width !== object.frame.x) && (entity.frame.x + entity.frame.width - object.frame.x <= 2)) {
                        entity.frame.x = object.frame.x - entity.frame.width;
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