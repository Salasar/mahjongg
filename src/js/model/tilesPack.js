import { TILES_TYPES } from './tilesTypes';

export let tiles = (() => {
    let result;

    for (let type in TILES_TYPES) {
        let quantifier = TILES_TYPES[type].QUANTIFIER;
        let packOfTiles = [...TILES_TYPES[type].VALUES].map((tileVal) => {
            return { value: tileVal, type: type };
        });
        let completePackOfTiles = [...packOfTiles];

        if (quantifier) {
            while (!!--quantifier) {
                completePackOfTiles = completePackOfTiles.concat(packOfTiles);
            }

            completePackOfTiles = completePackOfTiles.sort(function(a, b) {
                return a.value - b.value;
            });
        }

        result = !result ? completePackOfTiles : result.concat(completePackOfTiles);
    }

    return result;
})();