import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `current_capacity` of ChestUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestUpgradeLayoutCurrentCapacityItemProps {
    captionCurrentCapacity?: string;
    layout?: BoxLayout;
}

export const ChestUpgradeLayoutCurrentCapacityItem = ({ captionCurrentCapacity, layout }: ChestUpgradeLayoutCurrentCapacityItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionCurrentCapacity ?? t('wiredchests.upgrade.capacity.current')}
            textStyle="text-style-u-bold"
            textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
            name="current_capacity"
            verticalAlign="top"
            layout={{ width: 197, height: 30, flexShrink: 0, ...layout }}
        />
    );
};
