/**
 * "Buy or publish" - Flash `PhotoPurchaseConfirmationDialog` over
 * `habbo-room-ui-com/photo_purchase_confirmation_xml`, opened by the photo lab's Preview, centred.
 *
 * - The competition, the spending disclaimer and the publish parts leave the list unless
 *   `camera.competition.enabled`, `disclaimer.credit_spending.enabled` and `camera.photo.publishing.enabled`
 *   keep them (`removeListItem`, then `resizeToFitContent`).
 * - The buttons stay off while the server renders the photo; its picture (`CameraStorageUrlMessage`,
 *   `stories.image_url_base` + url) loading turns them on with "Your image is ready!". An empty url is the
 *   24-hour render limit.
 * - Prices from `InitCameraMessage` (`setPrices`): the poster's credits, its duckets when above 0, the
 *   publish duckets. Buy and Publish check the purse first (`checkPurse`), then send
 *   `PurchasePhotoMessageComposer` / `PublishPhotoMessageComposer` with every button off and Cancel reading
 *   Close; `CameraPurchaseOKMessage` and `CameraPublishStatusMessage` answer them.
 * - Cancel and the header's close go back to the viewfinder (`startTakingPhoto("photoPurchaseCancel")`).
 */
import { PublishPhotoComposer, PurchasePhotoComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useState } from 'react';

import { openClientLink, PhotoPurchaseState, returnToViewfinder, setPhotoPurchaseState, showNotEnoughActivityPointsAlert, showNotEnoughCreditsAlert, useCameraStore } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { TemplateBindings, TemplateWindow, useTemplateFrame } from '#base/theme';

import { CAMERA_IMAGE_SIZE } from './cameraEffects';
import { CanvasPicture } from './CanvasPicture';

const TEMPLATE = 'habbo-room-ui-com/photo_purchase_confirmation_xml';

export const PhotoPurchaseConfirmationView = () => {
    const purchase = useCameraStore(x => x.purchase);

    if (!purchase) return null;

    return <PhotoPurchaseConfirmation />;
};

const PhotoPurchaseConfirmation = () => {
    const purchase = useCameraStore(x => x.purchase)!;
    const creditPrice = useCameraStore(x => x.creditPrice);
    const ducketPrice = useCameraStore(x => x.ducketPrice);
    const publishDucketPrice = useCameraStore(x => x.publishDucketPrice);
    const { send } = useWebSocketContext();
    const ownCredits = useUserStore(x => x.credits);
    const ownDuckets = useUserStore(x => x.activityPoints[0] ?? 0);
    const competitionEnabled = useConfigValue<boolean>('camera.competition.enabled') === true;
    const disclaimerEnabled = useConfigValue<boolean>('disclaimer.credit_spending.enabled') === true;
    const publishingEnabled = useConfigValue<boolean>('camera.photo.publishing.enabled') === true;
    const [ disclaimerAccepted, setDisclaimerAccepted ] = useState(!disclaimerEnabled);
    // `disableButtons(true)`: once a purchase or a publish was asked for, Cancel reads Close.
    const [ closeCaption, setCloseCaption ] = useState(false);
    const [ picture, setPicture ] = useState<HTMLCanvasElement | undefined>(undefined);
    const frame = useTemplateFrame({ id: 'photo-purchase-confirmation', centered: true, rememberPosition: false, resizeDirection: 'none', onClose: returnToViewfinder });
    const { state, imageUrl } = purchase;

    // `setImageUrl` -> `onImageLoaded`: the picture drawn to the image's width, then "Your image is ready!".
    useEffect(() => {
        if (!imageUrl) return;

        let live = true;
        const image = new Image();

        image.crossOrigin = 'anonymous';
        image.onload = () => {
            if (!live) return;

            const canvas = document.createElement('canvas');

            canvas.width = CAMERA_IMAGE_SIZE;
            canvas.height = CAMERA_IMAGE_SIZE;

            const scale = CAMERA_IMAGE_SIZE / (image.width || CAMERA_IMAGE_SIZE);

            canvas.getContext('2d')?.drawImage(image, 0, 0, image.width * scale, image.height * scale);
            setPicture(canvas);
            setPhotoPurchaseState('image_loaded', { status: 'camera.confirm_phase.info' });
        };
        image.src = imageUrl;

        return () => {
            live = false;
        };
    }, [ imageUrl ]);

    /** `checkPurse`: duckets are activity point type 0. */
    const checkPurse = (credits: number, duckets: number) => {
        if (ownCredits < credits) {
            showNotEnoughCreditsAlert();

            return false;
        }

        if (ownDuckets < duckets) {
            showNotEnoughActivityPointsAlert(0);

            return false;
        }

        return true;
    };

    const wait = (next: PhotoPurchaseState, update: Parameters<typeof setPhotoPurchaseState>[1] = {}) => {
        setCloseCaption(true);
        setPhotoPurchaseState(next, { status: 'camera.purchase.pleasewait', ...update });
    };

    const onBuy = () => {
        if ((state !== 'image_loaded') || !disclaimerAccepted || !checkPurse(creditPrice, ducketPrice)) return;

        wait('waiting_purchase_to_complete');

        if (disclaimerEnabled) setDisclaimerAccepted(false);

        send(new PurchasePhotoComposer({}));
    };

    const onPublish = () => {
        if ((state !== 'image_loaded') || !checkPurse(0, publishDucketPrice)) return;

        wait('waiting_publish_to_complete', { publishLocked: true });
        send(new PublishPhotoComposer({}));
    };

    const loaded = state === 'image_loaded';
    const bindings: TemplateBindings = {
        competition_wrapper: { visible: competitionEnabled },
        disclaimer: { visible: disclaimerEnabled },
        publish_wrapper: { visible: publishingEnabled },
        product_image: { children: picture
            ? (
                    <CanvasPicture
                        canvas={picture}
                        size={CAMERA_IMAGE_SIZE}
                    />
                )
            : undefined },
        status_info: { caption: purchase.status ? `\${${purchase.status}}` : '' },
        purchase_credit_cost_text: { caption: String(creditPrice) },
        purchase_ducket_cost_text: { visible: ducketPrice > 0, caption: String(ducketPrice) },
        ducket_icon: { visible: ducketPrice > 0 },
        publish_ducket_cost_text: { caption: String(publishDucketPrice) },
        buy_button: {
            disabled: !(loaded && disclaimerAccepted),
            caption: purchase.purchaseCount ? '${camera.buy.another.button.text}' : undefined,
            onPointerTap: onBuy,
        },
        inventory_link_area: { visible: purchase.purchaseCount > 0 },
        purchase_count: { caption: String(purchase.purchaseCount) },
        inventory_link: { onPointerTap: () => openClientLink(send, 'inventory/open/furni') },
        publish_button: { visible: !purchase.published, disabled: !loaded || purchase.publishLocked, onPointerTap: onPublish },
        publish_price_area: { visible: !purchase.published },
        publish_link_area: { visible: purchase.published },
        publish_explanation: { caption: purchase.published ? '${camera.publish.successful}' : undefined },
        publish_detailed_explanation: { caption: purchase.published ? '${camera.publish.success.short.info}' : undefined },
        spending_disclaimer: { selected: disclaimerAccepted, onPointerTap: () => setDisclaimerAccepted(value => !value) },
        cancel_button: { caption: closeCaption ? '${generic.close}' : undefined, onPointerTap: returnToViewfinder },
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={bindings}
        />
    );
};
