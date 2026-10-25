import { IOutgoingPacket } from '@nitrodevco/nitro-api';

/**
 * Not Habbo's: asks a Turbo server for a token for its plugins' web routes (`web.session`), answered
 * by `TurboWebSessionMessage`. See Turbo's `docs/plugin-web-routes.md`.
 */
export class TurboWebSessionRequestComposer implements IOutgoingPacket<[]> {
    public compose(): [] {
        return [];
    }
}
