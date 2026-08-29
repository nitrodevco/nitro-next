import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeText } from '#base/theme';

/** Row template `ambassador_alert` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutAmbassadorAlertItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleButton?: boolean;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutAmbassadorAlertItem = ({ captionLabel, layout, onButton, visibleButton, visibleGroups }: AvatarMenuWidgetLayoutAmbassadorAlertItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.ambassador ?? true) && (
            <Region
                name="ambassador_alert"
                layout={{ width: 137, height: 26, flexShrink: 0, ...layout }}
            >
                {(visibleGroups?.ambassador ?? true) && (visibleButton ?? true) && (
                    <ContainerButton
                        variant="3"
                        name="button"
                        tintColor="#2d2a27"
                        onPointerTap={onButton}
                        layout={{ position: 'absolute', left: -3, right: -3, top: -4, bottom: -5 }}
                    >
                        <ThemeText
                            text={captionLabel ?? t('infostand.ambassador.alert')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ff8133', align: 'center' }}
                        />
                    </ContainerButton>
                )}
            </Region>
        )
    );
};
