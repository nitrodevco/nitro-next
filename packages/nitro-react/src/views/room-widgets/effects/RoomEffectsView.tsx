import { useTranslation } from '#base/context/system';
import { UserAvatarEffect } from '#base/context/user';
import { Border, Box, CloseButton, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';

export interface RoomEffectsViewProps {
    effects: UserAvatarEffect[];
    /** Switching on an effect that is not running yet; it starts counting down. */
    onActivate: (type: number) => void;
    /** Wearing one that is already running, or taking it off again. */
    onToggleWear: (type: number, isInUse: boolean) => void;
    onClose: () => void;
}

/** Where the effect icons live - one per effect type, outside the generated layout folder. */
const effectIcon = (type: number) => `./assets/images/effects/fx_icon_${type}.png`;

/** `EffectsWidget.update` grew the list to what it held, between these. */
const MIN_LIST_HEIGHT = 48;
const MAX_LIST_HEIGHT = 320;
const ROW_HEIGHT = 52;

const SECONDS_PER_MINUTE = 60;

const timeLeft = (seconds: number) => {
    const minutes = Math.floor(seconds / SECONDS_PER_MINUTE);

    return `${minutes}:${String(seconds % SECONDS_PER_MINUTE).padStart(2, '0')}`;
};

/**
 * The effects the user owns, on the `effects_widget` layout (190 wide): each with how many are
 * left, how long the running one has, and whether it is the one being worn.
 *
 * An effect is switched on first and worn second - Flash sent `AvatarEffectActivatedComposer`
 * for the first and `AvatarEffectSelectedComposer` for the second, which is why the rows change
 * shape rather than doing both at once.
 */
export const RoomEffectsView = ({ effects, onActivate, onToggleWear, onClose }: RoomEffectsViewProps) => {
    const t = useTranslation();
    const listHeight = Math.min(MAX_LIST_HEIGHT, Math.max(MIN_LIST_HEIGHT, effects.length * ROW_HEIGHT));

    return (
        <Box layout={{ position: 'absolute', left: 60, bottom: 60, width: 190, height: listHeight + 37 }}>
            <Border
                variant="6"
                tintColor="#5b5953"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Border
                    variant="3"
                    tintColor="#292929"
                    backgroundColor="#292929"
                    layout={{ position: 'absolute', left: 5, width: 157, top: 5, height: 22 }}
                />
                <ThemeText
                    text={t('widget.memenu.effects')}
                    textStyle="text-style-u-frame-title"
                    textOptions={{ fill: '#ffffff', align: 'center' }}
                    name="title"
                    layout={{ position: 'absolute', left: 3, right: 3, top: 7, height: 17 }}
                />
                <CloseButton
                    variant="3"
                    name="close"
                    onPointerTap={onClose}
                    layout={{ position: 'absolute', right: 5, width: 20, top: 6, height: 20 }}
                />
                {effects.length
                    ? (
                            <ScrollArea
                                orientation="vertical"
                                layout={{ position: 'absolute', left: 6, right: 6, top: 30, height: listHeight }}
                                contentLayout={{ position: 'relative', width: '100%', flexDirection: 'column' }}
                            >
                                {effects.map(effect => (
                                    <Region
                                        key={effect.type}
                                        onPointerTap={() => (effect.isActive ? onToggleWear(effect.type, effect.isInUse) : onActivate(effect.type))}
                                        cursor="pointer"
                                        layout={{ width: '100%', height: ROW_HEIGHT, flexShrink: 0 }}
                                    >
                                        <Border
                                            variant="2"
                                            tintColor={effect.isInUse ? '#cccccc' : '#666666'}
                                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 4 }}
                                        >
                                            <ThemeImage
                                                name="effect_icon"
                                                src={effectIcon(effect.type)}
                                                layout={{ position: 'absolute', left: 4, width: 40, top: 4, height: 40 }}
                                            />
                                            <ThemeText
                                                text={t(`fx_${effect.type}`, `Effect ${effect.type}`)}
                                                name="effect_name"
                                                textOptions={{ fill: '#ffffff' }}
                                                layout={{ position: 'absolute', left: 50, right: 4, top: 6, height: 13 }}
                                            />
                                            {/* Only worth showing a count when there is more than the one. */}
                                            {effect.inactiveEffectsInInventory > 1 && (
                                                <Region
                                                    name="effect_amount_bg1"
                                                    backgroundColor="#666666"
                                                    layout={{ position: 'absolute', left: 24, width: 20, top: 4, height: 15, alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    <ThemeText
                                                        text={String(effect.inactiveEffectsInInventory)}
                                                        textOptions={{ fill: '#eeeeee' }}
                                                    />
                                                </Region>
                                            )}
                                            {effect.isActive && !effect.isPermanent && (
                                                <ThemeText
                                                    text={timeLeft(effect.secondsLeftIfActive)}
                                                    name="time_left"
                                                    textOptions={{ fill: '#ffffff', align: 'center' }}
                                                    layout={{ position: 'absolute', right: 4, width: 98, bottom: 8, height: 13 }}
                                                />
                                            )}
                                            {!effect.isActive && (
                                                <ThemeText
                                                    text={t('widget.memenu.effects.activate', 'Activate')}
                                                    textOptions={{ fill: '#bbbbbb', align: 'center' }}
                                                    layout={{ position: 'absolute', right: 4, width: 98, bottom: 8, height: 13 }}
                                                />
                                            )}
                                        </Border>
                                    </Region>
                                ))}
                            </ScrollArea>
                        )
                    : (
                            <Region
                                name="no_effects"
                                layout={{ position: 'absolute', left: 0, right: 0, top: 30, height: MIN_LIST_HEIGHT, justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('widget.memenu.effects.info')}
                                    textOptions={{ fill: '#ffffff', align: 'center', wordWrap: true, wordWrapWidth: 170 }}
                                    layout={{ position: 'absolute', left: 10, right: 10, alignSelf: 'center', height: 34 }}
                                />
                            </Region>
                        )}
            </Border>
        </Box>
    );
};
