import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1069_use_product_controller_saddle_xml` (layout "use_product_saddle", 386x180) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UseProductControllerSaddleLayoutProps {
    cancelText?: UseProductControllerSaddleLayoutCancelTextProps;
    captionDescription?: string;
    captionInfo?: string;
    layout?: BoxLayout;
    onSaveButton?: () => void;
    previewImageRegion?: UseProductControllerSaddleLayoutPreviewImageRegionProps;
}

export const UseProductControllerSaddleLayout = ({ cancelText, captionDescription, captionInfo, layout, onSaveButton, previewImageRegion }: UseProductControllerSaddleLayoutProps) => {
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
                <UseProductControllerSaddleLayoutPreviewImageRegion {...previewImageRegion} />
                <Region
                    name="description"
                    layout={{ position: 'absolute', left: 140, width: 200, top: 15, height: 61, minWidth: 200, maxWidth: 200, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDescription ?? '${useproduct.widget.text.saddle '}
                        textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    />
                </Region>
                <UseProductControllerSaddleLayoutCancelText {...cancelText} />
                <Region layout={{ position: 'absolute', left: 160, width: 70, top: 120, height: 25, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText text={t('useproduct.widget.cancel')} />
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

/** Named region `preview_image_region` of UseProductControllerSaddleLayout - configured through the parent's `previewImageRegion` prop. */
export interface UseProductControllerSaddleLayoutPreviewImageRegionProps {
    layout?: BoxLayout;
    onPreviewImageRegion?: () => void;
    srcPreviewImage?: string;
    tags?: string[];
}

export const UseProductControllerSaddleLayoutPreviewImageRegion = ({ layout, onPreviewImageRegion, srcPreviewImage, tags }: UseProductControllerSaddleLayoutPreviewImageRegionProps) => {
    return (
        <Region
            name="preview_image_region"
            tags={tags}
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

/** Named region `cancel_text` of UseProductControllerSaddleLayout - configured through the parent's `cancelText` prop. */
export interface UseProductControllerSaddleLayoutCancelTextProps {
    layout?: BoxLayout;
    onCancelText?: () => void;
    tags?: string[];
}

export const UseProductControllerSaddleLayoutCancelText = ({ layout, onCancelText, tags }: UseProductControllerSaddleLayoutCancelTextProps) => {
    return (
        <Region
            name="cancel_text"
            tags={tags}
            onPointerTap={onCancelText}
            cursor="pointer"
            layout={{ position: 'absolute', left: 160, width: 65, top: 118, height: 25, ...layout }}
        />
    );
};
