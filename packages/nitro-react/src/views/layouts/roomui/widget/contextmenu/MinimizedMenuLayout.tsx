import { BoxLayout, Bubble, Icon, Region } from '#base/theme';

/** Generated from `990_minimized_menu_xml` (layout "minimized_menu", 45x35) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MinimizedMenuLayoutProps {
    layout?: BoxLayout;
    minimize?: MinimizedMenuLayoutMinimizeProps;
}

export const MinimizedMenuLayout = ({ layout, minimize }: MinimizedMenuLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 45, height: 35, ...layout }}>
            <Bubble
                variant="0"
                tintColor="#6e6b67"
                layout={{ position: 'absolute', left: 0, width: 45, bottom: -1, height: 35 }}
            >
                <MinimizedMenuLayoutMinimize {...minimize} />
            </Bubble>
        </Region>
    );
};

/** Named region `minimize` of MinimizedMenuLayout - configured through the parent's `minimize` prop. */
export interface MinimizedMenuLayoutMinimizeProps {
    layout?: BoxLayout;
    onMinimize?: () => void;
}

export const MinimizedMenuLayoutMinimize = ({ layout, onMinimize }: MinimizedMenuLayoutMinimizeProps) => {
    return (
        <Region
            name="minimize"
            onPointerTap={onMinimize}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 38, top: 0, height: 30, ...layout }}
        >
            <Icon
                variant="6"
                name="icon"
                layout={{ position: 'absolute', left: 14, width: 15, top: 11, height: 15 }}
            />
        </Region>
    );
};
