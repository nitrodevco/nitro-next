/**
 * The furnidata again when the server says it changed: `CatalogPublishedMessage` carries the new
 * file's hash after a publish that moved any item's offers, as `HabboCatalog.onCatalogPublished`
 * hands it to the session's furniture data. Registered once, not by each catalogue window's
 * store, so the file is fetched once; `loadFurnitureData` does the loading.
 */
import { CatalogPublishedMessage } from '@nitrodevco/nitro-packets';

import { loadFurnitureData } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerFurnitureDataHandlers = ({ subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(CatalogPublishedMessage, (data) => {
        if (data.newFurniDataHash) void loadFurnitureData(data.newFurniDataHash);
    }),
]);
