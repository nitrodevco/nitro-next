import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `rule3` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutRule3ItemProps {
    captionRule3?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutRule3Item = ({ captionRule3, layout }: ChestGenericLayoutRule3ItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionRule3 ?? t('wiredchests.lock_info.rule_3')}
            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            name="rule3"
            verticalAlign="top"
            layout={{ width: 353, height: 44, flexShrink: 0, minWidth: 353, maxWidth: 353, ...layout }}
        />
    );
};
