import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type IFlatControllerData = {
    userId: number;
    userName: string;
};

/* FlatControllersParser (§_-94§/§_-h1Y§) — roomId + FlatControllerData list */
export type FlatControllersEventMessageType = {
    roomId: number;
    controllers: IFlatControllerData[];
};

export class FlatControllersEventMessage implements IIncomingPacket<FlatControllersEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): FlatControllersEventMessageType {
        const roomId = wrapper.readInt();
        const controllers: IFlatControllerData[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            controllers.push({ userId: wrapper.readInt(), userName: wrapper.readString() });

            count--;
        }

        return { roomId, controllers };
    }
}
