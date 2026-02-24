import { RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetRenderer, GetRoomEngine, GetStage, RoomGeometry, RoomPlaneParser } from '@nitrodevco/nitro-renderer';
import { useEffect, useRef } from 'react';

import { classNames } from './utils/classNames';

type RoomViewProps = { roomId: number };

export const RoomView = ({ roomId }: RoomViewProps) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const roomEngine = GetRoomEngine();
        const canvasId = 1;
        const width = Math.floor(window.innerWidth);
        const height = Math.floor(window.innerHeight);
        const renderer = GetRenderer();

        if (renderer) renderer.resize(width, height);

        const createRoom = async () => {
            const size = 10;
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

            planeParser.initializeFromTileData();

            const room = await roomEngine.createRoom(roomId, planeParser.getMapData());
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

                GetStage().addChild(canvas);
                GetRenderer().render(GetStage());
                //GetRenderer().resize(width, height, window.devicePixelRatio);
            }
        };

        void createRoom();
    }, [roomId]);

    useEffect(() => {
        const canvas = GetRenderer().canvas;

        if (!canvas) return;

        /* canvas.onclick = event => DispatchMouseEvent(event);
        canvas.onmousemove = event => DispatchMouseEvent(event);
        canvas.onmousedown = event => DispatchMouseEvent(event);
        canvas.onmouseup = event => DispatchMouseEvent(event);

        canvas.ontouchstart = event => DispatchTouchEvent(event);
        canvas.ontouchmove = event => DispatchTouchEvent(event);
        canvas.ontouchend = event => DispatchTouchEvent(event);
        canvas.ontouchcancel = event => DispatchTouchEvent(event); */

        const element = elementRef.current;

        if (!element) return;

        canvas.classList.add('bg-black');

        element.appendChild(canvas);
    }, []);

    return <div ref={elementRef} className={classNames('size-full')}></div>;
};
