import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `ducket_count_button` of PurseLayout - pass real rows through its `items…` slot. */
export interface PurseLayoutDucketCountButtonItemProps {
    captionDucketCount?: string;
    layout?: BoxLayout;
    onDucketCountButton?: () => void;
    visibleDucketCount?: boolean;
}

export const PurseLayoutDucketCountButtonItem = ({ captionDucketCount, layout, onDucketCountButton, visibleDucketCount }: PurseLayoutDucketCountButtonItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="ducket_count_button"
            tooltip={t('achievements.activitypoint.0')}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onDucketCountButton}
            cursor="pointer"
            layout={{ width: 52, height: 17, flexShrink: 0, ...layout }}
        >
            {(visibleDucketCount ?? true) && (
                <Region
                    name="ducket_count"
                    layout={{ position: 'absolute', right: 17, width: 10, top: 2, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDucketCount ?? '0'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#d787d7' }}
                    />
                </Region>
            )}
            <ThemeImage
                src={layoutImage('pursearea_duckets_icon.png')}
                layout={{ position: 'absolute', left: 36, width: 15, top: 2, height: 15 }}
            />
        </Region>
    );
};
