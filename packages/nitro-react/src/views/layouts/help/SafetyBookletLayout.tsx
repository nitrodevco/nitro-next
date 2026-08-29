import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2912_safety_booklet_xml` (layout "habbo_way", 500x540) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SafetyBookletLayoutProps {
    finalPage?: SafetyBookletLayoutFinalPageProps;
    finalPageNoQuestions?: SafetyBookletLayoutFinalPageNoQuestionsProps;
    layout?: BoxLayout;
    onFrameClose?: () => void;
    pageContainer?: SafetyBookletLayoutPageContainerProps;
    srcSafetyImage?: string;
    visibleFinalPage?: boolean;
    visibleFinalPageNoQuestions?: boolean;
    visiblePageContainer?: boolean;
}

export const SafetyBookletLayout = ({ finalPage, finalPageNoQuestions, layout, onFrameClose, pageContainer, srcSafetyImage, visibleFinalPage, visibleFinalPageNoQuestions, visiblePageContainer }: SafetyBookletLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 540, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 540, minHeight: 50 }}>
                <Frame
                    variant="101"
                    onClose={onFrameClose}
                    layout={{ position: 'absolute', left: 0, width: 500, top: 10, height: 530 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                        <Region layout={{ position: 'absolute', marginLeft: -1, marginRight: 1, top: 5, flexDirection: 'row', gap: 2 }}>
                            <WidgetSlot
                                widgetType="progress_indicator"
                                name="page_widget"
                                options={{ 'progress_indicator:style': 'etched', 'progress_indicator:size': '7' }}
                                layout={{ width: 88, height: 11, flexShrink: 0 }}
                            />
                            <ThemeImage
                                name="safety_image"
                                src={srcSafetyImage ?? '${image.library.url}safetyquiz/safety_off.png'}
                                layout={{ width: 30, height: 30, flexShrink: 0 }}
                            />
                        </Region>
                        {(visiblePageContainer ?? false) && (
                            <SafetyBookletLayoutPageContainer {...pageContainer} />
                        )}
                        {(visibleFinalPage ?? false) && (
                            <SafetyBookletLayoutFinalPage {...finalPage} />
                        )}
                        {(visibleFinalPageNoQuestions ?? false) && (
                            <SafetyBookletLayoutFinalPageNoQuestions {...finalPageNoQuestions} />
                        )}
                        <Border
                            variant="102"
                            name="safety.quiz.explanation"
                            layout={{ position: 'absolute', left: 10, width: 480, top: 40, height: 45 }}
                        >
                            <ThemeImage
                                src={layoutImage('common_info_icon_grey.png')}
                                layout={{ position: 'absolute', left: 32, width: 23, top: 12, height: 24 }}
                            />
                            <Region layout={{ position: 'absolute', left: 62, width: 153, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <ThemeText
                                    text={t('safety.booklet.explanation.1')}
                                    textOptions={{ fill: '#222222' }}
                                />
                            </Region>
                            <Region layout={{ position: 'absolute', left: 62, width: 150, top: 22, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <ThemeText
                                    text={t('safety.booklet.explanation.2')}
                                    textOptions={{ fill: '#222222' }}
                                />
                            </Region>
                        </Border>
                    </Region>
                </Frame>
                <Region layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 80 }}>
                    <Region layout={{ position: 'absolute', left: 0, width: 166, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('safety.booklet.frame.subtitle')}
                            textStyle="text-style-il-frame-modal-title"
                        />
                    </Region>
                    <Region layout={{ position: 'absolute', left: 0, width: 304, top: 16, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <ThemeText
                            text={t('safety.booklet.frame.title')}
                            textStyle="text-style-il-frame-modal-title"
                        />
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};

/** Named region `page_container` of SafetyBookletLayout - configured through the parent's `pageContainer` prop. */
export interface SafetyBookletLayoutPageContainerProps {
    captionDescription?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    onNextButton?: () => void;
    onPreviousButton?: () => void;
    srcIllustration?: string;
    visiblePageContainer?: boolean;
}

export const SafetyBookletLayoutPageContainer = ({ captionDescription, captionTitle, layout, onNextButton, onPreviousButton, srcIllustration, visiblePageContainer }: SafetyBookletLayoutPageContainerProps) => {
    const t = useTranslation();

    return (
        (visiblePageContainer ?? false) && (
            <Region
                name="page_container"
                layout={{ position: 'absolute', left: 0, width: 500, top: 60, height: 420, ...layout }}
            >
                <WidgetSlot
                    widgetType="separator"
                    options={{ 'separator:vertical': 'true' }}
                    layout={{ position: 'absolute', left: 240, width: 20, top: 50, height: 280 }}
                />
                <ThemeImage
                    name="illustration"
                    src={srcIllustration}
                    layout={{ position: 'absolute', left: 0, width: 250, top: 50, height: 280 }}
                />
                <Region layout={{ position: 'absolute', left: 270, width: 210, top: 80, height: 250, flexDirection: 'column', gap: 20 }}>
                    <Region
                        name="title"
                        layout={{ width: 210, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionTitle ?? 'Title'}
                            textStyle="text-style-il-heading-1"
                            textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                        />
                    </Region>
                    <Region
                        name="description"
                        layout={{ width: 210, height: 53, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionDescription ?? 'Keep your full name, address, phone numbers, photos and school name secret so nobody can scam, bully you or place you in danger.'}
                            textOptions={{ wordWrap: true, wordWrapWidth: 210 }}
                        />
                    </Region>
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

/** Named region `final_page` of SafetyBookletLayout - configured through the parent's `finalPage` prop. */
export interface SafetyBookletLayoutFinalPageProps {
    layout?: BoxLayout;
    onBackButton?: () => void;
    onQuizButton?: () => void;
    srcIllustration?: string;
    visibleFinalPage?: boolean;
}

export const SafetyBookletLayoutFinalPage = ({ layout, onBackButton, onQuizButton, srcIllustration, visibleFinalPage }: SafetyBookletLayoutFinalPageProps) => {
    const t = useTranslation();

    return (
        (visibleFinalPage ?? false) && (
            <Region
                name="final_page"
                layout={{ position: 'absolute', left: 0, width: 500, top: 60, height: 420, ...layout }}
            >
                <Region layout={{ position: 'absolute', left: 10, width: 480, top: 48, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text={t('safety.booklet.end.title')}
                        textStyle="text-style-il-heading-1"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 100, width: 300, top: 275, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('safety.booklet.end.content')}
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
                    src="${image.library.url}safetyquiz/start_quiz.png"
                    layout={{ position: 'absolute', left: 150, width: 200, top: 62, height: 210 }}
                />
            </Region>
        )
    );
};

/** Named region `final_page_no_questions` of SafetyBookletLayout - configured through the parent's `finalPageNoQuestions` prop. */
export interface SafetyBookletLayoutFinalPageNoQuestionsProps {
    layout?: BoxLayout;
    onBackButton?: () => void;
    onOkButton?: () => void;
    srcIllustration?: string;
    visibleFinalPageNoQuestions?: boolean;
}

export const SafetyBookletLayoutFinalPageNoQuestions = ({ layout, onBackButton, onOkButton, srcIllustration, visibleFinalPageNoQuestions }: SafetyBookletLayoutFinalPageNoQuestionsProps) => {
    const t = useTranslation();

    return (
        (visibleFinalPageNoQuestions ?? false) && (
            <Region
                name="final_page_no_questions"
                layout={{ position: 'absolute', left: 0, width: 500, top: 60, height: 420, ...layout }}
            >
                <Region layout={{ position: 'absolute', left: 10, width: 480, top: 48, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <ThemeText
                        text={t('safety.booklet.ok.title')}
                        textStyle="text-style-il-heading-1"
                        textOptions={{ align: 'center' }}
                    />
                </Region>
                <Region layout={{ position: 'absolute', left: 100, width: 300, top: 275, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('safety.booklet.ok.content')}
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
                    name="ok_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onOkButton}
                    layout={{ position: 'absolute', right: 19, width: 162, top: 350, height: 60 }}
                >
                    {t('habbo.way.ok.button')}
                </Button>
                <ThemeImage
                    src="${image.library.url}safetyquiz/start_quiz.png"
                    layout={{ position: 'absolute', left: 150, width: 200, top: 62, height: 210 }}
                />
            </Region>
        )
    );
};
