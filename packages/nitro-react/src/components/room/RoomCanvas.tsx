import { RoomGeometryScaleType, RoomRenderedEvent } from '@nitrodevco/nitro-api';
import { GetRenderer, GetStage, GetTicker } from '@nitrodevco/nitro-renderer';
import type { Ticker } from 'pixi.js';
import { forwardRef, useEffect } from 'react';

import { useConfigValue, useRoomMouseActions, useRoomSelector } from '#base/context';
import { useRoomModifications } from '#base/handlers';
import { useRoomCamera, useRoomMouse } from '#base/hooks';

export const RoomCanvas = forwardRef<HTMLDivElement>((props, ref) => {
    const room = useRoomSelector();
    const { mouseDataRef } = useRoomMouse();
    const maxFPS = useConfigValue<number>('fps.limit') ?? 60;
    const { updateRoomCamera } = useRoomCamera();
    const { hasAndResetCursorUpdate, hasCursorOwners } = useRoomMouseActions();

    useRoomModifications();

    useEffect(() => {
        if (!room) return;

        const renderer = GetRenderer();
        const stage = GetStage();
        const ticker = GetTicker();

        // The canvas itself is owned/mounted by the shared <Application> (theme-pixi/
        // PixiApplicationRoot), which also resizes the renderer via resizeTo={window}. This
        // effect only measures the room's own viewport (this component's own ref div, sized
        // via CSS to fill the same area) to reinit the room's internal geometry/camera.
        const handleSize = (width: number, height: number) => {
            let canvas = room.canvas;

            if (!canvas) canvas = room.getRoomCanvas(width, height, RoomGeometryScaleType.ZoomedIn);
            else {
                canvas.initialize(width, height);
            }

            updateRoomCamera(-1);

            if (canvas.master && canvas.master.parent !== stage) stage.addChild(canvas.master);
        }

        let timer: ReturnType<typeof setTimeout>;

        const observer = new ResizeObserver(x => {
            const width = x[0]?.contentRect.width;
            const height = x[0]?.contentRect.height;

            clearTimeout(timer);

            timer = setTimeout(() => handleSize(width, height), 5);
        });

        if (ref && ('current' in ref) && ref.current) {
            observer.observe(ref.current);
        }

        const tick = (ticker: Ticker) => {
            if (!room) return;

            const mouseData = mouseDataRef.current;
            const time = ticker.lastTime;
            const update = false;

            room.update(time, update);

            if (!mouseData.isDragged) updateRoomCamera(time);

            if (mouseData.wasDragged) {
                const offsetX = ~~(room.canvas?.screenOffsetX || 0);
                const offsetY = ~~(room.canvas?.screenOffsetY || 0);

                room.setRoomInstanceRenderingCanvasOffset({ x: (offsetX + mouseData.dragXY.x), y: (offsetY + mouseData.dragXY.y) });

                mouseData.dragXY = { x: 0, y: 0 }
            }

            if (hasAndResetCursorUpdate()) renderer.canvas.style.cursor = hasCursorOwners() ? 'pointer' : 'auto';

            // The shared <Application>'s own render loop (driven by the same shared ticker)
            // renders app.stage - which contains this stage as a child - every frame, so no
            // manual renderer.render() call is needed here.
            room.dispatchEvent(new RoomRenderedEvent(room.roomId, time));
        }

        ticker.add(tick);

        return () => {
            observer.disconnect();
            clearTimeout(timer);
            ticker.remove(tick);
        }
    }, [room, mouseDataRef, hasAndResetCursorUpdate, hasCursorOwners, updateRoomCamera]);

    useEffect(() => {
        const ticker = GetTicker();

        ticker.maxFPS = maxFPS;
    }, [maxFPS]);

    return null;
});
