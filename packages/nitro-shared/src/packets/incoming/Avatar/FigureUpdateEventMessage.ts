import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type FigureUpdateEventMessageType = {
    figure: string;
    gender: string;
};

export class FigureUpdateEventMessage implements IIncomingPacket<FigureUpdateEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): FigureUpdateEventMessageType {
        const packet: FigureUpdateEventMessageType = {
            figure: wrapper.readString(),
            gender: wrapper.readString()?.toUpperCase(),
        };

        return packet;
    }
}
