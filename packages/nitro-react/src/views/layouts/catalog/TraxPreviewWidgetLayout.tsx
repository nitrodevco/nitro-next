import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Generated from `1678_traxPreviewWidget_xml` (layout "traxPreviewWidget", 150x47) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TraxPreviewWidgetLayoutProps {
    layout?: BoxLayout;
    traxPreviewWidget?: TraxPreviewWidgetLayoutTraxPreviewWidgetProps;
}

export const TraxPreviewWidgetLayout = ({ layout, traxPreviewWidget }: TraxPreviewWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 150, height: 47, ...layout }}>
            <TraxPreviewWidgetLayoutTraxPreviewWidget {...traxPreviewWidget} />
        </Region>
    );
};

/** Named region `traxPreviewWidget` of TraxPreviewWidgetLayout - configured through the parent's `traxPreviewWidget` prop. */
export interface TraxPreviewWidgetLayoutTraxPreviewWidgetProps {
    captionPlayPreviewText?: string;
    layout?: BoxLayout;
    onListen?: () => void;
}

export const TraxPreviewWidgetLayoutTraxPreviewWidget = ({ captionPlayPreviewText, layout, onListen }: TraxPreviewWidgetLayoutTraxPreviewWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="traxPreviewWidget"
            params={16}
            layout={{ position: 'absolute', left: 0, width: 150, top: 0, height: 47, ...layout }}
        >
            <Border
                variant="4"
                params={16}
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 0, width: 150, top: 0, height: 47 }}
            />
            <Button
                variant="3"
                name="listen"
                params={131089}
                onPointerTap={onListen}
                layout={{ position: 'absolute', left: 79, width: 66, top: 13, height: 22, minWidth: 66, maxWidth: 66 }}
            >
                {t('play_preview_button')}
            </Button>
            <Region
                name="play_preview_text"
                params={16}
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
