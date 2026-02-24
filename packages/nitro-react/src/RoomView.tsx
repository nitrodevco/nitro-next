import type { IRoom } from '@nitrodevco/nitro-api';
import { MouseEventType, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetRenderer, GetRoomEngine, GetStage, RoomGeometry, RoomPlaneParser } from '@nitrodevco/nitro-renderer';
import { useEffect, useRef, useState } from 'react';

import { classNames } from './utils/classNames';

type RoomViewProps = { roomId: number };

export const RoomView = ({ roomId }: RoomViewProps) => {
    const [room, setRoom] = useState<IRoom | undefined>(undefined);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const createRoom = async () => {
            const room = await GetRoomEngine().createRoom(roomId);

            setRoom(room);

            let didMouseMove = false;
            let lastClick = 0;
            let clickCount = 0;

            const dispatchMouseEvent = (event: MouseEvent) => {
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

            const canvas = GetRenderer().canvas;

            canvas.onclick = event => dispatchMouseEvent(event);
            canvas.onmousemove = event => dispatchMouseEvent(event);
            canvas.onmousedown = event => dispatchMouseEvent(event);
            canvas.onmouseup = event => dispatchMouseEvent(event);
        };

        void createRoom();
    }, [roomId]);

    useEffect(() => {
        if (!room) return;

        const refreshMap = () => {
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

            room.applyRoomMap(planeParser.getMapData());
        };

        refreshMap();

        const renderRoomToStage = (width: number, height: number) => {
            const canvasId = 1;
            const canvas = room.getRoomDisplay(canvasId, width, height, RoomGeometry.SCALE_ZOOMED_IN);

            if (canvas) {
                const geometry = room.getGeometry(canvasId);

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

            return canvas;
        };

        let lastCanvas = renderRoomToStage(Math.floor(window.innerWidth), Math.floor(window.innerHeight));

        const resize = (event: UIEvent) => {
            lastCanvas = renderRoomToStage(Math.floor(window.innerWidth), Math.floor(window.innerHeight));
        };

        window.addEventListener('resize', resize);

        return () => {
            if (lastCanvas) GetStage().removeChild(lastCanvas);

            window.removeEventListener('resize', resize);
        };
    }, [room]);

    useEffect(() => {
        const canvas = GetRenderer().canvas;

        if (!canvas) return;

        const element = elementRef.current;

        if (!element) return;

        canvas.classList.add('bg-black');

        element.appendChild(canvas);
    }, []);

    return <div ref={elementRef} className={classNames('size-full')}></div>;
};
