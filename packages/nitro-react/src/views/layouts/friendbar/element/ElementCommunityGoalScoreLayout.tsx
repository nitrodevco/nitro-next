import { ReactNode } from 'react';

import { BoxLayout, Region, WidgetSlot } from '#base/theme';

/** Generated from `61_element_community_goal_score_xml` (layout "element_community_goal_score", 102x25) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ElementCommunityGoalScoreLayoutProps {
    layout?: BoxLayout;
    runningNumberWidget?: ReactNode;
}

export const ElementCommunityGoalScoreLayout = ({ layout, runningNumberWidget }: ElementCommunityGoalScoreLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 102, height: 25, ...layout }}>
            <Region
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <WidgetSlot
                    widgetType="running_number"
                    name="running_number_widget"
                    options={{ 'running_number:digits': '10', 'running_number:update_frequency': '25' }}
                    layout={{ position: 'absolute', left: 0, right: 3, top: 0, bottom: -12 }}
                >
                    {runningNumberWidget}
                </WidgetSlot>
            </Region>
        </Region>
    );
};
