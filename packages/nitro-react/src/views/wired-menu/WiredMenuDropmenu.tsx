/**
 * A Flash `dropmenu` (`IDropMenuWindow`) of the wired menu's windows - the timezone and wired
 * style pickers of the settings tab and the filters of the room log and variable management
 * windows - on the theme's `Dropmenu` in the ubuntu skin (style 3): the items are a plain string
 * list, picked by index.
 *
 * `onSelect` is `WE_SELECTED`; returning `false` from `canSelect` is a `WE_SELECT` listener
 * calling `preventWindowOperation` (the paged windows refuse a filter change while their request
 * limiter is closed). A disabled menu (`Util.disableSection`) draws at half blend and takes no input.
 */
import { Box, BoxLayout, Dropmenu } from '#base/theme';

/** One `dropmenu_item_3` row. */
const ITEM_HEIGHT = 20;

export interface WiredMenuDropmenuProps {
    items: readonly string[];
    selected: number;
    onSelect: (index: number) => void;
    canSelect?: () => boolean;
    disabled?: boolean;
    layout?: BoxLayout;
}

export const WiredMenuDropmenu = ({ items, selected, onSelect, canSelect, disabled = false, layout }: WiredMenuDropmenuProps) => {
    const width = (typeof layout?.width === 'number') ? layout.width : 100;
    const height = (typeof layout?.height === 'number') ? layout.height : 25;

    const options = items.map((item, index) => ({
        key: index,
        label: item,
        selected: index === selected,
        onSelect: () => {
            if ((index === selected) || (canSelect && !canSelect())) return;

            onSelect(index);
        },
    }));

    return (
        <Box layout={{ flexShrink: 0, ...layout, width, height }}>
            <Dropmenu
                variant="3"
                textStyle="u_regular"
                textColor="#000000"
                caption={items[selected] ?? ''}
                options={options}
                disabled={disabled}
                itemHeight={ITEM_HEIGHT}
                layout={{ width, height, paddingLeft: 5 }}
            />
        </Box>
    );
};
