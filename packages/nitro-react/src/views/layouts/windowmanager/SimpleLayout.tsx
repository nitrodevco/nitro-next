import { BoxLayout, Region } from '#base/theme';

/** Generated from `1858_simple_xml` (layout "habbo_simple_window_layout", 100x100) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SimpleLayoutProps {
    frame?: SimpleLayoutFrameProps;
    layout?: BoxLayout;
}

export const SimpleLayout = ({ frame, layout }: SimpleLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 100, height: 100, ...layout }}>
            <SimpleLayoutFrame {...frame} />
        </Region>
    );
};

/** Named region `content_area` of SimpleLayout - configured through the parent's `contentArea` prop. */
export interface SimpleLayoutContentAreaProps {
    layout?: BoxLayout;
    onContentArea?: () => void;
}

export const SimpleLayoutContentArea = ({ layout, onContentArea }: SimpleLayoutContentAreaProps) => {
    return (
        <Region
            name="content_area"
            params={2225}
            onPointerTap={onContentArea}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 10, ...layout }}
        />
    );
};

/** Named region `frame` of SimpleLayout - configured through the parent's `frame` prop. */
export interface SimpleLayoutFrameProps {
    contentArea?: SimpleLayoutContentAreaProps;
    layout?: BoxLayout;
    onFrame?: () => void;
}

export const SimpleLayoutFrame = ({ contentArea, layout, onFrame }: SimpleLayoutFrameProps) => {
    return (
        <Region
            name="frame"
            params={2225}
            onPointerTap={onFrame}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <SimpleLayoutContentArea {...contentArea} />
        </Region>
    );
};
