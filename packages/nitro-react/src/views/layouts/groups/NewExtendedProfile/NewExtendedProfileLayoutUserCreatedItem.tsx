import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `user_created` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutUserCreatedItemProps {
    captionUserCreated?: string;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutUserCreatedItem = ({ captionUserCreated, layout }: NewExtendedProfileLayoutUserCreatedItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionUserCreated ?? t('extendedprofile.created')}
            name="user_created"
            layout={{ width: 129, height: 16, flexShrink: 0, ...layout }}
        />
    );
};
