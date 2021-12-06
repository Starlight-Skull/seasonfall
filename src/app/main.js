;(function () {
    'use strict';

    window.addEventListener('load', function () {
        const screen = document.getElementById('screen');
        let ctx
        if (screen.getContext) {
            ctx = screen.getContext('2d');
        } else {
            window.warn('This application is not supported by your browser.');
        }
        const entity = {
            x: 0,
            y: 0,
            w: 10,
            h: 30,
            color: 'red',
            baseSpeed: 3,
            speed: 3,
            jumpHeight: 35,
            falling: false,
            crouching: false
        }
        const controls = {
            up: false,
            down: false,
            left: false,
            right: false,
            jump: false,
            crouch: false,
            sprint: false
        }

        window.addEventListener('keydown', ev => {
            keyLogger(ev.key, false);
        });
        window.addEventListener('keyup', ev => {
            keyLogger(ev.key, true);
        });

        function keyLogger(key, upDown) {
            switch (key) {
                case 'w':
                    controls.up = upDown;
                    break;
                case 's':
                    controls.down = upDown;
                    break;
                case 'a':
                    controls.left = upDown;
                    break;
                case 'd':
                    controls.right = upDown;
                    break;
                case ' ':
                    controls.jump = upDown;
                    break;
                case 'Control':
                    controls.crouch = upDown;
                    break;
                case 'Shift':
                    controls.sprint = upDown;
                    break;
            }
            if (upDown) {
                console.log(`⇱ '${key}' ⇱`);
            } else {
                console.log(`⇲ '${key}' ⇲`);
            }
        }

        function movement() {
            if (controls.right) {
                entity.x += entity.speed;
            }
            if (controls.left) {
                entity.x -= entity.speed;
            }
            if (controls.jump && (entity.y < entity.jumpHeight) && !entity.falling) {
                entity.y += entity.speed;
            }
        }

        function gravity() {
            if ((entity.y > 0) && entity.falling) {
                entity.y -= 1;
            }
            if ((entity.y >= entity.jumpHeight)) {
                entity.falling = true;
            }
            if (entity.y <= 0 && entity.falling) {
                entity.falling = false;
                entity.y = 0;
            }
        }

        reDraw();

        function reDraw() {
            movement();
            gravity();

            ctx.fillStyle = 'green';
            ctx.fillRect(0, 0, screen.width, screen.height);

            ctx.fillStyle = entity.color;
            ctx.moveTo(entity.x, entity.y);
            ctx.fillRect(entity.x, screen.height - entity.y - entity.h, entity.w, entity.h);

            ctx.fillStyle = 'black';
            ctx.fillText(`${controls.left}, ${controls.right}, ${controls.jump}`, 5, 10);
            requestAnimationFrame(reDraw);
        }
    });
})();