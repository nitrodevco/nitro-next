/**
 * The client module API (version 1.1) as a module author types against it: what `activate(api)` is
 * handed. It mirrors `packages/nitro-react/src/commands/client-modules/ClientModuleApi.ts` without
 * the client's internals, so a module builds outside this repository with nothing but React's types.
 * `nitro-react/src/commands/client-modules/clientModuleSdk.check.ts` fails the client's type check
 * when the two differ, so a member added to (or changed in) the client's API is added here too.
 */
import type { ComponentType, ReactNode } from 'react';

import type { ClientModuleTemplateBinding, ClientModuleTemplateContext, ClientModuleTemplatePatchOp, ClientModuleTemplatePatchReport, ClientModuleTemplateWindows } from './template-types';
import type { ClientModuleTheme } from './theme-types';

export type ClientModuleDispose = () => void;

/** A query for `api.http.get`: each value sent as text. */
export type ClientModuleHttpQuery = Record<string, string | number | boolean>;

/**
 * A plugin web route's answer. Never thrown for an HTTP error: `ok` is false, `status` the HTTP status
 * (0 when the call could not be made: no plugin routes on this hotel, a path outside the plugin's own)
 * and `error` the route's message. `data` is the JSON body.
 */
export interface ClientModuleHttpResponse<T = unknown> {
    ok: boolean;
    status: number;
    data: T | undefined;
    error: string | undefined;
}

/** What a composer writes: an int, a string or a boolean (a byte), in wire order. */
export type ClientModulePacketValue = number | string | boolean;

/**
 * One field type of a plugin message's schema, as the server sends it (`client.messages`): a scalar,
 * `['array', item]`, `['map', value]` (a string-keyed dictionary, read as an object) or
 * `['object', fields]`. `int`, `long` and `double` read as numbers.
 */
export type ClientModuleMessageType =
    | 'int'
    | 'long'
    | 'bool'
    | 'string'
    | 'double'
    | readonly [ 'array', ClientModuleMessageType ]
    | readonly [ 'map', ClientModuleMessageType ]
    | readonly [ 'object', ClientModuleMessageSchema ];

/** A plugin message's schema: its fields in wire order, `[camelCaseName, type]`. */
export type ClientModuleMessageSchema = readonly (readonly [ string, ClientModuleMessageType ])[];

/** The value a schema type reads as. */
export type ClientModuleMessageValue<T> = T extends 'int' | 'long' | 'double'
    ? number
    : T extends 'bool'
        ? boolean
        : T extends 'string'
            ? string
            : T extends readonly [ 'array', infer Item ]
                ? ClientModuleMessageValue<Item>[]
                : T extends readonly [ 'map', infer Value ]
                    ? Record<string, ClientModuleMessageValue<Value>>
                    : T extends readonly [ 'object', infer Fields ]
                        ? ClientModuleMessageOf<Fields>
                        : unknown;

/**
 * A message's data as an object, from its schema written `as const` (the JSON the server sends, or
 * `PluginMessageSchema.For(typeof(T)).Json` on the server):
 * `type Skill = ClientModuleMessageOf<typeof SKILL_SCHEMA>`.
 */
export type ClientModuleMessageOf<Fields> = Fields extends readonly (readonly [ string, unknown ])[]
    ? { [Field in Fields[number] as Field[0]]: ClientModuleMessageValue<Field[1]> }
    : never;

/** Raw bytes of a packet, read in order. */
export interface ClientModuleBinaryReader {
    readBytes(length: number): ClientModuleBinaryReader;
    readByte(): number;
    readShort(): number;
    readInt(): number;
    readFloat(): number;
    readDouble(): number;
    remaining(): number;
    toString(encoding?: string): string;
    toArrayBuffer(): ArrayBuffer;
}

/** A server packet as a parser reads it, in wire order. */
export interface ClientModulePacketReader {
    readByte(): number;
    /** The next `length` bytes. */
    readBytes(length: number): ClientModuleBinaryReader | undefined;
    readBoolean(): boolean;
    readShort(): number;
    readInt(): number;
    readFloat(): number;
    readDouble(): number;
    readString(): string;
    header: number;
    bytesAvailable: boolean;
}

/** What a module's window component is given. */
export interface ClientModuleWindowProps {
    /** What `windows.open` was given, `{}` without. */
    params: Record<string, unknown>;
    close: () => void;
}

/** An avatar in the room, as an overlay is asked to draw over it. */
export interface ClientModuleAvatar {
    /** The room index: the avatar's room object id. */
    roomIndex: number;
    userId: number;
    name: string;
    /** The user's own avatar. */
    isOwnUser: boolean;
}

/** What a reception layer is given: the reception's size, the desktop's. */
export interface ClientModuleHotelViewLayerProps {
    width: number;
    height: number;
}

/** What a reception widget is given: its slot, and the width of the pane it is in. */
export interface ClientModuleHotelViewWidgetProps {
    slot: number;
    width: number;
}

/** An alert as a module's illustration hook is shown it. */
export interface ClientModuleAlert {
    /** `alert`: a simple alert; `popup`: a notification popup. */
    kind: 'alert' | 'popup';
    caption: string;
    message: string;
    /** Its picture as the client (or a hook before this one) gives it: an asset name or a URL; `undefined` for none. */
    illustration?: string;
}

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

/** The room events (`api.events.on`), by name, with what each handler is given. */
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
    /** The security level the server last sent. */
    securityLevel: number;
    isAmbassador: boolean;
}

/** The own user's club, as the purse has it. */
export interface ClientModuleClubState {
    /** 0 none, 1 Habbo Club, 2 VIP. */
    level: number;
    /** Days left of the current period, and whole periods after it. */
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
    /** 0 none, 1 rights ... 4 owner, 5 moderator. */
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

/** What each room menu's buttons are given: the avatar or the furni it is open on. */
export interface ClientModuleContextMenuTargets {
    /** Another user's avatar menu. */
    user: ClientModuleRoomAvatar;
    /** The own avatar's menu. */
    ownUser: ClientModuleRoomAvatar;
    /** The furni infostand's buttons. */
    furni: ClientModuleRoomFurni;
}

export type ClientModuleContextMenu = keyof ClientModuleContextMenuTargets;

/** A module's button in a room menu (`api.contextMenu.add`). */
export interface ClientModuleContextMenuButton<M extends ClientModuleContextMenu = ClientModuleContextMenu> {
    /** Unique in the module. */
    id: string;
    /** `user`: another user's avatar menu; `ownUser`: the own avatar's; `furni`: the furni infostand's buttons. */
    menu: M;
    label: string;
    /** An image URL (`assetUrl('icon.png')`), drawn at the row's right in the avatar menus; the infostand's buttons have no picture. */
    icon?: string;
    /** Whether the button shows for this avatar or furni, asked each time the menu is drawn; shown when left out. */
    when?: (target: ClientModuleContextMenuTargets[M]) => boolean;
    onClick: (target: ClientModuleContextMenuTargets[M]) => void;
}

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

/** A module's chat command (`api.chatCommands.register`). */
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

/**
 * The client's own libraries, shared rather than bundled a second time. A module built with the
 * SDK's bundler preset imports `react` and `@nitrodevco/client-module-sdk/theme` instead.
 */
export interface ClientModuleLibraries {
    react: typeof import('react');
    reactJsxRuntime: typeof import('react/jsx-runtime');
    zustand: { useStore: (...args: never[]) => unknown };
    theme: ClientModuleTheme;
    /**
     * The client's app-wide stores. Internal and unversioned.
     * @deprecated Since 1.1: read `api.state` and `api.events`, which keep their shape across releases.
     */
    stores: { room: unknown; system: unknown; user: unknown };
}

export interface ClientModuleApi {
    readonly version: 1;
    /**
     * The minor version: 1 for API 1.1 (`state`, `events`, `contextMenu`, `chatCommands`), 2 for 1.2
     * (`channels`, `links.handle`'s `path`). A plain-JavaScript module that may meet an older client
     * reads `api.minor ?? 0`.
     */
    readonly minor: 2;
    /** The module's key: its plugin's. */
    readonly key: string;
    /**
     * The URL the module was named by. A module checked by its SHA-256 runs from a `blob:` URL, so
     * `import.meta.url` cannot find the files beside it: `new URL('icon.png', api.baseUrl)` can.
     */
    readonly baseUrl: string;
    /** The client's own React, theme and stores, shared rather than bundled a second time. */
    readonly libs: ClientModuleLibraries;
    /**
     * The own user, their club and purse, and the room they are in, read-only. `get()` is the state
     * now; a part keeps its identity until a field in it changes, so `use(x => x.user)` in a component
     * draws again only then (select a part or a value, never a new object). `hasPermission(node,
     * level)`: the node when the server sent permission nodes, else the security level when one is named.
     */
    state: {
        get: () => ClientModuleState;
        subscribe: (listener: (state: ClientModuleState, previous: ClientModuleState) => void) => ClientModuleDispose;
        use: <T>(selector: (state: ClientModuleState) => T) => T;
        hasPermission: (node: string, level?: number) => boolean;
    };
    /**
     * The room's events from the moment a handler is added: entered and left, avatars and furni added,
     * removed and clicked, and every line said. A handler that throws is logged.
     */
    events: {
        on: <E extends ClientModuleEventName>(event: E, handler: (data: ClientModuleEvents[E]) => void) => ClientModuleDispose;
    };
    contextMenu: {
        /**
         * A button in a room menu, after the client's own rows: a row of the menu's template added as
         * the module's template patch (`<key>:<id>`), drawn while `when` passes.
         */
        add: <M extends ClientModuleContextMenu>(button: ClientModuleContextMenuButton<M>) => ClientModuleDispose;
    };
    chatCommands: {
        /**
         * A `:name` command run in the client: the chat input offers it with the client's own and the
         * server's, and a line it matches is not said unless `run` returns `false`. The client's own
         * commands come first.
         */
        register: (command: ClientModuleChatCommand) => ClientModuleDispose;
    };
    windows: {
        /**
         * A window by id: the component is drawn in the client's window layer while it is open. With
         * `onTop` it stays above every other window (a HUD, a timer), under the client's menus,
         * hints and modal dialogs.
         */
        register: (id: string, component: ComponentType<ClientModuleWindowProps>, options?: { onTop?: boolean }) => ClientModuleDispose;
        open: (id: string, params?: Record<string, unknown>) => void;
        close: (id: string) => void;
        toggle: (id: string, params?: Record<string, unknown>) => void;
    };
    toolbar: {
        /** An icon in the bottom bar, after the client's own: `icon` is an image URL. */
        add: (item: { id: string; icon: string; tooltip?: string; onClick: () => void }) => ClientModuleDispose;
    };
    meMenu: {
        /** An entry in the me menu, before its spacer: a clone of the profile entry with its own caption. */
        add: (item: { id: string; caption: string; onClick: () => void }) => ClientModuleDispose;
        /** Opens or closes the me menu, as its toolbar icon and Habbo's `toolbar/memenu` link do. */
        toggle: () => void;
    };
    links: {
        /**
         * Every in-client link `<prefix>/...` that the client itself has no route for - or, with `path`
         * (`'news/*'`: the parts after the prefix, `*` any one), those whose parts begin with it. A link
         * goes to the handlers of the most specific path that matches, else to every handler of the whole
         * prefix. Two modules on one prefix and path both get its links: a conflict, warned and listed
         * by the extension inspector.
         */
        handle: (prefix: string, handler: (link: string) => void, options?: { path?: string }) => ClientModuleDispose;
        /** Opens an in-client link, the client's or a module's. */
        open: (link: string) => void;
    };
    packets: {
        /** Reads an extension header's packet and hands it to `listener`. Undefined when the header is not free. */
        registerParser: <T>(header: number, parse: (wrapper: ClientModulePacketReader) => T, listener: (data: T) => void) => ClientModuleDispose | undefined;
        /** Claims an extension header to send on. Undefined when the header is not free. */
        registerComposer: (header: number) => ClientModuleDispose | undefined;
        /** Sends on a header the module claimed: each value an int, a string or a boolean. */
        send: (header: number, ...values: ClientModulePacketValue[]) => void;
    };
    /**
     * The plugin's named messages (Turbo's `client.messages`, turbo-cloud `docs/plugin-messages.md`):
     * read and written by name, from the field schema the server sends, so a module never sees a
     * header. Type a message's data with `ClientModuleMessageOf<typeof schema>`.
     */
    messages: {
        /**
         * Every `name` message the server sends, as an object of its fields (camelCase, as the
         * schema names them). A name the server's list does not have warns once; the handler is kept,
         * since a plugin loading on the server may send its module before its messages' list.
         */
        on: (name: string, handler: (data: Record<string, unknown>) => void) => ClientModuleDispose;
        /**
         * Sends `name` with `data`'s fields, written in the schema's order. A field the schema does
         * not have is ignored and a missing one sent as its default (0, '', false, []), each logged
         * once; a name the server did not list warns and sends nothing.
         */
        send: (name: string, data: Record<string, unknown>) => void;
    };
    /**
     * Data shared with the other modules by key (`'news.promo'`), not through links. `publish` hands
     * the value to the key's subscribers and keeps it as the key's value; `subscribe` is handed each
     * value from then on, and at once the one kept, with the key of the module that published it. A
     * stopped module's values are cleared (its subscribers handed `undefined`). Publish plain data, a
     * new object for each change. Optional (`api.channels?.`): clients before it have none. Typed:
     * `defineChannel<T>(key)`.
     */
    channels: {
        publish: <T = unknown>(key: string, value: T) => void;
        subscribe: <T = unknown>(key: string, handler: (value: T | undefined, from: string | undefined) => void) => ClientModuleDispose;
        get: <T = unknown>(key: string) => T | undefined;
    };
    /**
     * The module's own plugin's web routes (`IPluginWebRoute`) on the hotel's public web host:
     * `path` is under `/api/plugins/<key>/`, such as `'top'` or `'scores/42'`. The client signs the
     * call in as the player; the module never sees a token. Rejects only when the network fails.
     */
    http: {
        get: <T = unknown>(path: string, query?: ClientModuleHttpQuery) => Promise<ClientModuleHttpResponse<T>>;
        post: <T = unknown>(path: string, body?: unknown) => Promise<ClientModuleHttpResponse<T>>;
        put: <T = unknown>(path: string, body?: unknown) => Promise<ClientModuleHttpResponse<T>>;
        patch: <T = unknown>(path: string, body?: unknown) => Promise<ClientModuleHttpResponse<T>>;
        delete: <T = unknown>(path: string) => Promise<ClientModuleHttpResponse<T>>;
    };
    config: {
        /** A configuration value as the hotel set it, `undefined` when unset. */
        get: (key: string) => unknown;
    };
    texts: {
        /** A text by key, `%name%` replaced from `replacements`; `fallback` when the hotel has none. */
        get: (key: string, fallback?: string, replacements?: Record<string, string>) => string;
    };
    sounds: {
        /** A sample of the client's sound manager by id, at the UI volume. */
        play: (soundId: string) => void;
    };
    room: {
        /** Draws over every avatar in the room, placed above its head every frame. */
        avatarOverlay: (render: (avatar: ClientModuleAvatar) => ReactNode) => ClientModuleDispose;
        /** Leaves the room for the hotel view, as the toolbar's hotel view icon does. Nothing outside a room. */
        leave: () => void;
    };
    hotelView: {
        /**
         * A layer of the reception, drawn with its moving objects: over its background art and under
         * its widgets, its hotel top and left backdrop, while the reception is shown. Layers added
         * later are drawn over earlier ones. With `replacesBackground` the layer is the backdrop.
         */
        addLayer: (component: ComponentType<ClientModuleHotelViewLayerProps>, options?: { replacesBackground?: boolean }) => ClientModuleDispose;
        /**
         * A widget in a reception widget slot (`landing.view.dynamic.slot.<n>`: 1 across the top, 2
         * and 4 the left column, 3 and 5 the right, 6 the bottom slot), in place of the hotel's
         * configured widget while it is added; the slot takes the size it draws at. The last widget
         * added for a slot is shown.
         */
        addWidget: (slot: number, component: ComponentType<ClientModuleHotelViewWidgetProps>) => ClientModuleDispose;
    };
    notifications: {
        /** A bubble layout: a template of the bundles (`<library>/<asset>_xml`) and its height. */
        registerLayout: (name: string, layout: { template: string; height: number }) => ClientModuleDispose;
        /**
         * A bubble in the client's stack, drawn with a registered layout. With `stay` it never times
         * out and a click does not dismiss it; `timeDisplay` is how long (ms) any other stays up.
         * An `id` is added only while no bubble of the module's with that id is queued or up.
         * Returns the function that takes the bubble down.
         */
        add: (layout: string, text: string, options?: { image?: string; link?: string; stay?: boolean; timeDisplay?: number; id?: string }) => ClientModuleDispose;
        /**
         * The picture of every alert and notification popup, open or yet to open: `resolve` is shown each
         * with the picture it has and gives another, or `undefined` to leave it.
         */
        setIllustration: (resolve: (alert: ClientModuleAlert) => string | undefined) => ClientModuleDispose;
    };
    templates: {
        /**
         * Changes a core window's template (`<library>/<asset>`) as data: `set` layout properties (and
         * `params`, merged by key), `remove` an element, `insert` one or `move` one keeping its name.
         * `ops` may be a function of the window's context, called once per context. Patches from every
         * module and plugin apply together in order (`order`, then key); an element this module adds is
         * named `<key>:<name>` and only this module reaches it by its short name. Conflicts, elements a
         * release no longer has and ops that throw are kept in `report`.
         */
        patch: (template: string, ops: readonly ClientModuleTemplatePatchOp[] | ((context: ClientModuleTemplateContext) => readonly ClientModuleTemplatePatchOp[]), options?: { order?: number }) => ClientModuleDispose;
        /**
         * What the window's code would bind, for an element this module added: a caption, a click, a
         * picture - or a function of the window's context giving it. With `override`, an element the
         * window's code binds itself (named as the code names it): this module's value is used for the
         * fields it sets, each field the code sets too reported as a conflict.
         */
        bind: (template: string, element: string, binding: ClientModuleTemplateBinding | ((context: ClientModuleTemplateContext) => ClientModuleTemplateBinding), options?: { override?: boolean }) => ClientModuleDispose;
        /**
         * Runs after the window's own layout code each time a window of the template is laid out: what a
         * patch cannot say as data. One that throws is skipped and reported.
         */
        arrange: (template: string, arrange: (windows: ClientModuleTemplateWindows, context: ClientModuleTemplateContext) => void) => ClientModuleDispose;
        /** The last application's conflicts, unmatched elements and errors for a template, once it has been drawn. */
        report: (template: string) => ClientModuleTemplatePatchReport | undefined;
    };
}
