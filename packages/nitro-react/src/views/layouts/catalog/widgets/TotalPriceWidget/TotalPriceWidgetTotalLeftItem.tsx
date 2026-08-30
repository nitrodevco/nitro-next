import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `total_left` of TotalPriceWidget - pass real rows through its `items…` slot. */
export interface TotalPriceWidgetTotalLeftItemProps {
    captionText?: string;
    layout?: BoxLayout;
    strike?: ReactNode;
    visibleStrike?: boolean;
    visibleText?: boolean;
}

export const TotalPriceWidgetTotalLeftItem = ({ captionText, layout, strike, visibleStrike, visibleText }: TotalPriceWidgetTotalLeftItemProps) => {
    return (
        <Region
            name="total_left"
            layout={{ width: 10, height: 20, flexShrink: 0, ...layout }}
        >
            {(visibleText ?? true) && (
                <ThemeText
                    text={captionText ?? '0'}
                    textOptions={{ fill: '#999999' }}
                    name="text"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 3, height: 17 }}
                />
            )}
            {(visibleStrike ?? true) && (
                <Region
                    name="strike"
                    backgroundColor="#ff0000"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 10, height: 2 }}
                >
                    {strike}
                </Region>
            )}
        </Region>
    );
};
