import { BoxLayout, ThemeImage } from '#base/theme';

/** Row template `bottom_padding` of ToolbarViewLayout - pass real rows through its `items…` slot. */
export interface ToolbarViewLayoutBottomPaddingItemProps {
    layout?: BoxLayout;
    srcBottomPadding?: string;
}

export const ToolbarViewLayoutBottomPaddingItem = ({ layout, srcBottomPadding }: ToolbarViewLayoutBottomPaddingItemProps) => {
    return (
        <ThemeImage
            name="bottom_padding"
            src={srcBottomPadding}
            layout={{ width: 76, height: 10, flexShrink: 0, ...layout }}
        />
    );
};
