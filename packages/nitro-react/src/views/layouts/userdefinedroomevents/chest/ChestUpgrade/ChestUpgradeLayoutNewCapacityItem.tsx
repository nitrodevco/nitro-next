import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `new_capacity` of ChestUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestUpgradeLayoutNewCapacityItemProps {
    captionNewCapacity?: string;
    layout?: BoxLayout;
}

export const ChestUpgradeLayoutNewCapacityItem = ({ captionNewCapacity, layout }: ChestUpgradeLayoutNewCapacityItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionNewCapacity ?? t('wiredchests.upgrade.capacity.new')}
            textStyle="text-style-u-bold"
            textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
            name="new_capacity"
            verticalAlign="top"
            layout={{ width: 197, height: 30, flexShrink: 0, ...layout }}
        />
    );
};
