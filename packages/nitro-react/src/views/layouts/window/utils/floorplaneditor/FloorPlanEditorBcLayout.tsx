import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, CheckBox, ContainerButton, Dropmenu, Frame, Icon, Region, ScrollArea, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `3196_floor_plan_editor_bc_xml` (layout "floor_plan_editor_bc", 662x600) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FloorPlanEditorBcLayoutProps {
    itemsControlsContainer?: ReactNode;
    itemsHeightmapWrapper?: ReactNode;
    itemsLeftButtons?: ReactNode;
    itemsPreviewWrapper?: ReactNode;
    itemsRightButtons?: ReactNode;
    itemsRoomControlsItemlist?: ReactNode;
    itemsWallHeightControls?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onFloorThicknessDrop?: () => void;
    onMouseCapturer?: () => void;
    onWallThicknessDrop?: () => void;
    onZoom?: () => void;
    srcRefresh?: string;
    srcWallHeightSlider?: string;
    srcWallHeightSliderTrack?: string;
    srcZoom?: string;
}

export const FloorPlanEditorBcLayout = ({ itemsControlsContainer, itemsHeightmapWrapper, itemsLeftButtons, itemsPreviewWrapper, itemsRightButtons, itemsRoomControlsItemlist, itemsWallHeightControls, layout, onClose, onFloorThicknessDrop, onMouseCapturer, onWallThicknessDrop, onZoom, srcRefresh, srcWallHeightSlider, srcWallHeightSliderTrack, srcZoom }: FloorPlanEditorBcLayoutProps) => {
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
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 50 }}
                >
                    <Region
                        params={144}
                        backgroundColor="#2d2724"
                        layout={{ position: 'absolute', left: 3, right: 3, top: 2, height: 45 }}
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
                    layout={{ position: 'absolute', left: 10, right: 308, top: 57, bottom: 95 }}
                >
                    <Region
                        name="controls_container"
                        params={144}
                        layout={{ position: 'absolute', left: 8, right: 14, top: 4, height: 127, flexDirection: 'column' }}
                    >
                        {itemsControlsContainer ?? (
                            <>
                                <FloorPlanEditorBcLayoutButtonsItemlistItem />
                                <FloorPlanEditorBcLayoutTileheightControllerContainerItem />
                            </>
                        )}
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
                    </Region>
                    <Border
                        variant="3"
                        name="heightmap_bg"
                        params={2192}
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 0, right: 12, top: 132, bottom: 12 }}
                    />
                    <ScrollArea
                        orientation="horizontal"
                        layout={{ position: 'absolute', left: 0, right: 13, top: 132, bottom: 12 }}
                    >
                        <Region
                            name="heightmap_wrapper"
                            params={2192}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            {itemsHeightmapWrapper ?? (
                                <FloorPlanEditorBcLayoutHeightmapBitmapItem />
                            )}
                            <Region
                                params={16}
                                layout={{ width: 30, height: 29, flexShrink: 0 }}
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
                        onPointerTap={onMouseCapturer}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, right: 13, top: 132, bottom: 12 }}
                    />
                    {/* <scrollbar_vertical> for heightmap_wrapper - rendered by that list's ScrollArea */}
                    {/* <scrollbar_horizontal> for heightmap_wrapper - rendered by that list's ScrollArea */}
                    <Region
                        name="zoom"
                        params={1041}
                        onPointerTap={onZoom}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 12, width: 20, bottom: 22, height: 26 }}
                    >
                        <ThemeImage
                            name="zoom"
                            params={16}
                            src={srcZoom ?? layoutImage('roomtools_magnifier.png')}
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
                    layout={{ position: 'absolute', right: 7, width: 289, top: 57, bottom: 94 }}
                >
                    <Region
                        name="room_controls_itemlist"
                        params={16}
                        layout={{ position: 'absolute', left: 3, width: 271, top: 3, height: 98, flexDirection: 'row' }}
                    >
                        {itemsRoomControlsItemlist ?? (
                            <FloorPlanEditorBcLayoutEnterdirectionContainerItem />
                        )}
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
                        {itemsWallHeightControls ?? (
                            <>
                                <FloorPlanEditorBcLayoutWallsFixedHeightEnabledCheckboxItem />
                                <FloorPlanEditorBcLayoutWallHeightTextItem />
                                <FloorPlanEditorBcLayoutWallHeightNumberItem />
                            </>
                        )}
                        <Region
                            params={16}
                            layout={{ width: 118, height: 30, flexShrink: 0 }}
                        >
                            <ThemeImage
                                name="wall_height_slider"
                                params={17}
                                src={srcWallHeightSlider ?? layoutImage('icons_toolbar_divider.png')}
                                layout={{ position: 'absolute', left: 2, width: 111, top: 0, height: 30 }}
                            />
                            <ThemeImage
                                name="wall_height_slider_track"
                                params={16}
                                src={srcWallHeightSliderTrack ?? layoutImage('avatar_editor_avatar_editor_download_icon.png')}
                                layout={{ position: 'absolute', left: 0, width: 12, top: 7, height: 16 }}
                            />
                        </Region>
                    </Region>
                    <Border
                        variant="3"
                        name="preview_bitmap_border"
                        params={2064}
                        layout={{ position: 'absolute', left: 0, width: 275, top: 133, bottom: 14 }}
                    />
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 1, width: 273, top: 135, bottom: 14 }}
                    >
                        <Region
                            name="preview_wrapper"
                            params={2064}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            {itemsPreviewWrapper ?? (
                                <FloorPlanEditorBcLayoutPreviewBitmapItem />
                            )}
                        </Region>
                    </ScrollArea>
                    {/* <scrollbar_horizontal> for preview_wrapper - rendered by that list's ScrollArea */}
                    {/* <scrollbar_vertical> for preview_wrapper - rendered by that list's ScrollArea */}
                    <Region
                        visible={false}
                        layout={{ position: 'absolute', left: 6, width: 30, top: 372, height: 30 }}
                    >
                        <ThemeImage
                            name="refresh"
                            params={17}
                            src={srcRefresh ?? layoutImage('inventory_furni_recycle_icon.png')}
                            layout={{ position: 'absolute', left: 6, width: 30, top: 372, height: 30 }}
                        />
                    </Region>
                </Border>
                <Region
                    name="main_buttons"
                    params={1168}
                    layout={{ position: 'absolute', left: 10, right: 9, bottom: 42, height: 40 }}
                >
                    <Region
                        name="left_buttons"
                        params={16}
                        layout={{ position: 'absolute', left: 2, width: 120, top: 0, height: 40, flexDirection: 'row', gap: 5 }}
                    >
                        {itemsLeftButtons ?? (
                            <FloorPlanEditorBcLayoutReloadItem />
                        )}
                    </Region>
                    <Region
                        name="right_buttons"
                        params={262224}
                        layout={{ position: 'absolute', right: 2, width: 376, top: 0, height: 40, flexDirection: 'row', gap: 8 }}
                    >
                        {itemsRightButtons ?? (
                            <>
                                <FloorPlanEditorBcLayoutImportExportItem />
                                <FloorPlanEditorBcLayoutCancelItem />
                                <FloorPlanEditorBcLayoutSaveItem />
                            </>
                        )}
                    </Region>
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `add_tile` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutAddTileItemProps {
    layout?: BoxLayout;
    onAddTile?: () => void;
}

export const FloorPlanEditorBcLayoutAddTileItem = ({ layout, onAddTile }: FloorPlanEditorBcLayoutAddTileItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="add_tile"
            params={17}
            onPointerTap={onAddTile}
            layout={{ width: 51, height: 42, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={3932176}
                src={layoutImage('floor_plan_editor_add_tile.png')}
                layout={{ position: 'absolute', left: '50%', marginLeft: -20.5, width: 40, top: '50%', marginTop: -21, height: 40 }}
            />
        </ContainerButton>
    );
};

/** Row template `remove_tile` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutRemoveTileItemProps {
    layout?: BoxLayout;
    onRemoveTile?: () => void;
}

export const FloorPlanEditorBcLayoutRemoveTileItem = ({ layout, onRemoveTile }: FloorPlanEditorBcLayoutRemoveTileItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="remove_tile"
            params={17}
            onPointerTap={onRemoveTile}
            layout={{ width: 51, height: 42, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={1835024}
                src={layoutImage('floor_plan_editor_remove_tile.png')}
                layout={{ position: 'absolute', left: '50%', marginLeft: -20.5, width: 40, bottom: 1, height: 40 }}
            />
        </ContainerButton>
    );
};

/** Row template `increase_height` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutIncreaseHeightItemProps {
    layout?: BoxLayout;
    onIncreaseHeight?: () => void;
}

export const FloorPlanEditorBcLayoutIncreaseHeightItem = ({ layout, onIncreaseHeight }: FloorPlanEditorBcLayoutIncreaseHeightItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="increase_height"
            params={17}
            onPointerTap={onIncreaseHeight}
            layout={{ width: 51, height: 42, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={3932176}
                src={layoutImage('floor_plan_editor_raise_tile.png')}
                layout={{ position: 'absolute', left: '50%', marginLeft: -19.5, width: 40, top: '50%', marginTop: -20, height: 40 }}
            />
        </ContainerButton>
    );
};

/** Row template `decrease_height` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutDecreaseHeightItemProps {
    layout?: BoxLayout;
    onDecreaseHeight?: () => void;
}

export const FloorPlanEditorBcLayoutDecreaseHeightItem = ({ layout, onDecreaseHeight }: FloorPlanEditorBcLayoutDecreaseHeightItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="decrease_height"
            params={17}
            onPointerTap={onDecreaseHeight}
            layout={{ width: 51, height: 42, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={3932176}
                src={layoutImage('floor_plan_editor_sink_tile.png')}
                layout={{ position: 'absolute', left: '50%', marginLeft: -19.5, width: 40, top: '50%', marginTop: -17, height: 40 }}
            />
        </ContainerButton>
    );
};

/** Row template `set_enter_tile` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutSetEnterTileItemProps {
    layout?: BoxLayout;
    onSetEnterTile?: () => void;
}

export const FloorPlanEditorBcLayoutSetEnterTileItem = ({ layout, onSetEnterTile }: FloorPlanEditorBcLayoutSetEnterTileItemProps) => {
    return (
        <ContainerButton
            variant="3"
            name="set_enter_tile"
            params={17}
            onPointerTap={onSetEnterTile}
            layout={{ width: 51, height: 42, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                params={3932176}
                src={layoutImage('floor_plan_editor_enter_tile.png')}
                layout={{ position: 'absolute', left: '50%', marginLeft: -20.5, width: 40, top: '50%', marginTop: -20, height: 40 }}
            />
        </ContainerButton>
    );
};

/** Row template `buttons_itemlist` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutButtonsItemlistItemProps {
    itemsButtonsItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const FloorPlanEditorBcLayoutButtonsItemlistItem = ({ itemsButtonsItemlist, layout }: FloorPlanEditorBcLayoutButtonsItemlistItemProps) => {
    return (
        <Region
            name="buttons_itemlist"
            params={16}
            layout={{ width: 320, height: 52, flexShrink: 0, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsButtonsItemlist ?? (
                <>
                    <FloorPlanEditorBcLayoutAddTileItem />
                    <FloorPlanEditorBcLayoutRemoveTileItem />
                    <FloorPlanEditorBcLayoutIncreaseHeightItem />
                    <FloorPlanEditorBcLayoutDecreaseHeightItem />
                    <FloorPlanEditorBcLayoutSetEnterTileItem />
                </>
            )}
            <ThemeImage
                params={16}
                src={layoutImage('landing_view_reception_horizontal.png')}
                layout={{ width: 2, height: 42, flexShrink: 0 }}
            />
            <ThemeImage
                params={16}
                src={layoutImage('landing_view_reception_horizontal.png')}
                layout={{ width: 2, height: 42, flexShrink: 0 }}
            />
        </Region>
    );
};

/** Row template `tileheight_controller_container` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutTileheightControllerContainerItemProps {
    captionTileHeightText?: string;
    layout?: BoxLayout;
    srcTileHeightColormap?: string;
    srcTileHeightSliderTrack?: string;
}

export const FloorPlanEditorBcLayoutTileheightControllerContainerItem = ({ captionTileHeightText, layout, srcTileHeightColormap, srcTileHeightSliderTrack }: FloorPlanEditorBcLayoutTileheightControllerContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="tileheight_controller_container"
            params={16}
            layout={{ width: 317, height: 48, flexShrink: 0, ...layout }}
        >
            <Region
                name="tile_height_text"
                params={1}
                layout={{ position: 'absolute', left: 0, width: 156, top: 4, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionTileHeightText ?? t('floor.plan.editor.tile.height')} />
            </Region>
            <ThemeImage
                name="tile_height_colormap"
                params={17}
                src={srcTileHeightColormap}
                layout={{ position: 'absolute', left: 1, width: 315, top: 23, height: 19 }}
            />
            <ThemeImage
                name="tile_height_slider_track"
                params={16}
                src={srcTileHeightSliderTrack ?? layoutImage('avatar_editor_avatar_editor_download_icon.png')}
                layout={{ position: 'absolute', left: 0, width: 12, top: 29, height: 16 }}
            />
        </Region>
    );
};

/** Row template `heightmap_bitmap` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutHeightmapBitmapItemProps {
    layout?: BoxLayout;
    srcHeightmapBitmap?: string;
}

export const FloorPlanEditorBcLayoutHeightmapBitmapItem = ({ layout, srcHeightmapBitmap }: FloorPlanEditorBcLayoutHeightmapBitmapItemProps) => {
    return (
        <ThemeImage
            name="heightmap_bitmap"
            params={17}
            src={srcHeightmapBitmap}
            layout={{ width: 331, height: 304, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `enterdirection_container` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutEnterdirectionContainerItemProps {
    layout?: BoxLayout;
    onEnterdirectionLeft?: () => void;
    onEnterdirectionRight?: () => void;
}

export const FloorPlanEditorBcLayoutEnterdirectionContainerItem = ({ layout, onEnterdirectionLeft, onEnterdirectionRight }: FloorPlanEditorBcLayoutEnterdirectionContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="enterdirection_container"
            params={16}
            layout={{ width: 139, height: 98, flexShrink: 0, ...layout }}
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
    );
};

/** Row template `walls_fixed_height_enabled_checkbox` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutWallsFixedHeightEnabledCheckboxItemProps {
    layout?: BoxLayout;
    onWallsFixedHeightEnabledCheckbox?: () => void;
}

export const FloorPlanEditorBcLayoutWallsFixedHeightEnabledCheckboxItem = ({ layout, onWallsFixedHeightEnabledCheckbox }: FloorPlanEditorBcLayoutWallsFixedHeightEnabledCheckboxItemProps) => {
    return (
        <CheckBox
            variant="3"
            name="walls_fixed_height_enabled_checkbox"
            params={17}
            onPointerTap={onWallsFixedHeightEnabledCheckbox}
            layout={{ width: 18, height: 17, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `wall_height_text` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutWallHeightTextItemProps {
    captionWallHeightText?: string;
    layout?: BoxLayout;
}

export const FloorPlanEditorBcLayoutWallHeightTextItem = ({ captionWallHeightText, layout }: FloorPlanEditorBcLayoutWallHeightTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="wall_height_text"
            params={16}
            layout={{ width: 105, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText text={captionWallHeightText ?? t('floor.editor.wall.height')} />
        </Region>
    );
};

/** Row template `wall_height_number` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutWallHeightNumberItemProps {
    captionWallHeightNumber?: string;
    layout?: BoxLayout;
}

export const FloorPlanEditorBcLayoutWallHeightNumberItem = ({ captionWallHeightNumber, layout }: FloorPlanEditorBcLayoutWallHeightNumberItemProps) => {
    return (
        <Region
            name="wall_height_number"
            params={16}
            layout={{ width: 25, height: 17, flexShrink: 0, maxWidth: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionWallHeightNumber ?? '1'}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#5f5f5f', align: 'center' }}
            />
        </Region>
    );
};

/** Row template `preview_bitmap` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutPreviewBitmapItemProps {
    layout?: BoxLayout;
    srcPreviewBitmap?: string;
}

export const FloorPlanEditorBcLayoutPreviewBitmapItem = ({ layout, srcPreviewBitmap }: FloorPlanEditorBcLayoutPreviewBitmapItemProps) => {
    return (
        <ThemeImage
            name="preview_bitmap"
            params={17}
            src={srcPreviewBitmap}
            layout={{ width: 273, height: 300, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `reload` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutReloadItemProps {
    layout?: BoxLayout;
    onReload?: () => void;
}

export const FloorPlanEditorBcLayoutReloadItem = ({ layout, onReload }: FloorPlanEditorBcLayoutReloadItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="3"
            name="reload"
            params={131089}
            onPointerTap={onReload}
            textStyle="text-style-button-shiny-bold"
            layout={{ width: 120, height: 35, flexShrink: 0, minWidth: 100, maxWidth: 120, ...layout }}
        >
            {t('floor.plan.editor.reload')}
        </ButtonThick>
    );
};

/** Row template `import_export` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutImportExportItemProps {
    layout?: BoxLayout;
    onImportExport?: () => void;
}

export const FloorPlanEditorBcLayoutImportExportItem = ({ layout, onImportExport }: FloorPlanEditorBcLayoutImportExportItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="3"
            name="import_export"
            params={131089}
            onPointerTap={onImportExport}
            textStyle="text-style-button-shiny-bold"
            layout={{ width: 120, height: 35, flexShrink: 0, minWidth: 90, maxWidth: 120, ...layout }}
        >
            {t('floor.plan.editor.import.export')}
        </ButtonThick>
    );
};

/** Row template `cancel` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutCancelItemProps {
    layout?: BoxLayout;
    onCancel?: () => void;
}

export const FloorPlanEditorBcLayoutCancelItem = ({ layout, onCancel }: FloorPlanEditorBcLayoutCancelItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="3"
            name="cancel"
            params={131089}
            onPointerTap={onCancel}
            textStyle="text-style-button-shiny-bold"
            layout={{ width: 120, height: 35, flexShrink: 0, minWidth: 90, maxWidth: 120, ...layout }}
        >
            {t('floor.plan.editor.cancel')}
        </ButtonThick>
    );
};

/** Row template `save` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutSaveItemProps {
    layout?: BoxLayout;
    onSave?: () => void;
}

export const FloorPlanEditorBcLayoutSaveItem = ({ layout, onSave }: FloorPlanEditorBcLayoutSaveItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="5"
            name="save"
            params={131089}
            tintColor="#0bb3e3"
            onPointerTap={onSave}
            textStyle="text-style-button-shiny-bold"
            layout={{ width: 120, height: 35, flexShrink: 0, minWidth: 90, maxWidth: 120, ...layout }}
        >
            {t('floor.plan.editor.save')}
        </ButtonThick>
    );
};
