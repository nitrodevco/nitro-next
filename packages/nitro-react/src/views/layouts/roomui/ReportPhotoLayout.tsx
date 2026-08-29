import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1055_report_photo_xml` (layout "report_photo", 395x666) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ReportPhotoLayoutProps {
    inputWidget?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onReportConfirm?: () => void;
    srcSelfieLoader?: string;
    tintSelfieLoader?: string;
}

export const ReportPhotoLayout = ({ inputWidget, layout, onClose, onReportConfirm, srcSelfieLoader, tintSelfieLoader }: ReportPhotoLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="101"
            onClose={onClose}
            layout={{ width: 395, height: 666, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 10, width: 165, top: -2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.report.selfie.header')}
                    textStyle="text-style-il-border"
                />
            </Region>
            <Region layout={{ position: 'absolute', left: 9, width: 371, top: 19, height: 17, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <ThemeText
                    text={t('help.report.selfie.body')}
                    textStyle="text-style-il-border"
                    textOptions={{ wordWrap: true, wordWrapWidth: 371 }}
                />
            </Region>
            <ThemeImage
                name="selfieLoader"
                src={srcSelfieLoader}
                tint={tintSelfieLoader}
                layout={{ position: 'absolute', left: 26, width: 340, top: 55, height: 405 }}
            />
            <WidgetSlot
                widgetType="illumina_input"
                name="input_widget"
                options={{ 'illumina_input:button_caption': '', 'illumina_input:multiline': 'true' }}
                layout={{ position: 'absolute', left: 26, width: 340, top: 471, height: 64 }}
            >
                {inputWidget}
            </WidgetSlot>
            <Button
                variant="100"
                name="report_confirm"
                onPointerTap={onReportConfirm}
                layout={{ position: 'absolute', right: 18, width: 173, top: 538, height: 48, minWidth: 0, maxWidth: 196, minHeight: 48, maxHeight: 48 }}
            >
                {t('help.report.selfie.button')}
            </Button>
        </Frame>
    );
};
