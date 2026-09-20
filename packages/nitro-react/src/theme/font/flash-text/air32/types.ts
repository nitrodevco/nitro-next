/**
 * Shapes shared by the AIR32 text pipeline: parsed IMP1 glyphs, the distance-field grid, the
 * captured font bundles and what a render hands back.
 */

/** Four 8-bit channels, red first. */
export type RgbaBytes = ArrayLike<number>;

export type AntiAliasType = 'advanced' | 'normal';

export type GridFitType = 'pixel' | 'subpixel' | 'none';

export type StageQuality = 'high' | 'low';

export type ColorType = 'dark' | 'light';

export type RenderingPipeline = 'direct' | 'habbo-retained';

export type EtchingPosition = 'top-left' | 'top' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right';

export interface Point {
    x: number;
    y: number;
}

/** One flattened outline segment in device space. */
export interface OutlineLine {
    from: Point;
    to: Point;
}

/** What the distance-field rasterizer needs to know about its target. */
export interface DistanceFieldSetup {
    width: number;
    height: number;
    outsideCutoff: number;
    insideCutoff: number;
}

export interface DistanceField {
    width: number;
    height: number;
    values: Float32Array;
}

/** The distance field while it is being written, with its sample spacing on both axes. */
export interface DistanceGrid extends DistanceField {
    stepX: number;
    stepY: number;
    inverseX: number;
    inverseY: number;
}

export interface Imp1Command {
    opcode: number;
    type: 'move' | 'line' | 'quadratic';
    x: number;
    y: number;
    controlX: number;
    controlY: number;
}

/** A parsed IMP1 block - AIR's own glyph outline format. */
export interface Imp1Glyph {
    magic: 'IMP1';
    totalBytes: number;
    headerBytes: number;
    commandCount: number;
    userId: number;
    normalizationFactor: number;
    normalizedEm: number;
    pathType: number;
    strokeWidth: number;
    referenceX: number;
    referenceY: number;
    bounds: { xMin: number; yMin: number; xMax: number; yMax: number };
    encodedSaz: number[];
    sazMask: number;
    commands: Imp1Command[];
}

export interface FlattenedCommand extends Point {
    opcode: number;
    type: 'move' | 'line';
}

export interface FlattenedPath {
    pathType: number;
    strokeWidth: number;
    commandCount: number;
    commands: FlattenedCommand[];
}

export interface Imp1RasterSetup extends DistanceFieldSetup {
    /** Row-major 2x3 affine: scaleX, skewX, translateX, skewY, scaleY, translateY. */
    matrix: readonly number[];
    rowStride?: number;
    useColorReduction?: boolean;
    colorReductionAmount?: number;
}

export interface Imp1Raster {
    width: number;
    height: number;
    rowStride: number;
    /** BGRA, bottom row first - the layout AIR's own glyph cache uses. */
    pixels: Uint8Array;
    lines: OutlineLine[];
    distances: Float32Array;
}

export interface StandardAlignmentZones {
    mask: number;
    xCoordinate: number;
    yCoordinate: number;
    xSpan: number;
    ySpan: number;
}

export interface PixelSetupOptions {
    pointSize: number;
    dpi?: number;
    scaleX?: number;
    scaleY?: number;
    fittedPenX: number;
    fittedPenY: number;
}

/** Where one glyph lands on the device grid and the matrix that puts it there. */
export interface AdvancedPixelSetup {
    pointSize: number;
    dpi: number;
    pixelSize: number;
    fittedPenX: number;
    fittedPenY: number;
    scale: number;
    scaleX: number;
    scaleY: number;
    normalizedScaleX: number;
    normalizedScaleY: number;
    residualX: number;
    residualY: number;
    standardAlignmentZones: StandardAlignmentZones;
    matrix: readonly number[];
    matrixBits: number[];
    width: number;
    height: number;
    rowStride: number;
    imageType: number;
    lcdPhase: number;
    offsetX: number;
    offsetY: number;
    originX: number;
    originY: number;
    normalizedPixelScale: number;
    nativeKeyWords: Uint32Array;
}

export interface CsmRecord {
    pixelSize: number;
    outside: number;
    inside: number;
    gamma: number;
}

export interface CsmCutoffs {
    outside: number;
    inside: number;
    gamma: number;
}

export interface CsmTable {
    dark: readonly CsmRecord[];
    light: readonly CsmRecord[];
}

/** A `DefineFont3` glyph record: advance and bounds in em-square units. */
export interface SwfGlyph {
    index: number;
    code: number;
    advance: number | null;
    bounds?: { xMin: number; xMax: number; yMin: number; yMax: number };
    hasInk?: boolean;
    shape?: { contours?: unknown[] };
}

export interface SwfKerningPair {
    leftCode: number;
    rightCode: number;
    adjustment: number;
}

export interface SwfFont {
    emSquare: number;
    metrics: { ascent: number; descent: number; leading: number };
    flags?: { italic?: boolean; bold?: boolean };
    /** Present on fonts that carry alignment zones (the Ubuntu faces); Volter has none. */
    alignmentZones?: { csmTableHint?: number } | null;
    glyphs: SwfGlyph[];
    kerning: SwfKerningPair[];
}

export interface NativeGlyphRenderRecord {
    rawImageBase64?: string;
    rowStride: number;
    imageHeight: number;
}

export interface NativeGlyphRecord {
    codepoint: number;
    imp1Base64: string;
    renders?: NativeGlyphRenderRecord[];
}

export interface NativeProfileSource {
    schemaVersion?: number;
    runtime?: unknown;
    fontSha256?: string | null;
    glyphs: NativeGlyphRecord[];
}

export interface NativeGlyph extends Omit<NativeGlyphRecord, 'renders'> {
    imp1: Imp1Glyph;
    renders: (NativeGlyphRenderRecord & { rawImage: Uint8Array | null })[];
}

export interface NativeProfile {
    schemaVersion?: number;
    runtime?: unknown;
    fontSha256?: string | null;
    glyphs: Map<number, NativeGlyph>;
    source: NativeProfileSource;
}

/** A captured `air32-native-font-bundle-v1` file (`public/assets/fonts/flash/*.air51.json`). */
export interface NativeFontBundle {
    schemaVersion: number;
    format: string;
    fontKey: string;
    fontSha256?: string | null;
    runtime?: unknown;
    coverage?: { codepointCount?: number; imp1GlyphCount?: number; metricGlyphCount?: number } | null;
    nativeProfile: NativeProfileSource;
    swfFont: SwfFont;
}

export interface NativeFont {
    profile: NativeProfile;
    swfFont: SwfFont;
    swfGlyphs: Map<number, SwfGlyph>;
    kerning: Map<string, number>;
    fontKey?: string;
    bundleMetadata?: Readonly<Record<string, unknown>>;
}

/** Where one character of a run sits: its pen position and the 1/8 px phase it rasterizes at. */
export interface GlyphPlacement {
    codepoint: number;
    stringIndex: number;
    penX: number;
    maskPenX: number;
    hasInk: boolean;
    penUnits?: number;
    penTwips?: number;
    phaseIndex?: number;
    roundedPhase?: number;
    anchorX?: number;
}

export interface TextRunLayout {
    placements: GlyphPlacement[];
    rawTextWidth: number;
    textWidth: number;
    fieldWidth: number;
}

export interface LineMetrics {
    size: number;
    ascent: number;
    descent: number;
    leading: number;
    textHeight: number;
    fieldHeight: number;
    baseline: number;
}

export interface ColorTransform {
    redMultiplier: number;
    greenMultiplier: number;
    blueMultiplier: number;
    alphaMultiplier: number;
    redOffset: number;
    greenOffset: number;
    blueOffset: number;
    alphaOffset: number;
}

/** A caller-owned bitmap to render into instead of a fresh one. */
export interface RenderTarget {
    pixels: Uint8ClampedArray;
    width: number;
    height: number;
    offsetX?: number;
    offsetY?: number;
}

export interface RetainedGlyphRaster {
    width: number;
    height: number;
    coverage: Uint8Array;
}

export interface PositionedGlyphRaster extends RetainedGlyphRaster {
    originX: number;
    originY: number;
}

/** A least-recently-used store of glyph rasters, bounded by entry count and bytes. */
export interface RasterCache<Raster extends RetainedGlyphRaster = PositionedGlyphRaster> {
    entries: Map<string, Raster>;
    bytes: number;
}

export interface NativeRenderOptions {
    size?: number;
    color?: number | RgbaBytes;
    alpha?: number;
    background?: number | RgbaBytes;
    backgroundAlpha?: number;
    antiAliasType?: AntiAliasType;
    gridFitType?: GridFitType;
    thickness?: number;
    sharpness?: number;
    kerning?: boolean;
    letterSpacing?: number;
    fontStyle?: 'normal' | 'italic';
    stageQuality?: StageQuality;
    /** `direct`: opaque RGBA over `background`. `habbo-retained`: premultiplied RGBA with real alpha as well. */
    renderingPipeline?: RenderingPipeline;
    padding?: number;
    textDecoration?: 'underline' | null;
    /** `0xAARRGGBB` - the skin's one pixel "etching" under or beside the text. */
    etchingColor?: number | string | null;
    etchingPosition?: EtchingPosition | null;
    colorTransform?: ColorTransform | null;
    target?: RenderTarget;
    rasterCache?: RasterCache;
}

export interface ResolvedEtching {
    argb: number;
    position: EtchingPosition;
    offset: Readonly<Point>;
    glyphColor: number[];
    lineColor: number[];
}

export interface ResolvedRenderOptions {
    antiAliasType: AntiAliasType;
    gridFitType: GridFitType;
    thickness: number;
    sharpness: number;
    kerning: boolean;
    stageQuality: StageQuality;
    fontStyle: 'normal' | 'italic';
    renderingPipeline: RenderingPipeline;
    size: number;
    padding: number;
    color: number[];
    background: number[];
    transformedGlyphColor: number[] | undefined;
    transformedLineColor: number[] | undefined;
    target: RenderTarget | undefined;
    rasterCache: RasterCache | undefined;
    underline: boolean;
    etching: ResolvedEtching | null;
}

export interface NativeRenderResult extends TextRunLayout, LineMetrics {
    width: number;
    height: number;
    /** Straight RGBA over `background` - opaque unless a target was given. */
    pixels: Uint8ClampedArray;
    /** Premultiplied RGBA with real alpha; only from the `habbo-retained` pipeline. */
    retainedPixels?: Uint8ClampedArray;
}
