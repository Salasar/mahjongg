export const TILES_TYPES = {
    CIRCLE: {
        BACKGROUND_POSITION_Y: '',
        VALUES: [...generateTilesValues(9)],
        QUANTIFIER: 4
    },
    BAMBOO: {
        BACKGROUND_POSITION_Y: '',
        VALUES: [...generateTilesValues(9)],
        QUANTIFIER: 4
    },
    CHARACTER: {
        BACKGROUND_POSITION_Y: '',
        VALUES: [...generateTilesValues(9)],
        QUANTIFIER: 4
    },
    WIND: {
        BACKGROUND_POSITION_Y: '',
        VALUES: [...generateTilesValues(4)],
        QUANTIFIER: 4
    },
    DRAGON: {
        BACKGROUND_POSITION_Y: '',
        VALUES: [...generateTilesValues(3)],
        QUANTIFIER: 4
    },
    FLOWER: {
        BACKGROUND_POSITION_Y: '',
        VALUES: [...generateTilesValues(4)],
    },
    SEASON: {
        BACKGROUND_POSITION_Y: '',
        VALUES: [...generateTilesValues(4)],
    }
};

function* generateTilesValues(n) {
    for (let i = 1; i <= n; i++) {
        yield i;
    }
}