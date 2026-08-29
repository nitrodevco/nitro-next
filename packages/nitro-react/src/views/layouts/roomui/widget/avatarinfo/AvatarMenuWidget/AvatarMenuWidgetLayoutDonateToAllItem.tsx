import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeText } from '#base/theme';

/** Row template `donate_to_all` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutDonateToAllItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleButton?: boolean;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutDonateToAllItem = ({ captionLabel, layout, onButton, visibleButton, visibleGroups }: AvatarMenuWidgetLayoutDonateToAllItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="donate_to_all"
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
                        <ThemeText
                            text={captionLabel ?? t('avatar.widget.dta')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                )}
            </Region>
        )
    );
};
