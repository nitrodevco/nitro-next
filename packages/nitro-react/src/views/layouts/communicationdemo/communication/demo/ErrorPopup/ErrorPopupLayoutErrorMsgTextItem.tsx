import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `error_msg_text` of ErrorPopupLayout - pass real rows through its `items…` slot. */
export interface ErrorPopupLayoutErrorMsgTextItemProps {
    captionErrorMsgText?: string;
    layout?: BoxLayout;
}

export const ErrorPopupLayoutErrorMsgTextItem = ({ captionErrorMsgText, layout }: ErrorPopupLayoutErrorMsgTextItemProps) => {
    return (
        <Region
            name="error_msg_text"
            layout={{ width: 265, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', ...layout }}
        >
            <ThemeText
                text={captionErrorMsgText ?? 'Error message'}
                textOptions={{ wordWrap: true, wordWrapWidth: 265, align: 'center' }}
            />
        </Region>
    );
};
