import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `header` of AllFriendsTabLayout - pass real rows through its `items…` slot. */
export interface AllFriendsTabLayoutHeaderItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    srcIcon?: string;
    tintIcon?: string;
    visibleIcon?: boolean;
    visibleTitle?: boolean;
}

export const AllFriendsTabLayoutHeaderItem = ({ captionTitle, layout, onHeader, srcIcon, tintIcon, visibleIcon, visibleTitle }: AllFriendsTabLayoutHeaderItemProps) => {
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
                    layout={{ position: 'absolute', right: 81, width: 35, bottom: 2, height: 33 }}
                />
            )}
            {(visibleTitle ?? true) && (
                <Region
                    name="title"
                    layout={{ position: 'absolute', left: 33, width: 77, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionTitle ?? t('friend.bar.friends.title')}
                        textStyle="text-style-headline-medium"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 77 }}
                    />
                </Region>
            )}
        </Region>
    );
};
