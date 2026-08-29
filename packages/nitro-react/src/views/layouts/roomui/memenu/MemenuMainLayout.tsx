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

/** Named region `hc` of MemenuMainLayout - configured through the parent's `hc` prop. */
export interface MemenuMainLayoutHcProps {
    captionHcText?: string;
    layout?: BoxLayout;
    onHc?: () => void;
    srcHcIcon?: string;
    tags?: string[];
}

export const MemenuMainLayoutHc = ({ captionHcText, layout, onHc, srcHcIcon, tags }: MemenuMainLayoutHcProps) => {
    const t = useTranslation();

    return (
        <Region
            name="hc"
            tags={tags}
            onPointerTap={onHc}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 79, top: 0, height: 79, justifyContent: 'center', ...layout }}
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
    );
};

/** Named region `rooms` of MemenuMainLayout - configured through the parent's `rooms` prop. */
export interface MemenuMainLayoutRoomsProps {
    captionRoomsText?: string;
    layout?: BoxLayout;
    onRooms?: () => void;
    srcRoomsIcon?: string;
    tags?: string[];
}

export const MemenuMainLayoutRooms = ({ captionRoomsText, layout, onRooms, srcRoomsIcon, tags }: MemenuMainLayoutRoomsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="rooms"
            tags={tags}
            onPointerTap={onRooms}
            cursor="pointer"
            layout={{ position: 'absolute', left: 83, width: 79, top: 83, height: 79, justifyContent: 'center', ...layout }}
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
    );
};

/** Named region `clothes` of MemenuMainLayout - configured through the parent's `clothes` prop. */
export interface MemenuMainLayoutClothesProps {
    captionClothesText?: string;
    layout?: BoxLayout;
    onClothes?: () => void;
    srcClothesIcon?: string;
    tags?: string[];
}

export const MemenuMainLayoutClothes = ({ captionClothesText, layout, onClothes, srcClothesIcon, tags }: MemenuMainLayoutClothesProps) => {
    const t = useTranslation();

    return (
        <Region
            name="clothes"
            tags={tags}
            onPointerTap={onClothes}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 79, top: 83, height: 79, justifyContent: 'center', ...layout }}
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
    );
};

/** Named region `effects` of MemenuMainLayout - configured through the parent's `effects` prop. */
export interface MemenuMainLayoutEffectsProps {
    captionEffectsText?: string;
    layout?: BoxLayout;
    onEffects?: () => void;
    srcEffectsIcon?: string;
    tags?: string[];
}

export const MemenuMainLayoutEffects = ({ captionEffectsText, layout, onEffects, srcEffectsIcon, tags }: MemenuMainLayoutEffectsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="effects"
            tags={tags}
            onPointerTap={onEffects}
            cursor="pointer"
            layout={{ position: 'absolute', left: 166, width: 79, top: 83, height: 79, justifyContent: 'center', ...layout }}
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
    );
};

/** Named region `dance` of MemenuMainLayout - configured through the parent's `dance` prop. */
export interface MemenuMainLayoutDanceProps {
    captionDanceText?: string;
    layout?: BoxLayout;
    onDance?: () => void;
    srcDanceIcon?: string;
    tags?: string[];
}

export const MemenuMainLayoutDance = ({ captionDanceText, layout, onDance, srcDanceIcon, tags }: MemenuMainLayoutDanceProps) => {
    const t = useTranslation();

    return (
        <Region
            name="dance"
            tags={tags}
            onPointerTap={onDance}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 79, top: 165, height: 79, justifyContent: 'center', ...layout }}
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
    );
};

/** Named region `wave` of MemenuMainLayout - configured through the parent's `wave` prop. */
export interface MemenuMainLayoutWaveProps {
    captionWaveText?: string;
    layout?: BoxLayout;
    onWave?: () => void;
    srcWaveIcon?: string;
    tags?: string[];
}

export const MemenuMainLayoutWave = ({ captionWaveText, layout, onWave, srcWaveIcon, tags }: MemenuMainLayoutWaveProps) => {
    const t = useTranslation();

    return (
        <Region
            name="wave"
            tags={tags}
            onPointerTap={onWave}
            cursor="pointer"
            layout={{ position: 'absolute', left: 83, width: 79, top: 165, height: 79, justifyContent: 'center', ...layout }}
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
    );
};

/** Named region `settings` of MemenuMainLayout - configured through the parent's `settings` prop. */
export interface MemenuMainLayoutSettingsProps {
    captionSettingsText?: string;
    layout?: BoxLayout;
    onSettings?: () => void;
    srcSettingsIcon?: string;
    tags?: string[];
}

export const MemenuMainLayoutSettings = ({ captionSettingsText, layout, onSettings, srcSettingsIcon, tags }: MemenuMainLayoutSettingsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="settings"
            tags={tags}
            onPointerTap={onSettings}
            cursor="pointer"
            layout={{ position: 'absolute', left: 166, width: 79, top: 165, height: 79, justifyContent: 'center', ...layout }}
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
    );
};

/** Named region `credits` of MemenuMainLayout - configured through the parent's `credits` prop. */
export interface MemenuMainLayoutCreditsProps {
    captionCreditsText?: string;
    layout?: BoxLayout;
    onCredits?: () => void;
    srcCreditsIcon?: string;
    tags?: string[];
}

export const MemenuMainLayoutCredits = ({ captionCreditsText, layout, onCredits, srcCreditsIcon, tags }: MemenuMainLayoutCreditsProps) => {
    const t = useTranslation();

    return (
        <Region
            name="credits"
            tags={tags}
            onPointerTap={onCredits}
            cursor="pointer"
            layout={{ position: 'absolute', left: 83, width: 79, top: 1, height: 79, justifyContent: 'center', ...layout }}
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
    );
};

/** Named region `minimail` of MemenuMainLayout - configured through the parent's `minimail` prop. */
export interface MemenuMainLayoutMinimailProps {
    captionMinimailText?: string;
    layout?: BoxLayout;
    onMinimail?: () => void;
    srcMinimailIcon?: string;
    tags?: string[];
}

export const MemenuMainLayoutMinimail = ({ captionMinimailText, layout, onMinimail, srcMinimailIcon, tags }: MemenuMainLayoutMinimailProps) => {
    const t = useTranslation();

    return (
        <Region
            name="minimail"
            tags={tags}
            onPointerTap={onMinimail}
            cursor="pointer"
            layout={{ position: 'absolute', left: 166, width: 79, top: 1, height: 79, justifyContent: 'center', ...layout }}
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
    );
};

/** Named region `buttons` of MemenuMainLayout - configured through the parent's `buttons` prop. */
export interface MemenuMainLayoutButtonsProps {
    clothes?: MemenuMainLayoutClothesProps;
    credits?: MemenuMainLayoutCreditsProps;
    dance?: MemenuMainLayoutDanceProps;
    effects?: MemenuMainLayoutEffectsProps;
    hc?: MemenuMainLayoutHcProps;
    layout?: BoxLayout;
    minimail?: MemenuMainLayoutMinimailProps;
    onButtons?: () => void;
    rooms?: MemenuMainLayoutRoomsProps;
    settings?: MemenuMainLayoutSettingsProps;
    tags?: string[];
    wave?: MemenuMainLayoutWaveProps;
}

export const MemenuMainLayoutButtons = ({ clothes, credits, dance, effects, hc, layout, minimail, onButtons, rooms, settings, tags, wave }: MemenuMainLayoutButtonsProps) => {
    return (
        <Region
            name="buttons"
            tags={tags}
            onPointerTap={onButtons}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 245, top: 0, height: 249, ...layout }}
        >
            <MemenuMainLayoutHc {...hc} />
            <MemenuMainLayoutRooms {...rooms} />
            <MemenuMainLayoutClothes {...clothes} />
            <MemenuMainLayoutEffects {...effects} />
            <MemenuMainLayoutDance {...dance} />
            <MemenuMainLayoutWave {...wave} />
            <MemenuMainLayoutSettings {...settings} />
            <MemenuMainLayoutCredits {...credits} />
            <MemenuMainLayoutMinimail {...minimail} />
        </Region>
    );
};
