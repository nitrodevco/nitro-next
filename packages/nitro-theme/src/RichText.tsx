import { TextStyleOptions } from 'pixi.js';
import { useMemo } from 'react';

import { Box, BoxLayout } from './Box';
import { useTextureFromUrl } from './hooks/usePixiTexture';
import { ThemeImage } from './ThemeImage';
import { ThemeText } from './ThemeText';
import { parseRichText, RichTextAlign, RichTextBlock, RichTextBlockRole, TextStyleKey } from './utils';

/** A heading's size over the text's, by level; `h4`-`h6` are the text's own size, bold. */
const HEADING_GROWTH: Partial<Record<RichTextBlockRole, number>> = { h1: 8, h2: 5, h3: 2 };

export interface RichTextProps {
    /** The HTML: read into blocks of the subset `parseRichText` keeps, never drawn or run as HTML. */
    html: string;
    /** The width the text wraps at and the pictures are scaled down to. */
    width: number;
    textStyle?: TextStyleKey;
    /** The face, size and colour of the text (`fontFamily`, `fontSize`, `fill`); headings are bold and larger. */
    textOptions?: TextStyleOptions;
    /** Image origins (`https://cdn.example.com`) or hosts besides the page's own; any other picture is left out. */
    imageHosts?: readonly string[];
    /** What relative links and pictures resolve against: the page's address unless given. */
    baseUrl?: string;
    /** A click on a link's glyphs (an `http(s)` address or an in-client `event:` link) - exact (Flash face) text only. */
    onLink?: (link: string) => void;
    /** The gap between blocks, in pixels. */
    blockSpacing?: number;
    /** How far a list item is indented per level, in pixels. */
    listIndent?: number;
    layout?: BoxLayout;
}

const alignItems = (align: RichTextAlign) => (align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start');

const RichTextImage = ({ block, width }: { block: Extract<RichTextBlock, { kind: 'image' }>; width: number }) => {
    const texture = useTextureFromUrl(block.src);
    const natural = texture ? { width: texture.width, height: texture.height } : undefined;
    const wanted = block.width ?? natural?.width;
    const shown = wanted ? Math.min(wanted, width) : undefined;
    const ratio = (natural && shown) ? shown / natural.width : 1;
    const height = block.height ? Math.round(block.height * (shown && block.width ? shown / block.width : 1)) : (natural ? Math.round(natural.height * ratio) : undefined);

    if (!texture || !shown || !height) return null;

    return (
        <Box layout={{ width, flexDirection: 'column', alignItems: alignItems(block.align), flexShrink: 0 }}>
            <ThemeImage
                texture={texture}
                width={shown}
                height={height}
                stretch
            />
        </Box>
    );
};

/**
 * Not Flash's: a label for module content written as HTML - a news article's body. The HTML is read
 * into blocks (`parseRichText`: paragraphs, headings, lists, line breaks, pictures from allowed hosts,
 * bold, italic, underline, colour, safe links) and each text block drawn as `ThemeText` markup, so it
 * renders in the hotel's faces like any other text and nothing of it ever runs.
 */
export const RichText = ({ html, width, textStyle, textOptions, imageHosts, baseUrl, onLink, blockSpacing = 6, listIndent = 14, layout }: RichTextProps) => {
    const pageUrl = baseUrl ?? ((typeof location !== 'undefined') ? location.href : undefined);
    const blocks = useMemo(() => parseRichText(html, { imageHosts, baseUrl: pageUrl }), [ html, imageHosts, pageUrl ]);
    const baseSize = (typeof textOptions?.fontSize === 'number') ? textOptions.fontSize : undefined;

    return (
        <Box layout={{ width, flexDirection: 'column', gap: blockSpacing, ...layout }}>
            {blocks.map((block, index) => {
                if (block.kind === 'image') return (
                    <RichTextImage
                        key={index}
                        block={block}
                        width={width}
                    />
                );

                const indent = block.depth * listIndent;
                const heading = block.role.startsWith('h');
                const growth = HEADING_GROWTH[block.role] ?? 0;
                const options: TextStyleOptions = {
                    ...textOptions,
                    ...((growth && baseSize) ? { fontSize: baseSize + growth } : {}),
                    align: block.align,
                    wordWrap: true,
                    wordWrapWidth: Math.max(1, width - indent),
                };

                return (
                    <Box
                        key={index}
                        layout={{ width, flexDirection: 'row', paddingLeft: block.bullet ? Math.max(0, indent - listIndent) : 0, flexShrink: 0 }}
                    >
                        {block.bullet && (
                            <Box layout={{ width: listIndent, flexShrink: 0 }}>
                                <ThemeText
                                    text={block.bullet}
                                    textStyle={textStyle}
                                    textOptions={textOptions}
                                />
                            </Box>
                        )}
                        <ThemeText
                            text={heading ? `<b>${block.markup}</b>` : block.markup}
                            markup
                            textStyle={textStyle}
                            textOptions={options}
                            onLink={onLink}
                            layout={{ width: Math.max(1, width - indent) }}
                        />
                    </Box>
                );
            })}
        </Box>
    );
};

RichText.displayName = 'RichText';
