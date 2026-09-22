import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { UserAvatarEffect } from '#base/context/user';
import { Border, Box, Button, CloseButton, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

export interface RoomEffectsViewProps {
    effects: UserAvatarEffect[];
    /** Switching on an effect that is not running yet; it starts counting down. */
    onActivate: (type: number) => void;
    /** Wearing one that is already running, or taking it off again. */
    onToggleWear: (type: number, isInUse: boolean) => void;
    onClose: () => void;
}

/**
 * The effect icons - one per effect type, outside the generated layout folder. `effect-icons` is
 * not in the boot preload, so the first of these to be drawn pulls the bundle in (see
 * `lazyBundleForAsset`); the list is only on screen once the user opens it.
 */
const effectIcon = (type: number) => LayoutImage(`effect-icons/fx_icon_${type}.png`);

/** `EffectView.update`: `effect_hilite` carries `memenu_fx_pause` over the effect being worn, `memenu_fx_play` over one that is only running. */
const FX_PAUSE = LayoutImage('room-ui/memenu_fx_pause.png');
const FX_PLAY = LayoutImage('room-ui/memenu_fx_play.png');

/** `EffectsWidget.LIST_HEIGHT_MAX` / `LIST_HEIGHT_MIN`: `update` grows the list to what it holds, between these. */
const LIST_HEIGHT_MAX = 320;
const LIST_HEIGHT_MIN = 48;
/** Every `memenu_effect_*` row is 154x52. */
const ROW_HEIGHT = 52;
/** `effects_widget` is 85 high around its 48px list. */
const WIDGET_HEIGHT_WITHOUT_LIST = 85 - LIST_HEIGHT_MIN;
/** `loader_bar`'s width in the layout - `EffectView`'s `_maxWidth`. */
const LOADER_BAR_WIDTH = 94;

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
 * The effects the user owns, on the `effects_widget` layout (190x85, the list growing it) that
 * `EffectsWidget.open` builds, one `EffectView` row per effect: `memenu_effect_selected` for the
 * one being worn, `memenu_effect_unselected` for one that is running, `memenu_effect_inactive`
 * (with its activate button) for one that is not switched on yet.
 *
 * An effect is switched on first and worn second - Flash sent `AvatarEffectActivatedComposer`
 * for the first and `AvatarEffectSelectedComposer` for the second, which is why the rows change
 * shape rather than doing both at once.
 *
 * A running row's `effect_hilite` (the 40x40 bitmap over `effect_icon`) holds the play or pause
 * art and is hidden; `EffectView.onMouseEvent` shows it while the pointer is over the row, and
 * only an active effect's row listens for that. `update` rebuilds the row - hilite hidden again -
 * whenever the effect changes, so a hover is kept for the state it began in and a click that
 * starts or stops wearing the effect hides it until the pointer comes back.
 *
 * The time left and its loader bar are drawn from the store's `secondsLeftIfActive`,
 * which is the value the server last sent rather than the clock `EffectView`'s one-second timer
 * reads; a permanent effect shows no time left, as before.
 */
export const RoomEffectsView = ({ effects, onActivate, onToggleWear, onClose }: RoomEffectsViewProps) => {
    const t = useTranslation();
    /** The row the pointer is over, with the state `EffectView.update` last built it in. */
    const [ hovered, setHovered ] = useState<{ type: number; isInUse: boolean; isActive: boolean } | null>(null);
    const listHeight = Math.max(Math.min(effects.length * ROW_HEIGHT, LIST_HEIGHT_MAX), LIST_HEIGHT_MIN);

    const timeLeftText = (effect: UserAvatarEffect) => {
        if (effect.secondsLeftIfActive > SECONDS_PER_DAY) return t('widgets.memenu.effects.active.daysleft', '', { days_left: String(Math.floor(effect.secondsLeftIfActive / SECONDS_PER_DAY)) });

        return t('widgets.memenu.effects.active.timeleft', '', { time_left: formatTimeLeft(effect.secondsLeftIfActive) });
    };

    return (
        <Box layout={{ position: 'absolute', left: 60, bottom: 60, width: 190, height: WIDGET_HEIGHT_WITHOUT_LIST + listHeight }}>
            <Border
                variant="6"
                tintColor="#5b5953"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Border
                    variant="3"
                    tintColor="#292929"
                    layout={{ position: 'absolute', left: 5, width: 157, top: 5, height: 22 }}
                />
                <ThemeText
                    text={t('widget.memenu.effects')}
                    textStyle="u_frame_title"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    name="title"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 3, width: 184, top: 7, height: 17 }}
                />
                <CloseButton
                    variant="3"
                    name="close"
                    onPointerTap={onClose}
                    layout={{ position: 'absolute', left: 165, width: 20, top: 6, height: 20 }}
                />
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 6, width: 178, top: 30, height: listHeight }}
                    contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column' }}
                >
                    {effects.map((effect) => {
                        // `memenu_effect_selected` / `_unselected` answer a click anywhere; `_inactive` only on its button.
                        const running = effect.isInUse || effect.isActive;
                        const hiliteVisible = !!hovered && (hovered.type === effect.type) && (hovered.isInUse === effect.isInUse) && (hovered.isActive === effect.isActive);
                        const barWidth = (effect.isActive && (effect.duration > 0))
                            ? Math.round((effect.secondsLeftIfActive / effect.duration) * LOADER_BAR_WIDTH)
                            : 0;

                        return (
                            <Region
                                key={effect.type}
                                name="selected_border"
                                onPointerTap={running ? () => onToggleWear(effect.type, effect.isInUse) : undefined}
                                cursor={running ? 'pointer' : undefined}
                                onPointerOver={effect.isActive ? () => setHovered({ type: effect.type, isInUse: effect.isInUse, isActive: effect.isActive }) : undefined}
                                onPointerOut={effect.isActive ? () => setHovered(current => ((current?.type === effect.type) ? null : current)) : undefined}
                                layout={{ position: 'relative', width: 154, height: ROW_HEIGHT, flexShrink: 0, overflow: running ? undefined : 'hidden' }}
                            >
                                <Border
                                    variant="2"
                                    tintColor={running ? (effect.isInUse ? '#cccccc' : '#666666') : undefined}
                                    blend={running ? undefined : 0}
                                    layout={{ position: 'absolute', left: 0, width: running ? 154 : 175, top: 0, height: 48, overflow: 'hidden' }}
                                >
                                    <ThemeImage
                                        name="effect_icon"
                                        src={effectIcon(effect.type)}
                                        bitmap={{}}
                                        layout={{ position: 'absolute', left: 4, width: 40, top: 4, height: 40 }}
                                    />
                                    {running && hiliteVisible && (
                                        <ThemeImage
                                            name="effect_hilite"
                                            src={effect.isInUse ? FX_PAUSE : FX_PLAY}
                                            bitmap={{}}
                                            layout={{ position: 'absolute', left: 4, width: 40, top: 4, height: 40 }}
                                        />
                                    )}
                                    {running && (
                                        <Region
                                            name="loader_border"
                                            backgroundColor="#ffffff"
                                            layout={{ position: 'absolute', left: 50, width: 98, top: 20, height: 22 }}
                                        >
                                            <Region
                                                name="loader_bg"
                                                backgroundColor="#3d3d3d"
                                                layout={{ position: 'absolute', left: 1, width: 96, top: 1, height: 20 }}
                                            >
                                                {(barWidth > 0) && (
                                                    <Region
                                                        name="loader_bar"
                                                        backgroundColor={effect.isInUse ? '#339933' : '#666666'}
                                                        layout={{ position: 'absolute', left: 1, width: barWidth, top: 1, height: 18, overflow: 'hidden' }}
                                                    >
                                                        <Region
                                                            name="loader_highlight"
                                                            backgroundColor={effect.isInUse ? '#66cc66' : '#999999'}
                                                            layout={{ position: 'absolute', left: 0, width: LOADER_BAR_WIDTH, top: 0, height: 2 }}
                                                        />
                                                    </Region>
                                                )}
                                            </Region>
                                        </Region>
                                    )}
                                    {running && !effect.isPermanent && (
                                        <Region
                                            name="time_left"
                                            alpha={0.8}
                                            layout={{ position: 'absolute', left: 52, width: 98, top: 24, height: 13, minWidth: 98, maxWidth: 98, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
                                        >
                                            <ThemeText
                                                text={timeLeftText(effect)}
                                                textOptions={effect.isInUse ? { fill: '#ffffff', align: 'center' } : { align: 'center' }}
                                                verticalAlign="top"
                                            />
                                        </Region>
                                    )}
                                    <ThemeText
                                        text={t(`fx_${effect.type}`)}
                                        textOptions={effect.isInUse ? { fontFamily: 'VolterBold' } : { fill: '#ffffff', fontFamily: 'VolterBold' }}
                                        name="effect_name"
                                        verticalAlign="top"
                                        layout={{ position: 'absolute', left: 50, width: 163, top: 6, height: 13 }}
                                    />
                                    {!running && (
                                        <Button
                                            variant="1"
                                            name="activate_effect"
                                            onPointerTap={() => onActivate(effect.type)}
                                            layout={{ position: 'absolute', left: 50, width: 98, top: 20, height: 22 }}
                                        >
                                            {t('widgets.memenu.effects.activate')}
                                        </Button>
                                    )}
                                    {/* `EffectView.update` hides the count while there is only the one. */}
                                    {(effect.inactiveEffectsInInventory >= 2) && (
                                        <Region
                                            name="effect_amount_bg1"
                                            backgroundColor="#dddddd"
                                            layout={{ position: 'absolute', left: 24, width: 20, top: 4, height: 15 }}
                                        >
                                            <Region
                                                name="effect_amount_bg2"
                                                backgroundColor="#666666"
                                                layout={{ position: 'absolute', left: 1, width: 18, top: 1, height: 13, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                            >
                                                <ThemeText
                                                    text={String(effect.inactiveEffectsInInventory)}
                                                    textOptions={{ fill: '#eeeeee' }}
                                                    clip
                                                    name="effect_amount"
                                                    verticalAlign="top"
                                                />
                                            </Region>
                                        </Region>
                                    )}
                                </Border>
                            </Region>
                        );
                    })}
                </ScrollArea>
                {!effects.length && (
                    <Region
                        name="no_effects"
                        layout={{ position: 'absolute', left: 0, width: 190, top: 30, height: 48 }}
                    >
                        <ThemeText
                            text={t('widget.memenu.effects.info')}
                            textOptions={{ fill: '#ffffff', fontFamily: 'Ubuntu', fontSize: 12, align: 'center' }}
                            flashFormat={{ italic: true, antiAliasType: 'advanced' }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, width: 190, top: 15, height: 17 }}
                        />
                    </Region>
                )}
            </Border>
        </Box>
    );
};
