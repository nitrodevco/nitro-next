import { ReactNode } from 'react';

import { Border, BoxLayout, Frame, Region, ScrollArea } from '#base/theme';

/** Generated from `2674_list_tester_xml` (layout "list_tester", 240x245) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ListTesterLayoutProps {
    itemsListHorizontal?: ReactNode;
    itemsListVertical?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const ListTesterLayout = ({ itemsListHorizontal, itemsListVertical, layout, onClose }: ListTesterLayoutProps) => {
    return (
        <Frame
            variant="0"
            caption="Tester"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 240, height: 245, minWidth: 240, minHeight: 245, ...layout }}
        >
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: -9 }}
            >
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 4, width: 200, top: 4, bottom: 109 }}
                >
                    <Region
                        name="_list_vertical"
                        backgroundColor="#eeeeee"
                        layout={{ flexDirection: 'column', width: '100%' }}
                    >
                        {itemsListVertical}
                    </Region>
                </ScrollArea>
                {/* <scrollbar_vertical> for _list_vertical - rendered by that list's ScrollArea */}
                <Region layout={{ position: 'absolute', left: 6, right: 4, bottom: 5, height: 100 }}>
                    <ScrollArea
                        orientation="horizontal"
                        layout={{ position: 'absolute', left: 0, right: 18, top: 0, height: 81 }}
                    >
                        <Region
                            name="_list_horizontal"
                            backgroundColor="#cceeee"
                            layout={{ flexDirection: 'row', width: '100%' }}
                        >
                            {itemsListHorizontal}
                        </Region>
                    </ScrollArea>
                    {/* <scrollbar_horizontal> for _list_horizontal - rendered by that list's ScrollArea */}
                </Region>
            </Border>
        </Frame>
    );
};
