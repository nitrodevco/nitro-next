import { BoxLayout, Button, Region } from '#base/theme';

/** Generated from `12_element_button_xml` (layout "element_button", 200x48) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementButtonLayoutProps {
    layout?: BoxLayout;
    onActionButton?: () => void;
}

export const ElementButtonLayout = ({ layout, onActionButton }: ElementButtonLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 200, height: 48, ...layout }}>
            <Button
                variant="100"
                name="action_button"
                onPointerTap={onActionButton}
                layout={{ position: 'absolute', left: -11, width: 200, top: 0, height: 48, minWidth: 200, maxWidth: 200, minHeight: 48, maxHeight: 48 }}
            >
                Button Text PH
            </Button>
        </Region>
    );
};
