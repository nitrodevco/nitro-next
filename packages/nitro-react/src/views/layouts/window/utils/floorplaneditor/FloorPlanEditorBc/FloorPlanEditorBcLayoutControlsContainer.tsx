import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region } from '#base/theme';

import { FloorPlanEditorBcLayoutButtonsItemlistItem } from './FloorPlanEditorBcLayoutButtonsItemlistItem';
import { FloorPlanEditorBcLayoutTileheightControllerContainerItem } from './FloorPlanEditorBcLayoutTileheightControllerContainerItem';

/** Named region `controls_container` of FloorPlanEditorBcLayout - configured through the parent's `controlsContainer` prop. */
export interface FloorPlanEditorBcLayoutControlsContainerProps {
    itemsControlsContainer?: ReactNode;
    layout?: BoxLayout;
}

export const FloorPlanEditorBcLayoutControlsContainer = ({ itemsControlsContainer, layout }: FloorPlanEditorBcLayoutControlsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="controls_container"
            layout={{ position: 'absolute', left: 8, right: 14, top: 4, height: 127, flexDirection: 'column', ...layout }}
        >
            {itemsControlsContainer ?? (
                <>
                    <FloorPlanEditorBcLayoutButtonsItemlistItem />
                    <FloorPlanEditorBcLayoutTileheightControllerContainerItem />
                </>
            )}
            <Region layout={{ width: 318, height: 24, flexShrink: 0 }}>
                <Region layout={{ position: 'absolute', left: 0, width: 161, top: 1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    {t('floor.plan.editor.draw.mode')}
                </Region>
            </Region>
        </Region>
    );
};
