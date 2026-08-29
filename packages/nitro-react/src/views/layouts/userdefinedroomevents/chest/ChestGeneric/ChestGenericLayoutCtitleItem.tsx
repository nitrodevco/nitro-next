import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `ctitle` of ChestGenericLayout - pass real rows through its `items…` slot. */
export interface ChestGenericLayoutCtitleItemProps {
    captionCtitle?: string;
    layout?: BoxLayout;
}

export const ChestGenericLayoutCtitleItem = ({ captionCtitle, layout }: ChestGenericLayoutCtitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ctitle"
            layout={{ width: 100, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionCtitle ?? t('wiredchests.capacity_info.title')}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};
