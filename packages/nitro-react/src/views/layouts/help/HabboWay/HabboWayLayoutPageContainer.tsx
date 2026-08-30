import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Named region `page_container` of HabboWayLayout - configured through the parent's `pageContainer` prop. */
export interface HabboWayLayoutPageContainerProps {
    captionCorrectDescription?: string;
    captionCorrectTitle?: string;
    captionWrongDescription?: string;
    captionWrongTitle?: string;
    layout?: BoxLayout;
    onNextButton?: () => void;
    onPreviousButton?: () => void;
    separatorWidget?: ReactNode;
    separatorWidget2?: ReactNode;
    separatorWidget3?: ReactNode;
    srcCorrectTitleIcon?: string;
    srcIllustration?: string;
    srcWrongTitleIcon?: string;
    visiblePageContainer?: boolean;
}

export const HabboWayLayoutPageContainer = ({ captionCorrectDescription, captionCorrectTitle, captionWrongDescription, captionWrongTitle, layout, onNextButton, onPreviousButton, separatorWidget, separatorWidget2, separatorWidget3, srcCorrectTitleIcon, srcIllustration, srcWrongTitleIcon, visiblePageContainer }: HabboWayLayoutPageContainerProps) => {
    const t = useTranslation();

    return (
        (visiblePageContainer ?? false) && (
            <Region
                name="page_container"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 420, ...layout }}
            >
                <WidgetSlot
                    widgetType="separator"
                    options={{ 'separator:vertical': 'true' }}
                    layout={{ position: 'absolute', left: 245, width: 10, top: 30, height: 275 }}
                >
                    {separatorWidget}
                </WidgetSlot>
                <ThemeImage
                    name="illustration"
                    src={srcIllustration}
                    layout={{ position: 'absolute', left: 20, width: 460, top: 30, height: 220 }}
                />
                <ThemeImage
                    name="correct_title_icon"
                    src={srcCorrectTitleIcon ?? layoutImage('help_habboway_correct.png')}
                    layout={{ position: 'absolute', left: 30, width: 20, top: 255, height: 30 }}
                />
                <ThemeText
                    text={captionCorrectTitle ?? 'Playing'}
                    textStyle="text-style-il-heading-1"
                    name="correct_title"
                    layout={{ position: 'absolute', left: 50, width: 53, top: 265, height: 19 }}
                />
                <ThemeText
                    text={captionCorrectDescription ?? 'In Habbo you can play many games, be who you want to be and have fun...'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                    name="correct_description"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 30, width: 210, top: 290, height: 70 }}
                />
                <ThemeImage
                    name="wrong_title_icon"
                    src={srcWrongTitleIcon ?? layoutImage('help_habboway_wrong.png')}
                    layout={{ position: 'absolute', left: 270, width: 20, top: 255, height: 30 }}
                />
                <ThemeText
                    text={captionWrongTitle ?? 'Bullying'}
                    textStyle="text-style-il-heading-1"
                    name="wrong_title"
                    layout={{ position: 'absolute', left: 290, width: 57, top: 265, height: 19 }}
                />
                <ThemeText
                    text={captionWrongDescription ?? 'as%20long%20as%20you%20don%u2019t%20hurt%20anyone%u2019s%20beliefs.%20Respect%20each%20and%20every%20other%20user.'}
                    textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                    name="wrong_description"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 270, width: 210, top: 290, height: 70 }}
                />
                <ContainerButton
                    variant="101"
                    name="previous_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onPreviousButton}
                    layout={{ position: 'absolute', left: 21, width: 197, top: 350, height: 60 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, right: 0, top: 15, flexDirection: 'row' }}>
                        <Region layout={{ width: 15, height: 30, flexShrink: 0 }} />
                        <ThemeImage
                            src={layoutImage('help_habboway_prev.png')}
                            layout={{ width: 20, height: 30, flexShrink: 0 }}
                        />
                        <WidgetSlot
                            widgetType="separator"
                            options={{ 'separator:vertical': 'true' }}
                            layout={{ width: 2, height: 22, flexShrink: 0 }}
                        >
                            {separatorWidget2}
                        </WidgetSlot>
                        <ThemeText
                            text={t('habbo.way.previous.button')}
                            textStyle="text-style-il-button"
                            layout={{ width: 140, height: 15, flexShrink: 0 }}
                        />
                        <Region layout={{ width: 20, height: 30, flexShrink: 0 }} />
                    </Region>
                </ContainerButton>
                <ContainerButton
                    variant="101"
                    name="next_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onNextButton}
                    layout={{ position: 'absolute', right: 19, width: 178, top: 350, height: 60 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, right: 0, top: 15, flexDirection: 'row' }}>
                        <Region layout={{ width: 20, height: 30, flexShrink: 0 }} />
                        <ThemeText
                            text={t('habbo.way.next.button')}
                            textStyle="text-style-il-button"
                            layout={{ width: 121, height: 15, flexShrink: 0 }}
                        />
                        <WidgetSlot
                            widgetType="separator"
                            options={{ 'separator:vertical': 'true' }}
                            layout={{ width: 2, height: 22, flexShrink: 0 }}
                        >
                            {separatorWidget3}
                        </WidgetSlot>
                        <ThemeImage
                            src={layoutImage('help_habboway_next.png')}
                            layout={{ width: 20, height: 30, flexShrink: 0 }}
                        />
                        <Region layout={{ width: 15, height: 30, flexShrink: 0 }} />
                    </Region>
                </ContainerButton>
            </Region>
        )
    );
};
