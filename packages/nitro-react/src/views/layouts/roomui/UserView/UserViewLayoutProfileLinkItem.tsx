import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `profile_link` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutProfileLinkItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
    onProfileLink?: () => void;
    visibleNameText?: boolean;
}

export const UserViewLayoutProfileLinkItem = ({ captionNameText, layout, onProfileLink, visibleNameText }: UserViewLayoutProfileLinkItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="profile_link"
            tooltip={t('infostand.profile.link.tooltip')}
            onPointerTap={onProfileLink}
            cursor="pointer"
            layout={{ width: 135, height: 12, flexShrink: 0, ...layout }}
        >
            {(visibleNameText ?? true) && (
                <Region
                    name="name_text"
                    layout={{ position: 'absolute', left: 0, right: 131, top: 0, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    backgroundColor="#3d3d3d"
                >
                    <ThemeText
                        text={captionNameText ?? ''}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            )}
        </Region>
    );
};
