import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

import { BadgeLayerKind } from './groupBadgeCode';

/** A part the badge editor offers: its bitmap, tinted with the layer's colour, and an untinted mask laid over it. */
export interface BadgePartDefinition {
    id: number;
    fileName: string;
    /** Empty when the part has none. */
    maskFileName: string;
}

/** The file the table is read from - `data/badge-parts.json` is the shape. */
interface BadgePartsFile {
    bases: BadgePartDefinition[];
    symbols: BadgePartDefinition[];
    /** The badge palette: `color` is six hex digits, no `#`. */
    colors: { id: number; color: string }[];
}

/**
 * The ids a badge code is written with, and what they draw: the editor's parts and its badge
 * colours. They are the hotel's own numbering - the editor is told it and builds codes from it -
 * so the imager reads the same table: Turbo's `badgeparts_json` gamedata file, or the copy in
 * `data/badge-parts.json` when no url is given. A colour's hex can be retuned freely (every
 * badge using it repaints); a part id must never point at another picture.
 */
export class BadgePartTable {
    private readonly _parts: Record<BadgeLayerKind, Map<number, BadgePartDefinition>>;
    private readonly _colors: Map<number, number>;

    /**
     * @param version What the table was read from, hashed: a badge drawn with another version may
     * show other colours, so it is part of every cached badge's key.
     */
    constructor(data: BadgePartsFile, public readonly version: string = '') {
        this._parts = {
            base: new Map(data.bases.map(part => [ part.id, part ])),
            symbol: new Map(data.symbols.map(part => [ part.id, part ])),
        };
        this._colors = new Map(data.colors.map(({ id, color }) => [ id, parseInt(color, 16) ]));
    }

    /** Reads the table from a file path or an http(s) url. */
    public static async load(source: string): Promise<BadgePartTable> {
        const text = isUrl(source) ? await fetchText(source) : await readFile(source, 'utf8');

        return new BadgePartTable(validate(JSON.parse(text), source), createHash('sha1').update(text).digest('hex').slice(0, 12));
    }

    public getPart(kind: BadgeLayerKind, id: number): BadgePartDefinition | undefined {
        return this._parts[kind].get(id);
    }

    /** The colour as `0xRRGGBB`. */
    public getColor(id: number): number | undefined {
        return this._colors.get(id);
    }

    public get partCount(): number {
        return this._parts.base.size + this._parts.symbol.size;
    }

    public get colorCount(): number {
        return this._colors.size;
    }
}

export const isUrl = (source: string): boolean => /^https?:\/\//.test(source);

const fetchText = async (url: string): Promise<string> => {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Badge parts request failed: ${response.status} ${url}`);

    return response.text();
};

const validate = (data: unknown, source: string): BadgePartsFile => {
    const file = data as Partial<BadgePartsFile> | null;
    const isPart = (part: BadgePartDefinition) => Number.isInteger(part?.id) && (typeof part.fileName === 'string') && (typeof part.maskFileName === 'string');
    const isColor = (color: { id: number; color: string }) => Number.isInteger(color?.id) && /^[0-9a-f]{6}$/i.test(color.color ?? '');

    if (!file || !Array.isArray(file.bases) || !Array.isArray(file.symbols) || !Array.isArray(file.colors)
        || !file.bases.every(isPart) || !file.symbols.every(isPart) || !file.colors.every(isColor)) {
        throw new Error(`${source} is not a badge parts table: { bases: [{ id, fileName, maskFileName }], symbols: [...], colors: [{ id, color: "RRGGBB" }] }`);
    }

    return file as BadgePartsFile;
};
