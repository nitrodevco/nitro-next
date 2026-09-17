import { IncomingPacketConstructor } from '@nitrodevco/nitro-api';

import { WebSocketConnection } from '#base/context/communication';

type Subscribe = WebSocketConnection['subscribe'];

/** One listener, not yet attached - `subscribeAll` attaches it. */
export type PacketSubscription = (subscribe: Subscribe) => () => void;

/** A listener for one incoming packet. Kept generic here so each handler's `data` is typed from its packet. */
export const on = <T extends object>(event: IncomingPacketConstructor<T>, handler: (data: T) => void): PacketSubscription =>
    subscribe => subscribe(event, handler);

/** Attaches every listener and returns one unsubscribe for all of them. */
export const subscribeAll = (subscribe: Subscribe, subscriptions: PacketSubscription[]) => {
    const unsubscribes = subscriptions.map(subscription => subscription(subscribe));

    return () => {
        for (const unsubscribe of unsubscribes) unsubscribe();
    };
};
