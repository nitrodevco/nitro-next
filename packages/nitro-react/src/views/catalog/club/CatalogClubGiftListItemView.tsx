/**
 * One gift of the `club_gifts` page - `ClubGiftWidget.createListItem`, drawn from
 * `club_gift_list_item.xml` (320x58, `0xe3e3e3` border): the product container's icon in
 * `image_container` (with the layout's `bundleCounter` caption "0", which no code clears, and the
 * multi counter for a multi offer - `useClubGiftIcon`), the product's name and description, the
 * requirement line, the select button and the VIP icon for a VIP gift.
 *
 * The requirement: a gift that is not selectable yet with days still missing
 * (`daysRequired` minus the past VIP days for a VIP gift, minus the past HC and VIP days for the
 * others) says `catalog.club_gift.<vip|club>_missing[.long]` (`.long` from 31 days, with
 * `days` = the rest of a 31 day month and `months`), a gift that can be taken while gifts are
 * available `catalog.club_gift.selectable`, and nothing otherwise. Select is enabled only for a
 * selectable gift while gifts are available.
 *
 * `mouseOverHandler` measures the icon on hover and hides the preview on leaving, but never calls
 * `showPreview`, so `club_gift_preview` never shows in Flash either.
 */
import { IPurchasableOffer } from '@nitrodevco/nitro-api';
import { IClubGiftData } from '@nitrodevco/nitro-packets';

import { useTranslation } from '#base/context/system';
import { ClubSubscription } from '#base/context/user';
import { Border, Button, Icon, Region, ThemeImage, ThemeText } from '#base/theme';
import { getOfferProduct } from '#base/utils';

import { CatalogProductIconView } from '../CatalogProductIconView';
import { useClubGiftIcon } from './useClubGiftIcon';

/** `ClubGiftWidget.DAYS_IN_MONTH`. */
const DAYS_IN_MONTH = 31;

export interface CatalogClubGiftListItemViewProps {
    offer: IPurchasableOffer;
    gift: IClubGiftData;
    giftsAvailable: number;
    subscription: ClubSubscription;
    onSelect: () => void;
}

export const CatalogClubGiftListItemView = ({ offer, gift, giftsAvailable, subscription, onSelect }: CatalogClubGiftListItemViewProps) => {
    const t = useTranslation();
    const { bundleIcon, product, multiCount } = useClubGiftIcon(offer);
    const productData = getOfferProduct(offer)?.productData;
    const missingDays = gift.isVip
        ? (gift.daysRequired - subscription.pastVipDays)
        : (gift.daysRequired - (subscription.pastClubDays + subscription.pastVipDays));

    let requirement = '';

    if (!gift.isSelectable && (missingDays > 0)) {
        const key = `catalog.club_gift.${gift.isVip ? 'vip' : 'club'}_missing${(missingDays >= DAYS_IN_MONTH) ? '.long' : ''}`;

        requirement = t(key, '', { days: String(missingDays % DAYS_IN_MONTH), months: String(Math.trunc(missingDays / DAYS_IN_MONTH)) });
    } else if (giftsAvailable > 0) {
        requirement = t('catalog.club_gift.selectable');
    }

    return (
        <Border
            variant="0"
            tintColor="#e3e3e3"
            layout={{ width: 320, height: 58, flexShrink: 0 }}
        >
            <ThemeText
                name="gift_name"
                text={productData?.name ?? ''}
                textStyle="u_bold"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 58, top: 8 }}
            />
            <ThemeText
                name="gift_desc"
                text={productData?.description ?? ''}
                textStyle="u_small"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 58, top: 22 }}
            />
            <ThemeText
                name="months_required"
                text={requirement}
                textStyle="u_small"
                clip
                verticalAlign="top"
                layout={{ position: 'absolute', left: 58, width: 236, top: 36, height: 15 }}
            />
            <Button
                variant="3"
                name="select_button"
                disabled={!(gift.isSelectable && (giftsAvailable > 0))}
                onPointerTap={onSelect}
                layout={{ position: 'absolute', left: 167, width: 148, top: 32, height: 22 }}
            >
                {t('catalog.club_gift.select')}
            </Button>
            <Region
                name="image_container"
                layout={{ position: 'absolute', left: 7, width: 52, top: 6, height: 46 }}
            >
                {bundleIcon && (
                    <ThemeImage
                        name="image"
                        src={bundleIcon}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 46 }}
                    />
                )}
                {product && (
                    <Region layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 46 }}>
                        <CatalogProductIconView
                            product={product}
                            width={52}
                            height={46}
                        />
                    </Region>
                )}
                <ThemeText
                    name="bundleCounter"
                    text="0"
                    textStyle="u_regular"
                    textOptions={{ fill: '#cccc66', fontSize: 10 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 18, top: 18 }}
                />
                {(multiCount !== undefined) && (
                    <Border
                        variant="2"
                        name="multiContainer"
                        tintColor="#ff3300"
                        layout={{ position: 'absolute', left: 10, minWidth: 17, top: 2, minHeight: 17 }}
                    >
                        <ThemeText
                            name="multiCounter"
                            text={`x${multiCount}`}
                            textStyle="u_regular"
                            textOptions={{ fill: '#cccc66', fontSize: 11 }}
                            verticalAlign="top"
                            layout={{ marginLeft: 3 }}
                        />
                    </Border>
                )}
            </Region>
            {gift.isVip && (
                <Icon
                    variant="12"
                    name="vip_icon"
                    layout={{ position: 'absolute', left: 5, width: 20, top: 5, height: 20 }}
                />
            )}
        </Border>
    );
};
