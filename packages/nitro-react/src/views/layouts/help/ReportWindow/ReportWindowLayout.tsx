import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { ReportWindowLayoutList, ReportWindowLayoutListProps } from './ReportWindowLayoutList';

/** Generated from `2894_report_window_xml` (layout "request_report_user", 282x347) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ReportWindowLayoutProps {
    layout?: BoxLayout;
    list?: ReportWindowLayoutListProps;
    onClose?: () => void;
}

export const ReportWindowLayout = ({ layout, list, onClose }: ReportWindowLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="report_user"
            name="report_user"
            caption={t('guide.help.request.emergency.title')}
            onClose={onClose}
            layout={{ width: 282, height: 347, ...layout }}
        >
            <ReportWindowLayoutList {...list} />
        </Frame>
    );
};
