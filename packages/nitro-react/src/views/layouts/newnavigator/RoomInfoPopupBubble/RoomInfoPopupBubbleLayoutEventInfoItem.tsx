import { Border, BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `event_info` of RoomInfoPopupBubbleLayout - pass real rows through its `items…` slot. */
export interface RoomInfoPopupBubbleLayoutEventInfoItemProps {
    captionEventDesc?: string;
    captionEventName?: string;
    layout?: BoxLayout;
    visibleEventDesc?: boolean;
    visibleEventName?: boolean;
}

export const RoomInfoPopupBubbleLayoutEventInfoItem = ({ captionEventDesc, captionEventName, layout, visibleEventDesc, visibleEventName }: RoomInfoPopupBubbleLayoutEventInfoItemProps) => {
    return (
        <Border
            variant="3"
            name="event_info"
            tintColor="#f1a700"
            blend={0.7}
            layout={{ width: 331, height: 55, flexShrink: 0, ...layout }}
        >
            <ThemeImage
                src={layoutImage('newnavigator_event_icon.png')}
                layout={{ position: 'absolute', left: 6, width: 42, top: 9, height: 40 }}
            />
            {(visibleEventName ?? true) && (
                <Region
                    name="event_name"
                    layout={{ position: 'absolute', left: 54, width: 275, top: 3, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionEventName ?? 'EVENT NAME LOREM IPSUM DOLOR SIT AMET'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
            )}
            {(visibleEventDesc ?? true) && (
                <Region
                    name="event_desc"
                    layout={{ position: 'absolute', left: 54, width: 275, top: 19, height: 36, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionEventDesc ?? 'EVENT DESCRIPTION LOREM IPSUM DOLOR SIT AMET'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 275 }}
                    />
                </Region>
            )}
        </Border>
    );
};
