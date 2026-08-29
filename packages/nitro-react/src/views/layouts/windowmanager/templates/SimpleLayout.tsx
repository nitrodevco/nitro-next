import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

/** Generated from `1858_simple_xml` (layout "habbo_simple_window_layout", 100x100) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SimpleLayoutProps {
    contentArea?: ReactNode;
    layout?: BoxLayout;
    onContentArea?: () => void;
    onFrame?: () => void;
}

export const SimpleLayout = ({ contentArea, layout, onContentArea, onFrame }: SimpleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 100, height: 100, ...layout }}>
            <Region
                name="frame"
                onPointerTap={onFrame}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Region
                    name="content_area"
                    onPointerTap={onContentArea}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 10 }}
                >
                    {contentArea}
                </Region>
            </Region>
        </Region>
    );
};
