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

        const width = Math.round(window.innerWidth);
        const height = Math.round(window.innerHeight);
        const widthScaled = Math.round(width * window.devicePixelRatio);
        const heightScaled = Math.round(height * window.devicePixelRatio);

        const renderer = GetRenderer();
        const stage = GetStage();
        const canvas = room.getRoomCanvas(widthScaled, heightScaled, RoomGeometry.SCALE_ZOOMED_IN);
        const minX = room.getRoomValue<number>(RoomObjectVariableEnum.RoomMinX) ?? 0;
        const maxX = room.getRoomValue<number>(RoomObjectVariableEnum.RoomMaxX) ?? 0;
        const minY = room.getRoomValue<number>(RoomObjectVariableEnum.RoomMinY) ?? 0;
        const maxY = room.getRoomValue<number>(RoomObjectVariableEnum.RoomMaxY) ?? 0;

        let x = (minX + maxX) / 2;
        let y = (minY + maxY) / 2;

        const offset = 20;

        x = x + (offset - 1);
        y = y + (offset - 1);

        const z = Math.sqrt((offset * offset) + (offset * offset)) * Math.tan((30 / 180) * Math.PI);

        if (canvas) {
            canvas.geometry.location = new Vector3d(x, y, z);

            if (canvas.master && !canvas?.master?.parent) stage?.addChild(canvas.master);
        }

        if (renderer.canvas) {
            renderer.canvas.style.width = (width).toString() + 'px';
            renderer.canvas.style.height = (height).toString() + 'px';
        }

        if (renderer.width !== widthScaled || renderer.height !== heightScaled) {
            renderer.resize(widthScaled, heightScaled, 1);
        }

        renderer.render(stage);
    }, [room, size]);

    useEffect(() => {
        if (!room) return;

        const canvas = GetRenderer().canvas;
        let didMouseMove = false;
        let lastClick = 0;
        let clickCount = 0;

        const handler = (event: MouseEvent) => {
            const x = event.clientX - (event.clientX - Math.round((event.clientX * window.devicePixelRatio)));
            const y = event.clientY - (event.clientY - Math.round((event.clientY * window.devicePixelRatio)));

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

        return () => {
            canvas.onclick = null;
            canvas.onmousemove = null;
            canvas.onmousedown = null;
            canvas.onmouseup = null;
        };
    }, [room]);

    /*useEffect(() => {
        const canvas = GetRenderer().canvas;

        if (canvas) elementRef?.current?.appendChild(canvas);

        let resizeTimer: ReturnType<typeof setTimeout>;

        const observer = new ResizeObserver(entries => {
            clearTimeout(resizeTimer);

            for (const entry of entries) {
                const { width, height } = entry.contentRect;

                if (width <= 0) return;

                resizeTimer = setTimeout(() => {
                    setSize({
                        width: Math.floor(width),
                        height: Math.floor(height),
                        resolution: Math.round(window.devicePixelRatio),
                    });
                }, 5);
            }
        });

        if (elementRef?.current) observer.observe();

        return () => {
            observer.disconnect();
        }
    }, []);*/

    useEffect(() => {
        const canvas = GetRenderer().canvas;

        if (canvas) elementRef?.current?.appendChild(canvas);

        let resizeTimer: ReturnType<typeof setTimeout>;

        const handleResize = (event: UIEvent | undefined) => {
            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {
                setSize({
                    width: Math.round(window.innerWidth),
                    height: Math.round(window.innerHeight),
                    resolution: Math.round(window.devicePixelRatio)
                });
            }, 5);
        };

        window.addEventListener('resize', handleResize);

        handleResize(undefined);

        return () => {
            clearTimeout(resizeTimer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <div className="size-full" ref={elementRef}></div>;
};
