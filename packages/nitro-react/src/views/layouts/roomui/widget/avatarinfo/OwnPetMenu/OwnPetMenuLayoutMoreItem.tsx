import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Row template `more` of OwnPetMenuLayout - pass real rows through its `items…` slot. */
export interface OwnPetMenuLayoutMoreItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleButton?: boolean;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
    visibleIcon?: boolean;
    visibleLabel?: boolean;
}

export const OwnPetMenuLayoutMoreItem = ({ captionLabel, layout, onButton, visibleButton, visibleGroups, visibleIcon, visibleLabel }: OwnPetMenuLayoutMoreItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="more"
                layout={{ width: 101, height: 26, flexShrink: 0, ...layout }}
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
                                    text={captionLabel ?? t('infostand.link.more')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff', align: 'center' }}
                                />
                            </Region>
                        )}
                        {(visibleIcon ?? true) && (
                            <Icon
                                variant="5"
                                name="icon"
                                layout={{ position: 'absolute', left: 92, width: 5, top: 12, height: 10 }}
                            />
                        )}
                    </ContainerButton>
                )}
            </Region>
        )
    );
};
