import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

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
