import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1069_use_product_controller_saddle_xml` (layout "use_product_saddle", 386x180) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductControllerSaddleLayoutProps {
    cancelText?: ReactNode;
    captionDescription?: string;
    captionInfo?: string;
    layout?: BoxLayout;
    onCancelText?: () => void;
    onPreviewImageRegion?: () => void;
    onSaveButton?: () => void;
    srcPreviewImage?: string;
    tintPreviewImage?: string;
}

export const UseProductControllerSaddleLayout = ({ cancelText, captionDescription, captionInfo, layout, onCancelText, onPreviewImageRegion, onSaveButton, srcPreviewImage, tintPreviewImage }: UseProductControllerSaddleLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 386, height: 180, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'center' }}>
                <ButtonThick
                    variant="3"
                    name="save_button"
                    onPointerTap={onSaveButton}
                    layout={{ position: 'absolute', left: 230, width: 130, top: 112, height: 28, minWidth: 130, maxWidth: 145 }}
                >
                    {t('useproduct.widget.use')}
                </ButtonThick>
                <Region
                    name="preview_image_region"
                    onPointerTap={onPreviewImageRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 10, width: 122, top: 10, height: 130 }}
                >
                    <ThemeImage
                        name="preview_image"
                        src={srcPreviewImage}
                        tint={tintPreviewImage}
                        layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 130 }}
                    />
                </Region>
                <Region
                    name="description"
                    layout={{ position: 'absolute', left: 140, width: 200, top: 15, height: 61, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescription ?? '${useproduct.widget.text.saddle '}
                        textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    />
                </Region>
                <Region
                    name="cancel_text"
                    onPointerTap={onCancelText}
                    cursor="pointer"
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 65, top: 118, height: 25 }}
                >
                    {cancelText}
                </Region>
                <Region layout={{ position: 'absolute', marginLeft: 2, marginRight: -2, width: 70, top: 120, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {t('useproduct.widget.cancel')}
                </Region>
                <Region
                    name="info"
                    layout={{ position: 'absolute', left: 140, width: 200, top: 60, height: 40, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfo ?? t('useproduct.widget.info.saddle')}
                        textStyle="text-style-u-italic"
                        textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
