import { FederatedPointerEvent } from 'pixi.js';
import { useState } from 'react';

import { useWindowActions } from '#base/context/system';
import { LayoutImage, Template, TemplateBindings, TemplateItem, TemplateWindow, useTemplate } from '#base/theme';

/**
 * The jukebox playlist editor - `MainWindowHandler`, drawn from its
 * `habbo-room-ui-com/playlisteditor_main_window` template at (80, 0): your own disks on the left,
 * what the jukebox plays on the right. The header's close hides it (`findChildByTag("close")`).
 *
 * - `music_inventory_itemgrid`: a `playlisteditor_music_inventory_item` per disk
 *   (`MusicInventoryGridView.refresh`, `MusicInventoryGridItem`): its song's title, `icon_cd_big` and
 *   `title_fader`. A press selects it (`select`: 0xDEF6BF, its `selected` border and its
 *   `action_buttons`) and drops the playlist's selection; its `button_to_playlist` (`icon_arrow`)
 *   adds the disk and deselects it. The scrollbar shows past 9 disks (`onSongDiskInventoryReceived`).
 * - `preview_play_container` (`MusicInventoryStatusView`): `get_more_music` while you own 6 disks or
 *   fewer, whose `open_catalog_button` opens `trax_songs`; hidden otherwise.
 * - `playlist_editor_itemlist`: a `playlisteditor_playlist_item` per entry (`PlayListEditorItemListView`,
 *   `PlayListEditorItem`): title, author, `icon_cd_small`. A press selects it (0xD9F0FA) and drops the
 *   inventory's selection; its `button_remove_from_playlist` (`icon_arrow_left`) removes it. The
 *   scrollbar shows past 5 entries (`onPlayListUpdated`).
 * - `now_playing_container` (`PlayListStatusView.selectView`): `nowplaying` with the song's name
 *   while something plays, `play_now` while the list has songs, `add_songs` while it is empty.
 *
 * Kept from the port as it was: the add button is disabled while the jukebox is full (Flash sends
 * it and alerts on `PLAY_LIST_FULL`). Not carried, as the view is handed nothing for them: the
 * preview (`button_play_pause` and the `play_preview` status are drawn disabled / never chosen),
 * `play_now_button` and `button_pause` (`sendTogglePlayPauseStateMessage`, drawn disabled), the disk
 * colours (`getDiskColorTransformFromSongData` needs each song's data), the playing entry's
 * `icon_notes_small` (needs the play position), the now playing author and a double click adding or
 * removing. "Playing" is read as a song name being known. The splash and status backgrounds
 * (`title_mymusic`, `title_playlist`, `background_*`) come from `image.library.playlist.url`, which
 * the hotel config does not have, so those bitmaps stay empty.
 */
export interface PlaylistEditorSong {
    /** The disk in your inventory, or the slot it occupies in the jukebox. */
    id: number;
    songName: string;
    creator: string;
    /** Seconds; zero for a disk whose song is not known yet. */
    length: number;
}

export interface FurniturePlaylistEditorViewProps {
    /** The disks you own and could add. */
    inventory: PlaylistEditorSong[];
    /** What the jukebox is playing, in order. */
    playList: PlaylistEditorSong[];
    /** How many slots the jukebox has, so a full one stops accepting. */
    maxLength: number;
    nowPlaying: string;
    onAdd: (diskId: number) => void;
    onRemove: (slotNumber: number) => void;
    onClose: () => void;
}

const MAIN_TEMPLATE = 'habbo-room-ui-com/playlisteditor_main_window';
const INVENTORY_ITEM_TEMPLATE = 'habbo-room-ui-com/playlisteditor_music_inventory_item';
const PLAYLIST_ITEM_TEMPLATE = 'habbo-room-ui-com/playlisteditor_playlist_item';
const GET_MORE_MUSIC_TEMPLATE = 'habbo-room-ui-com/playlisteditor_inventory_subwindow_get_more_music';
const ADD_SONGS_TEMPLATE = 'habbo-room-ui-com/playlisteditor_playlist_subwindow_add_songs';
const PLAY_NOW_TEMPLATE = 'habbo-room-ui-com/playlisteditor_playlist_subwindow_play_now';
const NOW_PLAYING_TEMPLATE = 'habbo-room-ui-com/playlisteditor_playlist_subwindow_nowplaying';

/** `MainWindowHandler.createWindow`: the window at (80, 0). */
const WINDOW_POSITION = { x: 80, y: 0 };

/** `SHOW_BUY_MORE_MUSIC_DISK_COUNT`: up to this many disks, the inventory offers the catalogue. */
const SHOW_BUY_MORE_MUSIC_DISK_COUNT = 6;

/** `MY_MUSIC_SHOW_SCROLLBAR_ITEM_COUNT_LIMIT` / `PLAYLIST_SHOW_SCROLLBAR_ITEM_COUNT_LIMIT`: more than this, a scrollbar. */
const MY_MUSIC_SHOW_SCROLLBAR_ITEM_COUNT_LIMIT = 9;
const PLAYLIST_SHOW_SCROLLBAR_ITEM_COUNT_LIMIT = 5;

/** `MusicInventoryGridItem.BG_COLOR_SELECTED` / `PlayListEditorItem.BG_COLOR_SELECTED`, and both items' unselected colour. */
const INVENTORY_SELECTED_COLOR = 0xdef6bf;
const PLAYLIST_SELECTED_COLOR = 0xd9f0fa;
const UNSELECTED_COLOR = 0xf1f1f1;

/** `openSongDiskShopCataloguePage`: the song disks' catalogue page. */
const SONG_DISK_CATALOGUE_PAGE = 'trax_songs';

/** The selected item: an inventory disk by id, or a playlist entry by its place (`_selectedItemIndex`). */
type Selection = { diskId: number } | { index: number } | null;

/** `select()` / `deselect()`: the item's background colour, its `selected` border and its `action_buttons`. */
const selectionBindings = (selected: boolean, selectedColor: number): TemplateBindings => ({
    background: { color: selected ? selectedColor : UNSELECTED_COLOR },
    selected: { visible: selected },
    action_buttons: { visible: selected },
});

/** A window `selectView` puts in a status container, when its template is in. */
const statusWindow = (key: string, template: Template | undefined, bindings?: TemplateBindings): TemplateItem[] => (template ? [ { key, from: template, bindings } ] : []);

export const FurniturePlaylistEditorView = ({
    inventory, playList, maxLength, nowPlaying, onAdd, onRemove, onClose,
}: FurniturePlaylistEditorViewProps) => {
    const { showWindow } = useWindowActions();
    const inventoryItemTemplate = useTemplate(INVENTORY_ITEM_TEMPLATE);
    const playlistItemTemplate = useTemplate(PLAYLIST_ITEM_TEMPLATE);
    const getMoreMusicTemplate = useTemplate(GET_MORE_MUSIC_TEMPLATE);
    const addSongsTemplate = useTemplate(ADD_SONGS_TEMPLATE);
    const playNowTemplate = useTemplate(PLAY_NOW_TEMPLATE);
    const nowPlayingTemplate = useTemplate(NOW_PLAYING_TEMPLATE);
    const [ selection, setSelection ] = useState<Selection>(null);
    const isFull = (playList.length >= maxLength);

    const inventoryItems: TemplateItem[] = inventoryItemTemplate
        ? inventory.map((song) => {
                const selected = !!selection && ('diskId' in selection) && (selection.diskId === song.id);

                return {
                    key: String(song.id),
                    from: inventoryItemTemplate,
                    bindings: {
                    // `gridItemEventProc`: a press on the item selects it.
                        '': { onPointerTap: () => setSelection({ diskId: song.id }) },
                        ...selectionBindings(selected, INVENTORY_SELECTED_COLOR),
                        song_title_text: { caption: song.songName },
                        disk_image: { asset: LayoutImage('habbo-room-ui-com/icon_cd_big.png') },
                        title_fader_bitmap: { asset: LayoutImage('habbo-room-ui-com/title_fader.png') },
                        button_play_pause: { disabled: true },
                        image_button_play_pause: { asset: LayoutImage('habbo-room-ui-com/icon_play.png') },
                        button_to_playlist: {
                            disabled: isFull,
                            onPointerTap: (event: FederatedPointerEvent) => {
                                event.stopPropagation();

                                if (isFull) return;

                                setSelection(null);
                                onAdd(song.id);
                            },
                        },
                        image_button_to_playlist: { asset: LayoutImage('habbo-room-ui-com/icon_arrow.png') },
                    },
                };
            })
        : [];

    const playlistItems: TemplateItem[] = playlistItemTemplate
        ? playList.map((song, index) => {
                const selected = !!selection && ('index' in selection) && (selection.index === index);

                return {
                    key: String(index),
                    from: playlistItemTemplate,
                    bindings: {
                    // `itemEventProc`: a press on the entry selects it.
                        '': { onPointerTap: () => setSelection({ index }) },
                        ...selectionBindings(selected, PLAYLIST_SELECTED_COLOR),
                        song_title_text: { caption: song.songName },
                        song_author_text: { caption: song.creator },
                        disk_image: { asset: LayoutImage('habbo-room-ui-com/icon_cd_small.png') },
                        button_remove_from_playlist: {
                            onPointerTap: (event: FederatedPointerEvent) => {
                                event.stopPropagation();
                                setSelection(null);
                                onRemove(index);
                            },
                        },
                        button_remove_from_playlist_image: { asset: LayoutImage('habbo-room-ui-com/icon_arrow_left.png') },
                    },
                };
            })
        : [];

    // `selectMusicStatusViewByMusicState`: the catalogue offer while you own few disks.
    const showsGetMoreMusic = (inventory.length <= SHOW_BUY_MORE_MUSIC_DISK_COUNT);

    // `selectPlayListStatusViewByFurniPlayListState`.
    let playlistStatus: TemplateItem[];

    if (nowPlaying.length) {
        playlistStatus = statusWindow('now_playing', nowPlayingTemplate, {
            button_pause: { disabled: true },
            pause_image: { asset: LayoutImage('habbo-room-ui-com/icon_pause_large.png') },
            now_playing_track_name: { caption: nowPlaying },
            now_playing_author_name: { caption: '' },
        });
    } else if (playList.length) {
        playlistStatus = statusWindow('play_now', playNowTemplate, { play_now_button: { disabled: true } });
    } else {
        playlistStatus = statusWindow('add_songs', addSongsTemplate);
    }

    const bindings: TemplateBindings = {
        music_inventory_itemgrid: { items: inventoryItems },
        music_inventory_scrollbar: { visible: inventory.length > MY_MUSIC_SHOW_SCROLLBAR_ITEM_COUNT_LIMIT },
        preview_play_container: {
            visible: showsGetMoreMusic,
            added: showsGetMoreMusic
                ? statusWindow('get_more_music', getMoreMusicTemplate, {
                        open_catalog_button: { onPointerTap: () => showWindow('catalog', { pageName: SONG_DISK_CATALOGUE_PAGE }) },
                    })
                : [],
        },
        playlist_editor_itemlist: { items: playlistItems },
        playlist_scrollbar: { visible: playList.length > PLAYLIST_SHOW_SCROLLBAR_ITEM_COUNT_LIMIT },
        now_playing_container: { added: playlistStatus },
    };

    return (
        <TemplateWindow
            id={MAIN_TEMPLATE}
            bindings={bindings}
            frame={{ id: 'playlist.editor', defaultPosition: WINDOW_POSITION, rememberPosition: false, onClose }}
        />
    );
};
