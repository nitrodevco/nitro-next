import { Border, BoxLayout } from '#base/theme';

/** Row template `event_cont` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutEventContItemProps {
    layout?: BoxLayout;
}

export const RoomtoolFrameLayoutEventContItem = ({ layout }: RoomtoolFrameLayoutEventContItemProps) => {
    return (
        <Border
            variant="0"
            name="event_cont"
            layout={{ width: 230, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
