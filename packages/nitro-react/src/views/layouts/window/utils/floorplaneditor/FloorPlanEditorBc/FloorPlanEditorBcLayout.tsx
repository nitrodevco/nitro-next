import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { FloorPlanEditorBcLayoutCancelItem } from './FloorPlanEditorBcLayoutCancelItem';
import { FloorPlanEditorBcLayoutControlsContainer, FloorPlanEditorBcLayoutControlsContainerProps } from './FloorPlanEditorBcLayoutControlsContainer';
import { FloorPlanEditorBcLayoutHeightmapBitmapItem } from './FloorPlanEditorBcLayoutHeightmapBitmapItem';
import { FloorPlanEditorBcLayoutImportExportItem } from './FloorPlanEditorBcLayoutImportExportItem';
import { FloorPlanEditorBcLayoutPreviewBitmapItem } from './FloorPlanEditorBcLayoutPreviewBitmapItem';
import { FloorPlanEditorBcLayoutReloadItem } from './FloorPlanEditorBcLayoutReloadItem';
import { FloorPlanEditorBcLayoutRoomControlsItemlist, FloorPlanEditorBcLayoutRoomControlsItemlistProps } from './FloorPlanEditorBcLayoutRoomControlsItemlist';
import { FloorPlanEditorBcLayoutSaveItem } from './FloorPlanEditorBcLayoutSaveItem';
import { FloorPlanEditorBcLayoutWallHeightNumberItem } from './FloorPlanEditorBcLayoutWallHeightNumberItem';
import { FloorPlanEditorBcLayoutWallHeightTextItem } from './FloorPlanEditorBcLayoutWallHeightTextItem';
import { FloorPlanEditorBcLayoutWallsFixedHeightEnabledCheckboxItem } from './FloorPlanEditorBcLayoutWallsFixedHeightEnabledCheckboxItem';

/** Generated from `3196_floor_plan_editor_bc_xml` (layout "floor_plan_editor_bc", 662x600) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FloorPlanEditorBcLayoutProps {
    controlsContainer?: FloorPlanEditorBcLayoutControlsContainerProps;
    itemsHeightmapWrapper?: ReactNode;
    itemsLeftButtons?: ReactNode;
    itemsPreviewWrapper?: ReactNode;
    itemsRightButtons?: ReactNode;
    itemsWallHeightControls?: ReactNode;
    layout?: BoxLayout;
    mouseCapturer?: ReactNode;
    onClose?: () => void;
    onMouseCapturer?: () => void;
    onZoom?: () => void;
    roomControlsItemlist?: FloorPlanEditorBcLayoutRoomControlsItemlistProps;
    srcRefresh?: string;
    srcWallHeightSlider?: string;
    srcWallHeightSliderTrack?: string;
    srcZoom?: string;
    visibleRefresh?: boolean;
}

export const FloorPlanEditorBcLayout = ({ controlsContainer, itemsHeightmapWrapper, itemsLeftButtons, itemsPreviewWrapper, itemsRightButtons, itemsWallHeightControls, layout, mouseCapturer, onClose, onMouseCapturer, onZoom, roomControlsItemlist, srcRefresh, srcWallHeightSlider, srcWallHeightSliderTrack, srcZoom, visibleRefresh }: FloorPlanEditorBcLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('floor.plan.editor.title')}
            tintColor="#ff8d00"
            onClose={onClose}
            layout={{ width: 662, height: 600, ...layout }}
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
                        src={layoutImage('floor_plan_editor_logo.png')}
                        layout={{ position: 'absolute', left: 9, width: 38, top: 5, height: 38 }}
                    />
                    <Region layout={{ position: 'absolute', left: 74, width: 115, top: 9, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
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
                tintColor="#bdbdb5"
                layout={{ position: 'absolute', left: 10, right: 308, top: 57, bottom: 95 }}
            >
                <FloorPlanEditorBcLayoutControlsContainer {...controlsContainer} />
                <Border
                    variant="3"
                    name="heightmap_bg"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 0, right: 12, top: 132, bottom: 12 }}
                />
                <ScrollArea
                    orientation="horizontal"
                    layout={{ position: 'absolute', left: 0, right: 13, top: 132, bottom: 12 }}
                >
                    <Region
                        name="heightmap_wrapper"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsHeightmapWrapper ?? (
                            <FloorPlanEditorBcLayoutHeightmapBitmapItem />
                        )}
                        <Region layout={{ width: 30, height: 29, flexShrink: 0 }} />
                        <Region layout={{ width: 15, height: 29, flexShrink: 0 }} />
                    </Region>
                </ScrollArea>
                <Region
                    name="mouse_capturer"
                    onPointerTap={onMouseCapturer}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 13, top: 132, bottom: 12 }}
                >
                    {mouseCapturer}
                </Region>
                {/* <scrollbar_vertical> for heightmap_wrapper - rendered by that list's ScrollArea */}
                {/* <scrollbar_horizontal> for heightmap_wrapper - rendered by that list's ScrollArea */}
                <Region
                    name="zoom"
                    onPointerTap={onZoom}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 12, width: 20, bottom: 22, height: 26 }}
                >
                    <ThemeImage
                        name="zoom"
                        src={srcZoom ?? layoutImage('roomtools_magnifier.png')}
                        layout={{ position: 'absolute', left: -4, width: 30, top: -3, height: 30 }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 1034, width: 30, top: 108, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    hi :)
                </Region>
            </Border>
            <Border
                variant="3"
                name="preview_border"
                tintColor="#bdbdb5"
                layout={{ position: 'absolute', right: 7, width: 289, top: 57, bottom: 94 }}
            >
                <FloorPlanEditorBcLayoutRoomControlsItemlist {...roomControlsItemlist} />
                <Region
                    name="wall_height_controls"
                    layout={{ position: 'absolute', left: 7, width: 269, top: 97, height: 30, flexDirection: 'row' }}
                >
                    {itemsWallHeightControls ?? (
                        <>
                            <FloorPlanEditorBcLayoutWallsFixedHeightEnabledCheckboxItem />
                            <FloorPlanEditorBcLayoutWallHeightTextItem />
                            <FloorPlanEditorBcLayoutWallHeightNumberItem />
                        </>
                    )}
                    <Region layout={{ width: 118, height: 30, flexShrink: 0 }}>
                        <ThemeImage
                            name="wall_height_slider"
                            src={srcWallHeightSlider ?? layoutImage('icons_toolbar_divider.png')}
                            layout={{ position: 'absolute', left: 2, width: 111, top: 0, height: 30 }}
                        />
                        <ThemeImage
                            name="wall_height_slider_track"
                            src={srcWallHeightSliderTrack ?? layoutImage('avatar_editor_avatar_editor_download_icon.png')}
                            layout={{ position: 'absolute', left: 0, width: 12, top: 7, height: 16 }}
                        />
                    </Region>
                </Region>
                <Border
                    variant="3"
                    name="preview_bitmap_border"
                    layout={{ position: 'absolute', left: 0, width: 275, top: 133, bottom: 14 }}
                />
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 1, width: 273, top: 135, bottom: 14 }}
                >
                    <Region
                        name="preview_wrapper"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsPreviewWrapper ?? (
                            <FloorPlanEditorBcLayoutPreviewBitmapItem />
                        )}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_horizontal> for preview_wrapper - rendered by that list's ScrollArea */}
                {/* <scrollbar_vertical> for preview_wrapper - rendered by that list's ScrollArea */}
                {(visibleRefresh ?? false) && (
                    <ThemeImage
                        name="refresh"
                        src={srcRefresh ?? layoutImage('inventory_furni_recycle_icon.png')}
                        layout={{ position: 'absolute', left: 6, width: 30, top: 372, height: 30 }}
                    />
                )}
            </Border>
            <Region
                name="main_buttons"
                layout={{ position: 'absolute', left: 10, right: 9, bottom: 42, height: 40 }}
            >
                <Region
                    name="left_buttons"
                    layout={{ position: 'absolute', left: 2, width: 120, top: 0, height: 40, flexDirection: 'row', gap: 5 }}
                >
                    {itemsLeftButtons ?? (
                        <FloorPlanEditorBcLayoutReloadItem />
                    )}
                </Region>
                <Region
                    name="right_buttons"
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
        </Frame>
    );
};
