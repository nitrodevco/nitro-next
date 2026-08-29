import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `885_playlisteditor_main_window_xml` (layout "main_window", 582x437) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PlaylisteditorMainWindowLayoutProps {
    layout?: BoxLayout;
    musicInventoryItemgrid?: PlaylisteditorMainWindowLayoutMusicInventoryItemgridProps;
    nowPlayingContainer?: PlaylisteditorMainWindowLayoutNowPlayingContainerProps;
    onClose?: () => void;
    playlistEditorItemlist?: PlaylisteditorMainWindowLayoutPlaylistEditorItemlistProps;
    previewPlayContainer?: PlaylisteditorMainWindowLayoutPreviewPlayContainerProps;
    srcMusicInventorySplashImage?: string;
    srcPlaylistEditorSplashImage?: string;
}

export const PlaylisteditorMainWindowLayout = ({ layout, musicInventoryItemgrid, nowPlayingContainer, onClose, playlistEditorItemlist, previewPlayContainer, srcMusicInventorySplashImage, srcPlaylistEditorSplashImage }: PlaylisteditorMainWindowLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="playlist.editor"
            name="playlist.editor"
            tags={[ 'PLAYLIST_EDITOR' ]}
            caption={t('playlist.editor.title')}
            tintColor="#418caf"
            onClose={onClose}
            layout={{ width: 582, height: 437, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="0"
                    name="my_music_border"
                    layout={{ position: 'absolute', left: 0, width: 303, top: 0, height: 407 }}
                >
                    <PlaylisteditorMainWindowLayoutMusicInventoryItemgrid
                        tags={[ 'MUSICINVENTORY' ]}
                        {...musicInventoryItemgrid}
                    />
                    {/* <scrollbar_vertical> for music_inventory_itemgrid - rendered by that list's ScrollArea */}
                    <Border
                        variant="2"
                        tintColor="#60863b"
                        layout={{ position: 'absolute', left: 4, width: 295, top: 4, height: 79 }}
                    />
                    <ThemeImage
                        name="music_inventory_splash_image"
                        src={srcMusicInventorySplashImage}
                        layout={{ position: 'absolute', left: 1, right: 293, top: 1, height: 100 }}
                    />
                    <Region layout={{ position: 'absolute', left: 96, width: 234, top: 29, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('playlist.editor.my.music')}
                            textStyle="text-style-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <PlaylisteditorMainWindowLayoutPreviewPlayContainer {...previewPlayContainer} />
                </Border>
                <Border
                    variant="0"
                    name="playlist_border"
                    layout={{ position: 'absolute', left: 307, width: 263, top: 0, height: 407 }}
                >
                    <PlaylisteditorMainWindowLayoutPlaylistEditorItemlist {...playlistEditorItemlist} />
                    {/* <scrollbar_vertical> for playlist_editor_itemlist - rendered by that list's ScrollArea */}
                    <Border
                        variant="2"
                        tintColor="#34637a"
                        layout={{ position: 'absolute', left: 5, width: 255, top: 5, height: 79 }}
                    />
                    <ThemeImage
                        name="playlist_editor_splash_image"
                        src={srcPlaylistEditorSplashImage}
                        layout={{ position: 'absolute', left: 1, width: 100, top: 1, height: 100 }}
                    />
                    <Region layout={{ position: 'absolute', left: 96, width: 217, top: 29, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('playlist.editor.playlist')}
                            textStyle="text-style-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <PlaylisteditorMainWindowLayoutNowPlayingContainer {...nowPlayingContainer} />
                </Border>
            </Region>
        </Frame>
    );
};

/** Named region `music_inventory_itemgrid` of PlaylisteditorMainWindowLayout - configured through the parent's `musicInventoryItemgrid` prop. */
export interface PlaylisteditorMainWindowLayoutMusicInventoryItemgridProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const PlaylisteditorMainWindowLayoutMusicInventoryItemgrid = ({ layout, tags }: PlaylisteditorMainWindowLayoutMusicInventoryItemgridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 2, width: 277, top: 89, height: 315, ...layout }}
        >
            <Region
                name="music_inventory_itemgrid"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `preview_play_container` of PlaylisteditorMainWindowLayout - configured through the parent's `previewPlayContainer` prop. */
export interface PlaylisteditorMainWindowLayoutPreviewPlayContainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const PlaylisteditorMainWindowLayoutPreviewPlayContainer = ({ layout, tags }: PlaylisteditorMainWindowLayoutPreviewPlayContainerProps) => {
    return (
        <Region
            name="preview_play_container"
            tags={tags}
            layout={{ position: 'absolute', left: 1, width: 278, top: 295, height: 110, ...layout }}
        />
    );
};

/** Named region `playlist_editor_itemlist` of PlaylisteditorMainWindowLayout - configured through the parent's `playlistEditorItemlist` prop. */
export interface PlaylisteditorMainWindowLayoutPlaylistEditorItemlistProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const PlaylisteditorMainWindowLayoutPlaylistEditorItemlist = ({ layout, tags }: PlaylisteditorMainWindowLayoutPlaylistEditorItemlistProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 2, width: 236, top: 89, height: 262, ...layout }}
        >
            <Region
                name="playlist_editor_itemlist"
                tags={tags}
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `now_playing_container` of PlaylisteditorMainWindowLayout - configured through the parent's `nowPlayingContainer` prop. */
export interface PlaylisteditorMainWindowLayoutNowPlayingContainerProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const PlaylisteditorMainWindowLayoutNowPlayingContainer = ({ layout, tags }: PlaylisteditorMainWindowLayoutNowPlayingContainerProps) => {
    return (
        <Region
            name="now_playing_container"
            tags={tags}
            layout={{ position: 'absolute', left: 1, width: 261, top: 350, height: 56, ...layout }}
        />
    );
};
