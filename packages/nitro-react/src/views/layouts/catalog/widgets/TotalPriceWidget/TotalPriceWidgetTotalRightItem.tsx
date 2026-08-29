import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `total_right` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetTotalRightItemProps {
    captionText?: string;
    layout?: BoxLayout;
    strike?: ReactNode;
    visibleStrike?: boolean;
    visibleText?: boolean;
}

export const TotalPriceWidgetTotalRightItem = ({ captionText, layout, strike, visibleStrike, visibleText }: TotalPriceWidgetTotalRightItemProps) => {
    return (
        <Region
            name="total_right"
            layout={{ width: 10, height: 20, flexShrink: 0, ...layout }}
        >
            {(visibleText ?? true) && (
                <Region
                    name="text"
                    layout={{ position: 'absolute', left: 0, width: 10, top: 3, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionText ?? '0'}
                        textOptions={{ fill: '#999999' }}
                    />
                </Region>
            )}
            {(visibleStrike ?? true) && (
                <Region
                    name="strike"
                    backgroundColor="#ff0000"
                    layout={{ position: 'absolute', left: 0, width: 10, top: 10, height: 2 }}
                >
                    {strike}
                </Region>
            )}
        </Region>
    );
};
