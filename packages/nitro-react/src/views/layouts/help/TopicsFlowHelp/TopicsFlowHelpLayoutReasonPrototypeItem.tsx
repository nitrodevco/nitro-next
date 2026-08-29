import { BoxLayout, ContainerButton, ThemeText } from '#base/theme';

/** Row template `reason_prototype` of TopicsFlowHelpLayout - pass real rows through its `items…` slot. */
export interface TopicsFlowHelpLayoutReasonPrototypeItemProps {
    captionName?: string;
    layout?: BoxLayout;
    onReasonPrototype?: () => void;
}

export const TopicsFlowHelpLayoutReasonPrototypeItem = ({ captionName, layout, onReasonPrototype }: TopicsFlowHelpLayoutReasonPrototypeItemProps) => {
    return (
        <ContainerButton
            variant="5"
            name="reason_prototype"
            tintColor="#aa0000"
            onPointerTap={onReasonPrototype}
            layout={{ width: 355, height: 40, flexShrink: 0, ...layout }}
        >
            <ThemeText
                text={captionName ?? 'Category Name'}
                textStyle="text-style-u-headline-medium"
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 335, align: 'center' }}
            />
        </ContainerButton>
    );
};
