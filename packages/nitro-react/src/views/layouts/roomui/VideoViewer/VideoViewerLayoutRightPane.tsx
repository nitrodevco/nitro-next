import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { VideoViewerLayoutItemItem } from './VideoViewerLayoutItemItem';

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
            layout={{ position: 'absolute', left: 447, width: 278, top: 6, bottom: 7, ...layout }}
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
            <ThemeText
                text={t('widget.furni.video_viewer.playlists')}
                layout={{ position: 'absolute', left: 0, width: 194, top: 33, height: 17 }}
            />
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
