import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { RecyclerWidgetLayoutSlots, RecyclerWidgetLayoutSlotsProps } from './RecyclerWidgetLayoutSlots';

/** Named region `slots_wrapper` of RecyclerWidgetLayout - configured through the parent's `slotsWrapper` prop. */
export interface RecyclerWidgetLayoutSlotsWrapperProps {
    layout?: BoxLayout;
    slots?: RecyclerWidgetLayoutSlotsProps;
}

export const RecyclerWidgetLayoutSlotsWrapper = ({ layout, slots }: RecyclerWidgetLayoutSlotsWrapperProps) => {
    return (
        <Region
            name="slots_wrapper"
            layout={{ position: 'absolute', left: 16, right: 159, bottom: -33, height: 156, ...layout }}
        >
            <Region
                name="layout"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 115 }}
            >
                <ThemeImage
                    src={layoutImage('recycler_furnimatic_container_left.png')}
                    layout={{ position: 'absolute', left: 0, width: 15, top: 0, height: 115 }}
                />
                <ThemeImage
                    src={layoutImage('recycler_furnimatic_container_slice.png')}
                    layout={{ position: 'absolute', left: 15, right: 12, top: 0, height: 115 }}
                />
                <ThemeImage
                    src={layoutImage('recycler_furnimatic_container_right.png')}
                    layout={{ position: 'absolute', right: 0, width: 13, top: 0, height: 115 }}
                />
            </Region>
            <RecyclerWidgetLayoutSlots {...slots} />
        </Region>
    );
};
