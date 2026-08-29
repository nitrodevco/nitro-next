import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `header` of AddFriendsTabLayout - pass real rows through its `items…` slot. */
export interface AddFriendsTabLayoutHeaderItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    srcIcon?: string;
    tintIcon?: string;
    visibleIcon?: boolean;
    visibleTitle?: boolean;
}

export const AddFriendsTabLayoutHeaderItem = ({ captionTitle, layout, onHeader, srcIcon, tintIcon, visibleIcon, visibleTitle }: AddFriendsTabLayoutHeaderItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="header"
            onPointerTap={onHeader}
            cursor="pointer"
            layout={{ width: 112, height: 31, flexShrink: 0, ...layout }}
        >
            {(visibleIcon ?? true) && (
                <ThemeImage
                    name="icon"
                    src={srcIcon ?? layoutImage('add_friends_icon.png')}
                    tint={tintIcon}
                    layout={{ position: 'absolute', right: 83, width: 31, bottom: 2, height: 34 }}
                />
            )}
            {(visibleTitle ?? true) && (
                <Region
                    name="title"
                    layout={{ position: 'absolute', left: 29, width: 77, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitle ?? t('friend.bar.find.title')}
                        textStyle="text-style-headline-medium"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 77 }}
                    />
                </Region>
            )}
        </Region>
    );
};
