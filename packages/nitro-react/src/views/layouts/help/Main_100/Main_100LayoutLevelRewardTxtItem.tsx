import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `level_reward_txt` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutLevelRewardTxtItemProps {
    captionLevelRewardTxt?: string;
    layout?: BoxLayout;
}

export const Main_100LayoutLevelRewardTxtItem = ({ captionLevelRewardTxt, layout }: Main_100LayoutLevelRewardTxtItemProps) => {
    return (
        <ThemeText
            text={captionLevelRewardTxt ?? '30'}
            name="level_reward_txt"
            layout={{ width: 20, height: 19, flexShrink: 0, ...layout }}
        />
    );
};
