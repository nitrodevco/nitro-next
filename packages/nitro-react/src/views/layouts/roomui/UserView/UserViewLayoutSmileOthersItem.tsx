import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `smile_others` of UserViewLayout - pass real rows through its `items…` slot. */
export interface UserViewLayoutSmileOthersItemProps {
    captionSmileOthers?: string;
    layout?: BoxLayout;
}

export const UserViewLayoutSmileOthersItem = ({ captionSmileOthers, layout }: UserViewLayoutSmileOthersItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionSmileOthers ?? t('infostand.relstatus.smile.others')}
            textStyle="text-style-regular"
            textOptions={{ fill: '#ffffff' }}
            name="smile_others"
            layout={{ width: 166, height: 13, flexShrink: 0, ...layout }}
        />
    );
};
