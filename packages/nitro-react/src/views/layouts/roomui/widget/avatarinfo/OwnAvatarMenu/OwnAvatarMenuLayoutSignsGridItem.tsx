import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { OwnAvatarMenuLayoutSign0Item } from './OwnAvatarMenuLayoutSign0Item';
import { OwnAvatarMenuLayoutSign1Item } from './OwnAvatarMenuLayoutSign1Item';
import { OwnAvatarMenuLayoutSign2Item } from './OwnAvatarMenuLayoutSign2Item';
import { OwnAvatarMenuLayoutSign3Item } from './OwnAvatarMenuLayoutSign3Item';
import { OwnAvatarMenuLayoutSign4Item } from './OwnAvatarMenuLayoutSign4Item';
import { OwnAvatarMenuLayoutSign5Item } from './OwnAvatarMenuLayoutSign5Item';
import { OwnAvatarMenuLayoutSign6Item } from './OwnAvatarMenuLayoutSign6Item';
import { OwnAvatarMenuLayoutSign7Item } from './OwnAvatarMenuLayoutSign7Item';
import { OwnAvatarMenuLayoutSign8Item } from './OwnAvatarMenuLayoutSign8Item';
import { OwnAvatarMenuLayoutSign9Item } from './OwnAvatarMenuLayoutSign9Item';
import { OwnAvatarMenuLayoutSign10Item } from './OwnAvatarMenuLayoutSign10Item';
import { OwnAvatarMenuLayoutSign11Item } from './OwnAvatarMenuLayoutSign11Item';
import { OwnAvatarMenuLayoutSign12Item } from './OwnAvatarMenuLayoutSign12Item';
import { OwnAvatarMenuLayoutSign13Item } from './OwnAvatarMenuLayoutSign13Item';
import { OwnAvatarMenuLayoutSign14Item } from './OwnAvatarMenuLayoutSign14Item';
import { OwnAvatarMenuLayoutSign15Item } from './OwnAvatarMenuLayoutSign15Item';
import { OwnAvatarMenuLayoutSign16Item } from './OwnAvatarMenuLayoutSign16Item';
import { OwnAvatarMenuLayoutSign17Item } from './OwnAvatarMenuLayoutSign17Item';

/** Row template `signs_grid` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutSignsGridItemProps {
    itemsSignsGrid?: ReactNode;
    layout?: BoxLayout;
}

export const OwnAvatarMenuLayoutSignsGridItem = ({ itemsSignsGrid, layout }: OwnAvatarMenuLayoutSignsGridItemProps) => {
    return (
        <Region
            name="signs_grid"
            layout={{ width: 103, height: 152, flexShrink: 0, flexDirection: 'row', flexWrap: 'wrap', gap: 1, ...layout }}
        >
            {itemsSignsGrid ?? (
                <>
                    <OwnAvatarMenuLayoutSign1Item />
                    <OwnAvatarMenuLayoutSign2Item />
                    <OwnAvatarMenuLayoutSign3Item />
                    <OwnAvatarMenuLayoutSign4Item />
                    <OwnAvatarMenuLayoutSign5Item />
                    <OwnAvatarMenuLayoutSign6Item />
                    <OwnAvatarMenuLayoutSign7Item />
                    <OwnAvatarMenuLayoutSign8Item />
                    <OwnAvatarMenuLayoutSign9Item />
                    <OwnAvatarMenuLayoutSign10Item />
                    <OwnAvatarMenuLayoutSign11Item />
                    <OwnAvatarMenuLayoutSign12Item />
                    <OwnAvatarMenuLayoutSign0Item />
                    <OwnAvatarMenuLayoutSign13Item />
                    <OwnAvatarMenuLayoutSign15Item />
                    <OwnAvatarMenuLayoutSign14Item />
                    <OwnAvatarMenuLayoutSign17Item />
                    <OwnAvatarMenuLayoutSign16Item />
                </>
            )}
        </Region>
    );
};
