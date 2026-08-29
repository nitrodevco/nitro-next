import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `37_pixel_removal_credit_promo_xml` (layout "pixel_removal_catalog_page", 350x340) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PixelRemovalCreditPromoLayoutProps {
    captionPageDescTxt?: string;
    captionPageHeaderTxt?: string;
    captionPixelRemovalTitle?: string;
    layout?: BoxLayout;
    onOpenCatalogButton?: () => void;
    pixelsCountdownWidget?: ReactNode;
    separatorWidget?: ReactNode;
    srcLeftMid?: string;
    srcLiftBottom?: string;
    srcLiftHeader?: string;
    srcPromoBitmap?: string;
    tintPromoBitmap?: string;
}

export const PixelRemovalCreditPromoLayout = ({ captionPageDescTxt, captionPageHeaderTxt, captionPixelRemovalTitle, layout, onOpenCatalogButton, pixelsCountdownWidget, separatorWidget, srcLeftMid, srcLiftBottom, srcLiftHeader, srcPromoBitmap, tintPromoBitmap }: PixelRemovalCreditPromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 350, height: 340, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="lift_header"
                    src={srcLiftHeader ?? '${image.library.url}reception/silverscreen250_top.png'}
                    layout={{ position: 'absolute', left: 0, width: 250, top: 39, height: 33 }}
                />
                <ThemeImage
                    name="left_mid"
                    src={srcLeftMid ?? '${image.library.url}reception/silverscreen250_mid2.png'}
                    layout={{ position: 'absolute', left: 0, width: 250, top: 72, bottom: 35, minHeight: 1 }}
                />
                <ThemeImage
                    name="lift_bottom"
                    src={srcLiftBottom ?? '${image.library.url}reception/silverscreen250_btm.png'}
                    layout={{ position: 'absolute', left: 0, width: 250, bottom: -1, height: 37 }}
                />
                <ThemeImage
                    name="promo_bitmap"
                    src={srcPromoBitmap}
                    tint={tintPromoBitmap}
                    layout={{ position: 'absolute', left: 5, width: 120, top: 157, height: 135 }}
                />
                <Region
                    name="page_header_txt"
                    layout={{ position: 'absolute', left: 120, width: 120, top: 161, height: 43, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPageHeaderTxt ?? t('landing.view.pixelremoval.caption')}
                        textStyle="text-style-il-heading-1"
                        textOptions={{ wordWrap: true, wordWrapWidth: 120 }}
                    />
                </Region>
                <Region
                    name="page_desc_txt"
                    layout={{ position: 'absolute', left: 120, width: 120, top: 198, height: 78, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPageDescTxt ?? t('landing.view.pixelremoval.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 120 }}
                    />
                </Region>
                <Button
                    variant="100"
                    name="open_catalog_button"
                    onPointerTap={onOpenCatalogButton}
                    layout={{ position: 'absolute', left: 115, width: 125, bottom: 31, height: 48, maxWidth: 125, minHeight: 48, maxHeight: 48 }}
                >
                    {t('landing.view.pixelremoval.button')}
                </Button>
                <WidgetSlot
                    widgetType="separator"
                    layout={{ position: 'absolute', left: 19, width: 210, top: 121, height: 31 }}
                >
                    {separatorWidget}
                </WidgetSlot>
                <Region
                    name="pixel_removal_title"
                    layout={{ position: 'absolute', left: 9, width: 233, top: 69, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                >
                    <ThemeText
                        text={captionPixelRemovalTitle ?? t('landing.view.pixelremoval.countdown')}
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="countdown"
                    name="pixels_countdown_widget"
                    layout={{ position: 'absolute', left: 75, width: 99, top: 86, height: 37 }}
                >
                    {pixelsCountdownWidget}
                </WidgetSlot>
            </Region>
        </Region>
    );
};
