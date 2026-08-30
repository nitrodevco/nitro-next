import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

import { BuilderAddonsWidgetAddonsList, BuilderAddonsWidgetAddonsListProps } from './BuilderAddonsWidgetAddonsList';

/**
 * Catalog widget `builderAddonsWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutBuildersClubAddonsLayout); each passes its own placement through `layout`.
 */
/** Named region `builderAddonsWidget` of BuilderAddonsWidget - configured through the parent's `builderAddonsWidget` prop. */
export interface BuilderAddonsWidgetProps extends CatalogWidgetFlags {
    addonsList?: BuilderAddonsWidgetAddonsListProps;
    captionTrialWarning?: string;
    layout?: BoxLayout;
}

export const BuilderAddonsWidget = ({ addonsList, captionTrialWarning, layout }: BuilderAddonsWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="builderAddonsWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <BuilderAddonsWidgetAddonsList {...addonsList} />
            <ThemeText
                text={captionTrialWarning ?? t('builder.addon_page.warning.trial')}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#cc0000' }}
                name="trial_warning"
                layout={{ position: 'absolute', left: 0, width: 193, bottom: 3, height: 17 }}
            />
        </Region>
    );
};
