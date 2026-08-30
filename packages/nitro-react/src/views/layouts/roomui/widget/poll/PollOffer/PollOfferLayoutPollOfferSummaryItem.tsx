import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `poll_offer_summary` of PollOfferLayout - pass real rows through its `items…` slot. */
export interface PollOfferLayoutPollOfferSummaryItemProps {
    captionPollOfferSummary?: string;
    layout?: BoxLayout;
}

export const PollOfferLayoutPollOfferSummaryItem = ({ captionPollOfferSummary, layout }: PollOfferLayoutPollOfferSummaryItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPollOfferSummary ?? t('poll_offer_summary')}
            textStyle="text-style-u-regular"
            textOptions={{ wordWrap: true, wordWrapWidth: 355 }}
            name="poll_offer_summary"
            verticalAlign="top"
            layout={{ width: 355, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
