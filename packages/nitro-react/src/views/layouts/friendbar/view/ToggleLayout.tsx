import { Border, BoxLayout, CloseButton, Region } from '#base/theme';

/** Generated from `78_toggle_xml` (layout "toggle", 26x32) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ToggleLayoutProps {
    layout?: BoxLayout;
    onButtonOpen?: () => void;
}

export const ToggleLayout = ({ layout, onButtonOpen }: ToggleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 26, height: 32, ...layout }}>
            <Border
                variant="1"
                name="container"
                layout={{ position: 'absolute', left: 0, right: 0, top: 10, bottom: -10 }}
            >
                <CloseButton
                    variant="0"
                    name="button_open"
                    onPointerTap={onButtonOpen}
                    layout={{ position: 'absolute', left: 5, width: 15, top: 5, height: 16 }}
                />
            </Border>
        </Region>
    );
};
