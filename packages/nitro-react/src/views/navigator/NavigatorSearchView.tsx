import { NewNavigatorSearchComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { NavigatorFilterType, useNavigatorActions, useNavigatorStore } from '#base/context/navigator';
import { useTranslation } from '#base/context/system';
import { Border, Box, Dropmenu, LayoutImage, TextInput, ThemeImage } from '#base/theme';

const FILTER_TYPES: { type: NavigatorFilterType; prefix: string }[] = [
    { type: 'anything', prefix: '' },
    { type: 'room.name', prefix: 'roomname:' },
    { type: 'owner', prefix: 'owner:' },
    { type: 'tag', prefix: 'tag:' },
    { type: 'group', prefix: 'group:' },
];

/**
 * The navigator's search row: the filter type drop menu (a theme `Dropmenu`, which opens, fits and
 * closes the way Flash's does), the search field and its button.
 */
export const NavigatorSearchView = () => {
    const topLevelContext = useNavigatorStore(x => x.topLevelContext);
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

    return (
        <Box layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, height: 36, paddingLeft: 4, paddingRight: 4 }}>
            <Dropmenu
                variant="100"
                textStyle="text-style-u-regular"
                textColor="#000000"
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
                layout={{ width: 116, height: 24 }}
            />
            <Border
                variant="4"
                layout={{ flexDirection: 'row', alignItems: 'center', gap: 6, paddingLeft: 6, paddingRight: 6, width: 235, height: 24 }}
            >
                <TextInput
                    value={searchFilter}
                    onChange={setSearchFilter}
                    onEnter={() => search(searchFilter)}
                    fontSize={10}
                    layout={{ flex: 1, height: 22 }}
                />
                <Box
                    cursor="pointer"
                    onPointerTap={() => {
                        if (searchFilter.length > 0) {
                            setSearchFilter('');
                            search('');
                        }
                    }}
                    layout={{ flexShrink: 0 }}
                >
                    <ThemeImage src={LayoutImage(searchFilter.length > 0 ? 'shared/icons_close.png' : 'shared/common_small_pen.png')} />
                </Box>
            </Border>
        </Box>
    );
};
