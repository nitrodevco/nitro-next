import { BoxLayout, Button, Region } from '#base/theme';

/** Generated from `1090_memenu_dance_button_xml` (layout "memenu_dance_button", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MemenuDanceButtonLayoutProps {
    layout?: BoxLayout;
    onDanceButton?: () => void;
}

export const MemenuDanceButtonLayout = ({ layout, onDanceButton }: MemenuDanceButtonLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Button
                variant="1"
                name="dance_button"
                onPointerTap={onDanceButton}
                layout={{ position: 'absolute', left: 0, width: 145, top: 0, height: 22, minWidth: 145 }}
            />
        </Region>
    );
};
