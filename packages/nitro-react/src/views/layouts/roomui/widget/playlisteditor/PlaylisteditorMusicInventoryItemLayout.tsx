import { Border, BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `961_playlisteditor_music_inventory_item_xml` (layout "music_inventory_item", 91x104) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PlaylisteditorMusicInventoryItemLayoutProps {
    actionButtons?: PlaylisteditorMusicInventoryItemLayoutActionButtonsProps;
    captionSongTitleText?: string;
    layout?: BoxLayout;
    srcDiskImage?: string;
    srcTitleFaderBitmap?: string;
}

export const PlaylisteditorMusicInventoryItemLayout = ({ actionButtons, captionSongTitleText, layout, srcDiskImage, srcTitleFaderBitmap }: PlaylisteditorMusicInventoryItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 91, height: 104, ...layout }}>
            <Region
                params={17}
                layout={{ position: 'absolute', left: 0, width: 91, top: 0, height: 104, justifyContent: 'center' }}
            >
                <Border
                    variant="0"
                    name="selected"
                    tags={[ 'SELECTED' ]}
                    params={18}
                    layout={{ position: 'absolute', left: 0, width: 91, top: 0, height: 104 }}
                />
                <Border
                    variant="2"
                    name="background"
                    tags={[ 'BG_COLOR' ]}
                    params={18}
                    tintColor="#f1f1f1"
                    layout={{ position: 'absolute', left: 3, width: 85, top: 3, height: 98 }}
                />
                <ThemeImage
                    name="disk_image"
                    params={18}
                    src={srcDiskImage}
                    layout={{ position: 'absolute', left: 7, width: 76, top: 7, height: 76 }}
                />
                <Region
                    name="song_title_text"
                    tags={[ 'SONG_TITLE' ]}
                    params={786640}
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 80, top: 85, height: 18, maxWidth: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionSongTitleText ?? ''} />
                </Region>
                <ThemeImage
                    name="title_fader_bitmap"
                    params={16}
                    src={srcTitleFaderBitmap ?? layoutImage('jb_fader.png')}
                    layout={{ position: 'absolute', left: 81, width: 6, top: 86, height: 12 }}
                />
                <PlaylisteditorMusicInventoryItemLayoutActionButtons {...actionButtons} />
            </Region>
        </Region>
    );
};

/** Named region `action_buttons` of PlaylisteditorMusicInventoryItemLayout - configured through the parent's `actionButtons` prop. */
export interface PlaylisteditorMusicInventoryItemLayoutActionButtonsProps {
    layout?: BoxLayout;
    onButtonPlayPause?: () => void;
    onButtonToPlaylist?: () => void;
    srcImageButtonPlayPause?: string;
    srcImageButtonToPlaylist?: string;
}

export const PlaylisteditorMusicInventoryItemLayoutActionButtons = ({ layout, onButtonPlayPause, onButtonToPlaylist, srcImageButtonPlayPause, srcImageButtonToPlaylist }: PlaylisteditorMusicInventoryItemLayoutActionButtonsProps) => {
    return (
        <Region
            name="action_buttons"
            tags={[ 'BUTTONS' ]}
            params={18}
            layout={{ position: 'absolute', left: 3, width: 84, top: 57, height: 44, ...layout }}
        >
            <Border
                variant="2"
                params={16}
                tintColor="#86a762"
                layout={{ position: 'absolute', left: 0, width: 84, top: 0, height: 44 }}
            />
            <ContainerButton
                variant="0"
                name="button_play_pause"
                tags={[ 'PLAY_PAUSE' ]}
                params={17}
                onPointerTap={onButtonPlayPause}
                layout={{ position: 'absolute', left: 4, width: 36, top: 4, height: 36 }}
            >
                <ThemeImage
                    name="image_button_play_pause"
                    params={3934352}
                    src={srcImageButtonPlayPause}
                    layout={{ position: 'absolute', left: 3, right: 3, top: 3, bottom: 3 }}
                />
            </ContainerButton>
            <ContainerButton
                variant="0"
                name="button_to_playlist"
                tags={[ 'TOPLAYLIST' ]}
                params={17}
                onPointerTap={onButtonToPlaylist}
                layout={{ position: 'absolute', left: 44, width: 36, top: 4, height: 36 }}
            >
                <ThemeImage
                    name="image_button_to_playlist"
                    params={3934352}
                    src={srcImageButtonToPlaylist}
                    layout={{ position: 'absolute', left: 3, right: 3, top: 3, bottom: 3 }}
                />
            </ContainerButton>
        </Region>
    );
};
