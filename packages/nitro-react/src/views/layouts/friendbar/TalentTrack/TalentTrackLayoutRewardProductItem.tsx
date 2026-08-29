import { Border, BoxLayout, ThemeImage } from '#base/theme';

/** Row template `reward_product` of TalentTrackLayout - pass real rows through its `items…` slot. */
export interface TalentTrackLayoutRewardProductItemProps {
    layout?: BoxLayout;
    srcProductIcon?: string;
    visibleProductIcon?: boolean;
}

export const TalentTrackLayoutRewardProductItem = ({ layout, srcProductIcon, visibleProductIcon }: TalentTrackLayoutRewardProductItemProps) => {
    return (
        <Border
            variant="104"
            name="reward_product"
            blend={0.3}
            layout={{ width: 61, height: 60, flexShrink: 0, ...layout }}
        >
            <Border
                variant="105"
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 14, width: 33, top: 14, height: 33 }}
            >
                {(visibleProductIcon ?? true) && (
                    <ThemeImage
                        name="product_icon"
                        src={srcProductIcon}
                        layout={{ position: 'absolute', left: 1, width: 31, top: 1, height: 30 }}
                    />
                )}
            </Border>
        </Border>
    );
};
