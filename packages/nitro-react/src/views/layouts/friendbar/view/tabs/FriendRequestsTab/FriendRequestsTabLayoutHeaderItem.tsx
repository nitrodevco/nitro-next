import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `header` of FriendRequestsTabLayout - pass real rows through its `items…` slot. */
export interface FriendRequestsTabLayoutHeaderItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onHeader?: () => void;
    srcIcon?: string;
    tintIcon?: string;
    visibleIcon?: boolean;
    visibleLabel?: boolean;
}

export const FriendRequestsTabLayoutHeaderItem = ({ captionLabel, layout, onHeader, srcIcon, tintIcon, visibleIcon, visibleLabel }: FriendRequestsTabLayoutHeaderItemProps) => {
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
            {(visibleLabel ?? true) && (
                <Region
                    name="label"
                    layout={{ position: 'absolute', left: 29, width: 77, alignSelf: 'center', marginTop: -0.5, marginBottom: 0.5, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionLabel ?? t('friendbar.requests.title')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 77 }}
                    />
                </Region>
            )}
        </Region>
    );
};
