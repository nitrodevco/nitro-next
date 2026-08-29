import { ReactNode } from 'react';

import { Border, BoxLayout, ButtonThick, Region, ThemeImage } from '#base/theme';

/** Named region `container` of BadgeLayerLayout - configured through the parent's `container` prop. */
export interface BadgeLayerLayoutContainerProps {
    itemsColorSelector?: ReactNode;
    layout?: BoxLayout;
    onPartButton?: () => void;
    srcPartPreview?: string;
    srcPositionGrid?: string;
    srcPositionPicker?: string;
    tintPartPreview?: string;
    tintPositionGrid?: string;
    tintPositionPicker?: string;
}

export const BadgeLayerLayoutContainer = ({ itemsColorSelector, layout, onPartButton, srcPartPreview, srcPositionGrid, srcPositionPicker, tintPartPreview, tintPositionGrid, tintPositionPicker }: BadgeLayerLayoutContainerProps) => {
    return (
        <Region
            name="container"
            layout={{ position: 'absolute', left: 0, width: 247, top: 0, height: 49, ...layout }}
        >
            <Border
                variant="3"
                name="border"
                tintColor="#bebba5"
                layout={{ position: 'absolute', left: 0, width: 247, top: 0, height: 49 }}
            />
            <Region
                name="preview_container"
                layout={{ position: 'absolute', left: 3, width: 51, top: 0, height: 49 }}
            >
                <ButtonThick
                    variant="3"
                    name="part_button"
                    onPointerTap={onPartButton}
                    layout={{ position: 'absolute', left: 0, width: 49, top: 0, height: 49 }}
                />
                <ThemeImage
                    name="part_preview"
                    src={srcPartPreview}
                    tint={tintPartPreview}
                    layout={{ position: 'absolute', left: 5, width: 39, top: 5, height: 39 }}
                />
            </Region>
            <Region
                name="position_container"
                layout={{ position: 'absolute', left: 67, width: 43, top: 3, height: 43 }}
            >
                <ThemeImage
                    name="position_grid"
                    src={srcPositionGrid}
                    tint={tintPositionGrid}
                    layout={{ position: 'absolute', left: 0, width: 43, top: 0, height: 43 }}
                />
                <ThemeImage
                    name="position_picker"
                    src={srcPositionPicker}
                    tint={tintPositionPicker}
                    layout={{ position: 'absolute', left: 1, width: 13, top: 1, height: 13 }}
                />
            </Region>
            <Region
                name="color_selector"
                layout={{ position: 'absolute', left: 124, width: 120, top: 2, height: 45, flexDirection: 'row', flexWrap: 'wrap' }}
            >
                {itemsColorSelector}
            </Region>
        </Region>
    );
};
