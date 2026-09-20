import { IPurchasableOffer, RoomGeometryScaleType } from '@nitrodevco/nitro-api';

import { useCatalogOfferProduct } from '#base/hooks';

import { useFurnitureImageTexture } from './useFurnitureImageTexture';

/**
 * Flash `catalog/viewer/§_-L1t§.PRODUCT_IMAGES`: offers (by localization id) whose preview is a
 * fixed catalogue picture instead of their product. Checked against Flash by
 * `scripts/drift/constants.py`.
 */
const PRODUCT_IMAGES: Record<string, string> = {
    deal01: 'ctlg_pic_deal01',
    deal02: 'ctlg_pic_deal02',
    deal03: 'ctlg_pic_deal03',
    deal04: 'ctlg_pic_deal04',
    deal05: 'ctlg_pic_deal05',
    deal06: 'ctlg_pic_deal06',
    deal07: 'ctlg_pic_deal07',
    deal08: 'ctlg_pic_deal08',
    deal09: 'ctlg_pic_deal09',
    deal10: 'ctlg_pic_deal10',
    deal97: 'ctlg_pic_deal97',
    deal98: 'ctlg_pic_deal98',
    deal99: 'ctlg_pic_deal99',
    noob_set_1: 'ctlg_pic_noob_set_1',
    noob_set_2: 'ctlg_pic_noob_set_2',
    noob_set_3: 'ctlg_pic_noob_set_3',
    noob_set_4: 'ctlg_pic_noob_set_4',
    noob_set_5: 'ctlg_pic_noob_set_5',
    noob_set_6: 'ctlg_pic_noob_set_6',
    'a0 deal100': 'ctlg_pic_a0_deal100',
    'a0 raredaffodilrug': 'ctlg_pic_a0_raredaffodilrug',
    'a2 slp': 'ctlg_pic_a2_slp',
    'A2 tlp 20': 'ctlg_pic_A2_tlp_20',
    DEAL_HC_1: 'ctlg_pic_hc_deal01',
    DEAL_HC_2: 'ctlg_pic_hc_deal02',
    DEAL_HC_3: 'ctlg_pic_hc_deal03',
    hween09_ghost: 'ctlg_pic_hween09_ghost',
    ads_twi_mist: 'ctlg_pic_ads_twi_mist',
    party_lights: 'ctlg_pic_party_lights',
    xmas_snow: 'ctlg_pic_xmas_snow',
    wf_deal1: 'ctlg_pic_deal_wired_pswdoor',
    wf_deal2: 'ctlg_pic_deal_wired_swtchdoor',
    wf_deal3: 'ctlg_pic_deal_wired_coopdoor',
    wf_deal4: 'ctlg_pic_deal_wired_rmtdoor',
    wf_deal5: 'ctlg_pic_deal_wired_wlcmmsg',
    wf_deal6: 'ctlg_pic_deal_wired_pswtele',
    wf_deal7: 'ctlg_pic_deal_wired_dircntrl',
    wf_deal8: 'ctlg_pic_deal_wired_mvngfurni',
    wf_deal9: 'ctlg_pic_deal_wired_flshfires',
    qt_val11_heartlights: 'ctlg_pic_qt_val11_heartlights',
    GET_SNOWWAR_TOKENS: 'snowwar_tokens_10',
    GET_SNOWWAR_TOKENS2: 'snowwar_tokens_10',
    GET_SNOWWAR_TOKENS3: 'snowwar_tokens_10',
    room_ad_plus_badge: 'events_confirm_purchase',
};

export interface CatalogOfferImageViewProps {
    offer: IPurchasableOffer;
}

/**
 * The product preview of the purchase confirmation (`PurchaseConfirmationDialog`): the offer's
 * furniture image. Flash shows the `PRODUCT_IMAGES` picture instead for the offers listed there;
 * most of those pictures (`ctlg_pic_*`) come with the catalogue's own asset library, which the
 * port does not load, so for those offers this renders nothing rather than the wrong product.
 */
export const CatalogOfferImageView = ({ offer }: CatalogOfferImageViewProps) => {
    const product = useCatalogOfferProduct(offer);
    const hardCodedImage = PRODUCT_IMAGES[offer.localizationId];
    const skip = !product || (hardCodedImage && hardCodedImage.length > 0);

    const { texture, width, height } = useFurnitureImageTexture(
        skip ? undefined : product.furnitureData.className,
        skip ? undefined : product.furnitureData.colorIndex,
        2,
        RoomGeometryScaleType.ZoomedIn,
        skip ? undefined : parseInt(product.extraParam),
    );

    if (skip || !texture) return null;

    return (
        <pixiSprite
            texture={texture}
            width={width}
            height={height}
            layout={{}}
        />
    );
};
