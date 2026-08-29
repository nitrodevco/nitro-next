import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `roominfo_text` of RoomtoolsLayout - pass real rows through its `items…` slot. */
export interface RoomtoolsLayoutRoominfoTextItemProps {
    captionRoominfoText?: string;
    layout?: BoxLayout;
}

export const RoomtoolsLayoutRoominfoTextItem = ({ captionRoominfoText, layout }: RoomtoolsLayoutRoominfoTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="roominfo_text"
            layout={{ width: 175, alignSelf: 'stretch', flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionRoominfoText ?? t('navigator.roomsettings.roomname')}
                textStyle="text-style-il-regular-white"
                textOptions={{ fill: '#989898' }}
            />
        </Region>
    );
};
