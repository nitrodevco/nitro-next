import { useTranslation } from '#base/context/system';
import { Border, ContainerButton, Frame, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

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

/** `item_background`'s colour: 0xFFCCDDFF on the selected playlist, white otherwise. */
const SELECTED_ITEM_COLOR = '#ccddff';
const ITEM_COLOR = '#ffffff';

/** `video_viewer` is 738 wide; `YoutubeDisplayWidget.show` takes 250 off it when there is no right pane. */
const WINDOW_WIDTH = 738;
const WINDOW_HEIGHT = 356;
const NO_CONTROL_WIDTH_REDUCTION = 250;
const PLAYLISTS_WIDTH = 278;

/**
 * A video display, on the `video_viewer` layout (738x356, no caption) that
 * `YoutubeDisplayWidget.show` builds and centres: the black `video_background` on the left and,
 * for whoever may control it, the `right_pane` with the previous / next buttons and the playlists.
 * Without control the right pane is disposed, the background is stretched to the window less 20
 * and the window loses 250px. A playlist row is the layout's `item` template - a style 103 border
 * coloured for the selected one, a `u_bold` title under a 3px margin and the `u_small` description
 * wrapped to the list less 22 with an 8px bottom margin - and pressing the selected row again
 * clears the selection (`windowProcedure`). The buttons are enabled once a playlist is chosen
 * (`updateButtons`).
 *
 * The video itself is not played here. Flash embedded a player in `video_wrapper`; the port draws
 * its room into a canvas with no room for one, so the centred `no_videos_label` names the id
 * of what is on in place of the player, and says there are no videos when nothing is
 * (`loadVideo`). Flash had no pause or play button: a click on the
 * embedded player sent `pauseVideo` / `continueVideo` by the player's state, and with no player
 * there is nothing to click. The window is fixed at its opening size: Flash's is resizable, with
 * `WE_RESIZE` re-splitting the two panes, which this view does not follow.
 */
export const FurnitureYoutubeView = ({
    playlists, selectedPlaylistId, videoId, canControl, onSelectPlaylist, onControl, onClose,
}: FurnitureYoutubeViewProps) => {
    const t = useTranslation();
    const width = canControl ? WINDOW_WIDTH : (WINDOW_WIDTH - NO_CONTROL_WIDTH_REDUCTION);
    const hasSelection = !!selectedPlaylistId.length;

    return (
        <Frame
            variant="3"
            id="video_viewer"
            tintColor="#67a3bf"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 3, 36, 3, 3 ]}
            layout={{ width, height: WINDOW_HEIGHT }}
        >
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 7, top: 6, bottom: 9, width: canControl ? 431 : (WINDOW_WIDTH - 20 - NO_CONTROL_WIDTH_REDUCTION), alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={videoId.length ? videoId : t('widget.furni.video_viewer.no_videos')}
                    textStyle="il_regular_white"
                    verticalAlign="top"
                />
            </Region>
            {canControl && (
                <Region layout={{ position: 'absolute', left: 447, top: 6, bottom: 9, width: PLAYLISTS_WIDTH }}>
                    <ContainerButton
                        variant="3"
                        disabled={!hasSelection}
                        tooltip={t('widget.furni.video_viewer.tooltip.prev')}
                        onPointerTap={() => onControl(COMMAND_PREVIOUS)}
                        layout={{ position: 'absolute', left: 0, top: 0, width: 40, height: 29, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeImage
                            src={LayoutImage('room-ui/icons_next.png')}
                            bitmap={{ zoomX: -1, fitSizeToContents: true }}
                        />
                    </ContainerButton>
                    <ContainerButton
                        variant="3"
                        disabled={!hasSelection}
                        tooltip={t('widget.furni.video_viewer.tooltip.next')}
                        onPointerTap={() => onControl(COMMAND_NEXT)}
                        layout={{ position: 'absolute', left: 44, top: 0, width: 40, height: 29, alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeImage
                            src={LayoutImage('room-ui/icons_next.png')}
                            bitmap={{ fitSizeToContents: true }}
                        />
                    </ContainerButton>
                    <ThemeText
                        text={t('widget.furni.video_viewer.playlists')}
                        textStyle="u_regular"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, top: 33 }}
                    />
                    <ScrollArea
                        orientation="vertical"
                        variant="3"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 50, bottom: 0 }}
                        contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column' }}
                    >
                        {playlists.map((playlist) => {
                            const selected = (playlist.playlistId === selectedPlaylistId);

                            return (
                                <Region
                                    key={playlist.playlistId}
                                    cursor="pointer"
                                    onPointerTap={() => onSelectPlaylist(selected ? '' : playlist.playlistId)}
                                    layout={{ width: '100%', flexShrink: 0 }}
                                >
                                    <Border
                                        variant="103"
                                        tintColor={selected ? SELECTED_ITEM_COLOR : ITEM_COLOR}
                                        layout={{ width: '100%', flexDirection: 'column', alignItems: 'flex-start' }}
                                    >
                                        <Region layout={{ flexDirection: 'row', paddingTop: 3, height: 20 }}>
                                            <ThemeText
                                                text={playlist.title}
                                                textStyle="u_bold"
                                            />
                                        </Region>
                                        <Region layout={{ flexDirection: 'row', paddingBottom: 8 }}>
                                            <ThemeText
                                                text={playlist.description.replace(/\r/g, '')}
                                                textStyle="u_small"
                                                textOptions={{ wordWrap: true, wordWrapWidth: PLAYLISTS_WIDTH - 22 - 4 }}
                                                verticalAlign="top"
                                            />
                                        </Region>
                                    </Border>
                                </Region>
                            );
                        })}
                    </ScrollArea>
                </Region>
            )}
        </Frame>
    );
};
