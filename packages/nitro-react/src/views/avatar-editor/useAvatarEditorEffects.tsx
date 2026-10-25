/**
 * The avatar editor's effects tab - `EffectsModel` / `EffectsView` / `AvatarEditorGridViewEffects` /
 * `EffectsParamView` (`effects.in.avatar.editor`):
 * - The tab shows `grid_container` as the parts do (`_effectsGridView` is built on the same
 *   `grid_container`), its `thumbs` a clone of `avatar_editor_effect_griditem` per effect after a
 *   first "remove" item (`avatar_editor_generic_remove_selection`); no palettes. With no effects,
 *   `content_title` and `content_notification` instead.
 * - An item (`AvatarEditorGridItemEffect`): the effect's icon, `effect_amount` over
 *   `effect_amount_bg1` from two copies up, `duration_container` with a black `progress_bar` filled
 *   0x20BF20 for the share of time left (full for a permanent one); `BG_COLOR` full while selected,
 *   at half under the pointer.
 * - A press (`EffectsModel.selectPart`) picks the effect - the first item none - and
 *   `effectParamsContainer` names it (`${fx_<type>}`): `save_to_activate` for one not running yet,
 *   else `time_left_bg` with the time left counting down each second; `get_more_button` opens
 *   `avatareditor.effects.buy.button.catalog.page.name`.
 * - The pick is `figureData.avatarEffectType` in the editor store, which the preview wears; the
 *   editor opens on the effect last worn (`getLastActivatedEffect`), and the server's effect
 *   messages move it too (`registerAvatarEditorHandlers`). A pick (`setAvatarEffectType`) marks it
 *   for the save, which wears it (`HabboInventory.setEffectSelected` -> `EffectsModel.useEffect`:
 *   switched on first when not running, then selected) or takes every effect off
 *   (`deselectAllEffects(true)`: selected -1). Flash keeps that mark until a save, so a pick in an
 *   editor closed without saving is still worn by the next save.
 */
import { useState } from 'react';

import { activateAvatarEffect, selectAvatarEffect } from '#base/commands';
import { useAvatarEditorActions, useAvatarEditorStore } from '#base/context/avatar-editor';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigValue, useTranslation, useWindowActions } from '#base/context/system';
import { useAvatarEffects, useUserActions } from '#base/context/user';
import { EFFECT_SECONDS_PER_DAY, formatEffectTimeLeft, secondsLeftOf, UserAvatarEffect } from '#base/context/user/store/avatarEffectsModel';
import { useClock } from '#base/hooks';
import { ColorLayer, LayoutImage, Template, TemplateBindings, TemplateItem, useTemplate } from '#base/theme';
import { avatarEffectIcon } from '#base/views/shared/avatarEffectIcon';

const GRID_ITEM_TEMPLATE = 'habbo-avatar-editor-com/avatar_editor_effect_griditem_xml';
const REMOVE_ICON = LayoutImage('habbo-window-manager-com/avatar_editor_generic_remove_selection.png');
/** `fillRect(..., 2146080)` over a black bitmap. */
const PROGRESS_COLOR = '#20bf20';
const PROGRESS_BACKGROUND = '#000000';
const HOVER_ALPHA = 0.5;
/** `selectPart(-1)` with no effect worn, and the remove item's pick: no effect. */
const NO_EFFECT = -1;

/** A black bar `width` wide with its first `share` filled - `progress_bar` / `progress_bar_bitmap`. */
const progressBar = (share: number, width: number, height: number) => (
    <>
        <ColorLayer
            color={PROGRESS_BACKGROUND}
            layout={{ position: 'absolute', left: 0, top: 0, width, height }}
        />
        <ColorLayer
            color={PROGRESS_COLOR}
            layout={{ position: 'absolute', left: 0, top: 0, width: Math.trunc(width * share), height }}
        />
    </>
);

const shareOf = (effect: UserAvatarEffect, now: number) => {
    if (effect.isPermanent) return 1;

    return (effect.duration > 0) ? (secondsLeftOf(effect, now) / effect.duration) : 0;
};

/** `progress_bar`'s size in `avatar_editor_effect_griditem`; `progress_bar_bitmap`'s in `effectParamsContainer`. */
const ITEM_BAR = { width: 40, height: 3 };
const PARAM_BAR = { width: 120, height: 16 };

export const useAvatarEditorEffects = (shown: boolean) => {
    const effects = useAvatarEffects();
    const avatarEffectType = useAvatarEditorStore(x => x.avatarEffectType);
    const avatarEffectPicked = useAvatarEditorStore(x => x.avatarEffectPicked);
    const { pickAvatarEffectType, clearAvatarEffectPicked } = useAvatarEditorActions();
    const { setLastWornEffect } = useUserActions();
    const { showWindow } = useWindowActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const template = useTemplate(GRID_ITEM_TEMPLATE);
    const buyPage = useConfigValue<string>('avatareditor.effects.buy.button.catalog.page.name') ?? '';
    const [ hovered, setHovered ] = useState<number | null>(null);
    const selected = effects.find(effect => effect.type === avatarEffectType) ?? null;

    // `onSecondsTimer`: the time left counts down each second while the tab is up.
    const now = useClock('epoch', 1000, shown);

    const item = (from: Template, key: string, type: number, effect: UserAvatarEffect | null): TemplateItem => {
        const isSelected = (effect ? effect.type : NO_EFFECT) === (selected ? selected.type : NO_EFFECT);
        const timed = !!effect && (effect.isPermanent || effect.isActive);

        return {
            key,
            from,
            bindings: {
                '': {
                    onPointerTap: () => pickAvatarEffectType(type),
                    onPointerOver: () => setHovered(type),
                    onPointerOut: () => setHovered(current => ((current === type) ? null : current)),
                },
                '#BG_COLOR': { visible: isSelected || (hovered === type), alpha: isSelected ? 1 : HOVER_ALPHA },
                bitmap: { asset: effect ? avatarEffectIcon(effect.type) : REMOVE_ICON },
                effect_amount_bg1: { visible: (effect?.amountInInventory ?? 1) > 1 },
                effect_amount: { caption: String(effect?.amountInInventory ?? 1) },
                duration_container: { visible: timed },
                progress_bar: timed ? { children: progressBar(shareOf(effect, now), ITEM_BAR.width, ITEM_BAR.height) } : {},
            },
        };
    };

    const thumbs: TemplateItem[] = (template && effects.length) ? [ item(template, 'none', NO_EFFECT, null), ...effects.map(effect => item(template, String(effect.type), effect.type, effect)) ] : [];

    const timeLeftText = (effect: UserAvatarEffect) => {
        if (effect.isPermanent) return t('avatareditor.effects.active.permanent');

        const secondsLeft = secondsLeftOf(effect, now);

        if (secondsLeft > EFFECT_SECONDS_PER_DAY) return t('avatareditor.effects.active.daysleft', '', { days_left: String(Math.floor(secondsLeft / EFFECT_SECONDS_PER_DAY)) });

        return t('avatareditor.effects.active.timeleft', '', { time_left: formatEffectTimeLeft(secondsLeft) });
    };

    const running = !!selected && (selected.isActive || selected.isPermanent);

    // `EffectsParamView.updateView`.
    const paramBindings: TemplateBindings = {
        effectParamsContainer: { visible: shown },
        effect_name: selected ? { visible: true, caption: `\${fx_${selected.type}}` } : { visible: false },
        save_to_activate: { visible: !!selected && !running },
        time_left_bg: { visible: running },
        progress_bar_bitmap: (selected && running) ? { children: progressBar(shareOf(selected, now), PARAM_BAR.width, PARAM_BAR.height) } : {},
        effect_time_left: selected ? { caption: timeLeftText(selected) } : {},
        get_more_button: { onPointerTap: () => showWindow('catalog', buyPage ? { pageName: buyPage } : {}) },
    };

    /** `HabboAvatarEditor.saveCurrentSelection`'s effect part: only when an effect was picked. */
    const save = () => {
        if (!avatarEffectPicked) return;

        if (avatarEffectType === NO_EFFECT) {
            selectAvatarEffect(send, NO_EFFECT);
            setLastWornEffect(NO_EFFECT);
        } else {
            const effect = effects.find(entry => entry.type === avatarEffectType);

            if (effect) {
                if (!effect.isActive) activateAvatarEffect(send, effect.type);

                if (!effect.isInUse) {
                    selectAvatarEffect(send, effect.type);
                    setLastWornEffect(effect.type);
                }
            }
        }

        clearAvatarEffectPicked();
    };

    return { thumbs, hasEffects: thumbs.length > 0, paramBindings, save };
};
