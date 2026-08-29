import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1004_playlisteditor_playlist_subwindow_add_songs_xml` (layout "playlist_subwindow_add_songs", 261x56) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PlaylisteditorPlaylistSubwindowAddSongsLayoutProps {
    layout?: BoxLayout;
    srcAddSongsIconImage?: string;
    srcBackgroundImage?: string;
}

export const PlaylisteditorPlaylistSubwindowAddSongsLayout = ({ layout, srcAddSongsIconImage, srcBackgroundImage }: PlaylisteditorPlaylistSubwindowAddSongsLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 261, height: 56, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 261, top: 0, height: 56 }}>
                <ThemeImage
                    name="background_image"
                    src={srcBackgroundImage}
                    layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 56 }}
                />
                <ThemeImage
                    name="add_songs_icon_image"
                    src={srcAddSongsIconImage}
                    layout={{ position: 'absolute', left: 8, width: 46, top: 3, height: 46 }}
                />
                <Region layout={{ position: 'absolute', left: 63, width: 270, top: 1, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('playlist.editor.add.songs.to.your.playlist')}
                        textStyle="text-style-bold"
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 63, width: 200, top: 21, height: 32, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('playlist.editor.text.click.song.to.choose.click.again.to.move')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
