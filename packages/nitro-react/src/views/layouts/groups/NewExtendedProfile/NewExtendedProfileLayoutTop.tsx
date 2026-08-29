import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { NewExtendedProfileLayoutSpacerItem } from './NewExtendedProfileLayoutSpacerItem';
import { NewExtendedProfileLayoutTopLeftItem } from './NewExtendedProfileLayoutTopLeftItem';
import { NewExtendedProfileLayoutTopRightItem } from './NewExtendedProfileLayoutTopRightItem';

/** Named region `top` of NewExtendedProfileLayout - configured through the parent's `top` prop. */
export interface NewExtendedProfileLayoutTopProps {
    itemsTop?: ReactNode;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutTop = ({ itemsTop, layout }: NewExtendedProfileLayoutTopProps) => {
    return (
        <Region
            name="top"
            layout={{ width: 500, height: 207, flexShrink: 0, flexDirection: 'row', gap: 8, ...layout }}
        >
            {itemsTop ?? (
                <>
                    <NewExtendedProfileLayoutTopLeftItem />
                    <NewExtendedProfileLayoutSpacerItem />
                    <NewExtendedProfileLayoutTopRightItem />
                </>
            )}
        </Region>
    );
};
