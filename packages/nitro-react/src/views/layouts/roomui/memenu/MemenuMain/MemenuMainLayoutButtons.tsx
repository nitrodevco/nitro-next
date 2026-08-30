import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

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
    tintClothesIcon?: string;
    tintCreditsIcon?: string;
    tintDanceIcon?: string;
    tintEffectsIcon?: string;
    tintHcIcon?: string;
    tintMinimailIcon?: string;
    tintRoomsIcon?: string;
    tintSettingsIcon?: string;
    tintWaveIcon?: string;
}

export const MemenuMainLayoutButtons = ({ captionClothesText, captionCreditsText, captionDanceText, captionEffectsText, captionHcText, captionMinimailText, captionRoomsText, captionSettingsText, captionWaveText, layout, onButtons, onClothes, onCredits, onDance, onEffects, onHc, onMinimail, onRooms, onSettings, onWave, srcClothesIcon, srcCreditsIcon, srcDanceIcon, srcEffectsIcon, srcHcIcon, srcMinimailIcon, srcRoomsIcon, srcSettingsIcon, srcWaveIcon, tintClothesIcon, tintCreditsIcon, tintDanceIcon, tintEffectsIcon, tintHcIcon, tintMinimailIcon, tintRoomsIcon, tintSettingsIcon, tintWaveIcon }: MemenuMainLayoutButtonsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="buttons"
            onPointerTap={onButtons}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
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
                    tint={tintHcIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <ThemeText
                    text={captionHcText ?? t('widget.memenu.hc')}
                    textOptions={{ fill: '#ffffff' }}
                    name="hc_text"
                    layout={{ position: 'absolute', marginLeft: 7.5, marginRight: -7.5, width: 94, top: 61, height: 13 }}
                />
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
                    tint={tintRoomsIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <ThemeText
                    text={captionRoomsText ?? t('widget.memenu.myrooms')}
                    textOptions={{ fill: '#ffffff' }}
                    name="rooms_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70 }}
                />
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
                    tint={tintClothesIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <ThemeText
                    text={captionClothesText ?? t('widget.memenu.myclothes')}
                    textOptions={{ fill: '#ffffff' }}
                    name="clothes_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70 }}
                />
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
                    tint={tintEffectsIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <ThemeText
                    text={captionEffectsText ?? t('widget.memenu.effects')}
                    textOptions={{ fill: '#ffffff' }}
                    name="effects_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70 }}
                />
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
                    tint={tintDanceIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <ThemeText
                    text={captionDanceText ?? t('widget.memenu.dance')}
                    textOptions={{ fill: '#ffffff' }}
                    name="dance_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70 }}
                />
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
                    tint={tintWaveIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <ThemeText
                    text={captionWaveText ?? t('widget.memenu.wave')}
                    textOptions={{ fill: '#ffffff' }}
                    name="wave_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70 }}
                />
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
                    tint={tintSettingsIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <ThemeText
                    text={captionSettingsText ?? t('widget.memenu.settings')}
                    textOptions={{ fill: '#ffffff' }}
                    name="settings_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70 }}
                />
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
                    tint={tintCreditsIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <ThemeText
                    text={captionCreditsText ?? t('widget.memenu.credits')}
                    textOptions={{ fill: '#ffffff' }}
                    name="credits_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70 }}
                />
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
                    tint={tintMinimailIcon}
                    layout={{ position: 'absolute', left: 5, width: 70, top: 5, height: 55 }}
                />
                <ThemeText
                    text={captionMinimailText ?? t('widget.memenu.minimail')}
                    textOptions={{ fill: '#ffffff' }}
                    name="minimail_text"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 70, top: 61, height: 13, maxWidth: 70 }}
                />
            </Region>
        </Region>
    );
};
