import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from './layoutAssets';

/** Generated from `89_habbo_talents_promo_xml` (layout "landing_view", 500x149) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboTalentsPromoLayoutProps {
    layout?: BoxLayout;
    onGoButton?: () => void;
}

export const HabboTalentsPromoLayout = ({ layout, onGoButton }: HabboTalentsPromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 149, ...layout }}>
            <Region
                params={147472}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 149 }}
            >
                <ThemeImage
                    name="border_bar"
                    params={16}
                    src={layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 0, width: 12, top: 10, height: 4 }}
                />
                <Region
                    name="title_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 18, width: 145, top: 4, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('landing.view.talentspromo.title')}
                        textStyle="text-style-il-heading-3"
                    />
                </Region>
                <ThemeImage
                    name="hdr_line"
                    params={16}
                    src={layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 200, width: 300, top: 10, height: 4 }}
                />
                <ThemeImage
                    name="teaser_image"
                    params={16}
                    src="${image.library.url}reception/reception_widget_helpers_rev.png"
                    layout={{ position: 'absolute', left: 21, width: 192, top: 60, height: 101 }}
                />
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 230, width: 270, top: 29, height: 120, flexDirection: 'column', gap: 5 }}
                >
                    <Region
                        name="caption_txt"
                        params={16}
                        layout={{ width: 279, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('landing.view.talentspromo.caption')}
                            textStyle="text-style-il-heading-1"
                        />
                    </Region>
                    <Region
                        name="subcaption_txt"
                        params={16}
                        layout={{ width: 270, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('landing.view.talentspromo.subcaption')}
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
                            text={t('landing.view.talentspromo.info')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <Button
                        variant="100"
                        name="go_button"
                        params={131089}
                        onPointerTap={onGoButton}
                        layout={{ width: 256, height: 50, flexShrink: 0 }}
                    >
                        {t('landing.view.talentspromo.checkprogress')}
                    </Button>
                </Region>
            </Region>
        </Region>
    );
};
