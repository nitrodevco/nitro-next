/**
 * Not Flash's: the channels client modules share data over (`api.channels`) instead of encoding it in
 * a link. A channel is a key; a module publishes a value on it and every module subscribed to it is
 * handed the value and who published it. The last value of each key is kept, so a module that
 * subscribes later - one loaded after the publisher - is handed it at once. When a module stops, its
 * subscriptions go, and each value it left on a key is cleared: subscribers are handed `undefined`,
 * so nothing holds on to data its owner took away.
 *
 * Values are passed as they are (one page, one realm): publish plain data, and a new object for a
 * change rather than the old one changed. A subscriber that throws is logged and the others are
 * still called. Kept free of runtime imports beyond the logger it is given, so a test can run it
 * under Node.
 */

export type ClientModuleChannelHandler<T = unknown> = (value: T | undefined, from: string | undefined) => void;

interface Subscription {
    owner: string;
    handler: ClientModuleChannelHandler;
}

export interface ClientModuleChannels {
    /** Hands `value` to the key's subscribers and keeps it as the key's value. */
    publish: (owner: string, key: string, value: unknown) => void;
    /** `handler` for each value published on `key` from now on - and at once for the key's value, when it has one. */
    subscribe: (owner: string, key: string, handler: ClientModuleChannelHandler) => () => void;
    /** The key's value, `undefined` when none is kept. */
    get: (key: string) => unknown;
    /** A module stopped: its subscriptions go and the values it left are cleared. */
    removeOwner: (owner: string) => void;
    /** Each key with its publisher and subscribers, for the extension inspector. */
    describe: () => { key: string; from: string | undefined; subscribers: string[] }[];
}

export const createClientModuleChannels = (onError: (owner: string, key: string, error: unknown) => void): ClientModuleChannels => {
    const values = new Map<string, { value: unknown; from: string }>();
    const subscriptions = new Map<string, Set<Subscription>>();

    const deliver = (key: string, value: unknown, from: string | undefined) => {
        for (const subscription of [ ...(subscriptions.get(key) ?? []) ]) {
            try {
                subscription.handler(value, from);
            } catch (error) {
                onError(subscription.owner, key, error);
            }
        }
    };

    return {
        publish: (owner, key, value) => {
            values.set(key, { value, from: owner });
            deliver(key, value, owner);
        },
        subscribe: (owner, key, handler) => {
            const subscription: Subscription = { owner, handler };
            let set = subscriptions.get(key);

            if (!set) subscriptions.set(key, (set = new Set()));
            set.add(subscription);

            const kept = values.get(key);

            if (kept) {
                try {
                    handler(kept.value, kept.from);
                } catch (error) {
                    onError(owner, key, error);
                }
            }

            return () => {
                set.delete(subscription);

                if (!set.size && subscriptions.get(key) === set) subscriptions.delete(key);
            };
        },
        get: key => values.get(key)?.value,
        removeOwner: (owner) => {
            for (const [ key, set ] of [ ...subscriptions ]) {
                for (const subscription of [ ...set ]) {
                    if (subscription.owner === owner) set.delete(subscription);
                }

                if (!set.size) subscriptions.delete(key);
            }

            for (const [ key, kept ] of [ ...values ]) {
                if (kept.from !== owner) continue;

                values.delete(key);
                deliver(key, undefined, undefined);
            }
        },
        describe: () => {
            const keys = new Set([ ...values.keys(), ...subscriptions.keys() ]);

            return [ ...keys ].sort().map(key => ({ key, from: values.get(key)?.from, subscribers: [ ...new Set([ ...(subscriptions.get(key) ?? []) ].map(subscription => subscription.owner)) ] }));
        },
    };
};
