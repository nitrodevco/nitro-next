import { BotCommandConfigurationMessage, BotErrorMessage, BotForceOpenContextMenuMessage, BotSkillListUpdateMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The text of `BotError` (placing a bot, or naming one), by error code:
 * `RoomUsersHandler.onBotError` turns the code into a `RSEME_*` event and
 * `RoomUI.roomSessionDialogEventHandler` into this key, shown under `error.title`. A code outside
 * the table shows nothing, as in Flash. Checked against Flash by `scripts/drift/constants.py`.
 */
const BOT_ERRORS: Record<number, string> = {
    0: 'room.error.bots.forbidden_in_hotel',
    1: 'room.error.bots.forbidden_in_flat',
    2: 'room.error.max_bots',
    3: 'room.error.bots.selected_tile_not_free',
    4: 'room.error.bots.name.not.accepted',
};

/**
 * Rentable bots: the skills that carry a command (`RoomUsersHandler.onBotSkillListUpdate`), the
 * current setting a skill window asked for, the server asking for a bot's menu to be opened, and
 * the errors placing or renaming a bot (`RoomUsersHandler.onBotError`).
 */
export const registerRoomBotHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setBotSkills, setBotSkillConfigurationData, setForcedBotMenuId } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(BotSkillListUpdateMessage, data => setBotSkills(data.botId, data.skillList)),

        on(BotCommandConfigurationMessage, data => setBotSkillConfigurationData(data.botId, data.commandId, data.data)),

        on(BotForceOpenContextMenuMessage, data => setForcedBotMenuId(data.botId)),

        on(BotErrorMessage, (data) => {
            const messageKey = BOT_ERRORS[data.errorCode];

            if (!messageKey) return;

            const { showAlert, getLocalizationValue } = systemStore.getState();

            showAlert(getLocalizationValue('error.title'), getLocalizationValue(messageKey));
        }),
    ]);
};
