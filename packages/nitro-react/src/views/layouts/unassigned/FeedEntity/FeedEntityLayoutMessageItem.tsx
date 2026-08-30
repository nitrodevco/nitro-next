import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `message` of FeedEntityLayout - pass real rows through its `items…` slot. */
export interface FeedEntityLayoutMessageItemProps {
    captionMessage?: string;
    layout?: BoxLayout;
}

export const FeedEntityLayoutMessageItem = ({ captionMessage, layout }: FeedEntityLayoutMessageItemProps) => {
    return (
        <ThemeText
            text={captionMessage ?? '_multiline message, whoop whoop whoop whoop whoop whoop dfgdfg dfgdfg dfgdf'}
            textStyle="text-style-u-regular"
            textOptions={{ wordWrap: true, wordWrapWidth: 168 }}
            name="message"
            verticalAlign="top"
            layout={{ width: 168, flexShrink: 0, maxWidth: 170, ...layout }}
        />
    );
};
