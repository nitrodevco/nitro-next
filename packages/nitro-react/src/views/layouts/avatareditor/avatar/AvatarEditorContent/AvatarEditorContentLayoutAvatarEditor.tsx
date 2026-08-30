import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { AvatarEditorContentLayoutTabbedView, AvatarEditorContentLayoutTabbedViewProps } from './AvatarEditorContentLayoutTabbedView';

/** Named region `avatarEditor` of AvatarEditorContentLayout - configured through the parent's `avatarEditor` prop. */
export interface AvatarEditorContentLayoutAvatarEditorProps {
    avatarWidget?: ReactNode;
    captionAvatarInfoText?: string;
    captionEffectName?: string;
    captionEffectTimeLeft?: string;
    captionSaveToActivate?: string;
    collectibleAvatarInfoBackground?: ReactNode;
    layout?: BoxLayout;
    onGetMoreButton?: () => void;
    onRotateAvatar?: () => void;
    onSave?: () => void;
    srcProgressBarBitmap?: string;
    tabbedView?: AvatarEditorContentLayoutTabbedViewProps;
    tintProgressBarBitmap?: string;
    visibleCollectibleAvatarInfo?: boolean;
}

export const AvatarEditorContentLayoutAvatarEditor = ({ avatarWidget, captionAvatarInfoText, captionEffectName, captionEffectTimeLeft, captionSaveToActivate, collectibleAvatarInfoBackground, layout, onGetMoreButton, onRotateAvatar, onSave, srcProgressBarBitmap, tabbedView, tintProgressBarBitmap, visibleCollectibleAvatarInfo }: AvatarEditorContentLayoutAvatarEditorProps) => {
    const t = useTranslation();

    return (
        <Region
            name="avatarEditor"
            layout={{ position: 'absolute', left: 1, right: 0, bottom: 6, height: 414, justifyContent: 'center', ...layout }}
        >
            <AvatarEditorContentLayoutTabbedView {...tabbedView} />
            <WidgetSlot
                widgetType="room_previewer"
                name="avatarWidget"
                options={{ 'room_previewer:offsetx': '-65', 'room_previewer:offsety': '-30', 'room_previewer:zoom': '2' }}
                layout={{ position: 'absolute', left: 351, width: 125, top: 88, height: 210 }}
            >
                {avatarWidget}
            </WidgetSlot>
            <ButtonThick
                variant="3"
                name="save"
                onPointerTap={onSave}
                textStyle="text-style-button-shiny-bold"
                layout={{ position: 'absolute', marginLeft: 172.5, marginRight: -172.5, width: 122, top: 373, height: 28, minWidth: 100 }}
            >
                {t('avatareditor.save')}
            </ButtonThick>
            <Region
                name="effectParamsContainer"
                layout={{ position: 'absolute', left: 11, right: 10, top: 46, height: 352 }}
            >
                <ThemeText
                    text={captionEffectName ?? 'xxx'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#666666', wordWrap: true, wordWrapWidth: 120, align: 'center' }}
                    name="effect_name"
                    verticalAlign="top"
                    layout={{ position: 'absolute', right: 9, width: 120, top: 284, height: 17 }}
                />
                <Region
                    name="time_left_bg"
                    layout={{ position: 'absolute', right: 3, width: 120, top: 301, height: 18 }}
                >
                    <ThemeImage
                        name="progress_bar_bitmap"
                        src={srcProgressBarBitmap}
                        tint={tintProgressBarBitmap}
                        layout={{ position: 'absolute', left: 1, width: 120, top: 1, height: 16 }}
                    />
                    <ThemeText
                        text={captionEffectTimeLeft ?? '00:00 left'}
                        textOptions={{ fill: '#666666', align: 'center' }}
                        name="effect_time_left"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 1 }}
                    />
                </Region>
                <ThemeText
                    text={captionSaveToActivate ?? t('avatareditor.save.to.activate')}
                    textOptions={{ fill: '#666666', wordWrap: true, wordWrapWidth: 300, align: 'center' }}
                    name="save_to_activate"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 9, width: 300, bottom: 8, height: 17 }}
                />
                <ButtonThick
                    variant="6"
                    name="get_more_button"
                    tintColor="#00aa00"
                    onPointerTap={onGetMoreButton}
                    textStyle="text-style-button-shiny-bold"
                    layout={{ position: 'absolute', right: 6, width: 115, top: 6, height: 28, maxWidth: 115 }}
                >
                    {t('avatareditor.effects.shop')}
                </ButtonThick>
            </Region>
            {(visibleCollectibleAvatarInfo ?? false) && (
                <Region
                    name="collectible_avatar_info"
                    backgroundColor="#454545"
                    layout={{ position: 'absolute', right: 11, width: 122, top: 345, height: 20 }}
                >
                    <Region
                        name="collectible_avatar_info_background"
                        backgroundColor="#454545"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                    >
                        {collectibleAvatarInfoBackground}
                    </Region>
                    <ThemeText
                        text={captionAvatarInfoText ?? 'Habbo Avatar'}
                        textOptions={{ fill: '#ff8823', align: 'center' }}
                        name="avatar_info_text"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 3, bottom: -3, minHeight: 20 }}
                    />
                </Region>
            )}
            <Region
                name="rotate_avatar"
                onPointerTap={onRotateAvatar}
                cursor="pointer"
                layout={{ position: 'absolute', left: 389, width: 50, top: 295, height: 31 }}
            >
                <ThemeImage
                    src={layoutImage('avatar_editor_rotate_avatar_button.png')}
                    layout={{ position: 'absolute', left: 0, width: 44, top: 0, height: 29 }}
                />
            </Region>
        </Region>
    );
};
