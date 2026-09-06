import { AvatarGenderType } from '@nitrodevco/nitro-api';

/**
 * The pure figure-string model the avatar editor edits - a plain object per set type instead
 * of the old `FigureData` class (scripts/stuff/avatar/FigureData.ts). A figure string is
 * `hd-180-7.ch-215-66.[...]`: `<setType>-<setId>[-<colorId>...]` parts joined by dots.
 */

/** Figure set types the editor can change (`FigureData.SET_TYPES`). */
export const FIGURE_SET_TYPES = [ 'hd', 'hr', 'ha', 'he', 'ea', 'fa', 'ch', 'cc', 'ca', 'cp', 'lg', 'sh', 'wa' ] as const;

export type FigureSetType = typeof FIGURE_SET_TYPES[number];

export type FigureParts = Partial<Record<string, { setId: number; colorIds: number[] }>>;

export const parseFigureString = (figure: string): FigureParts => {
    const parts: FigureParts = {};

    if (!figure) return parts;

    for (const set of figure.split('.')) {
        const [ setType, setId, ...colors ] = set.split('-');

        if (!setType || setId === undefined) continue;

        const colorIds = colors.map(color => parseInt(color)).filter(color => !isNaN(color));

        parts[setType] = { setId: parseInt(setId), colorIds };
    }

    return parts;
};

export const buildFigureString = (parts: FigureParts): string => Object.entries(parts)
    .filter((entry): entry is [string, { setId: number; colorIds: number[] }] => !!entry[1] && entry[1].setId >= 0)
    .map(([ setType, part ]) => [ setType, part.setId, ...part.colorIds ].join('-'))
    .join('.');

/** The figure reduced to just the face - the editor's "clear" action (`getFigureStringWithFace`). */
export const faceOnlyFigureString = (parts: FigureParts): string => buildFigureString(parts.hd ? { hd: parts.hd } : {});

export const normalizeGender = (gender: string | undefined): AvatarGenderType => (gender?.toUpperCase() === 'F' ? AvatarGenderType.Female : AvatarGenderType.Male);
