import { Border, BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1059_playlisteditor_playlist_item_xml` (layout "playlist_item", 229x52) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PlaylisteditorPlaylistItemLayoutProps {
    layout?: BoxLayout;
    playlistItem?: PlaylisteditorPlaylistItemLayoutPlaylistItemProps;
}

export const PlaylisteditorPlaylistItemLayout = ({ layout, playlistItem }: PlaylisteditorPlaylistItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 229, height: 52, ...layout }}>
            <PlaylisteditorPlaylistItemLayoutPlaylistItem {...playlistItem} />
        </Region>
    );
};

/** Named region `action_buttons` of PlaylisteditorPlaylistItemLayout - configured through the parent's `actionButtons` prop. */
export interface PlaylisteditorPlaylistItemLayoutActionButtonsProps {
    layout?: BoxLayout;
    onButtonRemoveFromPlaylist?: () => void;
    srcButtonRemoveFromPlaylistImage?: string;
    tags?: string[];
}

export const PlaylisteditorPlaylistItemLayoutActionButtons = ({ layout, onButtonRemoveFromPlaylist, srcButtonRemoveFromPlaylistImage, tags }: PlaylisteditorPlaylistItemLayoutActionButtonsProps) => {
    return (
        <Region
            name="action_buttons"
            tags={tags}
            layout={{ position: 'absolute', left: 4, width: 44, top: 4, height: 44, ...layout }}
        >
            <Border
                variant="2"
                name="button_border"
                tintColor="#658da0"
                layout={{ position: 'absolute', left: 0, width: 44, top: 0, height: 44 }}
            >
                <ContainerButton
                    variant="0"
                    name="button_remove_from_playlist"
                    tags={[ 'REMOVE_FROM_PLAYLIST' ]}
                    onPointerTap={onButtonRemoveFromPlaylist}
                    layout={{ position: 'absolute', left: 4, width: 36, top: 4, height: 36 }}
                >
                    <ThemeImage
                        name="button_remove_from_playlist_image"
                        src={srcButtonRemoveFromPlaylistImage}
                        layout={{ position: 'absolute', left: 3, right: 3, top: 3, bottom: 3 }}
                    />
                </ContainerButton>
            </Border>
        </Region>
    );
};

/** Named region `playlist_item` of PlaylisteditorPlaylistItemLayout - configured through the parent's `playlistItem` prop. */
export interface PlaylisteditorPlaylistItemLayoutPlaylistItemProps {
    actionButtons?: PlaylisteditorPlaylistItemLayoutActionButtonsProps;
    captionSongAuthorText?: string;
    captionSongTitleText?: string;
    layout?: BoxLayout;
    onPlaylistItem?: () => void;
    srcAuthorNameIconBitmap?: string;
    srcDiskImage?: string;
    srcSongNameIconBitmap?: string;
    tags?: string[];
}

export const PlaylisteditorPlaylistItemLayoutPlaylistItem = ({ actionButtons, captionSongAuthorText, captionSongTitleText, layout, onPlaylistItem, srcAuthorNameIconBitmap, srcDiskImage, srcSongNameIconBitmap, tags }: PlaylisteditorPlaylistItemLayoutPlaylistItemProps) => {
    return (
        <Region
            name="playlist_item"
            tags={tags}
            onPointerTap={onPlaylistItem}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 229, top: 0, height: 52, ...layout }}
        >
            <Border
                variant="0"
                name="selected"
                tags={[ 'SELECTED' ]}
                layout={{ position: 'absolute', left: 0, width: 229, top: 0, height: 52 }}
            />
            <Border
                variant="2"
                name="background"
                tags={[ 'BG_COLOR' ]}
                tintColor="#f1f1f1"
                layout={{ position: 'absolute', left: 3, width: 223, top: 3, height: 46 }}
            />
            <ThemeImage
                name="disk_image"
                tags={[ 'ICON' ]}
                src={srcDiskImage}
                layout={{ position: 'absolute', left: 7, width: 38, top: 7, height: 38 }}
            />
            <PlaylisteditorPlaylistItemLayoutActionButtons
                tags={[ 'BUTTONS' ]}
                {...actionButtons}
            />
            <Region
                name="song_title_text"
                tags={[ 'SONG_TITLE' ]}
                layout={{ position: 'absolute', left: 70, width: 4, top: 11, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionSongTitleText ?? ''} />
            </Region>
            <Region
                name="song_author_text"
                tags={[ 'SONG_AUTHOR' ]}
                layout={{ position: 'absolute', left: 70, width: 4, top: 27, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionSongAuthorText ?? ''} />
            </Region>
            <ThemeImage
                name="song_name_icon_bitmap"
                src={srcSongNameIconBitmap ?? layoutImage('jb_icon_disc.png')}
                layout={{ position: 'absolute', left: 54, width: 14, top: 13, height: 14 }}
            />
            <ThemeImage
                name="author_name_icon_bitmap"
                src={srcAuthorNameIconBitmap ?? layoutImage('jb_icon_composer.png')}
                layout={{ position: 'absolute', left: 54, width: 14, top: 27, height: 14 }}
            />
        </Region>
    );
};
