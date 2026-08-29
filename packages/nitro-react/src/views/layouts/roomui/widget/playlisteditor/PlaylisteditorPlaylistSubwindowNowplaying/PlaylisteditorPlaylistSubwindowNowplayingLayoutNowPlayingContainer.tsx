import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `now_playing_container` of PlaylisteditorPlaylistSubwindowNowplayingLayout - configured through the parent's `nowPlayingContainer` prop. */
export interface PlaylisteditorPlaylistSubwindowNowplayingLayoutNowPlayingContainerProps {
    captionNowPlayingAuthorName?: string;
    captionNowPlayingTrackName?: string;
    layout?: BoxLayout;
    onButtonPause?: () => void;
    srcAuthorNameIconBitmap?: string;
    srcPauseImage?: string;
    srcSongNameIconBitmap?: string;
    tintAuthorNameIconBitmap?: string;
    tintPauseImage?: string;
    tintSongNameIconBitmap?: string;
}

export const PlaylisteditorPlaylistSubwindowNowplayingLayoutNowPlayingContainer = ({ captionNowPlayingAuthorName, captionNowPlayingTrackName, layout, onButtonPause, srcAuthorNameIconBitmap, srcPauseImage, srcSongNameIconBitmap, tintAuthorNameIconBitmap, tintPauseImage, tintSongNameIconBitmap }: PlaylisteditorPlaylistSubwindowNowplayingLayoutNowPlayingContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="now_playing_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ContainerButton
                variant="2"
                name="button_pause"
                tintColor="#cc0000"
                onPointerTap={onButtonPause}
                layout={{ position: 'absolute', left: 8, width: 46, top: 3, bottom: 7, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="pause_image"
                    src={srcPauseImage}
                    tint={tintPauseImage}
                    layout={{ position: 'absolute', width: 18, alignSelf: 'center', height: 20 }}
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
                layout={{ position: 'absolute', left: 82, width: 69, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionNowPlayingTrackName ?? 'Song Name'}
            </Region>
            <Region
                name="now_playing_author_name"
                layout={{ position: 'absolute', left: 82, width: 63, bottom: 6, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionNowPlayingAuthorName ?? 'Author Name'}
            </Region>
            <ThemeImage
                name="song_name_icon_bitmap"
                src={srcSongNameIconBitmap ?? layoutImage('jb_icon_disc.png')}
                tint={tintSongNameIconBitmap}
                layout={{ position: 'absolute', left: 66, width: 14, alignSelf: 'center', height: 14 }}
            />
            <ThemeImage
                name="author_name_icon_bitmap"
                src={srcAuthorNameIconBitmap ?? layoutImage('jb_icon_composer.png')}
                tint={tintAuthorNameIconBitmap}
                layout={{ position: 'absolute', left: 66, width: 14, bottom: 7, height: 14 }}
            />
        </Region>
    );
};
