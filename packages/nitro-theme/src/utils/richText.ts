/**
 * Not Flash's: the HTML of module content (a news article's body, an editor's output) read into blocks
 * a `RichText` label draws - never shown or run as HTML. Only a subset is kept:
 *
 * - blocks: `p` (and `div`), `h1`-`h6`, `ul` / `ol` with their `li`, `br`, `img`;
 * - inside a block: `b` / `strong`, `i` / `em`, `u`, `a href`, and a colour from `font color` or
 *   `style="color: ..."` (`#rgb`, `#rrggbb`, `rgb(r, g, b)`), as Flash `htmlText` markup
 *   (`<b>`, `<i>`, `<u>`, `<font color>`, `<a href>`) for `ThemeText markup`;
 * - an alignment from `style="text-align: ..."` or an editor's `ql-align-center` / `ql-align-right` class.
 *
 * Every other tag is dropped and its text kept; `script`, `style`, `iframe`, `object`, `embed`,
 * `template`, `svg`, `math` and `noscript` are dropped with their text. A link is kept only when it is
 * `http(s)` or an in-client link (`event:...`); an image only when its address is on this page's
 * origin or one of `imageHosts` (an origin `https://cdn.example.com` or a host `cdn.example.com`).
 * Entities are read (`&amp;`, `&#39;`, `&#x27;`, `&nbsp;`, ...) and the text escaped again for the markup.
 *
 * Kept free of runtime imports, so a test can run it under Node.
 */

export type RichTextBlockRole = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li';

export type RichTextAlign = 'left' | 'center' | 'right';

export type RichTextBlock
    = | {
        kind: 'text';
        role: RichTextBlockRole;
        /** Flash `htmlText` markup: `<b>`, `<i>`, `<u>`, `<font color>`, `<a href>`, text escaped. */
        markup: string;
        align: RichTextAlign;
        /** How deep in lists it is: 0 outside one. */
        depth: number;
        /** A list item's marker: `•`, or `1.` in an ordered list. */
        bullet?: string;
    }
    | { kind: 'image'; src: string; alt: string; width?: number; height?: number; align: RichTextAlign };

export interface RichTextOptions {
    /** Image origins (`https://cdn.example.com`) or hosts (`cdn.example.com`) besides `baseUrl`'s own. */
    imageHosts?: readonly string[];
    /** What relative addresses resolve against, and the origin images may always come from. */
    baseUrl?: string;
}

const DROPPED_WITH_CONTENT = new Set([ 'script', 'style', 'iframe', 'object', 'embed', 'template', 'svg', 'math', 'noscript', 'head', 'title', 'textarea', 'select' ]);
const BLOCKS = new Set([ 'p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'blockquote', 'pre' ]);
const INLINE_TAGS: Record<string, string> = { b: 'b', strong: 'b', i: 'i', em: 'i', u: 'u', ins: 'u' };
const VOID_TAGS = new Set([ 'br', 'img', 'hr', 'input', 'meta', 'link', 'source', 'wbr', 'col', 'area', 'base', 'embed', 'param', 'track' ]);

const NAMED_ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: '\'', nbsp: ' ', copy: '©', reg: '®', hellip: '…', mdash: '—', ndash: '–', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', bull: '•', euro: '€', pound: '£' };

/** `&...;` entities as their characters; an unknown one stays as written. */
export const decodeHtmlEntities = (text: string): string => text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (whole, entity: string) => {
    if (entity[0] === '#') {
        const code = (entity[1] === 'x' || entity[1] === 'X') ? Number.parseInt(entity.slice(2), 16) : Number.parseInt(entity.slice(1), 10);

        return (Number.isFinite(code) && code > 0 && code <= 0x10FFFF) ? String.fromCodePoint(code) : '';
    }

    return NAMED_ENTITIES[entity.toLowerCase()] ?? whole;
});

const escapeText = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escapeAttribute = (text: string) => escapeText(text).replace(/"/g, '&quot;');

const readAttributes = (source: string): Record<string, string> => {
    const attributes: Record<string, string> = {};

    for (const match of source.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g)) {
        const name = match[1].toLowerCase();

        if (!(name in attributes)) attributes[name] = decodeHtmlEntities(match[2] ?? match[3] ?? match[4] ?? '');
    }

    return attributes;
};

/** A CSS declaration's value in a `style` attribute. */
const styleValue = (style: string | undefined, property: string): string | undefined => {
    for (const declaration of (style ?? '').split(';')) {
        const colon = declaration.indexOf(':');

        if (colon > 0 && declaration.slice(0, colon).trim().toLowerCase() === property) return declaration.slice(colon + 1).trim().toLowerCase();
    }

    return undefined;
};

/** `#rgb`, `#rrggbb` or `rgb(r, g, b)` as `#rrggbb`; anything else (a named colour, `url(...)`) is ignored. */
export const richTextColor = (value: string | undefined): string | undefined => {
    if (!value) return undefined;

    const hex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(value.trim());

    if (hex) {
        const digits = hex[1].length === 3 ? [ ...hex[1] ].map(digit => digit + digit).join('') : hex[1];

        return `#${digits.toLowerCase()}`;
    }

    const rgb = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*[\d.]+\s*)?\)$/i.exec(value.trim());

    if (!rgb) return undefined;

    return `#${rgb.slice(1, 4).map(part => Math.min(255, Number(part)).toString(16).padStart(2, '0')).join('')}`;
};

/** A link that may be followed: `http(s)` (resolved against `baseUrl`) or an in-client `event:` link. Anything else - `javascript:`, `data:` - is `undefined`. */
export const safeRichTextLink = (href: string | undefined, baseUrl?: string): string | undefined => {
    const link = href?.trim();

    if (!link) return undefined;

    if (/^event:[\w/.-]*$/i.test(link)) return link;

    try {
        const url = new URL(link, baseUrl);

        return (url.protocol === 'http:' || url.protocol === 'https:') ? url.href : undefined;
    } catch {
        return undefined;
    }
};

/** An image address on `baseUrl`'s origin or one of `hosts`, `http(s)` only. */
export const safeRichTextImage = (src: string | undefined, { imageHosts = [], baseUrl }: RichTextOptions): string | undefined => {
    if (!src?.trim()) return undefined;

    try {
        const url = new URL(src.trim(), baseUrl);

        if (url.protocol !== 'http:' && url.protocol !== 'https:') return undefined;

        const sameOrigin = !!baseUrl && new URL(baseUrl).origin === url.origin;
        const allowed = sameOrigin || imageHosts.some(host => (host.includes('://') ? host.replace(/\/+$/, '').toLowerCase() === url.origin : host.toLowerCase() === url.host));

        return allowed ? url.href : undefined;
    } catch {
        return undefined;
    }
};

const alignOf = (attributes: Record<string, string>): RichTextAlign | undefined => {
    const css = styleValue(attributes.style, 'text-align');
    const fromClass = /\bql-align-(center|right)\b/.exec(attributes.class ?? '')?.[1];
    const align = css ?? fromClass ?? attributes.align?.toLowerCase();

    return (align === 'center' || align === 'right' || align === 'left') ? align : undefined;
};

const roleOf = (tag: string): RichTextBlockRole => ((tag === 'li' || /^h[1-6]$/.test(tag)) ? tag as RichTextBlockRole : 'p');

const dimension = (value: string | undefined) => {
    const number = Number.parseInt(value ?? '', 10);

    return (Number.isFinite(number) && number > 0) ? number : undefined;
};

interface ListState {
    ordered: boolean;
    count: number;
}

/** `html` as the blocks a `RichText` draws - see the module comment for what is kept. */
export const parseRichText = (html: string, options: RichTextOptions = {}): RichTextBlock[] => {
    const blocks: RichTextBlock[] = [];
    const lists: ListState[] = [];
    // The open inline tags, innermost last: what closes when their end tag comes.
    const inline: { tag: string; open: string; close: string }[] = [];
    // The open block tags, innermost last.
    const blockStack: { tag: string; align?: RichTextAlign }[] = [];
    let markup = '';
    let pending: { role: RichTextBlockRole; align?: RichTextAlign; bullet?: string } | undefined;
    let dropUntil: string | undefined;

    const currentAlign = () => [ ...blockStack ].reverse().find(block => block.align)?.align ?? 'left';

    /** Ends the block being written, if it has any text. */
    const flush = () => {
        // Inline tags still open run on into the next block: close them here and open them there.
        const open = inline.map(entry => entry.close).reverse().join('');
        const text = markup + open;

        if (markup.replace(/<[^>]*>/g, '').trim().length) {
            blocks.push({ kind: 'text', role: pending?.role ?? 'p', markup: text.trim(), align: pending?.align ?? currentAlign(), depth: lists.length, ...(pending?.bullet && { bullet: pending.bullet }) });
        }

        markup = inline.map(entry => entry.open).join('');
        pending = undefined;
    };

    let index = 0;

    while (index < html.length) {
        const lt = html.indexOf('<', index);
        const textEnd = lt < 0 ? html.length : lt;

        if (textEnd > index) {
            if (!dropUntil) {
                const text = decodeHtmlEntities(html.slice(index, textEnd)).replace(/\s+/g, ' ');

                markup += escapeText(text);
            }

            index = textEnd;

            continue;
        }

        // A comment or a declaration: skipped whole.
        if (html.startsWith('<!--', lt)) {
            const end = html.indexOf('-->', lt + 4);

            index = end < 0 ? html.length : end + 3;

            continue;
        }

        const gt = html.indexOf('>', lt + 1);

        if (gt < 0) {
            if (!dropUntil) markup += escapeText(html.slice(lt));

            break;
        }

        const raw = html.slice(lt + 1, gt).trim();

        index = gt + 1;

        const closing = raw.startsWith('/');
        const nameMatch = /^\/?\s*([a-zA-Z][a-zA-Z0-9]*)/.exec(raw);

        if (!nameMatch) {
            if (!dropUntil && !raw.startsWith('!') && !raw.startsWith('?')) markup += escapeText(html.slice(lt, gt + 1));

            continue;
        }

        const tag = nameMatch[1].toLowerCase();

        if (dropUntil) {
            if (closing && tag === dropUntil) dropUntil = undefined;

            continue;
        }

        if (!closing && DROPPED_WITH_CONTENT.has(tag)) {
            if (!raw.endsWith('/')) dropUntil = tag;

            continue;
        }

        const attributes = closing ? {} : readAttributes(raw.slice(nameMatch[0].length));

        if (tag === 'br') {
            markup += '<br>';

            continue;
        }

        if (tag === 'img') {
            const src = safeRichTextImage(attributes.src, options);

            if (!src) continue;

            flush();
            blocks.push({ kind: 'image', src, alt: attributes.alt ?? '', width: dimension(attributes.width), height: dimension(attributes.height), align: currentAlign() });

            continue;
        }

        if (tag === 'ul' || tag === 'ol') {
            flush();

            if (closing) lists.pop();
            else lists.push({ ordered: tag === 'ol', count: 0 });

            continue;
        }

        if (BLOCKS.has(tag)) {
            flush();

            if (closing) {
                const at = blockStack.map(block => block.tag).lastIndexOf(tag);

                if (at >= 0) blockStack.length = at;

                continue;
            }

            const align = alignOf(attributes);

            blockStack.push({ tag, align });

            const list = lists.at(-1);
            const bullet = (tag === 'li' && list)
                ? ((list.ordered && attributes['data-list'] !== 'bullet') ? `${++list.count}.` : '•')
                : undefined;

            pending = { role: roleOf(tag), align: align ?? currentAlign(), bullet };

            continue;
        }

        // Inline: the kept ones as Flash markup, anything else dropped with its text kept.
        let open: string | undefined;
        let close: string | undefined;

        if (INLINE_TAGS[tag]) {
            open = `<${INLINE_TAGS[tag]}>`;
            close = `</${INLINE_TAGS[tag]}>`;
        } else if (tag === 'a') {
            const href = safeRichTextLink(attributes.href, options.baseUrl);

            if (href || closing) {
                open = href ? `<a href="${escapeAttribute(href)}"><u>` : '';
                close = href ? '</u></a>' : '';
            }
        } else if (tag === 'font' || tag === 'span') {
            const color = richTextColor(attributes.color ?? styleValue(attributes.style, 'color'));

            open = color ? `<font color="${color}">` : '';
            close = color ? '</font>' : '';
        }

        if (open === undefined || VOID_TAGS.has(tag)) continue;

        if (closing) {
            const at = inline.map(entry => entry.tag).lastIndexOf(tag);

            if (at < 0) continue;

            // Close it and whatever opened inside it, as a browser does with misnested tags.
            for (const entry of inline.splice(at).reverse()) markup += entry.close;
        } else {
            inline.push({ tag, open, close: close ?? '' });
            markup += open;
        }
    }

    flush();

    return blocks;
};
