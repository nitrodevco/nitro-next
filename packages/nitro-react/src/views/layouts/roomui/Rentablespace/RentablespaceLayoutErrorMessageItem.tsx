import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `error_message` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutErrorMessageItemProps {
    captionErrorMessage?: string;
    layout?: BoxLayout;
}

export const RentablespaceLayoutErrorMessageItem = ({ captionErrorMessage, layout }: RentablespaceLayoutErrorMessageItemProps) => {
    return (
        <Region
            name="error_message"
            layout={{ width: 252, height: 119, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionErrorMessage ?? 'Somebody else already rented this space.'}
                textOptions={{ fill: '#ff0000', wordWrap: true, wordWrapWidth: 252 }}
            />
        </Region>
    );
};
