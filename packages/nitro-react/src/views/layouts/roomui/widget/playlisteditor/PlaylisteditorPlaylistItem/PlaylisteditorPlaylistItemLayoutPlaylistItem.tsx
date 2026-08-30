import { Border, BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `playlist_item` of PlaylisteditorPlaylistItemLayout - configured through the parent's `playlistItem` prop. */
export interface PlaylisteditorPlaylistItemLayoutPlaylistItemProps {
    captionSongAuthorText?: string;
    captionSongTitleText?: string;
    layout?: BoxLayout;
    onButtonRemoveFromPlaylist?: () => void;
    onPlaylistItem?: () => void;
    srcAuthorNameIconBitmap?: string;
    srcButtonRemoveFromPlaylistImage?: string;
    srcDiskImage?: string;
    srcSongNameIconBitmap?: string;
    tintAuthorNameIconBitmap?: string;
    tintButtonRemoveFromPlaylistImage?: string;
    tintDiskImage?: string;
    tintSongNameIconBitmap?: string;
}

export const PlaylisteditorPlaylistItemLayoutPlaylistItem = ({ captionSongAuthorText, captionSongTitleText, layout, onButtonRemoveFromPlaylist, onPlaylistItem, srcAuthorNameIconBitmap, srcButtonRemoveFromPlaylistImage, srcDiskImage, srcSongNameIconBitmap, tintAuthorNameIconBitmap, tintButtonRemoveFromPlaylistImage, tintDiskImage, tintSongNameIconBitmap }: PlaylisteditorPlaylistItemLayoutPlaylistItemProps) => {
    return (
        <Region
            name="playlist_item"
            onPointerTap={onPlaylistItem}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="0"
                name="selected"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Border
                variant="2"
                name="background"
                tintColor="#f1f1f1"
                layout={{ position: 'absolute', left: 3, width: 223, top: 3, height: 46 }}
            />
            <ThemeImage
                name="disk_image"
                src={srcDiskImage}
                tint={tintDiskImage}
                layout={{ position: 'absolute', left: 7, width: 38, top: 7, height: 38 }}
            />
            <Region
                name="action_buttons"
                layout={{ position: 'absolute', left: 4, width: 44, top: 4, height: 44 }}
            >
                <Border
                    variant="2"
                    name="button_border"
                    tintColor="#658da0"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                >
                    <ContainerButton
                        variant="0"
                        name="button_remove_from_playlist"
                        onPointerTap={onButtonRemoveFromPlaylist}
                        layout={{ position: 'absolute', left: 4, width: 36, top: 4, height: 36 }}
                    >
                        <ThemeImage
                            name="button_remove_from_playlist_image"
                            src={srcButtonRemoveFromPlaylistImage}
                            tint={tintButtonRemoveFromPlaylistImage}
                            layout={{ position: 'absolute', left: 3, right: 3, top: 3, bottom: 3 }}
                        />
                    </ContainerButton>
                </Border>
            </Region>
            <ThemeText
                text={captionSongTitleText ?? ''}
                name="song_title_text"
                layout={{ position: 'absolute', left: 70, width: 4, top: 11, height: 4 }}
            />
            <ThemeText
                text={captionSongAuthorText ?? ''}
                name="song_author_text"
                layout={{ position: 'absolute', left: 70, width: 4, top: 27, height: 4 }}
            />
            <ThemeImage
                name="song_name_icon_bitmap"
                src={srcSongNameIconBitmap ?? layoutImage('jb_icon_disc.png')}
                tint={tintSongNameIconBitmap}
                layout={{ position: 'absolute', left: 54, width: 14, top: 13, height: 14 }}
            />
            <ThemeImage
                name="author_name_icon_bitmap"
                src={srcAuthorNameIconBitmap ?? layoutImage('jb_icon_composer.png')}
                tint={tintAuthorNameIconBitmap}
                layout={{ position: 'absolute', left: 54, width: 14, top: 27, height: 14 }}
            />
        </Region>
    );
};
