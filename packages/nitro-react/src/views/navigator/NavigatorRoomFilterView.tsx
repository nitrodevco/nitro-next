import { GetCustomRoomFilterComposer, UpdateRoomFilterComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useNavigatorActions, useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { Button, Frame, ScrollArea } from '#base/theme';

/*
 * RoomFilterCtrl — iro_room_filter_framed (250x230, frame style 3, centred):
 * add-word input in a bordered box (5,8) with the add button beside it, the
 * bad-word list (5,50) 235x100 with 20px selectable rows, and the remove button
 * below. Adding sends UpdateRoomFilter(flatId, true, word), re-fetches the list
 * and resets the input to "bobba"; removing needs a selected row and sends
 * UpdateRoomFilter(flatId, false, word).
 */

/* getBgColor — selected 0x9AB8D9, hover 0xB6DEFF, odd rows white, even 0xE9E9E1 */
const rowColor = (index: number, selected: boolean) => (selected ? '#9AB8D9' : (index % 2 !== 0 ? '#FFFFFF' : '#E9E9E1'));

export const NavigatorRoomFilterView = () => {
    const { roomFilterOpen, roomFilterWords, currentRoom } = useNavigatorSelectors();
    const { closeRoomFilter, removeRoomFilterWord } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const [addWord, setAddWord] = useState('bobba');
    const [selectedIndex, setSelectedIndex] = useState(-1);

    if (!roomFilterOpen || !currentRoom) return null;

    const add = () => {
        if (addWord.length === 0) return;

        send(new UpdateRoomFilterComposer({ roomId: currentRoom.roomId, isAddingWord: true, word: addWord }));
        send(new GetCustomRoomFilterComposer({ roomId: currentRoom.roomId }));
        setAddWord('bobba');
    };

    const remove = () => {
        const word = roomFilterWords[selectedIndex];

        if (word === undefined) return;

        removeRoomFilterWord(word);
        setSelectedIndex(-1);
        send(new UpdateRoomFilterComposer({ roomId: currentRoom.roomId, isAddingWord: false, word }));
    };

    return (
        <Frame
            caption={t('navigator.roomsettings.roomfilter')}
            className="inset-0 m-auto w-62.5 h-57.5"
            contentClassName="relative"
            id="navigator-room-filter"
            resizeDirection="none"
            variant="3"
            onClose={closeRoomFilter}>
            {/* roomfilter_addword_border (5,8) 130x30 + badword_add_btn (140,8) */}
            <div className="absolute left-1.25 top-2 w-32.5 h-7.5 flex items-center px-1.25 border border-black bg-[#EAECE8]">
                <input
                    className="w-full h-4.25 px-1 bg-white border border-black text-style-regular"
                    type="text"
                    value={addWord}
                    onChange={event => setAddWord(event.target.value)}
                    onFocus={() => { if (addWord === 'bobba') setAddWord(''); }} />
            </div>
            <Button className="absolute left-35 top-2 h-7.5" variant="3" onClick={add}>
                {t('navigator.roomsettings.roomfilter.addword')}
            </Button>
            {/* roomfilter_badwords_border (5,50) 235x100 */}
            <div className="absolute left-1.25 top-12.5 w-58.75 h-25 border border-black bg-white">
                <ScrollArea className="w-full h-full" variant="100">
                    {roomFilterWords.map((word, index) => (
                        <div
                            key={word}
                            className="flex items-center h-5 px-1 cursor-pointer"
                            style={{ backgroundColor: rowColor(index, index === selectedIndex) }}
                            onClick={() => setSelectedIndex(index)}>
                            <span className="truncate text-style-regular">{word}</span>
                        </div>
                    ))}
                </ScrollArea>
            </div>
            {/* badword_remove_btn (140,155) */}
            <Button className="absolute left-35 top-38.75 h-7.5" disabled={selectedIndex === -1} variant="3" onClick={remove}>
                {t('navigator.roomsettings.roomfilter.removeword')}
            </Button>
        </Frame>
    );
}
