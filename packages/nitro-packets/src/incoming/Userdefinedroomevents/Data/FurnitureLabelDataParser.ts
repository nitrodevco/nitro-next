import { FurnitureLabelData, FurnitureRegionData, IFurnitureRegionArea, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/**
 * One label or region - Flash's obfuscated `userdefinedroomevents._-MK.parse` (WIN63-202610121624):
 * int type, int furni, string text; a label (type 0) then int bubble colour, int visibility, bool
 * always open; a region (type 1) string description, int x offset, int y offset, int min width,
 * int min height, string colour, int count and that many x, y, width, height. Any other type, or
 * a negative area count, is `undefined`, and the message parsing it stops there.
 */
export const parseFurnitureLabelData = (wrapper: IMessageDataWrapper): FurnitureLabelData | undefined => {
    const type = wrapper.readInt();
    const furnitureId = wrapper.readInt();
    const text = wrapper.readString();

    if (type === FurnitureLabelData.TYPE_LABEL) return new FurnitureLabelData(furnitureId, text, type, wrapper.readInt(), wrapper.readInt(), wrapper.readBoolean());

    if (type !== FurnitureLabelData.TYPE_REGION) return undefined;

    const description = wrapper.readString();
    const xOffset = wrapper.readInt();
    const yOffset = wrapper.readInt();
    const minWidth = wrapper.readInt();
    const minHeight = wrapper.readInt();
    const color = wrapper.readString();
    const totalAreas = wrapper.readInt();

    if (totalAreas < 0) return undefined;

    const areas: IFurnitureRegionArea[] = [];

    for (let i = 0; i < totalAreas; i++) areas.push({ x: wrapper.readInt(), y: wrapper.readInt(), width: wrapper.readInt(), height: wrapper.readInt() });

    return new FurnitureRegionData(furnitureId, text, description, xOffset, yOffset, minWidth, minHeight, color, areas);
};

/** The entries of either labels message: int count (negative fails the message), then each until one does not parse. */
export const parseFurnitureLabelDataList = (wrapper: IMessageDataWrapper): FurnitureLabelData[] | undefined => {
    const total = wrapper.readInt();

    if (total < 0) return undefined;

    const entries: FurnitureLabelData[] = [];

    for (let i = 0; i < total; i++) {
        const entry = parseFurnitureLabelData(wrapper);

        if (!entry) return undefined;

        entries.push(entry);
    }

    return entries;
};
