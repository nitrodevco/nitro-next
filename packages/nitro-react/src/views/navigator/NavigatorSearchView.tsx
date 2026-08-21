import { NewNavigatorSearchComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import type { NavigatorFilterType } from '#base/context';
import { useNavigatorActions, useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { Border, DropmenuSelect, NitroIcon, useTooltip } from '#base/theme';

/**
 * SearchView.FILTER_SELECTOR_INDEX_TO_MODE = [5,2,1,3,4] indexing
 * FILTER_PREFIX = ["", "owner:", "roomname:", "tag:", "group:", ""]
 */
const FILTER_TYPES: { type: NavigatorFilterType; prefix: string }[] = [
    { type: 'anything', prefix: '' },
    { type: 'room.name', prefix: 'roomname:' },
    { type: 'owner', prefix: 'owner:' },
    { type: 'tag', prefix: 'tag:' },
    { type: 'group', prefix: 'group:' }
];

/**
 * search_tools — 408x36, holding filter_type_drop_menu (116x24 style=4),
 * a bordered input (235x24 style=4) with clear_search_button (common_small_pen),
 * and refreshButtonContainer which the layout marks visible="false".
 */
export const NavigatorSearchView = () => {
    const [searchFilter, setSearchFilter] = useState('');
    const { topLevelContext, filterType } = useNavigatorSelectors();
    const { setFilterType, setIsSearching } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const tooltip = useTooltip();

    const search = (filter: string, type: NavigatorFilterType = filterType) => {
        if (!topLevelContext) return;

        setIsSearching(true);

        // SearchView.getFilterParameter(): FILTER_PREFIX[mode] + input
        const prefix = FILTER_TYPES.find(x => x.type === type)?.prefix ?? '';

        send(new NewNavigatorSearchComposer({
            searchCodeOriginal: topLevelContext.searchCode,
            filteringData: prefix + filter
        }));
    };

    return (
        <div className="flex items-center shrink-0 gap-1 h-9 px-1">
            {/* filter_type_drop_menu — 116x24 at x=4, style="4" (unregistered, falls back to 0) */}
            <DropmenuSelect
                className="shrink-0 w-29 h-6"
                rowClassName="h-6 px-1.75"
                options={FILTER_TYPES.map(({ type }) => t(`navigator.filter.${type}`))}
                selectedIndex={FILTER_TYPES.findIndex(x => x.type === filterType)}
                variant="4"
                {...tooltip(t('navigator.tooltip.filter.type'))}
                onSelect={index => { setFilterType(FILTER_TYPES[index].type); search(searchFilter, FILTER_TYPES[index].type); }} />
            {/* search_input inside its own border — 235x24 at x=133 */}
            <Border className="flex items-center gap-1 px-1.5 w-58.75 h-6" variant="4">
                {/* text fields without an explicit text_style fall back to "regular"
                    (Volter 9); the XML gives the input tool_tip_delay 2000 */}
                <input
                    className="flex-1 min-w-0 text-style-regular text-[#666666]"
                    placeholder={t('navigator.filter.input.placeholder')}
                    {...tooltip(t('navigator.tooltip.filter.input'), 2000)}
                    type="text"
                    value={searchFilter}
                    onChange={event => setSearchFilter(event.target.value)}
                    onKeyDown={event => { if (event.key === 'Enter') search(searchFilter); }} />
                {/* clear_search_button — common_small_pen, 20x20 */}
                <NitroIcon
                    className="shrink-0 cursor-pointer"
                    icon={searchFilter.length > 0 ? 'icon-nav-close' : 'icon-nav-small-pen'}
                    onClick={() => { if (searchFilter.length > 0) { setSearchFilter(''); search(''); } }} />
            </Border>
        </div>
    );
}
