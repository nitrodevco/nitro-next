import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `crule2` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutCrule2ItemProps {
    captionCrule2?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutCrule2Item = ({ captionCrule2, layout }: ChestGenericLayoutCrule2ItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionCrule2 ?? t('wiredchests.capacity_info.rule_2')}
            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            name="crule2"
            verticalAlign="top"
            layout={{ width: 353, height: 44, flexShrink: 0, minWidth: 353, maxWidth: 353, ...layout }}
        />
    );
};
