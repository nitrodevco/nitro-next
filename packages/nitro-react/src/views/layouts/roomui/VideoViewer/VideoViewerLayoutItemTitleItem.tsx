import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `item_title` of VideoViewerLayout - pass real rows through its `items…` slot. */
export interface VideoViewerLayoutItemTitleItemProps {
    captionItemTitle?: string;
    layout?: BoxLayout;
}

export const VideoViewerLayoutItemTitleItem = ({ captionItemTitle, layout }: VideoViewerLayoutItemTitleItemProps) => {
    return (
        <ThemeText
            text={captionItemTitle ?? 'Item Title'}
            textStyle="text-style-u-bold"
            name="item_title"
            layout={{ width: 57, height: 20, flexShrink: 0, ...layout }}
        />
    );
};
