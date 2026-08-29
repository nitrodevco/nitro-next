import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredStyleUbuntuLayoutAddMoreContainerItem } from './WiredStyleUbuntuLayoutAddMoreContainerItem';
import { WiredStyleUbuntuLayoutElementEntryTemplateItem } from './WiredStyleUbuntuLayoutElementEntryTemplateItem';

/** Named region `grid` of WiredStyleUbuntuLayout - configured through the parent's `grid` prop. */
export interface WiredStyleUbuntuLayoutGridProps {
    itemsGrid?: ReactNode;
    layout?: BoxLayout;
}

export const WiredStyleUbuntuLayoutGrid = ({ itemsGrid, layout }: WiredStyleUbuntuLayoutGridProps) => {
    return (
        <Region
            name="grid"
            layout={{ position: 'absolute', left: 6, right: 6, top: 21, height: 42, flexDirection: 'row', flexWrap: 'wrap', gap: 6, ...layout }}
        >
            {itemsGrid ?? (
                <>
                    <WiredStyleUbuntuLayoutElementEntryTemplateItem />
                    <WiredStyleUbuntuLayoutAddMoreContainerItem />
                </>
            )}
        </Region>
    );
};
