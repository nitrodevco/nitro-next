import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { TotalPriceWidgetAmountTextLeftItem } from './TotalPriceWidgetAmountTextLeftItem';
import { TotalPriceWidgetAmountTextRightItem } from './TotalPriceWidgetAmountTextRightItem';
import { TotalPriceWidgetCurrencyIndicatorBitmapLeftItem } from './TotalPriceWidgetCurrencyIndicatorBitmapLeftItem';
import { TotalPriceWidgetCurrencyIndicatorBitmapRightItem } from './TotalPriceWidgetCurrencyIndicatorBitmapRightItem';
import { TotalPriceWidgetPlusItem } from './TotalPriceWidgetPlusItem';
import { TotalPriceWidgetTotalLeftItem } from './TotalPriceWidgetTotalLeftItem';
import { TotalPriceWidgetTotalRightItem } from './TotalPriceWidgetTotalRightItem';

/** Named region `totalprice_container` of TotalPriceWidget - configured through the parent's `totalpriceContainer` prop. */
export interface TotalPriceWidgetTotalpriceContainerProps {
    itemsTotalpriceContainer?: ReactNode;
    layout?: BoxLayout;
}

export const TotalPriceWidgetTotalpriceContainer = ({ itemsTotalpriceContainer, layout }: TotalPriceWidgetTotalpriceContainerProps) => {
    return (
        <Region
            name="totalprice_container"
            layout={{ position: 'absolute', right: 3, top: 1, flexDirection: 'row', ...layout }}
        >
            {itemsTotalpriceContainer ?? (
                <>
                    <TotalPriceWidgetTotalLeftItem />
                    <TotalPriceWidgetAmountTextLeftItem />
                    <TotalPriceWidgetCurrencyIndicatorBitmapLeftItem />
                    <TotalPriceWidgetPlusItem />
                    <TotalPriceWidgetTotalRightItem />
                    <TotalPriceWidgetAmountTextRightItem />
                    <TotalPriceWidgetCurrencyIndicatorBitmapRightItem />
                </>
            )}
        </Region>
    );
};
