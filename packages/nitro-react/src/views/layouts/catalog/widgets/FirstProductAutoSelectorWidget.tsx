import { BoxLayout, Region } from '#base/theme';

/**
 * Catalog widget `firstProductAutoSelectorWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutGuildForumLayout); each passes its own placement through `layout`.
 */
/** Named region `firstProductAutoSelectorWidget` of FirstProductAutoSelectorWidget - configured through the parent's `firstProductAutoSelectorWidget` prop. */
export interface FirstProductAutoSelectorWidgetProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const FirstProductAutoSelectorWidget = ({ layout, tags }: FirstProductAutoSelectorWidgetProps) => {
    return (
        <Region
            name="firstProductAutoSelectorWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        />
    );
};
