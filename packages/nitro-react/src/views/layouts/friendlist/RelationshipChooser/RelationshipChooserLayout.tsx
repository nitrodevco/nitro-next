import { Border, BoxLayout, Region } from '#base/theme';

import { RelationshipChooserLayoutItems, RelationshipChooserLayoutItemsProps } from './RelationshipChooserLayoutItems';

/** Generated from `1508_relationship_chooser_xml` (layout "relationship_chooser", 30x68) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RelationshipChooserLayoutProps {
    items?: RelationshipChooserLayoutItemsProps;
    layout?: BoxLayout;
}

export const RelationshipChooserLayout = ({ items, layout }: RelationshipChooserLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 68, ...layout }}>
            <Border
                variant="100"
                tintColor="#ffffff"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <RelationshipChooserLayoutItems {...items} />
            </Border>
        </Region>
    );
};
