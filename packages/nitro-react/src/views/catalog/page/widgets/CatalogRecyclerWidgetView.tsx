import { GetRoomEngine } from '@nitrodevco/nitro-renderer';
import { TemplateBindings, TemplateElement, TemplateItem } from '@nitrodevco/nitro-theme';
import { useEffect, useRef, useState } from 'react';

import {
    cancelRecycler, executeRecycler, getRecyclerTimeout, hasEnoughDucketsForRecycler, initRecycler, RECYCLER_SLOT_CATEGORY_FLOOR,
    RECYCLER_SLOT_CATEGORY_WALL, releaseRecyclerSlot, setRecyclerNextAllowedTimestamp,
} from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useInventoryTradingActive } from '#base/context/inventory';
import { getRecyclerSecondsToWait, isRecyclerReadyToRecycle, RECYCLER_SYSTEM_STATUS_CLOSED, RecyclerSlotItem, useRecyclerActions, useRecyclerStore } from '#base/context/recycler';
import { useIsInRoom } from '#base/context/room';
import { useConfigValue, useSystemStore, useTranslation, useWindowActions } from '#base/context/system';
import { useSecondsClock } from '#base/hooks';
import { findLayoutChildByName, findTemplateChild, LayoutImage, ThemeImage, useTemplateLibrary } from '#base/theme';
import { RecyclerEngineAnimator } from '#base/views/catalog/recycler/RecyclerEngineAnimator';

import { CATALOG_LIBRARY, catalogTemplateId } from '../catalogTemplates';
import { useCatalogWidgetView } from '../catalogWidgetView';

/** `onAbortClick` / `onAnimationComplete`: how long the gauge waits before swinging back. */
const ABORT_RESET_DELAY = 650;
const FINISH_RESET_DELAY = 1000;

/** `emoji_2_template`'s `y`, where an emotion starts. */
const EMOTION_START_Y = 210;

/** The `slot_bg_<n>` / `slot_img_<n>` the layout has. */
const LAYOUT_SLOTS = 12;

/** `FrankRecyclerEmotion`'s art. */
const EMOTIONS = [ 'franks_emotions_blush', 'franks_emotions_heart' ];

interface FrankEmotion {
    key: number;
    asset: string;
    offsetX: number;
    speed: number;
    /** Seconds since it started (`getTimer() - _startTime`). */
    elapsed: number;
}

/** `getFurniImageResult`: a floor slot's icon, or a wall slot's with its extra. */
const getSlotIconUrl = (slot: RecyclerSlotItem): string => {
    const engine = GetRoomEngine();

    if (slot.category === RECYCLER_SLOT_CATEGORY_FLOOR) return engine.getFurnitureFloorIconUrl(slot.typeId) ?? '';
    if (slot.category === RECYCLER_SLOT_CATEGORY_WALL) return engine.getFurnitureWallIconUrl(slot.typeId, slot.xxxExtra || undefined) ?? '';

    return '';
};

/**
 * `pointer_arrow` turned to `RecyclerEngineAnimator`'s rotation (`_arrow.rotation`): drawn into the
 * bitmap, whose own asset is cleared. A `rotation` binding would republish the widget's view, and so
 * redraw the page's template, on every one of the gauge's 60fps ticks; this reads the rotation
 * itself, so a tick redraws only the arrow.
 */
const RecyclerPointerArrow = () => {
    const rotation = useRecyclerStore(x => x.recyclerArrowRotation);

    return (
        <ThemeImage
            src={LayoutImage('habbo-window-manager-com/recycler_furnimatic_indicator_pointer_arrow.png')}
            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center', fitSizeToContents: true, rotation }}
            layout={{ position: 'absolute', left: 0, top: 0 }}
        />
    );
};

const POINTER_ARROW = <RecyclerPointerArrow />;

/**
 * One `FrankRecyclerEmotion`: a clone of `emoji_2_template` added to `disabled_border` with a blush
 * or a heart, shifted -20 to +49px, rising at 30 to 110px a second while it fades in over 0.8s in
 * steps of a tenth.
 */
const emotionItem = (from: TemplateElement, emotion: FrankEmotion): TemplateItem => {
    // `blend` follows `min(1, t * 1.25)` a tenth at a time, and lands on 1 exactly.
    const fade = Math.min(1, emotion.elapsed * 1.25);
    const alpha = (fade === 1) ? 1 : (Math.floor(fade * 10) / 10);

    return {
        key: String(emotion.key),
        from,
        bindings: { '': { asset: `habbo-window-manager-com-${emotion.asset}`, alpha } },
        arrange: ({ root }) => {
            const window = root();

            window?.setRectangle(window.x + emotion.offsetX, Math.trunc(window.y + (emotion.speed * emotion.elapsed)), window.width, window.height);
        },
    };
};

/**
 * `recyclerWidget` - Flash's `RecyclerCatalogWidget`, its view attached into the page's container
 * (`attachWidgetView`): `renderDucketCost` (`ducket_cost` and `ducket_icon`, both hidden at a cost
 * of 0), `recycler_recycle` (`updateRecycleButton`: `catalog.recycler.button.wait` with the seconds
 * left while the recycler cools down), the slots (`renderSlotGraphics`: `slot_bg_<n>` and
 * `slot_img_<n>` given `ctlg_recycler_slot_bg` up to `numberOfSlots`; `updateSlots`: each item's
 * icon centred in its `slot_img`; `WME_UP` on a slot takes its item back - `releaseSlot`), the
 * gauge (`pointer_arrow`, which `RecyclerEngineAnimator` swings while it shakes the page's
 * `recycle_machine`, and `abort_region` while it runs), and `disabled_border` while the server has
 * the recycler closed (`updateUI`), whose `pat_frank_btn` sends a blush or a heart floating up
 * (`FrankRecyclerEmotion`).
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
    const shake = useRecyclerStore(x => x.recyclerMachineShake);
    const inRoom = useIsInRoom();
    const tradingActive = useInventoryTradingActive();
    const floorItems = useSystemStore(x => x.floorItems);
    const { showAlert } = useWindowActions();
    const { setRecyclerArrowRotation, setRecyclerMachineShake } = useRecyclerActions();
    const now = useSecondsClock();
    const templates = useTemplateLibrary(CATALOG_LIBRARY);
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

    // `FrankRecyclerEmotion.onTick`: a 60fps timer while an emotion rises, each gone once it is 50px above the top.
    const rising = emotions.length > 0;

    useEffect(() => {
        if (!rising) return;

        const timer = setInterval(() => {
            const time = performance.now();

            setEmotions(list => list
                .map(emotion => ({ ...emotion, elapsed: (time - emotion.key) / 1000 }))
                .filter(emotion => (EMOTION_START_Y + (emotion.speed * emotion.elapsed)) >= -50));
        }, 1000 / 60);

        return () => clearInterval(timer);
    }, [ rising ]);

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
        elapsed: 0,
    } ]);

    const bindings: TemplateBindings = {
        ducket_cost: { visible: ducketCost !== 0, caption: String(ducketCost) },
        ducket_icon: { visible: ducketCost !== 0 },
        recycler_recycle: {
            caption: (secondsToWait > 0) ? t('catalog.recycler.button.wait', '', { s: String(secondsToWait) }) : '${catalog.recycler.button.recycle}',
            disabled: !recycleEnabled,
            onPointerTap: onRecycle,
        },
        pointer_arrow: { asset: '', children: POINTER_ARROW },
        abort_region: { visible: abortVisible, onPointerTap: onAbort },
        disabled_border: {
            visible: disabled,
            added: templates
                ? emotions.flatMap((emotion) => {
                        const template = findTemplateChild(templates[catalogTemplateId('recyclerWidget')]?.elements ?? [], 'emoji_2_template');

                        return template ? [ emotionItem(template, emotion) ] : [];
                    })
                : [],
        },
        pat_frank_btn: { onPointerTap: onPatFrank },
    };

    for (let index = 0; index < Math.min(numberOfSlots, LAYOUT_SLOTS); index++) {
        const slot = slots[index];
        const iconUrl = slot ? getSlotIconUrl(slot) : '';
        const onPointerUp = () => releaseRecyclerSlot(index);

        bindings[`slot_bg_${index + 1}`] = { asset: 'habbo-catalog-com-ctlg_recycler_slot_bg', onPointerUp };
        bindings[`slot_img_${index + 1}`] = {
            onPointerUp,
            children: (iconUrl !== '') && (
                <ThemeImage
                    src={iconUrl}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 0, width: 34, top: 0, height: 34, overflow: 'hidden' }}
                />
            ),
        };
    }

    useCatalogWidgetView({
        template: 'recyclerWidget',
        bindings,
        // `RecyclerEngineAnimator.setShake`: the page's `recycle_machine` moved off its place.
        arrange: ((shake.x !== 0) || (shake.y !== 0))
            ? ({ root }) => {
                    const page = root()?.parent?.parent;
                    const machine = page && findLayoutChildByName(page, 'recycle_machine');

                    machine?.setRectangle(machine.x + shake.x, machine.y + shake.y, machine.width, machine.height);
                }
            : undefined,
    });

    return null;
};
