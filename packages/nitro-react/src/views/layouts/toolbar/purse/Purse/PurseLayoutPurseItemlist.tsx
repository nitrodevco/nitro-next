import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { PurseLayoutCreditCountButtonItem } from './PurseLayoutCreditCountButtonItem';
import { PurseLayoutDiamondCountButtonItem } from './PurseLayoutDiamondCountButtonItem';
import { PurseLayoutDucketCountButtonItem } from './PurseLayoutDucketCountButtonItem';

/** Named region `purse_itemlist` of PurseLayout - configured through the parent's `purseItemlist` prop. */
export interface PurseLayoutPurseItemlistProps {
    itemsPurseItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const PurseLayoutPurseItemlist = ({ itemsPurseItemlist, layout }: PurseLayoutPurseItemlistProps) => {
    return (
        <Region
            name="purse_itemlist"
            layout={{ position: 'absolute', left: 7, width: 52, top: 9, height: 55, maxHeight: 62, flexDirection: 'column', ...layout }}
        >
            {itemsPurseItemlist ?? (
                <>
                    <PurseLayoutDiamondCountButtonItem />
                    <PurseLayoutCreditCountButtonItem />
                    <PurseLayoutDucketCountButtonItem />
                </>
            )}
        </Region>
    );
};
