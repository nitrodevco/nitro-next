import { BoxLayout, Region } from '#base/theme';

/** Generated from `1222_extension_grid_xml` (layout "extension_grid", 192x260) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ExtensionGridLayoutProps {
    layout?: BoxLayout;
}

export const ExtensionGridLayout = ({ layout }: ExtensionGridLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 192, height: 260, ...layout }}>
            <Region layout={{ position: 'absolute', right: 0, width: 192, top: 0, height: 260, minWidth: 192, maxWidth: 192, flexDirection: 'column', gap: 2 }} />
        </Region>
    );
};
