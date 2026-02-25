import type { IRoom } from '@nitrodevco/nitro-api';
import { MouseEventType, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetRenderer, GetRoomEngine, GetStage, RoomGeometry, RoomPlaneParser } from '@nitrodevco/nitro-renderer';
import { useEffect, useMemo, useRef, useState } from 'react';

import { classNames } from './utils/classNames';

type RoomViewProps = { roomId: number };

export const RoomView = ({ roomId }: RoomViewProps) => {
    const [room, setRoom] = useState<IRoom | undefined>(undefined);
    const [width, setWidth] = useState(-1);
    const [height, setHeight] = useState(-1);
    const elementRef = useRef<HTMLDivElement>(null);

    const mapData = useMemo(() => {
        const size = 10;
        const wallHeight = 1;
        const planeParser = new RoomPlaneParser();

        planeParser.initializeTileMap(size + 2, size + 2);

        let y = 1;

        while (y < 1 + size) {
            let x = 1;

            while (x < 1 + size) {
                planeParser.setTileHeight(x, y, 0);

                x++;
            }

            y++;
        }

        planeParser.initializeFromTileData(wallHeight);
        const mapData = planeParser.getMapData();

        mapData.doors.push({ x: 3, y: 1, z: 1, dir: 4 });

        return mapData;
    }, []);

    useEffect(() => {
        if (!room || !mapData) return;

        void (async () => await room.applyRoomMap(mapData))();
    }, [room, mapData]);

    useEffect(() => {
        if (width === -1 || height === -1) {
            setWidth(Math.floor(window.innerWidth));
            setHeight(Math.floor(window.innerHeight));

            return;
        }

        if (!room) return;

        const canvas = room.getRoomDisplay(1, width, height, RoomGeometry.SCALE_ZOOMED_IN);

        if (canvas) {
            const geometry = room.getGeometry(1);

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
        GetRenderer().resize(width, height, window.devicePixelRatio);
    }, [room, width, height]);

    useEffect(() => {
        if (!roomId) return;

        let cancelled = false;
        const canvas = GetRenderer().canvas;
        let handler: ((event: MouseEvent) => void) | undefined = undefined;

        const createRoom = async () => {
            const room = await GetRoomEngine().createRoom(roomId);

            if (cancelled) return;

            setRoom(room);

            let didMouseMove = false;
            let lastClick = 0;
            let clickCount = 0;

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
        };

        void createRoom();

        return () => {
            cancelled = true;

            if (handler) {
                canvas.onclick = null;
                canvas.onmousemove = null;
                canvas.onmousedown = null;
                canvas.onmouseup = null;
            }
        };
    }, [roomId]);

    useEffect(() => {
        const canvas = GetRenderer().canvas;

        if (canvas) {
            canvas.classList.add('bg-black');

            elementRef?.current?.appendChild(canvas);
        }

        const resize = (event: UIEvent) => {
            setWidth(Math.floor(window.innerWidth));
            setHeight(Math.floor(window.innerHeight));
        };

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
        };
    }, []);

    return <div ref={elementRef} className={classNames('size-full')}></div>;
};
