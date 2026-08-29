import { Border, BoxLayout, ContainerButton, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `961_playlisteditor_music_inventory_item_xml` (layout "music_inventory_item", 91x104) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PlaylisteditorMusicInventoryItemLayoutProps {
    captionSongTitleText?: string;
    layout?: BoxLayout;
    onButtonPlayPause?: () => void;
    onButtonToPlaylist?: () => void;
    srcDiskImage?: string;
    srcImageButtonPlayPause?: string;
    srcImageButtonToPlaylist?: string;
    srcTitleFaderBitmap?: string;
    tintDiskImage?: string;
    tintImageButtonPlayPause?: string;
    tintImageButtonToPlaylist?: string;
    tintTitleFaderBitmap?: string;
}

export const PlaylisteditorMusicInventoryItemLayout = ({ captionSongTitleText, layout, onButtonPlayPause, onButtonToPlaylist, srcDiskImage, srcImageButtonPlayPause, srcImageButtonToPlaylist, srcTitleFaderBitmap, tintDiskImage, tintImageButtonPlayPause, tintImageButtonToPlaylist, tintTitleFaderBitmap }: PlaylisteditorMusicInventoryItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 91, height: 104, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 91, top: 0, height: 104, justifyContent: 'center' }}>
                <Border
                    variant="0"
                    name="selected"
                    layout={{ position: 'absolute', left: 0, width: 91, top: 0, height: 104 }}
                />
                <Border
                    variant="2"
                    name="background"
                    tintColor="#f1f1f1"
                    layout={{ position: 'absolute', left: 3, width: 85, top: 3, height: 98 }}
                />
                <ThemeImage
                    name="disk_image"
                    src={srcDiskImage}
                    tint={tintDiskImage}
                    layout={{ position: 'absolute', left: 7, width: 76, top: 7, height: 76 }}
                />
                <Region
                    name="song_title_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 80, top: 85, height: 18, maxWidth: 80, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionSongTitleText ?? ''}
                </Region>
                <ThemeImage
                    name="title_fader_bitmap"
                    src={srcTitleFaderBitmap ?? layoutImage('jb_fader.png')}
                    tint={tintTitleFaderBitmap}
                    layout={{ position: 'absolute', left: 81, width: 6, top: 86, height: 12 }}
                />
                <Region
                    name="action_buttons"
                    layout={{ position: 'absolute', left: 3, width: 84, top: 57, height: 44 }}
                >
                    <Border
                        variant="2"
                        tintColor="#86a762"
                        layout={{ position: 'absolute', left: 0, width: 84, top: 0, height: 44 }}
                    />
                    <ContainerButton
                        variant="0"
                        name="button_play_pause"
                        onPointerTap={onButtonPlayPause}
                        layout={{ position: 'absolute', left: 4, width: 36, top: 4, height: 36 }}
                    >
                        <ThemeImage
                            name="image_button_play_pause"
                            src={srcImageButtonPlayPause}
                            tint={tintImageButtonPlayPause}
                            layout={{ position: 'absolute', left: 3, right: 3, top: 3, bottom: 3 }}
                        />
                    </ContainerButton>
                    <ContainerButton
                        variant="0"
                        name="button_to_playlist"
                        onPointerTap={onButtonToPlaylist}
                        layout={{ position: 'absolute', left: 44, width: 36, top: 4, height: 36 }}
                    >
                        <ThemeImage
                            name="image_button_to_playlist"
                            src={srcImageButtonToPlaylist}
                            tint={tintImageButtonToPlaylist}
                            layout={{ position: 'absolute', left: 3, right: 3, top: 3, bottom: 3 }}
                        />
                    </ContainerButton>
                </Region>
            </Region>
        </Region>
    );
};
