export const textures = {
    entity: {
        missing_entity: './textures/entity/missing_entity.png',
        hero: './textures/entity/hero.png',
        skeleton: './textures/entity/skeleton.png',
        stick: './textures/entity/stick.png',
        kain: './textures/entity/kain_animations.png'
    },
    tileEntity: {
        door: './textures/tileEntity/door.png'
    },
    environment: {
        rain: './textures/environment/rain.png',
        snow: './textures/environment/snow.png'
    },
    tile: {
        missing_tile: './textures/tile/missing_tile.png',
        beam: './textures/tile/beam.png',
        brick: './textures/tile/brick.png',
        brick_wall: './textures/tile/brick_wall.png',
        dirt: './textures/tile/dirt.png',
        dirt_wall: './textures/tile/dirt_wall.png',
        grass: './textures/tile/grass.png',
        painting: './textures/tile/painting.png',
        plank: './textures/tile/plank.png'
    }
}

export function LoadImage(path) {
    let image = new Image();
    if (Array.isArray(path)) path = path[Math.round(Math.random()) * (path.length - 1)];
    image.src = path || textures.tile.missing_tile;
    return image;
}