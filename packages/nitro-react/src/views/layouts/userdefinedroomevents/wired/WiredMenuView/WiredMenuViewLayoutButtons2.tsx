import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredMenuViewLayoutFurniOptionItem2 } from './WiredMenuViewLayoutFurniOptionItem2';
import { WiredMenuViewLayoutGlobalOptionItem2 } from './WiredMenuViewLayoutGlobalOptionItem2';
import { WiredMenuViewLayoutUserOptionItem2 } from './WiredMenuViewLayoutUserOptionItem2';

/** Named region `buttons` of WiredMenuViewLayout - configured through the parent's `buttons` prop. */
export interface WiredMenuViewLayoutButtons2Props {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const WiredMenuViewLayoutButtons2 = ({ itemsButtons, layout }: WiredMenuViewLayoutButtons2Props) => {
    return (
        <Region
            name="buttons"
            layout={{ position: 'absolute', left: 5, width: 131, top: 5, height: 37, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <WiredMenuViewLayoutFurniOptionItem2 />
                    <WiredMenuViewLayoutUserOptionItem2 />
                    <WiredMenuViewLayoutGlobalOptionItem2 />
                </>
            )}
        </Region>
    );
};
