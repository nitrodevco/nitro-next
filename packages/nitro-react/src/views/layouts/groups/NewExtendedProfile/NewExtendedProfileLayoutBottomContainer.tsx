import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

import { NewExtendedProfileLayoutAllGroupsItem } from './NewExtendedProfileLayoutAllGroupsItem';
import { NewExtendedProfileLayoutGroupDetailsItem } from './NewExtendedProfileLayoutGroupDetailsItem';

/** Named region `bottom_container` of NewExtendedProfileLayout - configured through the parent's `bottomContainer` prop. */
export interface NewExtendedProfileLayoutBottomContainerProps {
    itemsBottom?: ReactNode;
    layout?: BoxLayout;
}

export const NewExtendedProfileLayoutBottomContainer = ({ itemsBottom, layout }: NewExtendedProfileLayoutBottomContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="bottom_container"
            layout={{ width: 500, height: 236, flexShrink: 0, ...layout }}
        >
            <Region
                name="bottom"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, flexDirection: 'row', gap: 6 }}
            >
                {itemsBottom ?? (
                    <>
                        <NewExtendedProfileLayoutAllGroupsItem />
                        <NewExtendedProfileLayoutGroupDetailsItem />
                    </>
                )}
            </Region>
            <Border
                variant="3"
                name="full_profile_hidden"
                tintColor="#cccccc"
                layout={{ position: 'absolute', left: 0, width: 498, top: 5, height: 226, justifyContent: 'center' }}
            >
                <ThemeText
                    text={t('profile.full_profile_hidden')}
                    textOptions={{ fill: '#555555' }}
                    layout={{ position: 'absolute', marginLeft: -10.5, marginRight: 10.5, width: 215, top: 104, height: 17 }}
                />
            </Border>
        </Region>
    );
};
