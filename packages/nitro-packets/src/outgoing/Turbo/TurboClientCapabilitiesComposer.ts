import { IOutgoingPacket } from '@nitrodevco/nitro-api';

import { ITurboCapability } from '../../incoming/Turbo/ITurboCapability';

export type TurboClientCapabilitiesComposerType = {
    capabilities: ITurboCapability[];
};

/**
 * Not Habbo's: asks a Turbo server for the protocol extensions this client understands. Any other
 * server ignores the unknown header and never answers, which is how the client knows to stay a
 * plain Habbo client. See Turbo's `docs/client-capabilities.md`.
 */
export class TurboClientCapabilitiesComposer implements IOutgoingPacket<TurboClientCapabilitiesComposerType> {
    public constructor(private params: TurboClientCapabilitiesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.capabilities.length,
            ...this.params.capabilities.flatMap(x => [ x.name, x.version ]),
        ];
    }
}
