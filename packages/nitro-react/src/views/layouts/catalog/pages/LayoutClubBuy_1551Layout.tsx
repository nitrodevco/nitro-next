import { BoxLayout, Region } from '#base/theme';
import { ClubBuyWidget2, ClubBuyWidget2Props } from '#base/views/layouts/catalog/widgets/ClubBuyWidget2';

/** Generated from `1551_layout_club_buy_xml` (layout "ctlg_club_buy", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutClubBuy_1551LayoutProps {
    clubBuyWidget?: ClubBuyWidget2Props;
    layout?: BoxLayout;
}

export const LayoutClubBuy_1551Layout = ({ clubBuyWidget, layout }: LayoutClubBuy_1551LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_club_buy"
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ClubBuyWidget2
                    layout={{ position: 'absolute', left: 10, right: 10, bottom: 0, height: 390 }}
                    {...clubBuyWidget}
                />
            </Region>
        </Region>
    );
};
