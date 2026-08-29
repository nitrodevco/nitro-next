import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `profile_button` of MessengerLayout - pass real rows through its `items…` slot. */
export interface MessengerLayoutProfileButtonItemProps {
    layout?: BoxLayout;
    onProfileButton?: () => void;
}

export const MessengerLayoutProfileButtonItem = ({ layout, onProfileButton }: MessengerLayoutProfileButtonItemProps) => {
    const t = useTranslation();

    return (
        <ContainerButton
            variant="102"
            name="profile_button"
            tooltip={t('infostand.profile.link.tooltip')}
            onPointerTap={onProfileButton}
            layout={{ width: 30, height: 20, flexShrink: 0, maxHeight: 20, ...layout }}
        >
            <ThemeImage
                src={layoutImage('messenger_profile_icon.png')}
                layout={{ position: 'absolute', left: 7, width: 16, top: 4, height: 12 }}
            />
        </ContainerButton>
    );
};
