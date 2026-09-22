import { useTranslation } from '#base/context/system';
import { Border, ButtonThick, Frame, LayoutImage, ReflectResize, Region, ThemeImage, ThemeText } from '#base/theme';

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

/** `poll_offer`'s own height, and the height of its `poll_offer_summary_wrapper` list. */
const LAYOUT_HEIGHT = 250;
const SUMMARY_WRAPPER_HEIGHT = 50;

/**
 * The offer to take part in a poll, on the `poll_offer` layout (382x250, frame style 3, margins
 * 6/25/6/7) that `PollOfferDialog` builds and centres. Refusing and deferring are different
 * answers: only the first tells the server.
 *
 * The headline and the summary are the poll's `htmlText`. `PollOfferDialog` then grows (or
 * shrinks) the window by what the summary's item list holds beyond its 50px, so the border and
 * the buttons anchored to its bottom follow the text: the summary is a `ReflectResize` of the
 * wrapper's 50px, which hands the same difference on to the frame. (It grows by
 * `poll_offer_headline_wrapper` too, a name the layout does not have - its wrapper is
 * `poll_offer_header_wrapper` - so the headline never moves the window.)
 */
export const RoomPollOfferView = ({ headline, summary, onAccept, onDecline, onLater }: RoomPollOfferViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="poll_offer_frame"
            caption={t('poll_offer_window')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onDecline}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 6, 25, 6, 7 ]}
            layout={{ position: 'absolute', width: 382, height: LAYOUT_HEIGHT }}
        >
            <Region
                name="header_container"
                backgroundColor="#0e3f52"
                layout={{ position: 'absolute', left: -5, width: 380, top: 8, height: 95 }}
            >
                <ThemeImage
                    name="preview_image_bg"
                    src={LayoutImage('room-ui/poll_poll_prompt_frank.png')}
                    bitmap={{}}
                    layout={{ position: 'absolute', left: 10, width: 80, top: 7, height: 80 }}
                />
                <Region
                    name="poll_offer_header_wrapper"
                    layout={{ position: 'absolute', left: 110, right: 20, top: 25, bottom: 10, flexDirection: 'column' }}
                >
                    <ThemeText
                        text={headline}
                        markup
                        textStyle="u_headline_big"
                        textOptions={{ fill: '#ffffff' }}
                        clip
                        name="poll_offer_headline"
                        verticalAlign="top"
                        layout={{ height: 30, width: 250, flexShrink: 0 }}
                    />
                </Region>
            </Region>
            <Border
                variant="2"
                name="poll_offer_border"
                layout={{ position: 'absolute', left: 0, right: 0, top: 100, bottom: -32 }}
            >
                <Region
                    name="poll_offer_summary_wrapper"
                    layout={{ position: 'absolute', left: 8, right: 7, top: 10, bottom: 90, flexDirection: 'column' }}
                >
                    <ReflectResize
                        height={SUMMARY_WRAPPER_HEIGHT}
                        layout={{ width: 355, flexShrink: 0 }}
                    >
                        <ThemeText
                            text={summary}
                            markup
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 351 }}
                            name="poll_offer_summary"
                            verticalAlign="top"
                        />
                    </ReflectResize>
                </Region>
                <Region
                    name="poll_options_container"
                    layout={{ position: 'absolute', left: 120, width: 250, bottom: 41, height: 42 }}
                >
                    <Region
                        name="poll_offer_button_cancel"
                        onPointerTap={onDecline}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 1, width: 74, top: 20, height: 17 }}
                    >
                        <ThemeText
                            text={`${t('cancel')}...`}
                            textStyle="u_regular"
                            textOptions={{ fill: '#333333' }}
                            flashFormat={{ underline: true }}
                            clip
                            verticalAlign="top"
                            layout={{ width: 74, height: 17 }}
                        />
                    </Region>
                    <Region
                        name="poll_offer_button_later"
                        onPointerTap={onLater}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 75, width: 74, top: 20, height: 17 }}
                    >
                        <ThemeText
                            text={t('poll_offer_later')}
                            textStyle="u_regular"
                            textOptions={{ fill: '#333333' }}
                            flashFormat={{ underline: true }}
                            clip
                            verticalAlign="top"
                            layout={{ width: 74, height: 17 }}
                        />
                    </Region>
                    <ButtonThick
                        variant="5"
                        name="poll_offer_button_ok"
                        tintColor="#00aa00"
                        onPointerTap={onAccept}
                        layout={{ position: 'absolute', left: 166, width: 80, top: 0, height: 40, minWidth: 80, maxWidth: 80 }}
                    >
                        {t('ok')}
                    </ButtonThick>
                </Region>
            </Border>
        </Frame>
    );
};
