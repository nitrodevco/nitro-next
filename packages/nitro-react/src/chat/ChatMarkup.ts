/**
 * A port of the Flash `ChatMarkup` (`freeflowchat/viewer/enum/ChatMarkup.as`): the chat's own
 * colour markup, turned into the html the bubble's text field takes.
 *
 * - `applyChatColourToChat`: a message starting `@red@` (or cyan, blue, green, purple) is wrapped
 *   in that colour, prefix and one following space dropped. Every style gets this.
 * - `applyChatMarkupToElements`: `[b]`, `[i]`, `[u]` and `[red]`...`[/red]` pairs become tags.
 *   Only notification styles get this (`HabboFreeFlowChat.fixHtml`).
 *
 * Both pick their palette from the style's text colour: a style that writes white text
 * (`0xFFFFFF`) gets the lighter `CHAT_COLOURS_ON_DARK`, so a red on a dark bubble stays legible.
 */

/** `ChatMarkup.COLOUR_ARRAY`. */
export const CHAT_COLOURS: [string, number][] = [
    [ 'red', 9115929 ],
    [ 'cyan', 32639 ],
    [ 'blue', 19609 ],
    [ 'green', 32768 ],
    [ 'purple', 4980812 ],
];

/** The obfuscated second `ChatMarkup` array - the palette for styles whose text colour is white. */
export const CHAT_COLOURS_ON_DARK: [string, number][] = [
    [ 'red', 16738922 ],
    [ 'cyan', 5233370 ],
    [ 'blue', 6269183 ],
    [ 'green', 6738794 ],
    [ 'purple', 11767039 ],
];

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

/**
 * `ChatMarkup.applyToElements`: a closing tag that matches the innermost open one turns the
 * pair into html; anything unmatched - an unknown tag, a close without its open - stays as typed.
 */
export const applyChatMarkupToElements = (text: string, textColor: number): string => {
    if (text.length === 0) return '';

    const tokens = tokenizeChatMarkup(text);
    const open: { tag: string; index: number }[] = [];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if ((token.charAt(0) !== '[') || (token.charAt(token.length - 1) !== ']')) continue;
        if ((token.charAt(1) !== '/') && !((token.length > 2) && (token.length <= 10))) continue;

        let tag = token.substring(1, token.length - 1).toLowerCase();

        if (tag.charAt(0) === '/') {
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
