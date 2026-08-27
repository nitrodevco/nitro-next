import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `2903_chat_review_reporter_feedback_xml` (layout "chat_review_reporter_feedback", 369x304) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChatReviewReporterFeedbackLayoutProps {
    captionBodyTxt?: string;
    captionCaptionTxt?: string;
    captionNoteTxt?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onCloseButton?: () => void;
}

export const ChatReviewReporterFeedbackLayout = ({ captionBodyTxt, captionCaptionTxt, captionNoteTxt, layout, onClose, onCloseButton }: ChatReviewReporterFeedbackLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="pending_request"
            name="pending_request"
            params={163841}
            caption={t('guide.bully.request.reporter.title')}
            onClose={onClose}
            layout={{ width: 369, height: 304, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={16400}
                    layout={{ position: 'absolute', left: 11, width: 345, top: 2, height: 266 }}
                >
                    <Region
                        name="caption_txt"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 284, top: 12, height: 46, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionCaptionTxt ?? t('guide.bully.request.reporter.sent.caption')}
                            textStyle="text-style-il-heading-title"
                            textOptions={{ fill: '#333333', wordWrap: true, wordWrapWidth: 284 }}
                        />
                    </Region>
                    <Region
                        name="body_txt"
                        params={1}
                        layout={{ position: 'absolute', left: 0, width: 282, top: 49, height: 101, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionBodyTxt ?? t('guide.bully.request.reporter.sent.body')}
                            textOptions={{ wordWrap: true, wordWrapWidth: 282 }}
                        />
                    </Region>
                    <Border
                        variant="102"
                        params={16}
                        layout={{ position: 'absolute', left: 0, width: 345, top: 151, height: 50 }}
                    >
                        <ThemeImage
                            params={16}
                            src={layoutImage('help_notification.png')}
                            layout={{ position: 'absolute', left: 18, width: 16, top: 17, height: 17 }}
                        />
                        <Region
                            name="note_txt"
                            params={16}
                            layout={{ position: 'absolute', left: 47, width: 296, top: 11, height: 36, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionNoteTxt ?? t('guide.bully.request.reporter.note')}
                                textOptions={{ wordWrap: true, wordWrapWidth: 296 }}
                            />
                        </Region>
                    </Border>
                    <Button
                        variant="101"
                        name="close_button"
                        params={131281}
                        tintColor="#bbbbbb"
                        onPointerTap={onCloseButton}
                        layout={{ position: 'absolute', left: 102, width: 140, top: 216, height: 50 }}
                    >
                        {t('alert.close.button')}
                    </Button>
                </Region>
                <ThemeImage
                    params={1040}
                    src={layoutImage('help_illustrations_bully.png')}
                    layout={{ position: 'absolute', left: 307, width: 35, top: 16, height: 120 }}
                />
            </Region>
        </Frame>
    );
};
