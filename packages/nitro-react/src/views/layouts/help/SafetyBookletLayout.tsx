import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ContainerButton, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2912_safety_booklet_xml` (layout "habbo_way", 500x540) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SafetyBookletLayoutProps {
    captionDescription?: string;
    captionTitle?: string;
    layout?: BoxLayout;
    onBackButton?: () => void;
    onBackButton2?: () => void;
    onFrameClose?: () => void;
    onNextButton?: () => void;
    onOkButton?: () => void;
    onPreviousButton?: () => void;
    onQuizButton?: () => void;
    srcIllustration?: string;
    srcIllustration2?: string;
    srcIllustration3?: string;
    srcSafetyImage?: string;
    visibleFinalPage?: boolean;
    visibleFinalPageNoQuestions?: boolean;
    visiblePageContainer?: boolean;
}

export const SafetyBookletLayout = ({ captionDescription, captionTitle, layout, onBackButton, onBackButton2, onFrameClose, onNextButton, onOkButton, onPreviousButton, onQuizButton, srcIllustration, srcIllustration2, srcIllustration3, srcSafetyImage, visibleFinalPage, visibleFinalPageNoQuestions, visiblePageContainer }: SafetyBookletLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 540, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 540, minHeight: 50 }}>
                <Frame
                    variant="101"
                    params={1}
                    onClose={onFrameClose}
                    layout={{ position: 'absolute', left: 0, width: 500, top: 10, height: 530 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                        <Region
                            params={147664}
                            layout={{ position: 'absolute', top: 5, flexDirection: 'row', gap: 2 }}
                        >
                            <WidgetSlot
                                widgetType="progress_indicator"
                                name="page_widget"
                                params={933904}
                                options={{ 'progress_indicator:style': 'etched', 'progress_indicator:size': '7' }}
                                layout={{ width: 88, height: 11, flexShrink: 0 }}
                            />
                            <ThemeImage
                                name="safety_image"
                                params={16}
                                src={srcSafetyImage ?? '${image.library.url}safetyquiz/safety_off.png'}
                                layout={{ width: 30, height: 30, flexShrink: 0 }}
                            />
                        </Region>
                        <Region
                            name="page_container"
                            params={16}
                            visible={visiblePageContainer ?? false}
                            layout={{ position: 'absolute', left: 0, width: 500, top: 60, height: 420 }}
                        >
                            <WidgetSlot
                                widgetType="separator"
                                params={16}
                                options={{ 'separator:vertical': 'true' }}
                                layout={{ position: 'absolute', left: 240, width: 20, top: 50, height: 280 }}
                            />
                            <ThemeImage
                                name="illustration"
                                params={16}
                                src={srcIllustration}
                                layout={{ position: 'absolute', left: 0, width: 250, top: 50, height: 280 }}
                            />
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 270, width: 210, top: 80, height: 250, flexDirection: 'column', gap: 20 }}
                            >
                                <Region
                                    name="title"
                                    params={16}
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
                                    params={16}
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
                                params={147473}
                                tintColor="#bbbbbb"
                                onPointerTap={onPreviousButton}
                                layout={{ position: 'absolute', left: 21, width: 197, top: 350, height: 60 }}
                            >
                                <Region
                                    params={147472}
                                    layout={{ position: 'absolute', left: 0, top: 15, flexDirection: 'row' }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ width: 15, height: 30, flexShrink: 0 }}
                                    />
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('help_habboway_prev.png')}
                                        layout={{ width: 20, height: 30, flexShrink: 0 }}
                                    />
                                    <WidgetSlot
                                        widgetType="separator"
                                        params={16}
                                        options={{ 'separator:vertical': 'true' }}
                                        layout={{ width: 2, height: 22, flexShrink: 0 }}
                                    />
                                    <Region
                                        params={16}
                                        layout={{ width: 140, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('habbo.way.previous.button')}
                                            textStyle="text-style-il-button"
                                        />
                                    </Region>
                                    <Region
                                        params={16}
                                        layout={{ width: 20, height: 30, flexShrink: 0 }}
                                    />
                                </Region>
                            </ContainerButton>
                            <ContainerButton
                                variant="101"
                                name="next_button"
                                params={409617}
                                tintColor="#bbbbbb"
                                onPointerTap={onNextButton}
                                layout={{ position: 'absolute', right: 19, width: 178, top: 350, height: 60 }}
                            >
                                <Region
                                    params={147472}
                                    layout={{ position: 'absolute', left: 0, top: 15, flexDirection: 'row' }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ width: 20, height: 30, flexShrink: 0 }}
                                    />
                                    <Region
                                        params={16}
                                        layout={{ width: 121, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('habbo.way.next.button')}
                                            textStyle="text-style-il-button"
                                        />
                                    </Region>
                                    <WidgetSlot
                                        widgetType="separator"
                                        params={16}
                                        options={{ 'separator:vertical': 'true' }}
                                        layout={{ width: 2, height: 22, flexShrink: 0 }}
                                    />
                                    <ThemeImage
                                        params={16}
                                        src={layoutImage('help_habboway_next.png')}
                                        layout={{ width: 20, height: 30, flexShrink: 0 }}
                                    />
                                    <Region
                                        params={16}
                                        layout={{ width: 15, height: 30, flexShrink: 0 }}
                                    />
                                </Region>
                            </ContainerButton>
                        </Region>
                        <Region
                            name="final_page"
                            params={16}
                            visible={visibleFinalPage ?? false}
                            layout={{ position: 'absolute', left: 0, width: 500, top: 60, height: 420 }}
                        >
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 10, width: 480, top: 48, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('safety.booklet.end.title')}
                                    textStyle="text-style-il-heading-1"
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 100, width: 300, top: 275, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('safety.booklet.end.content')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 300 }}
                                />
                            </Region>
                            <WidgetSlot
                                widgetType="separator"
                                params={16}
                                layout={{ position: 'absolute', left: 10, width: 480, top: 320, height: 30 }}
                            />
                            <ContainerButton
                                variant="101"
                                name="back_button"
                                params={147473}
                                tintColor="#bbbbbb"
                                onPointerTap={onBackButton}
                                layout={{ position: 'absolute', left: 21, width: 177, top: 350, height: 60 }}
                            >
                                <Region
                                    params={147472}
                                    layout={{ position: 'absolute', left: 0, top: 15, flexDirection: 'row' }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ width: 15, height: 30, flexShrink: 0 }}
                                    />
                                    <ThemeImage
                                        name="illustration"
                                        params={16}
                                        src={srcIllustration2 ?? layoutImage('help_habboway_prev.png')}
                                        layout={{ width: 20, height: 30, flexShrink: 0 }}
                                    />
                                    <WidgetSlot
                                        widgetType="separator"
                                        params={16}
                                        options={{ 'separator:vertical': 'true' }}
                                        layout={{ width: 2, height: 22, flexShrink: 0 }}
                                    />
                                    <Region
                                        params={16}
                                        layout={{ width: 120, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('habbo.way.back.button')}
                                            textStyle="text-style-il-button"
                                        />
                                    </Region>
                                    <Region
                                        params={16}
                                        layout={{ width: 20, height: 30, flexShrink: 0 }}
                                    />
                                </Region>
                            </ContainerButton>
                            <Button
                                variant="101"
                                name="quiz_button"
                                params={393233}
                                tintColor="#bbbbbb"
                                onPointerTap={onQuizButton}
                                layout={{ position: 'absolute', right: 19, width: 162, top: 350, height: 60 }}
                            >
                                {t('habbo.way.quiz.button')}
                            </Button>
                            <ThemeImage
                                params={16}
                                src="${image.library.url}safetyquiz/start_quiz.png"
                                layout={{ position: 'absolute', left: 150, width: 200, top: 62, height: 210 }}
                            />
                        </Region>
                        <Region
                            name="final_page_no_questions"
                            params={16}
                            visible={visibleFinalPageNoQuestions ?? false}
                            layout={{ position: 'absolute', left: 0, width: 500, top: 60, height: 420 }}
                        >
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 10, width: 480, top: 48, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={t('safety.booklet.ok.title')}
                                    textStyle="text-style-il-heading-1"
                                    textOptions={{ align: 'center' }}
                                />
                            </Region>
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 100, width: 300, top: 275, height: 16, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('safety.booklet.ok.content')}
                                    textOptions={{ wordWrap: true, wordWrapWidth: 300 }}
                                />
                            </Region>
                            <WidgetSlot
                                widgetType="separator"
                                params={16}
                                layout={{ position: 'absolute', left: 10, width: 480, top: 320, height: 30 }}
                            />
                            <ContainerButton
                                variant="101"
                                name="back_button"
                                params={147473}
                                tintColor="#bbbbbb"
                                onPointerTap={onBackButton2}
                                layout={{ position: 'absolute', left: 21, width: 177, top: 350, height: 60 }}
                            >
                                <Region
                                    params={147472}
                                    layout={{ position: 'absolute', left: 0, top: 15, flexDirection: 'row' }}
                                >
                                    <Region
                                        params={16}
                                        layout={{ width: 15, height: 30, flexShrink: 0 }}
                                    />
                                    <ThemeImage
                                        name="illustration"
                                        params={16}
                                        src={srcIllustration3 ?? layoutImage('help_habboway_prev.png')}
                                        layout={{ width: 20, height: 30, flexShrink: 0 }}
                                    />
                                    <WidgetSlot
                                        widgetType="separator"
                                        params={16}
                                        options={{ 'separator:vertical': 'true' }}
                                        layout={{ width: 2, height: 22, flexShrink: 0 }}
                                    />
                                    <Region
                                        params={16}
                                        layout={{ width: 120, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        <ThemeText
                                            text={t('habbo.way.back.button')}
                                            textStyle="text-style-il-button"
                                        />
                                    </Region>
                                    <Region
                                        params={16}
                                        layout={{ width: 20, height: 30, flexShrink: 0 }}
                                    />
                                </Region>
                            </ContainerButton>
                            <Button
                                variant="101"
                                name="ok_button"
                                params={393233}
                                tintColor="#bbbbbb"
                                onPointerTap={onOkButton}
                                layout={{ position: 'absolute', right: 19, width: 162, top: 350, height: 60 }}
                            >
                                {t('habbo.way.ok.button')}
                            </Button>
                            <ThemeImage
                                params={16}
                                src="${image.library.url}safetyquiz/start_quiz.png"
                                layout={{ position: 'absolute', left: 150, width: 200, top: 62, height: 210 }}
                            />
                        </Region>
                        <Border
                            variant="102"
                            name="safety.quiz.explanation"
                            params={16}
                            layout={{ position: 'absolute', left: 10, width: 480, top: 40, height: 45 }}
                        >
                            <ThemeImage
                                params={16}
                                src={layoutImage('common_info_icon_grey.png')}
                                layout={{ position: 'absolute', left: 32, width: 23, top: 12, height: 24 }}
                            />
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 62, width: 153, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('safety.booklet.explanation.1')}
                                    textOptions={{ fill: '#222222' }}
                                />
                            </Region>
                            <Region
                                params={16}
                                layout={{ position: 'absolute', left: 62, width: 150, top: 22, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <ThemeText
                                    text={t('safety.booklet.explanation.2')}
                                    textOptions={{ fill: '#222222' }}
                                />
                            </Region>
                        </Border>
                    </Region>
                </Frame>
                <Region layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 80 }}>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 166, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={t('safety.booklet.frame.subtitle')}
                            textStyle="text-style-il-frame-modal-title"
                        />
                    </Region>
                    <Region
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 304, top: 16, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
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
