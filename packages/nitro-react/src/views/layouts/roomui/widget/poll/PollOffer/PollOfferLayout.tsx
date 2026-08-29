import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { PollOfferLayoutPollOfferHeadlineItem } from './PollOfferLayoutPollOfferHeadlineItem';
import { PollOfferLayoutPollOfferSummaryItem } from './PollOfferLayoutPollOfferSummaryItem';

/** Generated from `1016_poll_offer_xml` (layout "poll_offer", 382x250) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PollOfferLayoutProps {
    captionPollOfferButtonCancel?: string;
    captionPollOfferButtonLater?: string;
    itemsPollOfferHeaderWrapper?: ReactNode;
    itemsPollOfferSummaryWrapper?: ReactNode;
    layout?: BoxLayout;
    onClose?: () => void;
    onHeaderContainer?: () => void;
    onPollOfferButtonOk?: () => void;
    srcPreviewImageBg?: string;
}

export const PollOfferLayout = ({ captionPollOfferButtonCancel, captionPollOfferButtonLater, itemsPollOfferHeaderWrapper, itemsPollOfferSummaryWrapper, layout, onClose, onHeaderContainer, onPollOfferButtonOk, srcPreviewImageBg }: PollOfferLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="poll_offer_frame"
            name="poll_offer_frame"
            caption={t('poll_offer_window')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 382, height: 250, minWidth: 382, minHeight: 250, ...layout }}
        >
            <Region
                name="header_container"
                backgroundColor="#0e3f52"
                onPointerTap={onHeaderContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: -5, width: 380, top: 8, height: 95 }}
            >
                <ThemeImage
                    name="preview_image_bg"
                    src={srcPreviewImageBg ?? layoutImage('poll_poll_prompt_frank.png')}
                    layout={{ position: 'absolute', left: 10, width: 80, top: 7, height: 80 }}
                />
                <Region
                    name="poll_offer_header_wrapper"
                    layout={{ position: 'absolute', left: 110, right: 20, top: 25, bottom: 10, flexDirection: 'column' }}
                >
                    {itemsPollOfferHeaderWrapper ?? (
                        <PollOfferLayoutPollOfferHeadlineItem />
                    )}
                </Region>
            </Region>
            <Border
                variant="2"
                name="poll_offer_border"
                layout={{ position: 'absolute', left: 0, right: 0, top: 100, bottom: -41 }}
            >
                <Region
                    name="poll_offer_summary_wrapper"
                    layout={{ position: 'absolute', left: 8, right: 7, top: 10, bottom: 90, flexDirection: 'column' }}
                >
                    {itemsPollOfferSummaryWrapper ?? (
                        <PollOfferLayoutPollOfferSummaryItem />
                    )}
                </Region>
                <Region
                    name="poll_options_container"
                    layout={{ position: 'absolute', right: 0, width: 250, bottom: 41, height: 42 }}
                >
                    <Region
                        name="poll_offer_button_cancel"
                        layout={{ position: 'absolute', left: 1, width: 74, top: 20, height: 17, minWidth: 74, maxWidth: 74, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPollOfferButtonCancel ?? `${t('cancel')}...`}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
                    <Region
                        name="poll_offer_button_later"
                        layout={{ position: 'absolute', left: 75, width: 74, top: 20, height: 17, minWidth: 74, maxWidth: 74, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionPollOfferButtonLater ?? t('poll_offer_later')}
                            textStyle="text-style-u-regular"
                            textOptions={{ fill: '#333333' }}
                        />
                    </Region>
                    <ButtonThick
                        variant="5"
                        name="poll_offer_button_ok"
                        tintColor="#00aa00"
                        onPointerTap={onPollOfferButtonOk}
                        layout={{ position: 'absolute', left: 166, width: 80, top: 0, height: 40, minWidth: 80, maxWidth: 80 }}
                    >
                        {t('ok')}
                    </ButtonThick>
                </Region>
            </Border>
        </Frame>
    );
};
