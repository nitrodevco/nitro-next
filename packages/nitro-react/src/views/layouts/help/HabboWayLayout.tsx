import { useTranslation } from '#base/context';
import { BoxLayout, Button, ContainerButton, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2908_habbo_way_xml` (layout "habbo_way", 500x500) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface HabboWayLayoutProps {
    finalPage?: HabboWayLayoutFinalPageProps;
    layout?: BoxLayout;
    onFrameClose?: () => void;
    pageContainer?: HabboWayLayoutPageContainerProps;
    srcDoveImage?: string;
    visibleFinalPage?: boolean;
    visiblePageContainer?: boolean;
}

export const HabboWayLayout = ({ finalPage, layout, onFrameClose, pageContainer, srcDoveImage, visibleFinalPage, visiblePageContainer }: HabboWayLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 500, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 500, minHeight: 50 }}>
                <Frame
                    variant="101"
                    onClose={onFrameClose}
                    layout={{ position: 'absolute', left: 0, width: 500, top: 10, height: 470 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                        <Region layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, top: 0, flexDirection: 'row', gap: 2 }}>
                            <WidgetSlot
                                widgetType="progress_indicator"
                                name="page_widget"
                                options={{ 'progress_indicator:style': 'etched', 'progress_indicator:size': '6' }}
                                layout={{ width: 75, height: 11, flexShrink: 0 }}
                            />
                            <ThemeImage
                                name="dove_image"
                                src={srcDoveImage ?? layoutImage('help_habboway_dove_off.png')}
                                layout={{ width: 25, height: 25, flexShrink: 0 }}
                            />
                        </Region>
                        {(visiblePageContainer ?? false) && (
                            <HabboWayLayoutPageContainer {...pageContainer} />
                        )}
                        {(visibleFinalPage ?? false) && (
                            <HabboWayLayoutFinalPage {...finalPage} />
                        )}
                    </Region>
                </Frame>
                <Region layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 80 }}>
                    <Region layout={{ position: 'absolute', left: 0, width: 145, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('habbo.way.frame.subtitle')}
                            textStyle="text-style-il-frame-modal-title"
                        />
                    </Region>
                    <Region layout={{ position: 'absolute', left: 0, width: 258, top: 16, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('habbo.way.frame.title')}
                            textStyle="text-style-il-frame-modal-title"
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `page_container` of HabboWayLayout - configured through the parent's `pageContainer` prop. */
export interface HabboWayLayoutPageContainerProps {
    captionCorrectDescription?: string;
    captionCorrectTitle?: string;
    captionWrongDescription?: string;
    captionWrongTitle?: string;
    layout?: BoxLayout;
    onNextButton?: () => void;
    onPreviousButton?: () => void;
    srcCorrectTitleIcon?: string;
    srcIllustration?: string;
    srcWrongTitleIcon?: string;
    visiblePageContainer?: boolean;
}

export const HabboWayLayoutPageContainer = ({ captionCorrectDescription, captionCorrectTitle, captionWrongDescription, captionWrongTitle, layout, onNextButton, onPreviousButton, srcCorrectTitleIcon, srcIllustration, srcWrongTitleIcon, visiblePageContainer }: HabboWayLayoutPageContainerProps) => {
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
                />
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
                <Region
                    name="correct_title"
                    layout={{ position: 'absolute', left: 50, width: 53, top: 265, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCorrectTitle ?? 'Playing'}
                        textStyle="text-style-il-heading-1"
                    />
                </Region>
                <Region
                    name="correct_description"
                    layout={{ position: 'absolute', left: 30, width: 210, top: 290, height: 70, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCorrectDescription ?? 'In Habbo you can play many games, be who you want to be and have fun...'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                    />
                </Region>
                <ThemeImage
                    name="wrong_title_icon"
                    src={srcWrongTitleIcon ?? layoutImage('help_habboway_wrong.png')}
                    layout={{ position: 'absolute', left: 270, width: 20, top: 255, height: 30 }}
                />
                <Region
                    name="wrong_title"
                    layout={{ position: 'absolute', left: 290, width: 57, top: 265, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionWrongTitle ?? 'Bullying'}
                        textStyle="text-style-il-heading-1"
                    />
                </Region>
                <Region
                    name="wrong_description"
                    layout={{ position: 'absolute', left: 270, width: 210, top: 290, height: 70, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionWrongDescription ?? 'as%20long%20as%20you%20don%u2019t%20hurt%20anyone%u2019s%20beliefs.%20Respect%20each%20and%20every%20other%20user.'}
                        textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                    />
                </Region>
                <ContainerButton
                    variant="101"
                    name="previous_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onPreviousButton}
                    layout={{ position: 'absolute', left: 21, width: 197, top: 350, height: 60 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, top: 15, flexDirection: 'row' }}>
                        <Region layout={{ width: 15, height: 30, flexShrink: 0 }} />
                        <ThemeImage
                            src={layoutImage('help_habboway_prev.png')}
                            layout={{ width: 20, height: 30, flexShrink: 0 }}
                        />
                        <WidgetSlot
                            widgetType="separator"
                            options={{ 'separator:vertical': 'true' }}
                            layout={{ width: 2, height: 22, flexShrink: 0 }}
                        />
                        <Region layout={{ width: 140, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('habbo.way.previous.button')}
                                textStyle="text-style-il-button"
                            />
                        </Region>
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
                    <Region layout={{ position: 'absolute', left: 0, top: 15, flexDirection: 'row' }}>
                        <Region layout={{ width: 20, height: 30, flexShrink: 0 }} />
                        <Region layout={{ width: 121, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('habbo.way.next.button')}
                                textStyle="text-style-il-button"
                            />
                        </Region>
                        <WidgetSlot
                            widgetType="separator"
                            options={{ 'separator:vertical': 'true' }}
                            layout={{ width: 2, height: 22, flexShrink: 0 }}
                        />
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

/** Named region `final_page` of HabboWayLayout - configured through the parent's `finalPage` prop. */
export interface HabboWayLayoutFinalPageProps {
    layout?: BoxLayout;
    onBackButton?: () => void;
    onQuizButton?: () => void;
    srcIllustration?: string;
    visibleFinalPage?: boolean;
}

export const HabboWayLayoutFinalPage = ({ layout, onBackButton, onQuizButton, srcIllustration, visibleFinalPage }: HabboWayLayoutFinalPageProps) => {
    const t = useTranslation();

    return (
        (visibleFinalPage ?? false) && (
            <Region
                name="final_page"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 420, ...layout }}
            >
                <Region layout={{ position: 'absolute', left: 10, width: 480, top: 48, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text={t('habbo.way.end.title')}
                        textStyle="text-style-il-heading-1"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 100, width: 300, top: 275, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('habbo.way.end.content')}
                        textOptions={{ wordWrap: true, wordWrapWidth: 300 }}
                    />
                </Region>
                <WidgetSlot
                    widgetType="separator"
                    layout={{ position: 'absolute', left: 10, width: 480, top: 320, height: 30 }}
                />
                <ContainerButton
                    variant="101"
                    name="back_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onBackButton}
                    layout={{ position: 'absolute', left: 21, width: 177, top: 350, height: 60 }}
                >
                    <Region layout={{ position: 'absolute', left: 0, top: 15, flexDirection: 'row' }}>
                        <Region layout={{ width: 15, height: 30, flexShrink: 0 }} />
                        <ThemeImage
                            name="illustration"
                            src={srcIllustration ?? layoutImage('help_habboway_prev.png')}
                            layout={{ width: 20, height: 30, flexShrink: 0 }}
                        />
                        <WidgetSlot
                            widgetType="separator"
                            options={{ 'separator:vertical': 'true' }}
                            layout={{ width: 2, height: 22, flexShrink: 0 }}
                        />
                        <Region layout={{ width: 120, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <ThemeText
                                text={t('habbo.way.back.button')}
                                textStyle="text-style-il-button"
                            />
                        </Region>
                        <Region layout={{ width: 20, height: 30, flexShrink: 0 }} />
                    </Region>
                </ContainerButton>
                <Button
                    variant="101"
                    name="quiz_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onQuizButton}
                    layout={{ position: 'absolute', right: 19, width: 162, top: 350, height: 60 }}
                >
                    {t('habbo.way.quiz.button')}
                </Button>
                <ThemeImage
                    src="${image.library.url}habboway/quiz_title.png"
                    layout={{ position: 'absolute', left: 150, width: 200, top: 62, height: 210 }}
                />
            </Region>
        )
    );
};
