import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `guide_tool_talent` of GuideToolLayout - pass real rows through its `items…` slot. */
export interface GuideToolLayoutGuideToolTalentItemProps {
    captionGuideToolTalent?: string;
    layout?: BoxLayout;
    onGuideToolTalent?: () => void;
}

export const GuideToolLayoutGuideToolTalentItem = ({ captionGuideToolTalent, layout, onGuideToolTalent }: GuideToolLayoutGuideToolTalentItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="guide_tool_talent"
            tooltip={t('guide.help.guide.tool.skill.tooltip')}
            layout={{ alignSelf: 'stretch', height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', ...layout }}
            onPointerTap={onGuideToolTalent}
            cursor="pointer"
        >
            <ThemeText
                text={captionGuideToolTalent ?? t('guide.help.guide.tool.skill.link')}
                textOptions={{ align: 'center' }}
            />
        </Region>
    );
};
