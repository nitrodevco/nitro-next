import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `crule1` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutCrule1ItemProps {
    captionCrule1?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutCrule1Item = ({ captionCrule1, layout }: ChestGenericLayoutCrule1ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="crule1"
            layout={{ width: 353, height: 44, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCrule1 ?? t('wiredchests.capacity_info.rule_1')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};
