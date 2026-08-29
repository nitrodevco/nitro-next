import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `product_name` of ChestUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestUpgradeLayoutProductNameItemProps {
    captionProductName?: string;
    layout?: BoxLayout;
}

export const ChestUpgradeLayoutProductNameItem = ({ captionProductName, layout }: ChestUpgradeLayoutProductNameItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="product_name"
            layout={{ width: 197, height: 35, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionProductName ?? t('wiredchests.upgrade.capacity.extra')}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
            />
        </Region>
    );
};
