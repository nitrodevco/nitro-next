import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText } from '#base/theme';

import { ReportPhotoPosterLayoutReportingReason, ReportPhotoPosterLayoutReportingReasonProps } from './ReportPhotoPosterLayoutReportingReason';

/** Generated from `1012_report_photo_poster_xml` (layout "report_photo_poster", 595x698) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ReportPhotoPosterLayoutProps {
    captionPhotoCaption?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onReportConfirm?: () => void;
    reportingReason?: ReportPhotoPosterLayoutReportingReasonProps;
    srcSelfieLoader?: string;
    tintSelfieLoader?: string;
}

export const ReportPhotoPosterLayout = ({ captionPhotoCaption, layout, onClose, onReportConfirm, reportingReason, srcSelfieLoader, tintSelfieLoader }: ReportPhotoPosterLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="101"
            onClose={onClose}
            layout={{ width: 595, height: 698, minWidth: 50, minHeight: 50, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <ThemeText
                    text={t('help.report.photo.header')}
                    textStyle="text-style-il-border"
                    layout={{ position: 'absolute', left: 9, width: 166, top: -2, height: 17 }}
                />
                <ThemeText
                    text={t('help.report.photo.body')}
                    textStyle="text-style-il-border"
                    textOptions={{ wordWrap: true, wordWrapWidth: 577 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 9, right: -3, top: 19, height: 17 }}
                />
                <ThemeImage
                    name="selfieLoader"
                    src={srcSelfieLoader}
                    tint={tintSelfieLoader}
                    layout={{ position: 'absolute', left: 137, width: 320, top: 64, height: 320 }}
                />
                <ThemeText
                    text={captionPhotoCaption ?? ''}
                    textOptions={{ wordWrap: true, wordWrapWidth: 500 }}
                    name="photoCaption"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 47, width: 500, top: 387, height: 35 }}
                />
                <ThemeText
                    text={t('help.report.reasonprompt')}
                    textStyle="text-style-il-border"
                    textOptions={{ wordWrap: true, wordWrapWidth: 500 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 9, width: 500, top: 424, height: 17 }}
                />
                <ReportPhotoPosterLayoutReportingReason {...reportingReason} />
                <Button
                    variant="100"
                    name="report_confirm"
                    onPointerTap={onReportConfirm}
                    layout={{ position: 'absolute', right: 199, width: 174, top: 580, height: 48, minWidth: 0, maxWidth: 196, minHeight: 48, maxHeight: 48 }}
                >
                    {t('help.report.photo.button')}
                </Button>
            </Region>
        </Frame>
    );
};
