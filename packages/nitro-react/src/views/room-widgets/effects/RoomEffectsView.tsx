/**
 * The effects the user owns - Flash `EffectsWidget`, on `habbo-room-ui-com`'s `effects_widget` layout
 * (`open`), its bottom-left corner 2 right of the toolbar at the toolbar's bottom
 * (`toolbar.getRect().right + TOOLBAR_MARGIN`, `bottom - height`). `close` hides it (`onClose`).
 *
 * `update` puts one `EffectView` per effect into `list` and sets the list's height to what it holds,
 * between `LIST_HEIGHT_MIN` and `LIST_HEIGHT_MAX`, which the window follows; `no_effects` shows while
 * there are none. An `EffectView` (`update`) is built from `memenu_effect_selected` for the effect
 * being worn, `memenu_effect_unselected` for one that is running, and `memenu_effect_inactive` for one
 * not switched on yet:
 *
 * - `effect_name` is `${fx_<type>}`, `effect_icon` the effect's icon, `effect_amount` how many there
 *   are, its `effect_amount_bg1` hidden under two.
 * - inactive: `activate_effect` switches it on (`AvatarEffectActivatedComposer`).
 * - running: a click on the row wears it or takes it off (`selectEffect`: `AvatarEffectSelectedComposer`);
 *   `effect_hilite` holds `memenu_fx_pause` over the worn effect or `memenu_fx_play` over the other,
 *   hidden, and an active effect's row shows it while the pointer is over it (`onMouseEvent`). `update`
 *   rebuilds the row - hilite hidden again - whenever the effect changes, so a hover is kept for the
 *   state it began in.
 * - `time_left` and `loader_bar` (its width the share of the duration left of its layout 94,
 *   `onUpdate`) count down once a second from when the server last said how long was left
 *   (`secondsLeftOf`), as `EffectView`'s one-second timer does. The count stops at zero and waits for
 *   the server's expiry. A permanent effect shows no time left, as the port always has.
 *
 * The icons are the inventory library's (`habbo-inventory-com`, `fx_icon_<type>`), as `EffectsModel`
 * draws them; it is not in the boot preload, so the first of these to be drawn pulls its bundle in.
 * `effect_selector`, in the room UI's library, is built by no class of this revision.
 */
import { useEffect, useState } from 'react';

import { useTranslation } from '#base/context/system';
import { UserAvatarEffect } from '#base/context/user';
import { secondsLeftOf } from '#base/context/user/store/avatarEffectsModel';
import { Box, LayoutImage, LayoutWindow, TemplateItem, TemplateWindow, TemplateWindows, useTemplate } from '#base/theme';

export interface RoomEffectsViewProps {
    effects: UserAvatarEffect[];
    /** Switching on an effect that is not running yet; it starts counting down. */
    onActivate: (type: number) => void;
    /** Wearing one that is already running, or taking it off again. */
    onToggleWear: (type: number, isInUse: boolean) => void;
    onClose: () => void;
    /** `EffectsWidget.open`: `toolbar.getRect().right + 2` - the toolbar's width, plus the two it stands off. */
    left: number;
}

const WIDGET_TEMPLATE = 'habbo-room-ui-com/effects_widget';
const SELECTED_TEMPLATE = 'habbo-room-ui-com/memenu_effect_selected';
const UNSELECTED_TEMPLATE = 'habbo-room-ui-com/memenu_effect_unselected';
const INACTIVE_TEMPLATE = 'habbo-room-ui-com/memenu_effect_inactive';

const effectIcon = (type: number) => LayoutImage(`habbo-inventory-com/fx_icon_${type}.png`);

/** `EffectView.update`: the hilite's art over the worn effect and over one only running. */
const FX_PAUSE = LayoutImage('habbo-room-ui-com/memenu_fx_pause.png');
const FX_PLAY = LayoutImage('habbo-room-ui-com/memenu_fx_play.png');

/** `EffectsWidget.LIST_HEIGHT_MAX` / `LIST_HEIGHT_MIN`. */
const LIST_HEIGHT_MAX = 320;
const LIST_HEIGHT_MIN = 48;

const SECONDS_PER_DAY = 86400;
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_MINUTE = 60;

const twoDigits = (value: number) => ((value < 10) ? `0${value}` : String(value));

/** `EffectView.setTimeLeft`: `hh:mm:ss` from an hour up, `mm:ss` under it. */
const formatTimeLeft = (seconds: number) => {
    const hours = Math.floor(seconds / SECONDS_PER_HOUR);
    const minutes = Math.floor(seconds / SECONDS_PER_MINUTE) % 60;
    const rest = seconds % SECONDS_PER_MINUTE;

    return (hours > 0)
        ? `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(rest)}`
        : `${twoDigits(minutes)}:${twoDigits(rest)}`;
};

/**
 * `update`: the list as high as what it holds, within its limits. `IScrollableListWindow.scrollableRegion`
 * is its inner list's, which the template's scrollable window does not hand on, so it is read there.
 */
const arrange = ({ find }: TemplateWindows) => {
    const list = find('list');

    if (!list) return;

    const inner = ('list' in list) ? (list.list as LayoutWindow | undefined) : undefined;
    const content = (inner ?? list).scrollableRegion.height;

    list.setHeight(Math.max(Math.min(content, LIST_HEIGHT_MAX), LIST_HEIGHT_MIN));
};

export const RoomEffectsView = ({ effects, onActivate, onToggleWear, onClose, left }: RoomEffectsViewProps) => {
    const t = useTranslation();
    const selectedTemplate = useTemplate(SELECTED_TEMPLATE);
    const unselectedTemplate = useTemplate(UNSELECTED_TEMPLATE);
    const inactiveTemplate = useTemplate(INACTIVE_TEMPLATE);
    /** The row the pointer is over, with the state `EffectView.update` last built it in. */
    const [ hovered, setHovered ] = useState<{ type: number; isInUse: boolean; isActive: boolean } | null>(null);
    const [ now, setNow ] = useState(() => Date.now());
    const anyCounting = effects.some(effect => effect.isActive && !effect.isPermanent);

    // `EffectView`'s timer: one tick a second, only while something is counting down.
    useEffect(() => {
        if (!anyCounting) return undefined;

        const timer = setInterval(() => setNow(Date.now()), 1000);

        return () => clearInterval(timer);
    }, [ anyCounting ]);

    if (!selectedTemplate || !unselectedTemplate || !inactiveTemplate) return null;

    const timeLeftText = (effect: UserAvatarEffect) => {
        const secondsLeft = secondsLeftOf(effect, now);

        if (secondsLeft > SECONDS_PER_DAY) return t('widgets.memenu.effects.active.daysleft', '', { days_left: String(Math.floor(secondsLeft / SECONDS_PER_DAY)) });

        return t('widgets.memenu.effects.active.timeleft', '', { time_left: formatTimeLeft(secondsLeft) });
    };

    const items: TemplateItem[] = effects.map((effect) => {
        const common = {
            effect_name: { caption: `\${fx_${effect.type}}` },
            effect_icon: { asset: effectIcon(effect.type) },
            effect_amount: { caption: String(effect.amountInInventory) },
            effect_amount_bg1: { visible: effect.amountInInventory >= 2 },
        };

        if (!effect.isInUse && !effect.isActive) {
            return {
                key: `${effect.type}`,
                from: inactiveTemplate,
                bindings: { ...common, activate_effect: { onPointerTap: () => onActivate(effect.type) } },
            };
        }

        const state = { type: effect.type, isInUse: effect.isInUse, isActive: effect.isActive };
        const hiliteVisible = !!hovered && (hovered.type === effect.type) && (hovered.isInUse === effect.isInUse) && (hovered.isActive === effect.isActive);
        const share = (effect.isActive && (effect.duration > 0)) ? (secondsLeftOf(effect, now) / effect.duration) : 0;

        return {
            key: `${effect.type}`,
            from: effect.isInUse ? selectedTemplate : unselectedTemplate,
            bindings: {
                ...common,
                '': {
                    onPointerTap: () => onToggleWear(effect.type, effect.isInUse),
                    onPointerOver: effect.isActive ? () => setHovered(state) : undefined,
                    onPointerOut: effect.isActive ? () => setHovered(current => ((current?.type === effect.type) ? null : current)) : undefined,
                },
                effect_hilite: { asset: effect.isInUse ? FX_PAUSE : FX_PLAY, visible: hiliteVisible },
                time_left: effect.isPermanent ? { visible: false } : { caption: timeLeftText(effect) },
            },
            // `onUpdate`: the bar the share left of its layout width (`_maxWidth`).
            arrange: ({ find }) => {
                const bar = find('loader_bar');

                if (bar) bar.setWidth(share * bar.width);
            },
        };
    });

    return (
        <Box layout={{ position: 'absolute', left, bottom: 0 }}>
            <TemplateWindow
                id={WIDGET_TEMPLATE}
                bindings={{
                    close: { onPointerTap: onClose },
                    list: { items },
                    no_effects: { visible: !effects.length },
                }}
                arrange={arrange}
            />
        </Box>
    );
};
