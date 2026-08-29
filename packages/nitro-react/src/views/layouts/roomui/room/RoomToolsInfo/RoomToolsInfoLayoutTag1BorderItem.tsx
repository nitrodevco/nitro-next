import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `tag1_border` of RoomToolsInfoLayout - pass real rows through its `items…` slot. */
export interface RoomToolsInfoLayoutTag1BorderItemProps {
    captionTag1?: string;
    layout?: BoxLayout;
    onTag1Region?: () => void;
    visibleTag1Region?: boolean;
}

export const RoomToolsInfoLayoutTag1BorderItem = ({ captionTag1, layout, onTag1Region, visibleTag1Region }: RoomToolsInfoLayoutTag1BorderItemProps) => {
    return (
        <Border
            variant="3"
            name="tag1_border"
            tintColor="#1c2935"
            layout={{ width: 30, height: 13, flexShrink: 0, ...layout }}
        >
            {(visibleTag1Region ?? true) && (
                <Region
                    name="tag1_region"
                    layout={{ position: 'absolute', left: 1, width: 29, top: -1, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPointerTap={onTag1Region}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionTag1 ?? '#jobs'}
                        textOptions={{ fill: '#1b79ab' }}
                    />
                </Region>
            )}
        </Border>
    );
};
