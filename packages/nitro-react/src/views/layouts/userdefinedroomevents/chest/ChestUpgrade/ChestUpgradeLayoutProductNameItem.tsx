import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `product_name` of ChestUpgradeLayout - pass real rows through its `items…` slot. */
export interface ChestUpgradeLayoutProductNameItemProps {
    captionProductName?: string;
    layout?: BoxLayout;
}

export const ChestUpgradeLayoutProductNameItem = ({ captionProductName, layout }: ChestUpgradeLayoutProductNameItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionProductName ?? t('wiredchests.upgrade.capacity.extra')}
            textStyle="text-style-u-bold"
            textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
            name="product_name"
            verticalAlign="top"
            layout={{ width: 197, height: 35, flexShrink: 0, ...layout }}
        />
    );
};
