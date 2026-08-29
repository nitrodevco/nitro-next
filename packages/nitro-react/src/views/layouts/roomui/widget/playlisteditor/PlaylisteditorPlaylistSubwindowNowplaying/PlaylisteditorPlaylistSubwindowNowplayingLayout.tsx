import { BoxLayout, Region } from '#base/theme';

import { PlaylisteditorPlaylistSubwindowNowplayingLayoutNowPlayingContainer, PlaylisteditorPlaylistSubwindowNowplayingLayoutNowPlayingContainerProps } from './PlaylisteditorPlaylistSubwindowNowplayingLayoutNowPlayingContainer';

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
