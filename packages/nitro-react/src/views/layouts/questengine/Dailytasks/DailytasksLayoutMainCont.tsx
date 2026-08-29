import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { DailytasksLayoutExtraContItem } from './DailytasksLayoutExtraContItem';
import { DailytasksLayoutHcInfoContItem } from './DailytasksLayoutHcInfoContItem';
import { DailytasksLayoutSpacerItem } from './DailytasksLayoutSpacerItem';
import { DailytasksLayoutTasksListItem } from './DailytasksLayoutTasksListItem';

/** Named region `main_cont` of DailytasksLayout - configured through the parent's `mainCont` prop. */
export interface DailytasksLayoutMainContProps {
    itemsMainCont?: ReactNode;
    layout?: BoxLayout;
}

export const DailytasksLayoutMainCont = ({ itemsMainCont, layout }: DailytasksLayoutMainContProps) => {
    return (
        <Region
            name="main_cont"
            layout={{ position: 'absolute', left: 0, top: 0, minWidth: 452, maxWidth: 452, flexDirection: 'column', gap: 5, ...layout }}
        >
            {itemsMainCont ?? (
                <>
                    <DailytasksLayoutSpacerItem />
                    <DailytasksLayoutExtraContItem />
                    <DailytasksLayoutTasksListItem />
                    <DailytasksLayoutHcInfoContItem />
                </>
            )}
        </Region>
    );
};
