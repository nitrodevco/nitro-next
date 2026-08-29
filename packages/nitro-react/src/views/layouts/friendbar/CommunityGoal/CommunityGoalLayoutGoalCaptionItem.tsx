import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `goal_caption` of CommunityGoalLayout - pass real rows through its `items…` slot. */
export interface CommunityGoalLayoutGoalCaptionItemProps {
    captionGoalCaption?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
}

export const CommunityGoalLayoutGoalCaptionItem = ({ captionGoalCaption, colorableTextColor, layout }: CommunityGoalLayoutGoalCaptionItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="goal_caption"
            layout={{ width: 300, height: 24, flexShrink: 0, minWidth: 300, maxWidth: 300, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionGoalCaption ?? t('landing.view.community.caption')}
                textStyle="text-style-il-heading-1"
                textOptions={{ fill: colorableTextColor }}
            />
        </Region>
    );
};
