import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `room_name` of EmergencyHelpRequestLayout - pass real rows through its `items…` slot. */
export interface EmergencyHelpRequestLayoutRoomNameItemProps {
    captionRoomName?: string;
    layout?: BoxLayout;
}

export const EmergencyHelpRequestLayoutRoomNameItem = ({ captionRoomName, layout }: EmergencyHelpRequestLayoutRoomNameItemProps) => {
    return (
        <Region
            name="room_name"
            layout={{ width: 270, height: 16, flexShrink: 0, minWidth: 270, maxWidth: 270, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRoomName ?? 'room name'}
                textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
            />
        </Region>
    );
};
