import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `tag2_border` of RoomToolsInfoLayout - pass real rows through its `items…` slot. */
export interface RoomToolsInfoLayoutTag2BorderItemProps {
    captionTag2?: string;
    layout?: BoxLayout;
    onTag2Region?: () => void;
    visibleTag2Region?: boolean;
}

export const RoomToolsInfoLayoutTag2BorderItem = ({ captionTag2, layout, onTag2Region, visibleTag2Region }: RoomToolsInfoLayoutTag2BorderItemProps) => {
    return (
        <Border
            variant="3"
            name="tag2_border"
            tintColor="#1c2935"
            layout={{ width: 35, height: 13, flexShrink: 0, ...layout }}
        >
            {(visibleTag2Region ?? true) && (
                <Region
                    name="tag2_region"
                    layout={{ position: 'absolute', left: 1, width: 34, top: -1, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    onPointerTap={onTag2Region}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionTag2 ?? '#party'}
                        textOptions={{ fill: '#1b79ab' }}
                    />
                </Region>
            )}
        </Border>
    );
};
