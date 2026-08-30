import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `header` of SearchFriendsTabLayout - pass real rows through its `items…` slot. */
export interface SearchFriendsTabLayoutHeaderItemProps {
    captionTitle?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    srcIcon?: string;
    tintIcon?: string;
    visibleIcon?: boolean;
    visibleTitle?: boolean;
}

export const SearchFriendsTabLayoutHeaderItem = ({ captionTitle, layout, onHeader, srcIcon, tintIcon, visibleIcon, visibleTitle }: SearchFriendsTabLayoutHeaderItemProps) => {
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
                    src={srcIcon ?? layoutImage('search_friends_icon.png')}
                    tint={tintIcon}
                    layout={{ position: 'absolute', right: 81, width: 29, bottom: 2, height: 33 }}
                />
            )}
            {(visibleTitle ?? true) && (
                <ThemeText
                    text={captionTitle ?? t('friend.bar.search.title')}
                    textStyle="text-style-headline-medium"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 77 }}
                    name="title"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 33, width: 77, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 30 }}
                />
            )}
        </Region>
    );
};
