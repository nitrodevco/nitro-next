import type { IIncomingPacket, IMessageDataWrapper, RoomControllerLevelEnum } from '@nitrodevco/nitro-api';

export type YouAreControllerMessageType = {
    roomId: number;
    controllerLevel: RoomControllerLevelEnum;
};

export class YouAreControllerMessage implements IIncomingPacket<YouAreControllerMessageType> {
    public parse(wrapper: IMessageDataWrapper): YouAreControllerMessageType {
        const packet: YouAreControllerMessageType = {
            roomId: wrapper.readInt(),
            controllerLevel: wrapper.readInt(),
        };

        return packet;
    }
}
