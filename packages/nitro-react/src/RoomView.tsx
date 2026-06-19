import type { IRoom } from '@nitrodevco/nitro-api';
import { LegacyDataType, RoomGeometryScaleType, RoomObjectCategoryEnum, Vector3d } from '@nitrodevco/nitro-api';
import {
    FurnitureStackingHeightMap,
    GetRoomEngine,
    LegacyWallGeometry,
    RoomPlaneParser,
} from '@nitrodevco/nitro-renderer';
import { useEffect, useMemo, useState } from 'react';

import { RoomContextProvider } from '#base/context';

import { RoomCanvasView } from './views/room/RoomCanvasView';

export const RoomView = ({ roomId }: {
    roomId: number;
}) => {
    const [room, setRoom] = useState<IRoom | undefined>(undefined);

    const mapData = useMemo(() => {
        const parseMapData = (
            modelString: string,
            wallHeight: number,
            doorX: number = -1,
            doorY: number = -1,
            doorDir: number = 0,
            scale: boolean = true,
        ) => {
            const model = modelString.split(/\r?\n/);

            let width = 0;
            const height = model.length;

            let i = 0;

            while (i < height) {
                const row = model[i];

                if (row.length > width) {
                    width = row.length;
                }

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

            const hasEntryTile = false;
            const entryX = 0;
            const entryY = 5;
            let doorZ = 0;

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
                        (!hasEntryTile || (x === entryX && y === entryY))
                    ) {
                        if (
                            (heightMap[y - 1]?.[x] ?? RoomPlaneParser.TILE_BLOCKED) === RoomPlaneParser.TILE_BLOCKED &&
                            (heightMap[y]?.[x - 1] ?? RoomPlaneParser.TILE_BLOCKED) === RoomPlaneParser.TILE_BLOCKED &&
                            (heightMap[y + 1]?.[x] ?? RoomPlaneParser.TILE_BLOCKED) === RoomPlaneParser.TILE_BLOCKED
                        ) {
                            doorX = x + 0.5;
                            doorY = y;
                            doorZ = tileHeight;
                            doorDir = 90;
                        }

                        if (
                            (heightMap[y - 1]?.[x] ?? RoomPlaneParser.TILE_BLOCKED) === RoomPlaneParser.TILE_BLOCKED &&
                            (heightMap[y]?.[x - 1] ?? RoomPlaneParser.TILE_BLOCKED) === RoomPlaneParser.TILE_BLOCKED &&
                            (heightMap[y]?.[x + 1] ?? RoomPlaneParser.TILE_BLOCKED) === RoomPlaneParser.TILE_BLOCKED
                        ) {
                            doorX = x;
                            doorY = y + 0.5;
                            doorZ = tileHeight;
                            doorDir = 180;
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

            wallGeometry.scale = RoomGeometryScaleType.ZoomedOut;
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

            mapData.doors.push({ x: doorX, y: doorY, z: doorZ, dir: doorDir });

            return { mapData, wallGeometry };
        };

        return parseMapData(
            `xxxxxxxxxxxx
xxxx00000000
xxxx00000000
xxxx00000000
xxxx00000000
xxx000000000
xxxx00000000
xxxx00000000
xxxx00000000
xxxx00000000
xxxx00000000
xxxx00000000
xxxx00000000
xxxx00000000
xxxxxxxxxxxx
xxxxxxxxxxxx`,
            0,
            3,
            5,
            2,
        );
    }, []);

    useEffect(() => {
        if (!room) return;

        room.addFurnitureFloorByTypeId(
            1,
            26,
            new Vector3d(5, 7, 0),
            new Vector3d(90, 0, 0),
            0,
            new LegacyDataType(),
        );

        room.addFurnitureFloorByTypeName(
            2,
            'tv_luxus',
            new Vector3d(6, 4, 0),
            new Vector3d(90, 0, 0),
            1,
            new LegacyDataType(),
        );

        room.addFurnitureFloorByTypeName(
            3,
            'tv_luxus1',
            new Vector3d(7, 5, 0),
            new Vector3d(90, 0, 0),
            1,
            new LegacyDataType(),
        );

        room.addFurnitureFloorByTypeName(
            4,
            'dragonlamp_shinobi',
            new Vector3d(9, 7, 0),
            new Vector3d(90, 0, 0),
            1,
            new LegacyDataType(),
        );

        room.addFurnitureWallByTypeId(1, 4032, room.instance.legacyGeometry.getLocation(3, 11, 7, 33, 'l'), new Vector3d(room.instance.legacyGeometry.getDirection('l')), 0);

        room.addFurnitureWallByTypeId(2, 4034, room.instance.legacyGeometry.getLocation(3, 8, 11, 36, 'l'), new Vector3d(room.instance.legacyGeometry.getDirection('l')), 0);

        //room.addFurnitureWallByTypeName(3, "window_grunge", room.instance.legacyGeometry.getLocation(3, 5, 11, 36, 'l'), new Vector3d(room.instance.legacyGeometry.getDirection('l')), 0);

        return () => {
            room.removeRoomObject(1, RoomObjectCategoryEnum.Floor);
            room.removeRoomObject(2, RoomObjectCategoryEnum.Floor);
            room.removeRoomObject(3, RoomObjectCategoryEnum.Floor);
            room.removeRoomObject(4, RoomObjectCategoryEnum.Floor);
            room.removeRoomObject(1, RoomObjectCategoryEnum.Wall);
            room.removeRoomObject(2, RoomObjectCategoryEnum.Wall);
            room.removeRoomObject(3, RoomObjectCategoryEnum.Wall);
        };
    }, [room]);

    useEffect(() => {
        if (!roomId) return;

        const room = GetRoomEngine().createRoom(roomId);

        if (!room) return;

        if (mapData.mapData) room.applyRoomMap(mapData.mapData);

        if (mapData.wallGeometry) room.instance.setLegacyGeometry(mapData.wallGeometry);

        const heightMap = new FurnitureStackingHeightMap(mapData.mapData.width, mapData.mapData.height);

        let y = 0;

        while (y < mapData.mapData.height) {
            let x = 0;

            while (x < mapData.mapData.width) {
                heightMap.setTileHeight(x, y, 0);
                heightMap.setStackingBlocked(x, y, false);
                heightMap.setIsRoomTile(x, y, true);

                x++;
            }

            y++;
        }

        room.instance.setFurnitureStackingHeightMap(heightMap);

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRoom(prev => {
            if (prev === room) return prev;

            return room;
        });
    }, [roomId, setRoom, mapData]);

    if (!room) return null;

    return (
        <RoomContextProvider room={room}>
            <RoomCanvasView />
        </RoomContextProvider>
    );
};
