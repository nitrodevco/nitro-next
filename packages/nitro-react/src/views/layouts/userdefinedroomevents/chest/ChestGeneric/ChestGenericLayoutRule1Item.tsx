import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `rule1` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutRule1ItemProps {
    captionRule1?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutRule1Item = ({ captionRule1, layout }: ChestGenericLayoutRule1ItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionRule1 ?? t('wiredchests.lock_info.rule_1')}
            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            name="rule1"
            verticalAlign="top"
            layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, ...layout }}
        />
    );
};
