import { useTranslation } from '#base/context/system';
import { Box, Button, Frame, ThemeText } from '#base/theme';

export interface FurnitureLockConfirmViewProps {
    /** Set once the other half has agreed and the lock is only waiting on you. */
    otherLocked: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * Sealing a lock takes both people, so each is asked in turn, on the `lock_confirm` layout
 * (309x198). Once the other has agreed the dialog says so, and only your answer is left.
 */
export const FurnitureLockConfirmView = ({ otherLocked, onConfirm, onCancel }: FurnitureLockConfirmViewProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="100"
            id="furniture-lock-confirm"
            caption={t('friend.furniture.confirm.lock.caption')}
            dropShadow={{ angle: 0, alpha: 0.35, blur: 20 }}
            onClose={onCancel}
            defaultPosition={{ x: 130, y: 110 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 309, height: 198 }}
        >
            <Box layout={{ flex: 1, flexDirection: 'column', gap: 8, padding: 8 }}>
                <ThemeText
                    text={t('friend.furniture.confirm.lock.subtitle')}
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 280 }}
                    verticalAlign="top"
                    layout={{ flex: 1 }}
                />
                {otherLocked && (
                    <ThemeText
                        text={t('friend.furniture.confirm.lock.other.locked')}
                        textStyle="text-style-bold"
                        textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 280 }}
                        verticalAlign="top"
                    />
                )}
                <Box layout={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button
                        onPointerTap={onCancel}
                        layout={{ height: 24 }}
                    >
                        {t('friend.furniture.confirm.lock.button.cancel')}
                    </Button>
                    <Button
                        onPointerTap={onConfirm}
                        layout={{ height: 24 }}
                    >
                        {t('friend.furniture.confirm.lock.button.confirm')}
                    </Button>
                </Box>
            </Box>
        </Frame>
    );
};
