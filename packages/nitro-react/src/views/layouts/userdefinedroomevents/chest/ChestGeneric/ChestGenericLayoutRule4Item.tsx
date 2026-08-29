import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `rule4` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutRule4ItemProps {
    captionRule4?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutRule4Item = ({ captionRule4, layout }: ChestGenericLayoutRule4ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rule4"
            layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRule4 ?? t('wiredchests.lock_info.rule_4')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};
