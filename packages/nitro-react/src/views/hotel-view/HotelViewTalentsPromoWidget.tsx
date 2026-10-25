/**
 * `HabboTalentsPromoWidget`: `habbo_talents_promo`, the reception's invitation to the talent track,
 * all of it the layout's own picture and texts (`landing.view.talentspromo.*`). `initialize` runs
 * the title line on from the title (`positionAfterAndStretch`). It does not take the hotel's widget
 * colours: it is not an `ISettingsAwareWidget`, and its layout tags no text `COLORABLE`.
 *
 * `go_button` (`onGoButton`) asks for the user's current talent track
 * (`GetTalentTrackMessageComposer(sessionDataManager.currentTalentTrack)`), which in Flash the talent
 * track window opens on. Here the request is sent and nothing opens: the talent track window
 * (`TalentTrackController`) is not ported, and nor is the answer's parser - see
 * `commands/achievements/talentTrackCommands.ts`. Flash's `trackTalentTrackOpen(track, "landingpagepromo")` is
 * tracking the port does not send.
 */
import { currentTalentTrack, requestTalentTrack } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { Box, TemplateWindow, TemplateWindows } from '#base/theme';

import { hotelViewTemplateId, positionAfterAndStretch } from './hotelViewTemplate';

/** `initialize`: the title line runs on from the title. */
const arrange = (windows: TemplateWindows) => positionAfterAndStretch(windows, 'title_txt', 'hdr_line');

export const HotelViewTalentsPromoWidget = () => {
    const { send } = useWebSocketContext();

    return (
        <Box layout={{ flexShrink: 0 }}>
            <TemplateWindow
                id={hotelViewTemplateId('habbo_talents_promo')}
                bindings={{ go_button: { onPointerTap: () => requestTalentTrack(send, currentTalentTrack()) } }}
                arrange={arrange}
            />
        </Box>
    );
};
