/**
 * The toolbar's word filter window - `toolbar/extensions/settings/WordFilterSettingsView` on the
 * `custom_word_filter_settings` layout (layout name `memenu_chat_settings`, 242 x 248): the words
 * this account filters out of what it is shown, with a field and an Add button over the list and a
 * Remove button under it. Opened from the settings list under the purse - which only offers it
 * while `user.custom.filter.enabled` - and placed as Flash places it: at the top of the desktop,
 * 200 pixels from its right edge.
 *
 * The list is the server's. The window asks for it as it opens (`prepareWindow` sends
 * `GetCustomFilterMessageComposer`) and every add and remove waits for
 * `ModifyCustomFilterResultMessageEvent` before the list changes, so a word the server refuses
 * never appears. A row is selected by clicking it and the Remove button acts on that row
 * (`§_-TR§`); rows draw the four colours `getBgColor` picks between.
 */
import { useEffect, useState } from 'react';

import { addToCustomFilter, removeFromCustomFilter, requestCustomFilter } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useUserStore, useUserWordFilterActions } from '#base/context/user';
import { Border, Box, Button, Region, ScrollArea, TextInput, ThemeText, useWindowActivation } from '#base/theme';

/** `custom_word_filter_settings` - the window and the itemlist its rows sit in (`spacing` 7). */
const WINDOW_WIDTH = 242;
const WINDOW_HEIGHT = 248;
const LIST_WIDTH = 222;
/** `SettingsExtension.openWordFilterWindow`: `desktop.width - window.width - 200`. */
const RIGHT_MARGIN = 200;
/** `refreshBadWords` gives every visible row this height, not the 18 its layout declares. */
const ROW_HEIGHT = 20;

/** `WordFilterSettingsView.getBgColor`, as ARGB in the Flash source. */
const ROW_COLOR_SELECTED = '#9ab8d9';
const ROW_COLOR_HOVERED = '#b6d9ff';
const ROW_COLOR_ODD = '#ffffff';
const ROW_COLOR_EVEN = '#e9e9e1';

interface WordRowProps {
    word: string;
    index: number;
    selected: boolean;
    onSelect: () => void;
}

/** One `custom_word_filter_item`: a hit region the whole row wide, with the word drawn over it. */
const WordRow = ({ word, index, selected, onSelect }: WordRowProps) => {
    const [ hovering, setHovering ] = useState(false);

    // `getBgColor`: the selection wins over the hover, and the hover over the row's own stripe.
    const backgroundColor = selected
        ? ROW_COLOR_SELECTED
        : (hovering ? ROW_COLOR_HOVERED : (((index % 2) !== 0) ? ROW_COLOR_ODD : ROW_COLOR_EVEN));

    return (
        <Region
            backgroundColor={backgroundColor}
            cursor="pointer"
            onPointerOver={() => setHovering(true)}
            onPointerOut={() => setHovering(false)}
            onPointerTap={onSelect}
            layout={{ width: '100%', height: ROW_HEIGHT, flexShrink: 0, overflow: 'hidden' }}
        >
            <ThemeText
                text={word}
                textStyle="u_regular"
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, top: 0, right: 0, height: 18 }}
            />
        </Region>
    );
};

export const ToolbarWordFilterView = ({ onClose }: { onClose: () => void }) => {
    const t = useTranslation();
    const { zIndex, onPointerDown } = useWindowActivation('toolbar_word_filter');
    const { send } = useWebSocketContext();
    const filteredWords = useUserStore(x => x.filteredWords);
    const selectedWordIndex = useUserStore(x => x.selectedWordIndex);
    const { setSelectedWordIndex } = useUserWordFilterActions();
    const [ word, setWord ] = useState('');

    // `prepareWindow`: the window asks for the list as it opens.
    useEffect(() => requestCustomFilter(send), [ send ]);

    /** `onAddWordClick`: the field is cleared only where the word was actually sent. */
    const onAdd = () => {
        if (addToCustomFilter(send, word)) setWord('');
    };

    return (
        <Region
            interactive
            zIndex={zIndex}
            onPointerDown={onPointerDown}
            layout={{ position: 'absolute', top: 0, right: RIGHT_MARGIN, width: WINDOW_WIDTH + 1, height: WINDOW_HEIGHT + 1 }}
        >
            <Border
                variant="6"
                tintColor="#79756e"
                layout={{ position: 'absolute', left: 1, top: 1, width: WINDOW_WIDTH, height: WINDOW_HEIGHT }}
            >
                <ThemeText
                    text={t('word_filter.settings.title')}
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 45, top: 5, width: 153, height: 17 }}
                />
                <Region
                    backgroundColor="#2f2f2f"
                    layout={{ position: 'absolute', left: 40, top: 24, width: 162, height: 1 }}
                />
                <Box layout={{ position: 'absolute', left: 10, top: 35, width: LIST_WIDTH, flexDirection: 'column', gap: 7 }}>
                    <Box layout={{ width: LIST_WIDTH, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', gap: 5 }}>
                        <Border
                            variant="3"
                            layout={{ width: 152, height: 24, flexShrink: 0 }}
                        >
                            <TextInput
                                value={word}
                                onChange={setWord}
                                onEnter={onAdd}
                                textStyle="u_regular"
                                flashPlacement
                                backgroundColor={null}
                                focusedBackgroundColor={null}
                                layout={{ position: 'absolute', left: 3, top: 4, width: 146, height: 17 }}
                            />
                        </Border>
                        <Button
                            variant="3"
                            textStyle="button_shiny_regular"
                            onPointerTap={onAdd}
                            layout={{ width: 66, height: 24, flexShrink: 0 }}
                        >
                            {t('navigator.roomsettings.roomfilter.addword')}
                        </Button>
                    </Box>
                    <Border
                        variant="3"
                        layout={{ width: LIST_WIDTH, height: 100, flexShrink: 0 }}
                    >
                        <ScrollArea
                            orientation="vertical"
                            variant="100"
                            layout={{ position: 'absolute', left: 3, right: 4, top: 4, bottom: 3 }}
                        >
                            <Box layout={{ width: '100%', flexDirection: 'column' }}>
                                {filteredWords.map((filtered, index) => (
                                    <WordRow
                                        key={filtered}
                                        word={filtered}
                                        index={index}
                                        selected={index === selectedWordIndex}
                                        onSelect={() => setSelectedWordIndex(index)}
                                    />
                                ))}
                            </Box>
                        </ScrollArea>
                    </Border>
                    <Button
                        variant="3"
                        textStyle="button_shiny_regular"
                        onPointerTap={() => removeFromCustomFilter(send)}
                        layout={{ width: 210, height: 30, flexShrink: 0 }}
                    >
                        {t('navigator.roomsettings.roomfilter.removeword')}
                    </Button>
                    <Button
                        variant="3"
                        textStyle="button_shiny_regular"
                        onPointerTap={onClose}
                        layout={{ width: 60, height: 28, flexShrink: 0 }}
                    >
                        {t('widget.memenu.back')}
                    </Button>
                </Box>
            </Border>
        </Region>
    );
};
