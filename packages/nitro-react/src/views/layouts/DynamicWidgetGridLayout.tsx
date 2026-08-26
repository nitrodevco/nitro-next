import { BoxLayout, Region } from '#base/theme';

/** Generated from `42_dynamic_widget_grid_xml` (layout "dynamic_widget_grid", 1011x771) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DynamicWidgetGridLayoutProps {
    layout?: BoxLayout;
}

export const DynamicWidgetGridLayout = ({ layout }: DynamicWidgetGridLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1011, height: 771, ...layout }}>
            <Region
                name="dynamic_widget_grid_container"
                params={147472}
                layout={{ position: 'absolute', left: 170, width: 1011, top: 0, height: 771 }}
            >
                <Region
                    name="widgetlist_fromtop"
                    params={16}
                    layout={{ position: 'absolute', left: 86, width: 925, top: 4, height: 767, flexDirection: 'column', gap: 10 }}
                >
                    <Region
                        name="widget_slot_1"
                        params={147472}
                        layout={{ width: 800, height: 75, flexShrink: 0 }}
                    />
                    <Region
                        name="center_slots_container"
                        params={147472}
                        layout={{ width: 800, height: 682, flexShrink: 0 }}
                    >
                        <Region
                            name="widget_slots_center_scrollable"
                            params={16400}
                            layout={{ position: 'absolute', left: 0, width: 800, top: 1, height: 681, flexDirection: 'row', gap: 50 }}
                        >
                            <Region
                                name="widget_slots_center_left"
                                params={147472}
                                layout={{ width: 500, height: 52, flexShrink: 0, maxWidth: 500, flexDirection: 'column', gap: 50 }}
                            >
                                <Region
                                    name="widget_slot_2"
                                    params={147472}
                                    layout={{ width: 500, height: 1, flexShrink: 0 }}
                                />
                                <Region
                                    name="widget_slot_4_root"
                                    params={16}
                                    layout={{ width: 500, height: 1, flexShrink: 0, flexDirection: 'column' }}
                                >
                                    <Region
                                        name="widget_slot_4"
                                        params={147472}
                                        layout={{ width: 500, height: 1, flexShrink: 0 }}
                                    />
                                </Region>
                            </Region>
                            <Region
                                name="widget_slots_right"
                                params={147472}
                                layout={{ width: 250, height: 52, flexShrink: 0, maxWidth: 250 }}
                            >
                                <Region
                                    name="widget_slots_center_right"
                                    params={4341776}
                                    layout={{ position: 'absolute', left: 0, width: 250, top: 0, height: 52, flexDirection: 'column', gap: 50 }}
                                >
                                    <Region
                                        name="widget_slot_3"
                                        params={147472}
                                        layout={{ width: 250, height: 1, flexShrink: 0 }}
                                    />
                                    <Region
                                        name="widget_slot_5_root"
                                        params={16}
                                        layout={{ width: 250, height: 1, flexShrink: 0, flexDirection: 'column' }}
                                    >
                                        <Region
                                            name="widget_slot_5"
                                            params={147472}
                                            layout={{ width: 250, height: 1, flexShrink: 0 }}
                                        />
                                    </Region>
                                </Region>
                            </Region>
                        </Region>
                    </Region>
                </Region>
            </Region>
        </Region>
    );
};
