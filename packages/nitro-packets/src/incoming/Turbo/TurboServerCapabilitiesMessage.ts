import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ITurboCapability } from './ITurboCapability';

export type TurboServerCapabilitiesMessageType = {
    /** Each extension the server accepted, at the version both sides will use. */
    capabilities: ITurboCapability[];
};

/**
 * Not Habbo's: Turbo's answer to `TurboClientCapabilitiesComposer`. A server that does not speak
 * the extensions never sends it. See Turbo's `docs/client-capabilities.md`.
 */
export class TurboServerCapabilitiesMessage implements IIncomingPacket<TurboServerCapabilitiesMessageType> {
    public parse(wrapper: IMessageDataWrapper): TurboServerCapabilitiesMessageType {
        const capabilities: ITurboCapability[] = [];

        for (let count = wrapper.readInt(); count > 0; count--) capabilities.push({ name: wrapper.readString(), version: wrapper.readInt() });

        return { capabilities };
    }
}
