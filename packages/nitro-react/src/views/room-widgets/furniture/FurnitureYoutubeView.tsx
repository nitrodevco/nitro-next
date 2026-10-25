import { useTranslation } from '#base/context/system';
import { TemplateBindings, TemplateItem, TemplateWindow, TemplateWindows } from '#base/theme';

/**
 * A video display - `YoutubeDisplayWidget`, drawn from its `habbo-room-ui-com/video_viewer_xml`
 * template, which `createWindow` builds and centres: the black `video_background` on the left and,
 * for whoever may control it, the `right_pane` with `playlist_prev` / `playlist_next` and the
 * `playlists` list. Without control `createWindow` disposes the right pane, makes the background
 * the window's width less 20 and stretching with it, and takes 250 off the window.
 *
 * `populatePlaylists` takes the list's `item` out as the prototype and adds a clone per playlist:
 * its title and its description (carriage returns dropped), its `item_background` 0xFFCCDDFF for
 * the selected one. The clones' widths (`item_background` / `item_contents` at the list's 278,
 * `item_description` at 22 less) are the layout's own at this size. A press on an item selects it,
 * or clears the selection when it is the selected one (`windowProcedure`); the arrows are enabled
 * once a playlist is chosen (`updateButtons`). The header's close hides it.
 *
 * The video itself is not played here. Flash embedded a player in `video_wrapper`; the port draws
 * into one Pixi canvas with no room for one, so the wrapper stays hidden and the centred
 * `no_videos_label` names the id of what is on in place of the player, and says there are no
 * videos when nothing is (`loadVideo`). Flash had no pause or play button: a click on the embedded
 * player sent `pauseVideo` / `continueVideo` by the player's state, and with no player there is
 * nothing to click. The window is fixed at its opening size: Flash's is resizable, with
 * `WE_RESIZE` re-splitting the two panes, which this view does not follow.
 */
const VIDEO_TEMPLATE = 'habbo-room-ui-com/video_viewer_xml';

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

/** `item_background`'s colour: 0xFFCCDDFF (4291611903) on the selected playlist, white otherwise. */
const SELECTED_ITEM_COLOR = 0xccddff;
const ITEM_COLOR = 0xffffff;

/** `createWindow` without control: the background is the window less 20, and the window loses 250. */
const NO_CONTROL_BACKGROUND_INSET = 20;
const NO_CONTROL_WIDTH_REDUCTION = 250;

/** `video_background`'s `scale_horizontal` param (`setParamFlag(128)`): it stretches with the window. */
const PARAM_SCALE_HORIZONTAL = 128;

export const FurnitureYoutubeView = ({
    playlists, selectedPlaylistId, videoId, canControl, onSelectPlaylist, onControl, onClose,
}: FurnitureYoutubeViewProps) => {
    const t = useTranslation();
    const hasSelection = !!selectedPlaylistId.length;

    const items: TemplateItem[] = playlists.map((playlist) => {
        const selected = (playlist.playlistId === selectedPlaylistId);

        return {
            key: playlist.playlistId,
            from: 'item',
            bindings: {
                '': { onPointerTap: () => onSelectPlaylist(selected ? '' : playlist.playlistId) },
                item_background: { color: selected ? SELECTED_ITEM_COLOR : ITEM_COLOR },
                item_title: { caption: playlist.title },
                item_description: { caption: playlist.description.replace(/\r/g, '') },
            },
        };
    });

    const bindings: TemplateBindings = {
        no_videos_label: { caption: videoId.length ? videoId : t('widget.furni.video_viewer.no_videos') },
        right_pane: { visible: canControl },
        playlist_prev: { disabled: !hasSelection, onPointerTap: hasSelection ? () => onControl(COMMAND_PREVIOUS) : undefined },
        playlist_next: { disabled: !hasSelection, onPointerTap: hasSelection ? () => onControl(COMMAND_NEXT) : undefined },
        playlists: { items },
    };

    const arrange = ({ root, find }: TemplateWindows) => {
        if (canControl) return;

        const window = root();
        const background = find('video_background');

        if (!window || !background) return;

        background.setWidth(window.width - NO_CONTROL_BACKGROUND_INSET);
        background.setParamFlag(PARAM_SCALE_HORIZONTAL, true);
        window.setWidth(window.width - NO_CONTROL_WIDTH_REDUCTION);
    };

    return (
        <TemplateWindow
            id={VIDEO_TEMPLATE}
            bindings={bindings}
            arrange={arrange}
            frame={{ id: 'video_viewer', centered: true, rememberPosition: false, onClose }}
        />
    );
};
