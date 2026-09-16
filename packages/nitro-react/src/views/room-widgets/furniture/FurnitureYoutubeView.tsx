import { useTranslation } from '#base/context';
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

/** The four playback commands the display takes, in the order the client sends them. */
const COMMAND_PAUSE = 0;
const COMMAND_PLAY = 1;
const COMMAND_NEXT = 2;
const COMMAND_PREVIOUS = 3;

/**
 * A video display, on the `video_viewer` layout: which playlist it is set to, and the controls
 * for whoever may change it.
 *
 * The video itself is not played here. Flash embedded a player in the room; the port draws its
 * room into a canvas with no room for one, so the display names what is on rather than showing
 * it.
 */
export const FurnitureYoutubeView = ({
    playlists, selectedPlaylistId, videoId, canControl, onSelectPlaylist, onControl, onClose,
}: FurnitureYoutubeViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="0"
            id="furniture-youtube"
            caption={t('widget.furni.video_viewer.title', 'Video')}
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
                                textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 290 }}
                                verticalAlign="top"
                                layout={{ flex: 1 }}
                            />
                        )}
                {!!videoId.length && (
                    <ThemeText
                        text={videoId}
                        textStyle="text-style-u-small"
                    />
                )}
            </Border>
            {canControl && (
                <Box layout={{ flexDirection: 'row', gap: 4, marginTop: 3 }}>
                    <Button
                        onPointerTap={() => onControl(COMMAND_PREVIOUS)}
                        layout={{ flex: 1, height: 24 }}
                    >
                        {t('widget.furni.video_viewer.previous', '<<')}
                    </Button>
                    <Button
                        onPointerTap={() => onControl(COMMAND_PLAY)}
                        layout={{ flex: 1, height: 24 }}
                    >
                        {t('widget.furni.video_viewer.play', '>')}
                    </Button>
                    <Button
                        onPointerTap={() => onControl(COMMAND_PAUSE)}
                        layout={{ flex: 1, height: 24 }}
                    >
                        {t('widget.furni.video_viewer.pause', '||')}
                    </Button>
                    <Button
                        onPointerTap={() => onControl(COMMAND_NEXT)}
                        layout={{ flex: 1, height: 24 }}
                    >
                        {t('widget.furni.video_viewer.next', '>>')}
                    </Button>
                </Box>
            )}
        </Frame>
    );
};
