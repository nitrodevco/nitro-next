import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Icon, Region, ThemeText } from '#base/theme';

/** Row template `jump` of OwnAvatarMenuLayout - pass real rows through its `items…` slot. */
export interface OwnAvatarMenuLayoutJumpItemProps {
    captionLabel?: string;
    layout?: BoxLayout;
    onButton?: () => void;
    visibleButton?: boolean;
    visibleGroups?: { action?: boolean; moderate?: boolean; ambassador?: boolean };
    visibleIconVip?: boolean;
    visibleLabel?: boolean;
}

export const OwnAvatarMenuLayoutJumpItem = ({ captionLabel, layout, onButton, visibleButton, visibleGroups, visibleIconVip, visibleLabel }: OwnAvatarMenuLayoutJumpItemProps) => {
    const t = useTranslation();

    return (
        (visibleGroups?.action ?? true) && (
            <Region
                name="jump"
                layout={{ width: 103, height: 26, flexShrink: 0, ...layout }}
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
                                    text={captionLabel ?? t('widget.memenu.jump')}
                                    textStyle="text-style-u-regular"
                                    textOptions={{ fill: '#ffffff', align: 'center' }}
                                />
                            </Region>
                        )}
                        {(visibleIconVip ?? true) && (
                            <Icon
                                variant="14"
                                name="icon_vip"
                                layout={{ position: 'absolute', right: 6, width: 15, top: 10, height: 15 }}
                            />
                        )}
                    </ContainerButton>
                )}
            </Region>
        )
    );
};
