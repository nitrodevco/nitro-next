import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { ChestGenericLayoutCapacityInputBorderItem } from './ChestGenericLayoutCapacityInputBorderItem';
import { ChestGenericLayoutMaxCapacityTxtItem } from './ChestGenericLayoutMaxCapacityTxtItem';
import { ChestGenericLayoutUpgradeCapacityRegionItem } from './ChestGenericLayoutUpgradeCapacityRegionItem';

/** Row template `capacity_options` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutCapacityOptionsItemProps {
    captionItemCountText?: string;
    itemsCapacityOverrideContainer?: ReactNode;
    itemsUpgradeCapacityContainer?: ReactNode;
    layout?: BoxLayout;
    splitter?: ReactNode;
    visibleCapacityOverrideContainer?: boolean;
    visibleItemCountText?: boolean;
    visibleSplitter?: boolean;
    visibleUpgradeCapacityContainer?: boolean;
}

export const ChestGenericLayoutCapacityOptionsItem = ({ captionItemCountText, itemsCapacityOverrideContainer, itemsUpgradeCapacityContainer, layout, splitter, visibleCapacityOverrideContainer, visibleItemCountText, visibleSplitter, visibleUpgradeCapacityContainer }: ChestGenericLayoutCapacityOptionsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="capacity_options"
            layout={{ width: 443, height: 30, flexShrink: 0, ...layout }}
        >
            {(visibleItemCountText ?? false) && (
                <Region
                    name="item_count_text"
                    layout={{ position: 'absolute', left: 0, width: 184, top: 4, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionItemCountText ?? t('wiredchests.space_used')}
                </Region>
            )}
            {(visibleCapacityOverrideContainer ?? true) && (
                <Region
                    name="capacity_override_container"
                    layout={{ position: 'absolute', left: 0, width: 156, top: 2, height: 22, flexDirection: 'row', gap: 6 }}
                >
                    {itemsCapacityOverrideContainer ?? (
                        <ChestGenericLayoutCapacityInputBorderItem />
                    )}
                    <ThemeText
                        text={t('wiredchests.capacity')}
                        layout={{ width: 85, height: 17, flexShrink: 0 }}
                    />
                </Region>
            )}
            {(visibleUpgradeCapacityContainer ?? true) && (
                <Region
                    name="upgrade_capacity_container"
                    layout={{ position: 'absolute', right: 16, width: 200, top: 0, height: 25, flexDirection: 'row', gap: 6 }}
                >
                    {itemsUpgradeCapacityContainer ?? (
                        <>
                            <ChestGenericLayoutMaxCapacityTxtItem />
                            <ChestGenericLayoutUpgradeCapacityRegionItem />
                        </>
                    )}
                </Region>
            )}
            {(visibleSplitter ?? true) && (
                <Region
                    name="splitter"
                    backgroundColor="#b0b0b0"
                    layout={{ position: 'absolute', left: 0, right: 14, top: 29, height: 1 }}
                >
                    {splitter}
                </Region>
            )}
        </Region>
    );
};
