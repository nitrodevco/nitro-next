import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `room_report_info` of EmergencyHelpRequestLayout - pass real rows through its `items…` slot. */
export interface EmergencyHelpRequestLayoutRoomReportInfoItemProps {
    captionRoomReportInfo?: string;
    layout?: BoxLayout;
}

export const EmergencyHelpRequestLayoutRoomReportInfoItem = ({ captionRoomReportInfo, layout }: EmergencyHelpRequestLayoutRoomReportInfoItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="room_report_info"
            layout={{ width: 270, height: 16, flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRoomReportInfo ?? t('help.emergency.main.report.room.info')}
                textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
            />
        </Region>
    );
};
