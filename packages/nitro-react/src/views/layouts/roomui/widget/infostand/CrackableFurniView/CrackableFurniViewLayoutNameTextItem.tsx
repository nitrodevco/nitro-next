import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `name_text` of CrackableFurniViewLayout - pass real rows through its `items…` slot. */
export interface CrackableFurniViewLayoutNameTextItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
}

export const CrackableFurniViewLayoutNameTextItem = ({ captionNameText, layout }: CrackableFurniViewLayoutNameTextItemProps) => {
    return (
        <ThemeText
            text={captionNameText ?? 'Furni name'}
            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 158 }}
            name="name_text"
            verticalAlign="top"
            layout={{ width: 158, height: 12, flexShrink: 0, ...layout }}
        />
    );
};
