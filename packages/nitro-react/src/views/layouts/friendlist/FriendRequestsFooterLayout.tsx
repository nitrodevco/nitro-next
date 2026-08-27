import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Generated from `1497_friend_requests_footer_xml` (layout "friend_requests_footer", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface FriendRequestsFooterLayoutProps {
    layout?: BoxLayout;
    onAcceptAllBut?: () => void;
    onRejectAllBut?: () => void;
}

export const FriendRequestsFooterLayout = ({ layout, onAcceptAllBut, onRejectAllBut }: FriendRequestsFooterLayoutProps) => {
    const t = useTranslation();

    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="footer"
                params={16}
                backgroundColor="#ffffff"
                layout={{ position: 'absolute', left: 0, width: 223, top: 0, height: 67 }}
            >
                <Border
                    variant="0"
                    name="border"
                    params={144}
                    tintColor="#d9d9d9"
                    layout={{ position: 'absolute', left: 5, width: 213, top: 5, height: 57 }}
                >
                    <ContainerButton
                        variant="0"
                        name="reject_all_but"
                        params={145}
                        onPointerTap={onRejectAllBut}
                        layout={{ position: 'absolute', left: 5, width: 203, top: 30, height: 21 }}
                    >
                        <Icon
                            variant="9"
                            name="icon"
                            params={131089}
                            tintColor="#ff3333"
                            layout={{ position: 'absolute', left: 9, width: 16, top: 4, height: 14 }}
                        />
                        <Region
                            params={144}
                            layout={{ position: 'absolute', left: 30, width: 160, top: 3, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('friendlist.requests.dismissall')}
                                textOptions={{ fill: '#000000' }}
                            />
                        </Region>
                    </ContainerButton>
                    <ContainerButton
                        variant="0"
                        name="accept_all_but"
                        params={145}
                        onPointerTap={onAcceptAllBut}
                        layout={{ position: 'absolute', left: 5, width: 203, top: 5, height: 21 }}
                    >
                        <Icon
                            variant="8"
                            name="icon"
                            params={131089}
                            tintColor="#33cc00"
                            layout={{ position: 'absolute', left: 9, width: 16, top: 4, height: 14 }}
                        />
                        <Region
                            params={144}
                            layout={{ position: 'absolute', left: 32, width: 160, top: 3, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={t('friendlist.requests.acceptall')}
                                textOptions={{ fill: '#000000' }}
                            />
                        </Region>
                    </ContainerButton>
                </Border>
            </Region>
        </Region>
    );
};
