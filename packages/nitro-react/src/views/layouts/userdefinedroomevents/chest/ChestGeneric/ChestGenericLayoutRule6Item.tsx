import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `rule6` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutRule6ItemProps {
    captionRule6?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutRule6Item = ({ captionRule6, layout }: ChestGenericLayoutRule6ItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rule6"
            layout={{ width: 353, height: 30, flexShrink: 0, minWidth: 353, maxWidth: 353, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRule6 ?? t('wiredchests.lock_info.rule_6')}
                textOptions={{ wordWrap: true, wordWrapWidth: 353 }}
            />
        </Region>
    );
};
