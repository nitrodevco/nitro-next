import { BoxLayout, Frame } from '#base/theme';

import { MainView_1185LayoutBody, MainView_1185LayoutBodyProps } from './MainView_1185LayoutBody';
import { MainView_1185LayoutFrameHeaderOverride, MainView_1185LayoutFrameHeaderOverrideProps } from './MainView_1185LayoutFrameHeaderOverride';

/** Generated from `1185_main_view_xml` (layout "main_view", 412x650) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MainView_1185LayoutProps {
    body?: MainView_1185LayoutBodyProps;
    frameHeaderOverride?: MainView_1185LayoutFrameHeaderOverrideProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const MainView_1185Layout = ({ body, frameHeaderOverride, layout, onClose }: MainView_1185LayoutProps) => {
    return (
        <Frame
            variant="10000"
            onClose={onClose}
            layout={{ width: 412, height: 650, ...layout }}
        >
            <MainView_1185LayoutFrameHeaderOverride {...frameHeaderOverride} />
            <MainView_1185LayoutBody {...body} />
        </Frame>
    );
};
