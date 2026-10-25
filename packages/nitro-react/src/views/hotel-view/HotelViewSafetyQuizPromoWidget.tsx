/**
 * `SafetyQuizPromoWidget`: `safety_quiz_promo`, the red-bordered strip inviting the user to the
 * safety quiz, its texts the layout's own (`safety.promo.widget.*`). Its `avatar` widget shows the
 * user's own head (`only_head`, facing `south`), set from the session's figure on each `refresh` -
 * here the user store's figure, which is current whenever the reception is shown.
 *
 * The layout's root sits 186 pixels in from its left (`x="186"`). A widget slot adds it where it is
 * (`WidgetContainer.refresh` -> `addChild`), so the strip is drawn that far in and the slot takes
 * the offset into its width; the bottom slot puts it at its placeholder's place instead.
 *
 * A click on `safety_quiz_button` (`widgetProcedure`) is `IHabboHelp.showSafetyBooklet`, which opens
 * the safety booklet (`SafetyBookletController`). That help window is not ported, so the button is
 * drawn and does nothing.
 */
import { useOwnUserFigure, useOwnUserGender } from '#base/context/user';
import { Box, TemplateWindow, useAvatarImageTexture } from '#base/theme';

import { hotelViewTemplateId } from './hotelViewTemplate';

/** `safety_quiz_overlay`'s `x` in the layout, which the widget's window keeps in a widget slot. */
const ROOT_X = 186;

/** `avatar`'s `avatar_image:direction`: `south`. */
const AVATAR_DIRECTION = 3;

export interface HotelViewSafetyQuizPromoWidgetProps {
    /** In the reception's bottom slot, where `WidgetContainer.refresh` moves the window to its placeholder. */
    bottomSlot: boolean;
}

export const HotelViewSafetyQuizPromoWidget = ({ bottomSlot }: HotelViewSafetyQuizPromoWidgetProps) => {
    const figure = useOwnUserFigure();
    const gender = useOwnUserGender();
    const head = useAvatarImageTexture(figure || undefined, gender, { headOnly: true, direction: AVATAR_DIRECTION });

    return (
        <Box layout={{ flexShrink: 0, paddingLeft: bottomSlot ? 0 : ROOT_X }}>
            <TemplateWindow
                id={hotelViewTemplateId('safety_quiz_promo')}
                bindings={{
                    avatar: {
                        children: head.texture && (
                            <pixiSprite
                                texture={head.texture}
                                eventMode="none"
                                layout={{ position: 'absolute', left: 0, top: 0, width: head.width, height: head.height }}
                            />
                        ),
                    },
                }}
            />
        </Box>
    );
};
