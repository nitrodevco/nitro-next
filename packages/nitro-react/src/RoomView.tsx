import type { IRoom } from '@nitrodevco/nitro-api';
import {
    LegacyDataType,
    MouseEventType,
    RoomObjectCategoryEnum,
    RoomObjectVariableEnum,
    Vector3d,
} from '@nitrodevco/nitro-api';
import { GetRenderer, GetRoomEngine, GetStage, RoomGeometry, RoomPlaneParser } from '@nitrodevco/nitro-renderer';
import { useEffect, useMemo, useRef, useState } from 'react';

import { classNames } from './utils/classNames';

type RoomViewProps = { roomId: number };

export const RoomView = ({ roomId }: RoomViewProps) => {
    const [room, setRoom] = useState<IRoom | undefined>(undefined);
    const [size, setSize] = useState<{ width: number; height: number; resolution: number } | undefined>(undefined);
    const elementRef = useRef<HTMLDivElement>(null);

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

        void (async () => {
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
            room.removeRoomObject(1, RoomObjectCategoryEnum.Floor);
            room.removeRoomObject(2, RoomObjectCategoryEnum.Floor);
        };
    }, [room]);

    useEffect(() => {
        if (!room || !size) return;

        const { width, height, resolution } = size;

        const canvas = room.getRoomDisplay(width, height, RoomGeometry.SCALE_ZOOMED_IN);

        if (canvas) {
            const geometry = room.getGeometry();

            if (geometry) {
                const minX = room.getRoomValue<number>(RoomObjectVariableEnum.RoomMinX) ?? 0;
                const maxX = room.getRoomValue<number>(RoomObjectVariableEnum.RoomMaxX) ?? 0;
                const minY = room.getRoomValue<number>(RoomObjectVariableEnum.RoomMinY) ?? 0;
                const maxY = room.getRoomValue<number>(RoomObjectVariableEnum.RoomMaxY) ?? 0;

                let x = (minX + maxX) / 2;
                let y = (minY + maxY) / 2;

                const offset = 20;

                x = x + (offset - 1);
                y = y + (offset - 1);

                const z = Math.sqrt(offset * offset + offset * offset) * Math.tan((30 / 180) * Math.PI);

                geometry.location = new Vector3d(x, y, z);
            }

            if (!canvas.parent) GetStage().addChild(canvas);
        }

        GetRenderer().render(GetStage());
        GetRenderer().resize(width, height, resolution);
    }, [room, size]);

    useEffect(() => {
        if (!roomId) return;

        const canvas = GetRenderer().canvas;
        let didMouseMove = false;
        let lastClick = 0;
        let clickCount = 0;
        let cancelled = false;
        let handler: (event: MouseEvent) => void;

        void (async () => {
            const room = await GetRoomEngine().createRoom(roomId);

            if (cancelled || !room) return;

            if (mapData) await room.applyRoomMap(mapData);

            handler = (event: MouseEvent) => {
                const x = event.clientX;
                const y = event.clientY;

                let eventType = event.type;

                if (eventType === MouseEventType.MOUSE_CLICK) {
                    if (lastClick) {
                        clickCount = 1;

                        if (lastClick >= Date.now() - 300) clickCount++;
                    }

                    lastClick = Date.now();

                    if (clickCount === 2) {
                        if (!didMouseMove) eventType = MouseEventType.DOUBLE_CLICK;

                        clickCount = 0;
                        lastClick = 0;
                    }
                }

                switch (eventType) {
                    case MouseEventType.MOUSE_CLICK:
                        break;
                    case MouseEventType.DOUBLE_CLICK:
                        break;
                    case MouseEventType.MOUSE_MOVE:
                        didMouseMove = true;
                        break;
                    case MouseEventType.MOUSE_DOWN:
                        didMouseMove = false;
                        break;
                    case MouseEventType.MOUSE_UP:
                        break;
                    case MouseEventType.RIGHT_CLICK:
                        break;
                    default:
                        return;
                }

                if (room)
                    room.dispatchMouseEvent(
                        x,
                        y,
                        eventType,
                        event.altKey,
                        event.ctrlKey || event.metaKey,
                        event.shiftKey,
                        false,
                    );
            };

            canvas.onclick = handler;
            canvas.onmousemove = handler;
            canvas.onmousedown = handler;
            canvas.onmouseup = handler;

            setRoom(prev => {
                if (prev === room) return prev;

                return room;
            });
            setSize({
                width: Math.floor(window.innerWidth),
                height: Math.floor(window.innerHeight),
                resolution: window.devicePixelRatio,
            });
        })();

        return () => {
            cancelled = true;

            canvas.onclick = null;
            canvas.onmousemove = null;
            canvas.onmousedown = null;
            canvas.onmouseup = null;
        };
    }, [roomId, mapData]);

    useEffect(() => {
        const canvas = GetRenderer().canvas;

        if (canvas) {
            canvas.classList.add('bg-black');

            elementRef?.current?.appendChild(canvas);
        }

        let resizeTimer: ReturnType<typeof setTimeout>;

        const handleResize = (event: UIEvent) => {
            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {
                setSize({
                    width: Math.floor(window.innerWidth),
                    height: Math.floor(window.innerHeight),
                    resolution: window.devicePixelRatio,
                });
            }, 10);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(resizeTimer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div ref={elementRef} className={classNames('size-full')}></div>;
};
