import { BoxLayout, Region } from '#base/theme';
import { ClubBuyWidget, ClubBuyWidgetProps } from '#base/views/layouts/catalog/widgets/ClubBuyWidget';

/** Generated from `1655_layout_club_buy_xml` (layout "ctlg_club_buy", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutClubBuy_1655LayoutProps {
    ctlgClubBuy?: LayoutClubBuy_1655LayoutCtlgClubBuyProps;
    layout?: BoxLayout;
}

export const LayoutClubBuy_1655Layout = ({ ctlgClubBuy, layout }: LayoutClubBuy_1655LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutClubBuy_1655LayoutCtlgClubBuy {...ctlgClubBuy} />
        </Region>
    );
};

/** Named region `ctlg_club_buy` of LayoutClubBuy_1655Layout - configured through the parent's `ctlgClubBuy` prop. */
export interface LayoutClubBuy_1655LayoutCtlgClubBuyProps {
    clubBuyWidget?: ClubBuyWidgetProps;
    layout?: BoxLayout;
}

export const LayoutClubBuy_1655LayoutCtlgClubBuy = ({ clubBuyWidget, layout }: LayoutClubBuy_1655LayoutCtlgClubBuyProps) => {
    return (
        <Region
            name="ctlg_club_buy"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <ClubBuyWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
                {...clubBuyWidget}
            />
        </Region>
    );
};
