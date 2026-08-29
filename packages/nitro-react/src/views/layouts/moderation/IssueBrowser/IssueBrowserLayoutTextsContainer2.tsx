import { BoxLayout, Region, ThemeImage } from '#base/theme';

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
            <Region
                name="score"
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionScore ?? 'xx'}
            </Region>
            <Region
                name="category"
                layout={{ position: 'absolute', left: 40, width: 120, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionCategory ?? 'category'}
            </Region>
            <Region
                name="source"
                layout={{ position: 'absolute', left: 160, right: 287, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionSource ?? 'source'}
            </Region>
            <Region
                name="target_name"
                layout={{ position: 'absolute', left: 230, right: 167, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTargetName ?? 'target'}
            </Region>
            <ThemeImage
                name="target_icon"
                src={srcTargetIcon}
                tint={tintTargetIcon}
                layout={{ position: 'absolute', right: 147, width: 20, top: 1, height: 19 }}
            />
            <Region
                name="time"
                layout={{ position: 'absolute', right: 107, width: 40, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTime ?? 'mm:ss'}
            </Region>
            <Region
                name="picker"
                layout={{ position: 'absolute', right: 0, width: 107, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionPicker ?? 'picker'}
            </Region>
        </Region>
    );
};
