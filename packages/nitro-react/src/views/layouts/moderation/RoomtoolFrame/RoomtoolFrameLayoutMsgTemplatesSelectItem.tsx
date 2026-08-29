import { BoxLayout, Dropmenu } from '#base/theme';

/** Row template `msgTemplatesSelect` of RoomtoolFrameLayout - pass real rows through its `items…` slot. */
export interface RoomtoolFrameLayoutMsgTemplatesSelectItemProps {
    layout?: BoxLayout;
    onMsgTemplatesSelect?: () => void;
}

export const RoomtoolFrameLayoutMsgTemplatesSelectItem = ({ layout, onMsgTemplatesSelect }: RoomtoolFrameLayoutMsgTemplatesSelectItemProps) => {
    return (
        <Dropmenu
            variant="0"
            name="msgTemplatesSelect"
            onPointerTap={onMsgTemplatesSelect}
            layout={{ width: 227, height: 20, flexShrink: 0, ...layout }}
        >
            Select from message templates
        </Dropmenu>
    );
};
