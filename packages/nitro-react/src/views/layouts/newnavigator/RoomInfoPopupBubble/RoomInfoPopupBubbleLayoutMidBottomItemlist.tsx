import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { RoomInfoPopupBubbleLayoutReportContainerItem } from './RoomInfoPopupBubbleLayoutReportContainerItem';
import { RoomInfoPopupBubbleLayoutSettingsContainerItem } from './RoomInfoPopupBubbleLayoutSettingsContainerItem';

/** Named region `midBottom_itemlist` of RoomInfoPopupBubbleLayout - configured through the parent's `midBottomItemlist` prop. */
export interface RoomInfoPopupBubbleLayoutMidBottomItemlistProps {
    itemsMidBottomItemlist?: ReactNode;
    layout?: BoxLayout;
    onFavoriteRegion?: () => void;
    onHomeRegion?: () => void;
    srcFavoriteIcon?: string;
    srcHomeIcon?: string;
}

export const RoomInfoPopupBubbleLayoutMidBottomItemlist = ({ itemsMidBottomItemlist, layout, onFavoriteRegion, onHomeRegion, srcFavoriteIcon, srcHomeIcon }: RoomInfoPopupBubbleLayoutMidBottomItemlistProps) => {
    const t = useTranslation();

    return (
        <Region
            name="midBottom_itemlist"
            layout={{ position: 'absolute', left: 12, right: -12, top: 0, bottom: 0, flexDirection: 'column', ...layout }}
        >
            {itemsMidBottomItemlist ?? (
                <>
                    <RoomInfoPopupBubbleLayoutSettingsContainerItem />
                    <RoomInfoPopupBubbleLayoutReportContainerItem />
                </>
            )}
            <Region layout={{ alignSelf: 'stretch', height: 20, flexShrink: 0 }}>
                <Region
                    name="favorite_region"
                    onPointerTap={onFavoriteRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, bottom: 0 }}
                >
                    <ThemeImage
                        name="favorite_icon"
                        src={srcFavoriteIcon ?? layoutImage('newnavigator_icon_fav_no.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <ThemeText
                    text={t('navigator.room.popup.room.info.favorite')}
                    layout={{ position: 'absolute', left: 20, width: 236, top: 0, bottom: 3 }}
                />
            </Region>
            <Region layout={{ alignSelf: 'stretch', height: 20, flexShrink: 0 }}>
                <Region
                    name="home_region"
                    onPointerTap={onHomeRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 0, width: 20, top: 0, bottom: 0 }}
                >
                    <ThemeImage
                        name="home_icon"
                        src={srcHomeIcon ?? layoutImage('newnavigator_icon_home_no.png')}
                        layout={{ position: 'absolute', left: 0, width: 20, top: 0, height: 20 }}
                    />
                </Region>
                <ThemeText
                    text={t('navigator.room.popup.room.info.home')}
                    layout={{ position: 'absolute', left: 20, width: 224, top: 0, bottom: 3 }}
                />
            </Region>
        </Region>
    );
};
