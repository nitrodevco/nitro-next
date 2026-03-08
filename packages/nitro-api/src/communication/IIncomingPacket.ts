import type { IMessageDataWrapper } from './IMessageDataWrapper';

export interface IIncomingPacket<T = any> {
    parse(wrapper: IMessageDataWrapper): T;
}
