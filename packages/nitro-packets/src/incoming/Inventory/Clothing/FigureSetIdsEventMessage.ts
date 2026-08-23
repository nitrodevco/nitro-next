import type { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FigureSetIdsEventMessageType = {
    figureSetIds: number[];
    boundFurnitureNames: string[];
};

export class FigureSetIdsEventMessage implements IIncomingPacket<FigureSetIdsEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): FigureSetIdsEventMessageType {
        const packet: FigureSetIdsEventMessageType = {
            figureSetIds: [],
            boundFurnitureNames: [],
        };

        let v1 = wrapper.readInt();
        while (v1 > 0) {
            packet.figureSetIds.push(wrapper.readInt());
            v1--;
        }
        let v2 = wrapper.readInt();
        while (v2 > 0) {
            packet.boundFurnitureNames.push(wrapper.readString());
            v2--;
        }

        return packet;
    }
}
