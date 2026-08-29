import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `unique_item_background_container` of FurniViewLayout - configured through the parent's `uniqueItemBackgroundContainer` prop. */
export interface FurniViewLayoutUniqueItemBackgroundContainerProps {
    layout?: BoxLayout;
    srcUniqueItemBackgroundBottom?: string;
    srcUniqueItemBackgroundContainerUniqueItemBackgroundBottom?: string;
    srcUniqueItemBackgroundContainerUniqueItemBackgroundBottom2?: string;
    srcUniqueItemBackgroundContainerUniqueItemBackgroundBottom3?: string;
    srcUniqueItemBackgroundContainerUniqueItemBackgroundBottom4?: string;
    srcUniqueItemBackgroundMid?: string;
    srcUniqueItemBackgroundTop?: string;
    visibleUniqueItemBackgroundContainer?: boolean;
}

export const FurniViewLayoutUniqueItemBackgroundContainer = ({ layout, srcUniqueItemBackgroundBottom, srcUniqueItemBackgroundContainerUniqueItemBackgroundBottom, srcUniqueItemBackgroundContainerUniqueItemBackgroundBottom2, srcUniqueItemBackgroundContainerUniqueItemBackgroundBottom3, srcUniqueItemBackgroundContainerUniqueItemBackgroundBottom4, srcUniqueItemBackgroundMid, srcUniqueItemBackgroundTop, visibleUniqueItemBackgroundContainer }: FurniViewLayoutUniqueItemBackgroundContainerProps) => {
    return (
        (visibleUniqueItemBackgroundContainer ?? false) && (
            <Region
                name="unique_item_background_container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minHeight: 45, ...layout }}
            >
                <ThemeImage
                    name="unique_item_background_bottom"
                    src={srcUniqueItemBackgroundBottom ?? layoutImage('unique_item_large_iron.png')}
                    layout={{ position: 'absolute', left: 8, width: 5, top: -1, height: 9 }}
                />
                <ThemeImage
                    name="unique_item_background_bottom"
                    src={srcUniqueItemBackgroundContainerUniqueItemBackgroundBottom ?? layoutImage('unique_item_large_iron.png')}
                    layout={{ position: 'absolute', left: 155, width: 5, top: -1, height: 9 }}
                />
                <ThemeImage
                    name="unique_item_background_mid"
                    src={srcUniqueItemBackgroundMid ?? layoutImage('unique_item_large_glass_mid.png')}
                    layout={{ position: 'absolute', left: 0, width: 170, top: 5, bottom: 5 }}
                />
                <ThemeImage
                    name="unique_item_background_top"
                    src={srcUniqueItemBackgroundTop ?? layoutImage('unique_item_large_glass_top.png')}
                    layout={{ position: 'absolute', left: 0, width: 170, top: 0, height: 5 }}
                />
                <ThemeImage
                    name="unique_item_background_bottom"
                    src={srcUniqueItemBackgroundContainerUniqueItemBackgroundBottom2 ?? layoutImage('unique_item_large_glass_bottom.png')}
                    layout={{ position: 'absolute', left: 0, width: 170, bottom: 0, height: 5 }}
                />
                <ThemeImage
                    name="unique_item_background_bottom"
                    src={srcUniqueItemBackgroundContainerUniqueItemBackgroundBottom3 ?? layoutImage('unique_item_large_iron.png')}
                    layout={{ position: 'absolute', left: 8, width: 5, bottom: -2, height: 9 }}
                />
                <ThemeImage
                    name="unique_item_background_bottom"
                    src={srcUniqueItemBackgroundContainerUniqueItemBackgroundBottom4 ?? layoutImage('unique_item_large_iron.png')}
                    layout={{ position: 'absolute', left: 155, width: 5, bottom: -2, height: 9 }}
                />
            </Region>
        )
    );
};
