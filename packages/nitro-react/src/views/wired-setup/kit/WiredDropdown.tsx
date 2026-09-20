/**
 * `wired_setup.uibuilder.presets.DropdownPreset` with `params.DropdownParam`, driven by
 * `wired_setup.common.advanced_dropdown.ExpandableDropdown` - the style's `dropdown_view` and the
 * list it opens, on the theme's `Dropmenu`.
 *
 * - The closed drop menu shows the selected option's label, or `caption` while nothing is
 *   selected (`selectedOptionId` -1, which is where every dropdown starts).
 * - Options flagged `advanced` are folded behind a last "show more" entry (`showMoreLabel`,
 *   `DropdownParam.showMoreLocalization`) until it is picked: picking it lists everything and
 *   keeps the list open (`populate(..., true)` + `openMenu`). When the list closes the advanced
 *   ones fold away again (`onDropdownCollapse`); a selected advanced option keeps them all listed
 *   (see `listedDropdownOptions`).
 * - `width` is `DropdownParam.staticWidth`: -1 (the default) fills, anything else is a static
 *   width.
 *
 * Controlled: `selected` is the option id and `onSelect` the param's `onChangeCallback`, called
 * with the picked option's id when it differs from `selected`.
 */
import { useState } from 'react';

import { Box, Dropmenu, DropmenuOption } from '#base/theme';
import { listedDropdownOptions, showsDropdownShowMore, WIRED_DROPDOWN_NO_SELECTION, WiredDropdownOption } from '#base/wired';

import { useWiredCaption } from './useWiredCaption';
import { useWiredDisabled } from './useWiredDisabled';
import { useWiredFillLayout } from './useWiredFillLayout';
import { useWiredStyle } from './WiredStyleContext';

/** One `DropmenuItem` row. */
const ITEM_HEIGHT = 19;
/** The "show more" entry's key, clear of every option id. */
const SHOW_MORE_KEY = 'show-more';

export interface WiredDropdownProps {
    /** `DropdownParam.options` (`ExpandableDropdownOption` each). */
    options: readonly WiredDropdownOption[];
    /** `selectedId` - `WIRED_DROPDOWN_NO_SELECTION` (-1) for none. */
    selected: number;
    /** `onChangeCallback`, with the picked option's id. */
    onSelect: (id: number) => void;
    /** `caption` - shown while nothing is selected; a literal or `${key}`. */
    caption?: string;
    /** `showMoreLocalization` - the "show more" entry; a literal or `${key}`. */
    showMoreLabel?: string;
    /** `staticWidth`. Default -1: fills. */
    width?: number;
    disabled?: boolean;
}

export const WiredDropdown = ({ options, selected, onSelect, caption = '', showMoreLabel = '', width = -1, disabled = false }: WiredDropdownProps) => {
    const style = useWiredStyle();
    const template = style.templates.dropdown;
    const resolve = useWiredCaption();
    const isDisabled = useWiredDisabled(disabled);
    const fillLayout = useWiredFillLayout((width >= 0) ? width : undefined);
    // `§_-22j§` - the advanced options are listed.
    const [ expanded, setExpanded ] = useState(false);

    const selectedOption = (selected === WIRED_DROPDOWN_NO_SELECTION) ? undefined : options.find(option => option.id === selected);
    const listed = listedDropdownOptions(options, selected, expanded);

    const menuOptions: DropmenuOption[] = listed.map(option => ({
        key: option.id,
        label: resolve(option.label),
        selected: option.id === selected,
        disabled: option.disabled,
        onSelect: () => {
            if (option.id !== selected) onSelect(option.id);
        },
    }));

    if (showsDropdownShowMore(options, selected, expanded)) {
        menuOptions.push({ key: SHOW_MORE_KEY, label: resolve(showMoreLabel), keepOpen: true, onSelect: () => setExpanded(true) });
    }

    return (
        // `Dropmenu` draws a disabled menu at half blend itself, as `useWiredDisabled` sections expect.
        <Box layout={{ flexDirection: 'row', height: template.height, flexShrink: 0, ...fillLayout }}>
            <Dropmenu
                variant={template.variant}
                caption={resolve(selectedOption ? selectedOption.label : caption)}
                options={menuOptions}
                disabled={isDisabled}
                itemHeight={ITEM_HEIGHT}
                onOpenChange={open => !open && setExpanded(false)}
                layout={{ flexGrow: 1, height: template.height }}
            />
        </Box>
    );
};
