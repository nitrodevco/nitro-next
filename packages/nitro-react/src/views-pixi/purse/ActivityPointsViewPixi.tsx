import { useTranslation, useWallet } from '#base/context';
import { Border, Box, type BoxLayout, Text } from '#base/theme-pixi';

export interface ActivityPointsViewPixiProps {
    layout?: BoxLayout;
}

/**
 * Pixi port of theme/ActivityPointsView.tsx. Only one currency kind ("stars") is defined -
 * DOM's own `.icon-currency` CSS (flagged `/* temporary *\/` in theme/icons.css) has no
 * `.stars` variant, so its icon already renders blank there; matched here by simply not
 * rendering a NitroIcon for it rather than inventing an icon key DOM itself doesn't have.
 * DOM's `hover:brightness-[1.2]` on the icon chip has no attached `onClick` anywhere in this
 * component - inert hover feedback with no behavior behind it, so it's dropped rather than
 * built out as new interactivity Pixi has no direct filter-hover equivalent for anyway.
 */
export const ActivityPointsViewPixi = ({ layout }: ActivityPointsViewPixiProps) => {
    const { activityPoints } = useWallet();
    const t = useTranslation();

    const kinds = [
        {
            amount: activityPoints[1] ?? 0,
            color: '#feee65',
            name: 'Stars',
        },
    ];

    return (
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', ...layout }}>
            {kinds.map(({ amount, color, name }) => (
                <Border
                    key={name}
                    variant="9"
                    layout={{ height: 29, marginTop: 3, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}
                >
                    <Box layout={{ flex: 1, flexDirection: 'row', paddingLeft: 7, paddingRight: 16, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text text={name} textStyle="text-style-button-bold" textOptions={{ fill: color, fontSize: 11 }} />
                        <Text
                            text={amount > 0 ? String(amount) : t('purse.shells.zero.amount.text')}
                            textStyle="text-style-button-bold"
                            textOptions={{ fill: '#ffffff', fontSize: 11 }}
                        />
                    </Box>
                    <Border tintColor={color} variant="9" layout={{ width: 29, height: 29, justifyContent: 'center', alignItems: 'center' }} />
                </Border>
            ))}
        </Box>
    );
};
