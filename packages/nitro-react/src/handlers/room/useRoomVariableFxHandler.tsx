import { VariableFxConfigsMessage, VariableFxConfigsRemovedMessage, VariableFxStatusMessage, VariableFxStatusRemovedMessage } from '@nitrodevco/nitro-packets';

import { useRoomSelector } from '#base/context';
import { useMessageListener } from '#base/hooks';

/** Feeds the wired Variable FX configs/statuses (bars, hearts, levels, numbers shown above users and furni) into the room. */
export const useRoomVariableFxHandler = () => {
    const room = useRoomSelector();

    useMessageListener(VariableFxConfigsMessage, (data) => {
        if (!room) return;

        room.updateVariableFxConfigs(data.configs);
    });

    useMessageListener(VariableFxConfigsRemovedMessage, (data) => {
        if (!room) return;

        room.removeVariableFxConfigs(data.configIds);
    });

    useMessageListener(VariableFxStatusMessage, (data) => {
        if (!room) return;

        room.updateVariableFxStatuses(data.statuses);
    });

    useMessageListener(VariableFxStatusRemovedMessage, (data) => {
        if (!room) return;

        room.removeVariableFxStatuses(data.statuses);
    });
};
