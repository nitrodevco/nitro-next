import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Row template `preview_image_region2` of BreedPetsResultLayout - pass real rows through its `items…` slot. */
export interface BreedPetsResultLayoutPreviewImageRegion2ItemProps {
    layout?: BoxLayout;
    onPreviewImageRegion2?: () => void;
    srcPreviewImage2?: string;
    tintPreviewImage2?: string;
    visiblePreviewImage2?: boolean;
}

export const BreedPetsResultLayoutPreviewImageRegion2Item = ({ layout, onPreviewImageRegion2, srcPreviewImage2, tintPreviewImage2, visiblePreviewImage2 }: BreedPetsResultLayoutPreviewImageRegion2ItemProps) => {
    return (
        <Region
            name="preview_image_region2"
            onPointerTap={onPreviewImageRegion2}
            cursor="pointer"
            layout={{ width: 122, height: 130, flexShrink: 0, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130, ...layout }}
        >
            {(visiblePreviewImage2 ?? true) && (
                <ThemeImage
                    name="preview_image2"
                    src={srcPreviewImage2}
                    tint={tintPreviewImage2}
                    layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 130, minWidth: 122, maxWidth: 122, minHeight: 130, maxHeight: 130 }}
                />
            )}
        </Region>
    );
};
