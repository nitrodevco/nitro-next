import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BuildersClubFurniCountMessageType = {
    furniCount: number;
};

export class BuildersClubFurniCountMessage implements IIncomingPacket<BuildersClubFurniCountMessageType> {
    public parse(wrapper: IMessageDataWrapper): BuildersClubFurniCountMessageType {
        const furniCount = wrapper.readInt();
        return { furniCount };
    }
}
