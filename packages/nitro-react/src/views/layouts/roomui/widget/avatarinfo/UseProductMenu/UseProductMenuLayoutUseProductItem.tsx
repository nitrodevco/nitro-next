import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeText } from '#base/theme';

/** Row template `use_product` of UseProductMenuLayout - pass real rows through its `items…` slot. */
export interface UseProductMenuLayoutUseProductItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleButton?: boolean;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const UseProductMenuLayoutUseProductItem = ({ captionLabel, layout, onButton, visibleButton, visibleGroups }: UseProductMenuLayoutUseProductItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="use_product"
                layout={{ width: 102, height: 26, flexShrink: 0, ...layout }}
            >
                {(visibleGroups?.action ?? true) && (visibleButton ?? true) && (
                    <ContainerButton
                        variant="3"
                        name="button"
                        tintColor="#2d2a27"
                        onPointerTap={onButton}
                        layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('infostand.button.useproduct')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                )}
            </Region>
        )
    );
};
