import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `867_spectator_mode_xml` (layout "spectator_mode", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SpectatorModeLayoutProps {
    layout?: BoxLayout;
    srcBottomLeft?: string;
    srcBottomMiddle?: string;
    srcBottomRight?: string;
    srcMiddleLeft?: string;
    srcMiddleRight?: string;
    srcTopLeft?: string;
    srcTopMiddle?: string;
    srcTopRight?: string;
}

export const SpectatorModeLayout = ({ layout, srcBottomLeft, srcBottomMiddle, srcBottomRight, srcMiddleLeft, srcMiddleRight, srcTopLeft, srcTopMiddle, srcTopRight }: SpectatorModeLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="spectator_mode_container"
                params={2176}
                layout={{ position: 'absolute', left: 0, width: 183, top: 0, height: 202, minWidth: 183, minHeight: 202 }}
            >
                <ThemeImage
                    name="top_left"
                    params={16}
                    src={srcTopLeft}
                    layout={{ position: 'absolute', left: 0, width: 91, top: 0, height: 91 }}
                />
                <ThemeImage
                    name="top_middle"
                    params={144}
                    src={srcTopMiddle}
                    layout={{ position: 'absolute', left: 91, width: 1, top: 0, height: 19 }}
                />
                <ThemeImage
                    name="top_right"
                    params={80}
                    src={srcTopRight}
                    layout={{ position: 'absolute', left: 92, width: 91, top: 0, height: 91 }}
                />
                <ThemeImage
                    name="middle_left"
                    params={2064}
                    src={srcMiddleLeft}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 91, height: 1 }}
                />
                <ThemeImage
                    name="middle_right"
                    params={2128}
                    src={srcMiddleRight}
                    layout={{ position: 'absolute', left: 164, width: 19, top: 91, height: 1 }}
                />
                <ThemeImage
                    name="bottom_left"
                    params={1040}
                    src={srcBottomLeft}
                    layout={{ position: 'absolute', left: 0, width: 91, top: 92, height: 110 }}
                />
                <ThemeImage
                    name="bottom_middle"
                    params={1168}
                    src={srcBottomMiddle}
                    layout={{ position: 'absolute', left: 91, width: 1, top: 164, height: 38 }}
                />
                <ThemeImage
                    name="bottom_right"
                    params={1104}
                    src={srcBottomRight}
                    layout={{ position: 'absolute', left: 92, width: 91, top: 92, height: 110 }}
                />
            </Region>
        </Region>
    );
};
