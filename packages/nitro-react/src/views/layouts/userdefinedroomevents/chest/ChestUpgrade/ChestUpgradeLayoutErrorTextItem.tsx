import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `error_text` of ChestUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestUpgradeLayoutErrorTextItemProps {
    captionErrorText?: string;
    layout?: BoxLayout;
}

export const ChestUpgradeLayoutErrorTextItem = ({ captionErrorText, layout }: ChestUpgradeLayoutErrorTextItemProps) => {
    return (
        <ThemeText
            text={captionErrorText ?? 'Purchase not possible: already at maximum chest capacity'}
            textOptions={{ fill: '#c42f3d', wordWrap: true, wordWrapWidth: 327 }}
            name="error_text"
            verticalAlign="top"
            layout={{ width: 327, height: 30, flexShrink: 0, ...layout }}
        />
    );
};
