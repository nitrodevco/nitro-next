import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Named region `extra_cont` of GrsGuestRoomDetailsLongLayout - configured through the parent's `extraCont` prop. */
export interface GrsGuestRoomDetailsLongLayoutExtraContProps {
    captionRating?: string;
    captionRatingCaption?: string;
    captionStartedat?: string;
    captionStartedatCaption?: string;
    layout?: BoxLayout;
    onTags?: () => void;
    tags?: ReactNode;
}

export const GrsGuestRoomDetailsLongLayoutExtraCont = ({ captionRating, captionRatingCaption, captionStartedat, captionStartedatCaption, layout, onTags, tags }: GrsGuestRoomDetailsLongLayoutExtraContProps) => {
    const t = useTranslation();

    return (
        <Region
            name="extra_cont"
            layout={{ position: 'absolute', left: 0, width: 233, top: 90, height: 70, ...layout }}
        >
            <Region
                name="tags"
                onPointerTap={onTags}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 40 }}
            >
                {tags}
            </Region>
            <Region
                name="startedat_cont"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 12 }}
            >
                <ThemeText
                    text={captionStartedatCaption ?? t('navigator.eventstartedat')}
                    name="startedat.caption"
                    layout={{ position: 'absolute', left: 0, width: 155, top: 0, height: 13 }}
                />
                <ThemeText
                    text={captionStartedat ?? 'PH: 15:48'}
                    name="startedat"
                    layout={{ position: 'absolute', left: 50, width: 46, top: 0, height: 13 }}
                />
            </Region>
            <Region
                name="rating_cont"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, height: 12 }}
            >
                <ThemeText
                    text={captionRatingCaption ?? t('navigator.ratingcaption')}
                    name="rating.caption"
                    layout={{ position: 'absolute', left: 0, width: 142, top: 0, height: 13 }}
                />
                <ThemeText
                    text={captionRating ?? '999'}
                    name="rating"
                    layout={{ position: 'absolute', left: 50, width: 21, top: 0, height: 13 }}
                />
            </Region>
        </Region>
    );
};
