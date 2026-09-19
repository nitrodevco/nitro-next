import { NewNavigatorSearchComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { navigatorStore, useNavigatorStore } from '#base/context/navigator';
import { useSystemActions, useWindowParams } from '#base/context/system';

/**
 * `HabboNewNavigator.performSearch(searchCode)`: a `navigator/tab/<name>` link opens the
 * navigator on one of its top level tabs, so the search code travels as the window's parameter
 * and is acted on here once the navigator metadata has arrived - the same shape as
 * `useCatalogPageRequest`. The parameter is cleared once it has been used, so reopening the
 * window later lands wherever the user last was.
 */
export const useNavigatorSearchCodeRequest = () => {
    const { searchCode } = useWindowParams('navigator');
    const topLevelContexts = useNavigatorStore(x => x.topLevelContexts);
    const { updateWindowParams } = useSystemActions();
    const { send } = useWebSocketContext();

    useEffect(() => {
        if (!searchCode) return;

        const context = topLevelContexts.find(x => x.searchCode === searchCode);

        if (!context) return;

        const { setTopLevelContext, setFilterType, setSearchFilter, setIsSearching } = navigatorStore.getState();

        setTopLevelContext(context);
        setFilterType('anything');
        setSearchFilter('');
        setIsSearching(true);

        send(new NewNavigatorSearchComposer({ searchCodeOriginal: searchCode, filteringData: '' }));

        updateWindowParams('navigator', { searchCode: undefined });
    }, [ searchCode, topLevelContexts, send, updateWindowParams ]);
};
