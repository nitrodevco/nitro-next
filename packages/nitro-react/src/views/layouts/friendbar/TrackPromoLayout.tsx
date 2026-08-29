import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `38_track_promo_xml` (layout "level_up", 192x29) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface TrackPromoLayoutProps {
    captionTitleTxt?: string;
    layout?: BoxLayout;
    srcPixelIcon?: string;
}

export const TrackPromoLayout = ({ captionTitleTxt, layout, srcPixelIcon }: TrackPromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 192, height: 29, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 29 }}>
                <Border
                    variant="9"
                    tintColor="#686661"
                    layout={{ position: 'absolute', left: 0, width: 192, top: 0, height: 29 }}
                />
                <Region
                    visible={false}
                    layout={{ position: 'absolute', left: 3, width: 186, top: 3, height: 22 }}
                >
                    <Border
                        variant="3"
                        tintColor="#201e19"
                        blend={0.8}
                        layout={{ width: '100%', height: '100%' }}
                    />
                </Region>
                <Border
                    variant="6"
                    tintColor="#596f8d"
                    layout={{ position: 'absolute', left: 163, width: 29, top: 0, height: 29 }}
                >
                    <ThemeImage
                        name="pixel_icon"
                        src={srcPixelIcon ?? layoutImage('toolbar_citizenship_icon.png')}
                        layout={{ position: 'absolute', left: 0, width: 29, top: 0, height: 29 }}
                    />
                </Border>
                <Region
                    name="title_txt"
                    layout={{ position: 'absolute', left: 10, width: 148, top: 6, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitleTxt ?? t('citizenship.promo.title')}
                        textStyle="text-style-il-regular-white"
                    />
                </Region>
            </Region>
        </Region>
    );
};
