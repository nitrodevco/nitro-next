import { RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import { GetRenderer, GetRoomEngine, GetStage, RoomGeometry, RoomMapData } from '@nitrodevco/nitro-renderer';
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

        const createRoom = async () => {
            const room = await roomEngine.createRoom(roomId, new RoomMapData());
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

                    //geometry.location = new Vector3d(x, y, z);
                }

                GetStage().addChild(canvas);
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
