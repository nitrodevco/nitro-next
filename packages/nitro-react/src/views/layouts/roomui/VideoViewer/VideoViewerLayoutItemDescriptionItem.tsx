import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `item_description` of VideoViewerLayout - pass real rows through its `items…` slot. */
export interface VideoViewerLayoutItemDescriptionItemProps {
    captionItemDescription?: string;
    layout?: BoxLayout;
}

export const VideoViewerLayoutItemDescriptionItem = ({ captionItemDescription, layout }: VideoViewerLayoutItemDescriptionItemProps) => {
    return (
        <Region
            name="item_description"
            layout={{ width: 256, height: 101, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionItemDescription ?? 'Integer rutrum, lorem quis interdum laoreet, nibh nulla tempus magna, tristique tincidunt mi nisi in mi. Etiam at sem quis mi rutrum placerat. Aliquam erat volutpat. Phasellus eu nibh sed enim pulvinar pulvinar vitae nec dolor. Etiam in ligula diam, et ornare purus. Integer condimentum lacus in diam ultrices suscipit. Duis sed libero vel neque hendrerit mollis sit amet eu nibh. Integer sed turpis orci, ac luctus sapien.'}
                textStyle="text-style-u-small"
                textOptions={{ wordWrap: true, wordWrapWidth: 256 }}
            />
        </Region>
    );
};
