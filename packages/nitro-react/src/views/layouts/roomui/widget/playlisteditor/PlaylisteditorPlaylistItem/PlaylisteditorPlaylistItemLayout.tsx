import { BoxLayout, Region } from '#base/theme';

import { PlaylisteditorPlaylistItemLayoutPlaylistItem, PlaylisteditorPlaylistItemLayoutPlaylistItemProps } from './PlaylisteditorPlaylistItemLayoutPlaylistItem';

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
