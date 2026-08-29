import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Region, ThemeText } from '#base/theme';

import { AvatareditorWardrobeBaseLayoutHcIconItem } from './AvatareditorWardrobeBaseLayoutHcIconItem';
import { AvatareditorWardrobeBaseLayoutSlotsColumnsList, AvatareditorWardrobeBaseLayoutSlotsColumnsListProps } from './AvatareditorWardrobeBaseLayoutSlotsColumnsList';

/** Named region `main_container` of AvatareditorWardrobeBaseLayout - configured through the parent's `mainContainer` prop. */
export interface AvatareditorWardrobeBaseLayoutMainContainerProps {
    itemsHeader?: ReactNode;
    layout?: BoxLayout;
    slotsColumnsList?: AvatareditorWardrobeBaseLayoutSlotsColumnsListProps;
}

export const AvatareditorWardrobeBaseLayoutMainContainer = ({ itemsHeader, layout, slotsColumnsList }: AvatareditorWardrobeBaseLayoutMainContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="main_container"
            layout={{ width: 168, height: 490, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            <Region
                name="header"
                layout={{ position: 'absolute', marginLeft: 9, marginRight: -9, width: 186, top: 19, height: 23, flexDirection: 'row', gap: 10 }}
            >
                {itemsHeader ?? (
                    <AvatareditorWardrobeBaseLayoutHcIconItem />
                )}
                <Region layout={{ width: 158, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <ThemeText
                        text={t('avatareditor.wardrobe.title')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#83827e' }}
                    />
                </Region>
            </Region>
            <Border
                variant="4"
                tintColor="#cbcbcb"
                layout={{ position: 'absolute', left: 15, width: 139, top: 53, height: 418 }}
            >
                <AvatareditorWardrobeBaseLayoutSlotsColumnsList {...slotsColumnsList} />
            </Border>
        </Region>
    );
};
