import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `roominfo_name` of RoomtoolsLayout - pass real rows through its `items…` slot. */
export interface RoomtoolsLayoutRoominfoNameItemProps {
    captionRoominfoName?: string;
    layout?: BoxLayout;
}

export const RoomtoolsLayoutRoominfoNameItem = ({ captionRoominfoName, layout }: RoomtoolsLayoutRoominfoNameItemProps) => {
    return (
        <ThemeText
            text={captionRoominfoName ?? '...'}
            textStyle="text-style-il-regular-white"
            name="roominfo_name"
            layout={{ width: 12, alignSelf: 'stretch', flexShrink: 0, ...layout }}
        />
    );
};
