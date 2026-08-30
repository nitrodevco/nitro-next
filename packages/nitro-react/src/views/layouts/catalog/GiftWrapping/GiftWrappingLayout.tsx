import { ReactNode, useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonThick, CheckBox, Frame, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { GiftWrappingLayoutBoxPickerContainer, GiftWrappingLayoutBoxPickerContainerProps } from './GiftWrappingLayoutBoxPickerContainer';

/** Generated from `1602_gift_wrapping_xml` (layout "gift_wrapping", 342x482) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GiftWrappingLayoutProps {
    boxPickerContainer?: GiftWrappingLayoutBoxPickerContainerProps;
    captionBoxColorTitle?: string;
    captionCancelLink?: string;
    captionMessageFrom?: string;
    captionMessageInputHint?: string;
    captionNameInputHint?: string;
    captionShowFaceCheckboxTitle?: string;
    itemsColorGrid?: ReactNode;
    itemsSuggestionList?: ReactNode;
    layout?: BoxLayout;
    onCancelLinkRegion?: () => void;
    onClose?: () => void;
    onGiveGiftButton?: () => void;
    onShowFaceCheckbox?: () => void;
    onSuggestionContainer?: () => void;
    srcAvatarImage?: string;
    srcGiftCard?: string;
    srcWriteDeco?: string;
    tintAvatarImage?: string;
    visibleMessageInputHint?: boolean;
    visibleNameInputHint?: boolean;
    visibleSuggestionContainer?: boolean;
}

export const GiftWrappingLayout = ({ boxPickerContainer, captionBoxColorTitle, captionCancelLink, captionMessageFrom, captionMessageInputHint, captionNameInputHint, captionShowFaceCheckboxTitle, itemsColorGrid, itemsSuggestionList, layout, onCancelLinkRegion, onClose, onGiveGiftButton, onShowFaceCheckbox, onSuggestionContainer, srcAvatarImage, srcGiftCard, srcWriteDeco, tintAvatarImage, visibleMessageInputHint, visibleNameInputHint, visibleSuggestionContainer }: GiftWrappingLayoutProps) => {
    const t = useTranslation();
    const [ nameInputValue, setNameInputValue ] = useState('');
    const [ messageInputValue, setMessageInputValue ] = useState('');

    return (
        <Frame
            variant="3"
            caption={t('catalog.gift_wrapping.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 342, height: 482, minWidth: 342, minHeight: 482, ...layout }}
        >
            <Border
                variant="3"
                tintColor="#e9e9e9"
                layout={{ position: 'absolute', left: 0, right: 0, top: 10, bottom: -9 }}
            >
                <Border
                    variant="0"
                    name="name_border"
                    layout={{ position: 'absolute', left: 10, width: 284, top: 12, height: 27 }}
                >
                    <TextInput
                        value={nameInputValue}
                        onChange={setNameInputValue}
                        maxLength={32}
                        layout={{ position: 'absolute', left: 8, right: 10, top: 3, bottom: 3 }}
                    />
                    {(visibleNameInputHint ?? false) && (
                        <ThemeText
                            text={captionNameInputHint ?? ''}
                            textStyle="text-style-u-italic"
                            textOptions={{ fill: '#777777' }}
                            name="name_input_hint"
                            layout={{ position: 'absolute', left: 8, width: 266, top: 3, height: 21 }}
                        />
                    )}
                </Border>
                <ThemeImage
                    name="write_deco"
                    src={srcWriteDeco ?? layoutImage('common_small_pen.png')}
                    layout={{ position: 'absolute', left: 301, width: 17, top: 15, height: 18 }}
                />
                {(visibleSuggestionContainer ?? false) && (
                    <Region
                        name="suggestion_container"
                        backgroundColor="#999999"
                        onPointerTap={onSuggestionContainer}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 18, width: 264, top: 39, height: 0, minWidth: 150, maxWidth: 267 }}
                    >
                        <Region
                            backgroundColor="#ffffff"
                            layout={{ position: 'absolute', left: 1, width: 263, top: 0, height: 0, minWidth: 150, maxWidth: 265 }}
                        >
                            <Region
                                name="suggestion_list"
                                layout={{ position: 'absolute', left: 1, top: 0, minWidth: 148, maxWidth: 262, flexDirection: 'column' }}
                            >
                                {itemsSuggestionList}
                            </Region>
                        </Region>
                    </Region>
                )}
                <ThemeImage
                    name="gift_card"
                    src={srcGiftCard ?? layoutImage('catalogue_giftcard_blank.png')}
                    layout={{ position: 'absolute', left: 10, width: 306, top: 56, height: 149 }}
                />
                <ThemeImage
                    name="avatar_image_container"
                    src={srcAvatarImage}
                    tint={tintAvatarImage}
                    layout={{ position: 'absolute', left: 15, width: 60, top: 51, height: 149, minWidth: 60, maxWidth: 60, minHeight: 149, maxHeight: 149 }}
                />
                <TextInput
                    value={messageInputValue}
                    onChange={setMessageInputValue}
                    maxLength={140}
                    multiline
                    layout={{ position: 'absolute', left: 95, width: 190, top: 77, height: 100 }}
                />
                {(visibleMessageInputHint ?? false) && (
                    <ThemeText
                        text={captionMessageInputHint ?? ''}
                        textStyle="text-style-u-italic"
                        textOptions={{ fill: '#777777' }}
                        name="message_input_hint"
                        layout={{ position: 'absolute', left: 95, width: 190, top: 77, height: 100 }}
                    />
                )}
                <ThemeText
                    text={captionMessageFrom ?? ''}
                    textStyle="text-style-u-italic"
                    textOptions={{ align: 'right' }}
                    name="message_from"
                    layout={{ position: 'absolute', left: 95, width: 190, top: 169, height: 4 }}
                />
                <CheckBox
                    variant="0"
                    name="show_face_checkbox"
                    onPointerTap={onShowFaceCheckbox}
                    layout={{ position: 'absolute', left: 46, width: 16, top: 220, height: 15 }}
                />
                <ThemeText
                    text={captionShowFaceCheckboxTitle ?? t('catalog.gift_wrapping.show_face.title')}
                    textStyle="text-style-u-regular"
                    name="show_face_checkbox_title"
                    layout={{ position: 'absolute', left: 66, width: 260, top: 218, height: 20 }}
                />
                <GiftWrappingLayoutBoxPickerContainer {...boxPickerContainer} />
                <ThemeText
                    text={captionBoxColorTitle ?? t('catalog.gift_wrapping.pick_color')}
                    textStyle="text-style-u-bold"
                    name="box_color_title"
                    layout={{ position: 'absolute', left: 11, width: 306, top: 341, height: 22 }}
                />
                <Region
                    name="color_picker_container"
                    layout={{ position: 'absolute', left: 20, width: 308, top: 360, height: 30, justifyContent: 'center' }}
                >
                    <Region
                        name="color_grid"
                        layout={{ position: 'absolute', width: 306, top: 2, height: 26, flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}
                    >
                        {itemsColorGrid}
                    </Region>
                </Region>
                <ButtonThick
                    variant="3"
                    name="give_gift_button"
                    onPointerTap={onGiveGiftButton}
                    layout={{ position: 'absolute', left: 171, width: 150, top: 404, height: 25, minWidth: 150, maxWidth: 150 }}
                >
                    {t('catalog.gift_wrapping.give_gift')}
                </ButtonThick>
                <Region
                    name="cancel_link_region"
                    onPointerTap={onCancelLinkRegion}
                    cursor="pointer"
                    layout={{ position: 'absolute', left: 9, width: 100, top: 407, height: 20 }}
                >
                    <ThemeText
                        text={captionCancelLink ?? t('catalog.gift_wrapping.cancel')}
                        textStyle="text-style-u-regular"
                        name="cancel_link"
                        layout={{ position: 'absolute', left: 0, width: 80, top: 0, bottom: 0 }}
                    />
                </Region>
            </Border>
        </Frame>
    );
};
