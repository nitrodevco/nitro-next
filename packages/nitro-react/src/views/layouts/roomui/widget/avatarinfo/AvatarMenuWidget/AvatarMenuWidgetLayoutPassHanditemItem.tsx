import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Region, ThemeText } from '#base/theme';

/** Row template `pass_handitem` of AvatarMenuWidgetLayout - pass real rows through its `items…` slot. */
export interface AvatarMenuWidgetLayoutPassHanditemItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleButton?: boolean;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
}

export const AvatarMenuWidgetLayoutPassHanditemItem = ({ captionLabel, layout, onButton, visibleButton, visibleGroups }: AvatarMenuWidgetLayoutPassHanditemItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="pass_handitem"
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
                            text={captionLabel ?? t('avatar.widget.pass_hand_item')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#ffffff', align: 'center' }}
                        />
                    </ContainerButton>
                )}
            </Region>
        )
    );
};
