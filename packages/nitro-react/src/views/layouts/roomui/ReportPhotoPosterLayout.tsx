import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, RadioButton, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1012_report_photo_poster_xml` (layout "report_photo_poster", 595x698) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ReportPhotoPosterLayoutProps {
    captionPhotoCaption?: string;
    layout?: BoxLayout;
    onClose?: () => void;
    onReportConfirm?: () => void;
    reportingReason?: ReportPhotoPosterLayoutReportingReasonProps;
    srcSelfieLoader?: string;
}

export const ReportPhotoPosterLayout = ({ captionPhotoCaption, layout, onClose, onReportConfirm, reportingReason, srcSelfieLoader }: ReportPhotoPosterLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="101"
            params={33025}
            onClose={onClose}
            layout={{ width: 595, height: 698, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 9, width: 166, top: -2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('help.report.photo.header')}
                        textStyle="text-style-il-border"
                    />
                </Region>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 9, width: 577, top: 19, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('help.report.photo.body')}
                        textStyle="text-style-il-border"
                        textOptions={{ wordWrap: true, wordWrapWidth: 577 }}
                    />
                </Region>
                <ThemeImage
                    name="selfieLoader"
                    params={16}
                    src={srcSelfieLoader}
                    layout={{ position: 'absolute', left: 137, width: 320, top: 64, height: 320 }}
                />
                <Region
                    name="photoCaption"
                    params={16}
                    layout={{ position: 'absolute', left: 47, width: 500, top: 387, height: 35, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionPhotoCaption ?? ''}
                        textOptions={{ wordWrap: true, wordWrapWidth: 500 }}
                    />
                </Region>
                <Region
                    params={16}
                    layout={{ position: 'absolute', left: 9, width: 500, top: 424, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={t('help.report.reasonprompt')}
                        textStyle="text-style-il-border"
                        textOptions={{ wordWrap: true, wordWrapWidth: 500 }}
                    />
                </Region>
                <ReportPhotoPosterLayoutReportingReason {...reportingReason} />
                <Button
                    variant="100"
                    name="report_confirm"
                    params={393233}
                    onPointerTap={onReportConfirm}
                    layout={{ position: 'absolute', right: 211, width: 174, top: 580, height: 48, minWidth: 0, maxWidth: 196, minHeight: 48, maxHeight: 48 }}
                >
                    {t('help.report.photo.button')}
                </Button>
            </Region>
        </Frame>
    );
};

/** Named region `reporting_reason` of ReportPhotoPosterLayout - configured through the parent's `reportingReason` prop. */
export interface ReportPhotoPosterLayoutReportingReasonProps {
    layout?: BoxLayout;
    on_130?: () => void;
    on_131?: () => void;
    on_132?: () => void;
    on_133?: () => void;
    on_134?: () => void;
    on_135?: () => void;
    on_136?: () => void;
}

export const ReportPhotoPosterLayoutReportingReason = ({ layout, on_130, on_131, on_132, on_133, on_134, on_135, on_136 }: ReportPhotoPosterLayoutReportingReasonProps) => {
    const t = useTranslation();

    return (
        <Region
            name="reporting_reason"
            params={147473}
            layout={{ position: 'absolute', left: 20, width: 550, top: 445, height: 136, ...layout }}
        >
            <RadioButton
                variant="100"
                name="130"
                params={17}
                onPointerTap={on_130}
                layout={{ position: 'absolute', left: 0, width: 550, top: 0, height: 16, minHeight: 16, maxHeight: 16 }}
            >
                {t('help.report.reason.130')}
            </RadioButton>
            <RadioButton
                variant="100"
                name="131"
                params={17}
                onPointerTap={on_131}
                layout={{ position: 'absolute', left: 0, width: 550, top: 20, height: 16, minHeight: 16, maxHeight: 16 }}
            >
                {t('help.report.reason.131')}
            </RadioButton>
            <RadioButton
                variant="100"
                name="132"
                params={17}
                onPointerTap={on_132}
                layout={{ position: 'absolute', left: 0, width: 550, top: 40, height: 16, minHeight: 16, maxHeight: 16 }}
            >
                {t('help.report.reason.132')}
            </RadioButton>
            <RadioButton
                variant="100"
                name="133"
                params={17}
                onPointerTap={on_133}
                layout={{ position: 'absolute', left: 0, width: 550, top: 60, height: 16, minHeight: 16, maxHeight: 16 }}
            >
                {t('help.report.reason.133')}
            </RadioButton>
            <RadioButton
                variant="100"
                name="134"
                params={17}
                onPointerTap={on_134}
                layout={{ position: 'absolute', left: 0, width: 550, top: 80, height: 16, minHeight: 16, maxHeight: 16 }}
            >
                {t('help.report.reason.134')}
            </RadioButton>
            <RadioButton
                variant="100"
                name="135"
                params={17}
                onPointerTap={on_135}
                layout={{ position: 'absolute', left: 0, width: 550, top: 100, height: 16, minHeight: 16, maxHeight: 16 }}
            >
                {t('help.report.reason.135')}
            </RadioButton>
            <RadioButton
                variant="100"
                name="136"
                params={17}
                onPointerTap={on_136}
                layout={{ position: 'absolute', left: 0, width: 550, top: 120, height: 16, minHeight: 16, maxHeight: 16 }}
            >
                {t('help.report.reason.136')}
            </RadioButton>
        </Region>
    );
};
