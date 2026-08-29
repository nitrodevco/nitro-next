import { BoxLayout, Region } from '#base/theme';
import { ClubGiftWidget, ClubGiftWidgetProps } from '#base/views/layouts/catalog/widgets/ClubGiftWidget';

/** Generated from `1639_layout_club_gifts_xml` (layout "ctlg_presents", 360x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface LayoutClubGifts_1639LayoutProps {
    clubGiftWidget?: ClubGiftWidgetProps;
    layout?: BoxLayout;
}

export const LayoutClubGifts_1639Layout = ({ clubGiftWidget, layout }: LayoutClubGifts_1639LayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 460, ...layout }}>
            <Region
                name="ctlg_presents"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
            >
                <ClubGiftWidget
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
                    {...clubGiftWidget}
                />
            </Region>
        </Region>
    );
};
