import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick } from '#base/theme';

/** Row template `button` of AddFriendsTabLayout - pass real rows through its `items…` slot. */
export interface AddFriendsTabLayoutButtonItemProps {
    layout?: BoxLayout;
    onButton?: () => void;
}

export const AddFriendsTabLayoutButtonItem = ({ layout, onButton }: AddFriendsTabLayoutButtonItemProps) => {
    const t = useTranslation();

    return (
        <ButtonThick
            variant="3"
            name="button"
            onPointerTap={onButton}
            layout={{ width: 111, height: 32, flexShrink: 0, minWidth: 111, maxWidth: 111, ...layout }}
        >
            {t('friend.bar.find.button')}
        </ButtonThick>
    );
};
