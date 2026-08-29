import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `text` of AddFriendsTabLayout - pass real rows through its `items…` slot. */
export interface AddFriendsTabLayoutTextItemProps {
    captionText?: string;
    layout?: BoxLayout;
}

export const AddFriendsTabLayoutTextItem = ({ captionText, layout }: AddFriendsTabLayoutTextItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="text"
            layout={{ width: 112, height: 62, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
            backgroundColor="#ffffff"
        >
            <ThemeText
                text={captionText ?? t('friend.bar.find.text')}
                textOptions={{ wordWrap: true, wordWrapWidth: 112 }}
            />
        </Region>
    );
};
