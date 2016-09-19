import { tiles } from './model/tilesPack';

export class Game {
    constructor() {
        this.renderBoard();
    }
    renderBoard() {
        let $centerOfBoard = $('#center');

        const TILES_SET = {
            ROWS: 8,
            CELLS: 12,
            NEXT: {
                ROWS: 6,
                CELLS: 6,
                NEXT: {
                    ROWS: 4,
                    CELLS: 4,
                    NEXT: {
                        ROWS: 2,
                        CELLS: 2,
                        NEXT: {
                            ROWS: 1,
                            CELLS: 1
                        }
                    }
                }
            }

        };

        let tilesLayersHtml = (function (tilesParams) {
            let result = '';

            function createTilesLayer(param, isOverlay) {
                let tileClass = !isOverlay ? 'tiles-set' : 'tiles-set tiles-set_overlay';

                result += '<table class="' + tileClass + '">'
                    + [...generateRows(param)].join('') + '</table>';

                return param.NEXT ? createTilesLayer(param.NEXT, true) : result;
            }

            function* generateRows({ ROWS: rows, CELLS: cells }) {
                while (rows) {
                    yield* '<tr>' + [...generateCells(cells)].join('') + '</tr>'

                    rows--;
                }
            }

            function* generateCells(count) {
                while (count) {
                    yield '<td class="tile"></td>';

                    count--;
                }
            }

            return createTilesLayer(tilesParams);
        })(TILES_SET);

        $centerOfBoard.append(tilesLayersHtml);
    }
}