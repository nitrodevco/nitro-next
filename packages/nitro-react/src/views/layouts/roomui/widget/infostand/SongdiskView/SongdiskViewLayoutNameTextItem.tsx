import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `name_text` of SongdiskViewLayout - pass real rows through its `items…` slot. */
export interface SongdiskViewLayoutNameTextItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
}

export const SongdiskViewLayoutNameTextItem = ({ captionNameText, layout }: SongdiskViewLayoutNameTextItemProps) => {
    return (
        <ThemeText
            text={captionNameText ?? 'Furni name'}
            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 154 }}
            name="name_text"
            verticalAlign="top"
            layout={{ width: 154, height: 12, flexShrink: 0, ...layout }}
        />
    );
};
