;(function () {
    'use strict';

    window.addEventListener('load', function () {

    });

    document.addEventListener('keydown', ev => {
        if (ev.key === '`') {
            document.getElementById('debug').hidden = false;
        }
    });

    document.addEventListener('keyup', ev => {
        if (ev.key === '`') {
            document.getElementById('debug').hidden = true;
        }
    });
})();