import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `50_fastfood_game_promo_xml` (layout "fastfood_game_promo", 500x245) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FastfoodGamePromoLayoutProps {
    captionCaptionTxt?: string;
    captionInfoTxt?: string;
    captionTitleTxt?: string;
    col1?: FastfoodGamePromoLayoutCol1Props;
    layout?: BoxLayout;
    onGoButton?: () => void;
    spacing?: FastfoodGamePromoLayoutSpacingProps;
}

export const FastfoodGamePromoLayout = ({ captionCaptionTxt, captionInfoTxt, captionTitleTxt, col1, layout, onGoButton, spacing }: FastfoodGamePromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 245, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 245 }}
            >
                <FastfoodGamePromoLayoutCol1 {...col1} />
                <Region layout={{ position: 'absolute', left: 230, width: 270, top: 30, height: 111, flexDirection: 'column' }}>
                    <Region
                        name="caption_txt"
                        layout={{ width: 296, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCaptionTxt ?? t('landing.view.fastfoodpromo.caption')}
                            textStyle="text-style-il-heading-1"
                        />
                    </Region>
                    <FastfoodGamePromoLayoutSpacing {...spacing} />
                    <Region
                        name="title_txt"
                        layout={{ width: 270, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTitleTxt ?? t('landing.view.fastfoodpromo.title')}
                            textStyle="text-style-il-heading-3"
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <Region
                        name="info_txt"
                        layout={{ width: 270, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInfoTxt ?? t('landing.view.fastfoodpromo.info')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <Button
                        variant="100"
                        name="go_button"
                        onPointerTap={onGoButton}
                        layout={{ width: 228, height: 50, flexShrink: 0 }}
                    >
                        {t('landing.view.fastfoodpromo.button')}
                    </Button>
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `col1` of FastfoodGamePromoLayout - configured through the parent's `col1` prop. */
export interface FastfoodGamePromoLayoutCol1Props {
    layout?: BoxLayout;
    srcTeaserImage?: string;
    tags?: string[];
}

export const FastfoodGamePromoLayoutCol1 = ({ layout, srcTeaserImage, tags }: FastfoodGamePromoLayoutCol1Props) => {
    return (
        <Region
            name="col1"
            tags={tags}
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 245, ...layout }}
        >
            <ThemeImage
                name="teaser_image"
                src={srcTeaserImage ?? '${image.library.url}reception/fastfood_promo.png'}
                layout={{ position: 'absolute', left: 10, width: 200, top: 0, height: 250 }}
            />
        </Region>
    );
};

/** Named region `spacing` of FastfoodGamePromoLayout - configured through the parent's `spacing` prop. */
export interface FastfoodGamePromoLayoutSpacingProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const FastfoodGamePromoLayoutSpacing = ({ layout, tags }: FastfoodGamePromoLayoutSpacingProps) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            backgroundColor="#000000"
            layout={{ width: 250, height: 6, flexShrink: 0, ...layout }}
        />
    );
};
