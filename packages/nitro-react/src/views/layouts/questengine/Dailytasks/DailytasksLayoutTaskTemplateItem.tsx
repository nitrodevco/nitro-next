import { Border, BoxLayout } from '#base/theme';

import { DailytasksLayoutLeftCont, DailytasksLayoutLeftContProps } from './DailytasksLayoutLeftCont';
import { DailytasksLayoutRightCont, DailytasksLayoutRightContProps } from './DailytasksLayoutRightCont';

/** Row template `task_template` of DailytasksLayout - pass real rows through its `items…` slot. */
export interface DailytasksLayoutTaskTemplateItemProps {
    layout?: BoxLayout;
    leftCont?: DailytasksLayoutLeftContProps;
    rightCont?: DailytasksLayoutRightContProps;
    visibleLeftCont?: boolean;
    visibleRightCont?: boolean;
}

export const DailytasksLayoutTaskTemplateItem = ({ layout, leftCont, rightCont, visibleLeftCont, visibleRightCont }: DailytasksLayoutTaskTemplateItemProps) => {
    return (
        <Border
            variant="4"
            name="task_template"
            tintColor="#c6e0b4"
            layout={{ width: 402, height: 119, flexShrink: 0, ...layout }}
        >
            {(visibleLeftCont ?? true) && (
                <DailytasksLayoutLeftCont {...leftCont} />
            )}
            {(visibleRightCont ?? true) && (
                <DailytasksLayoutRightCont {...rightCont} />
            )}
        </Border>
    );
};
