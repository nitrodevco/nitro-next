import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `warning` of ChestWiredUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestWiredUpgradeLayoutWarningItemProps {
    captionWarning?: string;
    layout?: BoxLayout;
}

export const ChestWiredUpgradeLayoutWarningItem = ({ captionWarning, layout }: ChestWiredUpgradeLayoutWarningItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="warning"
            layout={{ width: 197, height: 44, flexShrink: 0, minWidth: 197, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionWarning ?? t('wiredchests.big_fat_warning')}
                textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
            />
        </Region>
    );
};
