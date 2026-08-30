import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `diamond_count_button` of PurseLayout - pass real rows through its `items…` slot. */
export interface PurseLayoutDiamondCountButtonItemProps {
    captionDiamondCount?: string;
    layout?: BoxLayout;
    onDiamondCountButton?: () => void;
    visibleDiamondCount?: boolean;
}

export const PurseLayoutDiamondCountButtonItem = ({ captionDiamondCount, layout, onDiamondCountButton, visibleDiamondCount }: PurseLayoutDiamondCountButtonItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="diamond_count_button"
            tooltip={t('achievements.activitypoint.5')}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onDiamondCountButton}
            cursor="pointer"
            layout={{ width: 52, height: 19, flexShrink: 0, ...layout }}
        >
            {(visibleDiamondCount ?? true) && (
                <ThemeText
                    text={captionDiamondCount ?? '0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#38caeb' }}
                    name="diamond_count"
                    layout={{ position: 'absolute', right: 17, width: 10, top: 2, height: 17 }}
                />
            )}
            <ThemeImage
                src={layoutImage('pursearea_diamond_icon.png')}
                layout={{ position: 'absolute', left: 36, width: 15, top: 2, height: 15 }}
            />
        </Region>
    );
};
