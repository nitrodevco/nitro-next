/**
 * `uibuilder/presets/applications/FloorDrawingPreset` - the drawable tile grid of the "in
 * neighbourhood" selector: an isometric square of tiles around a root tile, blue where a tile is
 * part of the neighbourhood, with the floor plan editor's border pieces around it and the entry
 * marker on the root tile.
 *
 * Flash composes one bitmap with `copyPixels`; here every piece is its own image in the same
 * order (tiles row by row, the root marker, the borders), the two tile colours being the base
 * tile under Flash's `ColorTransform` multipliers, which is what a tint is.
 *
 * Pressing draws with the current `mode`, dragging keeps drawing along the line between two
 * pointer positions (`interpolationPoints`), and a drag that starts with Shift held fills the
 * rectangle between its start and the pointer, redone from the plan the drag started with on
 * every move (Flash's temporary cache). It is controlled: the plan, the root tile and the mode
 * belong to the element's form. Several pointer events can arrive between two renders, so the
 * drag works on its own copy of the latest plan and root rather than on the props.
 *
 * It has a static width (the bitmap's), so it goes inside `WiredFloorEditor` or another
 * centring container. Dragging needs pointer-move events, which only the Pixi target's `Box`
 * forwards.
 */
import { FederatedPointerEvent } from 'pixi.js';
import { useEffect, useRef } from 'react';

import { Box, LayoutImage, Region, ThemeImage } from '#base/theme';
import { drawNeighborhoodTile, FLOOR_DRAW_MODE_ADD_TILE, FLOOR_DRAW_MODE_SET_ROOT_TILE, FloorDrawMode, floorScreenToTile, floorTileToScreen, interpolationPoints, isFloorDrawAllowed, isNeighborhoodTileOccupied, NEIGHBORHOOD_RADIUS, NeighborhoodFloorPlan, neighborhoodVisualizingDimension, neighborhoodVisualizingRadius, TilePoint } from '#base/wired';

import { useWiredFillLayout } from './useWiredFillLayout';
import { useWiredStyle } from './WiredStyleContext';

/** `TAKEN_TILE_RGB` `[ 0, 0.4, 0.8 ]` and `UNTAKEN_TILE_RGB` `[ 0.2, 0.2, 0.2 ]` as tints. */
const TAKEN_TILE_TINT = '#0066cc';
const UNTAKEN_TILE_TINT = '#333333';

const TILE_BASE = LayoutImage('wired/floor_editor_tile_base.png');
const TILE_ENTRY = LayoutImage('wired/wired_floor_editor_tile_entry.png');
const TILE_WIDTH = 18;
const TILE_HEIGHT = 9;

interface Piece {
    key: string;
    x: number;
    y: number;
    src: string;
    tint?: string;
}

interface Drag {
    last: TilePoint;
    /** A Shift drag: where it started and the plan it started with. */
    rect: { start: TilePoint; base: NeighborhoodFloorPlan } | null;
}

export interface WiredFloorDrawingProps {
    plan: NeighborhoodFloorPlan;
    /** `NeighborhoodFloor.smallMode` - show the 11 x 11 middle instead of all 21 x 21 tiles. */
    smallMode: boolean;
    /** The root tile, relative to the centre (`setRootTile`). */
    rootX: number;
    rootY: number;
    mode: FloorDrawMode;
    /** `NeighborhoodFloor.occupationHasChanged`. */
    onPlanChange: (plan: NeighborhoodFloorPlan) => void;
    /** The preset's root tile callback - the root was set by drawing in `set_root_tile` mode. */
    onRootTileChange: (x: number, y: number) => void;
}

export const WiredFloorDrawing = ({ plan, smallMode, rootX, rootY, mode, onPlanChange, onRootTileChange }: WiredFloorDrawingProps) => {
    const style = useWiredStyle();
    const dragRef = useRef<Drag | null>(null);
    const planRef = useRef(plan);

    useEffect(() => {
        planRef.current = plan;
    }, [ plan ]);

    const radius = neighborhoodVisualizingRadius(smallMode);
    const dimension = neighborhoodVisualizingDimension(smallMode);
    const planOffset = NEIGHBORHOOD_RADIUS - radius;

    // The bitmap's bounds: the west border corner is its left edge, the north one its top.
    const originX = -floorTileToScreen(-1, dimension).x;
    const originY = -floorTileToScreen(-1, -1).y;
    const width = floorTileToScreen(dimension, -1).x + TILE_WIDTH + originX;
    const height = floorTileToScreen(dimension, dimension).y + TILE_HEIGHT + originY;

    const fillLayout = useWiredFillLayout(width);

    const pieces: Piece[] = [];
    const push = (key: string, tileX: number, tileY: number, src: string, tint?: string) => {
        const screen = floorTileToScreen(tileX, tileY);

        pieces.push({ key, x: screen.x + originX, y: screen.y + originY, src, tint });
    };

    for (let y = 0; y < dimension; y++) {
        for (let x = 0; x < dimension; x++) {
            push(`tile:${x}:${y}`, x, y, TILE_BASE, isNeighborhoodTileOccupied(plan, x + planOffset, y + planOffset) ? TAKEN_TILE_TINT : UNTAKEN_TILE_TINT);
        }
    }

    if ((rootX >= -radius) && (rootX <= radius) && (rootY >= -radius) && (rootY <= radius)) push('root', rootX + radius, rootY + radius, TILE_ENTRY);

    for (let x = 0; x < dimension; x++) {
        push(`n:${x}`, x, -1, LayoutImage('wired/fp_border_N.png'));
        push(`s:${x}`, x, dimension, LayoutImage('wired/fp_border_S.png'));
    }

    for (let y = 0; y < dimension; y++) {
        push(`w:${y}`, -1, y, LayoutImage('wired/fp_border_W.png'));
        push(`e:${y}`, dimension, y, LayoutImage('wired/fp_border_E.png'));
    }

    push('nw', -1, -1, LayoutImage('wired/fp_border_NW.png'));
    push('ne', dimension, -1, LayoutImage('wired/fp_border_NE.png'));
    push('se', dimension, dimension, LayoutImage('wired/fp_border_SE.png'));
    push('sw', -1, dimension, LayoutImage('wired/fp_border_SW.png'));

    /** `applyDraw` - one tile with the current mode. */
    const applyDraw = (tile: TilePoint) => {
        if (!isFloorDrawAllowed(smallMode, tile.x, tile.y)) return;

        if (mode === FLOOR_DRAW_MODE_SET_ROOT_TILE) return onRootTileChange(tile.x - radius, tile.y - radius);

        planRef.current = drawNeighborhoodTile(planRef.current, smallMode, tile.x, tile.y, mode === FLOOR_DRAW_MODE_ADD_TILE);
    };

    const commit = (before: NeighborhoodFloorPlan) => {
        if (planRef.current !== before) onPlanChange(planRef.current);
    };

    const tileAt = (event: FederatedPointerEvent): TilePoint => {
        const local = event.getLocalPosition(event.currentTarget);

        // Flash hands `transformFromScreenSpace` whole pixels, measured from `int(width / 2)` and the bitmap's top.
        return floorScreenToTile(Math.floor(local.x) - Math.trunc(width / 2), Math.floor(local.y));
    };

    const handlePointerDown = (event: FederatedPointerEvent) => {
        const tile = tileAt(event);
        const before = planRef.current;

        dragRef.current = { last: tile, rect: event.shiftKey ? { start: tile, base: before } : null };

        applyDraw(tile);
        commit(before);
    };

    const handlePointerMove = (event: FederatedPointerEvent) => {
        const drag = dragRef.current;

        if (!drag) return;

        const tile = tileAt(event);
        const before = planRef.current;

        if (drag.rect && (mode !== FLOOR_DRAW_MODE_SET_ROOT_TILE)) {
            planRef.current = drag.rect.base;

            for (let x = Math.min(drag.rect.start.x, tile.x); x <= Math.max(drag.rect.start.x, tile.x); x++) {
                for (let y = Math.min(drag.rect.start.y, tile.y); y <= Math.max(drag.rect.start.y, tile.y); y++) applyDraw({ x, y });
            }
        } else {
            if ((drag.last.x !== tile.x) || (drag.last.y !== tile.y)) applyDraw(tile);

            // `interpolateBetweenLastPointAndDrawPoint` - the tiles between, both ends excluded.
            for (const point of interpolationPoints(drag.last.x, drag.last.y, tile.x, tile.y)) {
                const isEnd = ((point.x === drag.last.x) && (point.y === drag.last.y)) || ((point.x === tile.x) && (point.y === tile.y));

                if (!isEnd) applyDraw(point);
            }
        }

        drag.last = tile;

        commit(before);
    };

    const handlePointerUp = () => {
        dragRef.current = null;
    };

    return (
        <Box
            eventMode="static"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerUpOutside={handlePointerUp}
            layout={{ ...fillLayout, height }}
        >
            <Region
                backgroundColor={style.advancedBackgroundColor}
                layout={{ position: 'absolute', left: 0, top: 0, width, height }}
            />
            {pieces.map(piece => (
                <ThemeImage
                    key={piece.key}
                    src={piece.src}
                    tint={piece.tint}
                    eventMode="none"
                    layout={{ position: 'absolute', left: piece.x, top: piece.y }}
                />
            ))}
        </Box>
    );
};
