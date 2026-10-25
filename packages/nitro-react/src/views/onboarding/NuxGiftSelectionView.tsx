/**
 * `nux/NuxGiftSelectionView`: "Choose gift option", the `habbo-toolbar-com/nux_gift_selection_xml`
 * frame, centred, put up by `NewUserExperienceGiftOffer`. Its close is hidden: the window goes only
 * once every step has a pick.
 *
 * - `populateStep`: the step's gifts replace the list's items, each a clone of its first
 *   (`nux_gift_option`): `option_heading` names the gift by its products - a product's text key when
 *   it has one, else its product data's name, else `product_<code>_name` - joined by
 *   `nux.gift.selection.separator` (`decodeURI`'d, ", " by default); `option_bitmap` shows the
 *   thumbnail under `image.library.url`. With more than one step the caption counts them
 *   ("Choose gift option 1/2").
 * - `show`: each step builds the window again from its layout, so a step lays out its own gifts.
 * - `onSelectOption`: **Get this** keeps the gift's place in the list for the step and moves to the
 *   next one; after the last, `HabboNuxDialogs.onSendGetGifts` takes the window down and sends every
 *   pick (`NewUserExperienceGetGifts`).
 */
import { INewUserExperienceGiftOfferGiftOption, INewUserExperienceGiftSelection } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { sendNuxGifts } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useOnboardingStore } from '#base/context/onboarding';
import { useConfigValue, useSystemStore, useTranslation } from '#base/context/system';
import { TemplateWindow, useTemplateFrame } from '#base/theme';

const TEMPLATE = 'habbo-toolbar-com/nux_gift_selection_xml';

/** `getLocalization("nux.gift.selection.separator", ", ")`, as `decodeURI` leaves it. */
const DEFAULT_SEPARATOR = ', ';

const decodeSeparator = (value: string) => {
    try {
        return decodeURI(value);
    } catch {
        return value;
    }
};

export const NuxGiftSelectionView = () => {
    const giftOffer = useOnboardingStore(x => x.giftOffer);

    if (!giftOffer?.length) return null;

    // A new offer builds the window again from its first step, as `createGiftSelectionView` does.
    return (
        <NuxGiftSelectionWindow
            key={offerKey(giftOffer)}
            steps={giftOffer}
        />
    );
};

let offerCount = 0;
const offerKeys = new WeakMap<object, string>();

const offerKey = (offer: object) => {
    let key = offerKeys.get(offer);

    if (!key) offerKeys.set(offer, (key = String(++offerCount)));

    return key;
};

const NuxGiftSelectionWindow = ({ steps }: { steps: INewUserExperienceGiftOfferGiftOption[] }) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const productData = useSystemStore(x => x.productData);
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const frame = useTemplateFrame({ id: 'nux-gift-selection', centered: true, rememberPosition: false, resizeDirection: 'none', closeButtonVisible: false });
    const [ currentStep, setCurrentStep ] = useState(0);
    const [ selections, setSelections ] = useState<INewUserExperienceGiftSelection[]>([]);

    const step = steps[currentStep];

    if (!step) return null;

    const separator = decodeSeparator(t('nux.gift.selection.separator', DEFAULT_SEPARATOR));

    const productName = (productCode: string, localizationKey: string | undefined) => {
        if (localizationKey) return t(localizationKey, localizationKey);

        const name = productData[productCode]?.name;

        if (name) return name;

        const key = `product_${productCode}_name`;

        return t(key, key);
    };

    const select = (giftIndex: number) => {
        const picked = [ ...selections, { dayIndex: step.dayIndex, stepIndex: step.stepIndex, giftIndex } ];

        if (currentStep + 1 < steps.length) {
            setSelections(picked);
            setCurrentStep(currentStep + 1);

            return;
        }

        sendNuxGifts(send, picked);
    };

    return (
        <TemplateWindow
            key={currentStep}
            id={TEMPLATE}
            frame={frame}
            // `populateStep` ends with `arrangeListItems`: the gifts side by side, however many.
            arrange={({ find }) => find('nux_gift_selection_list')?.arrangeListItems()}
            bindings={{
                '': steps.length > 1 ? { caption: `${t('nux.gift.selection.title')} ${currentStep + 1}/${steps.length}` } : {},
                nux_gift_selection_list: {
                    items: step.options.map((gift, index) => ({
                        key: `${currentStep}-${index}`,
                        from: 'nux_gift_option',
                        bindings: {
                            option_heading: { caption: gift.productOfferList.map(product => productName(product.productCode, product.localizationKey)).join(separator) },
                            ...(gift.thumbnailUrl ? { option_bitmap: { asset: imageLibraryUrl + gift.thumbnailUrl } } : {}),
                            option_button: { onPointerTap: () => select(index) },
                        },
                    })),
                },
            }}
        />
    );
};
