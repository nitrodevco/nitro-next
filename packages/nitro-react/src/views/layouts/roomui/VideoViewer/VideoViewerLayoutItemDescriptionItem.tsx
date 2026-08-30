import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `item_description` of VideoViewerLayout - pass real rows through its `items…` slot. */
export interface VideoViewerLayoutItemDescriptionItemProps {
    captionItemDescription?: string;
    layout?: BoxLayout;
}

export const VideoViewerLayoutItemDescriptionItem = ({ captionItemDescription, layout }: VideoViewerLayoutItemDescriptionItemProps) => {
    return (
        <ThemeText
            text={captionItemDescription ?? 'Integer rutrum, lorem quis interdum laoreet, nibh nulla tempus magna, tristique tincidunt mi nisi in mi. Etiam at sem quis mi rutrum placerat. Aliquam erat volutpat. Phasellus eu nibh sed enim pulvinar pulvinar vitae nec dolor. Etiam in ligula diam, et ornare purus. Integer condimentum lacus in diam ultrices suscipit. Duis sed libero vel neque hendrerit mollis sit amet eu nibh. Integer sed turpis orci, ac luctus sapien.'}
            textStyle="text-style-u-small"
            textOptions={{ wordWrap: true, wordWrapWidth: 256 }}
            name="item_description"
            verticalAlign="top"
            layout={{ width: 256, height: 101, flexShrink: 0, ...layout }}
        />
    );
};
