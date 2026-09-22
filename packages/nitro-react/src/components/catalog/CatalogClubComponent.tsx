import { useCatalogStore } from '#base/context/catalog';
import { useIsWindowVisible } from '#base/context/system';
import { CatalogClubBuyConfirmationView } from '#base/views/catalog/club/CatalogClubBuyConfirmationView';
import { CatalogClubCenterView } from '#base/views/catalog/club/CatalogClubCenterView';
import { CatalogClubExtendConfirmationView } from '#base/views/catalog/club/CatalogClubExtendConfirmationView';
import { CatalogClubGiftConfirmationView } from '#base/views/catalog/club/CatalogClubGiftConfirmationView';
import { CatalogVipBenefitsView } from '#base/views/catalog/club/CatalogVipBenefitsView';

/**
 * The club windows, mounted beside the catalogue inside its store's provider (`CatalogWrapper`):
 * Flash builds them straight on the desktop, not in the catalogue window, so they stay up with the
 * catalogue closed - `ClubBuyConfirmationDialog`, `ClubExtendConfirmationDialog` (the server offers
 * it at any time), `ClubGiftConfirmationDialog`, `VipBenefitsWindow`, and the club centre
 * (`HabboClubCenter`'s `ClubCenterView`, the `club_center` window) whose data is the catalogue
 * store's club slice.
 */
export const CatalogClubComponent = () => {
    const isClubCenterVisible = useIsWindowVisible('club_center');
    const vipBenefitsVisible = useCatalogStore(x => x.vipBenefitsVisible);

    return (
        <>
            {isClubCenterVisible && <CatalogClubCenterView />}
            <CatalogClubBuyConfirmationView />
            <CatalogClubExtendConfirmationView />
            <CatalogClubGiftConfirmationView />
            {vipBenefitsVisible && <CatalogVipBenefitsView />}
        </>
    );
};
