export const TILES_TYPES = {
    CIRCLE: {
        IMG_PREFIX: 'tiles_1',
        VALUES: [...generateTilesValues(9)],
        QUANTIFIER: 4
    },
    BAMBOO: {
        IMG_PREFIX: 'tiles_0',
        VALUES: [...generateTilesValues(9)],
        QUANTIFIER: 4
    },
    CHARACTER: {
        IMG_PREFIX: 'tiles_2',
        VALUES: [...generateTilesValues(9)],
        QUANTIFIER: 4
    },
    WIND: {
        IMG_PREFIX: 'tiles_4',
        VALUES: [...generateTilesValues(4)],
        QUANTIFIER: 4
    },
    DRAGON: {
        IMG_PREFIX: 'tiles_3',
        VALUES: [...generateTilesValues(3)],
        QUANTIFIER: 4
    },
    FLOWER: {
        IMG_PREFIX: 'tiles_6',
        VALUES: [...generateTilesValues(4)],
    },
    SEASON: {
        IMG_PREFIX: 'tiles_5',
        VALUES: [...generateTilesValues(4)],
    }
};

export const TILE_IMG = {
    PATH: 'src/css/img/tiles/',
    EXT: '.gif'
};

function* generateTilesValues(n) {
    for (let i = 1; i <= n; i++) {
        yield i;
    }
}