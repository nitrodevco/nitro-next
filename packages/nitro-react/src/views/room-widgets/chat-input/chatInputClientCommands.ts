/**
 * The `:words` the chat input runs itself, as entries of the command tree so the completion
 * offers them beside the server's (`mergeChatCommands`): the chat modes `RoomChatInputView`
 * reads off the line (`:whisper name`, `:shout`, `:speak`, by their localized names) and the
 * wired commands `runWiredChatCommand` handles, which only a user the wired menu opens for is
 * offered (`ClientGates.WiredMenu`), and the room commands `runRoomChatCommand` handles - the
 * choosers for everyone, the furni management ones for rights (`roomLevel` 1) and `:ejectpets` for
 * the owner (4); each still checks its own rights when it runs.
 */
import { ITurboCommand, ITurboCommandParameter, TurboCommandParameterKind, TurboCommandSuggestType } from '@nitrodevco/nitro-packets';

/** `CommandCategories.GENERAL`'s neighbour for what the client does on its own. */
const CATEGORY = 'Client';

const message: ITurboCommandParameter = {
    name: 'message',
    kind: TurboCommandParameterKind.Rest,
    optional: false,
    suggest: TurboCommandSuggestType.None,
    selectors: false,
    members: [],
};

const clientCommand = (name: string, description: string, parameters: ITurboCommandParameter[] = [], aliases: string[] = [], roomLevel: number = -1): ITurboCommand => ({
    name,
    aliases,
    category: CATEGORY,
    description,
    usage: [ `:${name}`, ...parameters.map(x => (x.optional ? `[${x.name}]` : `<${x.name}>`)) ].join(' '),
    roomLevel,
    operator: false,
    parameters,
});

export interface ChatInputClientCommandTexts {
    /** The localized chat modes, with their colon: `widgets.chatinput.mode.*`. */
    whisperMode: string;
    shoutMode: string;
    speakMode: string;
    whisper: string;
    shout: string;
    speak: string;
    wiredMenu: string;
    variables: string;
    inspection: string;
    playTest: string;
    wiredReset: string;
    userChooser: string;
    furniChooser: string;
    pickAll: string;
    pickAllBuildersClub: string;
    resetScores: string;
    ejectAll: string;
    ejectPets: string;
}

export const chatInputClientCommands = (texts: ChatInputClientCommandTexts, wired: boolean): ITurboCommand[] => {
    const commands = [
        clientCommand(texts.whisperMode.slice(1), texts.whisper, [
            { name: 'who', kind: TurboCommandParameterKind.RoomPlayer, optional: false, suggest: TurboCommandSuggestType.Client, selectors: false, members: [] },
            message,
        ]),
        clientCommand(texts.shoutMode.slice(1), texts.shout, [ message ]),
        clientCommand(texts.speakMode.slice(1), texts.speak, [ message ]),
        clientCommand('chooser', texts.userChooser),
        clientCommand('furni', texts.furniChooser),
        clientCommand('pickall', texts.pickAll, [], [], 1),
        clientCommand('pickallbc', texts.pickAllBuildersClub, [], [], 1),
        clientCommand('resetscores', texts.resetScores, [], [], 1),
        clientCommand('ejectall', texts.ejectAll, [], [], 1),
        clientCommand('ejectpets', texts.ejectPets, [], [], 4),
    ];

    if (wired) {
        commands.push(
            clientCommand('wired', texts.wiredMenu, [], [ 'wf' ]),
            clientCommand('variables', texts.variables, [], [ 'var' ]),
            clientCommand('inspection', texts.inspection, [], [ 'inspect' ]),
            clientCommand('playtest', texts.playTest),
            clientCommand('wiredreset', texts.wiredReset),
        );
    }

    return commands;
};
