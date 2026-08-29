import { BoxLayout, Region } from '#base/theme';

import { PlaylisteditorInventorySubwindowPlayPreviewLayoutPreviewPlayContainer, PlaylisteditorInventorySubwindowPlayPreviewLayoutPreviewPlayContainerProps } from './PlaylisteditorInventorySubwindowPlayPreviewLayoutPreviewPlayContainer';

/** Generated from `829_playlisteditor_inventory_subwindow_play_preview_xml` (layout "inventory_subwindow_play_preview", 278x110) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PlaylisteditorInventorySubwindowPlayPreviewLayoutProps {
    layout?: BoxLayout;
    previewPlayContainer?: PlaylisteditorInventorySubwindowPlayPreviewLayoutPreviewPlayContainerProps;
}

export const PlaylisteditorInventorySubwindowPlayPreviewLayout = ({ layout, previewPlayContainer }: PlaylisteditorInventorySubwindowPlayPreviewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 278, height: 110, ...layout }}>
            <PlaylisteditorInventorySubwindowPlayPreviewLayoutPreviewPlayContainer {...previewPlayContainer} />
        </Region>
    );
};
