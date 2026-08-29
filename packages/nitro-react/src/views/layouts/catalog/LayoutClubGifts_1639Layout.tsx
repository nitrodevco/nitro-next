import { BoxLayout, Region } from '#base/theme';
import { ClubGiftWidget, ClubGiftWidgetProps } from '#base/views/layouts/catalog/widgets/ClubGiftWidget';

/** Generated from `1639_layout_club_gifts_xml` (layout "ctlg_presents", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutClubGifts_1639LayoutProps {
    ctlgPresents?: LayoutClubGifts_1639LayoutCtlgPresentsProps;
    layout?: BoxLayout;
}

export const LayoutClubGifts_1639Layout = ({ ctlgPresents, layout }: LayoutClubGifts_1639LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <LayoutClubGifts_1639LayoutCtlgPresents {...ctlgPresents} />
        </Region>
    );
};

/** Named region `ctlg_presents` of LayoutClubGifts_1639Layout - configured through the parent's `ctlgPresents` prop. */
export interface LayoutClubGifts_1639LayoutCtlgPresentsProps {
    clubGiftWidget?: ClubGiftWidgetProps;
    layout?: BoxLayout;
}

export const LayoutClubGifts_1639LayoutCtlgPresents = ({ clubGiftWidget, layout }: LayoutClubGifts_1639LayoutCtlgPresentsProps) => {
    return (
        <Region
            name="ctlg_presents"
            params={2064}
            layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0, ...layout }}
        >
            <ClubGiftWidget
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
                {...clubGiftWidget}
            />
        </Region>
    );
};
