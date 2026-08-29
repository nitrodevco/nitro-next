import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `867_spectator_mode_xml` (layout "spectator_mode", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface SpectatorModeLayoutProps {
    layout?: BoxLayout;
    spectatorModeContainer?: SpectatorModeLayoutSpectatorModeContainerProps;
}

export const SpectatorModeLayout = ({ layout, spectatorModeContainer }: SpectatorModeLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <SpectatorModeLayoutSpectatorModeContainer {...spectatorModeContainer} />
        </Region>
    );
};

/** Named region `spectator_mode_container` of SpectatorModeLayout - configured through the parent's `spectatorModeContainer` prop. */
export interface SpectatorModeLayoutSpectatorModeContainerProps {
    layout?: BoxLayout;
    srcBottomLeft?: string;
    srcBottomMiddle?: string;
    srcBottomRight?: string;
    srcMiddleLeft?: string;
    srcMiddleRight?: string;
    srcTopLeft?: string;
    srcTopMiddle?: string;
    srcTopRight?: string;
    tags?: string[];
}

export const SpectatorModeLayoutSpectatorModeContainer = ({ layout, srcBottomLeft, srcBottomMiddle, srcBottomRight, srcMiddleLeft, srcMiddleRight, srcTopLeft, srcTopMiddle, srcTopRight, tags }: SpectatorModeLayoutSpectatorModeContainerProps) => {
    return (
        <Region
            name="spectator_mode_container"
            tags={tags}
            layout={{ position: 'absolute', left: 0, right: -163, top: 0, bottom: -182, minWidth: 183, minHeight: 202, ...layout }}
        >
            <ThemeImage
                name="top_left"
                src={srcTopLeft}
                layout={{ position: 'absolute', left: 0, width: 91, top: 0, height: 91 }}
            />
            <ThemeImage
                name="top_middle"
                src={srcTopMiddle}
                layout={{ position: 'absolute', left: 91, right: 91, top: 0, height: 19 }}
            />
            <ThemeImage
                name="top_right"
                src={srcTopRight}
                layout={{ position: 'absolute', right: 0, width: 91, top: 0, height: 91 }}
            />
            <ThemeImage
                name="middle_left"
                src={srcMiddleLeft}
                layout={{ position: 'absolute', left: 0, width: 19, top: 91, bottom: 110 }}
            />
            <ThemeImage
                name="middle_right"
                src={srcMiddleRight}
                layout={{ position: 'absolute', right: 0, width: 19, top: 91, bottom: 110 }}
            />
            <ThemeImage
                name="bottom_left"
                src={srcBottomLeft}
                layout={{ position: 'absolute', left: 0, width: 91, bottom: 0, height: 110 }}
            />
            <ThemeImage
                name="bottom_middle"
                src={srcBottomMiddle}
                layout={{ position: 'absolute', left: 91, right: 91, bottom: 0, height: 38 }}
            />
            <ThemeImage
                name="bottom_right"
                src={srcBottomRight}
                layout={{ position: 'absolute', right: 0, width: 91, bottom: 0, height: 110 }}
            />
        </Region>
    );
};
