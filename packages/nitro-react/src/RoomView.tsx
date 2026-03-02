import { LegacyDataType, RoomObjectCategoryEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetRoomEngine, RoomPlaneParser } from '@nitrodevco/nitro-renderer';
import { useEffect, useMemo } from 'react';

import { useRoomContext } from './context/room/useRoomContext';
import { RoomCanvasView } from './views/room/RoomCanvasView';

export const RoomView = () => {
    const { roomId, room, setRoom } = useRoomContext();

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
                const subHeightMap: number[] = [];

                let subIterator = 0;

                while (subIterator < width) {
                    subHeightMap.push(RoomPlaneParser.TILE_BLOCKED);

                    subIterator++;
                }

                heightMap.push(subHeightMap);

                i++;
            }

            i = 0;

            while (i < height) {
                const map = heightMap[i];
                const text = model[i];

                if (text.length > 0) {
                    let subIterator = 0;

                    while (subIterator < text.length) {
                        const char = text.charAt(subIterator);
                        let height = RoomPlaneParser.TILE_BLOCKED;

                        if (char !== 'x' && char !== 'X') height = parseInt(char, 36);

                        map[subIterator] = height;

                        subIterator++;
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
            planeParser.initializeFromTileData(-1);
            planeParser.setTileHeight(Math.floor(doorX), Math.floor(doorY), doorZ + wallHeight);

            const mapData = planeParser.getMapData();

            mapData.doors.push({ x: doorX, y: doorY, z: doorZ, dir: doorDir });

            return mapData;
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
            1,
            3,
            5,
            2,
        );
    }, []);

    useEffect(() => {
        if (!room) return;

        let cancelled = false;

        void (async () => {
            if (cancelled) return;

            await room.addFurnitureByTypeId(
                1,
                26,
                new Vector3d(5, 7, 0),
                new Vector3d(90, 0, 0),
                0,
                new LegacyDataType(),
            );

            await room.addFurnitureFloorByTypeName(
                2,
                'tv_luxus',
                new Vector3d(6, 4, 0),
                new Vector3d(90, 0, 0),
                1,
                new LegacyDataType(),
            );
        })();

        return () => {
            cancelled = true;

            room.removeRoomObject(1, RoomObjectCategoryEnum.Floor);
            room.removeRoomObject(2, RoomObjectCategoryEnum.Floor);
        };
    }, [room]);

    useEffect(() => {
        if (!roomId) return;

        let cancelled = false;

        void (async () => {
            const room = await GetRoomEngine().createRoom(roomId);

            if (cancelled || !room) return;

            if (mapData) await room.applyRoomMap(mapData);

            setRoom(prev => {
                if (prev === room) return prev;

                return room;
            });
        })();

        return () => {
            cancelled = true;
        };
    }, [roomId, setRoom, mapData]);

    if (!room) return null;

    return <RoomCanvasView />;
};
