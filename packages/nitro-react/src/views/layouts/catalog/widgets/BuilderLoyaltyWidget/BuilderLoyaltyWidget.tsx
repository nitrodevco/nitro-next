import { BoxLayout, Region } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

import { BuilderLoyaltyWidgetLoyaltyList, BuilderLoyaltyWidgetLoyaltyListProps } from './BuilderLoyaltyWidgetLoyaltyList';

/**
 * Catalog widget `builderLoyaltyWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutBuildersClubLoyaltyLayout); each passes its own placement through `layout`.
 */
/** Named region `builderLoyaltyWidget` of BuilderLoyaltyWidget - configured through the parent's `builderLoyaltyWidget` prop. */
export interface BuilderLoyaltyWidgetProps extends CatalogWidgetFlags {
    layout?: BoxLayout;
    loyaltyList?: BuilderLoyaltyWidgetLoyaltyListProps;
}

export const BuilderLoyaltyWidget = ({ layout, loyaltyList }: BuilderLoyaltyWidgetProps) => {
    return (
        <Region
            name="builderLoyaltyWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <BuilderLoyaltyWidgetLoyaltyList {...loyaltyList} />
        </Region>
    );
};
