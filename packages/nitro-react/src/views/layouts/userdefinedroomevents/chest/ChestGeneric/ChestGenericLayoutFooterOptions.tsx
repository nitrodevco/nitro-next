import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ChestGenericLayoutCapacityOptionsItem } from './ChestGenericLayoutCapacityOptionsItem';
import { ChestGenericLayoutLockingOptionsItem } from './ChestGenericLayoutLockingOptionsItem';

/** Named region `footer_options` of ChestGenericLayout - configured through the parent's `footerOptions` prop. */
export interface ChestGenericLayoutFooterOptionsProps {
    itemsFooterOptions?: ReactNode;
    layout?: BoxLayout;
}

export const ChestGenericLayoutFooterOptions = ({ itemsFooterOptions, layout }: ChestGenericLayoutFooterOptionsProps) => {
    return (
        <Region
            name="footer_options"
            layout={{ position: 'absolute', left: 17, right: 0, top: 7, height: 75, flexDirection: 'column', gap: 4, ...layout }}
        >
            {itemsFooterOptions ?? (
                <>
                    <ChestGenericLayoutLockingOptionsItem />
                    <ChestGenericLayoutCapacityOptionsItem />
                </>
            )}
        </Region>
    );
};
