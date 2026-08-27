import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `96_daily_quest_xml` (layout "landing_view", 500x194) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DailyQuestLayoutProps {
    captionCancelQuestTxt?: string;
    captionCaptionTxt?: string;
    captionCurrentQuestTxt?: string;
    captionInfoTxt?: string;
    captionLabelTxt?: string;
    captionLabelTxt2?: string;
    captionNextQuestTxt?: string;
    captionTitleTxt?: string;
    layout?: BoxLayout;
    onAcceptButton?: () => void;
    onCancelQuestRegion?: () => void;
    onEasyRegion?: () => void;
    onGoButton?: () => void;
    onHardRegion?: () => void;
    onNextQuestRegion?: () => void;
    srcBitmap?: string;
    srcBorderBar?: string;
    srcDivider?: string;
    srcHdrLine?: string;
}

export const DailyQuestLayout = ({ captionCancelQuestTxt, captionCaptionTxt, captionCurrentQuestTxt, captionInfoTxt, captionLabelTxt, captionLabelTxt2, captionNextQuestTxt, captionTitleTxt, layout, onAcceptButton, onCancelQuestRegion, onEasyRegion, onGoButton, onHardRegion, onNextQuestRegion, srcBitmap, srcBorderBar, srcDivider, srcHdrLine }: DailyQuestLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 194, ...layout }}>
            <Region
                params={16}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 194 }}
            >
                <ThemeImage
                    name="border_bar"
                    params={16}
                    src={srcBorderBar ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 7, width: 12, top: 10, height: 4 }}
                />
                <Region
                    name="title_txt"
                    params={16}
                    layout={{ position: 'absolute', left: 18, width: 43, top: 3, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitleTxt ?? 'TITLE PH'}
                        textStyle="text-style-il-heading-3"
                    />
                </Region>
                <ThemeImage
                    name="hdr_line"
                    params={16}
                    src={srcHdrLine ?? layoutImage('illumina_light_border_top_center.png')}
                    layout={{ position: 'absolute', left: 100, width: 400, top: 10, height: 4 }}
                />
                <ThemeImage
                    name="bitmap"
                    params={16}
                    src={srcBitmap}
                    layout={{ position: 'absolute', left: 10, width: 20, top: 10, height: 20 }}
                />
                <Region
                    name="content_container"
                    params={16}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 230, width: 270, top: 0, height: 194 }}
                >
                    <Region
                        name="caption_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 94, top: 32, height: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCaptionTxt ?? 'Caption PH'}
                            textStyle="text-style-il-heading-1"
                        />
                    </Region>
                    <Region
                        name="info_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 270, top: 61, height: 41, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionInfoTxt ?? '...and everything must go, so get yourself some of the sweet, sweet plastic fantastic while you still can! You don\'t want to miss out on the classics!'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                        />
                    </Region>
                    <Button
                        variant="100"
                        name="accept_button"
                        params={131089}
                        onPointerTap={onAcceptButton}
                        layout={{ position: 'absolute', left: -11, width: 178, top: 91, height: 50 }}
                    >
                        {t('landing.view.quest.accept')}
                    </Button>
                    <Region
                        name="next_quest_region"
                        params={17}
                        onPointerTap={onNextQuestRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 253, top: 139, height: 19 }}
                    >
                        <Region
                            name="next_quest_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 137, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionNextQuestTxt ?? 'PH: Show me another easy quest'} />
                        </Region>
                    </Region>
                    <Region
                        name="cancel_quest_region"
                        params={17}
                        onPointerTap={onCancelQuestRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 253, top: 152, height: 19 }}
                    >
                        <Region
                            name="cancel_quest_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 105, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionCancelQuestTxt ?? t('landing.view.quest.cancel')} />
                        </Region>
                    </Region>
                    <Border
                        variant="100"
                        name="current_quest_border"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 271, top: 101, height: 46 }}
                    >
                        <Button
                            variant="100"
                            name="go_button"
                            params={131153}
                            onPointerTap={onGoButton}
                            layout={{ position: 'absolute', right: -1, width: 88, top: -2, height: 50, minWidth: 88, maxWidth: 88 }}
                        >
                            {t('landing.view.quest.go')}
                        </Button>
                        <Region
                            name="current_quest_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 13, width: 174, top: 10, height: 34, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionCurrentQuestTxt ?? t('landing.view.quest.currenttask')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 174 }}
                            />
                        </Region>
                    </Border>
                </Region>
                <Region
                    name="difficulty_container"
                    params={16}
                    layout={{ position: 'absolute', left: 285, width: 211, top: 3, height: 17 }}
                >
                    <Region
                        name="easy_region"
                        params={17}
                        onPointerTap={onEasyRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 18 }}
                    >
                        <Region
                            name="label_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 98, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionLabelTxt ?? t('landing.view.quest.easy')} />
                        </Region>
                    </Region>
                    <ThemeImage
                        name="divider"
                        params={2128}
                        src={srcDivider ?? layoutImage('landing_view_reception_horizontal.png')}
                        layout={{ position: 'absolute', right: 106, width: 2, top: 0, bottom: -3 }}
                    />
                    <Region
                        name="hard_region"
                        params={17}
                        onPointerTap={onHardRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 112, width: 99, top: 0, height: 18 }}
                    >
                        <Region
                            name="label_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 99, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionLabelTxt2 ?? t('landing.view.quest.hard')} />
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
