import { MouseEventType, Vector3d } from '@nitrodevco/nitro-api';
import { GetRenderer, GetStage, RoomGeometry } from '@nitrodevco/nitro-renderer';
import { useEffect, useRef, useState } from 'react';

import { useRoomContext } from '#base/hooks';
import { GetPixelRatio } from '#base/utils';

export const RoomCanvasView = () => {
    const { room } = useRoomContext();
    const [size, setSize] = useState<{ width: number; height: number; resolution: number } | undefined>(undefined);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!room || !size) return;

        const renderer = GetRenderer();
        const stage = GetStage();
        const width = Math.round(size.width);
        const height = Math.round(size.height);
        const canvas = room.getRoomCanvas(width, height, RoomGeometry.SCALE_ZOOMED_IN);

        renderer.canvas.style.width = `${width}px`;
        renderer.canvas.style.height = `${height}px`;

        if (renderer.resolution !== size.resolution) {
            room.camera.reset();
            room.camera.setTarget(new Vector3d(0, 0, 0));
        }

        if (renderer.width !== width || renderer.height !== height || renderer.resolution !== size.resolution) renderer.resize(width, height, size.resolution);

        if (canvas && canvas.master && !canvas?.master?.parent) stage?.addChild(canvas.master);

        renderer.render(stage);
    }, [room, size]);

    useEffect(() => {
        if (!room) return;

        const canvas = GetRenderer().canvas;
        let didMouseMove = false;
        let isMouseDown = false;
        let lastClick = 0;
        let clickCount = 0;

        const mouseHandler = (event: MouseEvent) => {
            event.preventDefault();

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
                    isMouseDown = true;
                    break;
                case MouseEventType.MOUSE_UP:
                    isMouseDown = false;
                    break;
                case MouseEventType.RIGHT_CLICK:
                    break;
                default:
                    return;
            }

            void room.dispatchMouseEvent(
                event.clientX,
                event.clientY,
                eventType,
                event.altKey,
                event.ctrlKey || event.metaKey,
                event.shiftKey,
                isMouseDown,
            );
        };

        const touchHandler = (event: TouchEvent) => {
            event.preventDefault();

            const touch = event.changedTouches[0];

            if (!touch) return;

            switch (event.type) {
                case 'touchstart':
                    didMouseMove = false;
                    isMouseDown = true;

                    void room.dispatchMouseEvent(touch.clientX, touch.clientY, MouseEventType.MOUSE_DOWN, event.altKey, event.ctrlKey, event.shiftKey, isMouseDown);
                    break;
                case 'touchmove':
                    didMouseMove = true;

                    void room.dispatchMouseEvent(touch.clientX, touch.clientY, MouseEventType.MOUSE_MOVE, event.altKey, event.ctrlKey, event.shiftKey, isMouseDown);
                    break;
                case 'touchend': {
                    isMouseDown = false;

                    void room.dispatchMouseEvent(touch.clientX, touch.clientY, MouseEventType.MOUSE_UP, event.altKey, event.ctrlKey, event.shiftKey, isMouseDown);

                    let eventType: string | undefined = undefined;

                    if (!didMouseMove) {
                        eventType = MouseEventType.MOUSE_CLICK;

                        if (lastClick) {
                            clickCount = 1;

                            if (lastClick >= Date.now() - 300) clickCount++;
                        }
                    }

                    if (clickCount === 2) {
                        if (!didMouseMove) eventType = MouseEventType.DOUBLE_CLICK;

                        clickCount = 0;
                        lastClick = 0;
                    }

                    if (eventType) void room.dispatchMouseEvent(touch.clientX, touch.clientY, eventType, event.altKey, event.ctrlKey, event.shiftKey, isMouseDown);

                    break;
                }
            }
        };

        canvas.onclick = mouseHandler;
        canvas.onmousemove = mouseHandler;
        canvas.onmousedown = mouseHandler;
        canvas.onmouseup = mouseHandler;

        canvas.ontouchstart = touchHandler;
        canvas.ontouchmove = touchHandler;
        canvas.ontouchend = touchHandler;

        return () => {
            canvas.onclick = null;
            canvas.onmousemove = null;
            canvas.onmousedown = null;
            canvas.onmouseup = null;

            canvas.ontouchstart = null;
            canvas.ontouchmove = null;
            canvas.ontouchend = null;
        };
    }, [room]);

    useEffect(() => {
        const renderer = GetRenderer();
        const element = elementRef?.current;

        if (!renderer || !element) return;

        if (renderer.canvas) elementRef?.current?.appendChild(renderer.canvas);

        let timer: ReturnType<typeof setTimeout>;

        const handleResize = (size: { width: number, height: number, resolution: number }) => {
            clearTimeout(timer);

            timer = setTimeout(() => setSize(size), 5);
        };

        const observer = new ResizeObserver(() => {
            const width = element.clientWidth;
            const height = element.clientHeight;
            const resolution = GetPixelRatio();

            handleResize({ width, height, resolution });
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
            clearTimeout(timer);
        }
    }, []);

    return <div className="size-full" ref={elementRef}></div>;
};
