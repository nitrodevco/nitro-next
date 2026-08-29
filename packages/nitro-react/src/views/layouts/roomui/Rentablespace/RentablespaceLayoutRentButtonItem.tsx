import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Row template `rent_button` of RentablespaceLayout - pass real rows through its `items…` slot. */
export interface RentablespaceLayoutRentButtonItemProps {
    captionPriceLabel?: string;
    captionRentLabel?: string;
    layout?: BoxLayout;
    onRentButton?: () => void;
    visiblePriceLabel?: boolean;
    visibleRentLabel?: boolean;
}

export const RentablespaceLayoutRentButtonItem = ({ captionPriceLabel, captionRentLabel, layout, onRentButton, visiblePriceLabel, visibleRentLabel }: RentablespaceLayoutRentButtonItemProps) => {
    const t = useTranslation();

    return (
        <ContainerButton
            variant="3"
            name="rent_button"
            onPointerTap={onRentButton}
            layout={{ width: 270, height: 44, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row', gap: 5 }}>
                {(visiblePriceLabel ?? true) && (
                    <Region
                        name="price_label"
                        layout={{ width: 56, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPriceLabel ?? '100 x'}
                            textStyle="text-style-u-headline-medium"
                        />
                    </Region>
                )}
                <Icon
                    variant="10"
                    layout={{ width: 28, height: 24, flexShrink: 0 }}
                />
                {(visibleRentLabel ?? true) && (
                    <Region
                        name="rent_label"
                        layout={{ width: 176, height: 21, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionRentLabel ?? t('rentablespace.widget.rent')}
                            textStyle="text-style-u-headline-medium"
                        />
                    </Region>
                )}
            </Region>
        </ContainerButton>
    );
};
