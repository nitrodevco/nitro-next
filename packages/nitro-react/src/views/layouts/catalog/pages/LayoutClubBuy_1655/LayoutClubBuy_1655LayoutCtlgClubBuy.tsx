import { BoxLayout, Region } from '#base/theme';
import { ClubBuyWidget2, ClubBuyWidget2Props } from '#base/views/layouts/catalog/widgets/ClubBuyWidget2';

/** Named region `ctlg_club_buy` of LayoutClubBuy_1655Layout - configured through the parent's `ctlgClubBuy` prop. */
export interface LayoutClubBuy_1655LayoutCtlgClubBuyProps {
    clubBuyWidget?: ClubBuyWidget2Props;
    layout?: BoxLayout;
}

export const LayoutClubBuy_1655LayoutCtlgClubBuy = ({ clubBuyWidget, layout }: LayoutClubBuy_1655LayoutCtlgClubBuyProps) => {
    return (
        <Region
            name="ctlg_club_buy"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <ClubBuyWidget2
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                {...clubBuyWidget}
            />
        </Region>
    );
};
