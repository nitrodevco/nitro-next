import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `user_created` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutUserCreatedItemProps {
    captionUserCreated?: string;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutUserCreatedItem = ({ captionUserCreated, layout }: NewExtendedProfileLayoutUserCreatedItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="user_created"
            layout={{ width: 129, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionUserCreated ?? t('extendedprofile.created')}
        </Region>
    );
};
