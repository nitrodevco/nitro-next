import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `goal_info` of CommunityGoalVotingLayout - pass real rows through its `items…` slot. */
export interface CommunityGoalVotingLayoutGoalInfoItemProps {
    captionGoalInfo?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
}

export const CommunityGoalVotingLayoutGoalInfoItem = ({ captionGoalInfo, colorableTextColor, layout }: CommunityGoalVotingLayoutGoalInfoItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionGoalInfo ?? t('landing.view.community.info')}
            textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 300 }}
            name="goal_info"
            verticalAlign="top"
            layout={{ alignSelf: 'stretch', height: 16, flexShrink: 0, minWidth: 300, maxWidth: 300, ...layout }}
        />
    );
};
