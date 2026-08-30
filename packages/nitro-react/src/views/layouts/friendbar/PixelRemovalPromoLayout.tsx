import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `55_pixel_removal_promo_xml` (layout "fastfood_game_promo", 500x245) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PixelRemovalPromoLayoutProps {
    captionCaptionTxt?: string;
    captionInfoTxt?: string;
    captionTitleTxt?: string;
    layout?: BoxLayout;
    onGoButton?: () => void;
    spacing?: ReactNode;
    srcTeaserImage?: string;
}

export const PixelRemovalPromoLayout = ({ captionCaptionTxt, captionInfoTxt, captionTitleTxt, layout, onGoButton, spacing, srcTeaserImage }: PixelRemovalPromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 245, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="col1"
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 200, top: 0, bottom: 0 }}
                >
                    <ThemeImage
                        name="teaser_image"
                        src={srcTeaserImage ?? '${image.library.url}reception/pixrem_promo.png'}
                        layout={{ position: 'absolute', left: 10, width: 200, top: 30, height: 170 }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', right: 0, width: 270, top: 30, height: 111, flexDirection: 'column' }}>
                    <ThemeText
                        text={captionCaptionTxt ?? t('landing.view.pixelremovalpromo.caption')}
                        textStyle="text-style-il-heading-1"
                        name="caption_txt"
                        layout={{ alignSelf: 'stretch', height: 24, flexShrink: 0 }}
                    />
                    <Region
                        name="spacing"
                        backgroundColor="#000000"
                        layout={{ width: 250, height: 6, flexShrink: 0 }}
                    >
                        {spacing}
                    </Region>
                    <ThemeText
                        text={captionTitleTxt ?? t('landing.view.pixelremovalpromo.title')}
                        textStyle="text-style-il-heading-3"
                        textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        name="title_txt"
                        verticalAlign="top"
                        layout={{ alignSelf: 'stretch', height: 15, flexShrink: 0 }}
                    />
                    <ThemeText
                        text={captionInfoTxt ?? t('landing.view.pixelremovalpromo.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        name="info_txt"
                        verticalAlign="top"
                        layout={{ alignSelf: 'stretch', height: 16, flexShrink: 0 }}
                    />
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
