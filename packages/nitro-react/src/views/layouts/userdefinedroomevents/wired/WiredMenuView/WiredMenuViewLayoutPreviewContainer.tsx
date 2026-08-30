import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CheckBox, ContainerButton, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `preview_container` of WiredMenuViewLayout - configured through the parent's `previewContainer` prop. */
export interface WiredMenuViewLayoutPreviewContainerProps {
    captionPreviewInstructionFurni?: string;
    captionPreviewInstructionUser?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    onHighlightWiredBtn?: () => void;
    onPinCheckbox?: () => void;
    previewAvatar?: ReactNode;
    previewPet?: ReactNode;
    srcGlobalPlaceholder?: string;
    srcPreviewImageBitmap?: string;
    tintPreviewImageBitmap?: string;
    visibleGlobalPlaceholder?: boolean;
    visiblePreviewAvatar?: boolean;
    visiblePreviewImageBitmap?: boolean;
    visiblePreviewInstructionFurni?: boolean;
    visiblePreviewInstructionUser?: boolean;
    visiblePreviewPet?: boolean;
}

export const WiredMenuViewLayoutPreviewContainer = ({ captionPreviewInstructionFurni, captionPreviewInstructionUser, captionTitle, layout, onHighlightWiredBtn, onPinCheckbox, previewAvatar, previewPet, srcGlobalPlaceholder, srcPreviewImageBitmap, tintPreviewImageBitmap, visibleGlobalPlaceholder, visiblePreviewAvatar, visiblePreviewImageBitmap, visiblePreviewInstructionFurni, visiblePreviewInstructionUser, visiblePreviewPet }: WiredMenuViewLayoutPreviewContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
            layout={{ position: 'absolute', left: 14, width: 150, top: 94, height: 274, ...layout }}
        >
            <ThemeText
                text={captionTitle ?? t('wiredmenu.inspection.preview')}
                name="title"
                layout={{ position: 'absolute', left: 0, width: 165, top: 0, height: 19 }}
            />
            <Border
                variant="3"
                name="preview_border"
                tintColor="#dadada"
                layout={{ position: 'absolute', left: 0, right: 9, top: 20, height: 225, justifyContent: 'center' }}
            >
                {(visiblePreviewInstructionFurni ?? false) && (
                    <Region
                        name="preview_instruction_furni"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 104, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionPreviewInstructionFurni ?? t('wiredmenu.inspection.preview_furni_instruction')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                )}
                {(visiblePreviewInstructionUser ?? false) && (
                    <Region
                        name="preview_instruction_user"
                        layout={{ position: 'absolute', left: 0, right: 0, top: 104, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <ThemeText
                            text={captionPreviewInstructionUser ?? t('wiredmenu.inspection.preview_user_instruction')}
                            textOptions={{ align: 'center' }}
                        />
                    </Region>
                )}
                {(visiblePreviewAvatar ?? false) && (
                    <WidgetSlot
                        widgetType="avatar_image"
                        name="preview_avatar"
                        options={{ 'avatar_image:cropped': 'true' }}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 34, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 84 }}
                    >
                        {previewAvatar}
                    </WidgetSlot>
                )}
                {(visiblePreviewPet ?? false) && (
                    <WidgetSlot
                        widgetType="pet_image"
                        name="preview_pet"
                        layout={{ position: 'absolute', left: 46, right: 46, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 38, overflow: 'hidden' }}
                    >
                        {previewPet}
                    </WidgetSlot>
                )}
                {(visiblePreviewImageBitmap ?? false) && (
                    <ThemeImage
                        name="preview_image_bitmap"
                        src={srcPreviewImageBitmap}
                        tint={tintPreviewImageBitmap}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 50, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 50 }}
                    />
                )}
                {(visibleGlobalPlaceholder ?? false) && (
                    <ThemeImage
                        name="global_placeholder"
                        src={srcGlobalPlaceholder ?? layoutImage('wired_global_placeholder.png')}
                        layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 120, top: 64, height: 97 }}
                    />
                )}
                <ContainerButton
                    variant="7"
                    name="highlight_wired_btn"
                    tooltip={t('wiredmenu.inspection.highlight_wireds')}
                    onPointerTap={onHighlightWiredBtn}
                    layout={{ position: 'absolute', right: 6, width: 25, top: 6, height: 26 }}
                >
                    <ThemeImage
                        src="${image.library.url}catalogue/icon_80.png"
                        layout={{ position: 'absolute', left: 4, width: 16, top: 6, height: 14 }}
                    />
                </ContainerButton>
            </Border>
            <Region
                name="pin_option_container"
                layout={{ position: 'absolute', left: 0, width: 197, top: 254, height: 18 }}
            >
                <CheckBox
                    variant="3"
                    name="pin_checkbox"
                    onPointerTap={onPinCheckbox}
                    layout={{ position: 'absolute', left: 0, width: 17, top: 1, height: 17 }}
                />
                <ThemeText
                    text={t('wiredmenu.inspection.pin')}
                    layout={{ position: 'absolute', left: 20, width: 82, top: 0, height: 17, minHeight: 17 }}
                />
            </Region>
        </Region>
    );
};
