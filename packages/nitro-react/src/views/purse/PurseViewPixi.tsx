import { useTranslation, useWallet } from '#base/context';
import { Border, Box, Button, FONT_AA_DROP_SHADOW, getPixiTextStyle, NitroCurrencyIcon, NitroIcon } from '#base/theme-pixi';

/**
 * Pixi proof-of-concept for views/purse/PurseView.tsx - same data/layout, rendered through
 * theme-pixi instead of the DOM theme package. See views/purse/PurseView.tsx for the DOM
 * version this mirrors 1:1 (layout in px, converted from its Tailwind spacing classes).
 */
export const PurseViewPixi = () => {
    const currency = useWallet();
    const t = useTranslation();

    const kinds = [
        { type: '5', amount: currency.activityPoints[5] ?? 0, color: '#38caeb', name: 'Diamonds' },
        { type: '-1', amount: currency.credits ?? 0, color: '#d5af22', name: 'Credits' },
        { type: '0', amount: currency.activityPoints[0] ?? 0, color: '#d787d7', name: 'Duckets' },
    ];

    return (
        <Border
            variant="9"
            layout={{ position: 'absolute', top: -6, right: 3, width: 230, height: 77, flexDirection: 'row', padding: 6, gap: 6 }}
        >
            <Box layout={{ flexDirection: 'column', justifyContent: 'center', width: 52 }}>
                {kinds.map(({ type, amount, color, name }) => (
                    <Box key={name} layout={{ height: 19, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                        <pixiText layout={{}} text={String(amount)} style={getPixiTextStyle('text-style-u-bold', { fill: color })} />
                        <NitroCurrencyIcon type={type} small />
                    </Box>
                ))}
            </Box>
            <Box layout={{ flexDirection: 'column', justifyContent: 'center', width: 101, gap: 4 }}>
                <Border variant="1" tintColor="#FFE1CC" layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, padding: 4 }}>
                    <NitroIcon icon="icon-hc-small" />
                    <pixiText
                        layout={{}}
                        text={t('purse.clubdays.zero.amount.text')}
                        style={getPixiTextStyle('text-style-u-bold', { fill: '#00C1C4', dropShadow: FONT_AA_DROP_SHADOW })}
                    />
                </Border>
                <Border variant="1" tintColor="#FFE1CC" layout={{ flexDirection: 'row', alignItems: 'center', gap: 4, padding: 4 }}>
                    <NitroIcon icon="icon-earnings-small" />
                    <pixiText
                        layout={{}}
                        text={t('earnings.title')}
                        style={getPixiTextStyle('text-style-u-bold', { fill: '#00C1C4', dropShadow: FONT_AA_DROP_SHADOW })}
                    />
                </Border>
            </Box>
            <Box layout={{ flexDirection: 'column', justifyContent: 'center', gap: 2, width: 63 }}>
                <Button variant="0" tintColor="#217bb5" textColor="#ffffff" layout={{ width: '100%', height: 19 }}>
                    {t('toolbar.help')}
                </Button>
                <Button variant="0" tintColor="#de5347" layout={{ width: '100%', height: 19 }}>
                    <NitroIcon icon="icon-disconnect" />
                </Button>
                <Button variant="0" tintColor="#726b86" layout={{ width: '100%', height: 19 }}>
                    <NitroIcon icon="icon-settings" />
                </Button>
            </Box>
        </Border>
    );
};
