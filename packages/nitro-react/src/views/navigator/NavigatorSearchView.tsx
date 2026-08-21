import { NewNavigatorSearchComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import type { NavigatorFilterType } from '#base/context';
import { useNavigatorActions, useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { Border, Dropmenu, DropmenuItem, NitroIcon } from '#base/theme';

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
    const [isFilterOpen, setFilterOpen] = useState(false);
    const { topLevelContext, searchFilter, filterType } = useNavigatorSelectors();
    const { setSearchFilter, setFilterType, setIsSearching } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();

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
            {/* filter_type_drop_menu — 116x24 at x=4 */}
            <div className="relative shrink-0">
                <Dropmenu
                    className="flex items-center px-1 w-29 h-6 cursor-pointer"
                    title={t('navigator.tooltip.filter.type')}
                    variant="100"
                    onClick={() => setFilterOpen(prev => !prev)}>
                    <span className="truncate text-style-u-regular">{t(`navigator.filter.${filterType}`)}</span>
                </Dropmenu>
                {isFilterOpen && (
                    <div className="absolute top-6 left-0 z-10 w-29">
                        {FILTER_TYPES.map(({ type }) => (
                            <DropmenuItem
                                key={type}
                                className="px-1 cursor-pointer text-style-u-regular"
                                onClick={() => { setFilterType(type); setFilterOpen(false); search(searchFilter, type); }}>
                                {t(`navigator.filter.${type}`)}
                            </DropmenuItem>
                        ))}
                    </div>
                )}
            </div>
            {/* search_input inside its own border — 235x24 at x=133 */}
            <Border className="flex items-center gap-1 px-1.5 w-58.75 h-6" variant="4">
                <input
                    className="flex-1 min-w-0 text-style-u-regular text-[#666666]"
                    placeholder={t('navigator.filter.input.placeholder')}
                    title={t('navigator.tooltip.filter.input')}
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
