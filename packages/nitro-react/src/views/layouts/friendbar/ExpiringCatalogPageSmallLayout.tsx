import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `6_expiring_catalog_page_small_xml` (layout "expiring_catalog_page_small", 250x208) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ExpiringCatalogPageSmallLayoutProps {
    captionPageDescTxt?: string;
    captionPageHeaderTxt?: string;
    captionTimerCaptionTxt?: string;
    layout?: BoxLayout;
    onOpenCatalogButton?: () => void;
    srcPromoBitmap?: string;
}

export const ExpiringCatalogPageSmallLayout = ({ captionPageDescTxt, captionPageHeaderTxt, captionTimerCaptionTxt, layout, onOpenCatalogButton, srcPromoBitmap }: ExpiringCatalogPageSmallLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 250, height: 208, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 208 }}
            >
                <Region layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 208, flexDirection: 'column' }}>
                    <Region
                        name="page_header_txt"
                        tags={[ 'COLORABLE' ]}
                        layout={{ width: 94, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPageHeaderTxt ?? 'Caption PH'}
                            textStyle="text-style-il-heading-1"
                        />
                    </Region>
                    <Region
                        backgroundColor="#000000"
                        layout={{ width: 250, height: 120, flexShrink: 0 }}
                    >
                        <ThemeImage
                            name="promo_bitmap"
                            src={srcPromoBitmap ?? '${image.library.url}reception/catalog_teaser_set_mnstr_gothic.png'}
                            layout={{ position: 'absolute', left: 0, width: 120, top: 0, height: 120 }}
                        />
                        <Region
                            name="timer_caption_txt"
                            tags={[ 'COLORABLE' ]}
                            layout={{ position: 'absolute', left: 99, width: 146, top: 23, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <ThemeText
                                text={captionTimerCaptionTxt ?? t('landing.view.pageexpiry.timeremaining')}
                                textStyle="text-style-il-heading-3"
                                textOptions={{ align: 'center' }}
                            />
                        </Region>
                        <WidgetSlot
                            widgetType="countdown"
                            name="countdown_widget"
                            options={{ 'countdown:running': 'true' }}
                            layout={{ position: 'absolute', left: 124, width: 99, top: 41, height: 37 }}
                        />
                    </Region>
                    <Region
                        name="page_desc_txt"
                        tags={[ 'COLORABLE' ]}
                        layout={{ width: 250, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPageDescTxt ?? 'Desc PH'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                        />
                    </Region>
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
