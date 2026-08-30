import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `name_text` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutNameTextItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
}

export const FurniViewLayoutNameTextItem = ({ captionNameText, layout }: FurniViewLayoutNameTextItemProps) => {
    return (
        <ThemeText
            text={captionNameText ?? 'Furni name'}
            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 159 }}
            name="name_text"
            verticalAlign="top"
            layout={{ width: 159, height: 12, flexShrink: 0, ...layout }}
        />
    );
};
