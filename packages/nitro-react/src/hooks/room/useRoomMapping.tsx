import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { LegacyWallGeometry, RoomPlaneParser } from '@nitrodevco/nitro-renderer';

export const useRoomMapping = () => {
    const createMapForSize = (size: number) => {
        const width = size + 2;
        const height = size + 2;
        const planeParser = new RoomPlaneParser();

        planeParser.initializeTileMap(width, height);

        let y = 1;

        while (y < (1 + size)) {
            let x = 1;

            while (x < (1 + size)) {
                planeParser.setTileHeight(x, y, 0);

                x++;
            }

            y++;
        }

        planeParser.initializeFromTileData();

        const wallGeometry = new LegacyWallGeometry();

        wallGeometry.scale = RoomGeometryScaleType.ZoomedIn;
        wallGeometry.initialize(width, height, planeParser.floorHeight);

        let wallY = height - 1;

        while (wallY >= 0) {
            let wallX = width - 1;

            while (wallX >= 0) {
                wallGeometry.setHeight(wallX, wallY, planeParser.getTileHeight(wallX, wallY));
                wallX--;
            }

            wallY--;
        }

        const mapData = planeParser.getMapData();

        return { mapData, wallGeometry };
    };

    return { createMapForSize };
};
