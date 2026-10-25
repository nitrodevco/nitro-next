/**
 * What the chat input offers while a `:command` is typed, from the tree a Turbo server sent
 * (`chat.commands.v2`) and the commands the client runs itself. Not Flash's: Habbo's chat input
 * completes nothing. What it offers is shaped as Habbo's one completion is - the gift window's
 * friend suggestions (`PurchaseConfirmationDialog.onNameInputChange` / `updateSuggestions`): at
 * most ten rows, a name matching wherever the typed text appears in it (`search`), the matched
 * run in bold, the first row highlighted. Those that start with it come first here.
 *
 * - While the command's name is typed, the commands it matches, each shown as its usage line with
 *   what it does after it.
 * - After it, the values the current parameter takes: an enumeration's members, true and false,
 *   the usual durations, the room's users - all known here - or what the server offered for a
 *   player or a named source, which the input asks for with `request`.
 * - When there is nothing to offer, the usage line alone, the current parameter in bold, so the
 *   user still sees what comes next.
 *
 * `findInvalidArguments` says which arguments the server's binder would refuse, for the input to
 * draw in red. Words are split on runs of whitespace, as the binder splits them.
 *
 * Kept free of runtime imports so it can be tested under Node as it stands.
 */
import type { ITurboCommand, ITurboCommandParameter } from '@nitrodevco/nitro-packets';

/** `PurchaseConfirmationDialog.MAX_SUGGESTIONS`. */
export const MAX_CHAT_COMMAND_SUGGESTIONS = 10;

/** `TurboCommandParameterKind`, as the wire numbers it; spelled out here to keep this file runtime-free. */
const KIND_INTEGER = 1;
const KIND_LONG = 2;
const KIND_BOOLEAN = 3;
const KIND_ENUMERATION = 4;
const KIND_ROOM_PLAYER = 5;
const KIND_PLAYER = 6;
const KIND_DURATION = 7;
const KIND_REST = 8;
/** `TurboCommandSuggestType.Server`. */
const SUGGEST_SERVER = 2;

/** A parameter's kind and suggestion type as the wire numbers them, which the constants above name. */
const kindOf = (parameter: ITurboCommandParameter): number => parameter.kind;
const suggestOf = (parameter: ITurboCommandParameter): number => parameter.suggest;

/** What Turbo's binder takes for a `bool` (`ArgumentsBinder.TryParseBool`). */
const BOOLEAN_WORDS = [ 'true', 'false', 'on', 'off', 'yes', 'no', '1', '0' ];
const BOOLEANS = [ 'true', 'false' ];
/** The durations Turbo's own suggestion service offers. */
const DURATIONS = [ '30m', '1h', '1d', '7d', 'perm' ];
/** `CommandDuration.TryParse`: a number and a unit, or `perm` / `permanent`. */
const DURATION = /^(\d+[mhdw]|perm|permanent)$/i;
const DURATION_PREFIX = /^(\d+|p|pe|per|perm|perma|perman|permane|permanen)$/i;
const NUMBER = /^[+-]?\d+$/;
const NUMBER_PREFIX = /^[+-]?\d*$/;
const SELECTORS = [ '@online', '@room' ];
/** Turbo's `MinPlayerPrefix`: a shorter name is not asked for, as the server would answer with nothing. */
const MIN_PLAYER_PREFIX = 2;

/** One row: what it reads, the part to show in bold, what follows it in grey, and the line taking it leaves. */
export interface IChatCommandSuggestion {
    label: string;
    /** Where the bold run starts and ends in `label`; equal for none. */
    boldStart: number;
    boldEnd: number;
    /** What a command does, shown after its usage; empty for a value. */
    detail: string;
    /** The input's text once this row is taken; null for a row that is only a hint. */
    replacement: string | null;
    /** Caret position to apply after the replacement, when supplied. */
    replacementCursor?: number;
}

/** A request for values only the server knows. */
export interface IChatCommandSuggestRequest {
    command: string;
    parameter: number;
    prefix: string;
    syntax: string;
    argumentText: string;
}

export interface IChatCommandCompletion {
    suggestions: IChatCommandSuggestion[];
    request: IChatCommandSuggestRequest | null;
}

/** A run of the line, `start` to `end` (exclusive). */
export interface IChatCommandRange {
    start: number;
    end: number;
}

export interface IChatCommandCompletionInput {
    text: string;
    commands: readonly ITurboCommand[];
    /** The user's `RoomControllerLevelEnum` where they are typing. */
    controllerLevel: number;
    roomUserNames: readonly string[];
    /** The server's latest answer, by `chatCommandSuggestKey`. */
    serverValues: { key: string; values: readonly string[] } | null;
    cursor?: number;
}

interface IToken {
    text: string;
    start: number;
    end: number;
    valid: boolean;
    closed: boolean;
}

/** No suggestions and nothing to ask the server. */
export const NO_CHAT_COMMAND_COMPLETION: IChatCommandCompletion = { suggestions: [], request: null };

/** The key a request and its answer share. */
export const chatCommandSuggestKey = (command: string, parameter: number, _prefix: string, syntax = '', argumentText = '') => `${command}|${parameter}|${syntax.toLowerCase()}|${argumentText.toLowerCase()}`;

/**
 * The commands to complete from: the client's own first, as it runs them, then the server's that
 * do not take one of their names.
 */
export const mergeChatCommands = (clientCommands: readonly ITurboCommand[], serverCommands: readonly ITurboCommand[]): ITurboCommand[] => {
    const taken = new Set(clientCommands.flatMap(x => [ x.name, ...x.aliases ]).map(x => x.toLowerCase()));

    return [
        ...clientCommands,
        ...serverCommands.filter(x => ![ x.name, ...x.aliases ].some(name => taken.has(name.toLowerCase()))),
    ].sort((a, b) => a.name.localeCompare(b.name));
};

const tokenize = (text: string, allowUnclosedLast = true): IToken[] => {
    const tokens: IToken[] = [];
    let index = 0;
    while (index < text.length) {
        if (/\s/.test(text[index])) {
            index++;
            continue;
        }
        const start = index;
        let value = '';
        let valid = true;
        const quoted = text[index] === '"';
        let closed = !quoted;
        if (quoted) index++;
        while (index < text.length && (quoted ? !closed : !/\s/.test(text[index]))) {
            const char = text[index++];
            if (quoted && char === '"') {
                closed = true;
                continue;
            }
            if (quoted && char === '\\') {
                const escaped = text[index];
                if (escaped === '"' || escaped === '\\') {
                    value += escaped;
                    index++;
                } else {
                    valid = false;
                    value += char;
                }
                continue;
            }
            if (!quoted && char === '"') valid = false;
            value += char;
        }
        if (quoted && !closed && !allowUnclosedLast) valid = false;
        if (quoted && closed && index < text.length && !/\s/.test(text[index])) {
            valid = false;
            while (index < text.length && !/\s/.test(text[index])) {
                value += text[index++];
            }
        }
        const end = index;
        tokens.push({ text: value, start, end, valid, closed });
    }
    return tokens;
};

/** Where `typed` first appears in `value`, ignoring case; -1 when it does not. */
const matchAt = (value: string, typed: string) => value.toLowerCase().indexOf(typed.toLowerCase());

const encodeArgument = (value: string) => /[\s"\\]/.test(value)
    ? `"${value.replace(/[\\"]/g, char => `\\${char}`)}"`
    : value;

/** `onNameInputChange`'s match - anywhere in the value - with those starting with it first, each list keeping its order. */
const rankByMatch = <T>(items: readonly T[], valueOf: (item: T) => string, typed: string): T[] => {
    const starting: T[] = [];
    const containing: T[] = [];

    for (const item of items) {
        const at = matchAt(valueOf(item), typed);

        if (at === 0) starting.push(item);
        else if (at > 0) containing.push(item);
    }

    return [ ...starting, ...containing ];
};

/** A command the user may use where they are: the client hides one whose room level it does not reach. */
const usableHere = (command: ITurboCommand, controllerLevel: number) => command.operator || (command.roomLevel < 0) || (controllerLevel >= command.roomLevel);

/** The command a typed name stands for, by name or alias, ignoring case. */
const findCommand = (commands: readonly ITurboCommand[], name: string) => {
    const lower = name.toLowerCase();

    return commands.find(x => (x.name.toLowerCase() === lower) || x.aliases.some(alias => alias.toLowerCase() === lower));
};

/**
 * The usage line with the parameter at `index` in bold - the hint row - and what the server says
 * that parameter is after it, so `:gift <who> <furni> <note>` also says the note goes in quotes.
 */
const usageHint = (command: ITurboCommand, index: number, usage = command.usage, parameters = command.parameters): IChatCommandSuggestion => {
    const parameter = parameters[index];
    const token = parameter ? (parameter.optional ? `[${parameter.name}]` : `<${parameter.name}>`) : '';
    const start = token.length ? usage.indexOf(` ${token}`) + 1 : 0;

    return { label: usage, boldStart: start, boldEnd: (start > 0) ? (start + token.length) : 0, detail: parameter?.description ?? '', replacement: null };
};

/** The values the client knows for a parameter, or null when only the server does. */
const localValues = (parameter: ITurboCommandParameter, roomUserNames: readonly string[]): readonly string[] | null => {
    switch (kindOf(parameter)) {
        case KIND_ENUMERATION: return parameter.members;
        case KIND_BOOLEAN: return BOOLEANS;
        case KIND_DURATION: return DURATIONS;
        case KIND_ROOM_PLAYER: return roomUserNames;
    }

    return (suggestOf(parameter) === SUGGEST_SERVER) ? null : [];
};

/** The line as the binder reads it: the command typed, its arguments, and whether the last one is finished. */
const parseLine = (text: string, commands: readonly ITurboCommand[], controllerLevel: number) => {
    if (!text.startsWith(':') || (text.length < 2) || /^:\s/.test(text)) return null;

    const tokens = tokenize(text.slice(1)).map(x => ({ ...x, start: x.start + 1, end: x.end + 1 }));
    if (!tokens.length) return null;
    const endsWithSpace = /\s$/.test(text);
    const command = findCommand(commands.filter(x => usableHere(x, controllerLevel)), tokens[0].text);

    return { tokens, endsWithSpace, command };
};

export const completeChatCommand = ({ text, commands, controllerLevel, roomUserNames, serverValues, cursor = text.length }: IChatCommandCompletionInput): IChatCommandCompletion => {
    const line = parseLine(text, commands, controllerLevel);

    if (!line) return NO_CHAT_COMMAND_COMPLETION;

    const cursorIndex = Math.max(0, Math.min(cursor, text.length));
    const isBoundary = cursorIndex === 0 || /\s/.test(text[cursorIndex - 1] ?? '');
    const activeToken = isBoundary
        ? line.tokens.find(token => token.start === cursorIndex)
        : line.tokens.find(token => token.start < cursorIndex && cursorIndex <= token.end);
    const activeIndex = activeToken ? line.tokens.indexOf(activeToken) : -1;
    if (line.tokens.some(token => !token.valid || (!token.closed && token !== activeToken))) return NO_CHAT_COMMAND_COMPLETION;

    if (activeIndex === 0 && activeToken) {
        const typed = text.slice(activeToken.start, cursorIndex);
        const usable = commands.filter(x => usableHere(x, controllerLevel));
        const named = usable.flatMap(command => [ command.name, ...command.aliases ].map(name => ({ command, name })));
        const exactName = named.some(x => x.name.toLowerCase() === typed.toLowerCase());
        const seen = new Set<ITurboCommand>();
        const suggestions: IChatCommandSuggestion[] = [];

        for (const { command, name } of rankByMatch(named, x => x.name, typed)) {
            if (seen.has(command)) continue;

            seen.add(command);

            const label = (name === command.name) ? command.usage : `:${name}${command.usage.slice(command.name.length + 1)}`;
            const at = matchAt(name, typed) + 1;

            const suffix = text.slice(activeToken.end);
            const appendSpace = !suffix && !!(command.parameters.length || command.syntax?.length);
            suggestions.push({
                label,
                // A name typed from its start takes the colon with it, as the line reads.
                boldStart: (at === 1) ? 0 : at,
                boldEnd: at + typed.length,
                detail: command.description,
                replacement: `${text.slice(0, activeToken.start)}${name}${suffix || (appendSpace ? ' ' : '')}`,
                replacementCursor: activeToken.start + name.length + (appendSpace || /^\s/.test(suffix) ? 1 : 0),
            });

            if (suggestions.length >= MAX_CHAT_COMMAND_SUGGESTIONS) break;
        }

        // A name typed out in full, with nothing else it may stand for, has nothing left to offer.
        if ((suggestions.length === 1) && (cursorIndex === activeToken.end) && exactName) return NO_CHAT_COMMAND_COMPLETION;

        return { suggestions, request: null };
    }

    const command = line.command;

    if (!command) return NO_CHAT_COMMAND_COMPLETION;

    let current = activeToken;
    let branchWordCount = 0;
    let branchNeedsSeparator = false;
    let prefix = current ? tokenize(text.slice(current.start, cursorIndex))[0]?.text ?? '' : '';
    const priorTokens = line.tokens.slice(1).filter(token => token !== current && token.end <= cursorIndex);

    // Past the last parameter, or into the rest of the line, there is nothing to complete.
    const baseArguments = command.parameters.length ? command.parameters : [];
    let syntaxPath = '';
    let selectedParameters = baseArguments;
    let selectedUsage = command.usage;
    if (command.syntax?.length) {
        const priorWords = priorTokens.map(x => x.text);
        const branches = command.syntax.map(x => ({ ...x, words: x.path.split(/\s+/).filter(Boolean) })).sort((a, b) => b.words.length - a.words.length);
        const currentToken = current;
        const currentIsWholeToken = !!currentToken && (cursorIndex === currentToken.end) && currentToken.valid
            && branches.some(x => x.words[priorWords.length]?.toLowerCase() === currentToken.text.toLowerCase());
        const branchWords = [ ...priorWords ];
        if (currentIsWholeToken && current) branchWords.push(current.text);
        const branch = branches.find(x => (x.words.length <= branchWords.length) && x.words.every((word, i) => branchWords[i]?.toLowerCase() === word.toLowerCase()));
        if (branch) {
            syntaxPath = branch.path;
            selectedParameters = branch.parameters;
            selectedUsage = branch.usage;
            branchWordCount = branch.words.length;
            if (current && (cursorIndex === current.end) && (branchWordCount > priorWords.length)) {
                branchNeedsSeparator = true;
                current = undefined;
            }
        }
        const consumedWords = branch ? priorWords : branchWords;
        const consumed = branch ? branchWordCount : consumedWords.length;
        const literalPrefix = currentIsWholeToken ? '' : prefix;
        const matchingBranches = branches.filter(x => x.words.slice(0, consumed).every((word, i) => consumedWords[i]?.toLowerCase() === word.toLowerCase()));
        const nextLiterals = [ ...new Set(matchingBranches.map(x => x.words[consumed]).filter((word): word is string => !!word && word.toLowerCase().startsWith(literalPrefix.toLowerCase()))) ];
        const pathComplete = !!branch && ((branchWordCount <= priorWords.length) || (branchWordCount === branchWords.length));
        if (!pathComplete && nextLiterals.length) {
            const literalStart = currentIsWholeToken ? cursorIndex : (current?.start ?? cursorIndex);
            const literalEnd = currentIsWholeToken ? cursorIndex : (current?.end ?? cursorIndex);
            const separator = currentIsWholeToken ? ' ' : '';
            return {
                suggestions: nextLiterals.slice(0, MAX_CHAT_COMMAND_SUGGESTIONS).map(literal => ({
                    label: literal,
                    boldStart: 0,
                    boldEnd: literalPrefix.length,
                    detail: '',
                    replacement: `${text.slice(0, literalStart)}${separator}${literal} ${text.slice(literalEnd)}`,
                    replacementCursor: literalStart + separator.length + literal.length + 1,
                })),
                request: null,
            };
        }
        if (!pathComplete) {
            return NO_CHAT_COMMAND_COMPLETION;
        }
    }
    prefix = current ? tokenize(text.slice(current.start, cursorIndex))[0]?.text ?? '' : '';
    const tokenStart = current?.start ?? cursorIndex;
    const tokenEnd = current?.end ?? cursorIndex;
    const index = Math.max(0, priorTokens.length - branchWordCount);
    if ((index >= selectedParameters.length) || selectedParameters.slice(0, index).some(x => kindOf(x) === KIND_REST)) return NO_CHAT_COMMAND_COMPLETION;

    const parameter = selectedParameters[index];
    const before = `${text.slice(0, tokenStart)}${branchNeedsSeparator ? ' ' : ''}`;
    const after = text.slice(tokenEnd);
    const argumentTokens = priorTokens.slice(branchWordCount);
    const argumentText = argumentTokens.length ? text.slice(argumentTokens[0].start, argumentTokens.at(-1)!.end) : '';
    let values = localValues(parameter, roomUserNames);
    let request: IChatCommandSuggestRequest | null = null;

    if (!values) {
        const isPlayer = kindOf(parameter) === KIND_PLAYER;

        if (!isPlayer || ((prefix.length >= MIN_PLAYER_PREFIX) && !prefix.startsWith('@'))) request = { command: command.name, parameter: index, prefix, syntax: syntaxPath, argumentText };

        // The server's last answer for this parameter, narrowed to what has been typed since,
        // keeps the list steady while the next one is on its way.
        values = serverValues?.key === chatCommandSuggestKey(command.name, index, prefix, syntaxPath, argumentText) ? serverValues.values : [];

        if (isPlayer && parameter.selectors && prefix.startsWith('@')) values = SELECTORS;
    }

    const isLast = index === (selectedParameters.length - 1);
    const suggestions = rankByMatch(values, x => x, prefix)
        .slice(0, MAX_CHAT_COMMAND_SUGGESTIONS)
        .map((value) => {
            const at = Math.max(0, matchAt(value, prefix));
            const encodedValue = encodeArgument(value);
            const appendSpace = !!after && !/\s/.test(after[0]);
            const replacement = `${before}${encodedValue}${after || (isLast ? '' : ' ')}${appendSpace ? ' ' : ''}`;
            return {
                label: value,
                boldStart: at,
                boldEnd: Math.min(at + prefix.length, value.length),
                detail: '',
                replacement,
                replacementCursor: before.length + encodedValue.length + (appendSpace || (!after && !isLast) ? 1 : 0),
            };
        });

    // Nothing to offer, or only what is typed already: the usage line says what comes next.
    if (!suggestions.length || ((suggestions.length === 1) && !!current && (cursorIndex === current.end)
        && (suggestions[0].label.toLowerCase() === current.text.toLowerCase()))) {
        return { suggestions: [ usageHint(command, index, selectedUsage, selectedParameters) ], request };
    }

    return { suggestions, request };
};

/**
 * Whether a word fits a parameter as far as the client can tell: a number, a boolean, a member,
 * a duration or someone in the room. A player anywhere and a free word are the server's to judge.
 * The word still being typed only has to be the start of something that would fit.
 */
const fits = (parameter: ITurboCommandParameter, word: string, typing: boolean, roomUserNames: readonly string[]): boolean => {
    const startOf = (values: readonly string[]) => values.some(x => typing ? x.toLowerCase().startsWith(word.toLowerCase()) : (x.toLowerCase() === word.toLowerCase()));
    if (parameter.maxLength !== undefined && parameter.maxLength >= 0 && word.length > parameter.maxLength) return false;
    if (!typing && parameter.minLength !== undefined && parameter.minLength >= 0 && word.length < parameter.minLength) return false;

    switch (kindOf(parameter)) {
        case KIND_INTEGER:
        case KIND_LONG: {
            if (!(typing ? NUMBER_PREFIX : NUMBER).test(word)) return false;
            if (!word || word === '-' || word === '+') return typing;
            try {
                const value = BigInt(word);
                const min = parameter.minimum ? BigInt(parameter.minimum) : (kindOf(parameter) === KIND_INTEGER ? -2147483648n : -9223372036854775808n);
                const max = parameter.maximum ? BigInt(parameter.maximum) : (kindOf(parameter) === KIND_INTEGER ? 2147483647n : 9223372036854775807n);
                return value >= min && value <= max;
            } catch { return false; }
        }
        case KIND_BOOLEAN: return startOf(BOOLEAN_WORDS);
        case KIND_ENUMERATION: return parameter.members.some(x => typing ? x.toLowerCase().startsWith(word.toLowerCase()) : x.toLowerCase() === word.toLowerCase());
        case KIND_DURATION: {
            if (!DURATION.test(word)) return typing && DURATION_PREFIX.test(word);
            const match = /^(\d+)([mhdw])$/i.exec(word);
            if (!match) return /^(perm|permanent)$/i.test(word);
            const amount = Number(match[1]);
            const days = amount * ({ m: 1 / 1440, h: 1 / 24, d: 1, w: 7 } as Record<string, number>)[match[2].toLowerCase()];
            return amount > 0 && days <= 3650;
        }
        case KIND_ROOM_PLAYER: return startOf(roomUserNames);
    }

    return true;
};

/**
 * The arguments of a known command that the server's binder would refuse (`ArgumentsBinder.Bind`):
 * one that does not fit its parameter, and any word past the last parameter. The word still being
 * typed at the end of the line is judged as the start of a value, so typing is not marked as it
 * goes; an unknown command is chat to the server and is never marked.
 */
export const findInvalidArguments = ({ text, commands, controllerLevel, roomUserNames }: Omit<IChatCommandCompletionInput, 'serverValues'>): IChatCommandRange[] => {
    const line = parseLine(text, commands, controllerLevel);

    if (!line?.command) return [];

    const { tokens, endsWithSpace, command } = line;
    const invalid: IChatCommandRange[] = [];
    let parameters = command.parameters;
    let branchCount = 0;
    if (command.syntax?.length) {
        const words = tokens.slice(1).map(x => x.text.toLowerCase());
        const branch = command.syntax.map(x => ({ ...x, words: x.path.split(/\s+/).filter(Boolean) })).sort((a, b) => b.words.length - a.words.length)
            .find(x => x.words.every((word, index) => words[index] === word.toLowerCase()));
        if (!branch) return [];
        parameters = branch.parameters;
        branchCount = branch.words.length;
    }

    for (let i = 1 + branchCount; i < tokens.length; i++) {
        const token = tokens[i];
        const parameter = parameters[i - 1 - branchCount];
        const typing = (i === (tokens.length - 1)) && !endsWithSpace;

        if (!parameter) {
            invalid.push({ start: token.start, end: text.trimEnd().length });
            break;
        }

        if (kindOf(parameter) === KIND_REST) break;

        if (!token.valid || !token.closed) {
            invalid.push({ start: token.start, end: token.end });
            continue;
        }

        if (!fits(parameter, token.text, typing, roomUserNames)) invalid.push({ start: token.start, end: token.end });
    }

    return invalid;
};
