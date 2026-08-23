import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2PlayerRematchesMessageType = object;

export class Game2PlayerRematchesMessage implements IIncomingPacket<Game2PlayerRematchesMessageType> {
    public parse(wrapper: IMessageDataWrapper): Game2PlayerRematchesMessageType {
        const packet: Game2PlayerRematchesMessageType = {
        };

        return packet;
    }
}
