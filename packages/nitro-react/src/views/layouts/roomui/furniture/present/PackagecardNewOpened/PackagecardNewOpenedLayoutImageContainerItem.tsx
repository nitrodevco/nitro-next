import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Row template `image_container` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutImageContainerItemProps {
    layout?: BoxLayout;
    srcGiftImage?: string;
    srcImageBg?: string;
    tintGiftImage?: string;
    tintImageBg?: string;
    visibleGiftImage?: boolean;
    visibleImageBg?: boolean;
}

export const PackagecardNewOpenedLayoutImageContainerItem = ({ layout, srcGiftImage, srcImageBg, tintGiftImage, tintImageBg, visibleGiftImage, visibleImageBg }: PackagecardNewOpenedLayoutImageContainerItemProps) => {
    return (
        <Region
            name="image_container"
            layout={{ width: 81, height: 81, flexShrink: 0, ...layout }}
        >
            {(visibleImageBg ?? true) && (
                <ThemeImage
                    name="image_bg"
                    src={srcImageBg}
                    tint={tintImageBg}
                    layout={{ position: 'absolute', left: 0, width: 81, top: 0, height: 80 }}
                />
            )}
            {(visibleGiftImage ?? true) && (
                <ThemeImage
                    name="gift_image"
                    src={srcGiftImage}
                    tint={tintGiftImage}
                    layout={{ position: 'absolute', left: 0, width: 81, top: 0, height: 80 }}
                />
            )}
        </Region>
    );
};
