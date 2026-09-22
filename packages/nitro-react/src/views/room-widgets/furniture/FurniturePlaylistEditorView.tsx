import { useTranslation } from '#base/context/system';
import { Border, Box, Button, Frame, Region, ScrollArea, ThemeText } from '#base/theme';

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

/** A song length reads as minutes and seconds, which is all a playlist ever needs. */
const formatLength = (length: number) => {
    const minutes = Math.floor(length / 60);
    const seconds = length % 60;

    return `${minutes}:${(seconds < 10) ? '0' : ''}${seconds}`;
};

/**
 * The jukebox playlist editor, on the `playlisteditor_main_window` layout (582x437): your own
 * disks on the left, what the jukebox will play on the right, and one click to move a song
 * between them.
 *
 * The window shell is the layout's: both borders, their tinted `style 2` header borders and
 * titles, and each list with its scrollbar at the layout's own rects. What sits in the lists is
 * not: Flash fills the inventory with a grid of `playlisteditor_music_inventory_item` disks and
 * the playlist with `playlisteditor_playlist_item` rows, drawn from the jukebox art (`jb_*` disk
 * images and buttons, the splash images) that the port does not ship yet, so both lists keep a
 * plain row per song with its add or remove button, and the `now_playing_container` keeps a
 * plain text rather than `playlisteditor_playlist_subwindow_nowplaying`.
 *
 * Flash could also preview a disk before adding it, which needs the sound system the port has
 * yet to build, so a disk here is added or not at all.
 */
export const FurniturePlaylistEditorView = ({
    inventory, playList, maxLength, nowPlaying, onAdd, onRemove, onClose,
}: FurniturePlaylistEditorViewProps) => {
    const t = useTranslation();
    const isFull = (playList.length >= maxLength);

    const renderSong = (song: PlaylistEditorSong, action: () => void, actionLabel: string, disabled: boolean) => (
        <Box
            key={song.id}
            layout={{ width: '100%', height: 46, flexShrink: 0, flexDirection: 'row', alignItems: 'center', gap: 4, paddingLeft: 4, paddingRight: 4 }}
        >
            <Box layout={{ flex: 1, flexDirection: 'column' }}>
                <ThemeText
                    text={song.songName}
                    textStyle="bold"
                />
                <ThemeText text={song.creator} />
            </Box>
            {!!song.length && <ThemeText text={formatLength(song.length)} />}
            <Button
                variant="0"
                disabled={disabled}
                onPointerTap={action}
                layout={{ width: 26, height: 24 }}
            >
                {actionLabel}
            </Button>
        </Box>
    );

    return (
        <Frame
            variant="0"
            id="playlist.editor"
            caption={t('playlist.editor.title')}
            tintColor="#418caf"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            defaultPosition={{ x: 60, y: 40 }}
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 6, 25, 6, 7 ]}
            layout={{ position: 'absolute', width: 582, height: 437 }}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, top: 0, width: 303, height: 407, overflow: 'hidden' }}
            >
                <ScrollArea
                    orientation="vertical"
                    variant="0"
                    // `music_inventory_scrollbar` is the layout's own window: it stays, disabled, while the list fits.
                    hideDisabledScrollbar={false}
                    layout={{ position: 'absolute', left: 2, top: 89, width: 295, height: 315 }}
                    viewportLayout={{ position: 'absolute', left: 0, top: 0, width: 277, height: 315 }}
                    scrollbarLayout={{ position: 'absolute', left: 278, top: 4, width: 17, height: 306 }}
                    contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column', gap: 1 }}
                >
                    {inventory.map(song => renderSong(song, () => onAdd(song.id), '+', isFull))}
                </ScrollArea>
                <Border
                    variant="2"
                    tintColor="#60863b"
                    layout={{ position: 'absolute', left: 4, top: 4, width: 295, height: 79 }}
                />
                <ThemeText
                    text={t('playlist.editor.my.music')}
                    textStyle="bold"
                    textOptions={{ fill: '#ffffff', fontFamily: 'Ubuntu', fontSize: 20 }}
                    flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 96, top: 29 }}
                />
            </Border>
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 307, top: 0, width: 263, height: 407, overflow: 'hidden' }}
            >
                <ScrollArea
                    orientation="vertical"
                    variant="0"
                    // `playlist_scrollbar` is the layout's own window: it stays, disabled, while the list fits.
                    hideDisabledScrollbar={false}
                    layout={{ position: 'absolute', left: 2, top: 89, width: 254, height: 262 }}
                    viewportLayout={{ position: 'absolute', left: 0, top: 0, width: 236, height: 262 }}
                    scrollbarLayout={{ position: 'absolute', left: 237, top: 5, width: 17, height: 254 }}
                    contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column', gap: 1 }}
                >
                    {playList.map((song, index) => renderSong(song, () => onRemove(index), '-', false))}
                </ScrollArea>
                <Border
                    variant="2"
                    tintColor="#34637a"
                    layout={{ position: 'absolute', left: 5, top: 5, width: 255, height: 79 }}
                />
                <ThemeText
                    text={t('playlist.editor.playlist')}
                    textStyle="bold"
                    textOptions={{ fill: '#ffffff', fontFamily: 'Ubuntu', fontSize: 20 }}
                    flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 96, top: 29 }}
                />
                <Region layout={{ position: 'absolute', left: 1, top: 350, width: 261, height: 56, paddingLeft: 6, paddingTop: 6 }}>
                    <ThemeText
                        text={nowPlaying}
                        textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 250 }}
                        verticalAlign="top"
                    />
                </Region>
            </Border>
        </Frame>
    );
};
