import { BoxLayout, Region } from '#base/theme';

import { LayoutRecyclerPrizes_1543LayoutCtlgDefault3x3, LayoutRecyclerPrizes_1543LayoutCtlgDefault3x3Props } from './LayoutRecyclerPrizes_1543LayoutCtlgDefault3x3';

/** Generated from `1543_layout_recycler_prizes_xml` (layout "ctlg_recycler_prizes", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRecyclerPrizes_1543LayoutProps {
    ctlgDefault3x3?: LayoutRecyclerPrizes_1543LayoutCtlgDefault3x3Props;
    layout?: BoxLayout;
}

export const LayoutRecyclerPrizes_1543Layout = ({ ctlgDefault3x3, layout }: LayoutRecyclerPrizes_1543LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutRecyclerPrizes_1543LayoutCtlgDefault3x3 {...ctlgDefault3x3} />
        </Region>
    );
};
