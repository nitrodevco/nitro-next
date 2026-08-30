import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `rule7` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutRule7ItemProps {
    captionRule7?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutRule7Item = ({ captionRule7, layout }: ChestGenericLayoutRule7ItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionRule7 ?? t('wiredchests.lock_info.rule_7')}
            textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            name="rule7"
            verticalAlign="top"
            layout={{ width: 353, height: 17, flexShrink: 0, minWidth: 353, maxWidth: 353, ...layout }}
        />
    );
};
