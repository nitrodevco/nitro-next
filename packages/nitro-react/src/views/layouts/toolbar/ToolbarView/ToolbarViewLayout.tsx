import { Border, BoxLayout, Region } from '#base/theme';

import { ToolbarViewLayoutToolbarItems, ToolbarViewLayoutToolbarItemsProps } from './ToolbarViewLayoutToolbarItems';

/** Generated from `1242_toolbar_view_xml` (layout "toolbar_view_squeezed", 87x875) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ToolbarViewLayoutProps {
    layout?: BoxLayout;
    toolbarItems?: ToolbarViewLayoutToolbarItemsProps;
}

export const ToolbarViewLayout = ({ layout, toolbarItems }: ToolbarViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 87, height: 875, ...layout }}>
            <Region
                dropShadow={{ distance: 3, alpha: 0.6 }}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Border
                    variant="6"
                    name="main_toolbar"
                    tintColor="#79756e"
                    layout={{ width: '100%', height: '100%' }}
                >
                    <ToolbarViewLayoutToolbarItems {...toolbarItems} />
                </Border>
            </Region>
        </Region>
    );
};
