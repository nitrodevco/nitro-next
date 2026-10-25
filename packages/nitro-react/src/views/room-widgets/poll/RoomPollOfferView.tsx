/**
 * The offer to take part in a poll - Flash `PollOfferDialog`, on `habbo-room-ui-com`'s `poll_offer`
 * layout, centred (`_window.center()`). `poll_offer_button_ok` takes part (`onOk`: `RWPM_START`);
 * `poll_offer_button_cancel` and the frame's `header_button_close` refuse for good (`onCancel` /
 * `onClose`: `RWPM_REJECT`, which tells the server); `poll_offer_button_later` only drops the offer
 * (`onLater`), sending nothing.
 *
 * The headline and summary are the poll's `htmlText`, set as markup. The constructor then grows (or shrinks) the window by what
 * `poll_offer_summary_wrapper` holds beyond its own height (`scrollableRegion.height -
 * visibleRegion.height`), which moves the border and the buttons anchored to its bottom. It does the
 * same for `poll_offer_headline_wrapper`, a name the layout does not have - its wrapper is
 * `poll_offer_header_wrapper` - so the headline never moves the window.
 */
import { TemplateWindow, TemplateWindows } from '#base/theme';

export interface RoomPollOfferViewProps {
    headline: string;
    summary: string;
    /** Take part - the poll's questions are asked for. */
    onAccept: () => void;
    /** Refuse for good: the server is told, and the poll is not offered again. */
    onDecline: () => void;
    /** Not now - the offer just goes away, and nothing is sent. */
    onLater: () => void;
}

const OFFER_TEMPLATE = 'habbo-room-ui-com/poll_offer';

const arrange = ({ root, find }: TemplateWindows) => {
    const window = root();
    const wrapper = find('poll_offer_summary_wrapper');

    if (!window || !wrapper) return;

    window.setHeight(window.height + (wrapper.scrollableRegion.height - wrapper.height));
};

export const RoomPollOfferView = ({ headline, summary, onAccept, onDecline, onLater }: RoomPollOfferViewProps) => (
    <TemplateWindow
        id={OFFER_TEMPLATE}
        frame={{ id: 'poll_offer_frame', centered: true, rememberPosition: false, onClose: onDecline }}
        bindings={{
            poll_offer_headline: { htmlText: headline },
            poll_offer_summary: { htmlText: summary },
            poll_offer_button_ok: { onPointerTap: onAccept },
            poll_offer_button_cancel: { onPointerTap: onDecline },
            poll_offer_button_later: { onPointerTap: onLater },
        }}
        arrange={arrange}
    />
);
