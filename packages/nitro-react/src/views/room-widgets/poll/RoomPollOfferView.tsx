import { useTranslation } from '#base/context/system';
import { Border, ButtonThick, Frame, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

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

/**
 * The offer to take part in a poll, on the `poll_offer` layout (382x250). Refusing and deferring
 * are different answers: only the first tells the server.
 */
export const RoomPollOfferView = ({ headline, summary, onAccept, onDecline, onLater }: RoomPollOfferViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="poll-offer"
            caption={t('poll_offer_window')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onDecline}
            defaultPosition={{ x: 140, y: 80 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 382, height: 250 }}
        >
            <Region
                name="header_container"
                backgroundColor="#0e3f52"
                layout={{ position: 'absolute', left: -5, width: 380, top: 8, height: 95 }}
            >
                <ThemeImage
                    name="preview_image_bg"
                    src={LayoutImage('room-ui/poll_poll_prompt_frank.png')}
                    layout={{ position: 'absolute', left: 10, width: 80, top: 7, height: 80 }}
                />
                <ThemeText
                    text={headline}
                    textStyle="text-style-u-headline-big"
                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 250 }}
                    name="poll_offer_headline"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 110, right: 20, top: 25, bottom: 10 }}
                />
            </Region>
            <Border
                variant="2"
                name="poll_offer_border"
                layout={{ position: 'absolute', left: 0, right: 0, top: 100, bottom: -41 }}
            >
                <ThemeText
                    text={summary}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 360 }}
                    name="poll_offer_summary"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 8, right: 7, top: 10, bottom: 90 }}
                />
                <Region
                    name="poll_options_container"
                    layout={{ position: 'absolute', right: 0, width: 250, bottom: 41, height: 42 }}
                >
                    <Region
                        name="poll_offer_button_cancel"
                        onPointerTap={onDecline}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 1, width: 74, top: 20, height: 17 }}
                    >
                        <ThemeText
                            text={`${t('cancel')}...`}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#333333' }}
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
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
                    <ButtonThick
                        variant="5"
                        name="poll_offer_button_ok"
                        tintColor="#00aa00"
                        onPointerTap={onAccept}
                        layout={{ position: 'absolute', left: 166, width: 80, top: 0, height: 40 }}
                    >
                        {t('ok')}
                    </ButtonThick>
                </Region>
            </Border>
        </Frame>
    );
};
