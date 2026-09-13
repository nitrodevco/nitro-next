import { createTransparentBitmap, disposeBitmap, VariableFxBitmap } from '../../rendering/VariableFxBitmap';
import { VariableFxBitmapComposer } from '../../rendering/VariableFxBitmapComposer';
import { VariableFxClipRect } from '../../rendering/VariableFxClipRect';

interface Glyph {
    sourceX: number;
    width: number;
}

interface RenderPlanPart {
    text: string;
    width: number;
}

export interface LevelDetailsNumberRenderPlan {
    key: string;
    parts: RenderPlanPart[];
    width: number;
}

const GLYPH_HEIGHT = 9;
const GLYPH_SPACING_X = -1;
const ELLIPSIS = '...';

const GLYPHS: Record<string, Glyph> = {
    0: { sourceX: 0, width: 7 },
    1: { sourceX: 8, width: 4 },
    2: { sourceX: 13, width: 7 },
    3: { sourceX: 21, width: 7 },
    4: { sourceX: 29, width: 7 },
    5: { sourceX: 37, width: 7 },
    6: { sourceX: 45, width: 7 },
    7: { sourceX: 53, width: 7 },
    8: { sourceX: 61, width: 7 },
    9: { sourceX: 69, width: 7 },
    '/': { sourceX: 77, width: 12 },
    '...': { sourceX: 90, width: 8 },
};

/** Paints the small "current/max" text under the level-details bar, truncating with an ellipsis when it does not fit. */
export class LevelDetailsNumberPainter {
    private _numbers: VariableFxBitmap;
    private _textBitmaps: Map<string, VariableFxBitmap> = new Map();

    constructor(numbers: VariableFxBitmap) {
        this._numbers = numbers;
    }

    public createRenderPlan(currentText: string, maxText: string, availableWidth: number): LevelDetailsNumberRenderPlan {
        const width = Math.max(0, availableWidth);
        const full = this.createPlan(`full:${currentText}/${maxText}`, [ currentText, '/', maxText ]);

        if (full.width <= width) return full;

        const current = this.createPlan(`current:${currentText}`, [ currentText ]);

        if (current.width <= width) return current;

        return this.createTruncatedCurrentPlan(currentText, width);
    }

    public draw(composer: VariableFxBitmapComposer, plan: LevelDetailsNumberRenderPlan, x: number, y: number): void {
        let cursor = x;

        for (const part of plan.parts) {
            composer.drawLayer(this.getTextBitmap(part.text), cursor, y, 'normal', 255);

            cursor += Math.trunc(part.width) + GLYPH_SPACING_X;
        }
    }

    public dispose(): void {
        for (const bitmap of this._textBitmaps.values()) disposeBitmap(bitmap);

        this._textBitmaps.clear();
    }

    private createTruncatedCurrentPlan(currentText: string, availableWidth: number): LevelDetailsNumberRenderPlan {
        for (let length = currentText.length; length > 0; length--) {
            const prefix = currentText.substr(0, length);
            const plan = this.createPlan(`truncated:${prefix}${ELLIPSIS}`, [ prefix, ELLIPSIS ]);

            if (plan.width <= availableWidth) return plan;
        }

        const ellipsis = this.createPlan(`truncated:${ELLIPSIS}`, [ ELLIPSIS ]);

        return ellipsis.width <= availableWidth ? ellipsis : { key: 'empty', parts: [], width: 0 };
    }

    private createPlan(key: string, texts: string[]): LevelDetailsNumberRenderPlan {
        const parts: RenderPlanPart[] = [];

        for (const text of texts) {
            if (text.length > 0) parts.push({ text, width: this.measureText(text) });
        }

        return { key, parts, width: this.measureParts(parts) };
    }

    private measureParts(parts: RenderPlanPart[]): number {
        let width = 0;

        for (const part of parts) width += Math.trunc(part.width);

        return parts.length === 0 ? 0 : width + GLYPH_SPACING_X * (parts.length - 1);
    }

    private measureText(text: string): number {
        const glyphs = this.resolveGlyphs(text);

        if (!glyphs.length) return 0;

        let width = 0;

        for (const glyph of glyphs) width += Math.trunc(glyph.width);

        return width + GLYPH_SPACING_X * (glyphs.length - 1);
    }

    private getTextBitmap(text: string): VariableFxBitmap {
        const existing = this._textBitmaps.get(text);

        if (existing) return existing;

        const bitmap = createTransparentBitmap(Math.max(1, this.measureText(text)), GLYPH_HEIGHT);
        const composer = new VariableFxBitmapComposer(bitmap);

        composer.clear(0);

        this.drawTextGlyphs(composer, text, 0, 0);

        this._textBitmaps.set(text, bitmap);

        return bitmap;
    }

    private drawTextGlyphs(composer: VariableFxBitmapComposer, text: string, x: number, y: number): void {
        let cursor = x;

        for (const glyph of this.resolveGlyphs(text)) {
            composer.drawLayer(this._numbers, cursor - Math.trunc(glyph.sourceX), y, 'normal', 255, new VariableFxClipRect(cursor, y, glyph.width, GLYPH_HEIGHT));

            cursor += Math.trunc(glyph.width) + GLYPH_SPACING_X;
        }
    }

    private resolveGlyphs(text: string): Glyph[] {
        const glyphs: Glyph[] = [];

        let index = 0;

        while (index < text.length) {
            if (text.substr(index, 3) === ELLIPSIS) {
                glyphs.push(GLYPHS[ELLIPSIS]);

                index += 3;

                continue;
            }

            const glyph = GLYPHS[text.charAt(index)];

            if (glyph) glyphs.push(glyph);

            index++;
        }

        return glyphs;
    }
}
