import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, ContainerButton, Icon, Region, ThemeText, WidgetSlot } from '#base/theme';

/** Row template `enterdirection_container` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutEnterdirectionContainerItemProps {
    enterdirectionGhostAvatar?: ReactNode;
    layout?: BoxLayout;
    onEnterdirectionLeft?: () => void;
    onEnterdirectionRight?: () => void;
    visibleEnterdirectionGhostAvatar?: boolean;
    visibleEnterdirectionLeft?: boolean;
    visibleEnterdirectionRight?: boolean;
}

export const FloorPlanEditorBcLayoutEnterdirectionContainerItem = ({ enterdirectionGhostAvatar, layout, onEnterdirectionLeft, onEnterdirectionRight, visibleEnterdirectionGhostAvatar, visibleEnterdirectionLeft, visibleEnterdirectionRight }: FloorPlanEditorBcLayoutEnterdirectionContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="enterdirection_container"
            layout={{ width: 139, height: 98, flexShrink: 0, ...layout }}
        >
            {(visibleEnterdirectionLeft ?? true) && (
                <ContainerButton
                    variant="5"
                    name="enterdirection_left"
                    onPointerTap={onEnterdirectionLeft}
                    layout={{ position: 'absolute', left: 17, width: 25, top: 46, height: 24 }}
                >
                    <Icon
                        variant="2"
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 7, width: 30, top: 7, height: 30 }}
                    />
                </ContainerButton>
            )}
            {(visibleEnterdirectionRight ?? true) && (
                <ContainerButton
                    variant="5"
                    name="enterdirection_right"
                    onPointerTap={onEnterdirectionRight}
                    layout={{ position: 'absolute', left: 82, width: 25, top: 46, height: 24 }}
                >
                    <Icon
                        variant="3"
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 9, width: 28, top: 7, height: 29 }}
                    />
                </ContainerButton>
            )}
            {(visibleEnterdirectionGhostAvatar ?? true) && (
                <WidgetSlot
                    widgetType="avatar_image"
                    name="enterdirection_ghost_avatar"
                    options={{ 'avatar_image:scale': 'sh' }}
                    layout={{ position: 'absolute', left: 41, width: 45, top: 12, height: 72 }}
                >
                    {enterdirectionGhostAvatar}
                </WidgetSlot>
            )}
            <ThemeText
                text={t('floor.plan.editor.enter.direction')}
                layout={{ position: 'absolute', left: 7, width: 120, top: 4, height: 17, maxWidth: 120 }}
            />
        </Region>
    );
};
