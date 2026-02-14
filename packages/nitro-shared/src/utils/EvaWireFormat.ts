import type { IBinaryWriter, ICodec, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { BinaryReader } from './BinaryReader';
import { BinaryWriter } from './BinaryWriter';
import { Byte } from './Byte';
import { EvaWireDataWrapper } from './EvaWireDataWrapper';
import { Short } from './Short';

export class EvaWireFormat implements ICodec
{
    public encode(header: number, messages: any[]): IBinaryWriter
    {
        const writer = new BinaryWriter();

        writer.writeShort(header);

        for (const value of messages)
        {
            let type: string = typeof value;

            if (type === 'object')
            {
                if (value === null) type = 'null';
                else if (value instanceof Byte) type = 'byte';
                else if (value instanceof Short) type = 'short';
                else if (value instanceof ArrayBuffer) type = 'arraybuffer';
            }

            switch (type)
            {
                case 'undefined':
                case 'null':
                    writer.writeShort(0);
                    break;
                case 'byte':
                    writer.writeByte(value.value);
                    break;
                case 'short':
                    writer.writeShort(value.value);
                    break;
                case 'number':
                    writer.writeInt(value);
                    break;
                case 'boolean':
                    writer.writeByte(value ? 1 : 0);
                    break;
                case 'string':
                    if (!value) writer.writeShort(0);
                    else
                    {
                        writer.writeString(value, true);
                    }
                    break;
                case 'arraybuffer':
                    writer.writeBytes(value);
                    break;
            }
        }

        const buffer = writer.getBuffer();

        return new BinaryWriter().writeInt(buffer.byteLength).writeBytes(buffer);
    }

    public decode(buffer: ArrayBuffer): IMessageDataWrapper[]
    {
        const wrappers: IMessageDataWrapper[] = [];

        if(buffer && buffer.byteLength)
        {
            while (buffer.byteLength)
            {
                if (buffer.byteLength < 4) break;

                const container = new BinaryReader(buffer);
                const length = container.readInt();

                if (length > (buffer.byteLength - 4)) break;

                const extracted = container.readBytes(length);

                wrappers.push(new EvaWireDataWrapper(extracted.readShort(), extracted));

                buffer = buffer.slice(length + 4);
            }
        }

        return wrappers;
    }
}
