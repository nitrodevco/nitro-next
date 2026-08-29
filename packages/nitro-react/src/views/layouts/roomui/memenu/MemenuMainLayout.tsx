import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1103_memenu_main_xml` (layout "memenu_main", 245x249) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuMainLayoutProps {
    buttons?: MemenuMainLayoutButtonsProps;
    layout?: BoxLayout;
}

export const MemenuMainLayout = ({ buttons, layout }: MemenuMainLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 245, height: 249, ...layout }}>
            <MemenuMainLayoutButtons {...buttons} />
        </Region>
    );
};

/** Named region `buttons` of MemenuMainLayout - configured through the parent's `buttons` prop. */
export interface MemenuMainLayoutButtonsProps {
    captionClothesText?: string;
    captionCreditsText?: string;
    captionDanceText?: string;
    captionEffectsText?: string;
    captionHcText?: string;
    captionMinimailText?: string;
    captionRoomsText?: string;
    captionSettingsText?: string;
    captionWaveText?: string;
    layout?: BoxLayout;
    onButtons?: () => void;
    onClothes?: () => void;
    onCredits?: () => void;
    onDance?: () => void;
    onEffects?: () => void;
    onHc?: () => void;
    onMinimail?: () => void;
    onRooms?: () => void;
    onSettings?: () => void;
    onWave?: () => void;
    srcClothesIcon?: string;
    srcCreditsIcon?: string;
    srcDanceIcon?: string;
    srcEffectsIcon?: string;
    srcHcIcon?: string;
    srcMinimailIcon?: string;
    srcRoomsIcon?: string;
    srcSettingsIcon?: string;
    srcWaveIcon?: string;
}

export const MemenuMainLayoutButtons = ({ captionClothesText, captionCreditsText, captionDanceText, captionEffectsText, captionHcText, captionMinimailText, captionRoomsText, captionSettingsText, captionWaveText, layout, onButtons, onClothes, onCredits, onDance, onEffects, onHc, onMinimail, onRooms, onSettings, onWave, srcClothesIcon, srcCreditsIcon, srcDanceIcon, srcEffectsIcon, srcHcIcon, srcMinimailIcon, srcRoomsIcon, srcSettingsIcon, srcWaveIcon }: MemenuMainLayoutButtonsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="buttons"
            onPointerTap={onButtons}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 245, top: 0, height: 249, ...layout }}
        >
            <Region
                name="hc"
                onPointerTap={onHc}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 79, top: 0, height: 79, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="hc_icon"
                    src={srcHcIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <Region
                    name="hc_text"
                    layout={{ position: 'absolute', marginLeft: 7.5, marginRight: -7.5, width: 94, top: 61, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionHcText ?? t('widget.memenu.hc')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                name="rooms"
                onPointerTap={onRooms}
                cursor="pointer"
                layout={{ position: 'absolute', left: 83, width: 79, top: 83, height: 79, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="rooms_icon"
                    src={srcRoomsIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <Region
                    name="rooms_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRoomsText ?? t('widget.memenu.myrooms')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                name="clothes"
                onPointerTap={onClothes}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 79, top: 83, height: 79, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="clothes_icon"
                    src={srcClothesIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <Region
                    name="clothes_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionClothesText ?? t('widget.memenu.myclothes')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                name="effects"
                onPointerTap={onEffects}
                cursor="pointer"
                layout={{ position: 'absolute', left: 166, width: 79, top: 83, height: 79, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="effects_icon"
                    src={srcEffectsIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <Region
                    name="effects_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionEffectsText ?? t('widget.memenu.effects')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                name="dance"
                onPointerTap={onDance}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 79, top: 165, height: 79, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="dance_icon"
                    src={srcDanceIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <Region
                    name="dance_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDanceText ?? t('widget.memenu.dance')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                name="wave"
                onPointerTap={onWave}
                cursor="pointer"
                layout={{ position: 'absolute', left: 83, width: 79, top: 165, height: 79, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="wave_icon"
                    src={srcWaveIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <Region
                    name="wave_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionWaveText ?? t('widget.memenu.wave')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                name="settings"
                onPointerTap={onSettings}
                cursor="pointer"
                layout={{ position: 'absolute', left: 166, width: 79, top: 165, height: 79, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="settings_icon"
                    src={srcSettingsIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <Region
                    name="settings_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionSettingsText ?? t('widget.memenu.settings')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                name="credits"
                onPointerTap={onCredits}
                cursor="pointer"
                layout={{ position: 'absolute', left: 83, width: 79, top: 1, height: 79, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="credits_icon"
                    src={srcCreditsIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <Region
                    name="credits_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCreditsText ?? t('widget.memenu.credits')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
            <Region
                name="minimail"
                onPointerTap={onMinimail}
                cursor="pointer"
                layout={{ position: 'absolute', left: 166, width: 79, top: 1, height: 79, justifyContent: 'center' }}
            >
                <ThemeImage
                    name="minimail_icon"
                    src={srcMinimailIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <Region
                    name="minimail_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMinimailText ?? t('widget.memenu.minimail')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
