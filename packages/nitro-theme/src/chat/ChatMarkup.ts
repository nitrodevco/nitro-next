/**
 * A port of the Flash `ChatMarkup` (`freeflowchat/viewer/enum/ChatMarkup.as`): the chat's own
 * colour markup, turned into the html the bubble's text field takes.
 *
 * - `applyChatColourToChat`: a message starting `@red@` (or any other colour of the palette) is
 *   wrapped in that colour, prefix and one following space dropped. Every style gets this.
 * - `applyChatMarkupToElements`: `[b]`, `[i]`, `[u]` and `[red]`...`[/red]` pairs become tags, and
 *   with table tabs on, every `[a]` becomes `CHAT_TABLE_TAB_MARKER` (laid out by `ChatTabLayout`).
 *   Only notification styles get this (`HabboFreeFlowChat.fixHtml`).
 *
 * Both pick their palette from the style's text colour: a style that writes white text
 * (`0xFFFFFF`) gets the lighter `CHAT_COLOURS_ON_DARK`, so a red on a dark bubble stays legible.
 */

/** `ChatMarkup.COLOUR_ARRAY` (eight colours since WIN63-202610121624). */
export const CHAT_COLOURS: [string, number][] = [
    [ 'red', 9115929 ],
    [ 'orange', 10238720 ],
    [ 'yellow', 7297792 ],
    [ 'green', 32768 ],
    [ 'cyan', 32639 ],
    [ 'blue', 19609 ],
    [ 'purple', 4980812 ],
    [ 'pink', 10228827 ],
];

/** The obfuscated second `ChatMarkup` array - the palette for styles whose text colour is white. */
export const CHAT_COLOURS_ON_DARK: [string, number][] = [
    [ 'red', 16745861 ],
    [ 'orange', 16751445 ],
    [ 'yellow', 16769126 ],
    [ 'green', 6738794 ],
    [ 'cyan', 5233370 ],
    [ 'blue', 7057151 ],
    [ 'purple', 12688127 ],
    [ 'pink', 16745919 ],
];

/** `ChatMarkup.TABLE_TAB_MARKER`: what an `[a]` becomes, for `ChatTabLayout` to turn into a column stop. */
export const CHAT_TABLE_TAB_MARKER = '<chat-table-tab/>';

/** `ChatMarkup.ESCAPED_TABLE_TAB_MARKER`. */
const ESCAPED_CHAT_TABLE_TAB_MARKER = '&lt;chat-table-tab/&gt;';

/** `ChatMarkup.TABLE_TAB_TAG`. */
const TABLE_TAB_TAG = 'a';

/** `ChatMarkup.COLOUR_NAMES` - the tag names `[red]`... that open a colour, whichever palette applies. */
const CHAT_COLOUR_NAMES = CHAT_COLOURS.map(([ name ]) => name);

/** `getColourArray`. */
const getColourArray = (textColor: number): [string, number][] => ((textColor === 0xFFFFFF) ? CHAT_COLOURS_ON_DARK : CHAT_COLOURS);

/**
 * `"#" + colour.toString(16).toUpperCase()`, padded to six digits: Flash wrote `#4C99` and its
 * html parser read the number 0x004C99; the port's markup parser only reads a full `#rrggbb`.
 */
const toFlashHex = (color: number): string => `#${color.toString(16).toUpperCase().padStart(6, '0')}`;

/** `getHexColorForTag`. */
const getHexColorForTag = (tag: string, textColor: number): string | undefined => {
    const colour = getColourArray(textColor).find(([ name ]) => (name === tag));

    return colour ? toFlashHex(colour[1]) : undefined;
};

/** `ChatMarkup.applyColourToChat`: the first matching `@colour@` prefix wraps the rest of the text in a `<font color>`. */
export const applyChatColourToChat = (text: string, textColor: number): string => {
    for (const [ name, color ] of getColourArray(textColor)) {
        if (text.indexOf(`@${name}@`) !== 0) continue;

        let rest = text.substring(name.length + 2);

        if (rest.charAt(0) === ' ') rest = rest.substring(1);

        return `<font color="${toFlashHex(color)}">${rest}</font>`;
    }

    return text;
};

/** `ChatMarkup.tokenize`: splits the text into `[...]` tokens and the runs between them. */
export const tokenizeChatMarkup = (text: string): string[] => {
    const tokens: string[] = [];
    let current = '';
    let inTag = false;

    for (const char of text) {
        if (char === '[') {
            if (current.length > 0) {
                tokens.push(current);
                current = '';
            }

            inTag = true;
            current += char;
        } else if ((char === ']') && inTag) {
            current += char;
            tokens.push(current);
            current = '';
            inTag = false;
        } else {
            current += char;
        }
    }

    if (current.length > 0) tokens.push(current);

    return tokens;
};

/** `ChatMarkup.isMarkupToken`: `[...]` of 3 to 10 characters, or any closing `[/...]`. */
const isMarkupToken = (token: string): boolean => (token.charAt(0) === '[') && (token.charAt(token.length - 1) === ']') && ((token.charAt(1) === '/') || ((token.length > 2) && (token.length <= 10)));

/** `ChatMarkup.isOpeningTableTabToken`: `[a]`, any case. */
const isOpeningTableTabToken = (token: string): boolean => isMarkupToken(token) && (token.charAt(1) !== '/') && (token.substring(1, token.length - 1).toLowerCase() === TABLE_TAB_TAG);

/** `ChatMarkup.hasTableTabMarkup`: whether the text has an `[a]` to lay out as columns. */
export const hasChatTableTabMarkup = (text: string): boolean => tokenizeChatMarkup(text).some(isOpeningTableTabToken);

/** `ChatMarkup.escapeTableTabMarker`: a typed marker must not become a column stop. */
export const escapeChatTableTabMarker = (text: string): string => text.split(CHAT_TABLE_TAB_MARKER).join(ESCAPED_CHAT_TABLE_TAB_MARKER);

/** `ChatMarkup`'s two whitespace patterns, `/[ \t]+$/` and `/^[ \t]+/`. */
const TRAILING_HORIZONTAL_SPACE = /[ \t]+$/;
const LEADING_HORIZONTAL_SPACE = /^[ \t]+/;

/** `ChatMarkup.trimHorizontalWhitespaceAroundTab`: spaces and tabs either side of an `[a]` go. */
const trimHorizontalWhitespaceAroundTab = (tokens: string[], index: number): void => {
    if (index > 0) tokens[index - 1] = tokens[index - 1].replace(TRAILING_HORIZONTAL_SPACE, '');
    if ((index + 1) < tokens.length) tokens[index + 1] = tokens[index + 1].replace(LEADING_HORIZONTAL_SPACE, '');
};

/**
 * `ChatMarkup.applyToElements`: a closing tag that matches the innermost open one turns the
 * pair into html; anything unmatched - an unknown tag, a close without its open - stays as typed.
 * With `tableTabs` (`ChatItem.tableTabMarkupEnabled`), every `[a]` becomes the table tab marker.
 */
export const applyChatMarkupToElements = (text: string, textColor: number, tableTabs: boolean = false): string => {
    if (text.length === 0) return '';

    if (tableTabs) text = escapeChatTableTabMarker(text);

    const tokens = tokenizeChatMarkup(text);
    const open: { tag: string; index: number }[] = [];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (!isMarkupToken(token)) continue;

        let tag = token.substring(1, token.length - 1).toLowerCase();

        if (tableTabs && isOpeningTableTabToken(token)) {
            trimHorizontalWhitespaceAroundTab(tokens, i);
            tokens[i] = CHAT_TABLE_TAB_MARKER;
        } else if (tag.charAt(0) === '/') {
            tag = tag.substring(1);

            if (!open.length || (open[open.length - 1].tag !== tag)) continue;

            const opened = open.pop();

            if (!opened) continue;

            if ((tag === 'b') || (tag === 'i') || (tag === 'u')) {
                tokens[opened.index] = `<${tag}>`;
                tokens[i] = `</${tag}>`;
            } else {
                const color = getHexColorForTag(tag, textColor);

                if (color !== undefined) {
                    tokens[opened.index] = `<font color="${color}">`;
                    tokens[i] = '</font>';
                }
            }
        } else if ((tag === 'b') || (tag === 'i') || (tag === 'u') || CHAT_COLOUR_NAMES.includes(tag)) {
            open.push({ tag, index: i });
        }
    }

    return tokens.join('');
};
