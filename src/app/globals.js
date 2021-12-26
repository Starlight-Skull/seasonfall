import {Door, Entity, Hero, Stick, Tile} from "./classes.js";

export const world = {
    originX: 800,
    originY: 0,
    width: 10000,
    height: 5000,
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
    new Tile(false, 1200, 80, 600, 750),
    new Tile(true, 1200, 310, 100, 520),
    new Tile(true, 1800, 310, 100, 520),
    new Tile(2, 1300, 330, 500, 30),
    new Tile(2, 1300, 800, 500, 30),
    new Tile(2, 1650, 205, 150, 30),
    new Tile(2, 1650, 455, 150, 30),
    new Tile(2, 1650, 580, 150, 30),
    new Tile(2, 1650, 705, 150, 30),
    // border
    new Tile(true, -80, 0, 80, world.height, 'dirt'),
    new Tile(true, world.width, 0, 80, world.height, 'dirt'),
    new Tile(true, 0, 0, world.width, 80, 'grass')
];

export let tileEntityList = [
    new Door(1200, 80, 30, 100, 230)
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