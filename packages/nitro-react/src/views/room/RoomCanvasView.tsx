import { MouseEventType, RoomObjectVariableEnum, Vector3d } from '@nitrodevco/nitro-api';
import { GetRenderer, GetStage, RoomGeometry } from '@nitrodevco/nitro-renderer';
import { useEffect, useRef, useState } from 'react';

import { useRoomContext } from '../../hooks/room/useRoomContext';

export const RoomCanvasView = () => {
    const { room } = useRoomContext();
    const [size, setSize] = useState<{ width: number; height: number; resolution: number } | undefined>(undefined);
    const elementRef = useRef<HTMLDivElement>(null);

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
        if (!room) return;

        const canvas = GetRenderer().canvas;
        let didMouseMove = false;
        let lastClick = 0;
        let clickCount = 0;

        const handler = (event: MouseEvent) => {
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

            void room.dispatchMouseEvent(
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

        setSize({
            width: Math.floor(window.innerWidth),
            height: Math.floor(window.innerHeight),
            resolution: window.devicePixelRatio,
        });

        return () => {
            canvas.onclick = null;
            canvas.onmousemove = null;
            canvas.onmousedown = null;
            canvas.onmouseup = null;
        };
    }, [room]);

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
            }, 5);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(resizeTimer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div className="size=full" ref={elementRef}></div>;
};
