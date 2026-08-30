import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `rule5` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutRule5ItemProps {
    captionRule5?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutRule5Item = ({ captionRule5, layout }: ChestGenericLayoutRule5ItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionRule5 ?? t('wiredchests.lock_info.rule_5')}
            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            name="rule5"
            verticalAlign="top"
            layout={{ width: 353, height: 44, flexShrink: 0, minWidth: 353, maxWidth: 353, ...layout }}
        />
    );
};
