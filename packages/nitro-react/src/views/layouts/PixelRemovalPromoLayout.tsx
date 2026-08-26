import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `55_pixel_removal_promo_xml` (layout "fastfood_game_promo", 500x245) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PixelRemovalPromoLayoutProps {
    layout?: BoxLayout;
    onGoButton?: () => void;
}

export const PixelRemovalPromoLayout = ({ layout, onGoButton }: PixelRemovalPromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 245, ...layout }}>
            <Region
                params={147472}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 245 }}
            >
                <Region
                    name="col1"
                    params={16}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 245 }}
                >
                    <ThemeImage
                        name="teaser_image"
                        params={16}
                        src="${image.library.url}reception/pixrem_promo.png"
                        layout={{ position: 'absolute', left: 10, width: 200, top: 30, height: 170 }}
                    />
                </Region>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 230, width: 270, top: 30, height: 111, flexDirection: 'column' }}
                >
                    <Region
                        name="caption_txt"
                        params={16}
                        layout={{ width: 329, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('landing.view.pixelremovalpromo.caption')}
                            textStyle="text-style-il-heading-1"
                        />
                    </Region>
                    <Region
                        name="spacing"
                        params={16}
                        backgroundColor="#000000"
                        layout={{ width: 250, height: 6, flexShrink: 0 }}
                    />
                    <Region
                        name="title_txt"
                        params={16}
                        layout={{ width: 270, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('landing.view.pixelremovalpromo.title')}
                            textStyle="text-style-il-heading-3"
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <Region
                        name="info_txt"
                        params={16}
                        layout={{ width: 270, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('landing.view.pixelremovalpromo.info')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <Button
                        variant="100"
                        name="go_button"
                        params={131089}
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
