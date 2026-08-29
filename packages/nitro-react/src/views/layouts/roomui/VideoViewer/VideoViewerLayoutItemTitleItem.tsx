import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `item_title` of VideoViewerLayout - pass real rows through its `items…` slot. */
export interface VideoViewerLayoutItemTitleItemProps {
    captionItemTitle?: string;
    layout?: BoxLayout;
}

export const VideoViewerLayoutItemTitleItem = ({ captionItemTitle, layout }: VideoViewerLayoutItemTitleItemProps) => {
    return (
        <Region
            name="item_title"
            layout={{ width: 57, height: 20, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionItemTitle ?? 'Item Title'}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};
