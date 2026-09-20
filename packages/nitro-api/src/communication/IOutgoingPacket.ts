import { Byte, Short } from '../utils';

/**
 * A composer. `compose` returns the values in wire order; the encoder writes a number as an int,
 * a boolean as a byte and a string length-prefixed. The two narrower ints the protocol has are
 * sent by wrapping the value: `new Short(contractType)`, `new Byte(nodeType)` - what Flash does
 * with its own `Short` and `Byte`. A 64-bit value is two ints, see `WriteLong`.
 */
export interface IOutgoingPacket<T extends object> {
    compose(): (number | string | boolean | Byte | Short)[];
}
