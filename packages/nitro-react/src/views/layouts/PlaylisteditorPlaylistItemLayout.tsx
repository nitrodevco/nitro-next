import { Border, BoxLayout, ContainerButton, Region, ThemeImage } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `1059_playlisteditor_playlist_item_xml` (layout "playlist_item", 229x52) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PlaylisteditorPlaylistItemLayoutProps {
    layout?: BoxLayout;
    onButtonRemoveFromPlaylist?: () => void;
}

export const PlaylisteditorPlaylistItemLayout = ({ layout, onButtonRemoveFromPlaylist }: PlaylisteditorPlaylistItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 229, height: 52, ...layout }}>
            <Region
                name="playlist_item"
                params={17}
                layout={{ position: 'absolute', left: 0, width: 229, top: 0, height: 52 }}
            >
                <Border
                    variant="0"
                    name="selected"
                    tags={[ 'SELECTED' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 0, width: 229, top: 0, height: 52 }}
                />
                <Border
                    variant="2"
                    name="background"
                    tags={[ 'BG_COLOR' ]}
                    params={16}
                    tintColor="#f1f1f1"
                    layout={{ position: 'absolute', left: 3, width: 223, top: 3, height: 46 }}
                />
                <ThemeImage
                    name="disk_image"
                    tags={[ 'ICON' ]}
                    params={16}
                    src={undefined}
                    layout={{ position: 'absolute', left: 7, width: 38, top: 7, height: 38 }}
                />
                <Region
                    name="action_buttons"
                    tags={[ 'BUTTONS' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 4, width: 44, top: 4, height: 44 }}
                >
                    <Border
                        variant="2"
                        name="button_border"
                        params={16}
                        tintColor="#658da0"
                        layout={{ position: 'absolute', left: 0, width: 44, top: 0, height: 44 }}
                    >
                        <ContainerButton
                            variant="0"
                            name="button_remove_from_playlist"
                            tags={[ 'REMOVE_FROM_PLAYLIST' ]}
                            params={17}
                            onPointerTap={onButtonRemoveFromPlaylist}
                            layout={{ position: 'absolute', left: 4, width: 36, top: 4, height: 36 }}
                        >
                            <ThemeImage
                                name="button_remove_from_playlist_image"
                                params={3934352}
                                src={undefined}
                                layout={{ position: 'absolute', left: 3, width: 30, top: 3, height: 30 }}
                            />
                        </ContainerButton>
                    </Border>
                </Region>
                <Region
                    name="song_title_text"
                    tags={[ 'SONG_TITLE' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 70, width: 4, top: 11, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                />
                <Region
                    name="song_author_text"
                    tags={[ 'SONG_AUTHOR' ]}
                    params={16}
                    layout={{ position: 'absolute', left: 70, width: 4, top: 27, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                />
                <ThemeImage
                    name="song_name_icon_bitmap"
                    params={16}
                    src={layoutImage('jb_icon_disc.png')}
                    layout={{ position: 'absolute', left: 54, width: 14, top: 13, height: 14 }}
                />
                <ThemeImage
                    name="author_name_icon_bitmap"
                    params={16}
                    src={layoutImage('jb_icon_composer.png')}
                    layout={{ position: 'absolute', left: 54, width: 14, top: 27, height: 14 }}
                />
            </Region>
        </Region>
    );
};
