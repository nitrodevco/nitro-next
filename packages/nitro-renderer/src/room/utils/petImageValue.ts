import { IPetCustomPart } from '@nitrodevco/nitro-api';

/**
 * `RoomEngine.getPetImage`'s figure string: the type, palette and colour in hex, ` head` for a
 * head-only render, then - only when custom parts are given at all, even none - their count and each
 * part's layer, part and palette. Every pet render the client asks the engine for builds it here.
 */
export const petImageValue = (typeId: number, paletteId: number, color: number, headOnly: boolean = false, customParts?: readonly IPetCustomPart[]): string => {
    let value = `${typeId} ${paletteId} ${color.toString(16)}`;

    if (headOnly) value = `${value} head`;

    if (customParts) {
        value = `${value} ${customParts.length}`;

        for (const part of customParts) value = `${value} ${part.layerId} ${part.partId} ${part.paletteId}`;
    }

    return value;
};
