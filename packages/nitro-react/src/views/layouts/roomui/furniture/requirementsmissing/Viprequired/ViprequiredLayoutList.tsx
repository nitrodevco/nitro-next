import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ViprequiredLayoutListBottomItem } from './ViprequiredLayoutListBottomItem';
import { ViprequiredLayoutListTopItem } from './ViprequiredLayoutListTopItem';

/** Named region `list` of ViprequiredLayout - configured through the parent's `list` prop. */
export interface ViprequiredLayoutListProps {
    itemsList?: ReactNode;
    layout?: BoxLayout;
}

export const ViprequiredLayoutList = ({ itemsList, layout }: ViprequiredLayoutListProps) => {
    return (
        <Region
            name="list"
            layout={{ position: 'absolute', left: 10, top: 0, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsList ?? (
                <>
                    <ViprequiredLayoutListTopItem />
                    <ViprequiredLayoutListBottomItem />
                </>
            )}
        </Region>
    );
};
