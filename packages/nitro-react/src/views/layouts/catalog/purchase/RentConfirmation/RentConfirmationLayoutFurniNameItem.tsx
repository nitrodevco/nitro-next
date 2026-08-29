import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `furni_name` of RentConfirmationLayout - pass real rows through its `items…` slot. */
export interface RentConfirmationLayoutFurniNameItemProps {
    captionFurniName?: string;
    layout?: BoxLayout;
}

export const RentConfirmationLayoutFurniNameItem = ({ captionFurniName, layout }: RentConfirmationLayoutFurniNameItemProps) => {
    return (
        <Region
            name="furni_name"
            layout={{ width: 150, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionFurniName ?? 'The name of the furni in question'}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 150 }}
            />
        </Region>
    );
};
