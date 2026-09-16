import { useTranslation } from '#base/context';
import { Border, Box, Button, Frame, ThemeText } from '#base/theme';

export interface FurnitureRoomLinkViewProps {
    roomName: string;
    ownerName: string;
    onConfirm: () => void;
    onCancel: () => void;
}

/**
 * Where a room-link teleport goes, asked before it takes you there. Flash filled the two names
 * into its message with `%%room_name%%` and `%%room_owner%%` - two per cent signs, not the
 * client's usual one - so the substitution is done here rather than through the translator.
 */
export const FurnitureRoomLinkView = ({ roomName, ownerName, onConfirm, onCancel }: FurnitureRoomLinkViewProps) => {
    const t = useTranslation();

    const message = t('room.link.confirmation.message', '')
        .replace('%%room_name%%', roomName)
        .replace('%%room_owner%%', ownerName);

    return (
        <Frame
            variant="0"
            id="furniture-room-link"
            caption={t('room.link.confirmation.title')}
            onClose={onCancel}
            defaultPosition={{ x: 120, y: 100 }}
            rememberPosition={false}
            layout={{ position: 'absolute', width: 300, height: 170 }}
        >
            <Border layout={{ flex: 1, padding: 8 }}>
                <ThemeText
                    text={message}
                    textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 270 }}
                    verticalAlign="top"
                    layout={{ flex: 1 }}
                />
            </Border>
            <Box layout={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 3 }}>
                <Button
                    onPointerTap={onConfirm}
                    layout={{ height: 22 }}
                >
                    {t('generic.ok')}
                </Button>
                <Button
                    onPointerTap={onCancel}
                    layout={{ height: 22 }}
                >
                    {t('generic.cancel')}
                </Button>
            </Box>
        </Frame>
    );
};
