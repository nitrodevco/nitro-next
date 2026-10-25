import { IMessageDataWrapper, IWiredVisualizationStateEntry, WiredFurnitureHighlightData, WiredFurnitureTransparencyData } from '@nitrodevco/nitro-api';

/** A count and that many ints; undefined for a negative count, which Flash's parsers reject. */
export const parseWiredIdList = (wrapper: IMessageDataWrapper): number[] | undefined => {
    const count = wrapper.readInt();

    if (count < 0) return undefined;

    const ids: number[] = [];

    for (let i = 0; i < count; i++) ids.push(wrapper.readInt());

    return ids;
};

export type WiredVisualizationStateType = {
    /** False when the message did not parse (a negative count): Flash then never hands it on. */
    valid: boolean;
    transparencies: IWiredVisualizationStateEntry<WiredFurnitureTransparencyData>[];
    highlights: IWiredVisualizationStateEntry<WiredFurnitureHighlightData>[];
};

/**
 * Flash `WiredFurniVisualizationStateMessageParser` / `WiredUserVisualizationStateMessageParser` (WIN63-202610201032),
 * which read the same thing: the transparencies (id, transparency, allow click through, easing) and then the
 * highlights (id, type, strength, colour, animation, easing).
 */
export const parseWiredVisualizationState = (wrapper: IMessageDataWrapper): WiredVisualizationStateType => {
    const invalid: WiredVisualizationStateType = { valid: false, transparencies: [], highlights: [] };
    const transparencies: IWiredVisualizationStateEntry<WiredFurnitureTransparencyData>[] = [];
    const highlights: IWiredVisualizationStateEntry<WiredFurnitureHighlightData>[] = [];

    let count = wrapper.readInt();

    if (count < 0) return invalid;

    for (let i = 0; i < count; i++) {
        const id = wrapper.readInt();

        transparencies.push({ id, data: new WiredFurnitureTransparencyData(wrapper.readInt(), wrapper.readBoolean(), wrapper.readInt()) });
    }

    count = wrapper.readInt();

    if (count < 0) return invalid;

    for (let i = 0; i < count; i++) {
        const id = wrapper.readInt();

        highlights.push({ id, data: new WiredFurnitureHighlightData(wrapper.readInt(), wrapper.readInt(), wrapper.readInt(), wrapper.readInt(), wrapper.readInt()) });
    }

    return { valid: true, transparencies, highlights };
};
