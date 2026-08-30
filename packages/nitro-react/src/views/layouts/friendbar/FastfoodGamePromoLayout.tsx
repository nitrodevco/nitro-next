import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `50_fastfood_game_promo_xml` (layout "fastfood_game_promo", 500x245) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FastfoodGamePromoLayoutProps {
    captionCaptionTxt?: string;
    captionInfoTxt?: string;
    captionTitleTxt?: string;
    layout?: BoxLayout;
    onGoButton?: () => void;
    spacing?: ReactNode;
    srcTeaserImage?: string;
}

export const FastfoodGamePromoLayout = ({ captionCaptionTxt, captionInfoTxt, captionTitleTxt, layout, onGoButton, spacing, srcTeaserImage }: FastfoodGamePromoLayoutProps) => {
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
                        src={srcTeaserImage ?? '${image.library.url}reception/fastfood_promo.png'}
                        layout={{ position: 'absolute', left: 10, width: 200, top: 0, height: 250 }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', right: 0, width: 270, top: 30, height: 111, flexDirection: 'column' }}>
                    <ThemeText
                        text={captionCaptionTxt ?? t('landing.view.fastfoodpromo.caption')}
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
                        text={captionTitleTxt ?? t('landing.view.fastfoodpromo.title')}
                        textStyle="text-style-il-heading-3"
                        textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        name="title_txt"
                        verticalAlign="top"
                        layout={{ alignSelf: 'stretch', height: 15, flexShrink: 0 }}
                    />
                    <ThemeText
                        text={captionInfoTxt ?? t('landing.view.fastfoodpromo.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        name="info_txt"
                        verticalAlign="top"
                        layout={{ alignSelf: 'stretch', height: 16, flexShrink: 0 }}
                    />
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
