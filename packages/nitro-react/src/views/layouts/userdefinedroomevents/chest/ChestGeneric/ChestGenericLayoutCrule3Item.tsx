import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `crule3` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutCrule3ItemProps {
    captionCrule3?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutCrule3Item = ({ captionCrule3, layout }: ChestGenericLayoutCrule3ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="crule3"
            layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCrule3 ?? t('wiredchests.capacity_info.rule_3')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};
