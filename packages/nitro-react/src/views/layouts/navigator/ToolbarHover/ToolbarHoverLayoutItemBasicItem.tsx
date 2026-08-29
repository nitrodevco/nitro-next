import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `item_basic` of ToolbarHoverLayout - pass real rows through its `items…` slot. */
export interface ToolbarHoverLayoutItemBasicItemProps {
    captionText?: string;
    layout?: BoxLayout;
    onItemBasic?: () => void;
    visibleBackground?: boolean;
    visibleText?: boolean;
}

export const ToolbarHoverLayoutItemBasicItem = ({ captionText, layout, onItemBasic, visibleBackground, visibleText }: ToolbarHoverLayoutItemBasicItemProps) => {
    return (
        <Region
            name="item_basic"
            onPointerTap={onItemBasic}
            cursor="pointer"
            layout={{ alignSelf: 'stretch', height: 25, flexShrink: 0, ...layout }}
        >
            {(visibleBackground ?? true) && (
                <Border
                    variant="2"
                    name="background"
                    tintColor="#57544d"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 5 }}
                />
            )}
            {(visibleText ?? true) && (
                <Region
                    name="text"
                    layout={{ position: 'absolute', left: 7, width: 75, top: 2, bottom: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionText ?? 'Sample item'}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            )}
        </Region>
    );
};
