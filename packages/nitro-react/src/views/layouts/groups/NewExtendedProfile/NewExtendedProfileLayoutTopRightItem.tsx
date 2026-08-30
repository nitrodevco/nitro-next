import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

import { NewExtendedProfileLayoutRelationships, NewExtendedProfileLayoutRelationshipsProps } from './NewExtendedProfileLayoutRelationships';

/** Row template `top_right` of NewExtendedProfileLayout - pass real rows through its `items…` slot. */
export interface NewExtendedProfileLayoutTopRightItemProps {
    captionFriendCount?: string;
    captionRelStatusLabelTxt?: string;
    layout?: BoxLayout;
    relationships?: NewExtendedProfileLayoutRelationshipsProps;
    visibleFriendCount?: boolean;
    visibleRelationships?: boolean;
    visibleRelStatusLabelTxt?: boolean;
}

export const NewExtendedProfileLayoutTopRightItem = ({ captionFriendCount, captionRelStatusLabelTxt, layout, relationships, visibleFriendCount, visibleRelationships, visibleRelStatusLabelTxt }: NewExtendedProfileLayoutTopRightItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="top_right"
            layout={{ width: 226, height: 192, flexShrink: 0, ...layout }}
        >
            {(visibleFriendCount ?? true) && (
                <ThemeText
                    text={captionFriendCount ?? t('extendedprofile.friends.count')}
                    name="friend_count"
                    layout={{ position: 'absolute', left: 0, width: 161, top: 5, height: 16 }}
                />
            )}
            {(visibleRelStatusLabelTxt ?? true) && (
                <ThemeText
                    text={captionRelStatusLabelTxt ?? t('extendedprofile.relstatus')}
                    textStyle="text-style-u-bold"
                    name="rel_status_label_txt"
                    layout={{ position: 'absolute', left: 0, width: 150, top: 24, height: 17 }}
                />
            )}
            {(visibleRelationships ?? true) && (
                <NewExtendedProfileLayoutRelationships {...relationships} />
            )}
        </Region>
    );
};
