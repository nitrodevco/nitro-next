import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `message` of SimpleAlert_2678Layout - pass real rows through its `items…` slot. */
export interface SimpleAlert_2678LayoutMessageItemProps {
    captionMessage?: string;
    layout?: BoxLayout;
}

export const SimpleAlert_2678LayoutMessageItem = ({ captionMessage, layout }: SimpleAlert_2678LayoutMessageItemProps) => {
    return (
        <ThemeText
            text={captionMessage ?? 'message'}
            textOptions={{ wordWrap: true, wordWrapWidth: 291 }}
            name="message"
            verticalAlign="top"
            layout={{ width: 291, height: 24, flexShrink: 0, minWidth: 291, maxWidth: 291, ...layout }}
        />
    );
};
