import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `name_text` of RentableBotViewLayout - pass real rows through its `items…` slot. */
export interface RentableBotViewLayoutNameTextItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
}

export const RentableBotViewLayoutNameTextItem = ({ captionNameText, layout }: RentableBotViewLayoutNameTextItemProps) => {
    return (
        <Region
            name="name_text"
            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            backgroundColor="#3d3d3d"
        >
            <ThemeText
                text={captionNameText ?? ''}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};
