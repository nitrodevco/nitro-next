import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { SafetyBookletLayoutFinalPage, SafetyBookletLayoutFinalPageProps } from './SafetyBookletLayoutFinalPage';
import { SafetyBookletLayoutFinalPageNoQuestions, SafetyBookletLayoutFinalPageNoQuestionsProps } from './SafetyBookletLayoutFinalPageNoQuestions';
import { SafetyBookletLayoutPageContainer, SafetyBookletLayoutPageContainerProps } from './SafetyBookletLayoutPageContainer';

/** Generated from `2912_safety_booklet_xml` (layout "habbo_way", 500x540) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SafetyBookletLayoutProps {
    finalPage?: SafetyBookletLayoutFinalPageProps;
    finalPageNoQuestions?: SafetyBookletLayoutFinalPageNoQuestionsProps;
    layout?: BoxLayout;
    onFrameClose?: () => void;
    pageContainer?: SafetyBookletLayoutPageContainerProps;
    pageWidget?: ReactNode;
    srcSafetyImage?: string;
    visibleFinalPage?: boolean;
    visibleFinalPageNoQuestions?: boolean;
    visiblePageContainer?: boolean;
}

export const SafetyBookletLayout = ({ finalPage, finalPageNoQuestions, layout, onFrameClose, pageContainer, pageWidget, srcSafetyImage, visibleFinalPage, visibleFinalPageNoQuestions, visiblePageContainer }: SafetyBookletLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 500, height: 540, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minHeight: 50 }}>
                <Frame
                    variant="101"
                    onClose={onFrameClose}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 10, height: 530 }}
                >
                    <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                        <Region layout={{ position: 'absolute', marginLeft: 5, marginRight: -5, top: 5, flexDirection: 'row', gap: 2 }}>
                            <WidgetSlot
                                widgetType="progress_indicator"
                                name="page_widget"
                                options={{ 'progress_indicator:style': 'etched', 'progress_indicator:size': '7' }}
                                layout={{ width: 88, height: 11, flexShrink: 0 }}
                            >
                                {pageWidget}
                            </WidgetSlot>
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
                            <ThemeText
                                text={t('safety.booklet.explanation.1')}
                                textOptions={{ fill: '#222222' }}
                                layout={{ position: 'absolute', left: 62, width: 153, top: 9, height: 16 }}
                            />
                            <ThemeText
                                text={t('safety.booklet.explanation.2')}
                                textOptions={{ fill: '#222222' }}
                                layout={{ position: 'absolute', left: 62, width: 150, top: 22, height: 16 }}
                            />
                        </Border>
                    </Region>
                </Frame>
                <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 80 }}>
                    <ThemeText
                        text={t('safety.booklet.frame.subtitle')}
                        textStyle="text-style-il-frame-modal-title"
                        layout={{ position: 'absolute', left: 0, width: 166, top: 0, height: 17 }}
                    />
                    <ThemeText
                        text={t('safety.booklet.frame.title')}
                        textStyle="text-style-il-frame-modal-title"
                        layout={{ position: 'absolute', left: 0, width: 304, top: 16, height: 30 }}
                    />
                </Region>
            </Region>
        </Region>
    );
};
