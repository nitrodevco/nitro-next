import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Icon, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Named region `row` of GrsPromotedRoomCategoryLayout - configured through the parent's `row` prop. */
export interface GrsPromotedRoomCategoryLayoutRowProps {
    avatarImageWidget?: ReactNode;
    captionCategoryNameTxt?: string;
    captionCloseTxt?: string;
    captionLeaderNameCaptionTxt?: string;
    captionLeaderNameTxt?: string;
    captionOpenTxt?: string;
    captionRoomNameTxt?: string;
    itemsItemList?: ReactNode;
    layout?: BoxLayout;
    onEnterRoomButton?: () => void;
    onLeaderRegion?: () => void;
    onToggleOpenRegion?: () => void;
    srcNaviRoomIcon?: string;
    tintNaviRoomIcon?: string;
}

export const GrsPromotedRoomCategoryLayoutRow = ({ avatarImageWidget, captionCategoryNameTxt, captionCloseTxt, captionLeaderNameCaptionTxt, captionLeaderNameTxt, captionOpenTxt, captionRoomNameTxt, itemsItemList, layout, onEnterRoomButton, onLeaderRegion, onToggleOpenRegion, srcNaviRoomIcon, tintNaviRoomIcon }: GrsPromotedRoomCategoryLayoutRowProps) => {
    const t = useTranslation();

    return (
        <Region
            name="row"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
        >
            <Border
                variant="3"
                name="category_header"
                tintColor="#999999"
                layout={{ position: 'absolute', left: 1, right: 143, top: 0, height: 22 }}
            >
                <ThemeText
                    text={captionCategoryNameTxt ?? 'Dippa daa'}
                    textOptions={{ fill: '#ffffff' }}
                    name="category_name_txt"
                    layout={{ position: 'absolute', left: 7, width: 59, top: 2, height: 13 }}
                />
            </Border>
            <ContainerButton
                variant="3"
                name="enter_room_button"
                onPointerTap={onEnterRoomButton}
                layout={{ position: 'absolute', left: 1, right: 0, top: 19, height: 53 }}
            >
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar_image_widget"
                    layout={{ position: 'absolute', left: -13, width: 90, top: -26, height: 130 }}
                >
                    {avatarImageWidget}
                </WidgetSlot>
                <Region
                    name="leader_region"
                    onPointerTap={onLeaderRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 61, width: 201, bottom: 6, height: 19 }}
                >
                    <ThemeText
                        text={captionLeaderNameCaptionTxt ?? t('navigator.promotedrooms.owner')}
                        name="leader_name_caption_txt"
                        layout={{ position: 'absolute', left: 0, width: 166, top: 4, height: 13 }}
                    />
                    <ThemeText
                        text={captionLeaderNameTxt ?? 'WillyWallyWolly'}
                        name="leader_name_txt"
                        layout={{ position: 'absolute', left: 49, width: 71, top: 4, height: 13 }}
                    />
                </Region>
                <ThemeText
                    text={captionRoomNameTxt ?? 'Dippa daa'}
                    name="room_name_txt"
                    layout={{ position: 'absolute', left: 60, width: 147, top: 8, height: 13 }}
                />
                <ThemeImage
                    name="navi_room_icon"
                    src={srcNaviRoomIcon}
                    tint={tintNaviRoomIcon}
                    layout={{ position: 'absolute', right: 13, width: 44, top: 3, height: 30 }}
                />
            </ContainerButton>
            <Region
                name="toggle_open_region"
                onPointerTap={onToggleOpenRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 4, width: 263, top: 74, height: 17 }}
            >
                <ThemeText
                    text={captionOpenTxt ?? t('navigator.promotedrooms.viewtopten')}
                    name="open_txt"
                    layout={{ position: 'absolute', left: -1, width: 191, top: 2, height: 13 }}
                />
                <ThemeText
                    text={captionCloseTxt ?? t('navigator.promotedrooms.hidetopten')}
                    name="close_txt"
                    layout={{ position: 'absolute', left: -1, width: 189, top: 2, height: 13 }}
                />
                <Icon
                    variant="5"
                    name="arrow_right_icon"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 252, width: 12, top: 5, height: 18 }}
                />
                <Icon
                    variant="7"
                    name="arrow_down_icon"
                    tintColor="#000000"
                    layout={{ position: 'absolute', left: 249, width: 12, top: 7, height: 18 }}
                />
            </Region>
            <Region
                name="item_list"
                layout={{ position: 'absolute', left: 3, right: 3, top: 97, bottom: -223, flexDirection: 'column' }}
            >
                {itemsItemList}
            </Region>
        </Region>
    );
};
