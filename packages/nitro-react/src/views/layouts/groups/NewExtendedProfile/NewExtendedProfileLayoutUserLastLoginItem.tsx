import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `user_last_login` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutUserLastLoginItemProps {
    captionUserLastLogin?: string;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutUserLastLoginItem = ({ captionUserLastLogin, layout }: NewExtendedProfileLayoutUserLastLoginItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionUserLastLogin ?? t('extendedprofile.last.login')}
            name="user_last_login"
            layout={{ width: 137, height: 16, flexShrink: 0, ...layout }}
        />
    );
};
