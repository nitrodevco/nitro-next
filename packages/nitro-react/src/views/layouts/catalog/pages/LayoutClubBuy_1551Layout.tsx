import { BoxLayout, Region } from '#base/theme';
import { ClubBuyWidget, ClubBuyWidgetProps } from '#base/views/layouts/catalog/widgets/ClubBuyWidget';

/** Generated from `1551_layout_club_buy_xml` (layout "ctlg_club_buy", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutClubBuy_1551LayoutProps {
    ctlgClubBuy?: LayoutClubBuy_1551LayoutCtlgClubBuyProps;
    layout?: BoxLayout;
}

export const LayoutClubBuy_1551Layout = ({ ctlgClubBuy, layout }: LayoutClubBuy_1551LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutClubBuy_1551LayoutCtlgClubBuy {...ctlgClubBuy} />
        </Region>
    );
};

/** Named region `ctlg_club_buy` of LayoutClubBuy_1551Layout - configured through the parent's `ctlgClubBuy` prop. */
export interface LayoutClubBuy_1551LayoutCtlgClubBuyProps {
    clubBuyWidget?: ClubBuyWidgetProps;
    layout?: BoxLayout;
    tags?: string[];
}

export const LayoutClubBuy_1551LayoutCtlgClubBuy = ({ clubBuyWidget, layout, tags }: LayoutClubBuy_1551LayoutCtlgClubBuyProps) => {
    return (
        <Region
            name="ctlg_club_buy"
            tags={tags}
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <ClubBuyWidget
                layout={{ position: 'absolute', left: 10, width: 340, top: 70, height: 390 }}
                {...clubBuyWidget}
            />
        </Region>
    );
};
