import {tiles} from './model/tilesPack';

var shuffle = require('shuffle-array');

export class Game {
    constructor() {
        this.$board = $('#board');
        this.$centerOfBoard = $('#center');

        this._prepareBoard();
        this._placeTiles();
        this._addHandlers();
    }

    _prepareBoard() {
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

        /**
         * Generates board markup
         */
        let centralTilesHtml = (function (tilesParams) {
            let result = '';

            function createTilesLayer(param, isOverlay) {
                let tilesetClass = !isOverlay ? 'tileset' : 'tileset tileset_overlay';

                result += '<div class="' + tilesetClass + '">'
                    + [...generateRows(param)].join('') + '</div>';

                return param.NEXT ? createTilesLayer(param.NEXT, true) : result;
            }

            function* generateRows({ROWS: rowsCounter, CELLS: cells, TILES_PER_ROWS: tilesPerRows}) {
                let totalRows = rowsCounter;

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
                        yield '<div class="cell tile"></div>';
                    }
                    else {
                        yield '<div class="cell"></div>';
                    }

                    cellsCounter--;
                }
            }

            return createTilesLayer(tilesParams);
        })(TILES_SET);

        this.$centerOfBoard.append(centralTilesHtml);
    }

    _placeTiles() {
        let $tilesPlaces = this.$board.find('div.tile');

        let shuffledTiles = shuffle(tiles);

        $tilesPlaces.each(function (index) {
            $(this).append($('<img>', {alt: 'tile', src: shuffledTiles[index].imgPath}))
                .data({value: shuffledTiles[index].value, type: shuffledTiles[index].type});
        })
    }

    _addHandlers() {
        let $selectedTile = null;
        let $selectionFrame = $('<div></div>', {class: 'frame'});
        let coords = { clientX: undefined, clientY: undefined };

        this.$board.on('click', function (event) {
            let $targetContainer = $(event.target).parent();

            if (isAvailableTile($targetContainer)) {
                if (event.clientX && event.clientY) {
                    coords.clientX = event.clientX;
                    coords.clientY = event.clientY;
                }

                if ($targetContainer.hasClass('tiles-row')) {
                    let $overlay = $targetContainer.parents('.tileset_overlay');

                    $overlay.hide();
                    $(document.elementFromPoint(coords.clientX, coords.clientY)).trigger("click");
                    $overlay.show();

                    return;
                }

                if (!$selectedTile) {
                    $selectedTile = $targetContainer;

                    addSelection($selectedTile);
                }
                else {
                    if ($selectedTile.is($targetContainer)) {
                        clearSelection();
                    }
                    else if (isTilesEqual($selectedTile, $targetContainer)) {
                        removeTiles($selectedTile, $targetContainer);
                        clearSelection();
                    }
                    else {
                        $selectedTile = $targetContainer;

                        addSelection($selectedTile);
                    }
                }
            }
        });

        function removeTiles($selectedTile, $targetTile) {
            $.each(arguments, function(index, $tile) {
                $tile.removeClass('tile').children().remove();
            });
        }

        function isTilesEqual($selectedTile, $targetTile) {
            let selectedTileData = $selectedTile.data();
            let targetData = $targetTile.data();

            return selectedTileData.value === targetData.value
                && selectedTileData.type === targetData.type;
        }

        function isAvailableTile($target) {
            if (!$target.is('div.tile')) return false;

            let $parent = $target.parent();
            let $tilesSet = $target.parents('.tileset');

            if (!$tilesSet) return false;

            let $firstAvailableTile = $parent.find('div.tile:first');
            let $lastAvailableTile = $parent.find('div.tile:last');

            let rowNumber = $parent.index();
            let closedRowsNumbers = [3, 4];

            let isLeftPartHasTile = $('#left').children('div.tile').length;
            let isRightPartHasTile = $('#right').children('div.tile').length;
            let isCentralRowNotAvailable = (isLeftPartHasTile && $target.is($firstAvailableTile)) || (isRightPartHasTile && $target.is($lastAvailableTile));

            if ($tilesSet.index() === 0 && isCentralRowNotAvailable && ~$.inArray(rowNumber, closedRowsNumbers)) return;
            if ($target.parents('#right').length && $target.is($firstAvailableTile)) return;

            return ($target.is($firstAvailableTile) || $target.is($lastAvailableTile));
        }

        function addSelection() {
            $selectedTile.append($selectionFrame);
        }

        function clearSelection() {
            $selectedTile = null;
            $selectionFrame.remove();
        }

    }
}