import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `preview_play_container` of PlaylisteditorInventorySubwindowPlayPreviewLayout - configured through the parent's `previewPlayContainer` prop. */
export interface PlaylisteditorInventorySubwindowPlayPreviewLayoutPreviewPlayContainerProps {
    captionPreviewPlayAuthorName?: string;
    captionPreviewPlayTrackName?: string;
    layout?: BoxLayout;
    onStopPreviewButton?: () => void;
    srcAuthorNameIconBitmap?: string;
    srcPreviewPlayBackgroundImage?: string;
    srcSongNameIconBitmap?: string;
    tintAuthorNameIconBitmap?: string;
    tintPreviewPlayBackgroundImage?: string;
    tintSongNameIconBitmap?: string;
}

export const PlaylisteditorInventorySubwindowPlayPreviewLayoutPreviewPlayContainer = ({ captionPreviewPlayAuthorName, captionPreviewPlayTrackName, layout, onStopPreviewButton, srcAuthorNameIconBitmap, srcPreviewPlayBackgroundImage, srcSongNameIconBitmap, tintAuthorNameIconBitmap, tintPreviewPlayBackgroundImage, tintSongNameIconBitmap }: PlaylisteditorInventorySubwindowPlayPreviewLayoutPreviewPlayContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_play_container"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ThemeImage
                name="preview_play_background_image"
                src={srcPreviewPlayBackgroundImage}
                tint={tintPreviewPlayBackgroundImage}
                layout={{ position: 'absolute', left: 0, width: 278, top: 0, height: 110 }}
            />
            <Region layout={{ position: 'absolute', left: 15, width: 287, top: 21, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('playlist.editor.text.preview.playing.for.you')}
                    textStyle="text-style-bold"
                />
            </Region>
            <Region
                name="preview_play_track_name"
                layout={{ position: 'absolute', left: 31, width: 193, top: 40, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionPreviewPlayTrackName ?? 'preview_track_name'}
            </Region>
            <Region
                name="preview_play_author_name"
                layout={{ position: 'absolute', left: 31, width: 193, top: 56, height: 18, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionPreviewPlayAuthorName ?? 'preview_author_name'}
            </Region>
            <ThemeImage
                name="song_name_icon_bitmap"
                src={srcSongNameIconBitmap ?? layoutImage('jb_icon_disc.png')}
                tint={tintSongNameIconBitmap}
                layout={{ position: 'absolute', left: 15, width: 14, top: 42, height: 14 }}
            />
            <ThemeImage
                name="author_name_icon_bitmap"
                src={srcAuthorNameIconBitmap ?? layoutImage('jb_icon_composer.png')}
                tint={tintAuthorNameIconBitmap}
                layout={{ position: 'absolute', left: 15, width: 14, top: 56, height: 14 }}
            />
            <ButtonThick
                variant="5"
                name="stop_preview_button"
                tintColor="#cc0000"
                onPointerTap={onStopPreviewButton}
                layout={{ position: 'absolute', left: 15, width: 219, bottom: 6, height: 28 }}
            >
                {t('playlist.editor.button.preview.stop')}
            </ButtonThick>
        </Region>
    );
};
