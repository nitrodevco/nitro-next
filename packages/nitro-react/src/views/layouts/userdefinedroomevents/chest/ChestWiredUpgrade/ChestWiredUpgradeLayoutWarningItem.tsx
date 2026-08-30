import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `warning` of ChestWiredUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestWiredUpgradeLayoutWarningItemProps {
    captionWarning?: string;
    layout?: BoxLayout;
}

export const ChestWiredUpgradeLayoutWarningItem = ({ captionWarning, layout }: ChestWiredUpgradeLayoutWarningItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionWarning ?? t('wiredchests.big_fat_warning')}
            textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
            name="warning"
            verticalAlign="top"
            layout={{ width: 197, height: 44, flexShrink: 0, minWidth: 197, ...layout }}
        />
    );
};
