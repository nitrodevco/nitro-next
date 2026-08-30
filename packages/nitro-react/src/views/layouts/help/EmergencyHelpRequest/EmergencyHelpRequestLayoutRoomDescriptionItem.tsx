import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `room_description` of EmergencyHelpRequestLayout - pass real rows through its `items…` slot. */
export interface EmergencyHelpRequestLayoutRoomDescriptionItemProps {
    captionRoomDescription?: string;
    layout?: BoxLayout;
}

export const EmergencyHelpRequestLayoutRoomDescriptionItem = ({ captionRoomDescription, layout }: EmergencyHelpRequestLayoutRoomDescriptionItemProps) => {
    return (
        <ThemeText
            text={captionRoomDescription ?? 'room description'}
            textOptions={{ wordWrap: true, wordWrapWidth: 270 }}
            name="room_description"
            verticalAlign="top"
            layout={{ width: 270, height: 16, flexShrink: 0, minWidth: 270, maxWidth: 270, ...layout }}
        />
    );
};
