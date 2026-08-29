import { BoxLayout, Button, Region, ThemeImage } from '#base/theme';

/** Row template `item_prototype` of IssueBrowserLayout - pass real rows through its `items…` slot. */
export interface IssueBrowserLayoutItemPrototypeItemProps {
    captionCategory?: string;
    captionScore?: string;
    captionSource?: string;
    captionTargetName?: string;
    captionTime?: string;
    layout?: BoxLayout;
    onItemPrototype?: () => void;
    onPickButton?: () => void;
    onTextsContainer?: () => void;
    srcTargetIcon?: string;
    tintTargetIcon?: string;
    visibleCategory?: boolean;
    visiblePickButton?: boolean;
    visibleScore?: boolean;
    visibleSource?: boolean;
    visibleTargetIcon?: boolean;
    visibleTargetName?: boolean;
    visibleTextsContainer?: boolean;
    visibleTime?: boolean;
}

export const IssueBrowserLayoutItemPrototypeItem = ({ captionCategory, captionScore, captionSource, captionTargetName, captionTime, layout, onItemPrototype, onPickButton, onTextsContainer, srcTargetIcon, tintTargetIcon, visibleCategory, visiblePickButton, visibleScore, visibleSource, visibleTargetIcon, visibleTargetName, visibleTextsContainer, visibleTime }: IssueBrowserLayoutItemPrototypeItemProps) => {
    return (
        <Region
            name="item_prototype"
            onPointerTap={onItemPrototype}
            cursor="pointer"
            layout={{ width: 517, height: 24, flexShrink: 0, minHeight: 24, maxHeight: 24, ...layout }}
        >
            {(visibleTextsContainer ?? true) && (
                <Region
                    name="texts_container"
                    onPointerTap={onTextsContainer}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, right: 62, top: 4, height: 16 }}
                >
                    {(visibleScore ?? true) && (
                        <Region
                            name="score"
                            layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionScore ?? 'xx'}
                        </Region>
                    )}
                    {(visibleCategory ?? true) && (
                        <Region
                            name="category"
                            layout={{ position: 'absolute', left: 40, width: 140, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionCategory ?? 'Sharing personal info'}
                        </Region>
                    )}
                    {(visibleSource ?? true) && (
                        <Region
                            name="source"
                            layout={{ position: 'absolute', left: 180, right: 185, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionSource ?? 'source'}
                        </Region>
                    )}
                    {(visibleTargetName ?? true) && (
                        <Region
                            name="target_name"
                            layout={{ position: 'absolute', left: 270, right: 65, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionTargetName ?? 'target'}
                        </Region>
                    )}
                    {(visibleTargetIcon ?? true) && (
                        <ThemeImage
                            name="target_icon"
                            src={srcTargetIcon}
                            tint={tintTargetIcon}
                            layout={{ position: 'absolute', right: 45, width: 20, top: 0, height: 19 }}
                        />
                    )}
                    {(visibleTime ?? true) && (
                        <Region
                            name="time"
                            layout={{ position: 'absolute', right: 0, width: 45, top: 0, height: 19, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            {captionTime ?? 'mm:ss'}
                        </Region>
                    )}
                </Region>
            )}
            {(visiblePickButton ?? true) && (
                <Button
                    variant="0"
                    name="pick_button"
                    onPointerTap={onPickButton}
                    layout={{ position: 'absolute', right: 2, width: 60, top: 1, height: 22, minWidth: 60, maxWidth: 60 }}
                >
                    pick
                </Button>
            )}
        </Region>
    );
};
