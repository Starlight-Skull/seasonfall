;(function () {
    'use strict';

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


        class entity {
            constructor(hasCollision, cooldown, speed, airMax, x, y, sprite, width, height, sX, sY, sWidth, sHeight, frames, currentFrame) {
                this.cooldown = cooldown || -1;
                this.frame = {
                    x: x || 0,
                    y: y || 0,
                    width: width || 150,
                    height: height || 250,
                    sprite: sprite,
                    sX: sX,
                    sY: sY,
                    sWidth: sWidth,
                    sHeight: sHeight,
                    frames: frames,
                    currentFrame: currentFrame,
                    mirrored: false
                };
                this.speed = speed || 10;
                this.air = 0;
                this.airMax = airMax || 25;
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
                this.hasCollision = hasCollision;
            }
        }

        class tile {
            constructor(hasCollision, color, x, y, width, height) {
                this.frame = {
                    x: x || 0,
                    y: y || 0,
                    width: width || 150,
                    height: height || 150
                }
                this.color = color || 'black';
                this.hasCollision = hasCollision;
            }
        }

        let sprite = new Image();
        sprite.src = './img/kain_animations.png';
        const player = new entity(true, -1, 10, 15, 0, 0, sprite, 110, 155, 36, 0, 36, 36, 12, 0);
        const npcList = [
            new entity(true, 20, 1, 150, 0, 100, '', 50, 50),
            new entity(true, 20, 7, 5, 0, 100, '', 150, 200)
        ];
        const border = [
            new tile(true, 'brown', -40, 0, 50, screen.height),
            new tile(true, 'brown', screen.width - 10, 0, 50, screen.height),
            new tile(true, 'green', 0, -40, screen.width, 50),
            new tile(true, 'cyan', 0, screen.height - 10, screen.width, 50)
        ]
        const tileList = [
            new tile(true, 'black', 500, 0, 300, 100),
            new tile(true, 'black', 1050, 500, 450, 150),
            new tile(false, 'yellow', 700, 550, 350, 100),
            new tile(2, 'pink', 1500, 150, 200, 30),
            new tile(2, 'pink', 1500, 300, 200, 30),
            new tile(2, 'pink', 1500, 450, 200, 30),
            new tile(2, 'pink', 1500, 600, 200, 30),
            new tile(2, 'pink', 1500, 750, 200, 30)
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

        function entityMovement(entity) {
            entity.collision.up = false;
            entity.collision.down = false;
            entity.collision.left = false;
            entity.collision.right = false;
            for (let i = 0; i < border.length; i++) {
                collision(entity, border[i]);
            }
            for (let i = 0; i < tileList.length; i++) {
                collision(entity, tileList[i]);
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
                if (entity.frame.currentFrame < entity.frame.frames) {
                    entity.frame.currentFrame += 0.3;
                    player.frame.mirrored = false
                } else {
                    entity.frame.currentFrame = 0;
                }
            }
            if (entity.controls.left && !entity.collision.left) {
                entity.frame.x -= entity.speed;
                if (entity.frame.currentFrame < entity.frame.frames) {
                    entity.frame.currentFrame += 0.3;
                    player.frame.mirrored = true;
                } else {
                    entity.frame.currentFrame = 0;
                }
            }
            if ((entity.controls.left && entity.controls.right) || (!entity.controls.left && !entity.controls.right)) {
                entity.frame.currentFrame = 0;
            }

            if (entity.collision.down && entity.air !== 0) {
                entity.air = 0;
            }
            if (entity.controls.jump && (entity.air < entity.airMax) && (!entity.collision.up)) {
                entity.frame.y += (entity.speed * 2);
                entity.air++;
            } else if ((entity.air >= entity.airMax) || (!entity.controls.jump && entity.air > 0) || !entity.collision.down) {
                entity.frame.y -= 9.81 * 1.5;
                entity.air = entity.airMax;
            }
        }

        function drawEntity(entity) {
            entityMovement(entity)

            if (entity.frame.sprite === '' || debug) {
                ctx.fillStyle = 'red';
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
        }

        function drawTile(tile) {
            ctx.fillStyle = tile.color;
            ctx.moveTo(tile.frame.x, tile.frame.y);
            ctx.fillRect(tile.frame.x, screen.height - tile.frame.y - tile.frame.height, tile.frame.width, tile.frame.height);
        }

        function collision(entity, object) {
            if (entity.hasCollision && object.hasCollision) {
                if (!entity.collision.up) {
                    entity.collision.up =
                        entity.frame.x < object.frame.x + object.frame.width &&
                        entity.frame.x + entity.frame.width > object.frame.x &&
                        entity.frame.y < object.frame.y &&
                        entity.frame.y + entity.frame.height >= object.frame.y &&
                        object.hasCollision !== 2;
                    if (entity.collision.up && (entity.frame.y + entity.frame.height !== object.frame.y) && (entity.frame.y + entity.frame.height - object.frame.y <= 30)) {
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
                    if (object.hasCollision === 2 && entity.controls.down) {
                        entity.collision.down = false;
                    } else if (entity.collision.down && (entity.frame.y !== object.frame.y + object.frame.height) && (object.frame.y + object.frame.height - entity.frame.y <= 30)) {
                        entity.frame.y = object.frame.y + object.frame.height;
                    }
                }
                if (!entity.collision.left) {
                    entity.collision.left =
                        entity.frame.x <= object.frame.x + object.frame.width &&
                        entity.frame.x + entity.frame.width > object.frame.x + object.frame.width &&
                        entity.frame.y < object.frame.y + object.frame.height &&
                        entity.frame.y + entity.frame.height > object.frame.y &&
                        object.hasCollision !== 2;
                    if (entity.collision.left && (entity.frame.x !== object.frame.x + object.frame.width) && (object.frame.x + object.frame.width - entity.frame.x <= 20)) {
                        entity.frame.x = object.frame.x + object.frame.width;
                    }
                }
                if (!entity.collision.right) {
                    entity.collision.right =
                        entity.frame.x < object.frame.x &&
                        entity.frame.x + entity.frame.width >= object.frame.x &&
                        entity.frame.y < object.frame.y + object.frame.height &&
                        entity.frame.y + entity.frame.height > object.frame.y &&
                        object.hasCollision !== 2;
                    if (entity.collision.right && (entity.frame.x + entity.frame.width !== object.frame.x) && (entity.frame.x + entity.frame.width - object.frame.x <= 20)) {
                        entity.frame.x = object.frame.x - entity.frame.width;
                    }
                }
            }
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
            ctx.fillText(`${npcList[0].frame.x},${npcList[0].frame.y}`, 5, 30);
            ctx.fillText(`${npcList[1].frame.x},${npcList[0].frame.y}`, 5, 60);
            ctx.fillText(``, 5, 90);
            requestAnimationFrame(reDraw);
        }

        reDraw();
    });
})();