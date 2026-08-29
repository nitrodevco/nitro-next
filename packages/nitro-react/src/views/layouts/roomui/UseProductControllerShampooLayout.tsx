import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `877_use_product_controller_shampoo_xml` (layout "use_product_shampoo", 386x180) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductControllerShampooLayoutProps {
    cancelText?: UseProductControllerShampooLayoutCancelTextProps;
    captionDescription?: string;
    captionInfo?: string;
    layout?: BoxLayout;
    onSaveButton?: () => void;
    previewImageRegion?: UseProductControllerShampooLayoutPreviewImageRegionProps;
}

export const UseProductControllerShampooLayout = ({ cancelText, captionDescription, captionInfo, layout, onSaveButton, previewImageRegion }: UseProductControllerShampooLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 386, height: 180, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 386, top: 0, height: 180 }}>
                <ButtonThick
                    variant="3"
                    name="save_button"
                    onPointerTap={onSaveButton}
                    layout={{ position: 'absolute', left: 230, width: 130, top: 112, height: 28, minWidth: 130, maxWidth: 145 }}
                >
                    {t('useproduct.widget.use')}
                </ButtonThick>
                <UseProductControllerShampooLayoutPreviewImageRegion {...previewImageRegion} />
                <Region
                    name="description"
                    layout={{ position: 'absolute', left: 140, width: 200, top: 15, height: 61, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescription ?? '${useproduct.widget.text.shampoo '}
                        textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    />
                </Region>
                <UseProductControllerShampooLayoutCancelText {...cancelText} />
                <Region layout={{ position: 'absolute', left: 160, width: 70, top: 120, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText text={t('useproduct.widget.cancel')} />
                </Region>
                <Region
                    name="info"
                    layout={{ position: 'absolute', left: 140, width: 200, top: 60, height: 40, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionInfo ?? t('useproduct.widget.info.shampoo')}
                        textStyle="text-style-u-italic"
                        textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `preview_image_region` of UseProductControllerShampooLayout - configured through the parent's `previewImageRegion` prop. */
export interface UseProductControllerShampooLayoutPreviewImageRegionProps {
    layout?: BoxLayout;
    onPreviewImageRegion?: () => void;
    srcPreviewImage?: string;
}

export const UseProductControllerShampooLayoutPreviewImageRegion = ({ layout, onPreviewImageRegion, srcPreviewImage }: UseProductControllerShampooLayoutPreviewImageRegionProps) => {
    return (
        <Region
            name="preview_image_region"
            onPointerTap={onPreviewImageRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 10, width: 122, top: 10, height: 130, ...layout }}
        >
            <ThemeImage
                name="preview_image"
                src={srcPreviewImage}
                layout={{ position: 'absolute', left: 0, width: 122, top: 0, height: 130 }}
            />
        </Region>
    );
};

/** Named region `cancel_text` of UseProductControllerShampooLayout - configured through the parent's `cancelText` prop. */
export interface UseProductControllerShampooLayoutCancelTextProps {
    layout?: BoxLayout;
    onCancelText?: () => void;
}

export const UseProductControllerShampooLayoutCancelText = ({ layout, onCancelText }: UseProductControllerShampooLayoutCancelTextProps) => {
    return (
        <Region
            name="cancel_text"
            onPointerTap={onCancelText}
            cursor="pointer"
            layout={{ position: 'absolute', left: 160, width: 65, top: 118, height: 25, ...layout }}
        />
    );
};
