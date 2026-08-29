import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `room_cont` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutRoomContItemProps {
    captionDesc?: string;
    captionName?: string;
    captionTagsTxt?: string;
    layout?: BoxLayout;
    visibleDesc?: boolean;
    visibleName?: boolean;
    visibleRoomData?: boolean;
    visibleTagsCont?: boolean;
    visibleTagsTxt?: boolean;
}

export const RoomtoolFrameLayoutRoomContItem = ({ captionDesc, captionName, captionTagsTxt, layout, visibleDesc, visibleName, visibleRoomData, visibleTagsCont, visibleTagsTxt }: RoomtoolFrameLayoutRoomContItemProps) => {
    return (
        <Border
            variant="0"
            name="room_cont"
            layout={{ width: 230, height: 97, flexShrink: 0, ...layout }}
        >
            {(visibleRoomData ?? true) && (
                <Region
                    name="room_data"
                    layout={{ position: 'absolute', left: 5, width: 220, top: 5, height: 90 }}
                >
                    {(visibleName ?? true) && (
                        <Region
                            name="name"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionName ?? 'PH Room Name: Neque porro quisquam est que'}
                                textOptions={{ wordWrap: true, wordWrapWidth: 220 }}
                            />
                        </Region>
                    )}
                    {(visibleDesc ?? true) && (
                        <Region
                            name="desc"
                            layout={{ position: 'absolute', left: 0, right: 0, top: 30, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionDesc ?? 'PH Room Desc: Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit'}
                                textOptions={{ fill: '#808080', wordWrap: true, wordWrapWidth: 220 }}
                            />
                        </Region>
                    )}
                    {(visibleTagsCont ?? true) && (
                        <Region
                            name="tags_cont"
                            layout={{ position: 'absolute', left: 0, width: 220, top: 60, height: 30 }}
                        >
                            <Region layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                Tags:
                            </Region>
                            {(visibleTagsTxt ?? true) && (
                                <Region
                                    name="tags_txt"
                                    layout={{ position: 'absolute', left: 40, right: 2, top: 0, height: 30, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                >
                                    <ThemeText
                                        text={captionTagsTxt ?? 'PH Room Name: Neque porro quisquam est que'}
                                        textOptions={{ wordWrap: true, wordWrapWidth: 178 }}
                                    />
                                </Region>
                            )}
                        </Region>
                    )}
                </Region>
            )}
        </Border>
    );
};
