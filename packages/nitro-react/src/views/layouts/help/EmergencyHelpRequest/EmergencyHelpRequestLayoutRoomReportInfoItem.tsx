import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `room_report_info` of EmergencyHelpRequestLayout - pass real rows through its `items…` slot. */
export interface EmergencyHelpRequestLayoutRoomReportInfoItemProps {
    captionRoomReportInfo?: string;
    layout?: BoxLayout;
}

export const EmergencyHelpRequestLayoutRoomReportInfoItem = ({ captionRoomReportInfo, layout }: EmergencyHelpRequestLayoutRoomReportInfoItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionRoomReportInfo ?? t('help.emergency.main.report.room.info')}
            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
            name="room_report_info"
            verticalAlign="top"
            layout={{ width: 270, height: 16, flexShrink: 0, minWidth: 270, maxWidth: 270, ...layout }}
        />
    );
};
