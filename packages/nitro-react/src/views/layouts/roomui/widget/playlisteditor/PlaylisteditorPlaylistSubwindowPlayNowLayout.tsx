import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region } from '#base/theme';

/** Generated from `1002_playlisteditor_playlist_subwindow_play_now_xml` (layout "playlist_subwindow_play_now", 261x56) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PlaylisteditorPlaylistSubwindowPlayNowLayoutProps {
    layout?: BoxLayout;
    onPlayNowButton?: () => void;
}

export const PlaylisteditorPlaylistSubwindowPlayNowLayout = ({ layout, onPlayNowButton }: PlaylisteditorPlaylistSubwindowPlayNowLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 261, height: 56, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <ButtonThick
                    variant="5"
                    name="play_now_button"
                    tintColor="#22bb00"
                    onPointerTap={onPlayNowButton}
                    layout={{ position: 'absolute', left: 6, right: 5, top: 3, bottom: 3, minWidth: 250, maxWidth: 250 }}
                >
                    {t('playlist.editor.button.play.now')}
                </ButtonThick>
            </Region>
        </Region>
    );
};
