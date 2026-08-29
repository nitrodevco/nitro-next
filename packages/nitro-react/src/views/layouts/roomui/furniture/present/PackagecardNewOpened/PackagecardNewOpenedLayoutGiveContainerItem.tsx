import { useTranslation } from '#base/context';
import { BoxLayout, ButtonThick, Region, ThemeImage } from '#base/theme';

/** Row template `give_container` of PackagecardNewOpenedLayout - pass real rows through its `items…` slot. */
export interface PackagecardNewOpenedLayoutGiveContainerItemProps {
    layout?: BoxLayout;
    onAvatarImageRegion?: () => void;
    onGiveContainer?: () => void;
    onGiveGiftButton?: () => void;
    srcAvatarImage?: string;
    tintAvatarImage?: string;
    visibleAvatarImage?: boolean;
    visibleAvatarImageContainer?: boolean;
    visibleAvatarImageRegion?: boolean;
    visibleGiveGiftButton?: boolean;
}

export const PackagecardNewOpenedLayoutGiveContainerItem = ({ layout, onAvatarImageRegion, onGiveContainer, onGiveGiftButton, srcAvatarImage, tintAvatarImage, visibleAvatarImage, visibleAvatarImageContainer, visibleAvatarImageRegion, visibleGiveGiftButton }: PackagecardNewOpenedLayoutGiveContainerItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="give_container"
            backgroundColor="#96a4a5"
            onPointerTap={onGiveContainer}
            cursor="pointer"
            layout={{ width: 336, height: 70, flexShrink: 0, minWidth: 336, maxWidth: 336, justifyContent: 'center', ...layout }}
        >
            {(visibleGiveGiftButton ?? true) && (
                <ButtonThick
                    variant="5"
                    name="give_gift_button"
                    tintColor="#00aa00"
                    onPointerTap={onGiveGiftButton}
                    layout={{ position: 'absolute', marginLeft: -45, marginRight: 45, width: 246, alignSelf: 'center', marginTop: -21, marginBottom: 21, height: 28, minWidth: 246, maxWidth: 330 }}
                >
                    {t('widget.furni.present.give_gift')}
                </ButtonThick>
            )}
            {(visibleAvatarImageContainer ?? true) && (
                <Region
                    name="avatar_image_container"
                    layout={{ position: 'absolute', right: 1, width: 45, alignSelf: 'center', marginTop: 0.5, marginBottom: -0.5, height: 45, justifyContent: 'center' }}
                >
                    {(visibleAvatarImageRegion ?? true) && (
                        <Region
                            name="avatar_image_region"
                            tooltip={t('widget.furni.present.sender.profile_tooltip')}
                            onPointerTap={onAvatarImageRegion}
                            cursor="pointer"
                            layout={{ position: 'absolute', width: 45, alignSelf: 'center', height: 45 }}
                        >
                            {(visibleAvatarImage ?? true) && (
                                <ThemeImage
                                    name="avatar_image"
                                    src={srcAvatarImage}
                                    tint={tintAvatarImage}
                                    layout={{ position: 'absolute', left: 0, width: 45, top: 0, height: 45 }}
                                />
                            )}
                        </Region>
                    )}
                </Region>
            )}
        </Region>
    );
};
