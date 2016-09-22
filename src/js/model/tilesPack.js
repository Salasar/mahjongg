import { TILES_TYPES, TILE_IMG } from './tiles';

export let tiles = (function() {
    let result;

    for (let type in TILES_TYPES) {
        let quantifier = TILES_TYPES[type].QUANTIFIER;

        let imgPath = TILE_IMG.PATH + TILES_TYPES[type].IMG_PREFIX;

        let packOfTiles = [...TILES_TYPES[type].VALUES].map((tileVal, index) => {
            return { value: tileVal, type: type, imgPath: imgPath + ++index + TILE_IMG.EXT };
        });

        let completePackOfTiles = [...packOfTiles];

        if (quantifier) {
            while (--quantifier) {
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