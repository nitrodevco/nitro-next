import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, Frame, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1016_poll_offer_xml` (layout "poll_offer", 382x250) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface PollOfferLayoutProps {
    headerContainer?: PollOfferLayoutHeaderContainerProps;
    layout?: BoxLayout;
    onClose?: () => void;
    pollOfferSummaryWrapper?: PollOfferLayoutPollOfferSummaryWrapperProps;
    pollOptionsContainer?: PollOfferLayoutPollOptionsContainerProps;
}

export const PollOfferLayout = ({ headerContainer, layout, onClose, pollOfferSummaryWrapper, pollOptionsContainer }: PollOfferLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="poll_offer_frame"
            name="poll_offer_frame"
            caption={t('poll_offer_window')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 382, height: 250, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <PollOfferLayoutHeaderContainer {...headerContainer} />
                <Border
                    variant="2"
                    name="poll_offer_border"
                    layout={{ position: 'absolute', left: 0, right: 12, top: 100, bottom: 0 }}
                >
                    <PollOfferLayoutPollOfferSummaryWrapper {...pollOfferSummaryWrapper} />
                    <PollOfferLayoutPollOptionsContainer {...pollOptionsContainer} />
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

/** Named region `poll_offer_header_wrapper` of PollOfferLayout - configured through the parent's `pollOfferHeaderWrapper` prop. */
export interface PollOfferLayoutPollOfferHeaderWrapperProps {
    itemsPollOfferHeaderWrapper?: ReactNode;
    layout?: BoxLayout;
}

export const PollOfferLayoutPollOfferHeaderWrapper = ({ itemsPollOfferHeaderWrapper, layout }: PollOfferLayoutPollOfferHeaderWrapperProps) => {
    return (
        <Region
            name="poll_offer_header_wrapper"
            layout={{ position: 'absolute', left: 110, right: 20, top: 25, bottom: 10, flexDirection: 'column', ...layout }}
        >
            {itemsPollOfferHeaderWrapper ?? (
                <PollOfferLayoutPollOfferHeadlineItem />
            )}
        </Region>
    );
};

/** Named region `header_container` of PollOfferLayout - configured through the parent's `headerContainer` prop. */
export interface PollOfferLayoutHeaderContainerProps {
    layout?: BoxLayout;
    onHeaderContainer?: () => void;
    pollOfferHeaderWrapper?: PollOfferLayoutPollOfferHeaderWrapperProps;
    srcPreviewImageBg?: string;
}

export const PollOfferLayoutHeaderContainer = ({ layout, onHeaderContainer, pollOfferHeaderWrapper, srcPreviewImageBg }: PollOfferLayoutHeaderContainerProps) => {
    return (
        <Region
            name="header_container"
            backgroundColor="#0e3f52"
            onPointerTap={onHeaderContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: -5, width: 380, top: 8, height: 95, ...layout }}
        >
            <ThemeImage
                name="preview_image_bg"
                src={srcPreviewImageBg ?? layoutImage('poll_poll_prompt_frank.png')}
                layout={{ position: 'absolute', left: 10, width: 80, top: 7, height: 80 }}
            />
            <PollOfferLayoutPollOfferHeaderWrapper {...pollOfferHeaderWrapper} />
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

/** Named region `poll_offer_summary_wrapper` of PollOfferLayout - configured through the parent's `pollOfferSummaryWrapper` prop. */
export interface PollOfferLayoutPollOfferSummaryWrapperProps {
    itemsPollOfferSummaryWrapper?: ReactNode;
    layout?: BoxLayout;
}

export const PollOfferLayoutPollOfferSummaryWrapper = ({ itemsPollOfferSummaryWrapper, layout }: PollOfferLayoutPollOfferSummaryWrapperProps) => {
    return (
        <Region
            name="poll_offer_summary_wrapper"
            layout={{ position: 'absolute', left: 8, right: 7, top: 10, bottom: 90, flexDirection: 'column', ...layout }}
        >
            {itemsPollOfferSummaryWrapper ?? (
                <PollOfferLayoutPollOfferSummaryItem />
            )}
        </Region>
    );
};

/** Named region `poll_options_container` of PollOfferLayout - configured through the parent's `pollOptionsContainer` prop. */
export interface PollOfferLayoutPollOptionsContainerProps {
    captionPollOfferButtonCancel?: string;
    captionPollOfferButtonLater?: string;
    layout?: BoxLayout;
    onPollOfferButtonOk?: () => void;
}

export const PollOfferLayoutPollOptionsContainer = ({ captionPollOfferButtonCancel, captionPollOfferButtonLater, layout, onPollOfferButtonOk }: PollOfferLayoutPollOptionsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="poll_options_container"
            layout={{ position: 'absolute', right: 0, width: 250, bottom: 41, height: 42, ...layout }}
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
    );
};
