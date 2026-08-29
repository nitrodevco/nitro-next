import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `reward_product_template` of LevelUpLayout - pass real rows through its `items…` slot. */
export interface LevelUpLayoutRewardProductTemplateItemProps {
    layout?: BoxLayout;
    srcRewardProductTemplate?: string;
}

export const LevelUpLayoutRewardProductTemplateItem = ({ layout, srcRewardProductTemplate }: LevelUpLayoutRewardProductTemplateItemProps) => {
    return (
        <ThemeImage
            name="reward_product_template"
            src={srcRewardProductTemplate}
            layout={{ width: 35, height: 35, flexShrink: 0, ...layout }}
        />
    );
};
