import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `rule1` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutRule1ItemProps {
    captionRule1?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutRule1Item = ({ captionRule1, layout }: ChestGenericLayoutRule1ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rule1"
            layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRule1 ?? t('wiredchests.lock_info.rule_1')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};
