/**
 * `HabboModerationPromoWidget`: `habbo_moderation_promo`, the reception's note on Habbo's
 * moderation - all of it the layout's own texts (`landing.view.moderationpromo.*`), with no button
 * and nothing asked of the server. `initialize` only runs the title line on from the title
 * (`positionAfterAndStretch`). It does not take the hotel's widget colours: it is not an
 * `ISettingsAwareWidget`, and its layout tags no text `COLORABLE`.
 */
import { Box, TemplateWindow, TemplateWindows } from '#base/theme';

import { hotelViewTemplateId, positionAfterAndStretch } from './hotelViewTemplate';

/** `initialize`: the title line runs on from the title. */
const arrange = (windows: TemplateWindows) => positionAfterAndStretch(windows, 'title_txt', 'hdr_line');

export const HotelViewModerationPromoWidget = () => (
    <Box layout={{ flexShrink: 0 }}>
        <TemplateWindow
            id={hotelViewTemplateId('habbo_moderation_promo')}
            arrange={arrange}
        />
    </Box>
);
