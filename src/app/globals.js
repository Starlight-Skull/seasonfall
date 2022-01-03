import {Door, Hero, Rain, Skeleton, Tile} from "./classes.js";

let beam = new Image();
beam.src = './img/beam.png';
let brick = new Image();
brick.src = './img/brick.png';
let brick_dark = new Image();
brick_dark.src = './img/brick_dark.png';
let dirt = new Image();
dirt.src = './img/dirt.png';
let dirt_dark = new Image();
dirt_dark.src = './img/dirt_dark.png';
let door = new Image();
door.src = './img/door.png';
let grass = new Image();
grass.src = './img/grass.png';
let missing_tile = new Image();
missing_tile.src = './img/missing_tile.png';
let painting = new Image();
painting.src = './img/painting.png';
let plank = new Image();
plank.src = './img/plank.png';

export let charts = {
    chartLocalScore: new Chart(document.getElementById('chartLocalScore'), {
        type: "pie",
        data: {
            labels: ['Win', 'Lose'],
            datasets: [{
                label: 'Score',
                data: [],
                borderColor: ['lime', 'magenta']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    }),
    chartLocalAttacks: new Chart(document.getElementById('chartLocalAttacks'), {
        type: "pie",
        data: {
            labels: ['Hits', 'Misses'],
            datasets: [{
                label: 'Attacks',
                data: [],
                borderColor: ['blue', 'red']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    }),
    chartLocalKills: new Chart(document.getElementById('chartLocalKills'), {
        type: "bar",
        data: {
            labels: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'],
            datasets: [{
                label: 'Kills before death',
                data: [],
                borderColor: ['pink', 'red', 'yellow', 'blue', 'cyan', 'lime', 'green', 'black', 'grey', 'white'],
                borderWidth: 2,
                minBarLength: 5,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    }),
    chartGlobalScore: new Chart(document.getElementById('chartGlobalScore'), {
        type: "pie",
        data: {
            labels: ['Win', 'Lose'],
            datasets: [{
                label: 'Score',
                data: [],
                borderColor: ['lime', 'magenta']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    }),
    chartGlobalAttacks: new Chart(document.getElementById('chartGlobalAttacks'), {
        type: "pie",
        data: {
            labels: ['Hits', 'Misses'],
            datasets: [{
                label: 'Attacks',
                data: [],
                borderColor: ['blue', 'red']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    }),
    chartGlobalKills: new Chart(document.getElementById('chartGlobalKills'), {
        type: "bar",
        data: {
            labels: ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0'],
            datasets: [{
                label: 'Kills before death',
                data: [],
                borderColor: ['pink', 'red', 'yellow', 'blue', 'cyan', 'lime', 'green', 'black', 'grey', 'white'],
                borderWidth: 2,
                minBarLength: 5,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    }),
}

export const world = {
    width: 5200,
    height: 2400,
    scale: 5,
    paused: false
}

export let player = new Hero(320, 640);

export let animTileList = [
    new Rain(-1040, 640, 1040, world.height, false),
    new Rain(0, 640, 1040, world.height, false),
    new Rain(1040, 640, 1040, world.height, false),
    new Rain(2080, 640, 1040, world.height, false),
    new Rain(3120, 640, 1040, world.height, false),
    new Rain(4160, 640, 1040, world.height, false),
    new Rain(5200, 640, 1040, world.height, false),
];

export let entityList = [
    new Skeleton(1, 1680, 640),
    new Skeleton(1, 2160, 640),
    new Skeleton(1, 3600, 1040),
    new Skeleton(1, 4000, 1040),
    new Skeleton(1, 4480, 1040),
    new Skeleton(1, 4400, 640),
    new Skeleton(1, 3440, 160),
    new Skeleton(1, 4000, 160),
    new Skeleton(1, 4640, 160),
    new Skeleton(1, 4640, 1920),
];

export let tileList = [
    // surface
    new Tile(false, -1040, 640, 1040, 80, grass),
    new Tile(false, 0, 640, 160, 80, grass),
    new Tile(false, 5280, 960, 960, 80, grass),
    new Tile(true, 1040, 560, 1440, 80, grass),
    new Tile(true, 2480, 640, 160, 80, grass),
    new Tile(true, 2640, 720, 160, 80, grass),
    new Tile(true, 3040, 720, 160, 80, grass),
    new Tile(true, 3200, 800, 160, 80, grass),
    new Tile(true, 3360, 880, 160, 80, grass),
    // dirt
    new Tile(false, -1040, 80, 1040, 560, dirt),
    new Tile(false, -1040, -240, 1040, 320, dirt),
    new Tile(false, 5280, 0, 960, 960, dirt),
    new Tile(false, 0, 560, 160, 80, dirt),
    new Tile(false, 0, 80, 2400, 480, dirt),
    new Tile(true, 5200, 0, 80, 960, dirt),
    new Tile(true, 0, -240, 2560, 320, dirt),
    new Tile(true, 2560, -240, 2640, 320, dirt),
    // cave lower
    new Tile(false, 2480, 160, 2560, 160, dirt_dark),
    new Tile(false, 2400, 320, 2720, 240, dirt_dark),
    new Tile(false, 2560, 80, 640, 80, dirt_dark),
    new Tile(true, 2400, 80, 80, 480, dirt),
    new Tile(true, 2480, 480, 160, 160, dirt),
    new Tile(true, 2640, 560, 160, 160, dirt),
    new Tile(true, 2480, 80, 80, 240, dirt),
    new Tile(true, 3200, 80, 2000, 80, dirt),
    new Tile(true, 4960, 160, 80, 80, dirt),
    new Tile(true, 5040, 160, 80, 160, dirt),
    new Tile(true, 5120, 160, 80, 400, dirt),
    // cave upper
    new Tile(false, 3600, 640, 1600, 320, dirt_dark),
    new Tile(false, 4960, 560, 240, 80, dirt_dark),
    new Tile(true, 2960, 560, 2000, 80, dirt),
    new Tile(true, 3520, 880, 1200, 80, dirt),
    new Tile(false, 3040, 640, 160, 80, dirt),
    new Tile(false, 3200, 640, 160, 160, dirt),
    new Tile(false, 3360, 640, 640, 240, dirt),
    new Tile(true, 4000, 480, 80, 480, dirt),
    new Tile(true, 4080, 480, 400, 80, dirt),
    new Tile(true, 4080, 800, 80, 80, dirt),
    // well
    new Tile(false, 2880, 480, 80, 400, brick_dark),
    new Tile(true, 2800, 560, 80, 320, brick),
    new Tile(true, 2960, 560, 80, 320, brick),
    new Tile(2, 2880, 840, 80, 40, plank),
    new Tile(false, 2800, 880, 80, 240, beam),
    new Tile(false, 2960, 880, 80, 240, beam),
    new Tile(2, 2800, 1080, 240, 40, plank),
    // house
    new Tile(false, 240, 640, 800, 320, brick_dark),
    new Tile(true, 160, 560, 880, 80, brick),
    new Tile(true, 160, 640, 80, 400, brick),
    new Tile(true, 960, 800, 80, 240, brick),
    new Tile(true, 240, 960, 720, 40, plank),
    // tower
    new Tile(false, 3760, 1040, 480, 240, brick_dark),
    new Tile(false, 4240, 1040, 960, 960, brick_dark),
    new Tile(false, 4720, 960, 80, 80, brick_dark),
    new Tile(false, 4320, 2000, 80, 80, brick_dark),
    new Tile(false, 4480, 2000, 80, 80, brick_dark),
    new Tile(false, 4640, 2000, 160, 80, brick_dark),
    new Tile(false, 4880, 2000, 80, 80, brick_dark),
    new Tile(false, 5040, 2000, 80, 80, brick_dark),
    new Tile(false, 4880, 2000, 80, 80, brick_dark),
    new Tile(false, 5040, 2000, 80, 80, brick_dark),
    new Tile(true, 3520, 960, 1200, 80, brick),
    new Tile(true, 4800, 960, 400, 80, brick),
    new Tile(2, 4720, 840, 80, 40, plank),
    new Tile(2, 4720, 920, 80, 40, plank),
    new Tile(2, 4720, 1000, 80, 40, plank),
    new Tile(true, 3760, 1200, 80, 160, brick),
    new Tile(true, 4160, 1200, 80, 880, brick),
    new Tile(true, 5200, 960, 80, 1120, brick),
    new Tile(true, 3840, 1280, 320, 80, brick),
    new Tile(true, 4240, 1840, 800, 80, brick),
    new Tile(false, 5040, 1040, 160, 840, beam),
    new Tile(2, 5040, 1040, 160, 40, plank),
    new Tile(2, 5040, 1120, 160, 40, plank),
    new Tile(2, 5040, 1200, 160, 40, plank),
    new Tile(2, 5040, 1280, 160, 40, plank),
    new Tile(2, 4240, 1360, 960, 40, plank),
    new Tile(2, 5040, 1400, 160, 40, plank),
    new Tile(2, 5040, 1480, 160, 40, plank),
    new Tile(2, 5040, 1560, 160, 40, plank),
    new Tile(2, 5040, 1640, 160, 40, plank),
    new Tile(2, 5040, 1720, 160, 40, plank),
    new Tile(2, 5040, 1800, 160, 40, plank),
    new Tile(2, 5040, 1880, 160, 40, plank),
    new Tile(false, 4560, 1520, 80, 160, painting),
];

export let tileEntityList = [
    new Door(960, 640, door, true),
    new Door(4160, 1040, door, true),
    new Door(3760, 1040, door),
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
    userId: 0,
    username: '',
    apiKey: '',
    location: '',
    useAPI: true,
    showBoxes: false,
    showLiveDebug: false,
    showFPS: true,
    showPlayerStats: false,
};

export let playerStats = {
    timeTaken: 0,
    kills: 0,
    attacks: 0,
    attacksHit: 0,
    damageTaken: 0,
    damageDealt: 0,
}