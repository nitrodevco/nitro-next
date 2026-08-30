import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Named region `footer` of FriendRequestsFooterLayout - configured through the parent's `footer` prop. */
export interface FriendRequestsFooterLayoutFooterProps {
    layout?: BoxLayout;
    onAcceptAllBut?: () => void;
    onRejectAllBut?: () => void;
}

export const FriendRequestsFooterLayoutFooter = ({ layout, onAcceptAllBut, onRejectAllBut }: FriendRequestsFooterLayoutFooterProps) => {
    const t = useTranslation();

    return (
        <Region
            name="footer"
            backgroundColor="#ffffff"
            layout={{ position: 'absolute', left: 0, width: 223, top: 0, height: 67, ...layout }}
        >
            <Border
                variant="0"
                name="border"
                tintColor="#d9d9d9"
                layout={{ position: 'absolute', left: 5, right: 5, top: 5, height: 57 }}
            >
                <ContainerButton
                    variant="0"
                    name="reject_all_but"
                    onPointerTap={onRejectAllBut}
                    layout={{ position: 'absolute', left: 5, right: 5, top: 30, height: 21 }}
                >
                    <Icon
                        variant="9"
                        name="icon"
                        tintColor="#ff3333"
                        layout={{ position: 'absolute', left: 9, width: 16, top: 4, height: 14 }}
                    />
                    <ThemeText
                        text={t('friendlist.requests.dismissall')}
                        textOptions={{ fill: '#000000' }}
                        layout={{ position: 'absolute', left: 30, right: 13, top: 3, height: 20 }}
                    />
                </ContainerButton>
                <ContainerButton
                    variant="0"
                    name="accept_all_but"
                    onPointerTap={onAcceptAllBut}
                    layout={{ position: 'absolute', left: 5, right: 5, top: 5, height: 21 }}
                >
                    <Icon
                        variant="8"
                        name="icon"
                        tintColor="#33cc00"
                        layout={{ position: 'absolute', left: 9, width: 16, top: 4, height: 14 }}
                    />
                    <ThemeText
                        text={t('friendlist.requests.acceptall')}
                        textOptions={{ fill: '#000000' }}
                        layout={{ position: 'absolute', left: 32, right: 11, top: 3, height: 20 }}
                    />
                </ContainerButton>
            </Border>
        </Region>
    );
};
