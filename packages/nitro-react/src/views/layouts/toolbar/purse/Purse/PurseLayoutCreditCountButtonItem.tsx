import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `credit_count_button` of PurseLayout - pass real rows through its `items…` slot. */
export interface PurseLayoutCreditCountButtonItemProps {
    captionCreditCount?: string;
    layout?: BoxLayout;
    onCreditCountButton?: () => void;
    visibleCreditCount?: boolean;
}

export const PurseLayoutCreditCountButtonItem = ({ captionCreditCount, layout, onCreditCountButton, visibleCreditCount }: PurseLayoutCreditCountButtonItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="credit_count_button"
            tooltip={t('purse_coins')}
            dynamicStyle="brightness_and_shadow_under"
            onPointerTap={onCreditCountButton}
            cursor="pointer"
            layout={{ width: 52, height: 19, flexShrink: 0, ...layout }}
        >
            {(visibleCreditCount ?? true) && (
                <ThemeText
                    text={captionCreditCount ?? '0'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#d5af22' }}
                    name="credit_count"
                    layout={{ position: 'absolute', right: 17, width: 10, top: 2, height: 17 }}
                />
            )}
            <ThemeImage
                src={layoutImage('pursearea_credits_icon.png')}
                layout={{ position: 'absolute', left: 36, width: 15, top: 2, height: 15 }}
            />
        </Region>
    );
};
