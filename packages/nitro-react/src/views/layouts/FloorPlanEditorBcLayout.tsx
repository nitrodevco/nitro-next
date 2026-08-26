import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, CheckBox, ContainerButton, Dropmenu, Frame, Icon, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `3196_floor_plan_editor_bc_xml` (layout "floor_plan_editor_bc", 662x600) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FloorPlanEditorBcLayoutProps {
    layout?: BoxLayout;
    onAddTile?: () => void;
    onCancel?: () => void;
    onClose?: () => void;
    onDecreaseHeight?: () => void;
    onEnterdirectionLeft?: () => void;
    onEnterdirectionRight?: () => void;
    onFloorThicknessDrop?: () => void;
    onImportExport?: () => void;
    onIncreaseHeight?: () => void;
    onReload?: () => void;
    onRemoveTile?: () => void;
    onSave?: () => void;
    onSetEnterTile?: () => void;
    onWallsFixedHeightEnabledCheckbox?: () => void;
    onWallThicknessDrop?: () => void;
}

export const FloorPlanEditorBcLayout = ({ layout, onAddTile, onCancel, onClose, onDecreaseHeight, onEnterdirectionLeft, onEnterdirectionRight, onFloorThicknessDrop, onImportExport, onIncreaseHeight, onReload, onRemoveTile, onSave, onSetEnterTile, onWallsFixedHeightEnabledCheckbox, onWallThicknessDrop }: FloorPlanEditorBcLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            params={98305}
            caption={t('floor.plan.editor.title')}
            tintColor="#ff8d00"
            onClose={onClose}
            layout={{ width: 662, height: 600, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={144}
                    backgroundColor="#4e4844"
                    layout={{ position: 'absolute', left: 0, width: 662, top: 0, height: 50 }}
                >
                    <Region
                        params={144}
                        backgroundColor="#2d2724"
                        layout={{ position: 'absolute', left: 3, width: 656, top: 2, height: 45 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('floor_plan_editor_logo.png')}
                            layout={{ position: 'absolute', left: 9, width: 38, top: 5, height: 38 }}
                        />
                        <Region
                            params={16}
                            layout={{ position: 'absolute', left: 74, width: 115, top: 9, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('floor.plan.editor.subtitle')}
                                textStyle="text-style-u-small"
                                textOptions={{ fill: '#ffffff' }}
                            />
                        </Region>
                    </Region>
                </Region>
                <Border
                    variant="3"
                    name="heightmap_border"
                    params={2192}
                    tintColor="#bdbdb5"
                    layout={{ position: 'absolute', left: 10, width: 344, top: 57, height: 448 }}
                >
                    <Region
                        name="controls_container"
                        params={144}
                        layout={{ position: 'absolute', left: 8, width: 322, top: 4, height: 127, flexDirection: 'column' }}
                    >
                        <Region
                            params={16}
                            layout={{ width: 318, height: 24, flexShrink: 0 }}
                        >
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 0, width: 161, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('floor.plan.editor.draw.mode')} />
                            </Region>
                        </Region>
                        <Region
                            name="buttons_itemlist"
                            params={16}
                            layout={{ width: 320, height: 52, flexShrink: 0, flexDirection: 'row', gap: 10 }}
                        >
                            <ContainerButton
                                variant="3"
                                name="add_tile"
                                params={17}
                                onPointerTap={onAddTile}
                                layout={{ width: 51, height: 42, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    params={3932176}
                                    src={layoutImage('floor_plan_editor_add_tile.png')}
                                    layout={{ position: 'absolute', left: 5, width: 40, top: 0, height: 40 }}
                                />
                            </ContainerButton>
                            <ContainerButton
                                variant="3"
                                name="remove_tile"
                                params={17}
                                onPointerTap={onRemoveTile}
                                layout={{ width: 51, height: 42, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    params={1835024}
                                    src={layoutImage('floor_plan_editor_remove_tile.png')}
                                    layout={{ position: 'absolute', left: 5, width: 40, top: 1, height: 40 }}
                                />
                            </ContainerButton>
                            <ThemeImage
                                params={16}
                                src={layoutImage('landing_view_reception_horizontal.png')}
                                layout={{ width: 2, height: 42, flexShrink: 0 }}
                            />
                            <ContainerButton
                                variant="3"
                                name="increase_height"
                                params={17}
                                onPointerTap={onIncreaseHeight}
                                layout={{ width: 51, height: 42, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    params={3932176}
                                    src={layoutImage('floor_plan_editor_raise_tile.png')}
                                    layout={{ position: 'absolute', left: 6, width: 40, top: 1, height: 40 }}
                                />
                            </ContainerButton>
                            <ContainerButton
                                variant="3"
                                name="decrease_height"
                                params={17}
                                onPointerTap={onDecreaseHeight}
                                layout={{ width: 51, height: 42, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    params={3932176}
                                    src={layoutImage('floor_plan_editor_sink_tile.png')}
                                    layout={{ position: 'absolute', left: 6, width: 40, top: 4, height: 40 }}
                                />
                            </ContainerButton>
                            <ThemeImage
                                params={16}
                                src={layoutImage('landing_view_reception_horizontal.png')}
                                layout={{ width: 2, height: 42, flexShrink: 0 }}
                            />
                            <ContainerButton
                                variant="3"
                                name="set_enter_tile"
                                params={17}
                                onPointerTap={onSetEnterTile}
                                layout={{ width: 51, height: 42, flexShrink: 0 }}
                            >
                                <ThemeImage
                                    params={3932176}
                                    src={layoutImage('floor_plan_editor_enter_tile.png')}
                                    layout={{ position: 'absolute', left: 5, width: 40, top: 1, height: 40 }}
                                />
                            </ContainerButton>
                        </Region>
                        <Region
                            name="tileheight_controller_container"
                            params={16}
                            layout={{ width: 317, height: 48, flexShrink: 0 }}
                        >
                            <Region
                                name="tile_height_text"
                                params={1}
                                layout={{ position: 'absolute', left: 0, width: 156, top: 4, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('floor.plan.editor.tile.height')} />
                            </Region>
                            <ThemeImage
                                name="tile_height_colormap"
                                params={17}
                                src={undefined}
                                layout={{ position: 'absolute', left: 1, width: 315, top: 23, height: 19 }}
                            />
                            <ThemeImage
                                name="tile_height_slider_track"
                                params={16}
                                src={layoutImage('avatar_editor_avatar_editor_download_icon.png')}
                                layout={{ position: 'absolute', left: 0, width: 12, top: 29, height: 16 }}
                            />
                        </Region>
                    </Region>
                    <Border
                        variant="3"
                        name="heightmap_bg"
                        params={2192}
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 0, width: 332, top: 132, height: 304 }}
                    />
                    <ScrollArea
                        orientation="horizontal"
                        layout={{ position: 'absolute', left: 0, width: 331, top: 132, height: 304 }}
                    >
                        <Region
                            name="heightmap_wrapper"
                            params={2192}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            <Region
                                params={16}
                                layout={{ width: 30, height: 29, flexShrink: 0 }}
                            />
                            <ThemeImage
                                name="heightmap_bitmap"
                                params={17}
                                src={undefined}
                                layout={{ width: 331, height: 304, flexShrink: 0 }}
                            />
                            <Region
                                params={16}
                                layout={{ width: 15, height: 29, flexShrink: 0 }}
                            />
                        </Region>
                    </ScrollArea>
                    <Region
                        name="mouse_capturer"
                        params={2193}
                        layout={{ position: 'absolute', left: 0, width: 331, top: 132, height: 304 }}
                    />
                    <Region
                        name="zoom"
                        params={1041}
                        layout={{ position: 'absolute', left: 12, width: 20, top: 400, height: 26 }}
                    >
                        <ThemeImage
                            name="zoom"
                            params={16}
                            src={layoutImage('roomtools_magnifier.png')}
                            layout={{ position: 'absolute', left: -4, width: 30, top: -3, height: 30 }}
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 1034, width: 30, top: 108, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text="hi :)" />
                    </Region>
                </Border>
                <Border
                    variant="3"
                    name="preview_border"
                    params={2128}
                    tintColor="#bdbdb5"
                    layout={{ position: 'absolute', left: 366, width: 289, top: 57, height: 449 }}
                >
                    <Region
                        name="room_controls_itemlist"
                        params={16}
                        layout={{ position: 'absolute', left: 3, width: 271, top: 3, height: 98, flexDirection: 'row' }}
                    >
                        <Region
                            name="enterdirection_container"
                            params={16}
                            layout={{ width: 139, height: 98, flexShrink: 0 }}
                        >
                            <ContainerButton
                                variant="5"
                                name="enterdirection_left"
                                params={17}
                                onPointerTap={onEnterdirectionLeft}
                                layout={{ position: 'absolute', left: 17, width: 25, top: 46, height: 24 }}
                            >
                                <Icon
                                    variant="2"
                                    params={16}
                                    tintColor="#000000"
                                    layout={{ position: 'absolute', left: 7, width: 30, top: 7, height: 30 }}
                                />
                            </ContainerButton>
                            <ContainerButton
                                variant="5"
                                name="enterdirection_right"
                                params={17}
                                onPointerTap={onEnterdirectionRight}
                                layout={{ position: 'absolute', left: 82, width: 25, top: 46, height: 24 }}
                            >
                                <Icon
                                    variant="3"
                                    params={16}
                                    tintColor="#000000"
                                    layout={{ position: 'absolute', left: 9, width: 28, top: 7, height: 29 }}
                                />
                            </ContainerButton>
                            <WidgetSlot
                                widgetType="avatar_image"
                                name="enterdirection_ghost_avatar"
                                params={16}
                                options={{ 'avatar_image:scale': 'sh' }}
                                layout={{ position: 'absolute', left: 41, width: 45, top: 12, height: 72 }}
                            />
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 7, width: 120, top: 4, height: 17, maxWidth: 120, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('floor.plan.editor.enter.direction')} />
                            </Region>
                        </Region>
                        <ThemeImage
                            params={16}
                            src={layoutImage('landing_view_reception_horizontal.png')}
                            layout={{ width: 3, height: 97, flexShrink: 0 }}
                        />
                        <Region
                            params={16}
                            layout={{ width: 128, height: 99, flexShrink: 0 }}
                        >
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 14, width: 110, top: 4, height: 17, maxWidth: 110, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText text={t('floor.plan.editor.room.options')} />
                            </Region>
                            <Dropmenu
                                variant="3"
                                name="wall_thickness_drop"
                                params={17}
                                onPointerTap={onWallThicknessDrop}
                                layout={{ position: 'absolute', left: 14, width: 114, top: 30, height: 25 }}
                            />
                            <Dropmenu
                                variant="3"
                                name="floor_thickness_drop"
                                params={17}
                                onPointerTap={onFloorThicknessDrop}
                                layout={{ position: 'absolute', left: 14, width: 114, top: 61, height: 25 }}
                            />
                        </Region>
                    </Region>
                    <Region
                        name="wall_height_controls"
                        params={16}
                        layout={{ position: 'absolute', left: 7, width: 269, top: 97, height: 30, flexDirection: 'row' }}
                    >
                        <CheckBox
                            variant="3"
                            name="walls_fixed_height_enabled_checkbox"
                            params={17}
                            onPointerTap={onWallsFixedHeightEnabledCheckbox}
                            layout={{ width: 18, height: 17, flexShrink: 0 }}
                        />
                        <Region
                            name="wall_height_text"
                            params={16}
                            layout={{ width: 105, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={t('floor.editor.wall.height')} />
                        </Region>
                        <Region
                            name="wall_height_number"
                            params={16}
                            layout={{ width: 25, height: 17, flexShrink: 0, maxWidth: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text="1"
                                textStyle="text-style-u-bold"
                                textOptions={{ fill: '#5f5f5f', align: 'center' }}
                            />
                        </Region>
                        <Region
                            params={16}
                            layout={{ width: 118, height: 30, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="wall_height_slider"
                                params={17}
                                src={layoutImage('icons_toolbar_divider.png')}
                                layout={{ position: 'absolute', left: 2, width: 111, top: 0, height: 30 }}
                            />
                            <ThemeImage
                                name="wall_height_slider_track"
                                params={16}
                                src={layoutImage('avatar_editor_avatar_editor_download_icon.png')}
                                layout={{ position: 'absolute', left: 0, width: 12, top: 7, height: 16 }}
                            />
                        </Region>
                    </Region>
                    <Border
                        variant="3"
                        name="preview_bitmap_border"
                        params={2064}
                        layout={{ position: 'absolute', left: 0, width: 275, top: 133, height: 302 }}
                    />
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 1, width: 273, top: 135, height: 300 }}
                    >
                        <Region
                            name="preview_wrapper"
                            params={2064}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            <ThemeImage
                                name="preview_bitmap"
                                params={17}
                                src={undefined}
                                layout={{ width: 273, height: 300, flexShrink: 0 }}
                            />
                        </Region>
                    </ScrollArea>
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 6, width: 30, top: 372, height: 30 }}
                    >
                        <ThemeImage
                            name="refresh"
                            params={17}
                            src={layoutImage('inventory_furni_recycle_icon.png')}
                            layout={{ position: 'absolute', left: 6, width: 30, top: 372, height: 30 }}
                        />
                    </Region>
                </Border>
                <Region
                    name="main_buttons"
                    params={1168}
                    layout={{ position: 'absolute', left: 10, width: 643, top: 518, height: 40 }}
                >
                    <Region
                        name="left_buttons"
                        params={16}
                        layout={{ position: 'absolute', left: 2, width: 120, top: 0, height: 40, flexDirection: 'row', gap: 5 }}
                    >
                        <ButtonThick
                            variant="3"
                            name="reload"
                            params={131089}
                            onPointerTap={onReload}
                            textStyle="text-style-button-shiny-bold"
                            layout={{ width: 120, height: 35, flexShrink: 0, minWidth: 100, maxWidth: 120 }}
                        >
                            {t('floor.plan.editor.reload')}
                        </ButtonThick>
                    </Region>
                    <Region
                        name="right_buttons"
                        params={262224}
                        layout={{ position: 'absolute', left: 265, width: 376, top: 0, height: 40, flexDirection: 'row', gap: 8 }}
                    >
                        <ButtonThick
                            variant="3"
                            name="import_export"
                            params={131089}
                            onPointerTap={onImportExport}
                            textStyle="text-style-button-shiny-bold"
                            layout={{ width: 120, height: 35, flexShrink: 0, minWidth: 90, maxWidth: 120 }}
                        >
                            {t('floor.plan.editor.import.export')}
                        </ButtonThick>
                        <ButtonThick
                            variant="3"
                            name="cancel"
                            params={131089}
                            onPointerTap={onCancel}
                            textStyle="text-style-button-shiny-bold"
                            layout={{ width: 120, height: 35, flexShrink: 0, minWidth: 90, maxWidth: 120 }}
                        >
                            {t('floor.plan.editor.cancel')}
                        </ButtonThick>
                        <ButtonThick
                            variant="5"
                            name="save"
                            params={131089}
                            tintColor="#0bb3e3"
                            onPointerTap={onSave}
                            textStyle="text-style-button-shiny-bold"
                            layout={{ width: 120, height: 35, flexShrink: 0, minWidth: 90, maxWidth: 120 }}
                        >
                            {t('floor.plan.editor.save')}
                        </ButtonThick>
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};
