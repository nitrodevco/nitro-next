/**
 * Not Flash's: reads and writes a Turbo plugin message from the schema the server sends for it
 * (`client.messages`, Turbo's `docs/plugin-messages.md`). The schema is compact JSON: an array of
 * `[name, type]` fields, where a type is `'int'`, `'long'`, `'bool'`, `'string'`, `'double'`,
 * `['array', type]` or `['object', fields]`. Fields are written in order in Habbo's wire encoding;
 * an array is an int count and its items, a record its fields.
 *
 * The two halves may be a version apart: a field the schema does not know is ignored and a missing
 * one is sent as its default (0, '', false, []); `skew` hears of each so the caller can log it.
 */
import type { IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type PluginMessageScalar = 'int' | 'long' | 'bool' | 'string' | 'double';

export type PluginMessageType = PluginMessageScalar | { array: PluginMessageType } | { object: PluginMessageField[] };

export type PluginMessageField = { name: string; type: PluginMessageType };

/** What a composer writes: `number` as an int, `boolean` as a byte, `string` with its length. */
export type PluginMessageWireValue = number | string | boolean;

/** Told of a field one side has and the other has not: `unknown` sent by the module, `missing` from it. */
export type PluginMessageSkew = (kind: 'unknown' | 'missing', path: string) => void;

const SCALARS = new Set<string>([ 'int', 'long', 'bool', 'string', 'double' ]);

const parseType = (raw: unknown, path: string): PluginMessageType => {
    if ((typeof raw === 'string') && SCALARS.has(raw)) return raw as PluginMessageScalar;

    if (Array.isArray(raw) && (raw.length === 2)) {
        if (raw[0] === 'array') return { array: parseType(raw[1], `${path}[]`) };
        if (raw[0] === 'object') return { object: parseFields(raw[1], path) };
    }

    throw new Error(`${path}: unknown type ${JSON.stringify(raw)}`);
};

const parseFields = (raw: unknown, path: string): PluginMessageField[] => {
    if (!Array.isArray(raw)) throw new Error(`${path}: fields are not an array`);

    return raw.map((field: unknown) => {
        if (!Array.isArray(field) || (field.length !== 2) || (typeof field[0] !== 'string')) throw new Error(`${path}: a field is not [name, type]`);

        return { name: field[0], type: parseType(field[1], `${path}.${field[0]}`) };
    });
};

/** A message's fields from the schema JSON the server sent; throws on one it cannot read. */
export const parsePluginMessageSchema = (json: string, name = 'message'): PluginMessageField[] => parseFields(JSON.parse(json), name);

const defaultOf = (type: PluginMessageType): unknown => {
    switch (type) {
        case 'int':
        case 'long':
        case 'double':
            return 0;
        case 'bool':
            return false;
        case 'string':
            return '';
        default:
            return ('array' in type) ? [] : defaultsOf(type.object);
    }
};

const defaultsOf = (fields: PluginMessageField[]) => Object.fromEntries(fields.map(field => [ field.name, defaultOf(field.type) ]));

const readDouble = (wrapper: IMessageDataWrapper) => {
    const view = new DataView(new ArrayBuffer(8));

    view.setInt32(0, wrapper.readInt());
    view.setInt32(4, wrapper.readInt());

    return view.getFloat64(0);
};

const readValue = (wrapper: IMessageDataWrapper, type: PluginMessageType): unknown => {
    switch (type) {
        case 'int':
            return wrapper.readInt();
        case 'long': {
            const high = wrapper.readInt();
            const low = wrapper.readInt() >>> 0;

            return (high * 4294967296) + low;
        }
        case 'bool':
            return wrapper.readBoolean();
        case 'string':
            return wrapper.readString();
        case 'double':
            return readDouble(wrapper);
        default: {
            if ('object' in type) return readFields(wrapper, type.object);

            const items: unknown[] = [];

            for (let count = wrapper.readInt(); count > 0; count--) items.push(readValue(wrapper, type.array));

            return items;
        }
    }
};

const readFields = (wrapper: IMessageDataWrapper, fields: PluginMessageField[]) => {
    const result: Record<string, unknown> = {};

    for (const field of fields) result[field.name] = readValue(wrapper, field.type);

    return result;
};

/** A message as an object of its fields, read from the packet in schema order. */
export const decodePluginMessage = (wrapper: IMessageDataWrapper, fields: PluginMessageField[]) => readFields(wrapper, fields);

const writeDouble = (value: number, out: PluginMessageWireValue[]) => {
    const view = new DataView(new ArrayBuffer(8));

    view.setFloat64(0, value);
    out.push(view.getInt32(0), view.getInt32(4));
};

const toNumber = (value: unknown) => {
    const number = (typeof value === 'number') ? value : (typeof value === 'bigint') ? Number(value) : (typeof value === 'string') ? Number(value) : (value === true) ? 1 : 0;

    return Number.isFinite(number) ? number : 0;
};

const writeValue = (value: unknown, type: PluginMessageType, path: string, out: PluginMessageWireValue[], skew: PluginMessageSkew) => {
    switch (type) {
        case 'int':
            out.push(Math.trunc(toNumber(value)) | 0);
            return;
        case 'long': {
            const number = Math.trunc(toNumber(value));
            const high = Math.floor(number / 4294967296);

            out.push(high | 0, (number - (high * 4294967296)) | 0);
            return;
        }
        case 'bool':
            out.push(value === true);
            return;
        case 'string':
            out.push((typeof value === 'string') ? value : ((typeof value === 'number') || (typeof value === 'boolean')) ? String(value) : '');
            return;
        case 'double':
            writeDouble(toNumber(value), out);
            return;
        default: {
            if ('object' in type) {
                writeFields((value && (typeof value === 'object')) ? value as Record<string, unknown> : {}, type.object, path, out, skew);
                return;
            }

            const items = Array.isArray(value) ? value : [];

            out.push(items.length);
            items.forEach(item => writeValue(item, type.array, `${path}[]`, out, skew));
        }
    }
};

const writeFields = (value: Record<string, unknown>, fields: PluginMessageField[], path: string, out: PluginMessageWireValue[], skew: PluginMessageSkew) => {
    const known = new Set(fields.map(field => field.name));

    for (const key of Object.keys(value)) if (!known.has(key)) skew('unknown', `${path}.${key}`);

    for (const field of fields) {
        if (value[field.name] === undefined) skew('missing', `${path}.${field.name}`);

        writeValue(value[field.name], field.type, `${path}.${field.name}`, out, skew);
    }
};

/** The values a composer writes for `value`, in schema order. */
export const encodePluginMessage = (value: Record<string, unknown>, fields: PluginMessageField[], name = 'message', skew: PluginMessageSkew = () => undefined) => {
    const out: PluginMessageWireValue[] = [];

    writeFields(value ?? {}, fields, name, out, skew);

    return out;
};

/** A message of the schema with every field at its default: what a module reads for a field it was not sent. */
export const defaultPluginMessage = (fields: PluginMessageField[]) => defaultsOf(fields);
