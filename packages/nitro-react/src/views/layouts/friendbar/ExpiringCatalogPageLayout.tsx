import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `67_expiring_catalog_page_xml` (layout "landing_view", 500x186) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ExpiringCatalogPageLayoutProps {
    captionPageDescTxt?: string;
    captionPageExpiryTitle?: string;
    captionPageHeaderTxt?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
    onOpenCatalogButton?: () => void;
    srcBorderBar?: string;
    srcHdrLine?: string;
    srcPromoBitmap?: string;
}

export const ExpiringCatalogPageLayout = ({ captionPageDescTxt, captionPageExpiryTitle, captionPageHeaderTxt, colorableTextColor, layout, onOpenCatalogButton, srcBorderBar, srcHdrLine, srcPromoBitmap }: ExpiringCatalogPageLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 186, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 186, maxWidth: 500 }}
            >
                <ThemeImage
                    name="border_bar"
                    src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 7, width: 12, top: 10, height: 4, minHeight: 4, maxHeight: 4 }}
                />
                <Region
                    name="page_expiry_title"
                    layout={{ position: 'absolute', left: 24, width: 133, top: 4, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPageExpiryTitle ?? t('landing.view.pageexpiry.title')}
                        textStyle="text-style-il-heading-3"
                        textOptions={{ fill: colorableTextColor }}
                    />
                </Region>
                <ThemeImage
                    name="hdr_line"
                    src={srcHdrLine ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 167, width: 330, top: 10, height: 4, minHeight: 4, maxHeight: 4 }}
                />
                <Region layout={{ position: 'absolute', left: 239, width: 259, top: 19, height: 155, flexDirection: 'column' }}>
                    <WidgetSlot
                        widgetType="countdown"
                        name="countdown_widget"
                        options={{ 'countdown:running': 'true' }}
                        layout={{ width: 99, height: 37, flexShrink: 0 }}
                    />
                    <Region
                        name="spacing"
                        layout={{ width: 30, height: 6, flexShrink: 0 }}
                    />
                    <Region
                        name="page_header_txt"
                        layout={{ width: 183, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPageHeaderTxt ?? 'Get your Executive on!'}
                            textStyle="text-style-il-heading-1"
                            textOptions={{ fill: colorableTextColor }}
                        />
                    </Region>
                    <Region
                        name="page_desc_txt"
                        layout={{ width: 260, height: 40, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPageDescTxt ?? '...and everything must go, so get yourself some of the sweet, sweet plastic fantastic while you still can! You don\'t want to miss out on the classics!'}
                            textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 260 }}
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
                <ThemeImage
                    name="promo_bitmap"
                    src={srcPromoBitmap ?? '${image.library.catalogue.url}kitchen_teaser_de.gif'}
                    layout={{ position: 'absolute', left: 52, width: 162, top: 20, height: 162 }}
                />
            </Region>
        </Region>
    );
};
