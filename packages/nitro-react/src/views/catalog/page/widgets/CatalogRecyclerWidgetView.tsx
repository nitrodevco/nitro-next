import { GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { useEffect, useRef, useState } from 'react';

import {
    cancelRecycler, executeRecycler, getRecyclerTimeout, hasEnoughDucketsForRecycler, initRecycler, RECYCLER_SLOT_CATEGORY_FLOOR,
    RECYCLER_SLOT_CATEGORY_WALL, releaseRecyclerSlot, setRecyclerNextAllowedTimestamp,
} from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { getRecyclerSecondsToWait, isRecyclerReadyToRecycle, RECYCLER_SYSTEM_STATUS_CLOSED, RecyclerSlotItem, useRecyclerActions, useRecyclerStore } from '#base/context/recycler';
import { useRoomStore } from '#base/context/room';
import { useConfigValue, useSystemStore, useTranslation } from '#base/context/system';
import { useWiredTradingStore } from '#base/context/wired-trading';
import { useSecondsClock } from '#base/hooks';
import { Border, Box, Bubble, Button, Icon, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';
import { RecyclerEngineAnimator } from '#base/views/catalog/recycler/RecyclerEngineAnimator';

/** `onAbortClick` / `onAnimationComplete`: how long the gauge waits before swinging back. */
const ABORT_RESET_DELAY = 650;
const FINISH_RESET_DELAY = 1000;

/** The 12 slot positions of `slots` (37px apart, rows at 0, 44 and 90); `numberOfSlots` of them are used. */
const SLOT_POSITIONS = [ 0, 44, 90 ].flatMap(top => [ 0, 37, 74, 111 ].map(left => ({ left, top })));

/** `FrankRecyclerEmotion`'s art. */
const EMOTIONS = [ 'franks_emotions_blush', 'franks_emotions_heart' ];

/** `emoji_2_template`: where each emotion starts, and its size. */
const EMOTION_TEMPLATE = { left: 32, top: 210, size: 40 };

interface FrankEmotion {
    key: number;
    asset: string;
    offsetX: number;
    speed: number;
}

/** `getFurniImageResult`: a floor slot's icon, or a wall slot's with its extra. */
const getSlotIconUrl = (slot: RecyclerSlotItem): string => {
    const engine = GetRoomEngine();

    if (slot.category === RECYCLER_SLOT_CATEGORY_FLOOR) return engine.getFurnitureFloorIconUrl(slot.typeId) ?? '';
    if (slot.category === RECYCLER_SLOT_CATEGORY_WALL) return engine.getFurnitureWallIconUrl(slot.typeId, slot.xxxExtra || undefined) ?? '';

    return '';
};

/**
 * One `FrankRecyclerEmotion`: a copy of `emoji_2_template` with a blush or a heart, shifted -20 to
 * +49px, rising at 30 to 110px a second while it fades in over 0.8s in steps of a tenth, gone once
 * it is 50px above the top.
 */
const FrankEmotionView = ({ emotion, onDone }: { emotion: FrankEmotion; onDone: (key: number) => void }) => {
    const [ elapsed, setElapsed ] = useState(0);

    // `start` / `onTick`: a 60fps timer until the emotion has risen out of sight.
    useEffect(() => {
        const start = performance.now();
        const timer = setInterval(() => {
            const seconds = (performance.now() - start) / 1000;

            if ((EMOTION_TEMPLATE.top + (emotion.speed * seconds)) < -50) {
                clearInterval(timer);
                onDone(emotion.key);

                return;
            }

            setElapsed(seconds);
        }, 1000 / 60);

        return () => clearInterval(timer);
    }, [ emotion, onDone ]);

    const y = EMOTION_TEMPLATE.top + (emotion.speed * elapsed);
    // `blend` follows `min(1, t * 1.25)` a tenth at a time, and lands on 1 exactly.
    const fade = Math.min(1, elapsed * 1.25);
    const alpha = (fade === 1) ? 1 : (Math.floor(fade * 10) / 10);

    return (
        <ThemeImage
            src={LayoutImage(`catalog/${emotion.asset}.png`)}
            bitmap={{}}
            alpha={alpha}
            layout={{ position: 'absolute', left: EMOTION_TEMPLATE.left + emotion.offsetX, width: EMOTION_TEMPLATE.size, top: Math.trunc(y), height: EMOTION_TEMPLATE.size }}
        />
    );
};

/**
 * `recyclerWidget` - Flash's `RecyclerCatalogWidget` with `recyclerWidget.xml` attached into the
 * page's container (tagged `E`, not `EMBEDDED`):
 *
 * - the ducket cost (`recycler.ducket_cost`, the bold number and the style 32 ducket icon in a row;
 *   neither is shown when it is 0) and the green style 6 `recycle` button, which reads
 *   `catalog.recycler.button.wait` with the seconds left while the recycler cools down;
 * - the slots panel (the `recycler_furnimatic_container_*` art) with `numberOfSlots` 34x34 slots
 *   (`ctlg_recycler_slot_bg`), each showing its item's icon centred; releasing the pointer on a
 *   filled slot takes its item back (`releaseSlot`);
 * - the gauge panel: the indicator, the pointer arrow `RecyclerEngineAnimator` swings, its base,
 *   and the underlined `abort` link while it runs;
 * - `disabled_border` (grey, 0.7) over everything while the server has the recycler closed:
 *   Frank, his speech bubble (`recycler.broken`, the sad emotion) and `pat_frank_btn`, which sends
 *   a blush or a heart floating up (`FrankRecyclerEmotion`).
 *
 * `init` registers the widget with the recycler, which asks the server for its status; `dispose`
 * cancels it (the inventory stops recycling and the slots empty). `recycle` checks the duckets
 * (`catalog.alert.notenough.activitypoints.title.0`), then runs the gauge - the easter egg when a
 * `wf_act_reset_timers` is in a slot - and when it finishes the items are recycled and the
 * cool down starts. The button is live when the recycler is ready to recycle, the gauge idle and
 * no cool down left.
 *
 * Not ported: dragging an item from the room engine's object mover onto a slot
 * (`onSlotMouseEvent` with a `CatalogObjectMover`, `OBJECT_PLACE` data): the room engine has no
 * object mover in this client. Items reach the slots the other way Flash has, a double click in
 * the inventory while the recycler runs (`HabboInventory.recycleSelectedFurni`).
 */
export const CatalogRecyclerWidgetView = () => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const localStatus = useRecyclerStore(x => x.recyclerLocalStatus);
    const systemStatus = useRecyclerStore(x => x.recyclerSystemStatus);
    const nextAllowedAt = useRecyclerStore(x => x.recyclerNextAllowedAt);
    const slots = useRecyclerStore(x => x.recyclerSlots);
    const arrowRotation = useRecyclerStore(x => x.recyclerArrowRotation);
    const inRoom = useRoomStore(x => !!x.room);
    const tradingActive = useWiredTradingStore(x => x.tradeRunning);
    const floorItems = useSystemStore(x => x.floorItems);
    const showAlert = useSystemStore(x => x.showAlert);
    const { setRecyclerArrowRotation, setRecyclerMachineShake } = useRecyclerActions();
    const now = useSecondsClock();
    const [ animating, setAnimating ] = useState(false);
    const [ abortVisible, setAbortVisible ] = useState(false);
    const [ emotions, setEmotions ] = useState<FrankEmotion[]>([]);
    const animatorRef = useRef<RecyclerEngineAnimator | null>(null);
    const numberOfSlots = useConfigValue<number>('recycler.number_of_slots') ?? 5;
    const ducketCost = useConfigValue<number>('recycler.ducket_cost') ?? 0;

    // `init` / `dispose`.
    useEffect(() => {
        let rotation = 0;

        const animator = new RecyclerEngineAnimator({
            getRotation: () => rotation,
            setRotation: (value) => {
                rotation = value;
                setRecyclerArrowRotation(value);
            },
            setShake: (x, y) => setRecyclerMachineShake(x, y),
        }, () => {
            // `onAnimationComplete`.
            executeRecycler(send);
            setRecyclerNextAllowedTimestamp(performance.now() + (getRecyclerTimeout() * 1000));
            setTimeout(() => animator.reset(), FINISH_RESET_DELAY);
            setAbortVisible(false);
            setAnimating(false);
        });

        animatorRef.current = animator;
        initRecycler(send);

        return () => {
            cancelRecycler();
            animator.dispose();
            setRecyclerMachineShake(0, 0);
            animatorRef.current = null;
        };
    }, [ send, setRecyclerArrowRotation, setRecyclerMachineShake ]);

    const secondsToWait = getRecyclerSecondsToWait(systemStatus, nextAllowedAt, now);
    const recycleEnabled = isRecyclerReadyToRecycle(localStatus, systemStatus, slots, numberOfSlots, inRoom, tradingActive) && !animating && (secondsToWait <= 0);
    const disabled = (systemStatus === RECYCLER_SYSTEM_STATUS_CLOSED);

    const onRecycle = () => {
        if (!hasEnoughDucketsForRecycler()) {
            showAlert(t('generic.alert.title'), t('catalog.alert.notenough.activitypoints.title.0'));

            return;
        }

        // `easterEggMode`: a `wf_act_reset_timers` in any slot.
        const easterEgg = slots.some(slot => !!slot && (floorItems[slot.typeId]?.className === 'wf_act_reset_timers'));

        animatorRef.current?.start(easterEgg);
        setAnimating(true);
        setAbortVisible(true);
    };

    const onAbort = () => {
        const animator = animatorRef.current;

        setAbortVisible(false);
        setAnimating(false);

        if (!animator) return;

        animator.stop();
        setTimeout(() => animator.reset(), ABORT_RESET_DELAY);
    };

    const onPatFrank = () => setEmotions(list => [ ...list, {
        key: performance.now(),
        asset: EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)],
        offsetX: Math.floor(Math.random() * 70) - 20,
        speed: -((Math.random() * 80) + 30),
    } ]);

    const removeEmotion = (key: number) => setEmotions(list => list.filter(emotion => emotion.key !== key));

    return (
        <Region layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 208 }}>
            <Region
                name="normal"
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 208 }}
            >
                {(ducketCost !== 0) && (
                    <Box layout={{ position: 'absolute', left: 19, top: 7, height: 30, flexDirection: 'row', alignItems: 'flex-start' }}>
                        <ThemeText
                            name="ducket_cost"
                            text={String(ducketCost)}
                            textStyle="u_regular"
                            flashFormat={{ bold: true }}
                            verticalAlign="top"
                            layout={{ marginTop: 6 }}
                        />
                        <Box layout={{ width: 2, height: 30 }} />
                        <Icon
                            name="ducket_icon"
                            variant={32}
                            layout={{ marginTop: 4, width: 23, height: 21 }}
                        />
                    </Box>
                )}
                <Button
                    variant="6"
                    name="recycler_recycle"
                    textStyle="button_shiny_regular"
                    tintColor="#00aa00"
                    disabled={!recycleEnabled}
                    onPointerTap={onRecycle}
                    layout={{ position: 'absolute', left: 19, width: 194, top: 41, height: 30 }}
                >
                    {(secondsToWait > 0) ? t('catalog.recycler.button.wait', '', { s: String(secondsToWait) }) : t('catalog.recycler.button.recycle')}
                </Button>
                <Region
                    name="slots_wrapper"
                    layout={{ position: 'absolute', left: 16, width: 185, top: 85, height: 156 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 185, top: 0, height: 115 }}>
                        <ThemeImage
                            src={LayoutImage('catalog/recycler_furnimatic_container_left.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                            layout={{ position: 'absolute', left: 0, top: 0 }}
                        />
                        <ThemeImage
                            src={LayoutImage('catalog/recycler_furnimatic_container_slice.png')}
                            bitmap={{}}
                            layout={{ position: 'absolute', left: 15, width: 158, top: 0, height: 115 }}
                        />
                        <ThemeImage
                            src={LayoutImage('catalog/recycler_furnimatic_container_right.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                            layout={{ position: 'absolute', left: 172, top: 0 }}
                        />
                    </Region>
                    <Region
                        name="slots"
                        layout={{ position: 'absolute', left: 21, width: 145, top: 16, height: 124 }}
                    >
                        {SLOT_POSITIONS.slice(0, numberOfSlots).map((position, index) => {
                            const slot = slots[index];
                            const iconUrl = slot ? getSlotIconUrl(slot) : '';

                            return (
                                <Region
                                    key={index}
                                    name={`slot_img_${index + 1}`}
                                    onPointerUp={() => releaseRecyclerSlot(index)}
                                    layout={{ position: 'absolute', left: position.left, width: 34, top: position.top, height: 34 }}
                                >
                                    <ThemeImage
                                        name={`slot_bg_${index + 1}`}
                                        src={LayoutImage('catalog/ctlg_recycler_slot_bg.png')}
                                        bitmap={{}}
                                        layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 34 }}
                                    />
                                    {(iconUrl !== '') && (
                                        <ThemeImage
                                            src={iconUrl}
                                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                            layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 34, overflow: 'hidden' }}
                                        />
                                    )}
                                </Region>
                            );
                        })}
                    </Region>
                </Region>
                <Region
                    name="indicator_wrapper"
                    layout={{ position: 'absolute', left: 214, width: 123, top: 85, height: 115 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, width: 123, top: 0, height: 115 }}>
                        <ThemeImage
                            src={LayoutImage('catalog/recycler_furnimatic_container_left.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                            layout={{ position: 'absolute', left: 0, top: 0 }}
                        />
                        <ThemeImage
                            src={LayoutImage('catalog/recycler_furnimatic_container_slice.png')}
                            bitmap={{}}
                            layout={{ position: 'absolute', left: 15, width: 96, top: 0, height: 115 }}
                        />
                        <ThemeImage
                            src={LayoutImage('catalog/recycler_furnimatic_container_right.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                            layout={{ position: 'absolute', left: 110, top: 0 }}
                        />
                    </Region>
                    <Region
                        name="indicator"
                        layout={{ position: 'absolute', left: 1, width: 123, top: 0, height: 115 }}
                    >
                        <ThemeImage
                            name="indicator"
                            src={LayoutImage('catalog/recycler_furnimatic_indicator.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 115 }}
                        />
                        <Region
                            name="indicator_pointer"
                            layout={{ position: 'absolute', left: 37, width: 50, top: 43, height: 50 }}
                        >
                            <ThemeImage
                                name="pointer_arrow"
                                src={LayoutImage('catalog/recycler_furnimatic_indicator_pointer_arrow.png')}
                                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', fitSizeToContents: true, rotation: arrowRotation }}
                                layout={{ position: 'absolute', left: 0, top: 0 }}
                            />
                            <ThemeImage
                                name="pointer_base"
                                src={LayoutImage('catalog/recycler_furnimatic_indicator_pointer_base.png')}
                                bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', fitSizeToContents: true }}
                                layout={{ position: 'absolute', left: 0, top: 0 }}
                            />
                        </Region>
                        {abortVisible && (
                            <Region
                                name="abort_region"
                                cursor="pointer"
                                onPointerTap={onAbort}
                                layout={{ position: 'absolute', left: 29, width: 65, top: 91, height: 17 }}
                            >
                                <ThemeText
                                    text={t('catalog.recycler.button.abort')}
                                    textStyle="u_regular"
                                    textOptions={{ fontSize: 10 }}
                                    flashFormat={{ underline: true }}
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 0, top: 0 }}
                                />
                            </Region>
                        )}
                    </Region>
                </Region>
            </Region>
            {disabled && (
                <Region
                    alpha={0.7}
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 208 }}
                >
                    <Border
                        variant="3"
                        name="disabled_border"
                        tintColor="#888888"
                        layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 208, overflow: 'hidden' }}
                    >
                        <ThemeImage
                            src={LayoutImage('catalog/image_frank_dont_know.png')}
                            bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                            layout={{ position: 'absolute', left: 235, top: 99 }}
                        />
                        <Bubble
                            variant="7"
                            pointer="right"
                            margins={[ 8, 8, 8, 8 ]}
                            layout={{ position: 'absolute', left: 107, width: 155, top: 98, height: 81 }}
                        >
                            <ThemeText
                                text={t('recycler.broken')}
                                textStyle="u_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 103 }}
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 4, width: 107, top: 4 }}
                            />
                            <ThemeImage
                                name="emoji_1"
                                src={LayoutImage('catalog/franks_emotions_sad.png')}
                                bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                                layout={{ position: 'absolute', left: 115, top: 5 }}
                            />
                        </Bubble>
                        <Button
                            variant="3"
                            name="pat_frank_btn"
                            textStyle="button_shiny_regular"
                            onPointerTap={onPatFrank}
                            layout={{ position: 'absolute', left: 235, width: 115, top: 11, height: 30 }}
                        >
                            {t('recycler.pat_frank')}
                        </Button>
                        {emotions.map(emotion => (
                            <FrankEmotionView
                                key={emotion.key}
                                emotion={emotion}
                                onDone={removeEmotion}
                            />
                        ))}
                    </Border>
                </Region>
            )}
        </Region>
    );
};
