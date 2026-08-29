import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Icon, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `3061_grs_promoted_room_category_xml` (layout "hells", 270x90) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GrsPromotedRoomCategoryLayoutProps {
    layout?: BoxLayout;
    row?: GrsPromotedRoomCategoryLayoutRowProps;
}

export const GrsPromotedRoomCategoryLayout = ({ layout, row }: GrsPromotedRoomCategoryLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 270, height: 90, ...layout }}>
            <GrsPromotedRoomCategoryLayoutRow {...row} />
        </Region>
    );
};

/** Named region `leader_region` of GrsPromotedRoomCategoryLayout - configured through the parent's `leaderRegion` prop. */
export interface GrsPromotedRoomCategoryLayoutLeaderRegionProps {
    captionLeaderNameCaptionTxt?: string;
    captionLeaderNameTxt?: string;
    layout?: BoxLayout;
    onLeaderRegion?: () => void;
    tags?: string[];
}

export const GrsPromotedRoomCategoryLayoutLeaderRegion = ({ captionLeaderNameCaptionTxt, captionLeaderNameTxt, layout, onLeaderRegion, tags }: GrsPromotedRoomCategoryLayoutLeaderRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="leader_region"
            tags={tags}
            onPointerTap={onLeaderRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 61, width: 201, bottom: 6, height: 19, ...layout }}
        >
            <Region
                name="leader_name_caption_txt"
                layout={{ position: 'absolute', left: 0, width: 166, top: 4, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionLeaderNameCaptionTxt ?? t('navigator.promotedrooms.owner')} />
            </Region>
            <Region
                name="leader_name_txt"
                layout={{ position: 'absolute', left: 49, width: 71, top: 4, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionLeaderNameTxt ?? 'WillyWallyWolly'} />
            </Region>
        </Region>
    );
};

/** Named region `toggle_open_region` of GrsPromotedRoomCategoryLayout - configured through the parent's `toggleOpenRegion` prop. */
export interface GrsPromotedRoomCategoryLayoutToggleOpenRegionProps {
    captionCloseTxt?: string;
    captionOpenTxt?: string;
    layout?: BoxLayout;
    onToggleOpenRegion?: () => void;
    tags?: string[];
}

export const GrsPromotedRoomCategoryLayoutToggleOpenRegion = ({ captionCloseTxt, captionOpenTxt, layout, onToggleOpenRegion, tags }: GrsPromotedRoomCategoryLayoutToggleOpenRegionProps) => {
    const t = useTranslation();

    return (
        <Region
            name="toggle_open_region"
            tags={tags}
            onPointerTap={onToggleOpenRegion}
            cursor="pointer"
            layout={{ position: 'absolute', left: 4, width: 263, top: 74, height: 17, ...layout }}
        >
            <Region
                name="open_txt"
                layout={{ position: 'absolute', left: -1, width: 191, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionOpenTxt ?? t('navigator.promotedrooms.viewtopten')} />
            </Region>
            <Region
                name="close_txt"
                layout={{ position: 'absolute', left: -1, width: 189, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionCloseTxt ?? t('navigator.promotedrooms.hidetopten')} />
            </Region>
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
    );
};

/** Named region `item_list` of GrsPromotedRoomCategoryLayout - configured through the parent's `itemList` prop. */
export interface GrsPromotedRoomCategoryLayoutItemListProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const GrsPromotedRoomCategoryLayoutItemList = ({ layout, tags }: GrsPromotedRoomCategoryLayoutItemListProps) => {
    return (
        <Region
            name="item_list"
            tags={tags}
            layout={{ position: 'absolute', left: 3, right: 3, top: 97, bottom: -223, flexDirection: 'column', ...layout }}
        />
    );
};

/** Named region `row` of GrsPromotedRoomCategoryLayout - configured through the parent's `row` prop. */
export interface GrsPromotedRoomCategoryLayoutRowProps {
    captionCategoryNameTxt?: string;
    captionRoomNameTxt?: string;
    itemList?: GrsPromotedRoomCategoryLayoutItemListProps;
    layout?: BoxLayout;
    leaderRegion?: GrsPromotedRoomCategoryLayoutLeaderRegionProps;
    onEnterRoomButton?: () => void;
    srcNaviRoomIcon?: string;
    tags?: string[];
    toggleOpenRegion?: GrsPromotedRoomCategoryLayoutToggleOpenRegionProps;
}

export const GrsPromotedRoomCategoryLayoutRow = ({ captionCategoryNameTxt, captionRoomNameTxt, itemList, layout, leaderRegion, onEnterRoomButton, srcNaviRoomIcon, tags, toggleOpenRegion }: GrsPromotedRoomCategoryLayoutRowProps) => {
    return (
        <Region
            name="row"
            tags={tags}
            layout={{ position: 'absolute', left: 0, width: 270, top: 0, height: 90, ...layout }}
        >
            <Border
                variant="3"
                name="category_header"
                tintColor="#999999"
                layout={{ position: 'absolute', left: 1, right: 143, top: 0, height: 22 }}
            >
                <Region
                    name="category_name_txt"
                    layout={{ position: 'absolute', left: 7, width: 59, top: 2, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionCategoryNameTxt ?? 'Dippa daa'}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
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
                />
                <GrsPromotedRoomCategoryLayoutLeaderRegion {...leaderRegion} />
                <Region
                    name="room_name_txt"
                    layout={{ position: 'absolute', left: 60, width: 147, top: 8, height: 13, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText text={captionRoomNameTxt ?? 'Dippa daa'} />
                </Region>
                <ThemeImage
                    name="navi_room_icon"
                    src={srcNaviRoomIcon}
                    layout={{ position: 'absolute', right: 13, width: 44, top: 3, height: 30 }}
                />
            </ContainerButton>
            <GrsPromotedRoomCategoryLayoutToggleOpenRegion {...toggleOpenRegion} />
            <GrsPromotedRoomCategoryLayoutItemList {...itemList} />
        </Region>
    );
};
