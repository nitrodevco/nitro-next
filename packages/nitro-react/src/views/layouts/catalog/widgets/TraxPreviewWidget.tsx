import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

/**
 * Catalog widget `traxPreviewWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (TraxPreviewWidgetLayout); each passes its own placement through `layout`.
 */
/** Named region `traxPreviewWidget` of TraxPreviewWidget - configured through the parent's `traxPreviewWidget` prop. */
export interface TraxPreviewWidgetProps {
    captionPlayPreviewText?: string;
    layout?: BoxLayout;
    onListen?: () => void;
    tags?: string[];
}

export const TraxPreviewWidget = ({ captionPlayPreviewText, layout, onListen, tags }: TraxPreviewWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="traxPreviewWidget"
            tags={tags}
            layout={{ position: 'absolute', ...layout }}
        >
            <Border
                variant="4"
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 0, width: 150, top: 0, height: 47 }}
            />
            <Button
                variant="3"
                name="listen"
                onPointerTap={onListen}
                layout={{ position: 'absolute', left: 79, width: 66, top: 13, height: 22, minWidth: 66, maxWidth: 66 }}
            >
                {t('play_preview_button')}
            </Button>
            <Region
                name="play_preview_text"
                layout={{ position: 'absolute', left: 9, width: 85, top: 17, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionPlayPreviewText ?? t('play_preview')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 85 }}
                />
            </Region>
        </Region>
    );
};
