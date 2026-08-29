import { BoxLayout, Frame, ThemeImage } from '#base/theme';

import { SimpleAlert_2678LayoutList, SimpleAlert_2678LayoutListProps } from './SimpleAlert_2678LayoutList';

/** Generated from `2678_simple_alert_xml` (layout "simple_alert", 310x163) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SimpleAlert_2678LayoutProps {
    layout?: BoxLayout;
    list?: SimpleAlert_2678LayoutListProps;
    onClose?: () => void;
    srcIllustration?: string;
}

export const SimpleAlert_2678Layout = ({ layout, list, onClose, srcIllustration }: SimpleAlert_2678LayoutProps) => {
    return (
        <Frame
            variant="3"
            caption="caption"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 310, height: 163, ...layout }}
        >
            <ThemeImage
                name="illustration"
                src={srcIllustration}
                layout={{ position: 'absolute', left: 10, width: 1, top: 8, height: 1 }}
            />
            <SimpleAlert_2678LayoutList {...list} />
        </Frame>
    );
};
