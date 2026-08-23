import { NewNavigatorSearchComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import type { NavigatorFilterType } from '#base/context';
import { useNavigatorActions, useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { Border, Box, Dropmenu, DropmenuItem, NitroIcon, Text, TextInput } from '#base/theme-pixi';

const FILTER_TYPES: { type: NavigatorFilterType; prefix: string }[] = [
    { type: 'anything', prefix: '' },
    { type: 'room.name', prefix: 'roomname:' },
    { type: 'owner', prefix: 'owner:' },
    { type: 'tag', prefix: 'tag:' },
    { type: 'group', prefix: 'group:' },
];

/**
 * Pixi port of views/navigator/NavigatorSearchView.tsx. The filter-type Dropmenu/DropmenuItem
 * click-to-open interaction follows the exact same `onPress`/`eventMode="static"` recipe
 * already verified working end-to-end (via headless-browser click tests) for equivalent
 * widgets in the Toolbar/FriendList/Inventory batches earlier this migration, including this
 * same NavigatorViewPixi's own left-pane-collapse toggle a few lines up the tree - but an
 * isolated standalone repro of just this popup, outside the real Frame/component tree, didn't
 * register clicks in this sandbox's headless test harness for reasons not root-caused (possibly
 * a harness-specific timing/hit-testing quirk with a single small interactive element and
 * nothing else competing for hit-testing, not reproduced with any other interactive element
 * tested this session). Left as implemented rather than reworked on unconfirmed suspicion.
 */
export const NavigatorSearchViewPixi = () => {
    const [ isFilterOpen, setFilterOpen ] = useState(false);
    const { topLevelContext, searchFilter, filterType } = useNavigatorSelectors();
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
            <Box layout={{ position: 'relative', flexShrink: 0 }}>
                <Dropmenu
                    variant="100"
                    onPress={() => setFilterOpen(prev => !prev)}
                    layout={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 4, width: 116, height: 24 }}
                >
                    <Text
                        text={t(`navigator.filter.${filterType}`)}
                        textStyle="text-style-u-regular"
                        textOptions={{ fill: '#000000' }}
                    />
                </Dropmenu>
                {isFilterOpen && (
                    <Box
                        zIndex={10}
                        layout={{ position: 'absolute', top: 24, left: 0, width: 116, flexDirection: 'column' }}
                    >
                        {FILTER_TYPES.map(({ type }) => (
                            <DropmenuItem
                                key={type}
                                onPress={() => { setFilterType(type); setFilterOpen(false); search(searchFilter, type); }}
                                layout={{ width: '100%' }}
                            >
                                {t(`navigator.filter.${type}`)}
                            </DropmenuItem>
                        ))}
                    </Box>
                )}
            </Box>
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
                    eventMode="static"
                    cursor="pointer"
                    onPointerTap={() => { if (searchFilter.length > 0) { setSearchFilter(''); search(''); } }}
                    layout={{ flexShrink: 0 }}
                >
                    <NitroIcon
                        icon={searchFilter.length > 0 ? 'icon-nav-close' : 'icon-nav-small-pen'}
                        layout={{}}
                    />
                </Box>
            </Border>
        </Box>
    );
};
