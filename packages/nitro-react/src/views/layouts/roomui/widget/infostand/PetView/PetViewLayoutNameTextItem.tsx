import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `name_text` of PetViewLayout - pass real rows through its `items…` slot. */
export interface PetViewLayoutNameTextItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
}

export const PetViewLayoutNameTextItem = ({ captionNameText, layout }: PetViewLayoutNameTextItemProps) => {
    return (
        <ThemeText
            text={captionNameText ?? ''}
            textOptions={{ fill: '#ffffff' }}
            name="name_text"
            layout={{ width: 4, height: 4, flexShrink: 0, ...layout }}
        />
    );
};
