/**
 * The account's own word filter - `toolbar/extensions/settings/WordFilterSettingsView`'s two
 * message events. The list is asked for by the window when it opens (`requestCustomFilter`), not
 * from another packet, so only the answers are listened for here; the store is a singleton, so
 * a list that arrives before the window is drawn is still the list it shows.
 */
import { GetCustomFilterResultMessage, ModifyCustomFilterResultMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerWordFilterHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setFilteredWords, applyCustomFilterResult } = userStore.getState();

    return subscribeAll(subscribe, [
        on(GetCustomFilterResultMessage, data => setFilteredWords(data.words)),

        on(ModifyCustomFilterResultMessage, data => applyCustomFilterResult(data.result, data.word)),
    ]);
};
