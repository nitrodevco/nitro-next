/**
 * Flash's `ExternalInterface.call(path, ...args)`: the function the page around the client has at a
 * dotted path (`SponsorPay.showVideo`), called on its owner. A path that names no function throws,
 * as the call does on a page without the script.
 */
export const callPageFunction = (path: string, ...args: unknown[]): unknown => {
    let owner: unknown = globalThis;
    let value: unknown = globalThis;

    for (const part of path.split('.')) {
        owner = value;
        value = ((value !== null) && (value !== undefined)) ? Reflect.get(Object(value), part) : undefined;
    }

    if (typeof value !== 'function') throw new Error(`${path} is not a function`);

    return Reflect.apply(value, owner, args);
};

/**
 * `callPageFunction` as most of Flash's calls are made: a page without the function, or one that
 * throws, answers undefined - Flash does not marshal the page's exceptions back.
 */
export const tryCallPageFunction = (path: string, ...args: unknown[]): unknown => {
    try {
        return callPageFunction(path, ...args);
    } catch {
        return undefined;
    }
};
