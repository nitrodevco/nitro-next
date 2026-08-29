import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonGroupCenter, ButtonGroupLeft, ButtonGroupRight, Region, ThemeText } from '#base/theme';

import { MarketPlaceWidgetLayoutOfferList, MarketPlaceWidgetLayoutOfferListProps } from './MarketPlaceWidgetLayoutOfferList';

/** Generated from `1596_marketPlaceWidget_xml` (layout "marketPlaceWidget", 360x390) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MarketPlaceWidgetLayoutProps {
    captionStatusText?: string;
    layout?: BoxLayout;
    offerList?: MarketPlaceWidgetLayoutOfferListProps;
    onSearchAdvanced?: () => void;
    onSearchByActivity?: () => void;
    onSearchByValue?: () => void;
}

export const MarketPlaceWidgetLayout = ({ captionStatusText, layout, offerList, onSearchAdvanced, onSearchByActivity, onSearchByValue }: MarketPlaceWidgetLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 360, height: 390, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Region
                    name="search_selector"
                    layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 25 }}
                >
                    <ButtonGroupLeft
                        variant="100"
                        name="search_by_activity"
                        onPointerTap={onSearchByActivity}
                        layout={{ position: 'absolute', left: 0, right: 233, top: 0, bottom: 0, minWidth: 107, maxWidth: 107 }}
                    >
                        {t('catalog.marketplace.search_by_activity')}
                    </ButtonGroupLeft>
                    <ButtonGroupCenter
                        variant="100"
                        name="search_by_value"
                        onPointerTap={onSearchByValue}
                        layout={{ position: 'absolute', left: 107, right: 127, top: 0, bottom: 0, minWidth: 106, maxWidth: 106 }}
                    >
                        {t('catalog.marketplace.search_by_value')}
                    </ButtonGroupCenter>
                    <ButtonGroupRight
                        variant="100"
                        name="search_advanced"
                        onPointerTap={onSearchAdvanced}
                        layout={{ position: 'absolute', left: 213, right: 20, top: 0, bottom: 0, minWidth: 107, maxWidth: 107 }}
                    >
                        {t('catalog.marketplace.search_advanced')}
                    </ButtonGroupRight>
                </Region>
                <Border
                    variant="100"
                    name="search_container"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 30, height: 120 }}
                />
                <Region
                    name="status_text"
                    layout={{ position: 'absolute', left: 2, width: 62, top: 155, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStatusText ?? t('lorem.title')}
                        textStyle="text-style-u-small"
                    />
                </Region>
                <MarketPlaceWidgetLayoutOfferList {...offerList} />
            </Region>
        </Region>
    );
};
