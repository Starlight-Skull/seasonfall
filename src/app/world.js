import {entity, tile} from "./classes.js";
import {playerSprite} from "./sprites.js";

export const player = new entity(true, -1, 10, 100, 25, 15, 0, 0, playerSprite, 110, 155, 36, 0, 36, 36, 12, 0);

export const npcList = [
    new entity(true, 20, 6, 25, 15, 150, 0, 100, '', 50, 50),
    new entity(true, 20, 2, 50, 0, 5, 0, 100, '', 150, 200)
];

export const border = [
    new tile(true, 'brown', -40, 0, 50, screen.height),
    new tile(true, 'brown', screen.width - 10, 0, 50, screen.height),
    new tile(true, 'green', 0, -40, screen.width, 50),
    new tile(true, 'cyan', 0, screen.height - 10, screen.width, 50)
]

export const tileList = [
    new tile(true, 'black', 500, 0, 300, 100),
    new tile(true, 'black', 1050, 500, 450, 150),
    new tile(false, 'yellow', 700, 550, 350, 100),
    new tile(2, 'pink', 1500, 150, 200, 30),
    new tile(2, 'pink', 1500, 300, 200, 30),
    new tile(2, 'pink', 1500, 450, 200, 30),
    new tile(2, 'pink', 1500, 600, 200, 30),
    new tile(2, 'pink', 1500, 750, 200, 30)
];