import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `998_playlisteditor_playlist_subwindow_nowplaying_xml` (layout "playlist_subwindow_nowplaying", 261x56) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PlaylisteditorPlaylistSubwindowNowplayingLayoutProps {
    layout?: BoxLayout;
    onButtonPause?: () => void;
}

export const PlaylisteditorPlaylistSubwindowNowplayingLayout = ({ layout, onButtonPause }: PlaylisteditorPlaylistSubwindowNowplayingLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 261, height: 56, ...layout }}>
            <Region
                name="now_playing_container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 261, top: 0, height: 56 }}
            >
                <ContainerButton
                    variant="2"
                    name="button_pause"
                    tags={[ 'PAUSE_PLAYBACK' ]}
                    params={17}
                    tintColor="#cc0000"
                    onPointerTap={onButtonPause}
                    layout={{ position: 'absolute', left: 8, width: 46, top: 3, height: 46 }}
                >
                    <ThemeImage
                        name="pause_image"
                        params={16}
                        src={undefined}
                        layout={{ position: 'absolute', left: 14, width: 18, top: 13, height: 20 }}
                    />
                </ContainerButton>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 63, width: 299, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('playlist.editor.text.now.playing.in.your.room')}
                        textStyle="text-style-bold"
                    />
                </Region>
                <Region
                    name="now_playing_track_name"
                    tags={[ 'SONG_NAME' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 82, width: 69, top: 19, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text="Song Name" />
                </Region>
                <Region
                    name="now_playing_author_name"
                    tags={[ 'AUTHOR_NAME' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 82, width: 63, top: 35, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text="Author Name" />
                </Region>
                <ThemeImage
                    name="song_name_icon_bitmap"
                    params={16}
                    src={layoutImage('jb_icon_disc.png')}
                    layout={{ position: 'absolute', left: 66, width: 14, top: 21, height: 14 }}
                />
                <ThemeImage
                    name="author_name_icon_bitmap"
                    params={16}
                    src={layoutImage('jb_icon_composer.png')}
                    layout={{ position: 'absolute', left: 66, width: 14, top: 35, height: 14 }}
                />
            </Region>
        </Region>
    );
};
