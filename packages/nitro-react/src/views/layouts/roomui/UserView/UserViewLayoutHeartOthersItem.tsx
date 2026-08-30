import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `heart_others` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutHeartOthersItemProps {
    captionHeartOthers?: string;
    layout?: BoxLayout;
}

export const UserViewLayoutHeartOthersItem = ({ captionHeartOthers, layout }: UserViewLayoutHeartOthersItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionHeartOthers ?? t('infostand.relstatus.heart.others')}
            textStyle="text-style-regular"
            textOptions={{ fill: '#ffffff' }}
            name="heart_others"
            layout={{ width: 170, height: 13, flexShrink: 0, ...layout }}
        />
    );
};
