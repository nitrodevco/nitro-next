import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `item_smile` of RelationshipChooserLayout - pass real rows through its `items…` slot. */
export interface RelationshipChooserLayoutItemSmileItemProps {
    layout?: BoxLayout;
    onItemSmile?: () => void;
    srcImage?: string;
    visibleImage?: boolean;
}

export const RelationshipChooserLayoutItemSmileItem = ({ layout, onItemSmile, srcImage, visibleImage }: RelationshipChooserLayoutItemSmileItemProps) => {
    return (
        <Region
            name="item_smile"
            backgroundColor="#ececec"
            onPointerTap={onItemSmile}
            cursor="pointer"
            layout={{ width: 25, height: 15, flexShrink: 0, ...layout }}
        >
            {(visibleImage ?? true) && (
                <ThemeImage
                    name="image"
                    src={srcImage ?? layoutImage('relationship_status_smile.png')}
                    layout={{ position: 'absolute', left: 0, width: 16, top: 1, height: 14 }}
                />
            )}
        </Region>
    );
};
