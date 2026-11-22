/**
 * Not Flash's: the Turbo extensions client modules add to the client's own (`api.capabilities`).
 * The client asks for its own extensions once it has the user object (`TurboClientCapabilitiesComposer`),
 * before any module runs - modules come with the answer. A module that names an extension of its
 * plugin's (`ICapabilityComposer` on the server) makes the client ask again, with the client's own
 * list and every module's: the server keeps the last list it was sent, so a stopped module's names
 * leave it the same way.
 *
 * Asking again is done once per change, after the modules being started or stopped have all run
 * (`hold`), or on the next turn for a module that names one later. The server answers each request in
 * full - the extensions it accepted and what each carries - so a list that did not change is never
 * sent twice. Kept free of runtime imports, so a test can run it under Node.
 */
import type { ITurboCapability } from '@nitrodevco/nitro-packets';

export interface ClientModuleCapabilities {
    /**
     * The client asks for its extensions: `core` and what the modules named, sent through `send` now
     * and again each time the modules' names change, until `stop`.
     */
    start: (send: (capabilities: ITurboCapability[]) => void, core: readonly ITurboCapability[]) => void;
    /** The connection is gone: nothing is sent until the next `start`. */
    stop: () => void;
    /** `owner` names `name` at `version`; returns its removal. A name of the client's own is refused (`false`). */
    declare: (owner: string, name: string, version: number) => (() => void) | false;
    /** A module stopped: its names go. */
    removeOwner: (owner: string) => void;
    /** Holds asking again until every returned release is called: modules are being started or stopped. */
    hold: () => () => void;
    /** What the client asks for now: its own, then the modules' (the highest version a name was given at). */
    list: () => ITurboCapability[];
}

export const createClientModuleCapabilities = (schedule: (flush: () => void) => void): ClientModuleCapabilities => {
    const declared = new Map<string, { owner: string; version: number }[]>();
    let send: ((capabilities: ITurboCapability[]) => void) | undefined;
    let core: readonly ITurboCapability[] = [];
    let sent = '';
    let holds = 0;
    let scheduled = false;

    const list = (): ITurboCapability[] => {
        const own = new Set(core.map(capability => capability.name));
        const added = [ ...declared ].filter(([ name ]) => !own.has(name)).map(([ name, entries ]) => ({ name, version: Math.max(...entries.map(entry => entry.version)) }));

        return [ ...core, ...added.sort((a, b) => a.name.localeCompare(b.name)) ];
    };

    const keyOf = (capabilities: ITurboCapability[]) => capabilities.map(capability => `${capability.name}@${capability.version}`).join(',');

    const flush = () => {
        scheduled = false;

        if (!send || holds) return;

        const capabilities = list();
        const key = keyOf(capabilities);

        if (key === sent) return;

        sent = key;
        send(capabilities);
    };

    const changed = () => {
        if (!send || holds || scheduled) return;

        scheduled = true;
        schedule(flush);
    };

    return {
        start: (sender, own) => {
            send = sender;
            core = own;
            sent = '';
            flush();
        },
        stop: () => {
            send = undefined;
            sent = '';
        },
        declare: (owner, name, version) => {
            if (core.some(capability => capability.name === name)) return false;

            const entry = { owner, version };
            let entries = declared.get(name);

            if (!entries) declared.set(name, (entries = []));
            entries.push(entry);
            changed();

            return () => {
                const index = entries.indexOf(entry);

                if (index < 0) return;

                entries.splice(index, 1);

                if (!entries.length && (declared.get(name) === entries)) declared.delete(name);
                changed();
            };
        },
        removeOwner: (owner) => {
            let removed = false;

            for (const [ name, entries ] of [ ...declared ]) {
                for (let index = entries.length - 1; index >= 0; index--) {
                    if (entries[index].owner !== owner) continue;

                    entries.splice(index, 1);
                    removed = true;
                }

                if (!entries.length) declared.delete(name);
            }

            if (removed) changed();
        },
        hold: () => {
            let released = false;

            holds++;

            return () => {
                if (released) return;

                released = true;
                holds--;
                flush();
            };
        },
        list,
    };
};
