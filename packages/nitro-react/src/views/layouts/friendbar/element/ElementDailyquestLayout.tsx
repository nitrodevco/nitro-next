import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `91_element_dailyquest_xml` (layout "element_dailyquest", 250x70) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementDailyquestLayoutProps {
    captionLabelTxt?: string;
    captionLabelTxt2?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
    onEasyRegion?: () => void;
    onHardRegion?: () => void;
    questdataContainer?: ElementDailyquestLayoutQuestdataContainerProps;
    srcDivider?: string;
    visibleDifficultyContainer?: boolean;
}

export const ElementDailyquestLayout = ({ captionLabelTxt, captionLabelTxt2, colorableTextColor, layout, onEasyRegion, onHardRegion, questdataContainer, srcDivider, visibleDifficultyContainer }: ElementDailyquestLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 250, height: 70, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 70 }}
            >
                <ElementDailyquestLayoutQuestdataContainer {...questdataContainer} />
                {(visibleDifficultyContainer ?? false) && (
                    <Region
                        name="difficulty_container"
                        layout={{ position: 'absolute', left: 39, width: 211, top: 45, height: 17 }}
                    >
                        <Region
                            name="easy_region"
                            onPointerTap={onEasyRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 0, width: 100, top: 0, height: 18 }}
                        >
                            <Region
                                name="label_txt"
                                layout={{ position: 'absolute', left: 0, width: 98, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionLabelTxt ?? t('landing.view.quest.easy')}
                                    textOptions={{ fill: colorableTextColor }}
                                />
                            </Region>
                        </Region>
                        <ThemeImage
                            name="divider"
                            src={srcDivider ?? layoutImage('landing_view_reception_horizontal.png')}
                            layout={{ position: 'absolute', right: 106, width: 2, top: 0, bottom: -3 }}
                        />
                        <Region
                            name="hard_region"
                            onPointerTap={onHardRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', left: 112, width: 99, top: 0, height: 18 }}
                        >
                            <Region
                                name="label_txt"
                                layout={{ position: 'absolute', left: 0, width: 99, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={captionLabelTxt2 ?? t('landing.view.quest.hard')}
                                    textOptions={{ fill: colorableTextColor }}
                                />
                            </Region>
                        </Region>
                    </Region>
                )}
            </Region>
        </Region>
    );
};

/** Named region `questdata_container` of ElementDailyquestLayout - configured through the parent's `questdataContainer` prop. */
export interface ElementDailyquestLayoutQuestdataContainerProps {
    captionAcceptText?: string;
    captionCancelQuestTxt?: string;
    captionCaptionTxt?: string;
    captionCurrentQuestTxt?: string;
    captionNextQuestTxt?: string;
    colorableTextColor?: string;
    layout?: BoxLayout;
    onAcceptButton?: () => void;
    onCancelQuestRegion?: () => void;
    onGoButton?: () => void;
    onNextQuestRegion?: () => void;
    visibleAcceptButton?: boolean;
    visibleNextQuestRegion?: boolean;
}

export const ElementDailyquestLayoutQuestdataContainer = ({ captionAcceptText, captionCancelQuestTxt, captionCaptionTxt, captionCurrentQuestTxt, captionNextQuestTxt, colorableTextColor, layout, onAcceptButton, onCancelQuestRegion, onGoButton, onNextQuestRegion, visibleAcceptButton, visibleNextQuestRegion }: ElementDailyquestLayoutQuestdataContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="questdata_container"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 70, ...layout }}
        >
            {(visibleAcceptButton ?? false) && (
                <ContainerButton
                    variant="102"
                    name="accept_button"
                    onPointerTap={onAcceptButton}
                    layout={{ position: 'absolute', left: 0, width: 250, top: 2, height: 39, minWidth: 250, maxWidth: 250 }}
                >
                    <Region layout={{ position: 'absolute', left: 5, top: 3, flexDirection: 'column' }}>
                        <Region
                            name="caption_txt"
                            layout={{ height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionCaptionTxt ?? 'DQ Title'} />
                        </Region>
                        <Region
                            name="accept_text"
                            layout={{ height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText text={captionAcceptText ?? t('landing.view.quest.accept')} />
                        </Region>
                    </Region>
                </ContainerButton>
            )}
            {(visibleNextQuestRegion ?? false) && (
                <Region
                    name="next_quest_region"
                    onPointerTap={onNextQuestRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 250, top: 45, height: 12 }}
                >
                    <Region
                        name="next_quest_txt"
                        layout={{ position: 'absolute', left: 0, width: 137, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionNextQuestTxt ?? 'PH: Show me another easy quest'}
                            textOptions={{ fill: colorableTextColor }}
                        />
                    </Region>
                </Region>
            )}
            <Region
                name="cancel_quest_region"
                onPointerTap={onCancelQuestRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 250, top: 55, height: 14 }}
            >
                <Region
                    name="cancel_quest_txt"
                    layout={{ position: 'absolute', left: 0, width: 105, top: 0, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCancelQuestTxt ?? t('landing.view.quest.cancel')}
                        textOptions={{ fill: colorableTextColor }}
                    />
                </Region>
            </Region>
            <Border
                variant="100"
                name="current_quest_border"
                layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 55 }}
            >
                <Button
                    variant="100"
                    name="go_button"
                    onPointerTap={onGoButton}
                    layout={{ position: 'absolute', right: -2, width: 88, top: 3, height: 50, minWidth: 88, maxWidth: 88 }}
                >
                    {t('landing.view.quest.go')}
                </Button>
                <Region
                    name="current_quest_txt"
                    layout={{ position: 'absolute', left: 13, width: 157, top: 10, height: 43, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCurrentQuestTxt ?? t('landing.view.quest.currenttask')}
                        textOptions={{ fill: colorableTextColor, wordWrap: true, wordWrapWidth: 157 }}
                    />
                </Region>
            </Border>
        </Region>
    );
};
