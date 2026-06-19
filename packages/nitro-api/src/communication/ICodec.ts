import type { IBinaryWriter } from '../utils';
import type { IMessageDataWrapper } from './IMessageDataWrapper';

export interface ICodec {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    encode(header: number, messages: any[]): IBinaryWriter;
    decode(buffer: ArrayBuffer): IMessageDataWrapper[];
}
