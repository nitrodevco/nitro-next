/**
 * Hit testing a rendered text block - `TextField.getCharIndexAtPoint` and the link lookup a
 * `TextField` makes when a click lands on it, read off the layout the block was drawn from, so
 * a link answers exactly on its own glyphs. Coordinates are in the rendered bitmap's own space,
 * gutter included, as `flashTextCaret`'s are.
 */
import { FlashTextCanvas } from './flashTextCanvas';
import { FlashTextRenderer } from './FlashTextRenderer';

/**
 * `getCharIndexAtPoint`: the index, in the block's text, of the character whose box holds the
 * point - its line's band, its advance across - or -1 when the point is on none (the gutter, past
 * a line's end, below the last line).
 */
export const flashTextCharIndexAtPoint = ({ lineLayout, lineOffsets, lineHeight, gutter }: FlashTextCanvas, x: number, y: number): number => {
    if (y < gutter || lineHeight <= 0) return -1;

    const lineIndex = Math.floor((y - gutter) / lineHeight);
    const line = lineLayout[lineIndex];

    if (!line) return -1;

    const lineX = x - gutter - lineOffsets[lineIndex];
    let index = line.start;

    for (const segment of line.segments) {
        if (lineX >= segment.x && lineX < segment.x + segment.width) {
            const positions = FlashTextRenderer.measureCharPositions(segment.text, segment.format);

            if (!positions) return -1;

            const segmentX = lineX - segment.x;

            for (let column = 0; column < segment.text.length; column++) {
                if (segmentX >= positions[column] && segmentX < positions[column + 1]) return index + column;
            }

            return -1;
        }

        index += segment.text.length;
    }

    return -1;
};

/**
 * The `href` of the `<a>` whose glyphs hold the point, or `undefined` - what a Flash `TextField`
 * resolves a click on it to before it dispatches the link.
 */
export const flashTextLinkAtPoint = (rendered: FlashTextCanvas, x: number, y: number): string | undefined => {
    if (!rendered.links?.length) return undefined;

    const index = flashTextCharIndexAtPoint(rendered, x, y);

    if (index < 0) return undefined;

    return rendered.links.find(link => (index >= link.start) && (index < link.end))?.href;
};
