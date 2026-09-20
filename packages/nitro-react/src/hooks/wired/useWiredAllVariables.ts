import { useEffect } from 'react';

import { getAllWiredVariables, removeWiredVariablesListener } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useWiredStore } from '#base/context/wired';

const IGNORE = () => {};

/**
 * The room's wired variables, sorted (`Util.sortVariables`), kept current through the variables
 * synchronizer: mounting asks `WiredVariablesSynchronizer.getAllVariables` for a refresh and the
 * list re-renders when the answer lands. `forceRefresh` `false` is content with what is cached.
 *
 * A box being edited does not need this - `getWiredRoomVariables(triggerable)` is the list the
 * dialog was opened with. This is for a view that outlives one box: the wired menu's tabs.
 */
export const useWiredAllVariables = (forceRefresh: boolean = true) => {
    const { send } = useWebSocketContext();
    const sortedVariables = useWiredStore(x => x.sortedVariables);

    useEffect(() => {
        getAllWiredVariables(send, IGNORE, forceRefresh);

        return () => removeWiredVariablesListener(IGNORE);
    }, [ send, forceRefresh ]);

    return sortedVariables;
};
