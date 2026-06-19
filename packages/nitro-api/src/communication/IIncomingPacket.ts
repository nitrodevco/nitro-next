import type { IMessageDataWrapper } from './IMessageDataWrapper';

export interface IIncomingPacket<T extends object = object> {
    parse(wrapper: IMessageDataWrapper): T;
}
