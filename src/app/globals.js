import {Door, Entity, Hero, Stick, Tile} from "./classes.js";

export const world = {
    originX: 320,
    originY: 640,
    width: 5200,
    height: 2400,
    scale: 5
}

export let player = new Hero(-1, world.originX, world.originY);

export let entityList = [
    // new Entity(true, -1, 6, 10, 25, 15, 150, 10, 200, 80, 50, 150),
    // new Entity(true, -1, 2, 10, 50, 0, 5, 5, 900, 80, 150, 200),
    // new Stick(-1, 700, 500)
];

export let tileList = [
    // ground
    new Tile(false, 0, 640, 160, 80, 'grass'),
    new Tile(true, 1040, 560, 1440, 80, 'grass'),
    new Tile(true, 2480, 640, 160, 80, 'grass'),
    new Tile(true, 2640, 720, 160, 80, 'grass'),
    new Tile(true, 3040, 720, 160, 80, 'grass'),
    new Tile(true, 3200, 800, 160, 80, 'grass'),
    new Tile(true, 3360, 880, 160, 80, 'grass'),
    new Tile(true, 3520, 960, 1680, 80, 'grass'),
    // dirt
    new Tile(false, 0, 560, 160, 80, 'dirt'),
    new Tile(false, 0, 80, 2400, 480, 'dirt'),
    new Tile(true, -80, 0, 80, world.height, 'dirt'),
    new Tile(true, world.width, 0, 80, world.height, 'dirt'),
    new Tile(true, 0, 0, world.width, 80, 'dirt'),
    // cave
    new Tile(false, 2480, 80, 2660, 240, 'dirt_dark'),
    new Tile(false, 2400, 320, 2740, 240, 'dirt_dark'),
    new Tile(true, 2400, 80, 80, 480, 'dirt'),
    new Tile(true, 2480, 480, 160, 80, 'dirt'),
    new Tile(true, 2480, 560, 320, 80, 'dirt'),
    new Tile(false, 2640, 640, 160, 80, 'dirt'),
    new Tile(true, 2480, 80, 80, 240, 'dirt'),
    new Tile(false, 2560, 80, 640, 80),
    // well
    new Tile(false, 2880, 480, 80, 400, 'brick_dark'),
    new Tile(true, 2800, 560, 80, 320, 'brick'),
    new Tile(2, 2880, 840, 80, 40, 'plank'),
    new Tile(2, 2960, 560, 80, 320, 'brick'),
    // house
    new Tile(false, 240, 640, 800, 320, 'brick_dark'),
    new Tile(true, 160, 560, 880, 80, 'brick'),
    new Tile(true, 160, 640, 80, 400, 'brick'),
    new Tile(true, 960, 800, 80, 240, 'brick'),
    new Tile(true, 240, 960, 720, 40, 'plank'),
];

export let tileEntityList = [
    new Door(960, 640, true)
];

export let weather = {
    main: 'Clear',
    // °C
    temp: 20,
    // m/s
    windSpeed: 0,
    // East - West
    windDeg: 'East',
    // %
    clouds: 50,
    // mm/h
    rain: 0,
    snow: 0,
    // hmm
    time: 1200,
    sunrise: 700,
    sunset: 1900,
}

export let debug = {
    apiKey: '',
    location: '',
    useAPI: false,
    showBoxes: false,
    showTrackedEntity: false,
};