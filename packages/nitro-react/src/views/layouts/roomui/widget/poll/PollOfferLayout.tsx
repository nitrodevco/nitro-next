import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

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
            params={32769}
            caption={t('poll_offer_window')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 382, height: 250, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Region
                    name="header_container"
                    params={1}
                    backgroundColor="#0e3f52"
                    onPointerTap={onHeaderContainer}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: -5, width: 380, top: 8, height: 95 }}
                >
                    <ThemeImage
                        name="preview_image_bg"
                        tags={[ 'bitmap' ]}
                        params={16}
                        src={srcPreviewImageBg ?? layoutImage('poll_poll_prompt_frank.png')}
                        layout={{ position: 'absolute', left: 10, width: 80, top: 7, height: 80 }}
                    />
                    <Region
                        name="poll_offer_header_wrapper"
                        params={2193}
                        layout={{ position: 'absolute', left: 110, width: 250, top: 25, height: 60, flexDirection: 'column' }}
                    >
                        {itemsPollOfferHeaderWrapper ?? (
                            <PollOfferLayoutPollOfferHeadlineItem />
                        )}
                    </Region>
                </Region>
                <Border
                    variant="2"
                    name="poll_offer_border"
                    params={2192}
                    layout={{ position: 'absolute', left: 0, width: 370, top: 100, height: 150 }}
                >
                    <Region
                        name="poll_offer_summary_wrapper"
                        params={2193}
                        layout={{ position: 'absolute', left: 8, width: 355, top: 10, height: 50, flexDirection: 'column' }}
                    >
                        {itemsPollOfferSummaryWrapper ?? (
                            <PollOfferLayoutPollOfferSummaryItem />
                        )}
                    </Region>
                    <Region
                        name="poll_options_container"
                        params={9700368}
                        layout={{ position: 'absolute', left: 120, width: 250, top: 67, height: 42 }}
                    >
                        <Region
                            name="poll_offer_button_cancel"
                            params={131073}
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
                            params={131073}
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
                            params={131089}
                            tintColor="#00aa00"
                            onPointerTap={onPollOfferButtonOk}
                            layout={{ position: 'absolute', left: 166, width: 80, top: 0, height: 40, minWidth: 80, maxWidth: 80 }}
                        >
                            {t('ok')}
                        </ButtonThick>
                    </Region>
                </Border>
            </Region>
        </Frame>
    );
};

/** Row template `poll_offer_headline` of PollOfferLayout - pass real rows through its `items…` slot. */
export interface PollOfferLayoutPollOfferHeadlineItemProps {
    captionPollOfferHeadline?: string;
    layout?: BoxLayout;
}

export const PollOfferLayoutPollOfferHeadlineItem = ({ captionPollOfferHeadline, layout }: PollOfferLayoutPollOfferHeadlineItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="poll_offer_headline"
            params={144}
            layout={{ width: 250, height: 30, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPollOfferHeadline ?? t('poll_offer_title')}
                textStyle="text-style-u-headline-big"
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `poll_offer_summary` of PollOfferLayout - pass real rows through its `items…` slot. */
export interface PollOfferLayoutPollOfferSummaryItemProps {
    captionPollOfferSummary?: string;
    layout?: BoxLayout;
}

export const PollOfferLayoutPollOfferSummaryItem = ({ captionPollOfferSummary, layout }: PollOfferLayoutPollOfferSummaryItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="poll_offer_summary"
            params={144}
            layout={{ width: 355, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPollOfferSummary ?? t('poll_offer_summary')}
                textStyle="text-style-u-regular"
                textOptions={{ wordWrap: true, wordWrapWidth: 355 }}
            />
        </Region>
    );
};
