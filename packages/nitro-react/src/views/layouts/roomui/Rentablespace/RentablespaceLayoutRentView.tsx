import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { RentablespaceLayoutCantRentErrorItem } from './RentablespaceLayoutCantRentErrorItem';
import { RentablespaceLayoutIconHabboclubItem } from './RentablespaceLayoutIconHabboclubItem';
import { RentablespaceLayoutRentButtonItem } from './RentablespaceLayoutRentButtonItem';
import { RentablespaceLayoutRentInstructionsItem } from './RentablespaceLayoutRentInstructionsItem';

/** Named region `rent_view` of RentablespaceLayout - configured through the parent's `rentView` prop. */
export interface RentablespaceLayoutRentViewProps {
    itemsRentView?: ReactNode;
    layout?: BoxLayout;
}

export const RentablespaceLayoutRentView = ({ itemsRentView, layout }: RentablespaceLayoutRentViewProps) => {
    return (
        <Region
            name="rent_view"
            layout={{ position: 'absolute', left: 2, minWidth: 243, top: 4, minHeight: 216, flexDirection: 'column', gap: 10, ...layout }}
        >
            {itemsRentView ?? (
                <>
                    <RentablespaceLayoutRentInstructionsItem />
                    <RentablespaceLayoutRentButtonItem />
                    <RentablespaceLayoutCantRentErrorItem />
                    <RentablespaceLayoutIconHabboclubItem />
                </>
            )}
        </Region>
    );
};
