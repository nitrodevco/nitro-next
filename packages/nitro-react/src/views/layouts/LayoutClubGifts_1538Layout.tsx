import { BoxLayout, Region } from '#base/theme';

/** Generated from `1538_layout_club_gifts_xml` (layout "ctlg_presents", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutClubGifts_1538LayoutProps {
    layout?: BoxLayout;
}

export const LayoutClubGifts_1538Layout = ({ layout }: LayoutClubGifts_1538LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_presents"
                params={16}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460 }}
            >
                <Region
                    name="clubGiftWidget"
                    params={16}
                    layout={{ position: 'absolute', left: 10, width: 340, top: 140, height: 320 }}
                />
            </Region>
        </Region>
    );
};
