import { MouseEventType } from '@nitrodevco/nitro-api';
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
        const pixelRatio = GetPixelRatio();
        const width = Math.round(window.innerWidth);
        const height = Math.round(window.innerHeight);
        const widthScaled = Math.round(width * pixelRatio);
        const heightScaled = Math.round(height * pixelRatio);
        const canvas = room.getRoomCanvas(widthScaled, heightScaled, RoomGeometry.SCALE_ZOOMED_IN);

        if (canvas && canvas.master && !canvas?.master?.parent) stage?.addChild(canvas.master);

        if (renderer.canvas) {
            renderer.canvas.style.width = (width).toString() + 'px';
            renderer.canvas.style.height = (height).toString() + 'px';
        }

        if (renderer.width !== widthScaled || renderer.height !== heightScaled) {
            renderer.resize(widthScaled, heightScaled, 1);
        }

        canvas.setScale(pixelRatio);

        //room.camera.targetId = 1;
        //room.camera.targetCategory = RoomObjectCategoryEnum.Floor;

        //room.camera.activateFollowing(1000);

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
            const x = event.clientX - (event.clientX - Math.round((event.clientX * GetPixelRatio())));
            const y = event.clientY - (event.clientY - Math.round((event.clientY * GetPixelRatio())));

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
                x,
                y,
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

            const x = touch.clientX - (touch.clientX - Math.round((touch.clientX * GetPixelRatio())));
            const y = touch.clientY - (touch.clientY - Math.round((touch.clientY * GetPixelRatio())));

            switch (event.type) {
                case 'touchstart':
                    didMouseMove = false;
                    isMouseDown = true;

                    void room.dispatchMouseEvent(x, y, MouseEventType.MOUSE_DOWN, event.altKey, event.ctrlKey, event.shiftKey, isMouseDown);
                    break;
                case 'touchmove':
                    didMouseMove = true;

                    void room.dispatchMouseEvent(x, y, MouseEventType.MOUSE_MOVE, event.altKey, event.ctrlKey, event.shiftKey, isMouseDown);
                    break;
                case 'touchend': {
                    isMouseDown = false;

                    void room.dispatchMouseEvent(x, y, MouseEventType.MOUSE_UP, event.altKey, event.ctrlKey, event.shiftKey, isMouseDown);

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

                    if (eventType) void room.dispatchMouseEvent(x, y, eventType, event.altKey, event.ctrlKey, event.shiftKey, isMouseDown);

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
                        resolution: Math.round(GetPixelRatio()),
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
                    resolution: Math.round(GetPixelRatio())
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
