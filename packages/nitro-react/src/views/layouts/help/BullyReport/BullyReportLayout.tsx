import { useTranslation } from '#base/context';
import { BoxLayout, Button, Frame, Region } from '#base/theme';

import { BullyReportLayoutUserPanel, BullyReportLayoutUserPanelProps } from './BullyReportLayoutUserPanel';

/** Generated from `2920_bully_report_xml` (layout "bully_report", 289x491) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BullyReportLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    onSubmitButton?: () => void;
    userPanel?: BullyReportLayoutUserPanelProps;
}

export const BullyReportLayout = ({ layout, onClose, onSubmitButton, userPanel }: BullyReportLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="emergency_help_request"
            name="emergency_help_request"
            caption={t('help.bully.title')}
            onClose={onClose}
            layout={{ width: 289, height: 491, minWidth: 289, minHeight: 491, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%', justifyContent: 'center' }}>
                <BullyReportLayoutUserPanel {...userPanel} />
                <Button
                    variant="101"
                    name="submit_button"
                    tintColor="#bbbbbb"
                    onPointerTap={onSubmitButton}
                    layout={{ position: 'absolute', marginLeft: 5, marginRight: -5, width: 135, top: 409, height: 43 }}
                >
                    {t('help.bully.submit')}
                </Button>
            </Region>
        </Frame>
    );
};
