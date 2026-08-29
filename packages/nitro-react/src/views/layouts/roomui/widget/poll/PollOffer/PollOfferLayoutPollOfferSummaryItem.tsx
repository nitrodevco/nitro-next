import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

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
