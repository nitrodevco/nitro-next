import { roomStore } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { Box, Bubble, Button } from '#base/theme';

/**
 * The bubble that stays over your avatar while you decorate - `DecorateModeView`, on the
 * `own_avatar_decorating` layout. Its one button ends decorating.
 */
export const DecorateModeBubbleView = () => {
    const t = useTranslation();

    return (
        <Bubble
            variant="0"
            tintColor="#6e6b67"
            layout={{ flexDirection: 'column', paddingTop: 8, paddingBottom: 8 }}
        >
            <Box layout={{ minWidth: 103, maxWidth: 103, marginLeft: 2, marginRight: 2 }}>
                <Button
                    variant="300"
                    tintColor="#2d2a27"
                    textColor="#ffffff"
                    onPointerTap={() => roomStore.getState().setIsDecorating(false)}
                    layout={{ minHeight: 26, maxHeight: 26, width: '100%' }}
                >
                    {t('widget.avatar.stop_decorating')}
                </Button>
            </Box>
        </Bubble>
    );
};
