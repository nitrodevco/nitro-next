import { BoxLayout, Region } from '#base/theme';

/** Generated from `1131_radio_group_view_xml` (layout "radio_group_view", 30x0) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface RadioGroupViewLayoutProps {
    layout?: BoxLayout;
    radioSelectorView?: RadioGroupViewLayoutRadioSelectorViewProps;
}

export const RadioGroupViewLayout = ({ layout, radioSelectorView }: RadioGroupViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 30, height: 0, ...layout }}>
            <RadioGroupViewLayoutRadioSelectorView {...radioSelectorView} />
        </Region>
    );
};

/** Named region `radio_button_list` of RadioGroupViewLayout - configured through the parent's `radioButtonList` prop. */
export interface RadioGroupViewLayoutRadioButtonListProps {
    layout?: BoxLayout;
}

export const RadioGroupViewLayoutRadioButtonList = ({ layout }: RadioGroupViewLayoutRadioButtonListProps) => {
    return (
        <Region
            name="radio_button_list"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, flexDirection: 'column', ...layout }}
        />
    );
};

/** Named region `radio_selector_view` of RadioGroupViewLayout - configured through the parent's `radioSelectorView` prop. */
export interface RadioGroupViewLayoutRadioSelectorViewProps {
    layout?: BoxLayout;
    radioButtonList?: RadioGroupViewLayoutRadioButtonListProps;
}

export const RadioGroupViewLayoutRadioSelectorView = ({ layout, radioButtonList }: RadioGroupViewLayoutRadioSelectorViewProps) => {
    return (
        <Region
            name="radio_selector_view"
            layout={{ position: 'absolute', left: 0, width: 30, top: 0, height: 0, ...layout }}
        >
            <RadioGroupViewLayoutRadioButtonList {...radioButtonList} />
        </Region>
    );
};
