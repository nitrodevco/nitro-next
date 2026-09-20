/**
 * The subset of Flash `htmlText` the client put into text fields - `<b>`, `<i>`, `<u>`,
 * `<font color="#rrggbb" size="n">` and `<br>` - turned into format runs for `renderTextBlock`.
 *
 * Any other tag is dropped and its content kept, the way a Flash `TextField` without a style
 * sheet shows it: `<a href="event:...">` (the localizations' links, e.g.
 * `wiredrewards.earnings`), `<span>`, `<textformat>`; `</p>` ends a line. A `<` that does not
 * open a tag (`<3`) stays text.
 */
import { FlashTextRun } from './flashTextBlock';
import { FlashTextFormat } from './flashTextFormat';

const TOKEN = /<(\/?)(b|i|u|font)\b([^>]*)>|<br\s*\/?>|<(\/?)([a-z][a-z0-9]*)\b[^>]*>|[^<]+|</gi;
const ENTITIES: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': '\'' };

const decodeEntities = (text: string): string => text.replace(/&(?:amp|lt|gt|quot|apos);/g, entity => ENTITIES[entity]);

/** Splits `markup` into runs; an unknown tag's text is kept, the tag itself dropped. */
export const parseFlashTextMarkup = (markup: string, baseFormat: FlashTextFormat): FlashTextRun[] => {
    const runs: FlashTextRun[] = [];
    const stack: FlashTextFormat[] = [ baseFormat ];

    const append = (text: string): void => {
        const format = stack[stack.length - 1];
        const previous = runs[runs.length - 1];

        if (previous && previous.format === format) previous.text += text;
        else if (text.length) runs.push({ text, format });
    };

    for (const match of markup.matchAll(TOKEN)) {
        const [ token, closing, tag, attributes, otherClosing, otherTag ] = match;

        if (otherTag) {
            if (otherClosing && (otherTag.toLowerCase() === 'p')) append('\n');

            continue;
        }

        if (!tag) {
            append(/^<br/i.test(token) ? '\n' : decodeEntities(token));

            continue;
        }

        if (closing) {
            if (stack.length > 1) stack.pop();

            continue;
        }

        const current = stack[stack.length - 1];
        const name = tag.toLowerCase();

        if (name === 'b') stack.push({ ...current, bold: true });
        else if (name === 'i') stack.push({ ...current, italic: true });
        else if (name === 'u') stack.push({ ...current, underline: true });
        else {
            const color = /color\s*=\s*["']?#?([0-9a-f]{6})/i.exec(attributes ?? '');
            const size = /size\s*=\s*["']?(\d+)/i.exec(attributes ?? '');

            stack.push({
                ...current,
                ...(color ? { color: Number.parseInt(color[1], 16) } : {}),
                ...(size ? { fontSize: Number.parseInt(size[1], 10) } : {}),
            });
        }
    }

    return runs;
};
