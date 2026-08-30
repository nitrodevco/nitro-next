import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `traxPreviewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (TraxPreviewWidgetLayout); each passes its own placement through `layout`.
 */
/** Named region `traxPreviewWidget` of TraxPreviewWidget - configured through the parent's `traxPreviewWidget` prop. */
export interface TraxPreviewWidgetProps extends CatalogWidgetFlags {
    captionPlayPreviewText?: string;
    layout?: BoxLayout;
    onListen?: () => void;
}

export const TraxPreviewWidget = ({ captionPlayPreviewText, layout, onListen }: TraxPreviewWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="traxPreviewWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <Border
                variant="4"
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <Button
                variant="3"
                name="listen"
                onPointerTap={onListen}
                layout={{ position: 'absolute', right: 5, width: 66, bottom: 12, height: 22, minWidth: 66, maxWidth: 66 }}
            >
                {t('play_preview_button')}
            </Button>
            <ThemeText
                text={captionPlayPreviewText ?? t('play_preview')}
                textOptions={{ wordWrap: true, wordWrapWidth: 85 }}
                name="play_preview_text"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 9, width: 85, alignSelf: 'center', marginTop: 2, marginBottom: -2, height: 17 }}
            />
        </Region>
    );
};
