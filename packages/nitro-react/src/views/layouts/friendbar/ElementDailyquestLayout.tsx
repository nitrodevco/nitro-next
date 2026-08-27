import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `91_element_dailyquest_xml` (layout "element_dailyquest", 250x70) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementDailyquestLayoutProps {
    captionAcceptText?: string;
    captionCancelQuestTxt?: string;
    captionCaptionTxt?: string;
    captionCurrentQuestTxt?: string;
    captionLabelTxt?: string;
    captionLabelTxt2?: string;
    captionNextQuestTxt?: string;
    layout?: BoxLayout;
    onAcceptButton?: () => void;
    onCancelQuestRegion?: () => void;
    onEasyRegion?: () => void;
    onGoButton?: () => void;
    onHardRegion?: () => void;
    onNextQuestRegion?: () => void;
    srcDivider?: string;
    visibleAcceptButton?: boolean;
    visibleDifficultyContainer?: boolean;
    visibleNextQuestRegion?: boolean;
}

export const ElementDailyquestLayout = ({ captionAcceptText, captionCancelQuestTxt, captionCaptionTxt, captionCurrentQuestTxt, captionLabelTxt, captionLabelTxt2, captionNextQuestTxt, layout, onAcceptButton, onCancelQuestRegion, onEasyRegion, onGoButton, onHardRegion, onNextQuestRegion, srcDivider, visibleAcceptButton, visibleDifficultyContainer, visibleNextQuestRegion }: ElementDailyquestLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 250, height: 70, ...layout }}>
            <Region
                params={16}
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 70 }}
            >
                <Region
                    name="questdata_container"
                    params={16}
                    backgroundColor="#000000"
                    layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 70 }}
                >
                    <Region
                        visible={visibleAcceptButton ?? false}
                        layout={{ position: 'absolute', left: 0, width: 250, top: 2, height: 39, minWidth: 250, maxWidth: 250 }}
                    >
                        <ContainerButton
                            variant="102"
                            name="accept_button"
                            params={16401}
                            onPointerTap={onAcceptButton}
                            layout={{ width: '100%', height: '100%' }}
                        >
                            <Region
                                params={147472}
                                layout={{ position: 'absolute', left: 5, width: 240, top: 3, height: 36, flexDirection: 'column' }}
                            >
                                <Region
                                    name="caption_txt"
                                    params={4194320}
                                    layout={{ width: 58, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={captionCaptionTxt ?? 'DQ Title'} />
                                </Region>
                                <Region
                                    name="accept_text"
                                    params={4194320}
                                    layout={{ width: 142, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText text={captionAcceptText ?? t('landing.view.quest.accept')} />
                                </Region>
                            </Region>
                        </ContainerButton>
                    </Region>
                    <Region
                        name="next_quest_region"
                        params={17}
                        visible={visibleNextQuestRegion ?? false}
                        onPointerTap={onNextQuestRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 250, top: 45, height: 12 }}
                    >
                        <Region
                            name="next_quest_txt"
                            tags={[ 'COLORABLE' ]}
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
                        layout={{ position: 'absolute', left: 0, width: 250, top: 55, height: 14 }}
                    >
                        <Region
                            name="cancel_quest_txt"
                            tags={[ 'COLORABLE' ]}
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
                        layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 55 }}
                    >
                        <Button
                            variant="100"
                            name="go_button"
                            params={131153}
                            onPointerTap={onGoButton}
                            layout={{ position: 'absolute', left: 164, width: 88, top: 3, height: 50, minWidth: 88, maxWidth: 88 }}
                        >
                            {t('landing.view.quest.go')}
                        </Button>
                        <Region
                            name="current_quest_txt"
                            tags={[ 'COLORABLE' ]}
                            params={16}
                            layout={{ position: 'absolute', left: 13, width: 157, top: 10, height: 43, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionCurrentQuestTxt ?? t('landing.view.quest.currenttask')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 157 }}
                            />
                        </Region>
                    </Border>
                </Region>
                <Region
                    name="difficulty_container"
                    params={16}
                    visible={visibleDifficultyContainer ?? false}
                    layout={{ position: 'absolute', left: 39, width: 211, top: 45, height: 17 }}
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
                            tags={[ 'COLORABLE' ]}
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
                        layout={{ position: 'absolute', left: 103, width: 2, top: 0, height: 20 }}
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
                            tags={[ 'COLORABLE' ]}
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
