import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

/** Row template `user_name` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutUserNameItemProps {
    captionUserName?: string;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutUserNameItem = ({ captionUserName, layout }: NewExtendedProfileLayoutUserNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="user_name"
            layout={{ width: 141, height: 16, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionUserName ?? t('extendedprofile.username')}
        </Region>
    );
};
