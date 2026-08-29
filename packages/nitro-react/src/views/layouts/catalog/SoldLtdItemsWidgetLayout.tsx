import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1637_soldLtdItemsWidget_xml` (layout "soldLtdItemsWidget", 360x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SoldLtdItemsWidgetLayoutProps {
    layout?: BoxLayout;
    widgetContainer?: SoldLtdItemsWidgetLayoutWidgetContainerProps;
}

export const SoldLtdItemsWidgetLayout = ({ layout, widgetContainer }: SoldLtdItemsWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 30, ...layout }}>
            <SoldLtdItemsWidgetLayoutWidgetContainer {...widgetContainer} />
        </Region>
    );
};

/** Named region `widgetContainer` of SoldLtdItemsWidgetLayout - configured through the parent's `widgetContainer` prop. */
export interface SoldLtdItemsWidgetLayoutWidgetContainerProps {
    captionCheckMarkeplaceLink?: string;
    captionNotAvailableText?: string;
    layout?: BoxLayout;
    onCheckMarkeplaceLink?: () => void;
}

export const SoldLtdItemsWidgetLayoutWidgetContainer = ({ captionCheckMarkeplaceLink, captionNotAvailableText, layout, onCheckMarkeplaceLink }: SoldLtdItemsWidgetLayoutWidgetContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="widgetContainer"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 30, ...layout }}
        >
            <ThemeImage
                params={16}
                src={layoutImage('unique_item_large_na_button_wide.png')}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 30 }}
            />
            <Region
                name="not_available_text"
                params={16}
                layout={{ position: 'absolute', left: 204, width: 137, top: 8, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionNotAvailableText ?? t('sold.ltd.items.not.available')}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#101027', align: 'center' }}
                />
            </Region>
            <Region
                name="check_markeplace_link"
                params={1}
                visible={false}
                layout={{ position: 'absolute', left: 18, width: 179, top: 8, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                onPointerTap={onCheckMarkeplaceLink}
                cursor="pointer"
            >
                <ThemeText
                    text={captionCheckMarkeplaceLink ?? t('sold.ltd.items.check.marketplace')}
                    textOptions={{ fill: '#101030', align: 'center' }}
                />
            </Region>
        </Region>
    );
};
