import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { LegacyWallGeometry, RoomPlaneParser } from '@nitrodevco/nitro-renderer';

/**
 * The legacy wall geometry of a parsed floor plan - `RoomEngine`'s `LegacyWallGeometry` sized to
 * the map, at the zoomed-in scale, with every tile's height copied from the plane parser.
 */
export const buildRoomWallGeometry = (planeParser: RoomPlaneParser, width: number, height: number): LegacyWallGeometry => {
    const wallGeometry = new LegacyWallGeometry();

    wallGeometry.scale = RoomGeometryScaleType.ZoomedIn;
    wallGeometry.initialize(width, height, planeParser.floorHeight);

    for (let y = height - 1; y >= 0; y--) {
        for (let x = width - 1; x >= 0; x--) wallGeometry.setHeight(x, y, planeParser.getTileHeight(x, y));
    }

    return wallGeometry;
};

/**
 * The floor plan for a temp room of a given size - the square showcase the previewers draw into:
 * `size` x `size` flat tiles inside a one-tile border.
 */
export const createRoomMapForSize = (size: number) => {
    const width = size + 2;
    const height = size + 2;
    const planeParser = new RoomPlaneParser();

    planeParser.initializeTileMap(width, height);

    for (let y = 1; y < (1 + size); y++) {
        for (let x = 1; x < (1 + size); x++) planeParser.setTileHeight(x, y, 0);
    }

    planeParser.initializeFromTileData();

    const wallGeometry = buildRoomWallGeometry(planeParser, width, height);

    return { mapData: planeParser.getMapData(), wallGeometry };
};
