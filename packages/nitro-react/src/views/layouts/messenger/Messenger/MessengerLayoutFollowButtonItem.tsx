import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `follow_button` of MessengerLayout - pass real rows through its `items…` slot. */
export interface MessengerLayoutFollowButtonItemProps {
    layout?: BoxLayout;
    onFollowButton?: () => void;
}

export const MessengerLayoutFollowButtonItem = ({ layout, onFollowButton }: MessengerLayoutFollowButtonItemProps) => {
    const t = useTranslation();

    return (
        <ContainerButton
            variant="102"
            name="follow_button"
            tooltip={t('messenger.followfriend.tooltip')}
            onPointerTap={onFollowButton}
            layout={{ width: 21, height: 20, flexShrink: 0, maxHeight: 20, ...layout }}
        >
            <ThemeImage
                src={layoutImage('messenger_visit_icon.png')}
                layout={{ position: 'absolute', left: 6, width: 9, top: 5, height: 10 }}
            />
        </ContainerButton>
    );
};
