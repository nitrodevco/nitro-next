import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Region, ThemeText } from '#base/theme';

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
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            {(visibleAcceptButton ?? false) && (
                <ContainerButton
                    variant="102"
                    name="accept_button"
                    onPointerTap={onAcceptButton}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 2, height: 39, minWidth: 250, maxWidth: 250 }}
                >
                    <Region layout={{ position: 'absolute', left: 5, top: 3, flexDirection: 'column' }}>
                        <Region
                            name="caption_txt"
                            layout={{ height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionCaptionTxt ?? 'DQ Title'}
                        </Region>
                        <Region
                            name="accept_text"
                            layout={{ height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionAcceptText ?? t('landing.view.quest.accept')}
                        </Region>
                    </Region>
                </ContainerButton>
            )}
            {(visibleNextQuestRegion ?? false) && (
                <Region
                    name="next_quest_region"
                    onPointerTap={onNextQuestRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 45, height: 12 }}
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
                layout={{ position: 'absolute', left: 0, right: 0, top: 55, height: 14 }}
            >
                <Region
                    name="cancel_quest_txt"
                    layout={{ position: 'absolute', left: 0, width: 105, top: 0, bottom: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
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
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 55 }}
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
