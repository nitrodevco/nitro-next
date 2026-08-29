import { BoxLayout, Region } from '#base/theme';

import { WiredMenuViewLayoutPreviewContainer, WiredMenuViewLayoutPreviewContainerProps } from './WiredMenuViewLayoutPreviewContainer';
import { WiredMenuViewLayoutTypePickerContainer2, WiredMenuViewLayoutTypePickerContainer2Props } from './WiredMenuViewLayoutTypePickerContainer2';
import { WiredMenuViewLayoutVariableValuesContainer, WiredMenuViewLayoutVariableValuesContainerProps } from './WiredMenuViewLayoutVariableValuesContainer';

/** Named region `inspection_container` of WiredMenuViewLayout - configured through the parent's `inspectionContainer` prop. */
export interface WiredMenuViewLayoutInspectionContainerProps {
    layout?: BoxLayout;
    onInspectionContainer?: () => void;
    previewContainer?: WiredMenuViewLayoutPreviewContainerProps;
    typePickerContainer?: WiredMenuViewLayoutTypePickerContainer2Props;
    variableValuesContainer?: WiredMenuViewLayoutVariableValuesContainerProps;
    visibleInspectionContainer?: boolean;
}

export const WiredMenuViewLayoutInspectionContainer = ({ layout, onInspectionContainer, previewContainer, typePickerContainer, variableValuesContainer, visibleInspectionContainer }: WiredMenuViewLayoutInspectionContainerProps) => {
    return (
        (visibleInspectionContainer ?? false) && (
            <Region
                name="inspection_container"
                onPointerTap={onInspectionContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 500, top: 0, height: 382, ...layout }}
            >
                <WiredMenuViewLayoutTypePickerContainer2 {...typePickerContainer} />
                <WiredMenuViewLayoutVariableValuesContainer {...variableValuesContainer} />
                <WiredMenuViewLayoutPreviewContainer {...previewContainer} />
            </Region>
        )
    );
};
