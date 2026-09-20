import { Container as PixiContainer } from 'pixi.js';
import { useState } from 'react';

import { NOTIFICATION_ASSETS, NotificationAssetName, NotificationItem } from '#base/context/notifications';
import { useInterpolate, useTranslation } from '#base/context/system';
import { Border, Box, Button, LayoutImage, Region, ThemeImage, ThemeText, useLayoutEvent } from '#base/theme';

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

const BUBBLE_WIDTH = 190;

/** A library bitmap by its Flash name, or the URL the caller passed. */
const imageSource = (image: string | undefined) => {
    if (!image) return undefined;

    const file = NOTIFICATION_ASSETS[image as NotificationAssetName];

    return file ? LayoutImage(`notifications/${file}`) : image;
};

/**
 * One notification bubble - `HabboNotificationItemView`'s window, in the layout its style names:
 * `notification_xml` (the black bubble with an icon), `notification_wired_xml`,
 * `notification_treasurehunt_xml` and `notification_friendonline_xml`. Geometry and text styles
 * are the layouts' own. Where it is and how faded comes from `NotificationsView`, which runs the
 * stack; this draws and forwards the pointer.
 *
 * `setNotificationIcon` pads a bitmap to a square before the 50x50 bitmap window shows it; here
 * the image sits centred in that box at its own size, which is the same picture for every icon
 * the library holds.
 *
 * Every bubble is a direct child of the client's window layer, so that `zIndex` stacks it
 * against the frames the way Flash's single window layer did.
 */
export const NotificationsBubble = ({ item, frame, zIndex, onHover, onClick, onSwipe, isDisplayed, onMeasure }: NotificationsBubbleProps) => {
    const [ node, setNode ] = useState<PixiContainer | null>(null);

    // A DOM-mode node is an element: see `useLayoutEvent`.
    useLayoutEvent(node, () => onMeasure(node?.layout?.computedLayout.height ?? (node as unknown as HTMLElement | null)?.clientHeight ?? 0));

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
            {(item.layout === 'default') && <DefaultBubble item={item} />}
            {(item.layout === 'wired') && (
                <WiredBubble
                    item={item}
                    isDisplayed={isDisplayed}
                />
            )}
            {(item.layout === 'treasure_hunt') && <TreasureHuntBubble item={item} />}
            {(item.layout === 'friendonline') && (
                <FriendOnlineBubble
                    item={item}
                    onSwipe={onSwipe}
                />
            )}
        </Box>
    );
};

/** The 50x50 `notification_icon` bitmap window. */
const BubbleIcon = ({ image }: { image: string | undefined }) => (
    <ThemeImage
        src={imageSource(image)}
        layout={{ width: 50, height: 50 }}
    />
);

/**
 * `notification_xml`, 190x66. The view has a fixed `height`, so `setNotificationText` sizes the
 * text to its lines plus the 8px it had under it and the border grows to hold it, never below 66.
 */
const DefaultBubble = ({ item }: { item: NotificationItem }) => {
    const interpolate = useInterpolate();

    return (
        <Border
            variant="1"
            layout={{ width: BUBBLE_WIDTH, minHeight: 66, flexDirection: 'column', paddingLeft: 66, paddingTop: 8, paddingBottom: 8 }}
        >
            <Box layout={{ position: 'absolute', left: 8, top: 0, bottom: 0, width: 50, flexDirection: 'column', justifyContent: 'center' }}>
                <BubbleIcon image={item.image} />
            </Box>
            <ThemeText
                text={interpolate(item.text)}
                textStyle="text-style-bold"
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 116 }}
                verticalAlign="top"
                layout={{ width: 116 }}
            />
        </Border>
    );
};

/** The 24px title bar the wired and treasure hunt bubbles share: a darker border, squared off below. */
const BubbleHeader = ({ title, color, centered }: { title: string; color: string; centered: boolean }) => (
    <Box layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 24 }}>
        <Border
            variant="2"
            tintColor={color}
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        />
        <Region
            backgroundColor={color}
            layout={{ position: 'absolute', left: 0, right: 0, top: 15, bottom: 0 }}
        />
        <Box
            alpha={0.95}
            layout={{ position: 'absolute', left: 7, right: 6, top: 4, height: 17, flexDirection: 'row', justifyContent: centered ? 'center' : 'flex-start' }}
        >
            <ThemeText
                text={title}
                textStyle="text-style-u-bold"
                textOptions={{ fill: '#ffffff' }}
            />
        </Box>
    </Box>
);

/**
 * `notification_wired_xml`, 190x60 with one line of text. Its view has no fixed `height`: the
 * item list under the header grows with the text and with the toggle button, and takes the
 * border with it, so the stack goes by what the bubble measures.
 *
 * `showWiredNotification`: with a `toggleCallback` the layout's hidden button is shown, reading
 * `${notification.stop}` until it is pressed and `${notification.resume}` after.
 */
const WiredBubble = ({ item, isDisplayed }: { item: NotificationItem; isDisplayed: () => boolean }) => {
    const t = useTranslation();
    const interpolate = useInterpolate();
    const [ stopped, setStopped ] = useState(false);
    const toggleCallback = item.options.toggleCallback;

    const toggle = () => {
        if (!isDisplayed()) return;

        setStopped(!stopped);
        toggleCallback?.(!stopped);
    };

    return (
        <Border
            variant="2"
            tintColor="#355477"
            layout={{ width: BUBBLE_WIDTH, flexDirection: 'column', paddingTop: 31, paddingBottom: 6, overflow: 'hidden' }}
        >
            {/* `illumina_wired_bg_right` with `flip_x`, baked into the file; it hangs from the bottom edge. */}
            <ThemeImage
                src={LayoutImage('notifications/notifications_wired_bg.png')}
                alpha={0.3}
                layout={{ position: 'absolute', left: 0, bottom: -81, width: 240, height: 160 }}
            />
            <BubbleHeader
                title={t('product.type.wired')}
                color="#1e3044"
                centered={true}
            />
            <ThemeText
                text={interpolate(item.text)}
                textStyle="text-style-id-regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 174, align: 'center' }}
                verticalAlign="top"
                layout={{ width: 174, marginLeft: 8 }}
            />
            {/* The layout's 7px `spacing` item, there with or without the button. */}
            <Box layout={{ height: 7, flexShrink: 0 }} />
            {toggleCallback && (
                <Button
                    variant="106"
                    tintColor="#6e8cb7"
                    textStyle="text-style-il-button-white"
                    onPointerTap={toggle}
                    layout={{ alignSelf: 'flex-end', marginRight: 7, minWidth: 65, height: 25, flexShrink: 0 }}
                >
                    {stopped ? t('notification.resume') : t('notification.stop')}
                </Button>
            )}
            {item.image && (
                <Box layout={{ position: 'absolute', left: 7, top: 30 }}>
                    <BubbleIcon image={item.image} />
                </Box>
            )}
        </Border>
    );
};

/**
 * `notification_treasurehunt_xml`, 190x87, growing with its text like the default bubble (6px
 * under the text). `showTreasureHuntNotification`: the key picture stands in for a missing icon.
 */
const TreasureHuntBubble = ({ item }: { item: NotificationItem }) => {
    const t = useTranslation();
    const interpolate = useInterpolate();

    return (
        <Border
            variant="2"
            tintColor="#664e16"
            layout={{ width: BUBBLE_WIDTH, minHeight: 87, flexDirection: 'column', paddingLeft: 58, paddingTop: 29, paddingBottom: 6 }}
        >
            <BubbleHeader
                title={t('treasure_hunt.title')}
                color="#382b0c"
                centered={false}
            />
            <ThemeText
                text={interpolate(item.text)}
                textStyle="text-style-id-regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 119 }}
                verticalAlign="top"
                layout={{ width: 119 }}
            />
            {item.image
                ? (
                        <Box layout={{ position: 'absolute', left: 7, top: 30 }}>
                            <BubbleIcon image={item.image} />
                        </Box>
                    )
                : (
                        // `mysterybox_key_base` / `_overlay` at `rotation="270"`, baked into the files.
                        <Box layout={{ position: 'absolute', left: 10, top: 33, width: 39, height: 39 }}>
                            <ThemeImage
                                src={LayoutImage('notifications/notifications_treasure_hunt_key_base.png')}
                                tint="#f0b834"
                                layout={{ position: 'absolute', left: 0, top: 0 }}
                            />
                            <ThemeImage
                                src={LayoutImage('notifications/notifications_treasure_hunt_key_overlay.png')}
                                layout={{ position: 'absolute', left: 0, top: 0 }}
                            />
                        </Box>
                    )}
        </Border>
    );
};

/**
 * `notification_friendonline_xml`, 58 high: a pill that grows to the left with the name, tucked
 * under a circle holding the friend's head. The arrow at its left end is the one place a bubble
 * can be swiped away instead of clicked.
 */
const FriendOnlineBubble = ({ item, onSwipe }: { item: NotificationItem; onSwipe: () => void }) => {
    const interpolate = useInterpolate();

    return (
        <Box layout={{ height: 58, flexDirection: 'row' }}>
            <Box layout={{ marginTop: 12, height: 34, flexDirection: 'row', alignItems: 'flex-start', gap: 5, paddingLeft: 8, paddingRight: 16, paddingTop: 7 }}>
                <ThemeImage
                    src={LayoutImage('notifications/notification_friendonline_left.png')}
                    layout={{ position: 'absolute', left: 0, top: 0 }}
                />
                {/* The layout runs the middle piece 4px past the pill, under the circle. */}
                <ThemeImage
                    src={LayoutImage('notifications/notification_friendonline_middle.png')}
                    stretch={true}
                    layout={{ position: 'absolute', left: 7, right: -4, top: 0, height: 34 }}
                />
                <Region
                    stopsPropagation={true}
                    cursor="pointer"
                    onPointerTap={onSwipe}
                    layout={{ width: 10, height: 17, flexShrink: 0 }}
                >
                    <ThemeImage
                        src={LayoutImage('notifications/notification_friendonline_slide.png')}
                        layout={{ position: 'absolute', left: 2, top: 6 }}
                    />
                </Region>
                <ThemeText
                    text={interpolate(item.text)}
                    textStyle="text-style-u-regular"
                    textOptions={{ fill: '#cfcfcf' }}
                />
            </Box>
            <Box layout={{ width: 43, height: 58, flexShrink: 0 }}>
                <ThemeImage
                    src={LayoutImage('notifications/notification_friendonline_circle_inner.png')}
                    layout={{ position: 'absolute', left: -10, top: 3 }}
                />
                <Box layout={{ position: 'absolute', left: -8, top: 4 }}>
                    <BubbleIcon image={item.image} />
                </Box>
                <ThemeImage
                    src={LayoutImage('notifications/notification_friendonline_circle.png')}
                    layout={{ position: 'absolute', left: -10, top: 3 }}
                />
            </Box>
        </Box>
    );
};
