/**
 * A signed 64-bit integer as the two values a composer sends for it: the high 32 bits, then the
 * low 32, each as the signed int the encoder writes. The counterpart of `ReadLong`, and what Flash
 * `EvaWireFormat` does with a `Long`. Exact for |value| < 2^53.
 *
 *   return [ ...WriteLong(this.params.transactionId) ];
 */
export const WriteLong = (value: number): [ number, number ] => {
    const high = Math.floor(value / 4294967296);
    const low = value - (high * 4294967296);

    return [ high | 0, low | 0 ];
};
