import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `89_habbo_talents_promo_xml` (layout "landing_view", 500x149) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboTalentsPromoLayoutProps {
    captionCaptionTxt?: string;
    captionInfoTxt?: string;
    captionSubcaptionTxt?: string;
    captionTitleTxt?: string;
    layout?: BoxLayout;
    onGoButton?: () => void;
    srcBorderBar?: string;
    srcHdrLine?: string;
    srcTeaserImage?: string;
}

export const HabboTalentsPromoLayout = ({ captionCaptionTxt, captionInfoTxt, captionSubcaptionTxt, captionTitleTxt, layout, onGoButton, srcBorderBar, srcHdrLine, srcTeaserImage }: HabboTalentsPromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 149, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="border_bar"
                    src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 0, width: 12, top: 10, height: 4 }}
                />
                <ThemeText
                    text={captionTitleTxt ?? t('landing.view.talentspromo.title')}
                    textStyle="text-style-il-heading-3"
                    name="title_txt"
                    layout={{ position: 'absolute', left: 18, width: 145, top: 4, height: 14 }}
                />
                <ThemeImage
                    name="hdr_line"
                    src={srcHdrLine ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', right: 0, width: 300, top: 10, height: 4 }}
                />
                <ThemeImage
                    name="teaser_image"
                    src={srcTeaserImage ?? '${image.library.url}reception/reception_widget_helpers_rev.png'}
                    layout={{ position: 'absolute', left: 21, width: 192, bottom: -12, height: 101 }}
                />
                <Region layout={{ position: 'absolute', right: 0, width: 270, bottom: 0, height: 120, flexDirection: 'column', gap: 5 }}>
                    <ThemeText
                        text={captionCaptionTxt ?? t('landing.view.talentspromo.caption')}
                        textStyle="text-style-il-heading-1"
                        name="caption_txt"
                        layout={{ alignSelf: 'stretch', height: 24, flexShrink: 0 }}
                    />
                    <ThemeText
                        text={captionSubcaptionTxt ?? t('landing.view.talentspromo.subcaption')}
                        textStyle="text-style-il-heading-3"
                        textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        name="subcaption_txt"
                        verticalAlign="top"
                        layout={{ alignSelf: 'stretch', height: 15, flexShrink: 0 }}
                    />
                    <ThemeText
                        text={captionInfoTxt ?? t('landing.view.talentspromo.info')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        name="info_txt"
                        verticalAlign="top"
                        layout={{ alignSelf: 'stretch', height: 16, flexShrink: 0 }}
                    />
                    <Button
                        variant="100"
                        name="go_button"
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
