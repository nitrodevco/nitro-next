import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';

/** Named region `texts_container` of IssueBrowserLayout - configured through the parent's `textsContainer` prop. */
export interface IssueBrowserLayoutTextsContainer2Props {
    captionCategory?: string;
    captionPicker?: string;
    captionScore?: string;
    captionSource?: string;
    captionTargetName?: string;
    captionTime?: string;
    layout?: BoxLayout;
    onTextsContainer?: () => void;
    srcTargetIcon?: string;
    tintTargetIcon?: string;
}

export const IssueBrowserLayoutTextsContainer2 = ({ captionCategory, captionPicker, captionScore, captionSource, captionTargetName, captionTime, layout, onTextsContainer, srcTargetIcon, tintTargetIcon }: IssueBrowserLayoutTextsContainer2Props) => {
    return (
        <Region
            name="texts_container"
            onPointerTap={onTextsContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, right: 0, top: 4, height: 16, ...layout }}
        >
            <ThemeText
                text={captionScore ?? 'xx'}
                name="score"
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17 }}
            />
            <ThemeText
                text={captionCategory ?? 'category'}
                name="category"
                layout={{ position: 'absolute', left: 40, width: 120, top: 0, height: 17 }}
            />
            <ThemeText
                text={captionSource ?? 'source'}
                name="source"
                layout={{ position: 'absolute', left: 160, right: 287, top: 0, height: 19 }}
            />
            <ThemeText
                text={captionTargetName ?? 'target'}
                name="target_name"
                layout={{ position: 'absolute', left: 230, right: 167, top: 0, height: 19 }}
            />
            <ThemeImage
                name="target_icon"
                src={srcTargetIcon}
                tint={tintTargetIcon}
                layout={{ position: 'absolute', right: 147, width: 20, top: 1, height: 19 }}
            />
            <ThemeText
                text={captionTime ?? 'mm:ss'}
                name="time"
                layout={{ position: 'absolute', right: 107, width: 40, top: 0, height: 19 }}
            />
            <ThemeText
                text={captionPicker ?? 'picker'}
                name="picker"
                layout={{ position: 'absolute', right: 0, width: 107, top: 0, height: 19 }}
            />
        </Region>
    );
};
