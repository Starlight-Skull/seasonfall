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
            color: 'red',
            x: 0,
            y: 0,
            width: 10,
            height: 30,
            speed: 3,
            jumpHeight: 35
        }

        const controls = {
            up: false,
            down: false,
            left: false,
            right: false,
            jump: false
        }

        let debug = '';

        window.addEventListener('keydown', ev => {
            keyLogger(ev.key, true);
        });
        window.addEventListener('keyup', ev => {
            keyLogger(ev.key, false);
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
                // case 'Control':
                //     controls.crouch = upDown;
                //     break;
                // case 'Shift':
                //     controls.sprint = upDown;
                //     break;
            }
            if (upDown) {
                debug = `⇱ '${key}' ⇱`;
            } else {
                debug = `⇲ '${key}' ⇲`;
            }
        }

        function movement() {
            if (controls.right) {
                entity.x += entity.speed;
            }
            if (controls.left) {
                entity.x -= entity.speed;
            }
            if (controls.jump && (entity.y < entity.jumpHeight)) {
                entity.y += entity.speed;
            }
            if (!controls.jump) {
                if (entity.y > 0) {
                    entity.y -= 1;
                } else if (entity.y <= 0) {
                    entity.y = 0
                }
            }
        }

        reDraw();

        function reDraw() {
            movement();

            // background
            ctx.fillStyle = 'green';
            ctx.fillRect(0, 0, screen.width, screen.height);

            // entity
            ctx.fillStyle = entity.color;
            ctx.moveTo(entity.x, entity.y);
            ctx.fillRect(entity.x, screen.height - entity.y - entity.height, entity.width, entity.height);

            // debug
            ctx.fillStyle = 'black';
            ctx.fillText(`${debug}`, 5, 10);

            requestAnimationFrame(reDraw);
        }
    });
})();