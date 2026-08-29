import { BoxLayout, Bubble, Icon, Region } from '#base/theme';

/** Generated from `990_minimized_menu_xml` (layout "minimized_menu", 45x35) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MinimizedMenuLayoutProps {
    layout?: BoxLayout;
    onMinimize?: () => void;
}

export const MinimizedMenuLayout = ({ layout, onMinimize }: MinimizedMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 45, height: 35, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 45, bottom: -1, height: 35 }}
            >
                <Region
                    name="minimize"
                    onPointerTap={onMinimize}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 38, top: 0, height: 30 }}
                >
                    <Icon
                        variant="6"
                        name="icon"
                        layout={{ position: 'absolute', left: 14, width: 15, top: 11, height: 15 }}
                    />
                </Region>
            </Bubble>
        </Region>
    );
};
