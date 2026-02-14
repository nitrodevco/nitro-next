import type { IBinaryWriter } from '../utils';
import type { IMessageDataWrapper } from './IMessageDataWrapper';

export interface ICodec {
    encode(header: number, messages: any[]): IBinaryWriter;
    decode(buffer: ArrayBuffer): IMessageDataWrapper[];
}
