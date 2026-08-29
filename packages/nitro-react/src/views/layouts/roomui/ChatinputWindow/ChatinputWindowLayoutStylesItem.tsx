import { Border, BoxLayout, Icon, Region, ThemeImage } from '#base/theme';

/** Row template `styles` of ChatinputWindowLayout - pass real rows through its `items…` slot. */
export interface ChatinputWindowLayoutStylesItemProps {
    layout?: BoxLayout;
    srcPreviewBitmap?: string;
    tintPreviewBitmap?: string;
    visibleDropdownIconContainer?: boolean;
    visiblePreviewBitmap?: boolean;
}

export const ChatinputWindowLayoutStylesItem = ({ layout, srcPreviewBitmap, tintPreviewBitmap, visibleDropdownIconContainer, visiblePreviewBitmap }: ChatinputWindowLayoutStylesItemProps) => {
    return (
        <Border
            variant="8"
            name="styles"
            layout={{ width: 83, height: 38, flexShrink: 0, ...layout }}
        >
            {(visiblePreviewBitmap ?? true) && (
                <ThemeImage
                    name="preview_bitmap"
                    src={srcPreviewBitmap}
                    tint={tintPreviewBitmap}
                    layout={{ position: 'absolute', left: 7, width: 55, top: 2, height: 34 }}
                />
            )}
            {(visibleDropdownIconContainer ?? true) && (
                <Region
                    name="dropdown_icon_container"
                    layout={{ position: 'absolute', left: 63, width: 18, top: 3, height: 33 }}
                >
                    <Icon
                        variant="7"
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 2, width: 10, top: 14, height: 5 }}
                    />
                </Region>
            )}
        </Border>
    );
};
