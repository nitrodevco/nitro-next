import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `885_playlisteditor_main_window_xml` (layout "main_window", 582x437) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PlaylisteditorMainWindowLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    srcMusicInventorySplashImage?: string;
    srcPlaylistEditorSplashImage?: string;
}

export const PlaylisteditorMainWindowLayout = ({ layout, onClose, srcMusicInventorySplashImage, srcPlaylistEditorSplashImage }: PlaylisteditorMainWindowLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="playlist.editor"
            name="playlist.editor"
            tags={[ 'PLAYLIST_EDITOR' ]}
            params={33025}
            caption={t('playlist.editor.title')}
            tintColor="#418caf"
            onClose={onClose}
            layout={{ width: 582, height: 437, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="0"
                    name="my_music_border"
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 303, top: 0, height: 407 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 2, width: 277, top: 89, height: 315 }}
                    >
                        <Region
                            name="music_inventory_itemgrid"
                            tags={[ 'MUSICINVENTORY' ]}
                            params={17}
                            layout={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}
                        />
                    </ScrollArea>
                    {/* <scrollbar_vertical> for music_inventory_itemgrid - rendered by that list's ScrollArea */}
                    <Border
                        variant="2"
                        params={16}
                        tintColor="#60863b"
                        layout={{ position: 'absolute', left: 4, width: 295, top: 4, height: 79 }}
                    />
                    <ThemeImage
                        name="music_inventory_splash_image"
                        params={128}
                        src={srcMusicInventorySplashImage}
                        layout={{ position: 'absolute', left: 1, right: 293, top: 1, height: 100 }}
                    />
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 96, width: 234, top: 29, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('playlist.editor.my.music')}
                            textStyle="text-style-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="preview_play_container"
                        layout={{ position: 'absolute', left: 1, width: 278, top: 295, height: 110 }}
                    />
                </Border>
                <Border
                    variant="0"
                    name="playlist_border"
                    params={16}
                    layout={{ position: 'absolute', left: 307, width: 263, top: 0, height: 407 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 2, width: 236, top: 89, height: 262 }}
                    >
                        <Region
                            name="playlist_editor_itemlist"
                            params={17}
                            layout={{ flexDirection: 'column', width: '100%' }}
                        />
                    </ScrollArea>
                    {/* <scrollbar_vertical> for playlist_editor_itemlist - rendered by that list's ScrollArea */}
                    <Border
                        variant="2"
                        params={16}
                        tintColor="#34637a"
                        layout={{ position: 'absolute', left: 5, width: 255, top: 5, height: 79 }}
                    />
                    <ThemeImage
                        name="playlist_editor_splash_image"
                        params={16}
                        src={srcPlaylistEditorSplashImage}
                        layout={{ position: 'absolute', left: 1, width: 100, top: 1, height: 100 }}
                    />
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 96, width: 217, top: 29, height: 26, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('playlist.editor.playlist')}
                            textStyle="text-style-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <Region
                        name="now_playing_container"
                        params={16}
                        layout={{ position: 'absolute', left: 1, width: 261, top: 350, height: 56 }}
                    />
                </Border>
            </Region>
        </Frame>
    );
};
