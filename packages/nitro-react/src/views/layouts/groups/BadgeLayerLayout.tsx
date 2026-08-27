import { Border, BoxLayout, ButtonThick, Region, ThemeImage } from '#base/theme';

/** Generated from `1192_badge_layer_xml` (layout "badge_layer", 247x49) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeLayerLayoutProps {
    layout?: BoxLayout;
    onPartButton?: () => void;
    srcPartPreview?: string;
    srcPositionGrid?: string;
    srcPositionPicker?: string;
}

export const BadgeLayerLayout = ({ layout, onPartButton, srcPartPreview, srcPositionGrid, srcPositionPicker }: BadgeLayerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 247, height: 49, ...layout }}>
            <Region
                name="container"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 247, top: 0, height: 49 }}
            >
                <Border
                    variant="3"
                    name="border"
                    params={16}
                    tintColor="#bebba5"
                    layout={{ position: 'absolute', left: 0, width: 247, top: 0, height: 49 }}
                />
                <Region
                    name="preview_container"
                    params={16}
                    layout={{ position: 'absolute', left: 3, width: 51, top: 0, height: 49 }}
                >
                    <ButtonThick
                        variant="3"
                        name="part_button"
                        params={131089}
                        onPointerTap={onPartButton}
                        layout={{ position: 'absolute', left: 0, width: 49, top: 0, height: 49 }}
                    />
                    <ThemeImage
                        name="part_preview"
                        params={16}
                        src={srcPartPreview}
                        layout={{ position: 'absolute', left: 5, width: 39, top: 5, height: 39 }}
                    />
                </Region>
                <Region
                    name="position_container"
                    params={16}
                    layout={{ position: 'absolute', left: 67, width: 43, top: 3, height: 43 }}
                >
                    <ThemeImage
                        name="position_grid"
                        params={17}
                        src={srcPositionGrid}
                        layout={{ position: 'absolute', left: 0, width: 43, top: 0, height: 43 }}
                    />
                    <ThemeImage
                        name="position_picker"
                        params={16}
                        src={srcPositionPicker}
                        layout={{ position: 'absolute', left: 1, width: 13, top: 1, height: 13 }}
                    />
                </Region>
                <Region
                    name="color_selector"
                    params={16}
                    layout={{ position: 'absolute', left: 124, width: 120, top: 2, height: 45, flexDirection: 'row', flexWrap: 'wrap' }}
                />
            </Region>
        </Region>
    );
};
