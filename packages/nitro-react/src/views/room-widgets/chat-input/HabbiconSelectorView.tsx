import { GlobalRect } from '#base/theme';
import { HabbiconPickerLook, HabbiconPickerView } from '#base/views/habbicons/HabbiconPickerView';

/**
 * The chat bar's habbicon menu - `HabbiconSelector` over `habbo-room-ui-com/habbiconselector_menu_xml`,
 * drawn by the shared `HabbiconPickerView` (the messenger's picker is the same code).
 *
 * Flash hides the menu on a press on the room (`RoomDesktop.hideTransientSelectors`); this menu,
 * like the chat style one, closes on a press anywhere outside it.
 */
const LOOK: HabbiconPickerLook = {
    template: 'habbo-room-ui-com/habbiconselector_menu_xml',
    width: 245,
    minHeight: 91,
    maxHeight: 292,
    topBarHeight: 42,
    bottomPadding: 6,
    columns: 5,
    slotSize: 42,
    slotSpacing: 2,
    filledColor: 0x1f1f1f,
    emptyColor: 0x343434,
    hoverColor: 0x2a2a2a,
};

/** `SCREEN_LEFT_BORDER` / `CHAT_BAR_POPUP_OFFSET`: the menu stays right of 92 and its bottom 55 above the button's. */
const SCREEN_LEFT_BORDER = 92;
const CHAT_BAR_POPUP_OFFSET = 55;

export interface HabbiconSelectorViewProps {
    /** `chat_extra_button` on screen: `alignToAnchor` puts the menu at its x, its bottom 55 above the button's. */
    anchor: GlobalRect;
    /** A habbicon picked; the shift key keeps the menu up. */
    onPick: (habbiconId: number, keepOpen: boolean) => void;
    onOpenHub: () => void;
    onClose: () => void;
}

export const HabbiconSelectorView = ({ anchor, onPick, onOpenHub, onClose }: HabbiconSelectorViewProps) => (
    // `alignToAnchor`: at the button's x, kept right of 92; its bottom 55 above the button's, kept on screen.
    <HabbiconPickerView
        look={LOOK}
        x={Math.max(SCREEN_LEFT_BORDER, Math.round(anchor.x))}
        bottom={Math.round(anchor.y + anchor.height) - CHAT_BAR_POPUP_OFFSET}
        onPick={onPick}
        onOpenHub={onOpenHub}
        onClose={onClose}
    />
);
