import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `item_heart` of RelationshipChooserLayout - pass real rows through its `items…` slot. */
export interface RelationshipChooserLayoutItemHeartItemProps {
    layout?: BoxLayout;
    onItemHeart?: () => void;
    srcImage?: string;
    visibleImage?: boolean;
}

export const RelationshipChooserLayoutItemHeartItem = ({ layout, onItemHeart, srcImage, visibleImage }: RelationshipChooserLayoutItemHeartItemProps) => {
    return (
        <Region
            name="item_heart"
            backgroundColor="#ffffff"
            onPointerTap={onItemHeart}
            cursor="pointer"
            layout={{ width: 25, height: 15, flexShrink: 0, ...layout }}
        >
            {(visibleImage ?? true) && (
                <ThemeImage
                    name="image"
                    src={srcImage ?? layoutImage('relationship_status_heart.png')}
                    layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 14 }}
                />
            )}
        </Region>
    );
};
