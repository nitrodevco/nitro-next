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
                <Region
                    name="friend_count"
                    layout={{ position: 'absolute', left: 0, width: 161, top: 5, height: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    {captionFriendCount ?? t('extendedprofile.friends.count')}
                </Region>
            )}
            {(visibleRelStatusLabelTxt ?? true) && (
                <Region
                    name="rel_status_label_txt"
                    layout={{ position: 'absolute', left: 0, width: 150, top: 24, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionRelStatusLabelTxt ?? t('extendedprofile.relstatus')}
                        textStyle="text-style-u-bold"
                    />
                </Region>
            )}
            {(visibleRelationships ?? true) && (
                <NewExtendedProfileLayoutRelationships {...relationships} />
            )}
        </Region>
    );
};
