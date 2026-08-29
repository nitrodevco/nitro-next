import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `user_name_region` of IlluminaChatBubbleLayout - pass real rows through its `items…` slot. */
export interface IlluminaChatBubbleLayoutUserNameRegionItemProps {
    captionUserName?: string;
    layout?: BoxLayout;
    onUserNameRegion?: () => void;
}

export const IlluminaChatBubbleLayoutUserNameRegionItem = ({ captionUserName, layout, onUserNameRegion }: IlluminaChatBubbleLayoutUserNameRegionItemProps) => {
    return (
        <Region
            name="user_name_region"
            layout={{ width: 31, height: 15, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            onPointerTap={onUserNameRegion}
            cursor="pointer"
        >
            <ThemeText
                text={captionUserName ?? 'USER:'}
                textStyle="text-style-il-border"
                textOptions={{ fill: '#555555' }}
            />
        </Region>
    );
};
