import { useTranslation, useWallet } from '#base/context';
import { Border, Box, Button, NitroCurrencyIcon, NitroIcon, ThemeText } from '#base/theme';

export const PurseView = () => {
    const currency = useWallet();
    const t = useTranslation();

    const kinds = [
        {
            type: '5',
            amount: currency.activityPoints[5] ?? 0,
            color: '#38caeb',
            name: 'Diamonds',
            icon: 'diamonds',
        },
        {
            type: '-1',
            amount: currency.credits ?? 0,
            color: '#d5af22',
            name: 'Credits',
            icon: 'credits',
        },
        {
            type: '0',
            amount: currency.activityPoints[0] ?? 0,
            color: '#d787d7',
            name: 'Duckets',
            icon: 'duckets',
        },
    ];

    return (
        <Border
            variant="9"
            layout={{ top: -6, width: '100%', height: 77, flexDirection: 'row', padding: 6, gap: 6 }}
        >
            <Box layout={{ flexDirection: 'column', justifyContent: 'center', width: 52 }}>
                {kinds.map(({ type, amount, color, name }) => (
                    <Box
                        key={name}
                        layout={{ height: 19, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}
                    >
                        <ThemeText
                            text={String(amount)}
                            textStyle="text-style-u-bold"
                            textOptions={{ fill: color }}
                        />
                        <NitroCurrencyIcon
                            type={type}
                            small
                        />
                    </Box>
                ))}
            </Box>
            <Box layout={{ flexDirection: 'column', justifyContent: 'center', width: 101, gap: 4 }}>
                <Border
                    variant="1"
                    tintColor="#FFE1CC"
                    layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, padding: 4 }}
                >
                    <NitroIcon icon="icon-hc-small" />
                    <ThemeText
                        text={t('purse.clubdays.zero.amount.text')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#00C1C4' }}
                    />
                </Border>
                <Border
                    variant="1"
                    tintColor="#FFE1CC"
                    layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, padding: 4 }}
                >
                    <NitroIcon icon="icon-earnings-small" />
                    <ThemeText
                        text={t('earnings.title')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#00C1C4' }}
                    />
                </Border>
            </Box>
            <Box layout={{ flexDirection: 'column', justifyContent: 'center', gap: 2, width: 63 }}>
                <Button
                    variant="0"
                    tintColor="#217bb5"
                    textColor="#ffffff"
                    layout={{ width: '100%', height: 19 }}
                >
                    {t('toolbar.help')}
                </Button>
                <Button
                    variant="0"
                    tintColor="#de5347"
                    layout={{ width: '100%', height: 19 }}
                >
                    <NitroIcon icon="icon-disconnect" />
                </Button>
                <Button
                    variant="0"
                    tintColor="#726b86"
                    layout={{ width: '100%', height: 19 }}
                >
                    <NitroIcon icon="icon-settings" />
                </Button>
            </Box>
        </Border>
    );
};
