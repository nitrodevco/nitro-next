import { useState } from 'react';

import { Border, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

interface ToolbarExtendedMenuButton {
    icon: string;
    caption: string;
    tooltip?: string;
    action?: () => void;
}

interface ToolbarExtendedMenuProps {
    buttons: ToolbarExtendedMenuButton[];
    onSelect?: () => void;
}

const ToolbarExtendedMenuItem = ({ button, onSelect }: { button: ToolbarExtendedMenuButton; onSelect?: () => void }) => {
    const [ hovering, setHovering ] = useState(false);

    return (
        <Region
            onPointerOver={() => setHovering(true)}
            onPointerOut={() => setHovering(false)}
            onPointerTap={onSelect}
            layout={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 1 }}
            tooltip={button.tooltip?.length ? button.tooltip : undefined}
        >
            <ThemeImage
                src={LayoutImage(`toolbar/${button.icon}.png`)}
                greyscale={!hovering}
            />
            <ThemeText
                textStyle="il_small"
                textOptions={{ fill: hovering ? '#21cff4' : '#ffffff' }}
                text={button.caption}
            />
        </Region>
    );
};

export const ToolbarExtendedMenu = ({ buttons, onSelect }: ToolbarExtendedMenuProps) => {
    const choose = (action: () => void) => () => {
        action?.();
        onSelect?.();
    };

    return (
        <Border
            variant="6"
            tintColor="#3b3933"
            layout={{ position: 'absolute', left: 5, bottom: 50, gap: 20, paddingLeft: 15, paddingTop: 5, paddingRight: 15, paddingBottom: 5 }}
        >
            {buttons.map(button => (
                <ToolbarExtendedMenuItem
                    key={button.icon}
                    button={button}
                    onSelect={button.action ? choose(button.action) : undefined}
                />
            ))}
        </Border>
    );
};
