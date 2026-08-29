import { BoxLayout, Region } from '#base/theme';
import { ClubBuyWidget, ClubBuyWidgetProps } from '#base/views/layouts/catalog/widgets/ClubBuyWidget';

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
