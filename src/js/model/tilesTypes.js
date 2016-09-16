export const TILES_TYPES = {
    CIRCLE: {
        BACKGROUND_POSITION_Y: '',
        VALUES: getTilesValues(9),
        QUANTIFIER: 4
    },
    BAMBOO: {
        BACKGROUND_POSITION_Y: '',
        VALUES: getTilesValues(9),
        QUANTIFIER: 4
    },
    CHARACTER: {
        BACKGROUND_POSITION_Y: '',
        VALUES: getTilesValues(9),
        QUANTIFIER: 4
    },
    WIND: {
        BACKGROUND_POSITION_Y: '',
        VALUES: getTilesValues(4),
        QUANTIFIER: 4
    },
    DRAGON: {
        BACKGROUND_POSITION_Y: '',
        VALUES: getTilesValues(3),
        QUANTIFIER: 4
    },
    FLOWER: {
        BACKGROUND_POSITION_Y: '',
        VALUES: getTilesValues(4)
    },
    SEASON: {
        BACKGROUND_POSITION_Y: '',
        VALUES: getTilesValues(4)
    }
};

function getTilesValues(n) {
    let arr = [...Array(n + 1).keys()];
    arr.shift();

    return arr;
}