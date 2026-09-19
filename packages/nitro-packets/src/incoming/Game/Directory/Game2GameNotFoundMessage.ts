import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type Game2GameNotFoundMessageType = object;

export class Game2GameNotFoundMessage implements IIncomingPacket<Game2GameNotFoundMessageType> {
    public parse(wrapper: IMessageDataWrapper): Game2GameNotFoundMessageType {
        return {};
    }
}
