import { BoxLayout, Region } from '#base/theme';

import { LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3, LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3Props } from './LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3';

/** Generated from `1537_layout_recycler_prizes_xml` (layout "ctlg_recycler_prizes", 360x659) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutRecyclerPrizes_1537LayoutProps {
    ctlgDefault3x3?: LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3Props;
    layout?: BoxLayout;
}

export const LayoutRecyclerPrizes_1537Layout = ({ ctlgDefault3x3, layout }: LayoutRecyclerPrizes_1537LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 659, ...layout }}>
            <LayoutRecyclerPrizes_1537LayoutCtlgDefault3x3 {...ctlgDefault3x3} />
        </Region>
    );
};
