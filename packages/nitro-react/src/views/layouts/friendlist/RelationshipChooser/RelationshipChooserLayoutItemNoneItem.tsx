import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `item_none` of RelationshipChooserLayout - pass real rows through its `items…` slot. */
export interface RelationshipChooserLayoutItemNoneItemProps {
    layout?: BoxLayout;
    onItemNone?: () => void;
    srcImage?: string;
    visibleImage?: boolean;
}

export const RelationshipChooserLayoutItemNoneItem = ({ layout, onItemNone, srcImage, visibleImage }: RelationshipChooserLayoutItemNoneItemProps) => {
    return (
        <Region
            name="item_none"
            backgroundColor="#ececec"
            onPointerTap={onItemNone}
            cursor="pointer"
            layout={{ alignSelf: 'stretch', height: 15, flexShrink: 0, ...layout }}
        >
            {(visibleImage ?? true) && (
                <ThemeImage
                    name="image"
                    src={srcImage ?? layoutImage('relationship_status_none.png')}
                    layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 14 }}
                />
            )}
        </Region>
    );
};
