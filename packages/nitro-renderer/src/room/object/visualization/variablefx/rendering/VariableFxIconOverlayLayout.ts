import { VariableFxIconAlignment } from '../VariableFxTables';
import { toInt } from './VariableFxBitmap';
import { VariableFxIconOverlayPlacement } from './VariableFxIconOverlayPlacement';

export interface VariableFxIconOverlayLayoutOptions {
    alignment?: VariableFxIconAlignment;
    contentWidth: number;
    contentHeight: number;
    contentYOffsetPx?: number;
    iconWidth: number;
    iconHeight: number;
    iconOffsetX?: number;
    iconOffsetY?: number;
    overlapPx: number;
}

/**
 * Where a renderer's content (bar, number) and its configured icon(s) sit inside the frame the
 * icon overlay grows the frame to. Icons overlap the content by `overlapPx` on the left and/or
 * right, and the frame expands so nothing is clipped.
 */
export class VariableFxIconOverlayLayout {
    public contentX: number = 0;
    public contentY: number = 0;
    public frameWidth: number = 0;
    public frameHeight: number = 0;
    public hasIcon: boolean = false;
    public placements: VariableFxIconOverlayPlacement[] = [];
    public iconX: number = 0;
    public iconY: number = 0;

    public static resolve(options: VariableFxIconOverlayLayoutOptions): VariableFxIconOverlayLayout {
        const layout = new VariableFxIconOverlayLayout();
        const contentWidth = Math.max(0, toInt(options.contentWidth));
        const contentHeight = Math.max(0, toInt(options.contentHeight));
        const iconWidth = Math.max(0, toInt(options.iconWidth));
        const iconHeight = Math.max(0, toInt(options.iconHeight));
        const overlap = toInt(options.overlapPx);
        const contentYOffset = toInt(options.contentYOffsetPx ?? 0);
        const iconOffsetX = toInt(options.iconOffsetX ?? 0);
        const iconOffsetY = toInt(options.iconOffsetY ?? 0);
        const alignment = options.alignment ?? 'left';

        layout.hasIcon = iconWidth > 0 && iconHeight > 0;

        if (!layout.hasIcon) {
            layout.contentX = 0;
            layout.contentY = 0;
            layout.frameHeight = contentHeight;
            layout.frameWidth = contentWidth;
            layout.iconX = 0;
            layout.iconY = 0;

            return layout;
        }

        const iconLead = Math.max(0, iconWidth - overlap);
        const contentX = alignment === 'right' ? 0 : iconLead;
        const rowHeight = Math.max(contentHeight, iconHeight);
        const contentY = Math.max(0, toInt((rowHeight - contentHeight) / 2) + contentYOffset);
        const iconY = toInt((rowHeight - iconHeight) / 2) + iconOffsetY;
        const placements = VariableFxIconOverlayLayout.resolveDefaultIconPlacements(alignment, contentX, contentWidth, iconOffsetX, iconY, overlap);
        const shiftX = Math.max(0, -Math.min(contentX, VariableFxIconOverlayLayout.minPlacementX(placements)));
        const shiftY = Math.max(0, -Math.min(contentY, VariableFxIconOverlayLayout.minPlacementY(placements)));

        layout.contentX = contentX + shiftX;
        layout.contentY = contentY + shiftY;

        for (const placement of placements) layout.placements.push(new VariableFxIconOverlayPlacement(placement.x + shiftX, placement.y + shiftY));

        const first = layout.placements[0];

        layout.iconX = first.x;
        layout.iconY = first.y;
        layout.frameHeight = Math.max(layout.contentY + contentHeight, VariableFxIconOverlayLayout.maxPlacementBottom(layout.placements, iconHeight));
        layout.frameWidth = Math.max(layout.contentX + contentWidth, VariableFxIconOverlayLayout.maxPlacementRight(layout.placements, iconWidth));

        return layout;
    }

    private static resolveDefaultIconPlacements(alignment: VariableFxIconAlignment, contentX: number, contentWidth: number, iconOffsetX: number, iconY: number, overlap: number): VariableFxIconOverlayPlacement[] {
        const left = new VariableFxIconOverlayPlacement(iconOffsetX, iconY);
        const right = new VariableFxIconOverlayPlacement(contentX + contentWidth - overlap - iconOffsetX, iconY);

        switch (alignment) {
            case 'right':
                return [ right ];
            case 'double':
                return [ left, right ];
            default:
                return [ left ];
        }
    }

    private static minPlacementX(placements: VariableFxIconOverlayPlacement[]): number {
        let min = 2147483647;

        for (const placement of placements) min = Math.min(min, placement.x);

        return min === 2147483647 ? 0 : min;
    }

    private static minPlacementY(placements: VariableFxIconOverlayPlacement[]): number {
        let min = 2147483647;

        for (const placement of placements) min = Math.min(min, placement.y);

        return min === 2147483647 ? 0 : min;
    }

    private static maxPlacementBottom(placements: VariableFxIconOverlayPlacement[], iconHeight: number): number {
        let max = 0;

        for (const placement of placements) max = Math.max(max, placement.y + iconHeight);

        return max;
    }

    private static maxPlacementRight(placements: VariableFxIconOverlayPlacement[], iconWidth: number): number {
        let max = 0;

        for (const placement of placements) max = Math.max(max, placement.x + iconWidth);

        return max;
    }
}
