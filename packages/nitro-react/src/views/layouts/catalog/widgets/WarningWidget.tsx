import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/**
 * Catalog widget `warningWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutGuildForumLayout); each passes its own placement through `layout`.
 */
/** Named region `warningWidget` of WarningWidget - configured through the parent's `warningWidget` prop. */
export interface WarningWidgetProps {
    captionWarningText?: string;
    layout?: BoxLayout;
}

export const WarningWidget = ({ captionWarningText, layout }: WarningWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="warningWidget"
            params={1040}
            layout={{ position: 'absolute', ...layout }}
        >
            <Region
                name="warning_text"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 38, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionWarningText ?? t('catalog.alert.group_has_forum')}
                    textOptions={{ fill: '#6f0000', wordWrap: true, wordWrapWidth: 360 }}
                />
            </Region>
        </Region>
    );
};
