import {Door, Entity, Hero, Stick, Tile} from "./classes.js";

export const world = {
    originX: 800,
    originY: 160,
    width: 5200,
    height: 2400,
    scale: 5
}

export let player = new Hero(-1, 1400, 80);

export let entityList = [
    new Entity(true, -1, 6, 10, 25, 15, 150, 10, 200, 80, 50, 150),
    new Entity(true, -1, 2, 10, 50, 0, 5, 5, 900, 80, 150, 200),
    new Stick(-1, 700, 500)
];

export let tileList = [
    // tiles
    new Tile(false, 1200, 80, 640, 800, 'brick_dark'),
    new Tile(true, 1200, 240, 80, 640, 'brick'),
    new Tile(true, 1760, 240, 80, 640, 'brick'),
    new Tile(2, 1600, 200, 160, 40, 'plank'),
    new Tile(2, 1280, 360, 480, 40, 'plank'),
    new Tile(2, 1600, 520, 160, 40, 'plank'),
    new Tile(2, 1600, 680, 160, 40, 'plank'),
    new Tile(2, 1280, 840, 480, 40, 'plank'),
    // border
    new Tile(true, -160, 0, 160, world.height, 'dirt'),
    new Tile(true, world.width, 0, 160, world.height, 'dirt'),
    new Tile(false, -160, -80, world.width + 320, 80, 'dirt'),
    new Tile(true, 0, 0, world.width, 80, 'grass')
];

export let tileEntityList = [
    new Door(1200, 80, 20, 80, 240)
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