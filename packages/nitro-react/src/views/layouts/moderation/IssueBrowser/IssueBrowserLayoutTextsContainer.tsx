import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Named region `texts_container` of IssueBrowserLayout - configured through the parent's `textsContainer` prop. */
export interface IssueBrowserLayoutTextsContainerProps {
    captionCategory?: string;
    captionMsgs?: string;
    captionScore?: string;
    captionSource?: string;
    captionTargetName?: string;
    captionTime?: string;
    layout?: BoxLayout;
    onTextsContainer?: () => void;
    srcTargetIcon?: string;
    tintTargetIcon?: string;
}

export const IssueBrowserLayoutTextsContainer = ({ captionCategory, captionMsgs, captionScore, captionSource, captionTargetName, captionTime, layout, onTextsContainer, srcTargetIcon, tintTargetIcon }: IssueBrowserLayoutTextsContainerProps) => {
    return (
        <Region
            name="texts_container"
            onPointerTap={onTextsContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 62, top: 4, height: 16, ...layout }}
        >
            <Region
                name="score"
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionScore ?? 'xx'}
            </Region>
            <Region
                name="category"
                layout={{ position: 'absolute', left: 40, width: 111, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionCategory ?? 'Sharing personal info'}
            </Region>
            <Region
                name="source"
                layout={{ position: 'absolute', left: 151, right: 234, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionSource ?? 'source'}
            </Region>
            <Region
                name="target_name"
                layout={{ position: 'absolute', left: 221, right: 144, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTargetName ?? 'target'}
            </Region>
            <ThemeImage
                name="target_icon"
                src={srcTargetIcon}
                tint={tintTargetIcon}
                layout={{ position: 'absolute', right: 124, width: 20, top: 0, height: 19 }}
            />
            <Region
                name="time"
                layout={{ position: 'absolute', right: 84, width: 40, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTime ?? 'mm:ss'}
            </Region>
            <Region
                name="msgs"
                layout={{ position: 'absolute', right: 59, width: 25, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionMsgs ?? 'yy'}
            </Region>
        </Region>
    );
};
