export const textures = {
    entities: {
        missing_entity: './img/entity/missing_entity.png',
        hero: './img/entity/hero.png',
        skeleton: './img/entity/skeleton.png'
    },
    tileEntity: {
        door: './img/tile/door.png'
    },
    environment: {
        rain: './img/environment/rain.png',
        snow: './img/environment/snow.png'
    },
    tiles: {
        missing_tile: './img/tile/missing_tile.png',
        beam: './img/tile/beam.png',
        brick: './img/tile/brick.png',
        brick_wall: './img/tile/brick_dark.png',
        dirt: './img/tile/dirt.png',
        dirt_dark: './img/tile/dirt_dark.png',
        grass: './img/tile/grass.png',
        painting: './img/tile/painting.png',
        plank: './img/tile/plank.png'
    }
}


export function LoadImage(path) {
    let image = new Image();
    image.src = path;
    return image;
}