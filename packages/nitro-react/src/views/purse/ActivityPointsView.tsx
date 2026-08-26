import { useTranslation, useWallet } from '#base/context';
import { Border, Box, BoxLayout, ThemeText } from '#base/theme';

export interface ActivityPointsViewProps {
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
export const ActivityPointsView = ({ layout }: ActivityPointsViewProps) => {
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
        <Box layout={{ flexDirection: 'column', alignItems: 'flex-end', width: '100%', height: '100%', ...layout }}>
            {kinds.map(({ amount, color, name }) => (
                <Border
                    key={name}
                    variant="9"
                    layout={{ height: 29, marginTop: 3, flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}
                >
                    <Box layout={{ flex: 1, flexDirection: 'row', paddingLeft: 7, paddingRight: 16, justifyContent: 'space-between', alignItems: 'center' }}>
                        <ThemeText
                            text={name}
                            textStyle="text-style-button-bold"
                            textOptions={{ fill: color }}
                        />
                        <ThemeText
                            text={amount > 0 ? String(amount) : t('purse.shells.zero.amount.text')}
                            textStyle="text-style-button-bold"
                            textOptions={{ fill: '#ffffff' }}
                        />
                    </Box>
                    <Border
                        tintColor={color}
                        variant="9"
                        layout={{ width: 29, height: 29, justifyContent: 'center', alignItems: 'center' }}
                    />
                </Border>
            ))}
        </Box>
    );
};
