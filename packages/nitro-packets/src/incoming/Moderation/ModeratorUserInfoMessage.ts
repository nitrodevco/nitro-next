import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IModeratorUserInfoData, ModeratorUserInfoDataParser } from '../Data/ModeratorUserInfoDataParser';

export type ModeratorUserInfoMessageType = {
    data: IModeratorUserInfoData;
};

export class ModeratorUserInfoMessage implements IIncomingPacket<ModeratorUserInfoMessageType> {
    public parse(wrapper: IMessageDataWrapper): ModeratorUserInfoMessageType {
        const data = ModeratorUserInfoDataParser(wrapper);
        return { data };
    }
}
