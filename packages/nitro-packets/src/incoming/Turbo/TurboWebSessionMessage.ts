import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type TurboWebSessionMessageType = {
    /** The address before `/api/plugins/`, such as `https://example.com`; `''` when the hotel serves no plugin routes. */
    baseUrl: string;
    /** Sent as `Authorization: Bearer`; `''` when the hotel serves no plugin routes. */
    token: string;
    /** How long the token lasts, in seconds. */
    expiresInSeconds: number;
};

/**
 * Not Habbo's: Turbo's `web.session` extension - the answer to `TurboWebSessionRequestComposer`, a
 * token the client attaches to the hotel's plugin web routes so a client module calls them as the
 * player. See Turbo's `docs/plugin-web-routes.md`.
 */
export class TurboWebSessionMessage implements IIncomingPacket<TurboWebSessionMessageType> {
    public parse(wrapper: IMessageDataWrapper): TurboWebSessionMessageType {
        return { baseUrl: wrapper.readString(), token: wrapper.readString(), expiresInSeconds: wrapper.readInt() };
    }
}
