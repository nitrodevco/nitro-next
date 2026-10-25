/**
 * The toolbar's word filter window - `toolbar/extensions/settings/WordFilterSettingsView`, drawn from
 * its `custom_word_filter_settings` template (layout name `memenu_chat_settings`, 242 x 248): the
 * words this account filters out of what it is shown, with a field and an Add button over the list
 * and a Remove button under it. Opened from the settings list under the purse - which only offers it
 * while `user.custom.filter.enabled`.
 *
 * The list is the server's. The window asks for it as it opens (`prepareWindow` sends
 * `GetCustomFilterMessageComposer`) and every add and remove waits for
 * `ModifyCustomFilterResultMessageEvent` before the list changes, so a word the server refuses
 * never appears. Each word is a `custom_word_filter_item` window in `wordlist` (`getListEntry`),
 * 20 high (`refreshBadWords`), coloured by `getBgColor`; a click on its `bg_region` selects it and
 * the Remove button acts on that row (`§_-TR§`).
 */
import { useEffect, useState } from 'react';

import { addToCustomFilter, removeFromCustomFilter, requestCustomFilter } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useUserStore, useUserWordFilterActions } from '#base/context/user';
import { useFilterWordRows } from '#base/views/shared/useFilterWordRows';

import { ToolbarSettingsWindow } from './ToolbarSettingsWindow';

export const ToolbarWordFilterView = ({ onClose }: { onClose: () => void }) => {
    const { send } = useWebSocketContext();
    const filteredWords = useUserStore(x => x.filteredWords);
    const selectedWordIndex = useUserStore(x => x.selectedWordIndex);
    const { setSelectedWordIndex } = useUserWordFilterActions();
    const [ word, setWord ] = useState('');
    const rows = useFilterWordRows({ rowTemplate: 'habbo-toolbar-com/custom_word_filter_item_xml', textName: 'text', words: filteredWords, selectedIndex: selectedWordIndex, onSelect: setSelectedWordIndex });

    // `prepareWindow`: the window asks for the list as it opens.
    useEffect(() => requestCustomFilter(send), [ send ]);

    /** `onAddWordClick`: the field is cleared only where the word was actually sent. */
    const onAdd = () => {
        if (addToCustomFilter(send, word)) setWord('');
    };

    return (
        <ToolbarSettingsWindow
            windowId="toolbar_word_filter"
            templateId="habbo-toolbar-com/custom_word_filter_settings_xml"
            bindings={{
                add_word_input: { caption: word, onChange: setWord, onEnter: onAdd },
                add_btn: { onPointerTap: onAdd },
                remove_btn: { onPointerTap: () => removeFromCustomFilter(send) },
                back_btn: { onPointerTap: onClose },
                wordlist: {
                    items: rows,
                },
            }}
        />
    );
};
