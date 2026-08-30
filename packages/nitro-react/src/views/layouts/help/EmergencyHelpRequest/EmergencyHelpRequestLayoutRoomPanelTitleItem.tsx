import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `room_panel_title` of EmergencyHelpRequestLayout - pass real rows through its `items…` slot. */
export interface EmergencyHelpRequestLayoutRoomPanelTitleItemProps {
    captionRoomPanelTitle?: string;
    layout?: BoxLayout;
}

export const EmergencyHelpRequestLayoutRoomPanelTitleItem = ({ captionRoomPanelTitle, layout }: EmergencyHelpRequestLayoutRoomPanelTitleItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionRoomPanelTitle ?? t('help.emergency.main.report.room')}
            textStyle="text-style-il-heading-1"
            textOptions={{ fill: '#555555' }}
            name="room_panel_title"
            layout={{ width: 227, height: 19, flexShrink: 0, ...layout }}
        />
    );
};
