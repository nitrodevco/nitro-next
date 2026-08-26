import { BoxLayout, Region } from '#base/theme';

/** Generated from `1551_layout_club_buy_xml` (layout "ctlg_club_buy", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutClubBuy_1551LayoutProps {
    layout?: BoxLayout;
}

export const LayoutClubBuy_1551Layout = ({ layout }: LayoutClubBuy_1551LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_club_buy"
                params={16}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="clubBuyWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 340, top: 70, height: 390 }}
                />
            </Region>
        </Region>
    );
};
