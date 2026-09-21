import { useTranslation } from '#base/context/system';
import { Border, Box, Button, Frame, ScrollArea, ThemeText } from '#base/theme';

export interface FurnitureYoutubePlaylist {
    playlistId: string;
    title: string;
    description: string;
}

export interface FurnitureYoutubeViewProps {
    playlists: FurnitureYoutubePlaylist[];
    selectedPlaylistId: string;
    /** What the display is playing, if it has told us. */
    videoId: string;
    /** Only whoever may decorate the room changes what is on. */
    canControl: boolean;
    onSelectPlaylist: (playlistId: string) => void;
    onControl: (commandId: number) => void;
    onClose: () => void;
}

/**
 * The playback commands `YoutubeDisplayWidgetHandler` sends: `switchToPreviousVideo` is 0,
 * `switchToNextVideo` 1 (`pauseVideo` 2 and `continueVideo` 3 have no button - see below).
 */
const COMMAND_PREVIOUS = 0;
const COMMAND_NEXT = 1;

/**
 * A video display, on the `video_viewer` layout: which playlist it is set to, and the controls
 * for whoever may change it.
 *
 * The video itself is not played here. Flash embedded a player in the room; the port draws its
 * room into a canvas with no room for one, so the display names what is on rather than showing
 * it.
 *
 * As in `video_viewer`, the frame has no caption and the only controls are `playlist_prev` and
 * `playlist_next`, enabled once a playlist is chosen (`YoutubeDisplayWidget.updateButtons`) and
 * tooltipped `${widget.furni.video_viewer.tooltip.prev|next}`. Flash drew them as the `icons_next`
 * bitmap (mirrored for previous, which `ThemeImage` cannot do), so the port labels them with
 * arrow glyphs. Flash had no pause or play button: a click on the embedded player sent
 * `pauseVideo` / `continueVideo` by the player's state, and with no player there is nothing to
 * click, so the port offers neither.
 */
export const FurnitureYoutubeView = ({
    playlists, selectedPlaylistId, videoId, canControl, onSelectPlaylist, onControl, onClose,
}: FurnitureYoutubeViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="furniture-youtube"
            onClose={onClose}
            defaultPosition={{ x: 100, y: 80 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 320, height: 300 }}
        >
            <Border layout={{ flex: 1, flexDirection: 'column', gap: 4, padding: 6 }}>
                {playlists.length
                    ? (
                            <ScrollArea
                                orientation="vertical"
                                layout={{ width: '100%', flex: 1 }}
                                contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column', gap: 2 }}
                            >
                                {playlists.map(playlist => (
                                    <Button
                                        key={playlist.playlistId}
                                        variant="0"
                                        selected={playlist.playlistId === selectedPlaylistId}
                                        disabled={!canControl}
                                        onPointerTap={() => onSelectPlaylist(playlist.playlistId)}
                                        layout={{ width: '100%', height: 26, flexShrink: 0 }}
                                    >
                                        {playlist.title}
                                    </Button>
                                ))}
                            </ScrollArea>
                        )
                    : (
                            <ThemeText
                                text={t('widget.furni.video_viewer.no_videos')}
                                textStyle="il_regular_white"
                                textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 290 }}
                                verticalAlign="top"
                                layout={{ flex: 1 }}
                            />
                        )}
                {!!videoId.length && (
                    <ThemeText
                        text={videoId}
                        textStyle="u_small"
                    />
                )}
            </Border>
            {canControl && (
                <Box layout={{ flexDirection: 'row', gap: 4, marginTop: 3 }}>
                    <Button
                        tooltip={t('widget.furni.video_viewer.tooltip.prev')}
                        disabled={!selectedPlaylistId.length}
                        onPointerTap={() => onControl(COMMAND_PREVIOUS)}
                        layout={{ width: 40, height: 29 }}
                    >
                        {'<'}
                    </Button>
                    <Button
                        tooltip={t('widget.furni.video_viewer.tooltip.next')}
                        disabled={!selectedPlaylistId.length}
                        onPointerTap={() => onControl(COMMAND_NEXT)}
                        layout={{ width: 40, height: 29 }}
                    >
                        {'>'}
                    </Button>
                </Box>
            )}
        </Frame>
    );
};
