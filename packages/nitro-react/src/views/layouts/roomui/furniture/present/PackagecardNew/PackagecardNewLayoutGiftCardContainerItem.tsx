import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `gift_card_container` of PackagecardNewLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewLayoutGiftCardContainerItemProps {
    captionMessageFrom?: string;
    captionMessageText?: string;
    layout?: BoxLayout;
    onAvatarImageRegion?: () => void;
    onMessageFrom?: () => void;
    srcAvatarImage?: string;
    srcGiftCard?: string;
    srcStaffImageBackground?: string;
    srcStaffImageForeground?: string;
    tintAvatarImage?: string;
    visibleAvatarImage?: boolean;
    visibleAvatarImageContainer?: boolean;
    visibleAvatarImageRegion?: boolean;
    visibleGiftCard?: boolean;
    visibleMessageFrom?: boolean;
    visibleMessageText?: boolean;
    visibleStaffImage?: boolean;
    visibleStaffImageBackground?: boolean;
    visibleStaffImageForeground?: boolean;
}

export const PackagecardNewLayoutGiftCardContainerItem = ({ captionMessageFrom, captionMessageText, layout, onAvatarImageRegion, onMessageFrom, srcAvatarImage, srcGiftCard, srcStaffImageBackground, srcStaffImageForeground, tintAvatarImage, visibleAvatarImage, visibleAvatarImageContainer, visibleAvatarImageRegion, visibleGiftCard, visibleMessageFrom, visibleMessageText, visibleStaffImage, visibleStaffImageBackground, visibleStaffImageForeground }: PackagecardNewLayoutGiftCardContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="gift_card_container"
            layout={{ width: 306, height: 149, flexShrink: 0, justifyContent: 'center', ...layout }}
        >
            {(visibleGiftCard ?? true) && (
                <ThemeImage
                    name="gift_card"
                    src={srcGiftCard ?? layoutImage('catalogue_giftcard_blank.png')}
                    layout={{ position: 'absolute', left: 0, width: 306, top: 0, height: 149 }}
                />
            )}
            {(visibleAvatarImageContainer ?? true) && (
                <Region
                    name="avatar_image_container"
                    layout={{ position: 'absolute', marginLeft: -117, marginRight: 117, width: 60, alignSelf: 'center', marginTop: -2.5, marginBottom: 2.5, height: 140, minWidth: 60, maxWidth: 60, minHeight: 140, maxHeight: 140, justifyContent: 'center' }}
                >
                    {(visibleAvatarImageRegion ?? true) && (
                        <Region
                            name="avatar_image_region"
                            tooltip={t('widget.furni.present.sender.profile_tooltip')}
                            onPointerTap={onAvatarImageRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', width: 60, alignSelf: 'center', height: 140, justifyContent: 'center' }}
                        >
                            {(visibleAvatarImage ?? true) && (
                                <ThemeImage
                                    name="avatar_image"
                                    src={srcAvatarImage}
                                    tint={tintAvatarImage}
                                    layout={{ position: 'absolute', left: 11, width: 37, top: 74, height: 48 }}
                                />
                            )}
                            {(visibleStaffImage ?? true) && (
                                <Region
                                    name="staff_image"
                                    layout={{ position: 'absolute', width: 54, alignSelf: 'center', marginTop: -23, marginBottom: 23, height: 54, justifyContent: 'center' }}
                                >
                                    {(visibleStaffImageBackground ?? true) && (
                                        <ThemeImage
                                            name="staff_image_background"
                                            src={srcStaffImageBackground ?? layoutImage('catalogue_giftcard_icon_bgstar.png')}
                                            layout={{ position: 'absolute', width: 54, alignSelf: 'center', height: 54 }}
                                        />
                                    )}
                                    {(visibleStaffImageForeground ?? true) && (
                                        <ThemeImage
                                            name="staff_image_foreground"
                                            src={srcStaffImageForeground ?? layoutImage('catalogue_giftcard_staff_icon.png')}
                                            layout={{ position: 'absolute', width: 34, top: 10, bottom: 10 }}
                                        />
                                    )}
                                </Region>
                            )}
                        </Region>
                    )}
                </Region>
            )}
            {(visibleMessageText ?? true) && (
                <Region
                    name="message_text"
                    layout={{ position: 'absolute', left: 95, width: 190, top: 31, height: 100, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionMessageText ?? ''}
                        textStyle="text-style-u-regular"
                        textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                    />
                </Region>
            )}
            {(visibleMessageFrom ?? true) && (
                <Region
                    name="message_from"
                    tooltip={t('widget.furni.present.sender.profile_tooltip')}
                    layout={{ position: 'absolute', left: 95, width: 190, top: 120, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                    onPointerTap={onMessageFrom}
                    cursor="pointer"
                >
                    <ThemeText
                        text={captionMessageFrom ?? ''}
                        textStyle="text-style-u-italic"
                        textOptions={{ align: 'right' }}
                    />
                </Region>
            )}
        </Region>
    );
};
