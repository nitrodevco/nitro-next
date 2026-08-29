import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `60_habbo_way_promo_xml` (layout "landing_view", 500x245) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboWayPromoLayoutProps {
    captionCaptionTxt?: string;
    captionInfoTxt?: string;
    captionInfoTxt2?: string;
    captionPsTitleTxt?: string;
    col1?: HabboWayPromoLayoutCol1Props;
    layout?: BoxLayout;
    onGoButton?: () => void;
    spacing?: HabboWayPromoLayoutSpacingProps;
    srcCounterBg?: string;
}

export const HabboWayPromoLayout = ({ captionCaptionTxt, captionInfoTxt, captionInfoTxt2, captionPsTitleTxt, col1, layout, onGoButton, spacing, srcCounterBg }: HabboWayPromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 245, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 245 }}
            >
                <HabboWayPromoLayoutCol1 {...col1} />
                <Region layout={{ position: 'absolute', left: 230, width: 270, top: 0, height: 190, flexDirection: 'column' }}>
                    <Region
                        name="caption_txt"
                        layout={{ width: 307, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCaptionTxt ?? t('landing.view.habbowaypromo.caption')}
                            textStyle="text-style-il-heading-1"
                        />
                    </Region>
                    <HabboWayPromoLayoutSpacing {...spacing} />
                    <Region
                        name="info_txt"
                        layout={{ width: 270, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInfoTxt ?? t('landing.view.habbowaypromo.info')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <Button
                        variant="100"
                        name="go_button"
                        onPointerTap={onGoButton}
                        layout={{ width: 220, height: 50, flexShrink: 0 }}
                    >
                        {t('landing.view.habbowaypromo.doit')}
                    </Button>
                    <Region
                        name="ps_title_txt"
                        layout={{ width: 270, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPsTitleTxt ?? t('landing.view.habbowaypromo.ps.title')}
                            textStyle="text-style-il-heading-3"
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <Border
                        variant="100"
                        layout={{ width: 270, height: 79, flexShrink: 0 }}
                    >
                        <ThemeImage
                            name="counter_bg"
                            src={srcCounterBg ?? '${image.library.url}album1584/ACH_HabboWayGraduate1.png'}
                            layout={{ position: 'absolute', left: 16, width: 38, top: 17, height: 38 }}
                        />
                        <Region
                            name="info_txt"
                            layout={{ position: 'absolute', left: 63, width: 201, top: 15, height: 60, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionInfoTxt2 ?? t('landing.view.habbowaypromo.ps.info')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 201 }}
                            />
                        </Region>
                    </Border>
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `col1` of HabboWayPromoLayout - configured through the parent's `col1` prop. */
export interface HabboWayPromoLayoutCol1Props {
    captionCounterInfoTxt?: string;
    captionCounterTxt?: string;
    layout?: BoxLayout;
    srcCounterBg?: string;
    srcTeaserImage?: string;
}

export const HabboWayPromoLayoutCol1 = ({ captionCounterInfoTxt, captionCounterTxt, layout, srcCounterBg, srcTeaserImage }: HabboWayPromoLayoutCol1Props) => {
    const t = useTranslation();

    return (
        <Region
            name="col1"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 230, top: 0, height: 245, ...layout }}
        >
            <ThemeImage
                name="teaser_image"
                src={srcTeaserImage ?? '${image.library.url}reception/reception_widget_habboway.png'}
                layout={{ position: 'absolute', left: 0, width: 198, top: 0, height: 158 }}
            />
            <ThemeImage
                name="counter_bg"
                src={srcCounterBg ?? '${image.library.url}reception/reception_counter_bg.png'}
                layout={{ position: 'absolute', left: 35, width: 137, top: 178, height: 23 }}
            />
            <Region
                name="counter_info_txt"
                layout={{ position: 'absolute', left: 6, width: 201, top: 210, height: 14, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center' }}
            >
                <ThemeText
                    text={captionCounterInfoTxt ?? t('landing.view.habbowaypromo.counterinfo')}
                    textStyle="text-style-il-heading-3"
                    textOptions={{ wordWrap: true, wordWrapWidth: 201, align: 'center' }}
                />
            </Region>
            <Region
                name="counter_txt"
                layout={{ position: 'absolute', left: 38, width: 140, top: 180, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionCounterTxt ?? '00000000'}
                    textOptions={{ fill: '#ffffff' }}
                />
            </Region>
        </Region>
    );
};

/** Named region `spacing` of HabboWayPromoLayout - configured through the parent's `spacing` prop. */
export interface HabboWayPromoLayoutSpacingProps {
    layout?: BoxLayout;
}

export const HabboWayPromoLayoutSpacing = ({ layout }: HabboWayPromoLayoutSpacingProps) => {
    return (
        <Region
            name="spacing"
            backgroundColor="#000000"
            layout={{ width: 250, height: 6, flexShrink: 0, ...layout }}
        />
    );
};
