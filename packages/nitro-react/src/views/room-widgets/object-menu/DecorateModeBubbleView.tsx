import { useRoomSessionActions } from '#base/context/room';
import { useTranslation } from '#base/context/system';
import { Box, Bubble } from '#base/theme';

import { InfoBubbleMenuButton } from './InfoBubbleMenuButton';

/**
 * The bubble that stays over your avatar while you decorate - `DecorateModeView`, on the
 * `own_avatar_decorating` layout. Its one button ends decorating.
 */
export const DecorateModeBubbleView = () => {
    const t = useTranslation();
    const { setIsDecorating } = useRoomSessionActions();

    return (
        <Bubble
            variant="0"
            tintColor="#6e6b67"
            layout={{ flexDirection: 'column', paddingTop: 8, paddingBottom: 8 }}
        >
            <Box layout={{ minWidth: 103, maxWidth: 103, marginLeft: 2, marginRight: 2 }}>
                <InfoBubbleMenuButton
                    caption={t('widget.avatar.stop_decorating')}
                    onPress={() => setIsDecorating(false)}
                />
            </Box>
        </Bubble>
    );
};
