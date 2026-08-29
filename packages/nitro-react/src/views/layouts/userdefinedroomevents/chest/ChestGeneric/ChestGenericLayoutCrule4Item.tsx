import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `crule4` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutCrule4ItemProps {
    captionCrule4?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutCrule4Item = ({ captionCrule4, layout }: ChestGenericLayoutCrule4ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="crule4"
            layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCrule4 ?? t('wiredchests.capacity_info.rule_4')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};
