import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ModeratorToolPreferencesMessageType = {
    windowX: number;
    windowY: number;
    windowWidth: number;
    windowHeight: number;
};

export class ModeratorToolPreferencesMessage implements IIncomingPacket<ModeratorToolPreferencesMessageType> {
    public parse(wrapper: IMessageDataWrapper): ModeratorToolPreferencesMessageType {
        const windowX = wrapper.readInt();
        const windowY = wrapper.readInt();
        const windowWidth = wrapper.readInt();
        const windowHeight = wrapper.readInt();
        return { windowX, windowY, windowWidth, windowHeight };
    }
}
