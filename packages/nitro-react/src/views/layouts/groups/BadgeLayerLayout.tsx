import { Border, BoxLayout, ButtonThick, Region, ThemeImage } from '#base/theme';

/** Generated from `1192_badge_layer_xml` (layout "badge_layer", 247x49) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BadgeLayerLayoutProps {
    container?: BadgeLayerLayoutContainerProps;
    layout?: BoxLayout;
}

export const BadgeLayerLayout = ({ container, layout }: BadgeLayerLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 247, height: 49, ...layout }}>
            <BadgeLayerLayoutContainer {...container} />
        </Region>
    );
};

/** Named region `preview_container` of BadgeLayerLayout - configured through the parent's `previewContainer` prop. */
export interface BadgeLayerLayoutPreviewContainerProps {
    layout?: BoxLayout;
    onPartButton?: () => void;
    srcPartPreview?: string;
    tags?: string[];
}

export const BadgeLayerLayoutPreviewContainer = ({ layout, onPartButton, srcPartPreview, tags }: BadgeLayerLayoutPreviewContainerProps) => {
    return (
        <Region
            name="preview_container"
            tags={tags}
            layout={{ position: 'absolute', left: 3, width: 51, top: 0, height: 49, ...layout }}
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
                layout={{ position: 'absolute', left: 5, width: 39, top: 5, height: 39 }}
            />
        </Region>
    );
};

/** Named region `position_container` of BadgeLayerLayout - configured through the parent's `positionContainer` prop. */
export interface BadgeLayerLayoutPositionContainerProps {
    layout?: BoxLayout;
    srcPositionGrid?: string;
    srcPositionPicker?: string;
    tags?: string[];
}

export const BadgeLayerLayoutPositionContainer = ({ layout, srcPositionGrid, srcPositionPicker, tags }: BadgeLayerLayoutPositionContainerProps) => {
    return (
        <Region
            name="position_container"
            tags={tags}
            layout={{ position: 'absolute', left: 67, width: 43, top: 3, height: 43, ...layout }}
        >
            <ThemeImage
                name="position_grid"
                src={srcPositionGrid}
                layout={{ position: 'absolute', left: 0, width: 43, top: 0, height: 43 }}
            />
            <ThemeImage
                name="position_picker"
                src={srcPositionPicker}
                layout={{ position: 'absolute', left: 1, width: 13, top: 1, height: 13 }}
            />
        </Region>
    );
};

/** Named region `color_selector` of BadgeLayerLayout - configured through the parent's `colorSelector` prop. */
export interface BadgeLayerLayoutColorSelectorProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const BadgeLayerLayoutColorSelector = ({ layout, tags }: BadgeLayerLayoutColorSelectorProps) => {
    return (
        <Region
            name="color_selector"
            tags={tags}
            layout={{ position: 'absolute', left: 124, width: 120, top: 2, height: 45, flexDirection: 'row', flexWrap: 'wrap', ...layout }}
        />
    );
};

/** Named region `container` of BadgeLayerLayout - configured through the parent's `container` prop. */
export interface BadgeLayerLayoutContainerProps {
    colorSelector?: BadgeLayerLayoutColorSelectorProps;
    layout?: BoxLayout;
    positionContainer?: BadgeLayerLayoutPositionContainerProps;
    previewContainer?: BadgeLayerLayoutPreviewContainerProps;
    tags?: string[];
}

export const BadgeLayerLayoutContainer = ({ colorSelector, layout, positionContainer, previewContainer, tags }: BadgeLayerLayoutContainerProps) => {
    return (
        <Region
            name="container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 247, top: 0, height: 49, ...layout }}
        >
            <Border
                variant="3"
                name="border"
                tintColor="#bebba5"
                layout={{ position: 'absolute', left: 0, width: 247, top: 0, height: 49 }}
            />
            <BadgeLayerLayoutPreviewContainer {...previewContainer} />
            <BadgeLayerLayoutPositionContainer {...positionContainer} />
            <BadgeLayerLayoutColorSelector {...colorSelector} />
        </Region>
    );
};
