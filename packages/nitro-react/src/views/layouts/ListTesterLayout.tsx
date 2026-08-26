import { Border, BoxLayout, Frame, Region, ScrollArea } from '#base/theme';

/** Generated from `2674_list_tester_xml` (layout "list_tester", 240x245) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ListTesterLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
}

export const ListTesterLayout = ({ layout, onClose }: ListTesterLayoutProps) => {
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
                    layout={{ position: 'absolute', left: 0, width: 228, top: 0, height: 213 }}
                >
                    <ScrollArea
                        orientation="vertical"
                        layout={{ position: 'absolute', left: 4, width: 200, top: 4, height: 100 }}
                    >
                        <Region
                            name="_list_vertical"
                            params={2064}
                            backgroundColor="#eeeeee"
                            layout={{ flexDirection: 'column', width: '100%' }}
                        />
                    </ScrollArea>
                    <Region
                        params={1168}
                        layout={{ position: 'absolute', left: 6, width: 218, top: 108, height: 100 }}
                    >
                        <ScrollArea
                            orientation="horizontal"
                            layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 81 }}
                        >
                            <Region
                                name="_list_horizontal"
                                params={144}
                                backgroundColor="#cceeee"
                                layout={{ flexDirection: 'row', width: '100%' }}
                            />
                        </ScrollArea>
                    </Region>
                </Border>
            </Region>
        </Frame>
    );
};
