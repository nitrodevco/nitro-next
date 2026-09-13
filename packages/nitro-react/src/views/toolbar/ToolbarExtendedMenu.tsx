import { Border, Region, ThemeImage, ThemeText } from '#base/theme';

import { layoutImage } from '../layouts/layoutAssets';

interface ToolbarExtendedMenuProps {
    buttons: { icon: string; caption: string; action?: () => void }[];
    onSelect?: () => void;
}

export const ToolbarExtendedMenu = ({ buttons, onSelect }: ToolbarExtendedMenuProps) => {
    const choose = (action?: () => void) => () => {
        action?.();
        onSelect?.();
    };

    return (
        <Border
            variant="6"
            tintColor="#3b3933"
            layout={{ position: 'absolute', left: 5, bottom: 50, gap: 15, paddingLeft: 15, paddingTop: 5, paddingRight: 15, paddingBottom: 5 }}
        >
            {buttons.map((x) => {
                return (
                    <Region
                        key={x.icon}
                        onPointerTap={x.action ? choose(x.action) : undefined}
                        layout={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1 }}
                    >
                        <ThemeImage src={layoutImage(`${x.icon}.png`)} />
                        <ThemeText
                            textStyle="text-style-il-small"
                            textOptions={{ fill: '#ffffff' }}
                            text={x.caption}
                        />
                    </Region>
                );
            })}
        </Border>
    );
};
