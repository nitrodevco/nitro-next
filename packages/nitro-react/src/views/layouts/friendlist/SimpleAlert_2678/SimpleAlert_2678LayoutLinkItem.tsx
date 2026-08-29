import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `link` of SimpleAlert_2678Layout - pass real rows through its `items…` slot. */
export interface SimpleAlert_2678LayoutLinkItemProps {
    captionLink?: string;
    layout?: BoxLayout;
    onLink?: () => void;
}

export const SimpleAlert_2678LayoutLinkItem = ({ captionLink, layout, onLink }: SimpleAlert_2678LayoutLinkItemProps) => {
    return (
        <Region
            name="link"
            layout={{ width: 262, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
            onPointerTap={onLink}
            cursor="pointer"
        >
            <ThemeText
                text={captionLink ?? 'link'}
                textOptions={{ wordWrap: true, wordWrapWidth: 262, align: 'center' }}
            />
        </Region>
    );
};
