import { useTranslation } from '#base/context/system';
import { Border, Box, Button, Icon, ThemeText } from '#base/theme';

/**
 * Pixi port of views/friendlist/footers/FriendListRequestsFooter.tsx. `friend_requests_footer`
 * draws both buttons with icon-set styles: `accept_all_but` is style 8 tinted `0x33cc00`,
 * `reject_all_but` style 9 tinted `0xff3333`.
 */
export const FriendListRequestsFooter = () => {
    const t = useTranslation();

    return (
        <Box layout={{ height: 66, flexShrink: 0, paddingLeft: 6, paddingRight: 6, paddingTop: 5, paddingBottom: 5 }}>
            <Border
                tintColor="#d8d8d8"
                layout={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: 5, paddingRight: 5, gap: 4 }}
            >
                <Button layout={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 8, paddingLeft: 8, paddingTop: 4, paddingBottom: 4 }}>
                    <Icon
                        name="icon"
                        variant={8}
                        tintColor="#33cc00"
                    />
                    <ThemeText
                        text={t('friendlist.requests.acceptall')}
                        textOptions={{ fill: '#000000', fontFamily: 'Volter', fontSize: 9 }}
                    />
                </Button>
                <Button layout={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 11, paddingLeft: 8, paddingTop: 4, paddingBottom: 4 }}>
                    <Icon
                        name="icon"
                        variant={9}
                        tintColor="#ff3333"
                    />
                    <ThemeText
                        text={t('friendlist.requests.dismissall')}
                        textOptions={{ fill: '#000000', fontFamily: 'Volter', fontSize: 9 }}
                    />
                </Button>
            </Border>
        </Box>
    );
};
