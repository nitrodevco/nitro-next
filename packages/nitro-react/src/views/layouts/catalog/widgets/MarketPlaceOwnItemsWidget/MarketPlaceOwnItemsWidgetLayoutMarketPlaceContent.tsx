import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { MarketPlaceOwnItemsWidgetLayoutItemList, MarketPlaceOwnItemsWidgetLayoutItemListProps } from './MarketPlaceOwnItemsWidgetLayoutItemList';

/** Named region `market_place_content` of MarketPlaceOwnItemsWidgetLayout - configured through the parent's `marketPlaceContent` prop. */
export interface MarketPlaceOwnItemsWidgetLayoutMarketPlaceContentProps {
    captionRedeemInfo?: string;
    captionStatusText?: string;
    itemList?: MarketPlaceOwnItemsWidgetLayoutItemListProps;
    layout?: BoxLayout;
}

export const MarketPlaceOwnItemsWidgetLayoutMarketPlaceContent = ({ captionRedeemInfo, captionStatusText, itemList, layout }: MarketPlaceOwnItemsWidgetLayoutMarketPlaceContentProps) => {
    const t = useTranslation();

    return (
        <Region
            name="market_place_content"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ThemeText
                text={captionRedeemInfo ?? t('lorem.header')}
                textStyle="text-style-u-italic"
                textOptions={{ wordWrap: true, wordWrapWidth: 320 }}
                name="redeem_info"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, width: 320, top: 0, height: 44 }}
            />
            <ThemeText
                text={captionStatusText ?? t('lorem.title')}
                textStyle="text-style-u-small"
                name="status_text"
                layout={{ position: 'absolute', left: 0, width: 62, top: 96, height: 15 }}
            />
            <MarketPlaceOwnItemsWidgetLayoutItemList {...itemList} />
        </Region>
    );
};
