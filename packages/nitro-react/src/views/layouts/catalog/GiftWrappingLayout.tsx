import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, CheckBox, ContainerButton, Frame, Icon, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1602_gift_wrapping_xml` (layout "gift_wrapping", 342x482) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GiftWrappingLayoutProps {
    captionBoxColorTitle?: string;
    captionCancelLink?: string;
    captionMessageFrom?: string;
    captionMessageInputHint?: string;
    captionNameInputHint?: string;
    captionPickBoxTitle?: string;
    captionPickRibbonTitle?: string;
    captionShowFaceCheckboxTitle?: string;
    itemsPriceBoxContainer?: ReactNode;
    layout?: BoxLayout;
    onBoxNext?: () => void;
    onBoxPrev?: () => void;
    onCancelLinkRegion?: () => void;
    onClose?: () => void;
    onGiveGiftButton?: () => void;
    onRibbonNext?: () => void;
    onRibbonPrev?: () => void;
    onShowFaceCheckbox?: () => void;
    onSuggestionContainer?: () => void;
    srcAvatarImage?: string;
    srcGiftCard?: string;
    srcProductImage?: string;
    srcWriteDeco?: string;
    visibleSuggestionContainer?: boolean;
}

export const GiftWrappingLayout = ({ captionBoxColorTitle, captionCancelLink, captionMessageFrom, captionMessageInputHint, captionNameInputHint, captionPickBoxTitle, captionPickRibbonTitle, captionShowFaceCheckboxTitle, itemsPriceBoxContainer, layout, onBoxNext, onBoxPrev, onCancelLinkRegion, onClose, onGiveGiftButton, onRibbonNext, onRibbonPrev, onShowFaceCheckbox, onSuggestionContainer, srcAvatarImage, srcGiftCard, srcProductImage, srcWriteDeco, visibleSuggestionContainer }: GiftWrappingLayoutProps) => {
    const t = useTranslation();
    const [ nameInputValue, setNameInputValue ] = useState('');
    const [ messageInputValue, setMessageInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            params={33025}
            caption={t('catalog.gift_wrapping.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 342, height: 482, ...layout }}
        >
            <Region layout={{ position: 'relative', flex: 1, width: '100%' }}>
                <Border
                    variant="3"
                    params={2192}
                    tintColor="#e9e9e9"
                    layout={{ position: 'absolute', left: 0, right: 12, top: 10, bottom: 32 }}
                >
                    <Border
                        variant="0"
                        name="name_border"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 284, top: 12, height: 27 }}
                    >
                        <TextInput
                            value={nameInputValue}
                            onChange={setNameInputValue}
                            maxLength={32}
                            layout={{ position: 'absolute', left: 8, right: 10, top: 3, bottom: 3 }}
                        />
                        <Region
                            name="name_input_hint"
                            params={16}
                            visible={false}
                            layout={{ position: 'absolute', left: 8, width: 266, top: 3, height: 21, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionNameInputHint ?? ''}
                                textStyle="text-style-u-italic"
                                textOptions={{ fill: '#777777' }}
                            />
                        </Region>
                    </Border>
                    <ThemeImage
                        name="write_deco"
                        params={16}
                        src={srcWriteDeco ?? layoutImage('common_small_pen.png')}
                        layout={{ position: 'absolute', left: 301, width: 17, top: 15, height: 18 }}
                    />
                    <Region
                        name="suggestion_container"
                        params={147457}
                        visible={visibleSuggestionContainer ?? false}
                        backgroundColor="#999999"
                        onPointerTap={onSuggestionContainer}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 18, width: 264, top: 39, height: 0, minWidth: 150, maxWidth: 267 }}
                    >
                        <Region
                            params={12730385}
                            backgroundColor="#ffffff"
                            layout={{ position: 'absolute', left: 1, width: 263, top: 0, height: 0, minWidth: 150, maxWidth: 265 }}
                        >
                            <Region
                                name="suggestion_list"
                                params={12730385}
                                layout={{ position: 'absolute', left: 1, top: 0, minWidth: 148, maxWidth: 262, flexDirection: 'column' }}
                            />
                        </Region>
                    </Region>
                    <ThemeImage
                        name="gift_card"
                        params={16}
                        src={srcGiftCard ?? layoutImage('catalogue_giftcard_blank.png')}
                        layout={{ position: 'absolute', left: 10, width: 306, top: 56, height: 149 }}
                    />
                    <Region
                        name="avatar_image_container"
                        params={16}
                        layout={{ position: 'absolute', left: 15, width: 60, top: 51, height: 149, minWidth: 60, maxWidth: 60, minHeight: 149, maxHeight: 149 }}
                    >
                        <ThemeImage
                            name="avatar_image"
                            params={3935440}
                            src={srcAvatarImage}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -30, width: 60, top: '50%', marginTop: -74.5, height: 149 }}
                        />
                    </Region>
                    <TextInput
                        value={messageInputValue}
                        onChange={setMessageInputValue}
                        maxLength={140}
                        multiline
                        layout={{ position: 'absolute', left: 95, width: 190, top: 77, height: 100 }}
                    />
                    <Region
                        name="message_input_hint"
                        params={16}
                        visible={false}
                        layout={{ position: 'absolute', left: 95, width: 190, top: 77, height: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionMessageInputHint ?? ''}
                            textStyle="text-style-u-italic"
                            textOptions={{ fill: '#777777' }}
                        />
                    </Region>
                    <Region
                        name="message_from"
                        params={16}
                        layout={{ position: 'absolute', left: 95, width: 190, top: 169, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                    >
                        <ThemeText
                            text={captionMessageFrom ?? ''}
                            textStyle="text-style-u-italic"
                            textOptions={{ align: 'right' }}
                        />
                    </Region>
                    <CheckBox
                        variant="0"
                        name="show_face_checkbox"
                        params={17}
                        onPointerTap={onShowFaceCheckbox}
                        layout={{ position: 'absolute', left: 46, width: 16, top: 220, height: 15 }}
                    />
                    <Region
                        name="show_face_checkbox_title"
                        params={16}
                        layout={{ position: 'absolute', left: 66, width: 260, top: 218, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionShowFaceCheckboxTitle ?? t('catalog.gift_wrapping.show_face.title')}
                            textStyle="text-style-u-regular"
                        />
                    </Region>
                    <Region
                        name="box_picker_container"
                        params={16}
                        layout={{ position: 'absolute', left: 10, width: 306, top: 253, height: 83 }}
                    >
                        <Border
                            variant="0"
                            name="image_border"
                            params={16}
                            tintColor="#f1f1f1"
                            layout={{ position: 'absolute', left: 0, width: 82, top: 0, height: 82 }}
                        >
                            <ThemeImage
                                name="product_image"
                                params={16}
                                src={srcProductImage}
                                layout={{ position: 'absolute', left: 1, width: 80, top: 1, height: 80 }}
                            />
                        </Border>
                        <Region
                            name="pick_box_title"
                            params={16}
                            layout={{ position: 'absolute', left: 154, width: 152, top: 5, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionPickBoxTitle ?? t('catalog.gift_wrapping.pick_box')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <Region
                            name="price_box_container"
                            params={147473}
                            layout={{ position: 'absolute', left: 154, top: 20, flexDirection: 'row' }}
                        >
                            {itemsPriceBoxContainer ?? (
                                <>
                                    <GiftWrappingLayoutPickBoxPriceTitleItem />
                                    <GiftWrappingLayoutSmallCoinItem />
                                </>
                            )}
                        </Region>
                        <ContainerButton
                            variant="0"
                            name="box_prev"
                            params={17}
                            onPointerTap={onBoxPrev}
                            layout={{ position: 'absolute', left: 92, width: 25, top: 9, height: 25 }}
                        >
                            <Icon
                                variant="2"
                                params={16}
                                tintColor="#000000"
                                layout={{ position: 'absolute', left: 7, width: 17, top: 8, height: 16 }}
                            />
                        </ContainerButton>
                        <ContainerButton
                            variant="0"
                            name="box_next"
                            params={17}
                            onPointerTap={onBoxNext}
                            layout={{ position: 'absolute', left: 121, width: 25, top: 9, height: 25 }}
                        >
                            <Icon
                                variant="3"
                                params={16}
                                tintColor="#000000"
                                layout={{ position: 'absolute', left: 8, width: 17, top: 8, height: 16 }}
                            />
                        </ContainerButton>
                        <Region
                            name="pick_ribbon_title"
                            params={16}
                            layout={{ position: 'absolute', left: 154, width: 152, top: 50, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionPickRibbonTitle ?? t('catalog.gift_wrapping.pick_ribbon.title')}
                                textStyle="text-style-u-bold"
                            />
                        </Region>
                        <ContainerButton
                            variant="0"
                            name="ribbon_prev"
                            params={17}
                            onPointerTap={onRibbonPrev}
                            layout={{ position: 'absolute', left: 92, width: 25, top: 47, height: 25 }}
                        >
                            <Icon
                                variant="2"
                                params={16}
                                tintColor="#000000"
                                layout={{ position: 'absolute', left: 7, width: 17, top: 8, height: 16 }}
                            />
                        </ContainerButton>
                        <ContainerButton
                            variant="0"
                            name="ribbon_next"
                            params={17}
                            onPointerTap={onRibbonNext}
                            layout={{ position: 'absolute', left: 121, width: 25, top: 47, height: 25 }}
                        >
                            <Icon
                                variant="3"
                                params={16}
                                tintColor="#000000"
                                layout={{ position: 'absolute', left: 9, width: 17, top: 8, height: 16 }}
                            />
                        </ContainerButton>
                    </Region>
                    <Region
                        name="box_color_title"
                        params={16}
                        layout={{ position: 'absolute', left: 11, width: 306, top: 341, height: 22, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={captionBoxColorTitle ?? t('catalog.gift_wrapping.pick_color')}
                            textStyle="text-style-u-bold"
                        />
                    </Region>
                    <Region
                        name="color_picker_container"
                        params={16}
                        layout={{ position: 'absolute', left: 20, width: 308, top: 360, height: 30 }}
                    >
                        <Region
                            name="color_grid"
                            params={786449}
                            layout={{ position: 'absolute', left: '50%', marginLeft: -153, width: 306, top: 2, height: 26, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
                        />
                    </Region>
                    <ButtonThick
                        variant="3"
                        name="give_gift_button"
                        params={131089}
                        onPointerTap={onGiveGiftButton}
                        layout={{ position: 'absolute', left: 171, width: 150, top: 404, height: 25, minWidth: 150, maxWidth: 150 }}
                    >
                        {t('catalog.gift_wrapping.give_gift')}
                    </ButtonThick>
                    <Region
                        name="cancel_link_region"
                        params={17}
                        onPointerTap={onCancelLinkRegion}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 9, width: 100, top: 407, height: 20 }}
                    >
                        <Region
                            name="cancel_link"
                            params={16}
                            layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <ThemeText
                                text={captionCancelLink ?? t('catalog.gift_wrapping.cancel')}
                                textStyle="text-style-u-regular"
                            />
                        </Region>
                    </Region>
                </Border>
            </Region>
        </Frame>
    );
};

/** Row template `pick_box_price_title` of GiftWrappingLayout - pass real rows through its `items…` slot. */
export interface GiftWrappingLayoutPickBoxPriceTitleItemProps {
    captionPickBoxPriceTitle?: string;
    layout?: BoxLayout;
}

export const GiftWrappingLayoutPickBoxPriceTitleItem = ({ captionPickBoxPriceTitle, layout }: GiftWrappingLayoutPickBoxPriceTitleItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="pick_box_price_title"
            params={16}
            layout={{ width: 155, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPickBoxPriceTitle ?? t('catalog.gift_wrapping.price')}
                textStyle="text-style-u-regular"
            />
        </Region>
    );
};

/** Row template `small_coin` of GiftWrappingLayout - pass real rows through its `items…` slot. */
export interface GiftWrappingLayoutSmallCoinItemProps {
    layout?: BoxLayout;
    srcSmallCoin?: string;
}

export const GiftWrappingLayoutSmallCoinItem = ({ layout, srcSmallCoin }: GiftWrappingLayoutSmallCoinItemProps) => {
    return (
        <ThemeImage
            name="small_coin"
            params={16}
            src={srcSmallCoin ?? layoutImage('common_small_coin.png')}
            layout={{ width: 16, height: 16, flexShrink: 0, ...layout }}
        />
    );
};
