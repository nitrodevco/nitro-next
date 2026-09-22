import { useConfigValue, useTranslation } from '#base/context/system';
import { Button, Frame, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

/** `other_locked_container`'s height, which `FriendFurniConfirmWidget.open` zeroes for a non-owner. */
const OTHER_LOCKED_HEIGHT = 65;

export interface FurnitureLockConfirmViewProps {
    /** `FriendFurniStartConfirmationMessage.isOwner`: only the owner is shown the lock and the other's answer. */
    isOwner: boolean;
    /** Set once the other half has agreed and the lock is only waiting on you. */
    otherLocked: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * Sealing a lock takes both people, so each is asked in turn, on the `lock_confirm` layout
 * (309x198) that `FriendFurniConfirmWidget.createWindow` builds and centres.
 *
 * `FriendFurniConfirmWidget.open` collapses `other_locked_container` to nothing for a non-owner;
 * for the owner it shows the open lock and hides `message`, and `otherConfirmed` swaps in the
 * closed lock and shows the message. `top_list` resizes to its items and the frame with it, so a
 * non-owner's dialog is 65px shorter. The subtitle is kept at the layout's 35px: it is an
 * auto-size text of up to three lines, and the list would follow a third line down.
 *
 * The buttons fit their caption up to their `width_max` of 140; `confirm_button` keeps its right
 * edge (`on_accommodate_align_right`).
 */
export const FurnitureLockConfirmView = ({ isOwner, otherLocked, onConfirm, onCancel }: FurnitureLockConfirmViewProps) => {
    const t = useTranslation();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';

    return (
        <Frame
            variant="100"
            caption={t('friend.furniture.confirm.lock.caption')}
            dropShadow={{ angle: 0, alpha: 0.35, blur: 20 }}
            onClose={onCancel}
            centered
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 1, 30, 1, 1 ]}
            layout={{ width: 309, height: isOwner ? 198 : (198 - OTHER_LOCKED_HEIGHT) }}
        >
            <Region layout={{ position: 'absolute', left: 9, top: 1, width: 290, flexDirection: 'column', gap: 5 }}>
                <ThemeText
                    text={t('friend.furniture.confirm.lock.subtitle')}
                    textStyle="il_heading_1"
                    textOptions={{ wordWrap: true, wordWrapWidth: 245, align: 'center' }}
                    verticalAlign="top"
                    layout={{ width: 249, height: 35, marginLeft: 12, flexShrink: 0 }}
                />
                <Region layout={{ width: 290, height: isOwner ? OTHER_LOCKED_HEIGHT : 0, flexShrink: 0, overflow: 'hidden' }}>
                    <ThemeImage
                        src={`${imageLibraryUrl}furniextras/${otherLocked ? 'locked_image' : 'unlocked_image'}.png`}
                        bitmap={{ stretchedX: false, stretchedY: false }}
                        layout={{ position: 'absolute', left: 122, top: 4, width: 44, height: 44 }}
                    />
                    {otherLocked && (
                        <Region layout={{ position: 'absolute', left: 0, width: 291, bottom: -8, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', paddingBottom: 8 }}>
                            <ThemeText
                                text={t('friend.furniture.confirm.lock.other.locked')}
                                textStyle="il_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 287, align: 'center' }}
                                markup
                            />
                        </Region>
                    )}
                </Region>
                <ThemeImage
                    src={LayoutImage('shared/illumina_horizontal_separator.png')}
                    bitmap={{}}
                    layout={{ width: 285, height: 2, flexShrink: 0 }}
                />
                <Region layout={{ width: 288, height: 46, flexShrink: 0, overflow: 'hidden' }}>
                    <Button
                        variant="101"
                        tintColor="#bbbbbb"
                        onPointerTap={onCancel}
                        layout={{ position: 'absolute', left: 0, top: -2, height: 48, maxWidth: 140 }}
                    >
                        {t('friend.furniture.confirm.lock.button.cancel')}
                    </Button>
                    <Button
                        variant="101"
                        tintColor="#bbbbbb"
                        onPointerTap={onConfirm}
                        layout={{ position: 'absolute', right: 4, top: -2, height: 48, maxWidth: 140 }}
                    >
                        {t('friend.furniture.confirm.lock.button.confirm')}
                    </Button>
                </Region>
            </Region>
        </Frame>
    );
};
