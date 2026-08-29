import { BoxLayout, Region } from '#base/theme';

/** Generated from `1131_radio_group_view_xml` (layout "radio_group_view", 30x0) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RadioGroupViewLayoutProps {
    layout?: BoxLayout;
}

export const RadioGroupViewLayout = ({ layout }: RadioGroupViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 0, ...layout }}>
            <Region
                name="radio_selector_view"
                layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 0 }}
            >
                <Region
                    name="radio_button_list"
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, flexDirection: 'column' }}
                />
            </Region>
        </Region>
    );
};
