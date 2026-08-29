import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1088_ui_help_modal_xml` (layout "ui_help_modal", 150x100) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface UiHelpModalLayoutProps {
    layout?: BoxLayout;
    srcBitmap?: string;
    tintBitmap?: string;
    uiContainer?: ReactNode;
}

export const UiHelpModalLayout = ({ layout, srcBitmap, tintBitmap, uiContainer }: UiHelpModalLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 150, height: 100, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap}
                    tint={tintBitmap ?? '#24231e'}
                    layout={{ position: 'absolute', left: 0, right: 1, top: 0, bottom: 1 }}
                />
                <Region
                    name="ui_container"
                    layout={{ position: 'absolute', left: 0, right: 4, top: 0, bottom: 6 }}
                >
                    {uiContainer}
                </Region>
            </Region>
        </Region>
    );
};
