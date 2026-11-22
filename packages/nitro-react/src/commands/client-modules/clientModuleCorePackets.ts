/**
 * Not Flash's: a core packet a plugin carries inside one of its own - a relay of another room's
 * objects, say - read with the client's own parser for its header (`api.packets.parseCore`). Only
 * parsed: no handler of the client's hears it. The body is read from where the module's reader
 * stands, or from bytes it already took out (`readBytes`, an `ArrayBuffer`). A plugin message's
 * carried packet field (`'packet'` in its schema) is read the same way (`readCarriedCorePacket`).
 */
import { BinaryReader, EvaWireDataWrapper, IBinaryReader, IMessageDataWrapper, IncomingPacketConstructor } from '@nitrodevco/nitro-api';
import { GetIncomingPackets } from '@nitrodevco/nitro-packets';

/** Where a core packet's body is read from. */
export type ClientModuleCorePacketBody = IMessageDataWrapper | IBinaryReader | ArrayBuffer;

let parsers: Record<number, IncomingPacketConstructor> | undefined;

/** Which parser read each value `parseClientModuleCorePacket` gave: a secondary room's `apply` routes it by that. */
const parsedBy = new WeakMap<object, IncomingPacketConstructor>();

/** The parser that read `value`, when `parseClientModuleCorePacket` gave it; `undefined` for anything else. */
export const corePacketParserOf = (value: unknown): IncomingPacketConstructor | undefined => (((typeof value === 'object') && (value !== null)) ? parsedBy.get(value) : undefined);

/** A plugin message's carried packet field as a module is handed it. */
export type ClientModuleCarriedPacket = { header: number; packet: unknown };

/** The carried fields `readCarriedCorePacket` gave: a secondary room's `apply` takes one for its packet. */
const carriedFields = new WeakSet<object>();

/** The message's reader, under the carried packet's own header for its parser. */
class CarriedPacketWrapper implements IMessageDataWrapper {
    public constructor(private readonly wrapper: IMessageDataWrapper, public readonly header: number) { }

    public readByte = () => this.wrapper.readByte();
    public readBytes = (length: number) => this.wrapper.readBytes(length);
    public readBoolean = () => this.wrapper.readBoolean();
    public readShort = () => this.wrapper.readShort();
    public readInt = () => this.wrapper.readInt();
    public readFloat = () => this.wrapper.readFloat();
    public readDouble = () => this.wrapper.readDouble();
    public readString = () => this.wrapper.readString();

    public get bytesAvailable() {
        return this.wrapper.bytesAvailable;
    }
}

/** The core packet `value` stands for: the packet of a carried field `readCarriedCorePacket` gave, else itself. */
export const corePacketOf = (value: unknown): unknown => ((((typeof value === 'object') && (value !== null)) && carriedFields.has(value)) ? (value as ClientModuleCarriedPacket).packet : value);

const isBinaryReader = (body: IMessageDataWrapper | IBinaryReader): body is IBinaryReader => (typeof (body as IBinaryReader).remaining === 'function');

const wrapperOf = (header: number, body: ClientModuleCorePacketBody): IMessageDataWrapper => {
    if (body instanceof ArrayBuffer) return new EvaWireDataWrapper(header, new BinaryReader(body));

    return isBinaryReader(body) ? new EvaWireDataWrapper(header, body) : body;
};

/**
 * The core packet at `header`, read from `body` by the client's parser for it: `undefined`, and
 * `warn` told why, when the client has no parser at that header or the body does not read as it.
 */
export const parseClientModuleCorePacket = (header: number, body: ClientModuleCorePacketBody, warn: (message: string) => void): unknown => {
    parsers ??= GetIncomingPackets();

    const Parser = Number.isInteger(header) ? parsers[header] : undefined;

    if (!Parser) {
        warn(`header ${header} is not a packet of the client's.`);

        return undefined;
    }

    try {
        const parsed = new Parser().parse(wrapperOf(header, body));

        if ((typeof parsed === 'object') && (parsed !== null)) parsedBy.set(parsed, Parser);

        return parsed;
    } catch (error) {
        warn(`header ${header} (${Parser.name}) did not read: ${error instanceof Error ? error.message : String(error)}`);

        return undefined;
    }
};

/**
 * A plugin message's carried packet field, the rest of the message: the core packet's short header,
 * then its body, read by the client's parser for that header. `packet` is `undefined`, and `warn`
 * told why, when nothing is left to read, the client has no packet at the header or the body does
 * not read as it.
 */
export const readCarriedCorePacket = (wrapper: IMessageDataWrapper, warn: (message: string) => void): ClientModuleCarriedPacket => {
    let carried: ClientModuleCarriedPacket;

    if (!wrapper.bytesAvailable) {
        warn('no packet was carried.');

        carried = { header: 0, packet: undefined };
    } else {
        const header = wrapper.readShort();

        carried = { header, packet: parseClientModuleCorePacket(header, new CarriedPacketWrapper(wrapper, header), warn) };
    }

    carriedFields.add(carried);

    return carried;
};
