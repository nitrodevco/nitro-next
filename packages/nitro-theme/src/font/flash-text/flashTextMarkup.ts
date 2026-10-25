/**
 * The Flash `htmlText` the client put into text fields, turned into format runs for
 * `renderTextBlock` - what a `formatted_text` / `html` window shows (`FormattedTextController`
 * and `HTMLTextController` set `field.htmlText`), and the localizations that carry markup.
 *
 * Understood, the way a `TextField` without a style sheet renders them:
 * - `<b>` / `<strong>`, `<i>` / `<em>`, `<u>`;
 * - `<font color="#rrggbb" size="n" face="...">` - `face` through the caller's `resolveFace`,
 *   since a face name only renders exactly when it is one of the captured faces;
 * - `<br>`, and `<p>` paragraphs: each paragraph starts on its own line, and the last one
 *   adds no empty line after itself (`<p>a</p><p>b</p>` is two lines, as in Flash);
 * - the entities `&amp; &lt; &gt; &quot; &apos; &nbsp;` and numeric `&#39;` / `&#x27;`.
 *   `&nbsp;` becomes a plain space.
 *
 * `<a href="...">` (the localizations' links, e.g. `wiredrewards.earnings`) draws as the text
 * around it - a `TextField` with no style sheet gives a link no look of its own - and is recorded
 * as a `FlashTextLink`: its `href` and the range of the text it covers, which is what the field's
 * link hit test (`flashTextLinkAtPoint`) reads. A link does not split the text into runs of its
 * own, so the glyphs lay out exactly as they do without it.
 *
 * Any other tag is dropped and its content kept: `<span>`, `<textformat>`, `<li>`. A `<` that
 * does not open a tag (`<3`) stays text. `<p align>` is not carried: the block has one alignment.
 *
 * With a `styleSheet` (`TextField.styleSheet`) a tag's selector and its `class` attribute's selector
 * format the text inside it (`<h1>`, `<a>`, `<p class="bullet-item">`), and the headings `<h1>` to
 * `<h6>` are paragraphs as `<p>` is - inferred from the HTML defaults: a habbo page's headings stand
 * on lines of their own.
 */
import { FlashTextRun } from './flashTextBlock';
import { FlashTextFormat } from './flashTextFormat';
import { FlashTextStyleSheet } from './flashTextStyleSheet';

const TOKEN = /<(\/?)(b|strong|i|em|u|font)\b([^>]*)>|<br\s*\/?>|<(\/?)([a-z][a-z0-9]*)\b[^>]*>|[^<]+|</gi;
const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: '\'', nbsp: ' ' };

const decodeEntities = (text: string): string => text.replace(/&(?:(amp|lt|gt|quot|apos|nbsp)|#(\d+)|#x([0-9a-f]+));/gi, (entity, name: string | undefined, decimal: string | undefined, hex: string | undefined) => {
    if (name) return ENTITIES[name.toLowerCase()];

    const code = decimal ? Number.parseInt(decimal, 10) : Number.parseInt(hex ?? '', 16);

    if (code === 0xa0) return ' ';

    return (Number.isFinite(code) && code > 0 && code <= 0x10ffff) ? String.fromCodePoint(code) : entity;
});

const attribute = (attributes: string, name: string): string | undefined => {
    const match = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i').exec(attributes);

    return match ? (match[1] ?? match[2] ?? match[3]) : undefined;
};

/** An `<a href>` of the markup: the text `[start, end)` of the runs' joined text is its link. */
export interface FlashTextLink {
    href: string;
    start: number;
    end: number;
}

export interface FlashTextMarkupOptions {
    /** The format a `<font face="...">` switches to; the face is ignored when this is absent or returns nothing. */
    resolveFace?: (face: string) => Partial<FlashTextFormat> | undefined;
    /** The field's style sheet (`parseFlashStyleSheet`): what its tag and class selectors format. */
    styleSheet?: FlashTextStyleSheet;
}

const HEADING_TAGS = new Set([ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6' ]);

/** The format a style sheet gives an element: its tag's selector, then its class's over it. */
const styleOf = (styleSheet: FlashTextStyleSheet, tag: string, token: string): Partial<FlashTextFormat> | undefined => {
    const className = attribute(token, 'class')?.trim().toLowerCase();
    const byTag = styleSheet[tag];
    const byClass = className ? styleSheet[`.${className}`] : undefined;

    return (byTag || byClass) ? { ...byTag, ...byClass } : undefined;
};

/** Splits `markup` into runs and its links; an unknown tag's text is kept, the tag itself dropped. */
export const parseFlashTextMarkupWithLinks = (markup: string, baseFormat: FlashTextFormat, options: FlashTextMarkupOptions = {}): { runs: FlashTextRun[]; links: FlashTextLink[] } => {
    const runs: FlashTextRun[] = [];
    const links: FlashTextLink[] = [];
    const stack: FlashTextFormat[] = [ baseFormat ];
    /** The `<a>` elements open around the text being read, innermost last. */
    const openLinks: FlashTextLink[] = [];
    /** The elements the style sheet formats, open around the text being read: each one's tag and the `stack` depth it pushed from. */
    const openStyled: { tag: string; depth: number }[] = [];
    const { styleSheet } = options;
    let length = 0;
    let hasText = false;
    let paragraphEnded = false;

    const push = (text: string): void => {
        const format = stack[stack.length - 1];
        const previous = runs[runs.length - 1];

        if (previous && previous.format === format) previous.text += text;
        else if (text.length) runs.push({ text, format });

        length += text.length;

        if (text.length) hasText = true;
    };

    /** Text after a closed paragraph starts a new line first. */
    const append = (text: string): void => {
        if (!text.length) return;

        if (paragraphEnded) {
            paragraphEnded = false;
            push('\n');
        }

        push(text);
    };

    for (const match of markup.matchAll(TOKEN)) {
        const [ token, closing, tag, attributes, otherClosing, otherTag ] = match;

        if (otherTag) {
            const otherName = otherTag.toLowerCase();

            if (styleSheet) {
                if (!otherClosing) {
                    const style = styleOf(styleSheet, otherName, token);

                    if (style) {
                        openStyled.push({ tag: otherName, depth: stack.length });
                        stack.push({ ...stack[stack.length - 1], ...style });
                    }
                } else if (openStyled[openStyled.length - 1]?.tag === otherName) {
                    stack.length = openStyled.pop()!.depth;
                }
            }

            if (otherName === 'a') {
                if (!otherClosing) {
                    openLinks.push({ href: decodeEntities(attribute(token, 'href') ?? ''), start: length, end: length });
                } else {
                    const link = openLinks.pop();

                    if (link) {
                        link.end = length;

                        if (link.href.length && (link.end > link.start)) links.push(link);
                    }
                }

                continue;
            }

            if ((otherName === 'p') || (styleSheet && HEADING_TAGS.has(otherName))) {
                if (otherClosing) paragraphEnded = hasText;
                else if (hasText && !paragraphEnded && !runs[runs.length - 1]?.text.endsWith('\n')) paragraphEnded = true;
            }

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

        if (name === 'b' || name === 'strong') stack.push({ ...current, bold: true });
        else if (name === 'i' || name === 'em') stack.push({ ...current, italic: true });
        else if (name === 'u') stack.push({ ...current, underline: true });
        else {
            const color = /^#?([0-9a-f]{6})$/i.exec(attribute(attributes ?? '', 'color') ?? '');
            const size = /^(\d+)$/.exec(attribute(attributes ?? '', 'size') ?? '');
            const faceName = attribute(attributes ?? '', 'face');
            const face = faceName ? options.resolveFace?.(faceName) : undefined;

            stack.push({
                ...current,
                ...(face ?? {}),
                ...(color ? { color: Number.parseInt(color[1], 16) } : {}),
                ...(size ? { fontSize: Number.parseInt(size[1], 10) } : {}),
            });
        }
    }

    // A link left open runs to the end of the text, as an unclosed element does in `htmlText`.
    for (const link of openLinks) {
        link.end = length;

        if (link.href.length && (link.end > link.start)) links.push(link);
    }

    return { runs, links };
};

/** Splits `markup` into runs; an unknown tag's text is kept, the tag itself dropped. */
export const parseFlashTextMarkup = (markup: string, baseFormat: FlashTextFormat, options: FlashTextMarkupOptions = {}): FlashTextRun[] => parseFlashTextMarkupWithLinks(markup, baseFormat, options).runs;
