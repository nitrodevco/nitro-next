import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, ThemeText } from '#base/theme';

/** Named region `content_container` of DailyQuestLayout - configured through the parent's `contentContainer` prop. */
export interface DailyQuestLayoutContentContainerProps {
    captionCancelQuestTxt?: string;
    captionCaptionTxt?: string;
    captionCurrentQuestTxt?: string;
    captionInfoTxt?: string;
    captionNextQuestTxt?: string;
    layout?: BoxLayout;
    onAcceptButton?: () => void;
    onCancelQuestRegion?: () => void;
    onGoButton?: () => void;
    onNextQuestRegion?: () => void;
}

export const DailyQuestLayoutContentContainer = ({ captionCancelQuestTxt, captionCaptionTxt, captionCurrentQuestTxt, captionInfoTxt, captionNextQuestTxt, layout, onAcceptButton, onCancelQuestRegion, onGoButton, onNextQuestRegion }: DailyQuestLayoutContentContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="content_container"
            backgroundColor="#000000"
            layout={{ position: 'absolute', left: 230, width: 270, top: 0, bottom: 0, ...layout }}
        >
            <ThemeText
                text={captionCaptionTxt ?? 'Caption PH'}
                textStyle="text-style-il-heading-1"
                name="caption_txt"
                layout={{ position: 'absolute', left: 0, width: 94, top: 32, height: 24 }}
            />
            <ThemeText
                text={captionInfoTxt ?? '...and everything must go, so get yourself some of the sweet, sweet plastic fantastic while you still can! You don\'t want to miss out on the classics!'}
                textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
                name="info_txt"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, right: 0, top: 61, height: 41 }}
            />
            <Button
                variant="100"
                name="accept_button"
                onPointerTap={onAcceptButton}
                layout={{ position: 'absolute', left: -11, width: 178, top: 91, height: 50 }}
            >
                {t('landing.view.quest.accept')}
            </Button>
            <Region
                name="next_quest_region"
                onPointerTap={onNextQuestRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 253, top: 139, height: 19 }}
            >
                <ThemeText
                    text={captionNextQuestTxt ?? 'PH: Show me another easy quest'}
                    name="next_quest_txt"
                    layout={{ position: 'absolute', left: 0, width: 137, top: 0, height: 14 }}
                />
            </Region>
            <Region
                name="cancel_quest_region"
                onPointerTap={onCancelQuestRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 253, top: 152, height: 19 }}
            >
                <ThemeText
                    text={captionCancelQuestTxt ?? t('landing.view.quest.cancel')}
                    name="cancel_quest_txt"
                    layout={{ position: 'absolute', left: 0, width: 105, top: 0, height: 14 }}
                />
            </Region>
            <Border
                variant="100"
                name="current_quest_border"
                layout={{ position: 'absolute', left: 0, width: 271, top: 101, height: 46 }}
            >
                <Button
                    variant="100"
                    name="go_button"
                    onPointerTap={onGoButton}
                    layout={{ position: 'absolute', right: -1, width: 88, top: -2, height: 50, minWidth: 88, maxWidth: 88 }}
                >
                    {t('landing.view.quest.go')}
                </Button>
                <ThemeText
                    text={captionCurrentQuestTxt ?? t('landing.view.quest.currenttask')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 174 }}
                    name="current_quest_txt"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 13, width: 174, top: 10, height: 34 }}
                />
            </Border>
        </Region>
    );
};
