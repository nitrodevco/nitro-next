import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, Shape, ThemeImage, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `prize_template_premium` of Main_100Layout - configured through the parent's `prizeTemplatePremium` prop. */
export interface Main_100LayoutPrizeTemplatePremiumProps {
    connector?: ReactNode;
    layout?: BoxLayout;
    onClickRegion?: () => void;
    productIcon?: ReactNode;
    srcClaimedIcon?: string;
    srcLockedIcon?: string;
}

export const Main_100LayoutPrizeTemplatePremium = ({ connector, layout, onClickRegion, productIcon, srcClaimedIcon, srcLockedIcon }: Main_100LayoutPrizeTemplatePremiumProps) => {
    const t = useTranslation();

    return (
        <Region
            name="prize_template_premium"
            layout={{ position: 'absolute', left: 9, width: 80, top: 89, height: 104, ...layout }}
        >
            <Region
                name="click_region"
                tooltip={t('reward_track.rewards.reward_tooltip.premium')}
                dynamicStyle="reward_track_item"
                onPointerTap={onClickRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 12, width: 56, top: 34, height: 60 }}
            >
                <Border
                    variant="1"
                    name="shadow"
                    blend={0.25}
                    layout={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 16 }}
                />
                <Border
                    variant="16"
                    name="border"
                    tintColor="#f1def7"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 2, bottom: 2, justifyContent: 'center' }}
                >
                    <WidgetSlot
                        widgetType="product_icon"
                        name="product_icon"
                        layout={{ position: 'absolute', width: 40, alignSelf: 'center', height: 40 }}
                    >
                        {productIcon}
                    </WidgetSlot>
                    <Shape
                        name="quantity_container"
                        shape="round_rectangle"
                        color="#f1def7"
                        strokeColor="#000000"
                        strokeThickness={1}
                        radius={5}
                        layout={{ position: 'absolute', width: 20, bottom: 5, height: 14 }}
                    />
                </Border>
            </Region>
            <Region
                name="connector"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 39, width: 2, bottom: 66, height: 19 }}
            >
                {connector}
            </Region>
            <ThemeImage
                name="locked_icon"
                src={srcLockedIcon ?? layoutImage('reward_track_locked_reward.png')}
                layout={{ position: 'absolute', left: 53, width: 18, top: 78, height: 22 }}
            />
            <ThemeImage
                name="claimed_icon"
                src={srcClaimedIcon ?? layoutImage('reward_track_checkmark.png')}
                layout={{ position: 'absolute', left: 54, width: 17, top: 28, height: 15 }}
            />
        </Region>
    );
};
