import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `message` of SimpleAlert_2678Layout - pass real rows through its `items…` slot. */
export interface SimpleAlert_2678LayoutMessageItemProps {
    captionMessage?: string;
    layout?: BoxLayout;
}

export const SimpleAlert_2678LayoutMessageItem = ({ captionMessage, layout }: SimpleAlert_2678LayoutMessageItemProps) => {
    return (
        <Region
            name="message"
            layout={{ width: 291, height: 24, flexShrink: 0, minWidth: 291, maxWidth: 291, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionMessage ?? 'message'}
                textOptions={{ wordWrap: true, wordWrapWidth: 291 }}
            />
        </Region>
    );
};
