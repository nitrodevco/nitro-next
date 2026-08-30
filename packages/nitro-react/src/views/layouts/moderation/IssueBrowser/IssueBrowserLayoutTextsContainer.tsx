import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

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
            <ThemeText
                text={captionScore ?? 'xx'}
                name="score"
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17 }}
            />
            <ThemeText
                text={captionCategory ?? 'Sharing personal info'}
                name="category"
                layout={{ position: 'absolute', left: 40, width: 111, top: 0, height: 17 }}
            />
            <ThemeText
                text={captionSource ?? 'source'}
                name="source"
                layout={{ position: 'absolute', left: 151, right: 234, top: 0, height: 19 }}
            />
            <ThemeText
                text={captionTargetName ?? 'target'}
                name="target_name"
                layout={{ position: 'absolute', left: 221, right: 144, top: 0, height: 19 }}
            />
            <ThemeImage
                name="target_icon"
                src={srcTargetIcon}
                tint={tintTargetIcon}
                layout={{ position: 'absolute', right: 124, width: 20, top: 0, height: 19 }}
            />
            <ThemeText
                text={captionTime ?? 'mm:ss'}
                name="time"
                layout={{ position: 'absolute', right: 84, width: 40, top: 0, height: 19 }}
            />
            <ThemeText
                text={captionMsgs ?? 'yy'}
                name="msgs"
                layout={{ position: 'absolute', right: 59, width: 25, top: 0, height: 19 }}
            />
        </Region>
    );
};
