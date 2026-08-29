import { BoxLayout, Region, Shape } from '#base/theme';

/** Row template `habbicon_popup_pointer` of HabbiconHubLayout - pass real rows through its `items…` slot. */
export interface HabbiconHubLayoutHabbiconPopupPointerItemProps {
    layout?: BoxLayout;
}

export const HabbiconHubLayoutHabbiconPopupPointerItem = ({ layout }: HabbiconHubLayoutHabbiconPopupPointerItemProps) => {
    return (
        <Region
            name="habbicon_popup_pointer"
            layout={{ width: 15, height: 15, flexShrink: 0, ...layout }}
        >
            <Shape
                shape="rhombus"
                color="#efefef"
                strokeThickness={1}
                layout={{ position: 'absolute', left: 0, width: 15, top: -8, height: 15 }}
            />
        </Region>
    );
};
