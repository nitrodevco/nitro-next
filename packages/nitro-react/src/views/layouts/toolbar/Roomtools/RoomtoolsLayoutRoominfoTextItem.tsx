import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `roominfo_text` of RoomtoolsLayout - pass real rows through its `items…` slot. */
export interface RoomtoolsLayoutRoominfoTextItemProps {
    captionRoominfoText?: string;
    layout?: BoxLayout;
}

export const RoomtoolsLayoutRoominfoTextItem = ({ captionRoominfoText, layout }: RoomtoolsLayoutRoominfoTextItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionRoominfoText ?? t('navigator.roomsettings.roomname')}
            textStyle="text-style-il-regular-white"
            textOptions={{ fill: '#989898' }}
            name="roominfo_text"
            layout={{ width: 175, alignSelf: 'stretch', flexShrink: 0, ...layout }}
        />
    );
};
