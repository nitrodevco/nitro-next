import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `error_msg_text` of ErrorPopupLayout - pass real rows through its `items…` slot. */
export interface ErrorPopupLayoutErrorMsgTextItemProps {
    captionErrorMsgText?: string;
    layout?: BoxLayout;
}

export const ErrorPopupLayoutErrorMsgTextItem = ({ captionErrorMsgText, layout }: ErrorPopupLayoutErrorMsgTextItemProps) => {
    return (
        <ThemeText
            text={captionErrorMsgText ?? 'Error message'}
            textOptions={{ wordWrap: true, wordWrapWidth: 265, align: 'center' }}
            name="error_msg_text"
            verticalAlign="top"
            layout={{ width: 265, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
