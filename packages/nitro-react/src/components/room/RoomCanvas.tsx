import { NitroLogger, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { GetRenderer, GetStage, GetTicker, RoomEnterEffect } from '@nitrodevco/nitro-renderer';
import type { Ticker } from 'pixi.js';
import { useEffect, useRef } from 'react';

import { useRoomMouseActions, useRoomSelector } from '#base/context';
import { useRoomCamera, useRoomMouse } from '#base/hooks';
import { useConfigurationStore } from '#base/stores';
import { GetPixelRatio } from '#base/utils';

export const RoomCanvas = () => {
    const room = useRoomSelector();
    const { mouseDataRef } = useRoomMouse();
    const maxFPS = useConfigurationStore<number>(state => state.config['fps.limit'] as number) ?? 60;
    const { updateRoomCamera } = useRoomCamera();
    const { hasAndResetCursorUpdate, hasCursorOwners } = useRoomMouseActions();
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ticker = GetTicker();

        ticker.maxFPS = maxFPS;
    }, [maxFPS]);

    useEffect(() => {
        if (!room) return;

        const renderer = GetRenderer();
        const stage = GetStage();

        const tick = (ticker: Ticker) => {
            if (!room) return;

            const mouseData = mouseDataRef.current;
            const time = ticker.lastTime;
            const update = false;

            RoomEnterEffect.turnVisualizationOn();

            room.update(time, update);

            if (!mouseData.isDragged) updateRoomCamera(time);

            if (mouseData.wasDragged) {
                const offsetX = ~~(room.canvas?.screenOffsetX || 0);
                const offsetY = ~~(room.canvas?.screenOffsetY || 0);

                room.setRoomInstanceRenderingCanvasOffset({ x: (offsetX + mouseData.dragXY.x), y: (offsetY + mouseData.dragXY.y) });

                mouseData.dragXY = { x: 0, y: 0 }
            }

            if (hasAndResetCursorUpdate()) renderer.canvas.style.cursor = hasCursorOwners() ? 'pointer' : 'auto';

            RoomEnterEffect.turnVisualizationOff();

            renderer.render(stage);
        }

        const ticker = GetTicker();

        ticker.add(tick);

        return () => {
            ticker.remove(tick);
        }
    }, [room, mouseDataRef, hasAndResetCursorUpdate, hasCursorOwners, updateRoomCamera]);

    useEffect(() => {
        if (!room) return;

        const renderer = GetRenderer();
        const stage = GetStage();

        if (renderer?.canvas) elementRef?.current?.appendChild(renderer.canvas);

        const handleSize = (width: number, height: number, resolution: number) => {
            const canvas = room.getRoomCanvas(width, height, RoomGeometryScaleType.ZoomedIn);

            renderer.canvas.style.width = `${width}px`;
            renderer.canvas.style.height = `${height}px`;

            if (renderer.width !== width || renderer.height !== height || renderer.resolution !== resolution) {
                renderer.resize(width, height, resolution);

                canvas.geometry.increaseUpdateId();
            }

            if (canvas && canvas.master && !canvas?.master?.parent) stage?.addChild(canvas.master);

            try {
                renderer.render(stage);
            } catch (err) {
                NitroLogger.error(err);
            }
        }

        let timer: ReturnType<typeof setTimeout>;

        const observer = new ResizeObserver(x => {
            const width = x[0]?.contentRect.width;
            const height = x[0]?.contentRect.height;
            const resolution = GetPixelRatio();

            clearTimeout(timer);

            timer = setTimeout(() => handleSize(width, height, resolution), 5);
        });

        if (elementRef.current) observer.observe(elementRef.current);

        return () => {
            observer.disconnect();
            clearTimeout(timer);
        }
    }, [room]);

    return <div className="size-full" ref={elementRef}></div>;
};
