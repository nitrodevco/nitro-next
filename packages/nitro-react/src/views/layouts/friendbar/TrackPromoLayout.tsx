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
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Border
                    variant="9"
                    tintColor="#686661"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                {/* `border` is hidden and has no name to show it by */}
                <Border
                    variant="6"
                    tintColor="#596f8d"
                    layout={{ position: 'absolute', right: 0, width: 29, top: 0, bottom: 0 }}
                >
                    <ThemeImage
                        name="pixel_icon"
                        src={srcPixelIcon ?? layoutImage('toolbar_citizenship_icon.png')}
                        layout={{ position: 'absolute', left: 0, width: 29, top: 0, height: 29 }}
                    />
                </Border>
                <ThemeText
                    text={captionTitleTxt ?? t('citizenship.promo.title')}
                    textStyle="text-style-il-regular-white"
                    name="title_txt"
                    layout={{ position: 'absolute', left: 10, width: 148, top: 6, bottom: 7 }}
                />
            </Region>
        </Region>
    );
};
