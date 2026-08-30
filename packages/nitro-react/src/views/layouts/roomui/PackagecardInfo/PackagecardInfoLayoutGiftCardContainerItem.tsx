import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeImage, ThemeText } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `gift_card_container` of PackagecardInfoLayout - pass real rows through its `items…` slot. */
export interface PackagecardInfoLayoutGiftCardContainerItemProps {
    captionMessageFrom?: string;
    captionMessageText?: string;
    layout?: BoxLayout;
    onAvatarImageRegion?: () => void;
    onMessageFrom?: () => void;
    srcAvatarImage?: string;
    srcGiftCard?: string;
    tintAvatarImage?: string;
    visibleAvatarImage?: boolean;
    visibleAvatarImageContainer?: boolean;
    visibleAvatarImageRegion?: boolean;
    visibleGiftCard?: boolean;
    visibleMessageFrom?: boolean;
    visibleMessageText?: boolean;
}

export const PackagecardInfoLayoutGiftCardContainerItem = ({ captionMessageFrom, captionMessageText, layout, onAvatarImageRegion, onMessageFrom, srcAvatarImage, srcGiftCard, tintAvatarImage, visibleAvatarImage, visibleAvatarImageContainer, visibleAvatarImageRegion, visibleGiftCard, visibleMessageFrom, visibleMessageText }: PackagecardInfoLayoutGiftCardContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="gift_card_container"
            layout={{ width: 330, height: 159, flexShrink: 0, ...layout }}
        >
            {(visibleGiftCard ?? true) && (
                <ThemeImage
                    name="gift_card"
                    src={srcGiftCard ?? layoutImage('catalogue_giftcard_blank.png')}
                    layout={{ position: 'absolute', left: 10, width: 306, top: 10, height: 149 }}
                />
            )}
            {(visibleAvatarImageContainer ?? true) && (
                <Region
                    name="avatar_image_container"
                    layout={{ position: 'absolute', left: 15, width: 60, top: 5, height: 149, minWidth: 60, maxWidth: 60, minHeight: 149, maxHeight: 149, justifyContent: 'center' }}
                >
                    {(visibleAvatarImageRegion ?? true) && (
                        <Region
                            name="avatar_image_region"
                            tooltip={t('widget.furni.present.sender.profile_tooltip')}
                            onPointerTap={onAvatarImageRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', width: 60, alignSelf: 'center', height: 149 }}
                        >
                            {(visibleAvatarImage ?? true) && (
                                <ThemeImage
                                    name="avatar_image"
                                    src={srcAvatarImage}
                                    tint={tintAvatarImage}
                                    layout={{ position: 'absolute', left: 0, width: 60, top: 0, height: 149 }}
                                />
                            )}
                        </Region>
                    )}
                </Region>
            )}
            {(visibleMessageText ?? true) && (
                <ThemeText
                    text={captionMessageText ?? ''}
                    textStyle="text-style-u-regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 190 }}
                    name="message_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 95, width: 190, top: 31, height: 100 }}
                />
            )}
            {(visibleMessageFrom ?? true) && (
                <Region
                    name="message_from"
                    tooltip={t('widget.furni.present.sender.profile_tooltip')}
                    layout={{ position: 'absolute', left: 95, width: 190, top: 123, height: 4, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
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
