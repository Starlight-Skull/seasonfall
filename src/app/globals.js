import {Entity, Hero, Stick, Tile} from "./classes.js";

export let debug = {
    showBoxes: false,
};

export const player = new Hero(-1, 0, 0);

export const entityList = [
    new Entity(true, 20, 6, 10, 25, 15, 150, 200, 0, 50, 150),
    new Entity(true, -1, 2, 10, 50, 0, 5, 900, 0, 150, 200),
    new Stick(-1, 700, 500)
];

export const tileList = [
    // border
    new Tile(true, 'brown', -50, 0, 50, window.innerHeight * 1.5),
    new Tile(true, 'brown', window.innerWidth, 0, 50, window.innerHeight * 1.5),
    new Tile(true, 'green', 0, -30, window.innerWidth, 50),
    new Tile(true, 'red', 0, window.innerHeight * 1.5, window.innerWidth, 50),
    // tiles
    // new Tile(true, 'black', 500, 0, 300, 100),
    new Tile(true, 'black', 1050, 500, 450, 150),
    new Tile(false, 'yellow', 700, 550, 350, 100),
    new Tile(2, 'pink', 1500, 150, 200, 30),
    new Tile(2, 'pink', 1500, 300, 200, 30),
    new Tile(2, 'pink', 1500, 450, 200, 30),
    new Tile(2, 'pink', 1500, 600, 200, 30),
    new Tile(2, 'pink', 1500, 750, 200, 30)
];