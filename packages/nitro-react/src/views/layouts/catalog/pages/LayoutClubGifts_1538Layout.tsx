import { BoxLayout, Region } from '#base/theme';
import { ClubGiftWidget2, ClubGiftWidget2Props } from '#base/views/layouts/catalog/widgets/ClubGiftWidget2';

/** Generated from `1538_layout_club_gifts_xml` (layout "ctlg_presents", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutClubGifts_1538LayoutProps {
    ctlgPresents?: LayoutClubGifts_1538LayoutCtlgPresentsProps;
    layout?: BoxLayout;
}

export const LayoutClubGifts_1538Layout = ({ ctlgPresents, layout }: LayoutClubGifts_1538LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutClubGifts_1538LayoutCtlgPresents {...ctlgPresents} />
        </Region>
    );
};

/** Named region `ctlg_presents` of LayoutClubGifts_1538Layout - configured through the parent's `ctlgPresents` prop. */
export interface LayoutClubGifts_1538LayoutCtlgPresentsProps {
    clubGiftWidget?: ClubGiftWidget2Props;
    layout?: BoxLayout;
}

export const LayoutClubGifts_1538LayoutCtlgPresents = ({ clubGiftWidget, layout }: LayoutClubGifts_1538LayoutCtlgPresentsProps) => {
    return (
        <Region
            name="ctlg_presents"
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 460, ...layout }}
        >
            <ClubGiftWidget2
                layout={{ position: 'absolute', left: 10, width: 340, top: 140, height: 320 }}
                {...clubGiftWidget}
            />
        </Region>
    );
};
