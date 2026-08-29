import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `43_generic_widget_xml` (layout "landing_view", 250x30) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GenericWidgetLayoutProps {
    itemsContentContainer?: ReactNode;
    layout?: BoxLayout;
    srcBitmap?: string;
}

export const GenericWidgetLayout = ({ itemsContentContainer, layout, srcBitmap }: GenericWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 250, height: 30, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap}
                    layout={{ position: 'absolute', left: 10, width: 20, top: 10, height: 20 }}
                />
                <Region
                    name="content_container"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 10, flexDirection: 'column' }}
                >
                    {itemsContentContainer}
                </Region>
            </Region>
        </Region>
    );
};
