import { BoxLayout, Region, ThemeImage } from '#base/theme';

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
    tintBottomLeft?: string;
    tintBottomMiddle?: string;
    tintBottomRight?: string;
    tintMiddleLeft?: string;
    tintMiddleRight?: string;
    tintTopLeft?: string;
    tintTopMiddle?: string;
    tintTopRight?: string;
}

export const SpectatorModeLayoutSpectatorModeContainer = ({ layout, srcBottomLeft, srcBottomMiddle, srcBottomRight, srcMiddleLeft, srcMiddleRight, srcTopLeft, srcTopMiddle, srcTopRight, tintBottomLeft, tintBottomMiddle, tintBottomRight, tintMiddleLeft, tintMiddleRight, tintTopLeft, tintTopMiddle, tintTopRight }: SpectatorModeLayoutSpectatorModeContainerProps) => {
    return (
        <Region
            name="spectator_mode_container"
            layout={{ position: 'absolute', left: 0, right: -163, top: 0, bottom: -182, minWidth: 183, minHeight: 202, ...layout }}
        >
            <ThemeImage
                name="top_left"
                src={srcTopLeft}
                tint={tintTopLeft}
                layout={{ position: 'absolute', left: 0, width: 91, top: 0, height: 91 }}
            />
            <ThemeImage
                name="top_middle"
                src={srcTopMiddle}
                tint={tintTopMiddle}
                layout={{ position: 'absolute', left: 91, right: 91, top: 0, height: 19 }}
            />
            <ThemeImage
                name="top_right"
                src={srcTopRight}
                tint={tintTopRight}
                layout={{ position: 'absolute', right: 0, width: 91, top: 0, height: 91 }}
            />
            <ThemeImage
                name="middle_left"
                src={srcMiddleLeft}
                tint={tintMiddleLeft}
                layout={{ position: 'absolute', left: 0, width: 19, top: 91, bottom: 110 }}
            />
            <ThemeImage
                name="middle_right"
                src={srcMiddleRight}
                tint={tintMiddleRight}
                layout={{ position: 'absolute', right: 0, width: 19, top: 91, bottom: 110 }}
            />
            <ThemeImage
                name="bottom_left"
                src={srcBottomLeft}
                tint={tintBottomLeft}
                layout={{ position: 'absolute', left: 0, width: 91, bottom: 0, height: 110 }}
            />
            <ThemeImage
                name="bottom_middle"
                src={srcBottomMiddle}
                tint={tintBottomMiddle}
                layout={{ position: 'absolute', left: 91, right: 91, bottom: 0, height: 38 }}
            />
            <ThemeImage
                name="bottom_right"
                src={srcBottomRight}
                tint={tintBottomRight}
                layout={{ position: 'absolute', right: 0, width: 91, bottom: 0, height: 110 }}
            />
        </Region>
    );
};
