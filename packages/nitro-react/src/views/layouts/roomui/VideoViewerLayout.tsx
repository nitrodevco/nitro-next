import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Frame, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1013_video_viewer_xml` (layout "video_viewer", 738x356) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VideoViewerLayoutProps {
    captionNoVideosLabel?: string;
    itemsPlaylists?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onPlaylistNext?: () => void;
    onPlaylistPrev?: () => void;
    visibleVideoWrapper?: boolean;
}

export const VideoViewerLayout = ({ captionNoVideosLabel, itemsPlaylists, layout, onClose, onPlaylistNext, onPlaylistPrev, visibleVideoWrapper }: VideoViewerLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="video_viewer"
            name="video_viewer"
            params={98305}
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 738, height: 356, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="video_background"
                    params={18448}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 7, width: 431, top: 6, bottom: 48 }}
                >
                    <Region
                        name="no_videos_label"
                        params={3280}
                        layout={{ position: 'absolute', left: '50%', marginLeft: -93.5, width: 187, top: '50%', marginTop: -8, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionNoVideosLabel ?? t('widget.furni.video_viewer.no_videos')}
                            textStyle="text-style-il-regular-white"
                        />
                    </Region>
                    <Region
                        name="video_wrapper"
                        params={2176}
                        visible={visibleVideoWrapper ?? false}
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                </Region>
                <Region
                    name="right_pane"
                    params={2064}
                    layout={{ position: 'absolute', left: 447, width: 278, top: 6, bottom: 48 }}
                >
                    <ContainerButton
                        variant="3"
                        name="playlist_prev"
                        tooltip={t('widget.furni.video_viewer.tooltip.prev')}
                        params={17}
                        onPointerTap={onPlaylistPrev}
                        layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 29 }}
                    >
                        <ThemeImage
                            params={3280}
                            src={layoutImage('icons_next.png')}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -10, width: 21, top: '50%', marginTop: -8.5, height: 16 }}
                        />
                    </ContainerButton>
                    <ContainerButton
                        variant="3"
                        name="playlist_next"
                        tooltip={t('widget.furni.video_viewer.tooltip.next')}
                        params={17}
                        onPointerTap={onPlaylistNext}
                        layout={{ position: 'absolute', left: 44, width: 40, top: 0, height: 29 }}
                    >
                        <ThemeImage
                            params={3280}
                            src={layoutImage('icons_next.png')}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -10, width: 21, top: '50%', marginTop: -8.5, height: 16 }}
                        />
                    </ContainerButton>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 194, top: 33, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={t('widget.furni.video_viewer.playlists')} />
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 50, bottom: 0 }}
                    >
                        <Region
                            name="playlists"
                            params={2192}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        >
                            {itemsPlaylists ?? (
                                <VideoViewerLayoutItemItem />
                            )}
                        </Region>
                    </ScrollArea>
                </Region>
            </Region>
        </Frame>
    );
};

/** Row template `item_title` of VideoViewerLayout - pass real rows through its `items…` slot. */
export interface VideoViewerLayoutItemTitleItemProps {
    captionItemTitle?: string;
    layout?: BoxLayout;
}

export const VideoViewerLayoutItemTitleItem = ({ captionItemTitle, layout }: VideoViewerLayoutItemTitleItemProps) => {
    return (
        <Region
            name="item_title"
            params={16}
            layout={{ width: 57, height: 20, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionItemTitle ?? 'Item Title'}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};

/** Row template `item_description` of VideoViewerLayout - pass real rows through its `items…` slot. */
export interface VideoViewerLayoutItemDescriptionItemProps {
    captionItemDescription?: string;
    layout?: BoxLayout;
}

export const VideoViewerLayoutItemDescriptionItem = ({ captionItemDescription, layout }: VideoViewerLayoutItemDescriptionItemProps) => {
    return (
        <Region
            name="item_description"
            params={16}
            layout={{ width: 256, height: 101, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionItemDescription ?? 'Integer rutrum, lorem quis interdum laoreet, nibh nulla tempus magna, tristique tincidunt mi nisi in mi. Etiam at sem quis mi rutrum placerat. Aliquam erat volutpat. Phasellus eu nibh sed enim pulvinar pulvinar vitae nec dolor. Etiam in ligula diam, et ornare purus. Integer condimentum lacus in diam ultrices suscipit. Duis sed libero vel neque hendrerit mollis sit amet eu nibh. Integer sed turpis orci, ac luctus sapien.'}
                textStyle="text-style-u-small"
                textOptions={{ wordWrap: true, wordWrapWidth: 256 }}
            />
        </Region>
    );
};

/** Row template `item` of VideoViewerLayout - pass real rows through its `items…` slot. */
export interface VideoViewerLayoutItemItemProps {
    itemsItemContents?: ReactNode;
    layout?: BoxLayout;
    onItem?: () => void;
}

export const VideoViewerLayoutItemItem = ({ itemsItemContents, layout, onItem }: VideoViewerLayoutItemItemProps) => {
    return (
        <Region
            name="item"
            params={147473}
            onPointerTap={onItem}
            cursor="pointer"
            layout={{ width: 278, height: 121, flexShrink: 0, ...layout }}
        >
            <Border
                variant="103"
                name="item_background"
                params={147472}
                layout={{ position: 'absolute', left: 0, width: 278, top: 0, height: 121 }}
            >
                <Region
                    name="item_contents"
                    params={147472}
                    layout={{ position: 'absolute', left: 0, top: 0, flexDirection: 'column' }}
                >
                    {itemsItemContents ?? (
                        <>
                            <VideoViewerLayoutItemTitleItem />
                            <VideoViewerLayoutItemDescriptionItem />
                        </>
                    )}
                </Region>
            </Border>
        </Region>
    );
};
