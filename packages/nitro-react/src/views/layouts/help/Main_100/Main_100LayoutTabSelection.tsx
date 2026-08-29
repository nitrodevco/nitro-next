import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { Main_100LayoutTabButtonTemplateItem } from './Main_100LayoutTabButtonTemplateItem';
import { Main_100LayoutTabButtonTemplateItem2 } from './Main_100LayoutTabButtonTemplateItem2';
import { Main_100LayoutTabButtonTemplateItem3 } from './Main_100LayoutTabButtonTemplateItem3';

/** Named region `tab_selection` of Main_100Layout - configured through the parent's `tabSelection` prop. */
export interface Main_100LayoutTabSelectionProps {
    itemsTabSelection?: ReactNode;
    layout?: BoxLayout;
}

export const Main_100LayoutTabSelection = ({ itemsTabSelection, layout }: Main_100LayoutTabSelectionProps) => {
    return (
        <Region
            name="tab_selection"
            layout={{ position: 'absolute', left: 14, width: 278, top: 58, height: 30, flexDirection: 'row', gap: 7, ...layout }}
        >
            {itemsTabSelection ?? (
                <>
                    <Main_100LayoutTabButtonTemplateItem />
                    <Main_100LayoutTabButtonTemplateItem2 />
                    <Main_100LayoutTabButtonTemplateItem3 />
                </>
            )}
        </Region>
    );
};
