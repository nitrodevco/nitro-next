import { AvatarGenderType, RoomThicknessType } from '@nitrodevco/nitro-api';
import { useMemo, useState } from 'react';

import { FLOOR_PLAN_WALL_HEIGHT_LIMIT } from '#base/context/room';
import { useRoomFloorPlanDrawing } from '#base/hooks';
import { Shape, TemplateBindings, TemplateWindow, TemplateWindows, useAvatarImageTexture } from '#base/theme';
import {
    buildFloorPlanHeightMap, buildFloorPlanPreview, FLOOR_PLAN_DRAW_MODES, FLOOR_PLAN_LEVELS, FLOOR_PLAN_ZOOM_LARGE,
    FLOOR_PLAN_ZOOM_NORMAL, FloorPlanDrawMode, floorPlanHeightColors, FloorPlanModel, floorPlanOccupiedHeightColors, FloorPlanTile,
    toCssHexColor,
} from '#base/utils';

import { FloorPlanHeightMapView } from './FloorPlanHeightMapView';
import { FloorPlanImportExportView } from './FloorPlanImportExportView';
import { FloorPlanPreviewView } from './FloorPlanPreviewView';
import { useFloorPlanSliderDrag } from './useFloorPlanSliderDrag';

/**
 * The floor plan editor - `BCFloorPlanEditor`, on the `habbo-window-manager-com/floor_plan_editor_bc`
 * layout. The map on the left (`heightmap_bitmap`) is drawn on with the five tools above it; the
 * panel on the right holds the door direction, the two thickness menus, the fixed wall height and
 * the isometric preview (`preview_bitmap`).
 *
 * - `update` holds the current tool's button down (`state | 0x10`): its `pressed`.
 * - `createTileHeightColorMap` fills `tile_height_colormap` with the height colours, and
 *   `colorMapWindowProcedure` picks the draw height off it; `updateColorSliderTrack` moves
 *   `tile_height_slider_track` under the pick.
 * - `HeightMapEditor` takes its presses on `mouse_capturer`, the region over the whole scrolling
 *   map, and draws where they fall on `heightmap_bitmap`.
 * - `updateWallHeight` / `enableWallHeightControls`: the wall height's number and track, and the
 *   four controls disabled at a blend of 0.6 while the checkbox is off.
 * - `updateEntryDirectionAvatar`: the `enterdirection_ghost_avatar` widget faces the door's direction.
 * - `centerScrollableViews` scrolls both views to the middle when the window is shown.
 *
 * `refresh`, beside the preview, stays `visible="false"` as the layout has it: Flash rebuilt the
 * preview on a two-second timer (`PREVIEW_UPDATE_MS`) and its click only did that sooner. The
 * preview here follows the map directly.
 */
export interface FloorPlanEditorViewProps {
    model: FloorPlanModel;
    /** The map as text, for the import/export dialog to open on. */
    modelData: string;
    /** `BCFloorPlanEditor.lastReceivedFloorPlan` - what a revert goes back to. */
    receivedModel: string;
    entryPoint: FloorPlanTile | null;
    entryPointDir: number;
    wallThickness: RoomThicknessType;
    floorThickness: RoomThicknessType;
    /** `-1` while the walls follow the floor. */
    fixedWallsHeight: number;
    /** Builder's Club time left, or staff. Flash disables the save without it. */
    canSave: boolean;
    onCommit: (rows: string[], entryPoint: FloorPlanTile | null) => void;
    onSizeLimitReached: () => void;
    onEntryPointDirChange: (dir: number) => void;
    onThicknessChange: (wallThickness: RoomThicknessType, floorThickness: RoomThicknessType) => void;
    onFixedWallsHeightChange: (height: number) => void;
    onSave: (fixedWallsHeight: number) => void;
    onReload: () => void;
    onSaveImport: (modelData: string) => void;
    onClose: () => void;
}

/** `AvatarImageWidget.FIGURE_DEFAULT` - the figure the empty `avatar_image` widget draws. */
const GHOST_FIGURE = 'hd-180-1.ch-210-66.lg-270-82.sh-290-81';

/** `enterdirection_ghost_avatar`'s `avatar_image:scale` is `sh`: `AvatarImageWidget.refresh` draws it at half size. */
const GHOST_SCALE = 0.5;

/**
 * The `wall_thickness_drop` / `floor_thickness_drop` items in the layout's order - the index
 * `getThicknessSelectionIndex` / `getThicknessSettingBySelectionIndex` map to.
 */
const THICKNESSES: RoomThicknessType[] = [ RoomThicknessType.Thinnest, RoomThicknessType.Thin, RoomThicknessType.Normal, RoomThicknessType.Thick ];

/** `tile_height_colormap`'s and `wall_height_slider`'s widths, which the drags measure the pointer against. */
const COLORMAP_WIDTH = 315;
const COLORMAP_HEIGHT = 19;
const WALL_SLIDER_WIDTH = 111;

/** `enableWallHeightControls`: what it dims rather than hides. */
const DISABLED_BLEND = 0.6;

/**
 * `createTileHeightColorMap`: each pixel column of the colour map in the colour at `x / width` of
 * the map - thirty bands, each the columns that land on its colour.
 */
const COLORMAP_BANDS = Array.from({ length: FLOOR_PLAN_LEVELS }, (_, level) => {
    const left = Math.ceil((level * COLORMAP_WIDTH) / FLOOR_PLAN_LEVELS);

    return { level, left, width: Math.ceil(((level + 1) * COLORMAP_WIDTH) / FLOOR_PLAN_LEVELS) - left };
});

/** `centerScrollableViews`: both views scrolled to the middle of each axis. */
const CENTERED = 0.5;

export const FloorPlanEditorView = ({
    model, modelData, receivedModel, entryPoint, entryPointDir, wallThickness, floorThickness, fixedWallsHeight, canSave,
    onCommit, onSizeLimitReached, onEntryPointDirChange, onThicknessChange, onFixedWallsHeightChange,
    onSave, onReload, onSaveImport, onClose,
}: FloorPlanEditorViewProps) => {
    const [ drawMode, setDrawMode ] = useState<FloorPlanDrawMode>(FLOOR_PLAN_DRAW_MODES[0]);
    const [ drawingHeight, setDrawingHeight ] = useState(0);
    const [ zoom, setZoom ] = useState(FLOOR_PLAN_ZOOM_NORMAL);
    const [ importExportVisible, setImportExportVisible ] = useState(false);

    /*
     * `isWallHeightSettingSelected` is the checkbox's own state, not the height's: unticking it
     * sends -1 without forgetting the height that was picked, and `updateWallHeight` only ticks it
     * again when a new map arrives with a fixed height. Adjusted during render rather than in an
     * effect, so the controls never paint a frame out of step with the map they belong to.
     */
    const [ wallHeightState, setWallHeightState ] = useState({ enabled: fixedWallsHeight >= 0, forHeight: fixedWallsHeight });

    if (wallHeightState.forHeight !== fixedWallsHeight) setWallHeightState({ enabled: fixedWallsHeight >= 0, forHeight: fixedWallsHeight });

    const wallHeightEnabled = wallHeightState.enabled;
    const wallHeightValue = Math.max(0, fixedWallsHeight);

    const { attachHeightMap, onPointerDown } = useRoomFloorPlanDrawing({
        model,
        drawMode,
        drawingHeight,
        zoom,
        onCommit,
        onSizeLimitReached,
    });

    // `HeightMapEditor.set drawingHeight` clamps to LEVELS, one past the last colour.
    const onColorMapPointerDown = useFloorPlanSliderDrag(FLOOR_PLAN_LEVELS, COLORMAP_WIDTH, height => setDrawingHeight(Math.min(FLOOR_PLAN_LEVELS, Math.max(0, height))));
    const onWallSliderPointerDown = useFloorPlanSliderDrag(
        FLOOR_PLAN_WALL_HEIGHT_LIMIT,
        WALL_SLIDER_WIDTH,
        height => onFixedWallsHeightChange(Math.min(FLOOR_PLAN_WALL_HEIGHT_LIMIT - 1, Math.max(0, height))),
        !wallHeightEnabled,
    );

    const heightColors = useMemo(() => floorPlanHeightColors(FLOOR_PLAN_LEVELS), []);
    const occupiedColors = useMemo(() => floorPlanOccupiedHeightColors(FLOOR_PLAN_LEVELS), []);
    const heightMap = useMemo(() => buildFloorPlanHeightMap(model, zoom, entryPoint, heightColors, occupiedColors), [ model, zoom, entryPoint, heightColors, occupiedColors ]);
    const preview = useMemo(() => buildFloorPlanPreview(model, entryPoint), [ model, entryPoint ]);
    const ghost = useAvatarImageTexture(GHOST_FIGURE, AvatarGenderType.Male, { direction: entryPointDir, scale: GHOST_SCALE });

    const wallHeightControl = { disabled: !wallHeightEnabled, blend: wallHeightEnabled ? 1 : DISABLED_BLEND };

    const arrange = ({ find }: TemplateWindows) => {
        // `updateColorSliderTrack`.
        const colorMap = find('tile_height_colormap');

        find('tile_height_slider_track')?.setX(drawingHeight * ((colorMap?.width ?? COLORMAP_WIDTH) / FLOOR_PLAN_LEVELS));

        // `updateWallHeight`.
        const wallSlider = find('wall_height_slider');

        find('wall_height_slider_track')?.setX(wallHeightValue * ((wallSlider?.width ?? WALL_SLIDER_WIDTH) / FLOOR_PLAN_WALL_HEIGHT_LIMIT));

        // `heightmap_bitmap` and `preview_bitmap` are `fit_size_to_contents`: each the size of the bitmap drawn into it.
        const heightMapBitmap = find('heightmap_bitmap');
        const previewBitmap = find('preview_bitmap');

        heightMapBitmap?.setRectangle(heightMapBitmap.x, heightMapBitmap.y, heightMap.width, heightMap.height);
        previewBitmap?.setRectangle(previewBitmap.x, previewBitmap.y, preview.width, preview.height);

        // `AvatarImageWidget.refresh`: the widget is its image's size.
        const ghostWidget = find('enterdirection_ghost_avatar');

        if (ghostWidget && ghost.texture) ghostWidget.setRectangle(ghostWidget.x, ghostWidget.y, ghost.width, ghost.height);
    };

    const bindings: TemplateBindings = {
        // `update`: the current tool's button held down.
        ...Object.fromEntries(FLOOR_PLAN_DRAW_MODES.map(mode => [ mode, { pressed: drawMode === mode, onPointerTap: () => setDrawMode(mode) } ])),
        // `createTileHeightColorMap` / `colorMapWindowProcedure`.
        tile_height_colormap: {
            onPointerDown: onColorMapPointerDown,
            children: COLORMAP_BANDS.map(band => (
                <Shape
                    key={band.level}
                    color={toCssHexColor(heightColors[band.level])}
                    layout={{ position: 'absolute', left: band.left, top: 0, width: band.width, height: COLORMAP_HEIGHT }}
                />
            )),
        },
        heightmap_wrapper: { scrollH: CENTERED, scrollV: CENTERED },
        heightmap_bitmap: { children: (
            <FloorPlanHeightMapView
                picture={heightMap}
                zoom={zoom}
                attachHeightMap={attachHeightMap}
            />
        ) },
        mouse_capturer: { onPointerDown },
        zoom: { onPointerTap: () => setZoom(zoom === FLOOR_PLAN_ZOOM_NORMAL ? FLOOR_PLAN_ZOOM_LARGE : FLOOR_PLAN_ZOOM_NORMAL) },
        enterdirection_left: { onPointerTap: () => onEntryPointDirChange(entryPointDir + 1) },
        enterdirection_right: { onPointerTap: () => onEntryPointDirChange(entryPointDir - 1) },
        enterdirection_ghost_avatar: {
            children: ghost.texture && (
                <pixiSprite
                    texture={ghost.texture}
                    eventMode="none"
                    layout={{ position: 'absolute', left: 0, top: 0, width: ghost.width, height: ghost.height }}
                />
            ),
        },
        // `updateThicknessSelection`; `save` reads the selections back.
        wall_thickness_drop: { selection: THICKNESSES.indexOf(wallThickness), onSelect: index => onThicknessChange(THICKNESSES[index], floorThickness) },
        floor_thickness_drop: { selection: THICKNESSES.indexOf(floorThickness), onSelect: index => onThicknessChange(wallThickness, THICKNESSES[index]) },
        walls_fixed_height_enabled_checkbox: {
            selected: wallHeightEnabled,
            onPointerTap: () => setWallHeightState({ enabled: !wallHeightEnabled, forHeight: fixedWallsHeight }),
        },
        wall_height_text: wallHeightControl,
        wall_height_number: { ...wallHeightControl, caption: String(wallHeightValue + 1) },
        wall_height_slider: { ...wallHeightControl, onPointerDown: onWallSliderPointerDown },
        wall_height_slider_track: wallHeightControl,
        preview_wrapper: { scrollH: CENTERED, scrollV: CENTERED },
        preview_bitmap: { children: <FloorPlanPreviewView picture={preview} /> },
        reload: { onPointerTap: onReload },
        import_export: { onPointerTap: () => setImportExportVisible(!importExportVisible) },
        cancel: { onPointerTap: onClose },
        save: { disabled: !canSave, onPointerTap: () => onSave(wallHeightEnabled ? wallHeightValue : -1) },
    };

    return (
        <>
            <TemplateWindow
                id="habbo-window-manager-com/floor_plan_editor_bc_xml"
                frame={{ id: 'floor-plan-editor', centered: true, onClose }}
                bindings={bindings}
                arrange={arrange}
            />

            {importExportVisible && (
                <FloorPlanImportExportView
                    modelData={modelData}
                    receivedModel={receivedModel}
                    canSave={canSave}
                    onSave={onSaveImport}
                    onClose={() => setImportExportVisible(false)}
                />
            )}
        </>
    );
};
