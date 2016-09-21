import { tiles } from './model/tilesPack';

export class Game {
    constructor() {
        this.$board = $('#board');

        this.prepareBoard();
        this.placeTiles();
    }
    prepareBoard() {
        const TILES_SET = {
            ROWS: 8,
            CELLS: 12,
            TILES_PER_ROWS: [12, 8, 10, 12, 12, 10, 8, 12],
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

        let $centerOfBoard = $('#center');

        /**
         * Generates board markup
         */
        let centralTilesHtml = (function (tilesParams) {
            let result = '';

            function createTilesLayer(param, isOverlay) {
                let tilesetClass = !isOverlay ? 'tiles-set' : 'tiles-set tiles-set_overlay';

                result += '<div class="' + tilesetClass + '">'
                    + [...generateRows(param)].join('') + '</div>';

                return param.NEXT ? createTilesLayer(param.NEXT, true) : result;
            }

            function* generateRows({ ROWS: rowsCounter, CELLS: cells, TILES_PER_ROWS: tilesPerRows }) {
                var totalRows = rowsCounter;

                while (rowsCounter) {
                    let tilesPerRow = tilesPerRows ? tilesPerRows[totalRows - rowsCounter] : cells;


                    yield* '<div class="tiles-row">' + [...generateCells(cells, tilesPerRow)].join('') + '</div>'
                    rowsCounter--;
                }
            }

            function* generateCells(cellsCounter, tilesPerRow) {
                let startIndex = tilesPerRow + (cellsCounter - tilesPerRow) / 2;
                let finalIndex = (cellsCounter - tilesPerRow) / 2 + 1;

                while (cellsCounter) {
                    if (cellsCounter <= startIndex && cellsCounter >= finalIndex) {
                        yield '<div class="tile tile_active"><img src="src/css/img/tiles/tiles_01.gif" alt="tile"></div>';
                    }
                    else {
                        yield '<div class="tile"></div>';
                    }

                    cellsCounter--;
                }
            }

            return createTilesLayer(tilesParams);
        })(TILES_SET);

        $centerOfBoard.append(centralTilesHtml);
    }
    placeTiles() {
        let $tilesPlaces = this.$board.find('.tile_active');

        $tilesPlaces.each(function(index) {
            $(this).data({ value: tiles[index].value, type: tiles[index].type });
        })
    }
    renderTile() {

    }
}