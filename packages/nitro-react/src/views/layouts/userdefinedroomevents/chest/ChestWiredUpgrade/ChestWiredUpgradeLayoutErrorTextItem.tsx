import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `error_text` of ChestWiredUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestWiredUpgradeLayoutErrorTextItemProps {
    captionErrorText?: string;
    layout?: BoxLayout;
}

export const ChestWiredUpgradeLayoutErrorTextItem = ({ captionErrorText, layout }: ChestWiredUpgradeLayoutErrorTextItemProps) => {
    return (
        <Region
            name="error_text"
            layout={{ width: 327, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionErrorText ?? 'Purchase not possible: A starters chest can not be upgraded to a Wired Chest.'}
                textOptions={{ fill: '#c42f3d', wordWrap: true, wordWrapWidth: 327 }}
            />
        </Region>
    );
};
