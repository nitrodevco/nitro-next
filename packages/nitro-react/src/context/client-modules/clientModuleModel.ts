/**
 * Not Flash's: what client module API 1.1 hands a module about the client - the read-only state
 * (`api.state`), the room events (`api.events`), the context menu buttons (`api.contextMenu`) and the
 * chat commands (`api.chatCommands`) - and the rules that turn the client's own stores into them.
 * Kept free of runtime imports so it can be tested under Node as it stands; the wiring is
 * `clientModuleEvents.ts` and `clientModuleState.ts`.
 */
import type { ITurboCommand, ITurboCommandParameter } from '@nitrodevco/nitro-packets';

/** `RoomObjectUserType`, as the room's user list numbers it; spelled out to keep this file runtime-free. */
const USER_TYPES: Record<number, ClientModuleAvatarKind> = { 1: 'user', 2: 'pet', 3: 'bot', 4: 'rentable_bot' };

/** `RoomObjectCategoryEnum.Floor` / `Wall`. */
const CATEGORY_FLOOR = 10;
const CATEGORY_WALL = 20;

export type ClientModuleAvatarKind = 'user' | 'pet' | 'bot' | 'rentable_bot';

/** An avatar in the room as a module is told of it: a user, a pet or a bot. */
export interface ClientModuleRoomAvatar {
    /** The room index: the avatar's room object id. */
    roomIndex: number;
    /** The user's (or the pet's, the bot's) id. */
    userId: number;
    kind: ClientModuleAvatarKind;
    name: string;
    figure: string;
    /** The user's own avatar. */
    isOwnUser: boolean;
}

/** A furni in the room as a module is told of it. */
export interface ClientModuleRoomFurni {
    /** The furni's room object id (its item id). */
    id: number;
    kind: 'floor' | 'wall';
    /** Its furni class name (`chair_polyfon`), as the furni data names it. */
    type: string;
}

/** A line said in the room: talk, a shout or a whisper. */
export interface ClientModuleChatLine {
    /** The speaker's room index; -1 for a line from no avatar (a wired message at a tile). */
    roomIndex: number;
    /** The speaker as the room's user list has them; `undefined` for none. */
    speaker: ClientModuleRoomAvatar | undefined;
    text: string;
    kind: 'talk' | 'shout' | 'whisper';
    /** The chat bubble style. */
    styleId: number;
}

/** The room events, by name, with what each handler is given. */
export interface ClientModuleEvents {
    /** A room session started: the room is shown from here (its data may still be on its way). */
    'room.entered': { roomId: number };
    /** The room session ended, for the hotel view or another room. */
    'room.left': { roomId: number };
    'room.avatar.added': ClientModuleRoomAvatar;
    'room.avatar.removed': ClientModuleRoomAvatar;
    /** An avatar clicked (selected), the own one included. */
    'room.avatar.clicked': ClientModuleRoomAvatar;
    'room.furni.added': ClientModuleRoomFurni;
    'room.furni.removed': ClientModuleRoomFurni;
    /** A furni clicked (selected). */
    'room.furni.clicked': ClientModuleRoomFurni;
    'room.chat': ClientModuleChatLine;
}

export type ClientModuleEventName = keyof ClientModuleEvents;

/** The own user as a module reads it. */
export interface ClientModuleUserState {
    /** -1 until the user object arrives. */
    id: number;
    name: string;
    figure: string;
    /** `M` or `F`. */
    gender: string;
    motto: string;
    /** The security level the server last sent (`UserRightsMessageEvent`). */
    securityLevel: number;
    isAmbassador: boolean;
}

/** The own user's club, as the purse has it. */
export interface ClientModuleClubState {
    /** 0 none, 1 Habbo Club, 2 VIP (`SessionDataManager.clubLevel`). */
    level: number;
    /** Days left of the current period, and whole periods after it (`Purse.clubDays`, `clubPeriods`). */
    days: number;
    periods: number;
}

/** The own user's purse. */
export interface ClientModuleCurrencyState {
    credits: number;
    /** The activity point currencies by type: 0 duckets, 5 diamonds, other types as the hotel uses them. */
    points: Readonly<Record<number, number>>;
}

/** The room the user is in. */
export interface ClientModuleRoomState {
    id: number;
    /** `''` until the room's data arrives. */
    name: string;
    /** The own avatar's room index, -1 until it is in the room. */
    ownRoomIndex: number;
    isOwner: boolean;
    /** `RoomControllerLevelEnum`: 0 none, 1 rights ... 4 owner, 5 moderator. */
    controllerLevel: number;
}

/** Everything `api.state` reads, frozen: a part keeps its identity until something in it changes. */
export interface ClientModuleState {
    user: Readonly<ClientModuleUserState>;
    club: Readonly<ClientModuleClubState>;
    currencies: Readonly<ClientModuleCurrencyState>;
    /** `undefined` outside a room. */
    room: Readonly<ClientModuleRoomState> | undefined;
}

/**
 * A part rebuilt from its fields, or the previous part itself when every field is the same: what
 * lets a component select a part (`api.state.use(x => x.user)`) without drawing again for nothing.
 */
export const keepPart = <T extends object>(previous: Readonly<T> | undefined, next: T): Readonly<T> => {
    if (previous && (Object.keys(next) as (keyof T)[]).every(key => Object.is(previous[key], next[key]))) return previous;

    return Object.freeze(next);
};

/**
 * Whether the own user holds `node`: the client gates' rule (`passesClientGate`). A server that sent
 * permission nodes (Turbo's `permission.nodes`) answers by node; any other by the security level,
 * when the module named the level that stands behind the node, and no otherwise.
 */
export const hasClientModulePermission = (rights: { securityLevel: number; permissionNodes: ReadonlySet<string> | null }, node: string, level?: number): boolean => {
    if (rights.permissionNodes) return rights.permissionNodes.has(node);

    return (level !== undefined) && (rights.securityLevel >= level);
};

/** A user of the room's list (`IRoomUserData`) as a module is told of them. */
export const toClientModuleAvatar = (user: { objectId: number; webID: number; userType: number; name: string; figure: string }, ownUserId: number): ClientModuleRoomAvatar => ({
    roomIndex: user.objectId,
    userId: user.webID,
    kind: USER_TYPES[user.userType] ?? 'user',
    name: user.name,
    figure: user.figure,
    isOwnUser: (user.userType === 1) && (user.webID === ownUserId),
});

/** The furni kind of a room object category, or `undefined` for one that is not furni. */
export const furniKindOf = (category: number): ClientModuleRoomFurni['kind'] | undefined => ((category === CATEGORY_FLOOR) ? 'floor' : (category === CATEGORY_WALL) ? 'wall' : undefined);

/**
 * The users added to and removed from the room's list between two of its versions. A new room
 * starts from no one, so its first users are added; the previous room's are not removed (the room
 * left is its own event).
 */
export const diffRoomUsers = <T>(previous: Readonly<Record<number, T>>, next: Readonly<Record<number, T>>): { added: T[]; removed: T[] } => {
    const added: T[] = [];
    const removed: T[] = [];

    for (const key of Object.keys(next)) {
        if (!(key in previous)) added.push(next[key as unknown as number]);
    }

    for (const key of Object.keys(previous)) {
        if (!(key in next)) removed.push(previous[key as unknown as number]);
    }

    return { added, removed };
};

/** A parameter of a module's chat command, for the completion. */
export interface ClientModuleChatCommandParameter {
    name: string;
    optional?: boolean;
    /** `word` (the default), `number`, `user` (someone in the room, offered from the room's list) or `rest` (the rest of the line). */
    type?: 'word' | 'number' | 'user' | 'rest';
}

/** What a module's command is given: the words after its name, and the whole line. */
export interface ClientModuleChatCommandContext {
    args: string[];
    text: string;
}

export interface ClientModuleChatCommand {
    /** The command without its colon: `hug` is typed `:hug`. */
    name: string;
    aliases?: readonly string[];
    /** One line for the command list. */
    description: string;
    parameters?: readonly ClientModuleChatCommandParameter[];
    /**
     * Runs it. The line is not said; return `false` to let it go on to the server as typed (a server
     * command of the same name, or chat).
     */
    run: (context: ClientModuleChatCommandContext) => boolean | void;
}

/** `TurboCommandParameterKind` / `TurboCommandSuggestType`, as the wire numbers them. */
const PARAMETER_KINDS: Record<NonNullable<ClientModuleChatCommandParameter['type']>, number> = { word: 0, number: 1, user: 5, rest: 8 };
const SUGGEST_NONE = 0;
const SUGGEST_CLIENT = 1;

/** A module's command as an entry of the command tree, so the chat input offers it with the client's and the server's. */
export const clientModuleChatCommandEntry = (moduleKey: string, command: ClientModuleChatCommand): ITurboCommand => {
    const parameters: ITurboCommandParameter[] = (command.parameters ?? []).map(({ name, optional = false, type = 'word' }) => ({
        name,
        kind: PARAMETER_KINDS[type],
        optional,
        suggest: (type === 'user') ? SUGGEST_CLIENT : SUGGEST_NONE,
        selectors: false,
        members: [],
    }));

    return {
        name: command.name,
        aliases: [ ...(command.aliases ?? []) ],
        category: moduleKey,
        description: command.description,
        usage: [ `:${command.name}`, ...parameters.map(x => (x.optional ? `[${x.name}]` : `<${x.name}>`)) ].join(' '),
        roomLevel: -1,
        operator: false,
        parameters,
    };
};

/**
 * The command a chat line runs, of those given in order, with its words: the line's first word with
 * its colon is the command's name or one of its aliases, in any case; words are split on runs of
 * whitespace.
 */
export const matchClientModuleChatCommand = <T extends { name: string; aliases?: readonly string[] }>(commands: readonly T[], text: string): { command: T; args: string[] } | undefined => {
    const [ first = '', ...args ] = text.trim().split(/\s+/);

    if (!first.startsWith(':') || (first.length < 2)) return undefined;

    const name = first.slice(1).toLowerCase();
    const command = commands.find(entry => (entry.name.toLowerCase() === name) || !!entry.aliases?.some(alias => alias.toLowerCase() === name));

    return command && { command, args };
};
