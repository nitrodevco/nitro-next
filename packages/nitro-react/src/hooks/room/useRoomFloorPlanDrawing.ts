import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useCallback, useEffect, useRef } from 'react';

import { getGlobalRect } from '#base/theme';
import {
    applyFloorPlanDraw, cloneFloorPlanModel, expandFloorPlanTo, FloorPlanDrawMode, FloorPlanModel, floorPlanScreenToTile,
    FloorPlanTile, resetFloorPlanRows,
} from '#base/utils';
import { interpolationPoints } from '#base/wired';

/**
 * The floor plan editor's drawing gesture - `HeightMapEditor.editorWindowProcedure`, with the two
 * helpers it leans on: `interpolateBetweenLastPointAndDrawPoint` and the shift-drag rectangle.
 *
 * A press takes a working copy of the map and every move writes into that copy, so the whole drag
 * is one continuous edit however often React re-renders underneath it. Each change is handed to
 * `onCommit`, which is what redraws the map and the preview.
 *
 * The moves arrive as window-level pointer events rather than Pixi ones, the way `useFrameDrag`
 * takes them: a drag that runs off the edge of the map has to keep drawing, which is what Flash's
 * `mouse_capturer` region covering the whole scrolling view was for.
 *
 * `HeightMapEditor.colorPickMode` is left out. Only `BCFloorPlanEditor.onKeyboardEvent` turns it
 * on and nothing in the client calls that method, so the mode is unreachable in Flash too - and
 * shift therefore belongs to the rectangle select below rather than to picking a height.
 */
export interface RoomFloorPlanDrawingOptions {
    /** The map as the store has it; a press clones this once and works on the copy. */
    model: FloorPlanModel;
    drawMode: FloorPlanDrawMode;
    /** The height `add_tile` writes - the colour map slider's level. */
    drawingHeight: number;
    zoom: number;
    /** The rows after each change, and the entry tile when `set_enter_tile` moved it. */
    onCommit: (rows: string[], entryPoint: FloorPlanTile | null) => void;
    /** A growth the size limits refused. Flash alerted once per received map and stopped the drag; the drag stops here and the caller owns the alert. */
    onSizeLimitReached: () => void;
}

/** `HeightMapEditor._lastDrawAddress` / `_selectionStartPoint` start off the map entirely. */
const NO_TILE: FloorPlanTile = { x: -1000, y: -1000 };

export const useRoomFloorPlanDrawing = (options: RoomFloorPlanDrawingOptions) => {
    const optionsRef = useRef(options);
    const nodeRef = useRef<PixiContainer | null>(null);
    const drawingRef = useRef(false);
    const listenersRef = useRef<{ move: (event: PointerEvent) => void; up: (event: PointerEvent) => void } | null>(null);

    useEffect(() => {
        optionsRef.current = options;
    });

    const stopDrawing = useCallback(() => {
        const listeners = listenersRef.current;

        if (listeners) {
            window.removeEventListener('pointermove', listeners.move);
            window.removeEventListener('pointerup', listeners.up);
            listenersRef.current = null;
        }

        drawingRef.current = false;
    }, []);

    useEffect(() => stopDrawing, [ stopDrawing ]);

    const attachHeightMap = useCallback((node: PixiContainer | null) => {
        nodeRef.current = node;
    }, []);

    const onPointerDown = (event: FederatedPointerEvent) => {
        if (event.button !== 0) return;

        const node = nodeRef.current;

        if (!node) return;

        const draft = cloneFloorPlanModel(optionsRef.current.model);
        /** `FloorPlanCache._floorPlanCacheBuffer` - the rows the rectangle select redraws from, only ever set for a shift-drag. */
        const buffer = event.shiftKey ? [ ...draft.rows ] : null;

        let selectionStart = NO_TILE;
        let lastDraw = NO_TILE;
        let entryPoint: FloorPlanTile | null = null;

        drawingRef.current = true;

        /*
         * The map grows while it is drawn on, which moves its own top-left corner, so the picture's
         * position is read per event rather than captured with the press - `HeightMapEditor` went
         * through the live bitmap window for the same reason.
         */
        const tileAt = (clientX: number, clientY: number): FloorPlanTile => {
            const rect = getGlobalRect(node);

            return floorPlanScreenToTile(clientX - rect.x, clientY - rect.y, optionsRef.current.zoom, draft.height);
        };

        const draw = (x: number, y: number) => {
            const { drawMode, drawingHeight } = optionsRef.current;
            const movedEntryPoint = applyFloorPlanDraw(draft, x, y, drawMode, drawingHeight);

            if (movedEntryPoint) entryPoint = movedEntryPoint;
        };

        const commit = () => {
            optionsRef.current.onCommit([ ...draft.rows ], entryPoint);

            entryPoint = null;

            if (!draft.sizeLimitReached) return;

            // `FloorPlanCache` alerted and set `heightMapEditor.drawing = false`, which ends the drag.
            draft.sizeLimitReached = false;

            optionsRef.current.onSizeLimitReached();
            stopDrawing();
        };

        /**
         * The shift-drag rectangle. Flash grows the map to the rectangle's far corner, and where
         * that does not fit pulls the corner back a tile at a time until it does; then it redraws
         * the whole rectangle from the buffered rows, so an earlier and larger one leaves nothing
         * behind.
         */
        const drawRectangle = (tile: FloorPlanTile) => {
            if (!buffer) return;

            const left = Math.min(selectionStart.x, tile.x);
            const top = Math.min(selectionStart.y, tile.y);

            let right = Math.max(selectionStart.x, tile.x);
            let bottom = Math.max(selectionStart.y, tile.y);
            let { columns, rows } = expandFloorPlanTo(draft, right, bottom);

            if (!columns && !rows) return;

            while ((bottom >= top) && !rows) {
                bottom--;
                rows = expandFloorPlanTo(draft, right, bottom).rows;
            }

            while ((right >= left) && !columns) {
                right--;
                columns = expandFloorPlanTo(draft, right, bottom).columns;
            }

            if (!columns || !rows) return;

            resetFloorPlanRows(draft, buffer);
            expandFloorPlanTo(draft, right, bottom);

            for (let x = left; x <= right; x++) {
                for (let y = top; y <= bottom; y++) draw(x, y);
            }

            commit();
        };

        const handleMove = (moveEvent: PointerEvent) => {
            if (!drawingRef.current) return;

            const tile = tileAt(moveEvent.clientX, moveEvent.clientY);
            const moved = (lastDraw.x !== tile.x) || (lastDraw.y !== tile.y);

            if (buffer) {
                drawRectangle(tile);
            } else {
                if (moved) draw(tile.x, tile.y);

                /*
                 * `interpolateBetweenLastPointAndDrawPoint`: a fast drag skips tiles, so the line
                 * between the last address and this one is filled in - both ends excluded, since
                 * the moves that own them draw them.
                 */
                for (const point of interpolationPoints(lastDraw.x, lastDraw.y, tile.x, tile.y)) {
                    if ((point.x === lastDraw.x) && (point.y === lastDraw.y)) continue;
                    if ((point.x === tile.x) && (point.y === tile.y)) continue;

                    draw(point.x, point.y);
                }

                if (moved) commit();
            }

            lastDraw = tile;
        };

        const handleUp = (upEvent: PointerEvent) => {
            if (upEvent.pointerId !== event.pointerId) return;

            stopDrawing();
        };

        const start = tileAt(event.clientX, event.clientY);

        selectionStart = start;

        draw(start.x, start.y);
        commit();

        lastDraw = start;

        listenersRef.current = { move: handleMove, up: handleUp };

        window.addEventListener('pointermove', handleMove);
        window.addEventListener('pointerup', handleUp);
    };

    return { attachHeightMap, onPointerDown };
};
