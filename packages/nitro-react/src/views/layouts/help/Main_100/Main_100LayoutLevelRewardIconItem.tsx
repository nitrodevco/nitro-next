import { BoxLayout, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `level_reward_icon` of Main_100Layout - pass real rows through its `items…` slot. */
export interface Main_100LayoutLevelRewardIconItemProps {
    layout?: BoxLayout;
    srcLevelRewardIcon?: string;
}

export const Main_100LayoutLevelRewardIconItem = ({ layout, srcLevelRewardIcon }: Main_100LayoutLevelRewardIconItemProps) => {
    return (
        <ThemeImage
            name="level_reward_icon"
            src={srcLevelRewardIcon ?? layoutImage('reward_track_point_small.png')}
            layout={{ width: 19, height: 14, flexShrink: 0, ...layout }}
        />
    );
};
