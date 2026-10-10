import { useState } from 'react';

import { addRoomFilterWord, closeRoomFilter, removeRoomFilterWord } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorActions, useNavigatorStore } from '#base/context/navigator';
import { TemplateWindow, useTemplateFrame } from '#base/theme';
import { useFilterWordRows } from '#base/views/shared/useFilterWordRows';

const TEMPLATE = 'habbo-navigator-com/iro_room_filter_framed_xml';
const ROW_TEMPLATE = 'habbo-navigator-com/ros_badword_xml';

/** The add field's text as the layout has it, and as `onAddWordClick` puts it back. */
const ADD_WORD_DEFAULT = 'bobba';

/**
 * The room's word filter - `RoomFilterCtrl` over `habbo-navigator-com/iro_room_filter_framed_xml`,
 * opened from the room info panel's filter button (`startRoomFilterEdit`), which asks for the words.
 *
 * Each word is a `ros_badword` row in `badwords_itemlist`, 20 high and striped by `getBgColor`; a
 * click on its `bg_region` selects it and the pointer over it lights it. The field starts at
 * `bobba`; Add sends whatever is in it that is not empty, asks for the list again and puts `bobba`
 * back. Remove takes the selected word out of the list at once and sends it, without asking for the
 * list. The server's answer only ever adds words (`onRoomFilterSettings`).
 *
 * The close button disposes the window and its words (`disposeWindow`); a room enter or exit only
 * hides it (`close`). Flash leaves the removed row in the list at no height and keeps its selection
 * on it, so a second Remove sends the same word again; here the row goes and nothing stays selected.
 */
export const NavigatorRoomFilterView = () => {
    const words = useNavigatorStore(x => x.roomFilterWords);
    const selectedIndex = useNavigatorStore(x => x.roomFilterSelectedIndex);
    const { setRoomFilterSelectedIndex } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const frame = useTemplateFrame({ id: 'navigator_room_filter', centered: true, onClose: closeRoomFilter });
    const [ word, setWord ] = useState(ADD_WORD_DEFAULT);
    const rows = useFilterWordRows({ rowTemplate: ROW_TEMPLATE, textName: 'badword_txt', words, selectedIndex, onSelect: setRoomFilterSelectedIndex });

    const onAdd = () => {
        addRoomFilterWord(send, word);
        setWord(ADD_WORD_DEFAULT);
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={{
                roomfilter_addword_txt: { caption: word, onChange: setWord },
                badword_add_btn: { onPointerTap: onAdd },
                badword_remove_btn: { onPointerTap: () => removeRoomFilterWord(send) },
                badwords_itemlist: {
                    items: rows,
                },
            }}
        />
    );
};
