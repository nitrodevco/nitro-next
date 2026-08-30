import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `error_message` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutErrorMessageItemProps {
    captionErrorMessage?: string;
    layout?: BoxLayout;
}

export const RentablespaceLayoutErrorMessageItem = ({ captionErrorMessage, layout }: RentablespaceLayoutErrorMessageItemProps) => {
    return (
        <ThemeText
            text={captionErrorMessage ?? 'Somebody else already rented this space.'}
            textOptions={{ fill: '#ff0000', wordWrap: true, wordWrapWidth: 252 }}
            name="error_message"
            verticalAlign="top"
            layout={{ width: 252, height: 119, flexShrink: 0, ...layout }}
        />
    );
};
