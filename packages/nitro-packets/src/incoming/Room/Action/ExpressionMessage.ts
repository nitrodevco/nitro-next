import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type ExpressionMessageType = {
    objectId: number;
    expressionType: number;
};

export class ExpressionMessage implements IIncomingPacket<ExpressionMessageType> {
    public parse(wrapper: IMessageDataWrapper): ExpressionMessageType {
        const packet: ExpressionMessageType = {
            objectId: wrapper.readInt(),
            expressionType: wrapper.readInt(),
        };

        return packet;
    }
}
