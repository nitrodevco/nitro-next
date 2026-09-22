/**
 * The recycler packets `HabboCatalog` hands to its `RecyclerLogic` - `onRecyclerStatus`
 * (`setSystemStatus`), `onRecyclerFinished` (`setFinished`) and `onRecyclerPrizes`
 * (`storePrizeTable`). The logic's store is an app-wide singleton (`recyclerStore`), so these are
 * registered once per connection (`registerHandlers`), not by the catalogue window.
 */
import { RecyclerFinishedMessage, RecyclerPrizesMessage, RecyclerStatusMessage } from '@nitrodevco/nitro-packets';

import { setRecyclerFinished, setRecyclerSystemStatus, storeRecyclerPrizeTable } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerCatalogRecyclerHandlers = ({ subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(RecyclerStatusMessage, data => setRecyclerSystemStatus(data.recyclerStatus, data.recyclerTimeoutSeconds)),

    on(RecyclerFinishedMessage, data => setRecyclerFinished(data.recyclerFinishedStatus)),

    on(RecyclerPrizesMessage, data => storeRecyclerPrizeTable(data.prizeLevels)),
]);
