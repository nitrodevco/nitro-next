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
                layout={{ position: 'absolute', left: 0, right: -163, top: 0, bottom: -182, minWidth: 183, minHeight: 202 }}
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
                    layout={{ position: 'absolute', left: 91, right: 91, top: 0, height: 19 }}
                />
                <ThemeImage
                    name="top_right"
                    params={80}
                    src={srcTopRight}
                    layout={{ position: 'absolute', right: 0, width: 91, top: 0, height: 91 }}
                />
                <ThemeImage
                    name="middle_left"
                    params={2064}
                    src={srcMiddleLeft}
                    layout={{ position: 'absolute', left: 0, width: 19, top: 91, bottom: 110 }}
                />
                <ThemeImage
                    name="middle_right"
                    params={2128}
                    src={srcMiddleRight}
                    layout={{ position: 'absolute', right: 0, width: 19, top: 91, bottom: 110 }}
                />
                <ThemeImage
                    name="bottom_left"
                    params={1040}
                    src={srcBottomLeft}
                    layout={{ position: 'absolute', left: 0, width: 91, bottom: 0, height: 110 }}
                />
                <ThemeImage
                    name="bottom_middle"
                    params={1168}
                    src={srcBottomMiddle}
                    layout={{ position: 'absolute', left: 91, right: 91, bottom: 0, height: 38 }}
                />
                <ThemeImage
                    name="bottom_right"
                    params={1104}
                    src={srcBottomRight}
                    layout={{ position: 'absolute', right: 0, width: 91, bottom: 0, height: 110 }}
                />
            </Region>
        </Region>
    );
};
