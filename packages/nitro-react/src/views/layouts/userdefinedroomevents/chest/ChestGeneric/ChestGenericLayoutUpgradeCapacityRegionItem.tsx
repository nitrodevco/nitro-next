import { BoxLayout, ContainerButton, Region } from '#base/theme';

/** Row template `upgrade_capacity_region` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutUpgradeCapacityRegionItemProps {
    layout?: BoxLayout;
    onUpgradeCapacityBtn?: () => void;
    onUpgradeCapacityRegion?: () => void;
    visibleUpgradeCapacityBtn?: boolean;
}

export const ChestGenericLayoutUpgradeCapacityRegionItem = ({ layout, onUpgradeCapacityBtn, onUpgradeCapacityRegion, visibleUpgradeCapacityBtn }: ChestGenericLayoutUpgradeCapacityRegionItemProps) => {
    return (
        <Region
            name="upgrade_capacity_region"
            onPointerTap={onUpgradeCapacityRegion}
            cursor="pointer"
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        >
            {(visibleUpgradeCapacityBtn ?? true) && (
                <ContainerButton
                    variant="3"
                    name="upgrade_capacity_btn"
                    onPointerTap={onUpgradeCapacityBtn}
                    layout={{ position: 'absolute', left: 0, width: 22, top: 0, height: 22 }}
                />
            )}
        </Region>
    );
};
