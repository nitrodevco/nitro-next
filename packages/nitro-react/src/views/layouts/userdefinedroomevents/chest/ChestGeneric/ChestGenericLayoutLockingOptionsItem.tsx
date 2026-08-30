import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, CheckBox, Region, ThemeText } from '#base/theme';

import { ChestGenericLayoutSplitterItem } from './ChestGenericLayoutSplitterItem';

/** Row template `locking_options` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutLockingOptionsItemProps {
    itemsLockingOptions?: ReactNode;
    layout?: BoxLayout;
    onAutoLockChestCbx?: () => void;
    onLockChestCbx?: () => void;
    visibleAutoLockChestCbx?: boolean;
    visibleLockChestCbx?: boolean;
}

export const ChestGenericLayoutLockingOptionsItem = ({ itemsLockingOptions, layout, onAutoLockChestCbx, onLockChestCbx, visibleAutoLockChestCbx, visibleLockChestCbx }: ChestGenericLayoutLockingOptionsItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="locking_options"
            layout={{ width: 443, height: 41, flexShrink: 0, flexDirection: 'column', gap: 4, ...layout }}
        >
            {itemsLockingOptions ?? (
                <ChestGenericLayoutSplitterItem />
            )}
            <Region layout={{ width: 106, height: 16, flexShrink: 0, flexDirection: 'row', gap: 5 }}>
                {(visibleLockChestCbx ?? true) && (
                    <CheckBox
                        variant="3"
                        name="lock_chest_cbx"
                        onPointerTap={onLockChestCbx}
                        layout={{ width: 15, height: 15, flexShrink: 0 }}
                    />
                )}
                <ThemeText
                    text={t('wiredchests.lock_chest')}
                    layout={{ width: 86, height: 17, flexShrink: 0 }}
                />
            </Region>
            <Region layout={{ width: 286, height: 16, flexShrink: 0, flexDirection: 'row', gap: 5 }}>
                {(visibleAutoLockChestCbx ?? true) && (
                    <CheckBox
                        variant="3"
                        name="auto_lock_chest_cbx"
                        onPointerTap={onAutoLockChestCbx}
                        layout={{ width: 15, height: 15, flexShrink: 0 }}
                    />
                )}
                <ThemeText
                    text={t('wiredchests.auto_lock_chest')}
                    layout={{ width: 266, height: 17, flexShrink: 0 }}
                />
            </Region>
        </Region>
    );
};
