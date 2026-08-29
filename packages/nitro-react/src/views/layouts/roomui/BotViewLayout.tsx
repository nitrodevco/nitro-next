import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, CloseButton, Region, TextInput, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `896_bot_view_xml` (layout "bot_view", 1036x400) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface BotViewLayoutProps {
    infostandElementList?: BotViewLayoutInfostandElementListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const BotViewLayout = ({ infostandElementList, layout, onClose }: BotViewLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 1036, height: 400, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, width: 1036, top: 0, height: 400, flexDirection: 'column', gap: 10 }}>
                <Border
                    variant="1"
                    name="info_border"
                    layout={{ width: 190, height: 350, flexShrink: 0 }}
                >
                    <CloseButton
                        variant="1"
                        tags={[ 'close' ]}
                        onPointerTap={onClose}
                        layout={{ position: 'absolute', left: 168, width: 18, top: 6, height: 16 }}
                    />
                    <BotViewLayoutInfostandElementList {...infostandElementList} />
                </Border>
            </Region>
        </Region>
    );
};

/** Row template `name_text` of BotViewLayout - pass real rows through its `items…` slot. */
export interface BotViewLayoutNameTextItemProps {
    captionNameText?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const BotViewLayoutNameTextItem = ({ captionNameText, layout, tags }: BotViewLayoutNameTextItemProps) => {
    return (
        <Region
            name="name_text"
            tags={tags}
            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
            backgroundColor="#3d3d3d"
        >
            <ThemeText
                text={captionNameText ?? ''}
                textOptions={{ fill: '#ffffff' }}
            />
        </Region>
    );
};

/** Row template `images_spacer` of BotViewLayout - pass real rows through its `items…` slot. */
export interface BotViewLayoutImagesSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const BotViewLayoutImagesSpacerItem = ({ layout, tags }: BotViewLayoutImagesSpacerItemProps) => {
    return (
        <Region
            name="images_spacer"
            tags={tags}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `image_and_badges_container` of BotViewLayout - pass real rows through its `items…` slot. */
export interface BotViewLayoutImageAndBadgesContainerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const BotViewLayoutImageAndBadgesContainerItem = ({ layout, tags }: BotViewLayoutImageAndBadgesContainerItemProps) => {
    return (
        <Region
            name="image_and_badges_container"
            tags={tags}
            backgroundColor="#6d6d6d"
            layout={{ width: 193, height: 132, flexShrink: 0, ...layout }}
        >
            <Border
                variant="0"
                name="grey_bg"
                tintColor="#666666"
                layout={{ position: 'absolute', left: 16, width: 67, top: 0, height: 130, justifyContent: 'center' }}
            >
                <WidgetSlot
                    widgetType="avatar_image"
                    name="avatar_image"
                    options={{ 'avatar_image:cropped': 'true', 'avatar_image:direction': 'southwest' }}
                    layout={{ position: 'absolute', marginLeft: -0.5, marginRight: 0.5, width: 34, alignSelf: 'center', height: 84 }}
                />
            </Border>
            <WidgetSlot
                widgetType="badge_image"
                name="badge_0"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 88, width: 42, top: 1, height: 42 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_group"
                options={{ 'badge_image:type': 'group', 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 131, width: 42, top: 1, height: 42 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_1"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 88, width: 42, top: 44, height: 42 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_2"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 131, width: 42, top: 44, height: 42 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_3"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 88, width: 42, top: 87, height: 42 }}
            />
            <WidgetSlot
                widgetType="badge_image"
                name="badge_4"
                options={{ 'badge_image:pivot_point': 'center', 'badge_image:stretched_x': 'false', 'badge_image:stretched_y': 'false' }}
                layout={{ position: 'absolute', left: 131, width: 42, top: 87, height: 42 }}
            />
        </Region>
    );
};

/** Row template `motto_spacer` of BotViewLayout - pass real rows through its `items…` slot. */
export interface BotViewLayoutMottoSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const BotViewLayoutMottoSpacerItem = ({ layout, tags }: BotViewLayoutMottoSpacerItemProps) => {
    return (
        <Region
            name="motto_spacer"
            tags={tags}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `motto_container` of BotViewLayout - pass real rows through its `items…` slot. */
export interface BotViewLayoutMottoContainerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const BotViewLayoutMottoContainerItem = ({ layout, tags }: BotViewLayoutMottoContainerItemProps) => {
    const [ mottoTextValue, setMottoTextValue ] = useState('');

    return (
        <Border
            variant="0"
            name="motto_container"
            tags={tags}
            tintColor="#666666"
            layout={{ width: 170, height: 57, flexShrink: 0, ...layout }}
        >
            <TextInput
                value={mottoTextValue}
                onChange={setMottoTextValue}
                maxLength={38}
                textColor="#ffffff"
                layout={{ position: 'absolute', left: 5, width: 160, top: 2, height: 53 }}
            />
        </Border>
    );
};

/** Row template `handitem_spacer` of BotViewLayout - pass real rows through its `items…` slot. */
export interface BotViewLayoutHanditemSpacerItemProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const BotViewLayoutHanditemSpacerItem = ({ layout, tags }: BotViewLayoutHanditemSpacerItemProps) => {
    return (
        <Region
            name="handitem_spacer"
            tags={tags}
            backgroundColor="#333333"
            layout={{ width: 170, height: 1, flexShrink: 0, ...layout }}
        />
    );
};

/** Row template `handitem_txt` of BotViewLayout - pass real rows through its `items…` slot. */
export interface BotViewLayoutHanditemTxtItemProps {
    captionHanditemTxt?: string;
    layout?: BoxLayout;
    tags?: string[];
}

export const BotViewLayoutHanditemTxtItem = ({ captionHanditemTxt, layout, tags }: BotViewLayoutHanditemTxtItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="handitem_txt"
            tags={tags}
            layout={{ width: 170, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionHanditemTxt ?? t('infostand.text.handitem')}
                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 170 }}
            />
        </Region>
    );
};

/** Named region `infostand_element_list` of BotViewLayout - configured through the parent's `infostandElementList` prop. */
export interface BotViewLayoutInfostandElementListProps {
    itemsInfostandElementList?: ReactNode;
    layout?: BoxLayout;
    tags?: string[];
}

export const BotViewLayoutInfostandElementList = ({ itemsInfostandElementList, layout, tags }: BotViewLayoutInfostandElementListProps) => {
    return (
        <Region
            name="infostand_element_list"
            tags={tags}
            layout={{ position: 'absolute', left: 10, width: 170, top: 10, height: 330, flexDirection: 'column', gap: 3, ...layout }}
        >
            {itemsInfostandElementList ?? (
                <>
                    <BotViewLayoutNameTextItem />
                    <BotViewLayoutImagesSpacerItem />
                    <BotViewLayoutImageAndBadgesContainerItem />
                    <BotViewLayoutMottoSpacerItem />
                    <BotViewLayoutMottoContainerItem />
                    <BotViewLayoutHanditemSpacerItem />
                    <BotViewLayoutHanditemTxtItem />
                </>
            )}
        </Region>
    );
};
