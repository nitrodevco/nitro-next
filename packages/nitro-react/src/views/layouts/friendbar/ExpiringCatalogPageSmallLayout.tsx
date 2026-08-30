import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `6_expiring_catalog_page_small_xml` (layout "expiring_catalog_page_small", 250x208) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ExpiringCatalogPageSmallLayoutProps {
    captionPageDescTxt?: string;
    captionPageHeaderTxt?: string;
    captionTimerCaptionTxt?: string;
    colorableTextColor?: string;
    countdownWidget?: ReactNode;
    layout?: BoxLayout;
    onOpenCatalogButton?: () => void;
    srcPromoBitmap?: string;
}

export const ExpiringCatalogPageSmallLayout = ({ captionPageDescTxt, captionPageHeaderTxt, captionTimerCaptionTxt, colorableTextColor, countdownWidget, layout, onOpenCatalogButton, srcPromoBitmap }: ExpiringCatalogPageSmallLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 250, height: 208, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'column' }}>
                    <ThemeText
                        text={captionPageHeaderTxt ?? 'Caption PH'}
                        textStyle="text-style-il-heading-1"
                        textOptions={{ fill: colorableTextColor }}
                        name="page_header_txt"
                        layout={{ width: 94, height: 24, flexShrink: 0 }}
                    />
                    <Region
                        backgroundColor="#000000"
                        layout={{ alignSelf: 'stretch', height: 120, flexShrink: 0 }}
                    >
                        <ThemeImage
                            name="promo_bitmap"
                            src={srcPromoBitmap ?? '${image.library.url}reception/catalog_teaser_set_mnstr_gothic.png'}
                            layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 120 }}
                        />
                        <ThemeText
                            text={captionTimerCaptionTxt ?? t('landing.view.pageexpiry.timeremaining')}
                            textStyle="text-style-il-heading-3"
                            textOptions={{ fill: colorableTextColor, align: 'center' }}
                            name="timer_caption_txt"
                            layout={{ position: 'absolute', right: 5, width: 146, top: 23, height: 14 }}
                        />
                        <WidgetSlot
                            widgetType="countdown"
                            name="countdown_widget"
                            options={{ 'countdown:running': 'true' }}
                            layout={{ position: 'absolute', left: 124, width: 99, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 37 }}
                        >
                            {countdownWidget}
                        </WidgetSlot>
                    </Region>
                    <ThemeText
                        text={captionPageDescTxt ?? 'Desc PH'}
                        textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 250 }}
                        name="page_desc_txt"
                        verticalAlign="top"
                        layout={{ alignSelf: 'stretch', height: 16, flexShrink: 0 }}
                    />
                    <Button
                        variant="100"
                        name="open_catalog_button"
                        onPointerTap={onOpenCatalogButton}
                        layout={{ width: 233, height: 48, flexShrink: 0, minHeight: 48, maxHeight: 48 }}
                    >
                        {t('landing.view.pageexpiry.opencatalog')}
                    </Button>
                </Region>
            </Region>
        </Region>
    );
};
