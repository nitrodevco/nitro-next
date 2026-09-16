import { useTranslation } from '#base/context';
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
                    textStyle="text-style-bold"
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
            id="furniture-playlist-editor"
            caption={t('playlist.editor.title')}
            tintColor="#418caf"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onClose}
            defaultPosition={{ x: 60, y: 40 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 582, height: 437 }}
        >
            <Box layout={{ flex: 1, flexDirection: 'row', gap: 4 }}>
                <Border
                    variant="0"
                    layout={{ width: 303, height: 407, flexDirection: 'column' }}
                >
                    <Region
                        backgroundColor="#60863b"
                        layout={{ width: '100%', height: 30, justifyContent: 'center', paddingLeft: 8 }}
                    >
                        <ThemeText
                            text={t('playlist.editor.my.music')}
                            textStyle="text-style-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ width: '100%', flex: 1 }}
                        contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column', gap: 1 }}
                    >
                        {inventory.map(song => renderSong(song, () => onAdd(song.id), '+', isFull))}
                    </ScrollArea>
                </Border>
                <Border
                    variant="0"
                    layout={{ width: 263, height: 407, flexDirection: 'column' }}
                >
                    <Region
                        backgroundColor="#34637a"
                        layout={{ width: '100%', height: 30, justifyContent: 'center', paddingLeft: 8 }}
                    >
                        <ThemeText
                            text={t('playlist.editor.playlist')}
                            textStyle="text-style-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Region>
                    <ScrollArea
                        orientation="vertical"
                        layout={{ width: '100%', flex: 1 }}
                        contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column', gap: 1 }}
                    >
                        {playList.map((song, index) => renderSong(song, () => onRemove(index), '-', false))}
                    </ScrollArea>
                    <Region layout={{ width: '100%', height: 56, paddingLeft: 6, paddingTop: 6 }}>
                        <ThemeText
                            text={nowPlaying}
                            textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 250 }}
                            verticalAlign="top"
                        />
                    </Region>
                </Border>
            </Box>
        </Frame>
    );
};
