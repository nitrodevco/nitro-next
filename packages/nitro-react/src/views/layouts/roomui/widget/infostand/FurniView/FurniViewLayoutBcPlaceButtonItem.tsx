import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `bc_place_button` of FurniViewLayout - pass real rows through its `items…` slot. */
export interface FurniViewLayoutBcPlaceButtonItemProps {
    layout?: BoxLayout;
    onBcPlaceButton?: () => void;
    srcIcon?: string;
    visibleIcon?: boolean;
}

export const FurniViewLayoutBcPlaceButtonItem = ({ layout, onBcPlaceButton, srcIcon, visibleIcon }: FurniViewLayoutBcPlaceButtonItemProps) => {
    const t = useTranslation();

    return (
        <ContainerButton
            variant="0"
            name="bc_place_button"
            tooltip={t('infostand.button.place_more.tooltip')}
            onPointerTap={onBcPlaceButton}
            layout={{ width: 90, height: 23, flexShrink: 0, ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 5, width: 79, top: 0, height: 22, flexDirection: 'row' }}>
                {(visibleIcon ?? true) && (
                    <ThemeImage
                        name="icon"
                        src={srcIcon ?? layoutImage('infostand_furni_place.png')}
                        layout={{ width: 20, height: 18, flexShrink: 0 }}
                    />
                )}
                <ThemeText
                    text={t('infostand.button.place_more')}
                    textStyle="text-style-regular"
                    layout={{ width: 59, height: 13, flexShrink: 0 }}
                />
            </Region>
        </ContainerButton>
    );
};
