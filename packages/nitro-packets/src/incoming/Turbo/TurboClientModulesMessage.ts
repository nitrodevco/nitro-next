import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** One client module a server plugin ships: see `TurboClientModulesMessage`. */
export interface ITurboClientModule {
    /** The plugin's key, which names the module. */
    key: string;
    /** The module's JavaScript (an ES module), absolute or relative to the page. */
    url: string;
    version: string;
    /** The file's SHA-256 in hex; `''` when the server leaves it unchecked. */
    sha256: string;
}

export type TurboClientModulesMessageType = {
    /** Every module the client should run: the whole set, replacing the last. */
    modules: ITurboClientModule[];
};

/**
 * Not Habbo's: Turbo's `client.modules` extension, sent only after the client asked for it - right
 * after the capability answer, and again whenever a plugin adds, removes or reloads a module.
 * See Turbo's `docs/client-modules.md`.
 */
export class TurboClientModulesMessage implements IIncomingPacket<TurboClientModulesMessageType> {
    public parse(wrapper: IMessageDataWrapper): TurboClientModulesMessageType {
        const modules: ITurboClientModule[] = [];

        for (let count = wrapper.readInt(); count > 0; count--) modules.push({ key: wrapper.readString(), url: wrapper.readString(), version: wrapper.readString(), sha256: wrapper.readString() });

        return { modules };
    }
}
