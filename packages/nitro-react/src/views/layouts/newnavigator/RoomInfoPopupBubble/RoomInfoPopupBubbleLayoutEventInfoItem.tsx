import { Border, BoxLayout, ThemeImage, ThemeText } from '#base/theme';
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
                <ThemeText
                    text={captionEventName ?? 'EVENT NAME LOREM IPSUM DOLOR SIT AMET'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff' }}
                    name="event_name"
                    layout={{ position: 'absolute', right: 2, width: 275, top: 3, height: 16 }}
                />
            )}
            {(visibleEventDesc ?? true) && (
                <ThemeText
                    text={captionEventDesc ?? 'EVENT DESCRIPTION LOREM IPSUM DOLOR SIT AMET'}
                    textStyle="text-style-u-bold"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 275 }}
                    name="event_desc"
                    verticalAlign="top"
                    layout={{ position: 'absolute', right: 2, width: 275, bottom: 0, height: 36 }}
                />
            )}
        </Border>
    );
};
