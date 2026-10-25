/**
 * A furni's WIRED label - `com.sulake.habbo.room.object.data.FurnitureLabelData`
 * (WIN63-202610121624): the text in its bubble, the bubble's colour, who may see it and whether
 * it stays open. The base of `FurnitureRegionData`, whose text is its title.
 */
export class FurnitureLabelData {
    public static TYPE_LABEL = 0;
    public static TYPE_REGION = 1;
    /** `DEFAULT_COLOR`, the settings window's "Blue" (#414A80). */
    public static DEFAULT_COLOR = 4278912;
    public static VISIBILITY_EVERYONE = 0;
    public static VISIBILITY_WIRED_INSPECTORS = 1;

    constructor(
        public readonly furnitureId: number,
        public readonly text: string,
        public readonly type: number = FurnitureLabelData.TYPE_LABEL,
        public readonly bubbleColor: number = FurnitureLabelData.DEFAULT_COLOR,
        public readonly visibility: number = FurnitureLabelData.VISIBILITY_WIRED_INSPECTORS,
        public readonly alwaysOpen: boolean = false,
    ) { }

    public equals(data: FurnitureLabelData | undefined): boolean {
        return !!data && (data.type === this.type) && (data.furnitureId === this.furnitureId) && (data.text === this.text) && (data.bubbleColor === this.bubbleColor) && (data.visibility === this.visibility) && (data.alwaysOpen === this.alwaysOpen);
    }
}

/** One rectangle of a region (Flash reads four ints into a `Rectangle`). */
export interface IFurnitureRegionArea {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * A furni's WIRED region - `FurnitureRegionData`: a title, a description, an offset, a minimum
 * size, a colour (a string) and its areas. The client keeps it in the furni's model and draws
 * nothing for it in this build.
 */
export class FurnitureRegionData extends FurnitureLabelData {
    constructor(
        furnitureId: number,
        title: string,
        public readonly description: string,
        public readonly xOffset: number,
        public readonly yOffset: number,
        public readonly minWidth: number,
        public readonly minHeight: number,
        public readonly color: string,
        public readonly areas: IFurnitureRegionArea[] = [],
    ) {
        super(furnitureId, title, FurnitureLabelData.TYPE_REGION);
    }

    public get title(): string {
        return this.text;
    }

    public override equals(data: FurnitureLabelData | undefined): boolean {
        if (!(data instanceof FurnitureRegionData) || !super.equals(data)) return false;

        if ((data.description !== this.description) || (data.xOffset !== this.xOffset) || (data.yOffset !== this.yOffset) || (data.minWidth !== this.minWidth) || (data.minHeight !== this.minHeight) || (data.color !== this.color)) return false;

        if (data.areas.length !== this.areas.length) return false;

        return this.areas.every((area, index) => {
            const other = data.areas[index];

            return (other.x === area.x) && (other.y === area.y) && (other.width === area.width) && (other.height === area.height);
        });
    }
}
