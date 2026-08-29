import { Border, BoxLayout, Frame, Region, ScrollArea } from '#base/theme';

/** Generated from `2674_list_tester_xml` (layout "list_tester", 240x245) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ListTesterLayoutProps {
    layout?: BoxLayout;
    listHorizontal?: ListTesterLayoutListHorizontalProps;
    listVertical?: ListTesterLayoutListVerticalProps;
    onClose?: () => void;
}

export const ListTesterLayout = ({ layout, listHorizontal, listVertical, onClose }: ListTesterLayoutProps) => {
    return (
        <Frame
            variant="0"
            params={98305}
            caption="Tester"
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 240, height: 245, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="0"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, right: 12, top: 0, bottom: 32 }}
                >
                    <ListTesterLayoutListVertical {...listVertical} />
                    {/* <scrollbar_vertical> for _list_vertical - rendered by that list's ScrollArea */}
                    <Region
                        params={1168}
                        layout={{ position: 'absolute', left: 6, right: 4, bottom: 5, height: 100 }}
                    >
                        <ListTesterLayoutListHorizontal {...listHorizontal} />
                        {/* <scrollbar_horizontal> for _list_horizontal - rendered by that list's ScrollArea */}
                    </Region>
                </Border>
            </Region>
        </Frame>
    );
};

/** Named region `_list_vertical` of ListTesterLayout - configured through the parent's `listVertical` prop. */
export interface ListTesterLayoutListVerticalProps {
    layout?: BoxLayout;
}

export const ListTesterLayoutListVertical = ({ layout }: ListTesterLayoutListVerticalProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 4, width: 200, top: 4, bottom: 109, ...layout }}
        >
            <Region
                name="_list_vertical"
                params={2064}
                backgroundColor="#eeeeee"
                layout={{ flexDirection: 'column', width: '100%' }}
            />
        </ScrollArea>
    );
};

/** Named region `_list_horizontal` of ListTesterLayout - configured through the parent's `listHorizontal` prop. */
export interface ListTesterLayoutListHorizontalProps {
    layout?: BoxLayout;
}

export const ListTesterLayoutListHorizontal = ({ layout }: ListTesterLayoutListHorizontalProps) => {
    return (
        <ScrollArea
            orientation="horizontal"
            layout={{ position: 'absolute', left: 0, right: 18, top: 0, height: 81, ...layout }}
        >
            <Region
                name="_list_horizontal"
                params={144}
                backgroundColor="#cceeee"
                layout={{ flexDirection: 'row', width: '100%' }}
            />
        </ScrollArea>
    );
};
