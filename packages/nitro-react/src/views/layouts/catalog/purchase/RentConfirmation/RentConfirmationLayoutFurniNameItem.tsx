import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `furni_name` of RentConfirmationLayout - pass real rows through its `items…` slot. */
export interface RentConfirmationLayoutFurniNameItemProps {
    captionFurniName?: string;
    layout?: BoxLayout;
}

export const RentConfirmationLayoutFurniNameItem = ({ captionFurniName, layout }: RentConfirmationLayoutFurniNameItemProps) => {
    return (
        <ThemeText
            text={captionFurniName ?? 'The name of the furni in question'}
            textStyle="text-style-u-bold"
            textOptions={{ wordWrap: true, wordWrapWidth: 150 }}
            name="furni_name"
            verticalAlign="top"
            layout={{ width: 150, height: 30, flexShrink: 0, ...layout }}
        />
    );
};
