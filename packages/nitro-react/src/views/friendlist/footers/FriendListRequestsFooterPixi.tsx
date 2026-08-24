import { useTranslation } from '#base/context';
import { Border, Box, Button, NitroIcon, Text } from '#base/theme-pixi';

/** Pixi port of views/friendlist/footers/FriendListRequestsFooter.tsx. */
export const FriendListRequestsFooterPixi = () => {
    const t = useTranslation();

    return (
        <Box layout={{ height: 66, flexShrink: 0, paddingLeft: 6, paddingRight: 6, paddingTop: 5, paddingBottom: 5 }}>
            <Border
                tintColor="#d8d8d8"
                layout={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingLeft: 5, paddingRight: 5, gap: 4 }}
            >
                <Button layout={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 8, paddingLeft: 8, paddingTop: 4, paddingBottom: 4 }}>
                    <NitroIcon
                        icon="icon-accept-check"
                        layout={{}}
                    />
                    <Text
                        text={t('friendlist.requests.acceptall')}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#000000' }}
                    />
                </Button>
                <Button layout={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: 11, paddingLeft: 8, paddingTop: 4, paddingBottom: 4 }}>
                    <NitroIcon
                        icon="icon-decline-x"
                        layout={{}}
                    />
                    <Text
                        text={t('friendlist.requests.dismissall')}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#000000' }}
                    />
                </Button>
            </Border>
        </Box>
    );
};
