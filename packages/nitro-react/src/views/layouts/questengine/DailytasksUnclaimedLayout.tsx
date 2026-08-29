import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region, ScrollArea } from '#base/theme';

/** Generated from `121_dailytasks_unclaimed_xml` (layout "dailytasks_unclaimed", 452x426) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DailytasksUnclaimedLayoutProps {
    layout?: BoxLayout;
    mainCont?: DailytasksUnclaimedLayoutMainContProps;
    onClose?: () => void;
}

export const DailytasksUnclaimedLayout = ({ layout, mainCont, onClose }: DailytasksUnclaimedLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="dailytasks_frame"
            name="dailytasks_frame"
            params={1073774593}
            caption={t('dailytasks.unclaimed')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 452, height: 426, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <DailytasksUnclaimedLayoutMainCont {...mainCont} />
            </Region>
        </Frame>
    );
};

/** Row template `spacing` of DailytasksUnclaimedLayout - pass real rows through its `items…` slot. */
export interface DailytasksUnclaimedLayoutSpacingItemProps {
    layout?: BoxLayout;
}

export const DailytasksUnclaimedLayoutSpacingItem = ({ layout }: DailytasksUnclaimedLayoutSpacingItemProps) => {
    return (
        <Region
            name="spacing"
            params={16}
            layout={{ width: 452, height: 6, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `tasks_list` of DailytasksUnclaimedLayout - pass real rows through its `items…` slot. */
export interface DailytasksUnclaimedLayoutTasksListItemProps {
    layout?: BoxLayout;
}

export const DailytasksUnclaimedLayoutTasksListItem = ({ layout }: DailytasksUnclaimedLayoutTasksListItemProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ width: 426, height: 373, flexShrink: 0, minWidth: 426, maxWidth: 426, minHeight: 373, maxHeight: 500, ...layout }}
        >
            <Region
                name="tasks_list"
                params={144}
                layout={{ flexDirection: 'column', gap: 8, width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `main_cont` of DailytasksUnclaimedLayout - configured through the parent's `mainCont` prop. */
export interface DailytasksUnclaimedLayoutMainContProps {
    itemsMainCont?: ReactNode;
    layout?: BoxLayout;
}

export const DailytasksUnclaimedLayoutMainCont = ({ itemsMainCont, layout }: DailytasksUnclaimedLayoutMainContProps) => {
    return (
        <Region
            name="main_cont"
            params={147472}
            layout={{ position: 'absolute', left: 0, top: 0, minWidth: 452, maxWidth: 452, flexDirection: 'column', gap: 4, ...layout }}
        >
            {itemsMainCont ?? (
                <>
                    <DailytasksUnclaimedLayoutSpacingItem />
                    <DailytasksUnclaimedLayoutTasksListItem />
                </>
            )}
        </Region>
    );
};
