import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `55_pixel_removal_promo_xml` (layout "fastfood_game_promo", 500x245) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PixelRemovalPromoLayoutProps {
    captionCaptionTxt?: string;
    captionInfoTxt?: string;
    captionTitleTxt?: string;
    col1?: PixelRemovalPromoLayoutCol1Props;
    layout?: BoxLayout;
    onGoButton?: () => void;
    spacing?: PixelRemovalPromoLayoutSpacingProps;
}

export const PixelRemovalPromoLayout = ({ captionCaptionTxt, captionInfoTxt, captionTitleTxt, col1, layout, onGoButton, spacing }: PixelRemovalPromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 245, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 245 }}
            >
                <PixelRemovalPromoLayoutCol1 {...col1} />
                <Region layout={{ position: 'absolute', left: 230, width: 270, top: 30, height: 111, flexDirection: 'column' }}>
                    <Region
                        name="caption_txt"
                        layout={{ width: 329, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCaptionTxt ?? t('landing.view.pixelremovalpromo.caption')}
                            textStyle="text-style-il-heading-1"
                        />
                    </Region>
                    <PixelRemovalPromoLayoutSpacing {...spacing} />
                    <Region
                        name="title_txt"
                        layout={{ width: 270, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTitleTxt ?? t('landing.view.pixelremovalpromo.title')}
                            textStyle="text-style-il-heading-3"
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <Region
                        name="info_txt"
                        layout={{ width: 270, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInfoTxt ?? t('landing.view.pixelremovalpromo.info')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <Button
                        variant="100"
                        name="go_button"
                        onPointerTap={onGoButton}
                        layout={{ width: 246, height: 50, flexShrink: 0 }}
                    >
                        {t('landing.view.pixelremovalpromo.button')}
                    </Button>
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `col1` of PixelRemovalPromoLayout - configured through the parent's `col1` prop. */
export interface PixelRemovalPromoLayoutCol1Props {
    layout?: BoxLayout;
    srcTeaserImage?: string;
    tags?: string[];
}

export const PixelRemovalPromoLayoutCol1 = ({ layout, srcTeaserImage, tags }: PixelRemovalPromoLayoutCol1Props) => {
    return (
        <Region
            name="col1"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 245, ...layout }}
        >
            <ThemeImage
                name="teaser_image"
                src={srcTeaserImage ?? '${image.library.url}reception/pixrem_promo.png'}
                layout={{ position: 'absolute', left: 10, width: 200, top: 30, height: 170 }}
            />
        </Region>
    );
};

/** Named region `spacing` of PixelRemovalPromoLayout - configured through the parent's `spacing` prop. */
export interface PixelRemovalPromoLayoutSpacingProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const PixelRemovalPromoLayoutSpacing = ({ layout, tags }: PixelRemovalPromoLayoutSpacingProps) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            backgroundColor="#000000"
            layout={{ width: 250, height: 6, flexShrink: 0, ...layout }}
        />
    );
};
