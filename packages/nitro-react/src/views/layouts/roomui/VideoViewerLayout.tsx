import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Frame, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1013_video_viewer_xml` (layout "video_viewer", 738x356) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VideoViewerLayoutProps {
    captionNoVideosLabel?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    rightPane?: VideoViewerLayoutRightPaneProps;
    visibleVideoWrapper?: boolean;
}

export const VideoViewerLayout = ({ captionNoVideosLabel, layout, onClose, rightPane, visibleVideoWrapper }: VideoViewerLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="video_viewer"
            name="video_viewer"
            tintColor="#67a3bf"
            onClose={onClose}
            layout={{ width: 738, height: 356, ...layout }}
        >
            <Region
                name="video_background"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 7, width: 431, top: 6, bottom: 48, justifyContent: 'center' }}
            >
                <Region
                    name="no_videos_label"
                    layout={{ position: 'absolute', width: 187, alignSelf: 'center', height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionNoVideosLabel ?? t('widget.furni.video_viewer.no_videos')}
                        textStyle="text-style-il-regular-white"
                    />
                </Region>
                {(visibleVideoWrapper ?? false) && (
                    <Region
                        name="video_wrapper"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    />
                )}
            </Region>
            <VideoViewerLayoutRightPane {...rightPane} />
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
            onPointerTap={onItem}
            cursor="pointer"
            layout={{ width: 278, height: 121, flexShrink: 0, ...layout }}
        >
            <Border
                variant="103"
                name="item_background"
                layout={{ position: 'absolute', left: 0, width: 278, top: 0, height: 121 }}
            >
                <Region
                    name="item_contents"
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

/** Named region `right_pane` of VideoViewerLayout - configured through the parent's `rightPane` prop. */
export interface VideoViewerLayoutRightPaneProps {
    itemsPlaylists?: ReactNode;
    layout?: BoxLayout;
    onPlaylistNext?: () => void;
    onPlaylistPrev?: () => void;
}

export const VideoViewerLayoutRightPane = ({ itemsPlaylists, layout, onPlaylistNext, onPlaylistPrev }: VideoViewerLayoutRightPaneProps) => {
    const t = useTranslation();

    return (
        <Region
            name="right_pane"
            layout={{ position: 'absolute', left: 447, width: 278, top: 6, bottom: 48, ...layout }}
        >
            <ContainerButton
                variant="3"
                name="playlist_prev"
                tooltip={t('widget.furni.video_viewer.tooltip.prev')}
                onPointerTap={onPlaylistPrev}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 29, justifyContent: 'center' }}
            >
                <ThemeImage
                    src={layoutImage('icons_next.png')}
                    layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 21, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 16 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="3"
                name="playlist_next"
                tooltip={t('widget.furni.video_viewer.tooltip.next')}
                onPointerTap={onPlaylistNext}
                layout={{ position: 'absolute', left: 44, width: 40, top: 0, height: 29, justifyContent: 'center' }}
            >
                <ThemeImage
                    src={layoutImage('icons_next.png')}
                    layout={{ position: 'absolute', marginLeft: 0.5, marginRight: -0.5, width: 21, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 16 }}
                />
            </ContainerButton>
            <Region layout={{ position: 'absolute', left: 0, width: 194, top: 33, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                {t('widget.furni.video_viewer.playlists')}
            </Region>
            <ScrollArea
                orientation="vertical"
                layout={{ position: 'absolute', left: 0, right: 0, top: 50, bottom: 0 }}
            >
                <Region
                    name="playlists"
                    layout={{ flexDirection: 'column', width: '100%' }}
                >
                    {itemsPlaylists ?? (
                        <VideoViewerLayoutItemItem />
                    )}
                </Region>
            </ScrollArea>
        </Region>
    );
};
