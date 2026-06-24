import { RoomGeometryScaleType } from "@nitrodevco/nitro-api";
import { LegacyWallGeometry, RoomPlaneParser } from "@nitrodevco/nitro-renderer";
import type { HeightMapMessageType } from "@nitrodevco/nitro-shared";
import { FloorHeightMapMessage, HeightMapMessage, HeightMapUpdateMessage, RoomEntryTileMessage, RoomPropertyMessage, RoomVisualizationSettingsMessage } from "@nitrodevco/nitro-shared";
import { useRef } from "react";

import { useRoomSelector, useRoomStackingHeightMapActions } from "#base/context";
import { useMessageListener } from "#base/hooks";

export const useRoomMappingHandler = () => {
    const room = useRoomSelector();
    const { setHeightMap, setHeightMapUpdates } = useRoomStackingHeightMapActions();
    const entryTile = useRef<{ x: number, y: number, dir: number } | undefined>(undefined);

    const decodeTileHeight = (height: number) => ((height < 0) ? -1 : ((height & 16383) / 0x0100));
    const decodeIsStackingBlocked = (height: number) => !!(height & 0x4000);
    const decodeIsRoomTile = (height: number) => height >= 0;

    const getTileHeight = (data: HeightMapMessageType, x: number, y: number) => {
        if ((x < 0) || (x >= data.width) || (y < 0) || (y >= data.height)) return -1;

        return decodeTileHeight(data.heights[(y * data.width) + x]);
    }

    const getStackingBlocked = (data: HeightMapMessageType, x: number, y: number) => {
        if ((x < 0) || (x >= data.width) || (y < 0) || (y >= data.height)) return true;

        return decodeIsStackingBlocked(data.heights[(y * data.width) + x]);
    }

    const isRoomTile = (data: HeightMapMessageType, x: number, y: number) => {
        if ((x < 0) || (x >= data.width) || (y < 0) || (y >= data.height)) return true;

        return decodeIsRoomTile(data.heights[(y * data.width) + x]);
    }

    const parseMapData = (modelData: string, wallHeight: number) => {
        const model = modelData.split('\r');

        let width = 0;
        const height = model.length;

        let i = 0;

        while (i < height) {
            const row = model[i];

            if (row.length > width) width = row.length;

            i++;
        }

        const heightMap: number[][] = [];

        i = 0;

        while (i < height) {
            const heights: number[] = [];

            let j = 0;

            while (j < width) {
                heights.push(RoomPlaneParser.TILE_BLOCKED);

                j++;
            }

            heightMap.push(heights);

            i++;
        }

        i = 0;

        while (i < height) {
            const map = heightMap[i];
            const text = model[i];

            if (text.length > 0) {
                let j = 0;

                while (j < text.length) {
                    const char = text.charAt(j);
                    let height = RoomPlaneParser.TILE_BLOCKED;

                    if (char !== 'x' && char !== 'X') height = parseInt(char, 36);

                    map[j] = height;

                    j++;
                }
            }

            i++;
        }

        let doorX = -1;
        let doorY = -1;
        let doorZ = 0;
        let doorRot = 0;

        const planeParser = new RoomPlaneParser();

        planeParser.initializeTileMap(width, height);

        let y = 0;

        while (y < height) {
            let x = 0;

            while (x < width) {
                const tileHeight = heightMap[y]?.[x] ?? RoomPlaneParser.TILE_BLOCKED;

                if (
                    ((y > 0 && y < height - 1) || (x > 0 && x < width - 1)) &&
                    !(tileHeight === RoomPlaneParser.TILE_BLOCKED) &&
                    (!entryTile.current || (x === entryTile.current.x && y === entryTile.current.y))
                ) {
                    if (
                        (heightMap[y - 1]?.[x] ?? RoomPlaneParser.TILE_BLOCKED) === RoomPlaneParser.TILE_BLOCKED &&
                        (heightMap[y]?.[x - 1] ?? RoomPlaneParser.TILE_BLOCKED) === RoomPlaneParser.TILE_BLOCKED &&
                        (heightMap[y + 1]?.[x] ?? RoomPlaneParser.TILE_BLOCKED) === RoomPlaneParser.TILE_BLOCKED
                    ) {
                        doorX = x + 0.5;
                        doorY = y;
                        doorZ = tileHeight;
                        doorRot = 90;
                    }

                    if (
                        (heightMap[y - 1]?.[x] ?? RoomPlaneParser.TILE_BLOCKED) === RoomPlaneParser.TILE_BLOCKED &&
                        (heightMap[y]?.[x - 1] ?? RoomPlaneParser.TILE_BLOCKED) === RoomPlaneParser.TILE_BLOCKED &&
                        (heightMap[y]?.[x + 1] ?? RoomPlaneParser.TILE_BLOCKED) === RoomPlaneParser.TILE_BLOCKED
                    ) {
                        doorX = x;
                        doorY = y + 0.5;
                        doorZ = tileHeight;
                        doorRot = 180;
                    }
                }

                planeParser.setTileHeight(x, y, tileHeight);

                x++;
            }

            y++;
        }

        planeParser.setTileHeight(Math.floor(doorX), Math.floor(doorY), doorZ);
        planeParser.initializeFromTileData(wallHeight);
        planeParser.setTileHeight(Math.floor(doorX), Math.floor(doorY), doorZ + planeParser.wallHeight);

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

        mapData.doors.push({ x: doorX, y: doorY, z: doorZ, dir: doorRot });

        return { mapData, wallGeometry };
    };

    useMessageListener(RoomEntryTileMessage, data => {
        entryTile.current = {
            x: data.x,
            y: data.y,
            dir: data.rotation
        };
    });

    useMessageListener(FloorHeightMapMessage, data => {
        if (!room) return;

        const { mapData, wallGeometry } = parseMapData(data.modelData, data.fixedWallsHeight);

        room.applyRoomMap(mapData);
        room.setLegacyGeometry(wallGeometry);
    });

    useMessageListener(HeightMapMessage, data => {
        if (!room) return;

        const width = data.width;
        const height = data.height;
        const heights: number[] = [];
        const stackingBlocked: boolean[] = [];
        const validTiles: boolean[] = [];

        let y = 0;

        while (y < height) {
            let x = 0;

            while (x < width) {
                const key = y * width + x;

                heights[key] = getTileHeight(data, x, y);
                stackingBlocked[key] = getStackingBlocked(data, x, y);
                validTiles[key] = isRoomTile(data, x, y);

                x++;
            }

            y++;
        }

        setHeightMap(width, height, heights, stackingBlocked, validTiles);
    });

    useMessageListener(HeightMapUpdateMessage, data => {
        if (!room || !data.heightUpdates.length) return;

        const updates: { x: number, y: number, height: number, stackingBlocked: boolean, validTile: boolean }[] = [];

        for (const update of data.heightUpdates) updates.push({
            x: update.x,
            y: update.y,
            height: decodeTileHeight(update.height),
            stackingBlocked: decodeIsStackingBlocked(update.height),
            validTile: decodeIsRoomTile(update.height)
        });

        setHeightMapUpdates(updates);
    });

    useMessageListener(RoomPropertyMessage, data => {
        if (!room) return;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        room.updateRoomPlaneType((data.key === "floor") ? data.value : undefined, (data.key === "wallpaper") ? data.value : undefined, (data.key === "landscape") ? data.value : undefined);
    });

    useMessageListener(RoomVisualizationSettingsMessage, data => {
        if (!room) return;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        room.updateRoomPlaneVisibilities(!data.wallsHidden);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        room.updateRoomPlaneThickness(data.wallThickness, data.floorThickness);
    });
}