export type BitmapTextRecipe =
    | 'regular-12'
    | 'bold-12'
    | 'bold-14'
    | 'bold-18'
    | 'bold-italic-12';

export type BitmapGlyph = {
    x: number;
    y: number;
    width: number;
    height: number;
    xOffset?: number;
    yOffset?: number;
    xAdvance?: number;
    advanceTwips?: number;
    fieldTop?: number;
    phases?: BitmapGlyph[];
};

export type BitmapFontMetrics = {
    ascent: number;
    descent: number;
    lineHeight: number;
    fieldGutterX?: number;
    coordinateMode?: string;
    phaseCount?: number;
    glyphs: Record<string, BitmapGlyph>;
    kernings?: Record<string, number>;
};

export type LoadedBitmapFont = {
    image: HTMLImageElement;
    metrics: BitmapFontMetrics;
};

export type BitmapTextAlign = 'left' | 'center' | 'right';

export type BitmapTextProps = {
    children?: string | number;
    recipe: BitmapTextRecipe;
    color: string;
    align?: BitmapTextAlign;
    autoWidth?: boolean;
    shadowColor?: string;
    shadowX?: number;
    shadowY?: number;
    className?: string;
};
