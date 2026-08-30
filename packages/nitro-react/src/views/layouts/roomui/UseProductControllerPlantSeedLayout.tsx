import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1092_use_product_controller_plant_seed_xml` (layout "use_product_plant_seed", 386x180) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductControllerPlantSeedLayoutProps {
    cancelText?: ReactNode;
    captionDescription?: string;
    captionInfo?: string;
    layout?: BoxLayout;
    onCancelText?: () => void;
    onSaveButton?: () => void;
    srcPreviewImage?: string;
    srcPreviewImageBg?: string;
    tintPreviewImage?: string;
    tintPreviewImageBg?: string;
}

export const UseProductControllerPlantSeedLayout = ({ cancelText, captionDescription, captionInfo, layout, onCancelText, onSaveButton, srcPreviewImage, srcPreviewImageBg, tintPreviewImage, tintPreviewImageBg }: UseProductControllerPlantSeedLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 386, height: 180, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}>
                <ButtonThick
                    variant="3"
                    name="save_button"
                    onPointerTap={onSaveButton}
                    layout={{ position: 'absolute', right: 11, width: 145, top: 112, height: 28, minWidth: 130, maxWidth: 145 }}
                >
                    {t('useproduct.widget.plant_seed')}
                </ButtonThick>
                <ThemeImage
                    name="preview_image_bg"
                    src={srcPreviewImageBg ?? layoutImage('plant_seed_preview_bg.png')}
                    tint={tintPreviewImageBg}
                    layout={{ position: 'absolute', left: 10, width: 122, top: 10, height: 130 }}
                />
                <ThemeImage
                    name="preview_image"
                    src={srcPreviewImage ?? layoutImage('plant_seed_preview.png')}
                    tint={tintPreviewImage}
                    layout={{ position: 'absolute', left: 10, width: 122, top: 10, height: 130 }}
                />
                <ThemeText
                    text={captionDescription ?? t('useproduct.widget.text.plant_seed')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    name="description"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 140, width: 200, top: 15, height: 61, minWidth: 200, maxWidth: 200 }}
                />
                <Region
                    name="cancel_text"
                    onPointerTap={onCancelText}
                    cursor="pointer"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 65, top: 118, height: 25 }}
                >
                    {cancelText}
                </Region>
                <ThemeText
                    text={t('useproduct.widget.cancel')}
                    layout={{ position: 'absolute', marginLeft: 2, marginRight: -2, width: 70, top: 120, height: 25 }}
                />
                <ThemeText
                    text={captionInfo ?? t('useproduct.widget.info.plant_seed')}
                    textStyle="text-style-u-italic"
                    textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    name="info"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 140, width: 200, top: 60, height: 40, minWidth: 200, maxWidth: 200 }}
                />
            </Region>
        </Region>
    );
};
