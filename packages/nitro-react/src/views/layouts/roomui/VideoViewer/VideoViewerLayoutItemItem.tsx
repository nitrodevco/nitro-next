import { ReactNode } from 'react';

import { Border, BoxLayout, Region } from '#base/theme';

import { VideoViewerLayoutItemDescriptionItem } from './VideoViewerLayoutItemDescriptionItem';
import { VideoViewerLayoutItemTitleItem } from './VideoViewerLayoutItemTitleItem';

/** Row template `item` of VideoViewerLayout - pass real rows through its `items…` slot. */
export interface VideoViewerLayoutItemItemProps {
    itemsItemContents?: ReactNode;
    layout?: BoxLayout;
    onItem?: () => void;
    visibleItemBackground?: boolean;
    visibleItemContents?: boolean;
}

export const VideoViewerLayoutItemItem = ({ itemsItemContents, layout, onItem, visibleItemBackground, visibleItemContents }: VideoViewerLayoutItemItemProps) => {
    return (
        <Region
            name="item"
            onPointerTap={onItem}
            cursor="pointer"
            layout={{ width: 278, height: 121, flexShrink: 0, ...layout }}
        >
            {(visibleItemBackground ?? true) && (
                <Border
                    variant="103"
                    name="item_background"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    {(visibleItemContents ?? true) && (
                        <Region
                            name="item_contents"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'column' }}
                        >
                            {itemsItemContents ?? (
                                <>
                                    <VideoViewerLayoutItemTitleItem />
                                    <VideoViewerLayoutItemDescriptionItem />
                                </>
                            )}
                        </Region>
                    )}
                </Border>
            )}
        </Region>
    );
};
