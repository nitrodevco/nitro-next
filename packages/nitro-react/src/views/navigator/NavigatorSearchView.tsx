import { NAVIGATOR_FILTER_TYPES, useNavigatorActions, useNavigatorSelectors, useTranslation } from '#base/context';
import { useNavigatorSearch } from '#base/hooks';
import { Border, Button, DropmenuSelect, NitroIcon, useTooltip } from '#base/theme';

/**
 * search_tools — 408x36, holding filter_type_drop_menu (116x24 style=4),
 * a bordered input (235x24 style=4) with clear_search_button, and
 * refreshButtonContainer (25x25 button style=5 at x=375) which SearchView shows
 * whenever the input holds text.
 *
 * SearchView semantics: changing the dropdown does NOT search (the selection is
 * only read on Enter); the clear button only clears and refocuses; Enter
 * re-searches the current result's searchCodeOriginal with prefix + input.
 * Placeholder/carried text renders italic in 0x9F9F9F and turns black on focus.
 */
export const NavigatorSearchView = () => {
    const { searchResult, filterType, searchText, searchTextCarry } = useNavigatorSelectors();
    const { setFilterType, setSearchText, clearSearchTextCarry } = useNavigatorActions();
    const { performSearch, performLastSearch } = useNavigatorSearch();
    const t = useTranslation();
    const tooltip = useTooltip();

    /* keyUpHandler — performSearch(currentResults.searchCodeOriginal, getFilterParameter()) */
    const search = () => {
        if (!searchResult) return;

        const prefix = NAVIGATOR_FILTER_TYPES.find(x => x.type === filterType)?.prefix ?? '';

        performSearch(searchResult.searchCodeOriginal, prefix + searchText);
    };

    return (
        <div className="flex items-center shrink-0 gap-1 h-9 px-1">
            {/* filter_type_drop_menu — 116x24 at x=4, style="4" (unregistered, falls back to 0) */}
            <DropmenuSelect
                className="shrink-0 w-29 h-6"
                rowClassName="h-6 px-1.75"
                options={NAVIGATOR_FILTER_TYPES.map(({ type }) => t(`navigator.filter.${type}`))}
                selectedIndex={NAVIGATOR_FILTER_TYPES.findIndex(x => x.type === filterType)}
                variant="4"
                {...tooltip(t('navigator.tooltip.filter.type'))}
                onSelect={index => setFilterType(NAVIGATOR_FILTER_TYPES[index].type)} />
            {/* search_input inside its own border — 235x24 at x=133 */}
            <Border className="flex items-center gap-1 px-1.5 w-58.75 h-6" variant="4">
                {/* text fields without an explicit text_style fall back to "regular"
                    (Volter 9); the XML gives the input tool_tip_delay 2000 */}
                <input
                    className={`flex-1 min-w-0 text-style-regular placeholder:italic placeholder:text-[#9F9F9F] ${searchTextCarry ? 'italic text-[#9F9F9F]' : 'text-black'}`}
                    placeholder={t('navigator.filter.input.placeholder')}
                    {...tooltip(t('navigator.tooltip.filter.input'), 2000)}
                    type="text"
                    value={searchText}
                    onChange={event => setSearchText(event.target.value)}
                    onFocus={clearSearchTextCarry}
                    onKeyDown={event => { if (event.key === 'Enter') search(); }} />
                {/* clear_search_button — onClearSearch only refocuses and clears;
                    the icon is the grey icons_close X, common_small_pen when empty */}
                <NitroIcon
                    className="shrink-0 cursor-pointer"
                    icon={searchText.length > 0 ? 'icon-nav-clear-search' : 'icon-nav-small-pen'}
                    onClick={event => {
                        setSearchText('');
                        (event.currentTarget.previousElementSibling as HTMLInputElement | null)?.focus();
                    }} />
            </Border>
            {/* refreshButtonContainer at x=375 (border ends at 368 — 7px gap):
                25x23 button style 5 tinted 0x7cc561 with the white refresh glyph on
                top; the variant's min-h-7 and pl/pr-2.5 must not survive, so the
                geometry is forced inline (cn does not resolve class conflicts) */}
            {searchText.length > 0 && (
                <Button
                    className="shrink-0 ml-0.75 flex items-center justify-center"
                    style={{ width: 25, height: 23, minWidth: 0, minHeight: 0, padding: 0 }}
                    tintColor="#7CC561"
                    variant="5"
                    onClick={performLastSearch}>
                    <NitroIcon icon="icon-nav-refresh-search" />
                </Button>
            )}
        </div>
    );
}
