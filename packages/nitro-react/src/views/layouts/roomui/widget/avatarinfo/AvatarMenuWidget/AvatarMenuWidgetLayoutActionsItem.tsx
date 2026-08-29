import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Row template `actions` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutActionsItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleButton?: boolean;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
    visibleIcon?: boolean;
    visibleLabel?: boolean;
}

export const AvatarMenuWidgetLayoutActionsItem = ({ captionLabel, layout, onButton, visibleButton, visibleGroups, visibleIcon, visibleLabel }: AvatarMenuWidgetLayoutActionsItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="actions"
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
                                    text={captionLabel ?? t('infostand.link.actions')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff', align: 'center' }}
                                />
                            </Region>
                        )}
                        {(visibleIcon ?? true) && (
                            <Icon
                                variant="4"
                                name="icon"
                                layout={{ position: 'absolute', left: 10, width: 5, top: 12, height: 10 }}
                            />
                        )}
                    </ContainerButton>
                )}
            </Region>
        )
    );
};
