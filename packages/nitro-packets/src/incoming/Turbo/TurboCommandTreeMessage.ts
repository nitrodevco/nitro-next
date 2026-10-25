import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * A parameter's type in Turbo's command schema. A kind this client does not know is read as a
 * word, as the extension asks, so the server can add one without breaking an older client.
 */
export enum TurboCommandParameterKind {
    Word = 0,
    Integer = 1,
    Long = 2,
    Boolean = 3,
    Enumeration = 4,
    RoomPlayer = 5,
    Player = 6,
    Duration = 7,
    Rest = 8,
}

/** Where the values to offer for a parameter come from. */
export enum TurboCommandSuggestType {
    None = 0,
    /** The client knows them: the members the tree carries, the room's users, the usual durations. */
    Client = 1,
    /** Only the server knows them: ask with `TurboCommandSuggestComposer`. */
    Server = 2,
}

export interface ITurboCommandParameter {
    name: string;
    kind: TurboCommandParameterKind;
    optional: boolean;
    suggest: TurboCommandSuggestType;
    /** A player parameter this user may aim at `@room` and `@online`. */
    selectors: boolean;
    /** An enumeration's members; empty for any other kind. */
    members: string[];
    description?: string;
    minimum?: string;
    maximum?: string;
    minLength?: number;
    maxLength?: number;
    defaultValue?: string;
}

export interface ITurboCommandSyntax {
    path: string;
    usage: string;
    parameters: ITurboCommandParameter[];
}

export interface ITurboCommand {
    name: string;
    /** Declared and hotel aliases. */
    aliases: string[];
    category: string;
    description: string;
    /** The usage line the server's own replies use: `:ban <who> <duration> [reason]`. */
    usage: string;
    /** The `RoomControllerLevelEnum` the command needs where it is typed; -1 for none. */
    roomLevel: number;
    /** Runs outside the room, so the room level never applies. */
    operator: boolean;
    parameters: ITurboCommandParameter[];
    syntax?: ITurboCommandSyntax[];
}

export type TurboCommandTreeMessageType = {
    /** Every chat command the user may use, sorted by name: the whole set, replacing the last. */
    commands: ITurboCommand[];
};

const KNOWN_KINDS = new Set<number>(Object.values(TurboCommandParameterKind).filter(x => typeof x === 'number'));

/**
 * Not Habbo's: Turbo's `chat.commands.v2` extension, sent only after the client asked for it. The
 * shape is Turbo's `docs/client-capabilities.md`.
 */
export class TurboCommandTreeMessage implements IIncomingPacket<TurboCommandTreeMessageType> {
    public parse(wrapper: IMessageDataWrapper): TurboCommandTreeMessageType {
        const commands: ITurboCommand[] = [];

        for (let count = wrapper.readInt(); count > 0; count--) {
            const name = wrapper.readString();
            const aliases: string[] = [];

            for (let aliasCount = wrapper.readInt(); aliasCount > 0; aliasCount--) aliases.push(wrapper.readString());

            const category = wrapper.readString();
            const description = wrapper.readString();
            const usage = wrapper.readString();
            const roomLevel = wrapper.readInt();
            const operator = wrapper.readBoolean();
            const parameters: ITurboCommandParameter[] = [];

            for (let parameterCount = wrapper.readInt(); parameterCount > 0; parameterCount--) {
                const parameterName = wrapper.readString();
                const kind = wrapper.readInt();
                const optional = wrapper.readBoolean();
                const suggest = wrapper.readInt();
                const selectors = wrapper.readBoolean();
                const members: string[] = [];

                for (let memberCount = wrapper.readInt(); memberCount > 0; memberCount--) members.push(wrapper.readString());

                const parameterDescription = wrapper.readString();
                const minimum = wrapper.readString();
                const maximum = wrapper.readString();
                const minLength = wrapper.readInt();
                const maxLength = wrapper.readInt();
                const defaultValue = wrapper.readString();

                parameters.push({
                    name: parameterName,
                    kind: KNOWN_KINDS.has(kind) ? kind : TurboCommandParameterKind.Word,
                    optional,
                    suggest,
                    selectors,
                    members,
                    description: parameterDescription,
                    minimum,
                    maximum,
                    minLength,
                    maxLength,
                    defaultValue,
                });
            }

            const syntax: NonNullable<ITurboCommand['syntax']> = [];
            for (let syntaxCount = wrapper.readInt(); syntaxCount > 0; syntaxCount--) {
                const path = wrapper.readString();
                const syntaxUsage = wrapper.readString();
                const syntaxParameters: ITurboCommandParameter[] = [];
                for (let parameterCount = wrapper.readInt(); parameterCount > 0; parameterCount--) {
                    const parameterName = wrapper.readString();
                    const kind = wrapper.readInt();
                    const optional = wrapper.readBoolean();
                    const suggest = wrapper.readInt();
                    const selectors = wrapper.readBoolean();
                    const members: string[] = [];
                    for (let memberCount = wrapper.readInt(); memberCount > 0; memberCount--) members.push(wrapper.readString());
                    syntaxParameters.push({ name: parameterName, kind: KNOWN_KINDS.has(kind) ? kind : TurboCommandParameterKind.Word, optional, suggest, selectors, members, description: wrapper.readString(), minimum: wrapper.readString(), maximum: wrapper.readString(), minLength: wrapper.readInt(), maxLength: wrapper.readInt(), defaultValue: wrapper.readString() });
                }
                syntax.push({ path, usage: syntaxUsage, parameters: syntaxParameters });
            }

            commands.push({ name, aliases, category, description, usage, roomLevel, operator, parameters, syntax });
        }

        return { commands };
    }
}
