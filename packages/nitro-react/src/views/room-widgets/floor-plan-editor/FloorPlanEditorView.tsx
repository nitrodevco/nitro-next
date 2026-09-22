import { AvatarGenderType, RoomThicknessType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { AvatarImage } from '#base/components';
import { FLOOR_PLAN_WALL_HEIGHT_LIMIT } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { useRoomFloorPlanDrawing } from '#base/hooks';
import {
    Border, Box, ButtonThick, CheckBox, ContainerButton, Dropmenu, Frame, Icon, LayoutImage, Region,
    ScrollArea, Shape, ThemeImage, ThemeText,
} from '#base/theme';
import {
    FLOOR_PLAN_DRAW_MODES, FLOOR_PLAN_LEVELS, FLOOR_PLAN_ZOOM_LARGE, FLOOR_PLAN_ZOOM_NORMAL,
    FloorPlanDrawMode, floorPlanHeightColors, FloorPlanModel, FloorPlanTile,
} from '#base/utils';

import { FloorPlanHeightMapView } from './FloorPlanHeightMapView';
import { FloorPlanImportExportView } from './FloorPlanImportExportView';
import { FloorPlanPreviewView } from './FloorPlanPreviewView';
import { FloorPlanSlider } from './FloorPlanSlider';

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

/**
 * The floor plan editor - `BCFloorPlanEditor`, on the `floor_plan_editor_bc` layout (662x600, frame
 * style 3, margins 0/33/0/0; read from the decompiled client, as the bundles do not carry it). The
 * map on the left is drawn on with the five tools above it; the panel on the right holds the door
 * direction, the two thickness menus, the fixed wall height and the isometric preview.
 *
 * Controls the port leaves out, and why:
 *
 * - `refresh`, beside the preview, is `visible="false"` in the layout: Flash rebuilt the preview
 *   on a two-second timer and this was the manual nudge for it. The preview here follows the map
 *   directly, so there is nothing for it to do and it stays hidden, as the client leaves it.
 * - `mouse_capturer`, the invisible region over the whole scrolling view, is how Flash kept
 *   receiving mouse moves once a drag left the map. `useRoomFloorPlanDrawing` listens on the
 *   window instead, which covers the same case without a second interactive layer.
 *
 * `BCFloorPlanEditor.WALL_HEIGHT_LIMIT` steps the wall height slider, and the number beside it is
 * the step plus one - the client counts walls from one and sends them from zero.
 */

/** `AvatarImageWidget.FIGURE_DEFAULT` - the figure the empty `avatar_image` widget draws. */
const GHOST_FIGURE = 'hd-180-1.ch-210-66.lg-270-82.sh-290-81';

/** The `wall_thickness` / `floor_thickness` dropmenus' items, in the layout's order. */
const THICKNESSES: { thickness: RoomThicknessType; suffix: string }[] = [
    { thickness: RoomThicknessType.Thinnest, suffix: 'thinnest' },
    { thickness: RoomThicknessType.Thin, suffix: 'thin' },
    { thickness: RoomThicknessType.Normal, suffix: 'normal' },
    { thickness: RoomThicknessType.Thick, suffix: 'thick' },
];

/** The five tool buttons, in `BCFloorPlanEditor._drawModes` order, with the layout's own bitmaps. */
const DRAW_MODE_IMAGES: Record<FloorPlanDrawMode, string> = {
    add_tile: 'window-manager/floor_plan_editor_add_tile.png',
    remove_tile: 'window-manager/floor_plan_editor_remove_tile.png',
    increase_height: 'window-manager/floor_plan_editor_raise_tile.png',
    decrease_height: 'window-manager/floor_plan_editor_sink_tile.png',
    set_enter_tile: 'window-manager/floor_plan_editor_enter_tile.png',
};

/** Each tool's `static_bitmap` in its button: the layout nudges them a pixel or four apart. */
const DRAW_MODE_IMAGE_OFFSETS: Record<FloorPlanDrawMode, [ number, number ]> = {
    add_tile: [ 5, 0 ],
    remove_tile: [ 5, 1 ],
    increase_height: [ 6, 1 ],
    decrease_height: [ 6, 4 ],
    set_enter_tile: [ 5, 1 ],
};

/** `buttons_itemlist` puts a divider after the second and the fourth tool. */
const DRAW_MODE_LEFTS: Record<FloorPlanDrawMode, number> = {
    add_tile: 0,
    remove_tile: 61,
    increase_height: 134,
    decrease_height: 195,
    set_enter_tile: 268,
};

/** `tile_height_colormap` - the gradient the draw height is picked out of. */
const COLORMAP_WIDTH = 315;
const COLORMAP_HEIGHT = 19;

export const FloorPlanEditorView = ({
    model, modelData, receivedModel, entryPoint, entryPointDir, wallThickness, floorThickness, fixedWallsHeight, canSave,
    onCommit, onSizeLimitReached, onEntryPointDirChange, onThicknessChange, onFixedWallsHeightChange,
    onSave, onReload, onSaveImport, onClose,
}: FloorPlanEditorViewProps) => {
    const t = useTranslation();

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

    const heightColors = floorPlanHeightColors(FLOOR_PLAN_LEVELS);
    const thicknessLabel = (prefix: string, thickness: RoomThicknessType) => t(`navigator.roomsettings.${prefix}.${THICKNESSES.find(x => (x.thickness === thickness))?.suffix ?? 'normal'}`);

    return (
        <>
            <Frame
                variant="3"
                id="floor-plan-editor"
                caption={t('floor.plan.editor.title')}
                tintColor="#ff8d00"
                dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
                onClose={onClose}
                centered
                margins={[ 0, 33, 0, 0 ]}
                layout={{ width: 662, height: 600, minWidth: 662, maxWidth: 1380, minHeight: 600, maxHeight: 900 }}
            >
                <Region
                    backgroundColor="#4e4844"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 50 }}
                >
                    <Region
                        backgroundColor="#2d2724"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 2, height: 45 }}
                    >
                        <ThemeImage
                            src={LayoutImage('window-manager/floor_plan_editor_logo.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', fitSizeToContents: true }}
                            layout={{ position: 'absolute', left: 9, width: 38, top: 5, height: 38 }}
                        />
                        <ThemeText
                            text={t('floor.plan.editor.subtitle')}
                            textStyle="u_small"
                            textOptions={{ fill: '#ffffff' }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 74, width: 115, top: 9, height: 15 }}
                        />
                    </Region>
                </Region>

                <Border
                    variant="3"
                    name="heightmap_border"
                    tintColor="#bdbdb5"
                    layout={{ position: 'absolute', left: 10, right: 308, top: 57, bottom: 62 }}
                >
                    <Region
                        name="controls_container"
                        layout={{ position: 'absolute', left: 8, right: 14, top: 4, height: 127 }}
                    >
                        <ThemeText
                            text={t('floor.plan.editor.draw.mode')}
                            textStyle="u_regular"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, width: 161, top: 1, height: 17 }}
                        />
                        <Region
                            name="buttons_itemlist"
                            layout={{ position: 'absolute', left: 0, top: 24, width: 320, height: 52 }}
                        >
                            {FLOOR_PLAN_DRAW_MODES.map(mode => (
                                <ContainerButton
                                    key={mode}
                                    variant="3"
                                    name={mode}
                                    selected={drawMode === mode}
                                    onPointerTap={() => setDrawMode(mode)}
                                    layout={{ position: 'absolute', left: DRAW_MODE_LEFTS[mode], top: 0, width: 51, height: 42, justifyContent: 'center' }}
                                >
                                    <ThemeImage
                                        src={LayoutImage(DRAW_MODE_IMAGES[mode])}
                                        bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                                        layout={{ position: 'absolute', left: DRAW_MODE_IMAGE_OFFSETS[mode][0], top: DRAW_MODE_IMAGE_OFFSETS[mode][1], width: 40, height: 40 }}
                                    />
                                </ContainerButton>
                            ))}
                            <ThemeImage
                                src={LayoutImage('friend-bar/landing_view_reception_horizontal.png')}
                                bitmap={{ stretchedX: false }}
                                layout={{ position: 'absolute', left: 122, top: 0, width: 2, height: 42 }}
                            />
                            <ThemeImage
                                src={LayoutImage('friend-bar/landing_view_reception_horizontal.png')}
                                bitmap={{ stretchedX: false }}
                                layout={{ position: 'absolute', left: 256, top: 0, width: 2, height: 42 }}
                            />
                        </Region>
                        <Region
                            name="tileheight_controller_container"
                            layout={{ position: 'absolute', left: 0, top: 76, width: 317, height: 48 }}
                        >
                            <ThemeText
                                text={t('floor.plan.editor.tile.height')}
                                markup
                                textStyle="u_regular"
                                name="tile_height_text"
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 0, width: 156, top: 4, height: 16 }}
                            />
                            <FloorPlanSlider
                                steps={FLOOR_PLAN_LEVELS}
                                value={drawingHeight}
                                // `HeightMapEditor.set drawingHeight` clamps to LEVELS, one past the last colour.
                                onChange={height => setDrawingHeight(Math.min(FLOOR_PLAN_LEVELS, Math.max(0, height)))}
                                width={COLORMAP_WIDTH}
                                height={48}
                                barLeft={1}
                                barTop={23}
                                trackTop={29}
                                layout={{ position: 'absolute', left: 0, top: 0 }}
                            >
                                {/* `createTileHeightColorMap` filled a bitmap column by column; the map has thirty entries, so thirty bands draw the same gradient. */}
                                {heightColors.map((color, level) => (
                                    <Shape
                                        key={level}
                                        color={`#${color.toString(16).padStart(6, '0')}`}
                                        layout={{ position: 'absolute', left: Math.round((level * COLORMAP_WIDTH) / FLOOR_PLAN_LEVELS), top: 0, width: Math.ceil(COLORMAP_WIDTH / FLOOR_PLAN_LEVELS), height: COLORMAP_HEIGHT }}
                                    />
                                ))}
                            </FloorPlanSlider>
                        </Region>
                    </Region>

                    <Border
                        variant="3"
                        name="heightmap_bg"
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 0, right: 12, top: 132, bottom: 12 }}
                    />
                    <ScrollArea
                        orientation="both"
                        layout={{ position: 'absolute', left: 0, right: 13, top: 132, bottom: 12 }}
                    >
                        <FloorPlanHeightMapView
                            model={model}
                            zoom={zoom}
                            entryPoint={entryPoint}
                            attachHeightMap={attachHeightMap}
                            onPointerDown={onPointerDown}
                        />
                    </ScrollArea>
                    <Region
                        name="zoom"
                        tooltip={t('floor.plan.editor.preview')}
                        onPointerTap={() => setZoom(zoom === FLOOR_PLAN_ZOOM_NORMAL ? FLOOR_PLAN_ZOOM_LARGE : FLOOR_PLAN_ZOOM_NORMAL)}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 12, width: 20, bottom: 22, height: 26 }}
                    >
                        <ThemeImage
                            src={LayoutImage('shared/roomtools_magnifier.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: -4, width: 30, top: -3, height: 30 }}
                        />
                    </Region>
                </Border>

                <Border
                    variant="3"
                    name="preview_border"
                    tintColor="#bdbdb5"
                    layout={{ position: 'absolute', right: 7, width: 289, top: 57, bottom: 61 }}
                >
                    <Region
                        name="enterdirection_container"
                        layout={{ position: 'absolute', left: 3, top: 3, width: 139, height: 98 }}
                    >
                        <ThemeText
                            text={t('floor.plan.editor.enter.direction')}
                            textStyle="u_regular"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 7, width: 120, top: 4, height: 17, maxWidth: 120 }}
                        />
                        <ContainerButton
                            variant="5"
                            name="enterdirection_left"
                            onPointerTap={() => onEntryPointDirChange(entryPointDir + 1)}
                            layout={{ position: 'absolute', left: 17, width: 25, top: 46, height: 24 }}
                        >
                            <Icon
                                variant="2"
                                tintColor="#000000"
                                layout={{ position: 'absolute', left: 7, width: 30, top: 7, height: 30 }}
                            />
                        </ContainerButton>
                        <Box layout={{ position: 'absolute', left: 41, width: 45, top: 12, height: 72, justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                            <AvatarImage
                                figure={GHOST_FIGURE}
                                gender={AvatarGenderType.Male}
                                direction={entryPointDir}
                            />
                        </Box>
                        <ContainerButton
                            variant="5"
                            name="enterdirection_right"
                            onPointerTap={() => onEntryPointDirChange(entryPointDir - 1)}
                            layout={{ position: 'absolute', left: 82, width: 25, top: 46, height: 24 }}
                        >
                            <Icon
                                variant="3"
                                tintColor="#000000"
                                layout={{ position: 'absolute', left: 9, width: 28, top: 7, height: 29 }}
                            />
                        </ContainerButton>
                    </Region>
                    <ThemeImage
                        src={LayoutImage('friend-bar/landing_view_reception_horizontal.png')}
                        bitmap={{ stretchedX: false }}
                        layout={{ position: 'absolute', left: 142, top: 3, width: 3, height: 97 }}
                    />
                    <Region layout={{ position: 'absolute', left: 146, top: 3, width: 128, height: 99 }}>
                        <ThemeText
                            text={t('floor.plan.editor.room.options')}
                            textStyle="u_regular"
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 14, width: 110, top: 4, height: 17, maxWidth: 110 }}
                        />
                        <Dropmenu
                            variant="3"
                            caption={thicknessLabel('wall_thickness', wallThickness)}
                            options={THICKNESSES.map(x => ({
                                key: x.thickness,
                                label: t(`navigator.roomsettings.wall_thickness.${x.suffix}`),
                                selected: x.thickness === wallThickness,
                                onSelect: () => onThicknessChange(x.thickness, floorThickness),
                            }))}
                            layout={{ position: 'absolute', left: 14, width: 114, top: 30, height: 25 }}
                        />
                        <Dropmenu
                            variant="3"
                            caption={thicknessLabel('floor_thickness', floorThickness)}
                            options={THICKNESSES.map(x => ({
                                key: x.thickness,
                                label: t(`navigator.roomsettings.floor_thickness.${x.suffix}`),
                                selected: x.thickness === floorThickness,
                                onSelect: () => onThicknessChange(wallThickness, x.thickness),
                            }))}
                            layout={{ position: 'absolute', left: 14, width: 114, top: 61, height: 25 }}
                        />
                    </Region>

                    <Region
                        name="wall_height_controls"
                        layout={{ position: 'absolute', left: 7, width: 269, top: 97, height: 30, flexDirection: 'row', alignItems: 'flex-start' }}
                    >
                        <CheckBox
                            variant="3"
                            name="walls_fixed_height_enabled_checkbox"
                            selected={wallHeightEnabled}
                            onPointerTap={() => setWallHeightState({ enabled: !wallHeightEnabled, forHeight: fixedWallsHeight })}
                            layout={{ width: 18, height: 17, marginTop: 7, flexShrink: 0 }}
                        />
                        <ThemeText
                            text={t('floor.editor.wall.height')}
                            textStyle="u_regular"
                            name="wall_height_text"
                            alpha={wallHeightEnabled ? 1 : 0.6}
                            verticalAlign="top"
                            layout={{ width: 105, height: 17, marginTop: 6, flexShrink: 0 }}
                        />
                        <ThemeText
                            text={String(wallHeightValue + 1)}
                            textStyle="u_bold"
                            textOptions={{ fill: '#5f5f5f', align: 'center' }}
                            name="wall_height_number"
                            alpha={wallHeightEnabled ? 1 : 0.6}
                            verticalAlign="top"
                            layout={{ width: 25, height: 17, marginTop: 6, flexShrink: 0, maxWidth: 25 }}
                        />
                        <FloorPlanSlider
                            steps={FLOOR_PLAN_WALL_HEIGHT_LIMIT}
                            value={wallHeightValue}
                            onChange={height => onFixedWallsHeightChange(Math.min(FLOOR_PLAN_WALL_HEIGHT_LIMIT - 1, Math.max(0, height)))}
                            width={111}
                            height={30}
                            barLeft={2}
                            barTop={0}
                            trackTop={7}
                            disabled={!wallHeightEnabled}
                            layout={{ width: 118 }}
                        >
                            <ThemeImage
                                name="wall_height_slider"
                                src={LayoutImage('toolbar/icons_toolbar_divider.png')}
                                bitmap={{ stretchedY: false, pivot: 'center left' }}
                                layout={{ position: 'absolute', left: 0, top: 0, width: 111, height: 30 }}
                            />
                        </FloorPlanSlider>
                    </Region>

                    <Border
                        variant="3"
                        name="preview_bitmap_border"
                        layout={{ position: 'absolute', left: 0, width: 275, top: 133, bottom: 14 }}
                    />
                    <ScrollArea
                        orientation="both"
                        layout={{ position: 'absolute', left: 1, width: 273, top: 135, bottom: 14 }}
                    >
                        <FloorPlanPreviewView
                            model={model}
                            entryPoint={entryPoint}
                        />
                    </ScrollArea>
                </Border>

                <Region
                    name="main_buttons"
                    layout={{ position: 'absolute', left: 10, right: 9, bottom: 9, height: 40 }}
                >
                    <Region
                        name="left_buttons"
                        layout={{ position: 'absolute', left: 2, width: 120, top: 0, bottom: 0, flexDirection: 'row', gap: 5 }}
                    >
                        <ButtonThick
                            variant="3"
                            name="reload"
                            onPointerTap={onReload}
                            textStyle="button_shiny_bold"
                            layout={{ width: 120, height: 35, flexShrink: 0, minWidth: 100, maxWidth: 120 }}
                        >
                            {t('floor.plan.editor.reload')}
                        </ButtonThick>
                    </Region>
                    <Region
                        name="right_buttons"
                        layout={{ position: 'absolute', right: 2, width: 376, top: 0, bottom: 0, flexDirection: 'row', gap: 8 }}
                    >
                        <ButtonThick
                            variant="3"
                            name="import_export"
                            onPointerTap={() => setImportExportVisible(!importExportVisible)}
                            textStyle="button_shiny_bold"
                            layout={{ width: 120, height: 35, flexShrink: 0, minWidth: 90, maxWidth: 120 }}
                        >
                            {t('floor.plan.editor.import.export')}
                        </ButtonThick>
                        <ButtonThick
                            variant="3"
                            name="cancel"
                            onPointerTap={onClose}
                            textStyle="button_shiny_bold"
                            layout={{ width: 120, height: 35, flexShrink: 0, minWidth: 90, maxWidth: 120 }}
                        >
                            {t('floor.plan.editor.cancel')}
                        </ButtonThick>
                        <ButtonThick
                            variant="5"
                            name="save"
                            tintColor="#0bb3e3"
                            disabled={!canSave}
                            onPointerTap={() => onSave(wallHeightEnabled ? wallHeightValue : -1)}
                            textStyle="button_shiny_bold"
                            layout={{ width: 120, height: 35, flexShrink: 0, minWidth: 90, maxWidth: 120 }}
                        >
                            {t('floor.plan.editor.save')}
                        </ButtonThick>
                    </Region>
                </Region>
            </Frame>

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
