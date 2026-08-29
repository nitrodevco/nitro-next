import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { WiredMenuViewLayoutContextOptionItem } from './WiredMenuViewLayoutContextOptionItem';
import { WiredMenuViewLayoutFurniOptionItem } from './WiredMenuViewLayoutFurniOptionItem';
import { WiredMenuViewLayoutGlobalOptionItem } from './WiredMenuViewLayoutGlobalOptionItem';
import { WiredMenuViewLayoutUserOptionItem } from './WiredMenuViewLayoutUserOptionItem';

/** Named region `buttons` of WiredMenuViewLayout - configured through the parent's `buttons` prop. */
export interface WiredMenuViewLayoutButtonsProps {
    itemsButtons?: ReactNode;
    layout?: BoxLayout;
}

export const WiredMenuViewLayoutButtons = ({ itemsButtons, layout }: WiredMenuViewLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            layout={{ position: 'absolute', left: 5, width: 183, top: 5, height: 37, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsButtons ?? (
                <>
                    <WiredMenuViewLayoutFurniOptionItem />
                    <WiredMenuViewLayoutUserOptionItem />
                    <WiredMenuViewLayoutGlobalOptionItem />
                    <WiredMenuViewLayoutContextOptionItem />
                </>
            )}
        </Region>
    );
};
