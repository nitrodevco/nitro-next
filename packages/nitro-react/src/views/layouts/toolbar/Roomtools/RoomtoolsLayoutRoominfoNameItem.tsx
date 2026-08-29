import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `roominfo_name` of RoomtoolsLayout - pass real rows through its `items…` slot. */
export interface RoomtoolsLayoutRoominfoNameItemProps {
    captionRoominfoName?: string;
    layout?: BoxLayout;
}

export const RoomtoolsLayoutRoominfoNameItem = ({ captionRoominfoName, layout }: RoomtoolsLayoutRoominfoNameItemProps) => {
    return (
        <Region
            name="roominfo_name"
            layout={{ width: 12, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRoominfoName ?? '...'}
                textStyle="text-style-il-regular-white"
            />
        </Region>
    );
};
