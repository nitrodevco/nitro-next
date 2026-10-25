/**
 * A Flash `StyleSheet` (`flash.text.StyleSheet.parseCSS`) as the markup parser reads it: the format
 * each selector gives the text it covers - a tag's (`h1`, `p`, `a`) or a class's (`.bullet-item`, put
 * on a tag with `class="..."`). What `HabboPagesViewer` sets on its `content` field from its embedded
 * `habbopedia_css`.
 *
 * Read, per selector: `color`, `font-size`, `font-weight`, `font-style` and `text-decoration`. The
 * paragraph properties (`leading`, `margin-left`, `text-indent`) are not carried: the text block has
 * one leading and no indents.
 */
import { FlashTextFormat } from './flashTextFormat';

export type FlashTextStyleSheet = Readonly<Record<string, Partial<FlashTextFormat>>>;

const RULE = /([^{}]+)\{([^}]*)\}/g;

/** One rule's declarations as the format they give. */
const formatOf = (declarations: string): Partial<FlashTextFormat> => {
    const format: Partial<FlashTextFormat> = {};

    for (const declaration of declarations.split(';')) {
        const colon = declaration.indexOf(':');

        if (colon < 0) continue;

        const name = declaration.slice(0, colon).trim().toLowerCase();
        const value = declaration.slice(colon + 1).trim().toLowerCase();

        switch (name) {
            case 'color': {
                const hex = /^#([0-9a-f]{6})$/.exec(value);

                if (hex) format.color = Number.parseInt(hex[1], 16);

                break;
            }
            case 'font-size': {
                const size = /^(\d+)(px)?$/.exec(value);

                if (size) format.fontSize = Number.parseInt(size[1], 10);

                break;
            }
            case 'font-weight':
                format.bold = value === 'bold';
                break;
            case 'font-style':
                format.italic = value === 'italic';
                break;
            case 'text-decoration':
                format.underline = value === 'underline';
                break;
        }
    }

    return format;
};

/** `StyleSheet.parseCSS`: every selector of `css` (lower case, a class with its `.`) and its format. */
export const parseFlashStyleSheet = (css: string): FlashTextStyleSheet => {
    const sheet: Record<string, Partial<FlashTextFormat>> = {};

    for (const [ , selectors, declarations ] of css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(RULE)) {
        const format = formatOf(declarations);

        for (const selector of selectors.split(',')) {
            const name = selector.trim().toLowerCase();

            if (name) sheet[name] = { ...sheet[name], ...format };
        }
    }

    return sheet;
};
