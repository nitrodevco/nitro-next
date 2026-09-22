import { NewNavigatorSearchComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { NavigatorFilterType, useNavigatorActions, useNavigatorStore } from '#base/context/navigator';
import { useTranslation } from '#base/context/system';
import { Border, Button, Dropmenu, LayoutImage, Region, TextInput, ThemeImage } from '#base/theme';

const FILTER_TYPES: { type: NavigatorFilterType; prefix: string }[] = [
    { type: 'anything', prefix: '' },
    { type: 'room.name', prefix: 'roomname:' },
    { type: 'owner', prefix: 'owner:' },
    { type: 'tag', prefix: 'tag:' },
    { type: 'group', prefix: 'group:' },
];

/** `SearchView.INPUT_PLACEHOLDER_TEXTCOLOR` (10461087). */
const INPUT_PLACEHOLDER_COLOR = '#9f9f9f';

/**
 * `navigator_frame_2`'s `search_tools`, driven by `SearchView.as`: the filter type drop menu (a
 * theme `Dropmenu`, which opens, fits and closes the way Flash's does), the search field in its
 * style 4 border with `clear_search_button`, and `refreshButtonContainer`, shown while the results
 * carry a filter (`setTextAndSearchModeFromFilter`) and repeating the last search
 * (`NavigatorView.refreshSearchResults` -> `performLastSearch`).
 *
 * The drop menu is style 4, which the skin table does not have: `SkinContainer` falls back to
 * style 0 for it. The field shows `navigator.filter.input.placeholder` while empty in
 * `INPUT_PLACEHOLDER_COLOR`; Flash also sets the placeholder italic, which `TextInput` cannot.
 */
export const NavigatorSearchView = () => {
    const topLevelContext = useNavigatorStore(x => x.topLevelContext);
    const searchResult = useNavigatorStore(x => x.searchResult);
    const searchFilter = useNavigatorStore(x => x.searchFilter);
    const filterType = useNavigatorStore(x => x.filterType);
    const { setSearchFilter, setFilterType, setIsSearching } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    const search = (filter: string, type: NavigatorFilterType = filterType) => {
        if (!topLevelContext) return;

        setIsSearching(true);

        const prefix = FILTER_TYPES.find(x => x.type === type)?.prefix ?? '';

        send(new NewNavigatorSearchComposer({ searchCodeOriginal: topLevelContext.searchCode, filteringData: prefix + filter }));
    };

    const refresh = () => {
        if (!searchResult) return;

        setIsSearching(true);

        send(new NewNavigatorSearchComposer({ searchCodeOriginal: searchResult.searchCodeOriginal, filteringData: searchResult.filteringData }));
    };

    // `setTextAndSearchModeFromFilter`: the results' filter without its mode prefix.
    const resultFilter = searchResult?.filteringData ?? '';
    const resultPrefix = FILTER_TYPES.find(x => x.prefix !== '' && resultFilter.startsWith(x.prefix))?.prefix ?? '';
    const showRefresh = resultFilter.length > resultPrefix.length;

    return (
        <Region
            name="search_tools"
            layout={{ position: 'absolute', left: 0, width: 408, top: 3, height: 36 }}
        >
            <Dropmenu
                variant="0"
                tooltip={t('navigator.tooltip.filter.type')}
                caption={t(`navigator.filter.${filterType}`)}
                options={FILTER_TYPES.map(({ type }) => ({
                    key: type,
                    label: t(`navigator.filter.${type}`),
                    selected: type === filterType,
                    onSelect: () => {
                        setFilterType(type);
                        search(searchFilter, type);
                    },
                }))}
                layout={{ position: 'absolute', left: 4, width: 116, top: 10, height: 24 }}
            />
            <Border
                variant="4"
                layout={{ position: 'absolute', left: 133, width: 235, top: 10, height: 24 }}
            >
                <Region
                    name="search_input"
                    tooltip={t('navigator.tooltip.filter.input')}
                    tooltipDelay={2000}
                    layout={{ position: 'absolute', left: 6, width: 235, top: 4, height: 16 }}
                >
                    <TextInput
                        value={searchFilter}
                        onChange={setSearchFilter}
                        onEnter={() => search(searchFilter)}
                        placeholder={t('navigator.filter.input.placeholder', 'filter rooms by...')}
                        placeholderColor={INPUT_PLACEHOLDER_COLOR}
                        textStyle="u_regular"
                        flashPlacement
                        backgroundColor={null}
                        focusedBackgroundColor={null}
                        layout={{ position: 'absolute', left: 0, width: 235, top: 0, height: 16 }}
                    />
                </Region>
                <Region
                    name="clear_search_button"
                    cursor="pointer"
                    onPointerTap={() => {
                        if (searchFilter.length > 0) {
                            setSearchFilter('');
                            search('');
                        }
                    }}
                    layout={{ position: 'absolute', left: 215, width: 20, top: 4, height: 20 }}
                >
                    <ThemeImage
                        name="search.clear.icon"
                        src={LayoutImage(searchFilter.length > 0 ? 'shared/icons_close.png' : 'shared/common_small_pen.png')}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
            </Border>
            {showRefresh && (
                <Region
                    name="refreshButtonContainer"
                    layout={{ position: 'absolute', left: 375, width: 25, top: 10, height: 25 }}
                >
                    <Button
                        variant="5"
                        name="refreshButton"
                        tintColor="#7cc561"
                        textStyle="button_shiny_regular"
                        onPointerTap={refresh}
                        layout={{ position: 'absolute', left: 0, width: 25, top: 0, height: 23 }}
                    />
                    <ThemeImage
                        src={LayoutImage('navigator/newnavigator_refresh_search_icon.png')}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: 5, width: 17, top: 5, height: 12 }}
                    />
                </Region>
            )}
        </Region>
    );
};
