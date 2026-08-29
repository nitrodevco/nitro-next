import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `998_playlisteditor_playlist_subwindow_nowplaying_xml` (layout "playlist_subwindow_nowplaying", 261x56) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PlaylisteditorPlaylistSubwindowNowplayingLayoutProps {
    layout?: BoxLayout;
    nowPlayingContainer?: PlaylisteditorPlaylistSubwindowNowplayingLayoutNowPlayingContainerProps;
}

export const PlaylisteditorPlaylistSubwindowNowplayingLayout = ({ layout, nowPlayingContainer }: PlaylisteditorPlaylistSubwindowNowplayingLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 261, height: 56, ...layout }}>
            <PlaylisteditorPlaylistSubwindowNowplayingLayoutNowPlayingContainer {...nowPlayingContainer} />
        </Region>
    );
};

/** Named region `now_playing_container` of PlaylisteditorPlaylistSubwindowNowplayingLayout - configured through the parent's `nowPlayingContainer` prop. */
export interface PlaylisteditorPlaylistSubwindowNowplayingLayoutNowPlayingContainerProps {
    captionNowPlayingAuthorName?: string;
    captionNowPlayingTrackName?: string;
    layout?: BoxLayout;
    onButtonPause?: () => void;
    srcAuthorNameIconBitmap?: string;
    srcPauseImage?: string;
    srcSongNameIconBitmap?: string;
}

export const PlaylisteditorPlaylistSubwindowNowplayingLayoutNowPlayingContainer = ({ captionNowPlayingAuthorName, captionNowPlayingTrackName, layout, onButtonPause, srcAuthorNameIconBitmap, srcPauseImage, srcSongNameIconBitmap }: PlaylisteditorPlaylistSubwindowNowplayingLayoutNowPlayingContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="now_playing_container"
            layout={{ position: 'absolute', left: 0, width: 261, top: 0, height: 56, ...layout }}
        >
            <ContainerButton
                variant="2"
                name="button_pause"
                tintColor="#cc0000"
                onPointerTap={onButtonPause}
                layout={{ position: 'absolute', left: 8, width: 46, top: 3, height: 46 }}
            >
                <ThemeImage
                    name="pause_image"
                    src={srcPauseImage}
                    layout={{ position: 'absolute', left: 14, width: 18, top: 13, height: 20 }}
                />
            </ContainerButton>
            <Region layout={{ position: 'absolute', left: 63, width: 299, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('playlist.editor.text.now.playing.in.your.room')}
                    textStyle="text-style-bold"
                />
            </Region>
            <Region
                name="now_playing_track_name"
                layout={{ position: 'absolute', left: 82, width: 69, top: 19, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionNowPlayingTrackName ?? 'Song Name'}
            </Region>
            <Region
                name="now_playing_author_name"
                layout={{ position: 'absolute', left: 82, width: 63, top: 35, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionNowPlayingAuthorName ?? 'Author Name'}
            </Region>
            <ThemeImage
                name="song_name_icon_bitmap"
                src={srcSongNameIconBitmap ?? layoutImage('jb_icon_disc.png')}
                layout={{ position: 'absolute', left: 66, width: 14, top: 21, height: 14 }}
            />
            <ThemeImage
                name="author_name_icon_bitmap"
                src={srcAuthorNameIconBitmap ?? layoutImage('jb_icon_composer.png')}
                layout={{ position: 'absolute', left: 66, width: 14, top: 35, height: 14 }}
            />
        </Region>
    );
};
