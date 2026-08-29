import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `54_habbo_moderation_promo_xml` (layout "landing_view", 250x192) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboModerationPromoLayoutProps {
    captionCaptionTxt?: string;
    captionCursingCaptionTxt?: string;
    captionCursingInfoTxt?: string;
    captionInfoTxt?: string;
    captionTitleTxt?: string;
    captionWrongdoersCaptionTxt?: string;
    captionWrongdoersInfoTxt?: string;
    layout?: BoxLayout;
    spacing?: HabboModerationPromoLayoutSpacingProps;
    spacing2?: HabboModerationPromoLayoutSpacing2Props;
    spacing3?: HabboModerationPromoLayoutSpacing3Props;
    srcBorderBar?: string;
    srcHdrLine?: string;
}

export const HabboModerationPromoLayout = ({ captionCaptionTxt, captionCursingCaptionTxt, captionCursingInfoTxt, captionInfoTxt, captionTitleTxt, captionWrongdoersCaptionTxt, captionWrongdoersInfoTxt, layout, spacing, spacing2, spacing3, srcBorderBar, srcHdrLine }: HabboModerationPromoLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 250, height: 192, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 192 }}
            >
                <ThemeImage
                    name="border_bar"
                    src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 0, width: 12, top: 10, height: 4 }}
                />
                <Region
                    name="title_txt"
                    layout={{ position: 'absolute', left: 18, width: 162, top: 4, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitleTxt ?? t('landing.view.moderationpromo.title')}
                        textStyle="text-style-il-heading-3"
                    />
                </Region>
                <ThemeImage
                    name="hdr_line"
                    src={srcHdrLine ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 150, width: 100, top: 10, height: 4 }}
                />
                <Region layout={{ position: 'absolute', left: 0, width: 250, top: 29, height: 163, flexDirection: 'column' }}>
                    <Region
                        name="caption_txt"
                        layout={{ width: 316, height: 24, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCaptionTxt ?? t('landing.view.moderationpromo.caption')}
                            textStyle="text-style-il-heading-1"
                        />
                    </Region>
                    <HabboModerationPromoLayoutSpacing {...spacing} />
                    <Region
                        name="info_txt"
                        layout={{ width: 250, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInfoTxt ?? t('landing.view.moderationpromo.info')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                        />
                    </Region>
                    <HabboModerationPromoLayoutSpacing2 {...spacing2} />
                    <Region
                        name="cursing_caption_txt"
                        layout={{ width: 237, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCursingCaptionTxt ?? t('landing.view.moderationpromo.cursing.caption')}
                            textStyle="text-style-il-heading-3"
                            textOptions={{ wordWrap: true, wordWrapWidth: 237 }}
                        />
                    </Region>
                    <Region
                        name="cursing_info_txt"
                        layout={{ width: 250, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCursingInfoTxt ?? t('landing.view.moderationpromo.cursing.info')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                        />
                    </Region>
                    <HabboModerationPromoLayoutSpacing3 {...spacing3} />
                    <Region
                        name="wrongdoers_caption_txt"
                        layout={{ width: 150, height: 26, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionWrongdoersCaptionTxt ?? t('landing.view.moderationpromo.wrongdoers.caption')}
                            textStyle="text-style-il-heading-3"
                            textOptions={{ wordWrap: true, wordWrapWidth: 150 }}
                        />
                    </Region>
                    <Region
                        name="wrongdoers_info_txt"
                        layout={{ width: 250, height: 28, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionWrongdoersInfoTxt ?? t('landing.view.moderationpromo.wrongdoers.info')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 250 }}
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `spacing` of HabboModerationPromoLayout - configured through the parent's `spacing` prop. */
export interface HabboModerationPromoLayoutSpacingProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const HabboModerationPromoLayoutSpacing = ({ layout, tags }: HabboModerationPromoLayoutSpacingProps) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            backgroundColor="#000000"
            layout={{ width: 250, height: 6, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `spacing` of HabboModerationPromoLayout - configured through the parent's `spacing` prop. */
export interface HabboModerationPromoLayoutSpacing2Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const HabboModerationPromoLayoutSpacing2 = ({ layout, tags }: HabboModerationPromoLayoutSpacing2Props) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            backgroundColor="#000000"
            layout={{ width: 250, height: 8, flexShrink: 0, ...layout }}
        />
    );
};

/** Named region `spacing` of HabboModerationPromoLayout - configured through the parent's `spacing` prop. */
export interface HabboModerationPromoLayoutSpacing3Props {
    layout?: BoxLayout;
    tags?: string[];
}

export const HabboModerationPromoLayoutSpacing3 = ({ layout, tags }: HabboModerationPromoLayoutSpacing3Props) => {
    return (
        <Region
            name="spacing"
            tags={tags}
            backgroundColor="#000000"
            layout={{ width: 250, height: 8, flexShrink: 0, ...layout }}
        />
    );
};
