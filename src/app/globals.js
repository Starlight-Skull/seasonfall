import {Door, Entity, Hero, Stick, Tile, TileEntity} from "./classes.js";

export let player = new Hero(-1, 0, 0);

export let entityList = [
    new Entity(true, -1, 6, 10, 25, 15, 150, 10, 200, 0, 50, 150),
    new Entity(true, -1, 2, 10, 50, 0, 5, 5, 900, 0, 150, 200),
    new Stick(-1, 700, 500)
];

export let tileList = [
    // tiles
    new Tile(false, 'black', 1200, 0, 600, 750),
    new Tile(true, 'grey', 1200, 250, 100, 500),
    new Tile(true, 'grey', 1800, 0, 100, 750),
    new Tile(2, 'brown', 1300, 250, 500, 30),
    new Tile(2, 'brown', 1300, 720, 500, 30),
    new Tile(2, 'silver', 1650, 125, 150, 30),
    new Tile(2, 'silver', 1650, 375, 150, 30),
    new Tile(2, 'silver', 1650, 500, 150, 30),
    new Tile(2, 'silver', 1650, 625, 150, 30),
    // border
    new Tile(true, 'red', -50, 0, 50, window.innerHeight * 1.5),
    new Tile(true, 'red', window.innerWidth, 0, 50, window.innerHeight * 1.5),
    new Tile(true, 'green', 0, -30, window.innerWidth, 50),
    new Tile(true, 'red', 0, window.innerHeight * 1.5, window.innerWidth, 50)
];

export let tileEntityList = [
    new Door('brown', 1200, 20, 30, 100, 230)
];

export let weather = {
    code: 0,
    main: '',
    description: '',
    temp: 0,
    visibility: 0,
    windSpeed: 0,
    windDeg: 0,
    windGust: 0,
    clouds: 0,
    rain: 0,
    snow: 0,
    time: 0,
    sunrise: 0,
    sunset: 0,
    timezone: 0
}

export let debug = {
    apiKey: '',
    location: '',
    useAPI: true,
    showBoxes: false,
    showTrackedEntity: false,
};