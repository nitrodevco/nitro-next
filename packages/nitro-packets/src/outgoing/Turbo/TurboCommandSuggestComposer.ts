import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type TurboCommandSuggestComposerType = {
    /** Echoed in the answer, so a stale one is dropped. */
    requestId: number;
    command: string;
    /** The parameter's index in the command tree. */
    parameter: number;
    prefix: string;
    syntax: string;
    argumentText: string;
};

/**
 * Not Habbo's: asks a Turbo server what to offer for one parameter of a chat command
 * (`chat.commands.v2`), answered by `TurboCommandSuggestionsMessage`. See Turbo's
 * `docs/client-capabilities.md`.
 */
export class TurboCommandSuggestComposer implements IOutgoingPacket<TurboCommandSuggestComposerType> {
    public constructor(private params: TurboCommandSuggestComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [ this.params.requestId, this.params.command, this.params.parameter, this.params.prefix, this.params.syntax, this.params.argumentText ];
    }
}
