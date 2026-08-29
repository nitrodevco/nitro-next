import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `item_bobba` of RelationshipChooserLayout - pass real rows through its `items…` slot. */
export interface RelationshipChooserLayoutItemBobbaItemProps {
    layout?: BoxLayout;
    onItemBobba?: () => void;
    srcImage?: string;
    visibleImage?: boolean;
}

export const RelationshipChooserLayoutItemBobbaItem = ({ layout, onItemBobba, srcImage, visibleImage }: RelationshipChooserLayoutItemBobbaItemProps) => {
    return (
        <Region
            name="item_bobba"
            backgroundColor="#ffffff"
            onPointerTap={onItemBobba}
            cursor="pointer"
            layout={{ alignSelf: 'stretch', height: 15, flexShrink: 0, ...layout }}
        >
            {(visibleImage ?? true) && (
                <ThemeImage
                    name="image"
                    src={srcImage ?? layoutImage('relationship_status_bobba.png')}
                    layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 14 }}
                />
            )}
        </Region>
    );
};
