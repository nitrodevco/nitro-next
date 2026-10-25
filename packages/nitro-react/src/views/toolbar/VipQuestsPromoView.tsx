import { startCitizenshipVipQuests, toggleCitizenshipVipQuestsPromo } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useQuestsStore } from '#base/context/quests';
import { Box, TemplateWindow, TemplateWindows } from '#base/theme';

/** `assignState`: the window's height folded (`content_itemlist` and `promo_img` hidden). */
const FOLDED_HEIGHT = 33;

/**
 * Flash's `toolbar/extensions/CitizenshipVipQuestsPromoExtension` over `habbo-toolbar-com/vip_quests_promo_xml`:
 * the "Welcome!" box `HabboToolbar` creates while `citizenship.vip.quest.promotion.enabled`, docked as
 * `vip_quests` at priority 10 when the server sends `CitizenshipVipOfferPromoEnabled` - in place of
 * `club_promo`, which that detaches (`onCitizenshipQuestPromoEnabled`).
 *
 * `quests_button` starts the campaign `citizenship.vip.tutorial.quest.campaign.name` names and undocks
 * the box (`onButtonClicked`). `minimize_region` and `maximize_region` share a rectangle and both flip
 * `_expanded` (`onMinMax`); folded, `assignState` hides `content_itemlist` and `promo_img` and the
 * window is 33 high, unfolded it is the layout's 216 (`_expandedHeight`, the window's own height).
 */
export const VipQuestsPromoView = () => {
    const attached = useQuestsStore(x => x.vipQuestsPromoAttached);

    if (!attached) return null;

    return <VipQuestsPromoContent />;
};

const VipQuestsPromoContent = () => {
    const { send } = useWebSocketContext();
    const expanded = useQuestsStore(x => x.vipQuestsPromoExpanded);

    const arrange = ({ root }: TemplateWindows) => {
        if (!expanded) root()?.setHeight(FOLDED_HEIGHT);
    };

    return (
        <Box layout={{ marginTop: 2, flexShrink: 0 }}>
            <TemplateWindow
                id="habbo-toolbar-com/vip_quests_promo_xml"
                arrange={arrange}
                bindings={{
                    minimize_region: { onPointerTap: toggleCitizenshipVipQuestsPromo },
                    maximize_region: { onPointerTap: toggleCitizenshipVipQuestsPromo },
                    content_itemlist: { visible: expanded },
                    promo_img: { visible: expanded },
                    quests_button: { onPointerTap: () => startCitizenshipVipQuests(send) },
                }}
            />
        </Box>
    );
};
