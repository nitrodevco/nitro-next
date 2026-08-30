import { ReactNode } from 'react';

import { Border, BoxLayout, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Row template `reward_template` of DailytasksLayout - pass real rows through its `items…` slot. */
export interface DailytasksLayoutRewardTemplateItemProps {
    captionRewardAmountText?: string;
    layout?: BoxLayout;
    rewardDisplayWidget?: ReactNode;
    srcRewardBitmap?: string;
    tintRewardBitmap?: string;
    visibleRewardAmountBorder?: boolean;
    visibleRewardAmountText?: boolean;
    visibleRewardBitmap?: boolean;
    visibleRewardDisplayWidget?: boolean;
}

export const DailytasksLayoutRewardTemplateItem = ({ captionRewardAmountText, layout, rewardDisplayWidget, srcRewardBitmap, tintRewardBitmap, visibleRewardAmountBorder, visibleRewardAmountText, visibleRewardBitmap, visibleRewardDisplayWidget }: DailytasksLayoutRewardTemplateItemProps) => {
    return (
        <Region
            name="reward_template"
            layout={{ width: 44, height: 50, flexShrink: 0, minWidth: 44, maxWidth: 44, minHeight: 50, maxHeight: 50, ...layout }}
        >
            {(visibleRewardDisplayWidget ?? true) && (
                <WidgetSlot
                    widgetType="product_icon"
                    name="reward_display_widget"
                    layout={{ position: 'absolute', left: 2, width: 40, top: 1, height: 40, minWidth: 40, maxWidth: 40, minHeight: 40, maxHeight: 40 }}
                >
                    {rewardDisplayWidget}
                </WidgetSlot>
            )}
            {(visibleRewardBitmap ?? false) && (
                <ThemeImage
                    name="reward_bitmap"
                    src={srcRewardBitmap}
                    tint={tintRewardBitmap}
                    layout={{ position: 'absolute', left: 0, width: 44, top: 0, height: 50, minWidth: 44, maxWidth: 44, minHeight: 50, maxHeight: 50 }}
                />
            )}
            {(visibleRewardAmountBorder ?? true) && (
                <Border
                    variant="3"
                    name="reward_amount_border"
                    tintColor="#7c7c7c"
                    blend={0.9}
                    layout={{ position: 'absolute', left: 8, right: 8, top: 36, height: 14, minHeight: 14, maxHeight: 14 }}
                >
                    {(visibleRewardAmountText ?? true) && (
                        <ThemeText
                            text={captionRewardAmountText ?? 'x10'}
                            textOptions={{ fill: '#ffffff' }}
                            name="reward_amount_text"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 15 }}
                        />
                    )}
                </Border>
            )}
        </Region>
    );
};
