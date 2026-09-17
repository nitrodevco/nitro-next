import { BotCommandConfigurationMessage, BotForceOpenContextMenuMessage, BotSkillListUpdateMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { roomStore } from '#base/context/room';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * Rentable bots: the skills that carry a command (`RoomUsersHandler.onBotSkillListUpdate`), the
 * current setting a skill window asked for, and the server asking for a bot's menu to be opened.
 */
export const registerRoomBotHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setBotSkills, setBotSkillConfigurationData, setForcedBotMenuId } = roomStore.getState();

    return subscribeAll(subscribe, [
        on(BotSkillListUpdateMessage, data => setBotSkills(data.botId, data.skillList)),

        on(BotCommandConfigurationMessage, data => setBotSkillConfigurationData(data.botId, data.commandId, data.data)),

        on(BotForceOpenContextMenuMessage, data => setForcedBotMenuId(data.botId)),
    ]);
};
