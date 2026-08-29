import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { ToolbarViewLayoutACHIEVEMENTSItem } from './ToolbarViewLayoutACHIEVEMENTSItem';
import { ToolbarViewLayoutBottomPaddingItem } from './ToolbarViewLayoutBottomPaddingItem';
import { ToolbarViewLayoutBUILDERItem } from './ToolbarViewLayoutBUILDERItem';
import { ToolbarViewLayoutCATALOGUEItem } from './ToolbarViewLayoutCATALOGUEItem';
import { ToolbarViewLayoutGAMESItem } from './ToolbarViewLayoutGAMESItem';
import { ToolbarViewLayoutHOMEItem } from './ToolbarViewLayoutHOMEItem';
import { ToolbarViewLayoutINVENTORYItem } from './ToolbarViewLayoutINVENTORYItem';
import { ToolbarViewLayoutMEMENUItem } from './ToolbarViewLayoutMEMENUItem';
import { ToolbarViewLayoutNAVIGATORItem } from './ToolbarViewLayoutNAVIGATORItem';
import { ToolbarViewLayoutQUESTSItem } from './ToolbarViewLayoutQUESTSItem';
import { ToolbarViewLayoutRECEPTIONItem } from './ToolbarViewLayoutRECEPTIONItem';
import { ToolbarViewLayoutSTORIESItem } from './ToolbarViewLayoutSTORIESItem';

/** Named region `toolbar_items` of ToolbarViewLayout - configured through the parent's `toolbarItems` prop. */
export interface ToolbarViewLayoutToolbarItemsProps {
    itemsToolbarItems?: ReactNode;
    layout?: BoxLayout;
}

export const ToolbarViewLayoutToolbarItems = ({ itemsToolbarItems, layout }: ToolbarViewLayoutToolbarItemsProps) => {
    return (
        <Region
            name="toolbar_items"
            layout={{ position: 'absolute', left: 0, top: 5, flexDirection: 'column', ...layout }}
        >
            {itemsToolbarItems ?? (
                <>
                    <ToolbarViewLayoutRECEPTIONItem />
                    <ToolbarViewLayoutHOMEItem />
                    <ToolbarViewLayoutNAVIGATORItem />
                    <ToolbarViewLayoutQUESTSItem />
                    <ToolbarViewLayoutGAMESItem />
                    <ToolbarViewLayoutSTORIESItem />
                    <ToolbarViewLayoutACHIEVEMENTSItem />
                    <ToolbarViewLayoutCATALOGUEItem />
                    <ToolbarViewLayoutBUILDERItem />
                    <ToolbarViewLayoutINVENTORYItem />
                    <ToolbarViewLayoutMEMENUItem />
                    <ToolbarViewLayoutBottomPaddingItem />
                </>
            )}
        </Region>
    );
};
