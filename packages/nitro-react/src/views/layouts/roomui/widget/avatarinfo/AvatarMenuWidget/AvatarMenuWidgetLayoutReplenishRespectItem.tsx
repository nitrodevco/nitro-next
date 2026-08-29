import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `replenish_respect` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutReplenishRespectItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleButton?: boolean;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
    visibleLabel?: boolean;
}

export const AvatarMenuWidgetLayoutReplenishRespectItem = ({ captionLabel, layout, onButton, visibleButton, visibleGroups, visibleLabel }: AvatarMenuWidgetLayoutReplenishRespectItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="replenish_respect"
                layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
            >
                {(visibleGroups?.action ?? true) && (visibleButton ?? true) && (
                    <ContainerButton
                        variant="3"
                        name="button"
                        tintColor="#2d2a27"
                        onPointerTap={onButton}
                        layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
                    >
                        {(visibleLabel ?? true) && (
                            <Region
                                name="label"
                                layout={{ position: 'absolute', left: 3, right: 3, top: 9, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <ThemeText
                                    text={captionLabel ?? t('infostand.button.replenish_respect')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff', align: 'center' }}
                                />
                            </Region>
                        )}
                        <ThemeImage
                            src={layoutImage('pursearea_duckets_icon.png')}
                            layout={{ position: 'absolute', left: 110, width: 15, top: 10, height: 15 }}
                        />
                    </ContainerButton>
                )}
            </Region>
        )
    );
};
