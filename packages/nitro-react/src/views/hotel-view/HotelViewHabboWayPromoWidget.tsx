/**
 * `HabboWayPromoWidget`: `habbo_way_promo`, the reception's invitation to read the Habbo Way, its
 * texts the layout's own (`landing.view.habbowaypromo.*`). Under the picture, `counter_txt` counts
 * the community goal's total score, padded to eight digits (`refreshContent`), from the latest
 * `CommunityGoalProgressMessage` - which `refresh` asks for every time the reception is shown
 * (`registerHotelViewHandlers`). It shows `00000000` until an answer comes. It does not take the
 * hotel's widget colours: it is not an `ISettingsAwareWidget`, and its layout tags no text
 * `COLORABLE`.
 *
 * `go_button` (`onGoButton`) is `IHabboHelp.showHabboWay`, which opens the Habbo Way window
 * (`HabboWayController` on `habbo_way`, and the quiz it leads to). That help window is not ported,
 * so the button is drawn and does nothing.
 */
import { useSystemStore } from '#base/context/system';
import { Box, TemplateWindow } from '#base/theme';

import { hotelViewTemplateId } from './hotelViewTemplate';

/** `refreshContent`: the score padded with zeros to this many characters. */
const COUNTER_DIGITS = 8;

export const HotelViewHabboWayPromoWidget = () => {
    const score = useSystemStore(x => x.hotelViewCommunityGoal?.communityTotalScore ?? 0);

    return (
        <Box layout={{ flexShrink: 0 }}>
            <TemplateWindow
                id={hotelViewTemplateId('habbo_way_promo')}
                bindings={{ counter_txt: { caption: String(score).padStart(COUNTER_DIGITS, '0') } }}
            />
        </Box>
    );
};
