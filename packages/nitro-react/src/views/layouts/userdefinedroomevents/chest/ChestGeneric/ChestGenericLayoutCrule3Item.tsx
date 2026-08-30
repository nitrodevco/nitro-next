import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `crule3` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutCrule3ItemProps {
    captionCrule3?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutCrule3Item = ({ captionCrule3, layout }: ChestGenericLayoutCrule3ItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionCrule3 ?? t('wiredchests.capacity_info.rule_3')}
            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            name="crule3"
            verticalAlign="top"
            layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, ...layout }}
        />
    );
};
