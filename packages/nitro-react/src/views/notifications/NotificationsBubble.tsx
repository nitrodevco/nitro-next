import { AvatarGenderType, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useMemo, useState } from 'react';

import { getCollectiblePreviewIcon } from '#base/commands';
import { AvatarFaceImage } from '#base/components';
import { NOTIFICATION_ASSETS, NotificationAssetName, NotificationItem, NotificationLayoutName, NotificationOptions } from '#base/context/notifications';
import { useInterpolate, useTranslation } from '#base/context/system';
import { usePetImageTexture } from '#base/hooks';
import { Box, LayoutImage, measureTemplateText, TemplateBindings, TemplateWindow, TemplateWindows, ThemeImage, useLayoutEvent } from '#base/theme';
import { CollectiblesPreviewSlots, CollectiblesProductPreview } from '#base/views/shared/CollectiblesProductPreview';

import { NOTIFICATION_SIDE_MARGIN } from './notificationStack';

/** Where the stack has a bubble this frame: `_window.y`, the swipe added to `_window.x`, `_window.blend`. */
export interface NotificationFrame {
    margin: number;
    swipe: number;
    blend: number;
}

export interface NotificationsBubbleProps {
    item: NotificationItem;
    /** Undefined for the frame between the store showing the item and the stack placing it. */
    frame: NotificationFrame | undefined;
    zIndex: number;
    onHover: (hovering: boolean) => void;
    /** A click anywhere on the bubble: follows the link, dismisses unless the bubble stays. */
    onClick: () => void;
    /** The `slide_notification_away` region of the friend-online bubble. */
    onSwipe: () => void;
    /** `onToggleButtonClicked` only listens while the bubble is fully up. */
    isDisplayed: () => boolean;
    onMeasure: (height: number) => void;
}

/** Each style's layout (`customlayout`, else the notifications library's `layout_notification_xml`). */
const TEMPLATES: Record<NotificationLayoutName, string> = {
    default: 'habbo-notifications-com/layout_notification_xml',
    wired: 'habbo-notifications-com/layout_notification_wired_xml',
    treasure_hunt: 'habbo-notifications-com/layout_notification_treasurehunt_xml',
    nft_opening: 'habbo-notifications-com/layout_notification_nft_opening_xml',
    friendonline: 'habbo-notifications-com/layout_notification_friendonline_xml',
};

/**
 * The styles whose view config has a `height`, so `setNotificationText` grows the bubble to its
 * text. The friend-online bubble's text sits deep in its pill, which keeps the layout's 58.
 */
const GROWS_WITH_TEXT: ReadonlySet<NotificationLayoutName> = new Set([ 'default', 'treasure_hunt', 'nft_opening' ]);

/** The `product_icon` widget of the `nft_opening` bubble - `product_icon.xml` in its 40 x 40 box. */
const NFT_OPENING_ICON_SLOTS: CollectiblesPreviewSlots = {
    productPreview: { left: -3, top: 0, width: 46, height: 40 },
    badge: { left: 0, top: 0, width: 40, height: 40, zoom: 1 },
    unknown: { left: 11, top: 11, width: 18, height: 18, src: LayoutImage('habbo-window-manager-com/collectables_icon_curator_stamp_small.png'), stretched: true },
    // `pet_image:direction` south: 3, so 135 degrees; the widget's minimum height makes it 48 high.
    pet: { left: -4, top: -2, width: 48, height: 48, zoom: 1, shrinkOnOverflow: true, direction: 135 },
};

/** `notification_icon`'s box in `layout_notification_xml`. */
const ICON_SIZE = 50;

/**
 * `PetImageUtility.getPetImage(type, palette, color)` with its defaults - facing direction 3, the whole
 * pet, at the 32 scale - centred in the icon, as Flash centres the bitmap it is handed.
 */
const NotificationPetImage = ({ pet }: { pet: NonNullable<NotificationOptions['pet']> }) => {
    const texture = usePetImageTexture({ ...pet, direction: 135, scale: RoomGeometryScaleType.ZoomedOut });

    if (!texture) return null;

    return (
        <ThemeImage
            texture={texture}
            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
            eventMode="none"
            layout={{ position: 'absolute', left: 0, top: 0, width: ICON_SIZE, height: ICON_SIZE }}
        />
    );
};

/** A library bitmap by its Flash name, or the URL the caller passed. */
const imageSource = (image: string | undefined) => {
    if (!image) return '';

    const file = NOTIFICATION_ASSETS[image as NotificationAssetName];

    return file ? LayoutImage(`habbo-notifications-com/${file}`) : image;
};

/**
 * `setNotificationText` with a view `height`: the text made `textHeight` plus what was under it in
 * the layout (`_resizeMargin`), and the bubble grown to hold it, never under its own height.
 */
const growWithText = (text: string) => ({ find, root }: TemplateWindows) => {
    const field = find('#notification_text');
    const bubble = root();

    if (!field?.element || !bubble) return;

    const resizeMargin = bubble.height - (field.y + field.height);
    const wrap = field.element.vars.word_wrap ? field.width : undefined;
    const textHeight = Math.ceil(measureTemplateText(field.element, text, wrap)?.textHeight ?? 0);

    field.setHeight(textHeight + resizeMargin);
    bubble.setHeight(Math.max(bubble.height, field.y + field.height));
};

/**
 * The friend-online pill: its name is an auto-sized text in the pill's item list, which the pill
 * and the bubble grow to hold. The head's circle, the bubble's other windows, stays right of the
 * pill: it moves on by as much as the pill grew.
 */
const arrangeFriendOnline = ({ find, root }: TemplateWindows) => {
    const content = find('content');
    const bubble = root();

    if (!content?.element || !bubble) return;

    const grow = content.width - content.element.width;

    if (grow <= 0) return;

    for (const child of bubble.children) {
        if (child !== content) child.setX(child.x + grow);
    }
};

/**
 * One notification bubble - `HabboNotificationItemView`'s window, built from the layout its style
 * names. Where it is and how faded comes from `NotificationsView`, which runs the stack; this draws
 * and forwards the pointer.
 *
 * `setNotificationText` puts the text in the `notification_text`-tagged window, and
 * `setNotificationIcon` the icon in the `notification_icon` one - centred in its 50x50, which
 * `setNotificationIcon` gets by padding the bitmap to a square. The rest is each style's own:
 *
 * - `showWiredNotification`: with a `toggleCallback`, the layout's hidden `button` shows, reading
 *   `${notification.stop}` until it is pressed and `${notification.resume}` after - only while the
 *   bubble is fully up.
 * - `showTreasureHuntNotification`: the key picture (`treasure_hunt_image`) stands in for a missing
 *   icon.
 * - `showNftOpeningNotification`: the collectible in `icon_widget` (`ProductIconWidget.productInfo`)
 *   and `rarity_text` reading `collectibles.item.rarity` and the rarity, tinted the rarity's colour.
 * - The friend-online bubble shows the friend's head in its circle, and its
 *   `slide_notification_away` arrow swipes it away instead of clicking it.
 *
 * Every bubble is a direct child of the client's window layer, so that `zIndex` stacks it against
 * the frames the way Flash's single window layer did.
 */
export const NotificationsBubble = ({ item, frame, zIndex, onHover, onClick, onSwipe, isDisplayed, onMeasure }: NotificationsBubbleProps) => {
    const t = useTranslation();
    const interpolate = useInterpolate();
    const [ node, setNode ] = useState<PixiContainer | null>(null);
    const [ stopped, setStopped ] = useState(false);
    const text = interpolate(item.text);
    const { toggleCallback, product, rarity, rarityColor, figure, gender, pet } = item.options;
    // Kept while the text is: the bubble redraws every frame it fades or moves.
    const arrange = useMemo(() => {
        if (item.layout === 'friendonline') return arrangeFriendOnline;

        return GROWS_WITH_TEXT.has(item.layout) ? growWithText(text) : undefined;
    }, [ item.layout, text ]);

    // A DOM-mode node is an element: see `useLayoutEvent`.
    useLayoutEvent(node, () => onMeasure(node?.layout?.computedLayout.height ?? 0));

    const bindings: TemplateBindings = {
        '#notification_text': { caption: text },
        '#notification_icon': pet
            ? { asset: '', children: <NotificationPetImage pet={pet} /> }
            : { asset: imageSource(item.image), pivot: 'center' },
    };

    switch (item.layout) {
        case 'wired':
            if (toggleCallback) bindings['#button'] = {
                visible: true,
                caption: stopped ? '${notification.resume}' : '${notification.stop}',
                onPointerTap: () => {
                    if (!isDisplayed()) return;

                    setStopped(!stopped);
                    toggleCallback(!stopped);
                },
            };
            break;
        case 'treasure_hunt':
            bindings.treasure_hunt_image = { visible: !item.image };
            break;
        case 'nft_opening':
            bindings.icon_widget = {
                children: (
                    <CollectiblesProductPreview
                        preview={getCollectiblePreviewIcon(product ?? null)}
                        slots={NFT_OPENING_ICON_SLOTS}
                    />
                ),
            };
            bindings.rarity_text = { caption: `${t('collectibles.item.rarity', '')}: ${rarity ?? ''}`, color: (0xff000000 | (rarityColor ?? 0xf5d634)) >>> 0 };
            break;
        case 'friendonline':
            bindings.slide_notification_away = {
                onPointerTap: (event: FederatedPointerEvent) => {
                    // The arrow swipes; the bubble's own click does not follow.
                    event.stopPropagation();
                    onSwipe();
                },
            };
            if (figure) {
                bindings['#notification_icon'] = { visible: false };
                bindings.bitmaps = {
                    children: (
                        <Box layout={{ position: 'absolute', left: 2, top: 0 }}>
                            <AvatarFaceImage
                                figure={figure}
                                gender={gender ?? AvatarGenderType.Male}
                                direction={2}
                            />
                        </Box>
                    ),
                };
            }
            break;
    }

    return (
        <Box
            ref={setNode}
            zIndex={zIndex}
            alpha={frame?.blend ?? 0}
            x={frame?.swipe ?? 0}
            y={frame?.margin ?? 0}
            cursor="pointer"
            onPointerOver={() => onHover(true)}
            onPointerOut={() => onHover(false)}
            onPointerTap={onClick}
            layout={{ position: 'absolute', top: 0, right: NOTIFICATION_SIDE_MARGIN }}
        >
            <TemplateWindow
                id={TEMPLATES[item.layout]}
                bindings={bindings}
                arrange={arrange}
            />
        </Box>
    );
};
