/**
 * What `ProductViewCatalogWidget.onPreviewProduct` puts over a product beside its price: the
 * `badgeDisplayWidget` of `HabboCatalogUtils.showExtraOnProduct` / `showAssetImageAsBadgeOnProduct`.
 */
import { FurnitureTypeEnum, IPurchasableOffer } from '@nitrodevco/nitro-api';
import { Template, TemplateBindings, TemplateItem } from '@nitrodevco/nitro-theme';

import { GetChatStyleLibrary } from '#base/chat';
import { ThemeImage } from '#base/theme';
import { EFFECT_CLASSID_NINJA_DISAPPEAR } from '#base/utils';

import { catalogTemplateId } from '../catalogTemplates';

/** `ninjaEffectBundled`: a two-product offer, one of them the ninja disappear effect. */
export const ninjaEffectBundled = (offer: IPurchasableOffer) => ((offer.products.length === 2) && offer.products.some(item => (item.productType === FurnitureTypeEnum.Effect) && (item.classId === EFFECT_CLASSID_NINJA_DISAPPEAR)));

/**
 * `showExtraOnProduct` / `showAssetImageAsBadgeOnProduct`: the `badgeDisplayWidget` (named
 * `HCU_dynamic_badge`) added to the widget, sized to its `asset_image` - an offer's badge on
 * `catalogue_badge_background` (42x42), else its extra chat style's selector preview on
 * `catalogue_chatstyle_background` (60x42), both 6px from the right and 44px from the bottom; else,
 * for an offer bundled with the ninja effect, the widget as `showAssetImageAsBadgeOnProduct` leaves
 * it 44px from the top: the badge and the chat style hidden and `catalogue_effects_ninja` given to
 * the (hidden) `badge_image` widget, so only the layout's `catalogue_badge_background` shows - the
 * behaviour of Sulake's own JavaScript client; the AS3 client's cast of that widget to a static
 * bitmap throws there instead. `hideExtraFromProduct` otherwise.
 */
export const productExtraItem = (templates: Record<string, Template>, offer: IPurchasableOffer, badgeUrl: (code: string) => string): TemplateItem | undefined => {
    let bindings: TemplateBindings;
    let width = 42;
    let top = false;

    if (offer.badgeCode) {
        bindings = {
            asset_image: { asset: 'habbo-window-manager-com-catalogue_badge_background' },
            badge_image: { visible: true, asset: badgeUrl(offer.badgeCode) },
            chat_style: { visible: false },
        };
    } else if (offer.extraChatStyleCode) {
        const preview = GetChatStyleLibrary().getStyle(parseInt(offer.extraChatStyleCode))?.selectorPreviewTexture;

        width = 60;
        bindings = {
            asset_image: { asset: 'habbo-window-manager-com-catalogue_chatstyle_background' },
            badge_image: { visible: false },
            chat_style: {
                visible: true,
                children: preview && (
                    <ThemeImage
                        texture={preview}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 42 }}
                    />
                ),
            },
        };
    } else if (ninjaEffectBundled(offer)) {
        top = true;
        bindings = { badge_image: { visible: false }, chat_style: { visible: false } };
    } else {
        return undefined;
    }

    return {
        key: 'HCU_dynamic_badge',
        from: templates[catalogTemplateId('badgeDisplayWidget')],
        bindings,
        arrange: ({ root }) => {
            const badge = root();
            const widget = badge?.parent;

            if (!badge || !widget) return;

            badge.setRectangle(widget.width - width - 6, top ? 44 : (widget.height - 42 - 44), width, 42);
        },
    };
};
