import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `rule2` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutRule2ItemProps {
    captionRule2?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutRule2Item = ({ captionRule2, layout }: ChestGenericLayoutRule2ItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionRule2 ?? t('wiredchests.lock_info.rule_2')}
            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            name="rule2"
            verticalAlign="top"
            layout={{ width: 353, height: 44, flexShrink: 0, minWidth: 353, maxWidth: 353, ...layout }}
        />
    );
};
