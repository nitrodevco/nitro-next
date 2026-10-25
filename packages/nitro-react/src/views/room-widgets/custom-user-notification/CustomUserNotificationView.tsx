import { CatalogTypeEnum } from '@nitrodevco/nitro-api';

import { openClubCenter, openCostumes, showVipBenefits } from '#base/commands';
import { getCatalogStore } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { CustomUserNotificationType } from '#base/context/room';
import { useConfigData, useTranslation } from '#base/context/system';
import { TemplateBindings, TemplateWindow, useTemplateFrame } from '#base/theme';
import { configReader } from '#base/utils';

/**
 * Flash's `CustomUserNotificationWidget` (`ui/widget/furniture/requirementsmissing`): one of three
 * layouts by type (`open`), centred.
 * - VIP hopper / VIP gate: `viprequired_xml`, its `title` and `bodytext` the type's own texts
 *   (`setVipRequiredSpecificLocalization`: `${viphopper.viprequired.title}`, `${gate.viprequired.title}`).
 *   `buy_vip` opens the club centre and closes; `vip_benefits` shows the VIP benefits.
 * - Costume hopper: `costumehopper_costumerequired_xml`. `buy_costumes` opens the avatar editor on
 *   its effects tab when the user owns a costume (an effect of sub type 1), else the `costumes`
 *   catalogue page, and closes.
 * - Talent show vote with no stage / audience: `respect_giving_failed_notification_xml`, `body_txt`
 *   `respect.giving.failed.no.<stage|audience>` with `%users%` the hotel's
 *   `respect.talent.show.min.audience`, and `respectFailedNotificationBitmap` the matching
 *   `notifications/habbo_talent_show_<stage|audience>.png`.
 * `close` and the header close close it (`eventProc`).
 */
const LIBRARY = 'habbo-room-ui-com';

const TEMPLATES: Record<CustomUserNotificationType, string> = {
    viphopper: `${LIBRARY}/viprequired_xml`,
    vipgate: `${LIBRARY}/viprequired_xml`,
    costumehopper: `${LIBRARY}/costumehopper_costumerequired_xml`,
    respectfailedstage: `${LIBRARY}/respect_giving_failed_notification_xml`,
    respectfailedaudience: `${LIBRARY}/respect_giving_failed_notification_xml`,
};

/** `CustomUserNotificationWidget` picks the VIP texts by this prefix. */
const VIP_TEXT_PREFIX: Partial<Record<CustomUserNotificationType, string>> = { viphopper: 'viphopper', vipgate: 'gate' };

/** And the talent show texts and picture by this suffix. */
const RESPECT_SUFFIX: Partial<Record<CustomUserNotificationType, string>> = { respectfailedstage: 'stage', respectfailedaudience: 'audience' };

export interface CustomUserNotificationViewProps {
    type: CustomUserNotificationType;
    /** `CustomUserNotificationWidget.close`. */
    onClose: () => void;
}

export const CustomUserNotificationView = ({ type, onClose }: CustomUserNotificationViewProps) => {
    const { send } = useWebSocketContext();
    const config = useConfigData();
    const t = useTranslation();
    const frame = useTemplateFrame({ id: `custom_user_notification_${type}`, centered: true, rememberPosition: false, onClose });
    const vipPrefix = VIP_TEXT_PREFIX[type];
    const respectSuffix = RESPECT_SUFFIX[type];

    const buyCostumes = () => {
        openCostumes();
        onClose();
    };

    const respectText = () => {
        const text = t(`respect.giving.failed.no.${respectSuffix}`);
        const minimum = configReader(config).configString('respect.talent.show.min.audience');

        return minimum ? text.replace('%users%', minimum) : text;
    };

    const bindings: TemplateBindings = {
        close: { onPointerTap: onClose },
        ...(vipPrefix && {
            title: { caption: `\${${vipPrefix}.viprequired.title}` },
            bodytext: { caption: `\${${vipPrefix}.viprequired.bodytext}` },
            buy_vip: {
                onPointerTap: () => {
                    openClubCenter(send);
                    onClose();
                },
            },
            vip_benefits: { onPointerTap: () => showVipBenefits(getCatalogStore(CatalogTypeEnum.Normal)) },
        }),
        ...(type === 'costumehopper' && { buy_costumes: { onPointerTap: buyCostumes } }),
        ...(respectSuffix && {
            body_txt: { caption: respectText() },
            respectFailedNotificationBitmap: { asset: `\${image.library.url}notifications/habbo_talent_show_${respectSuffix}.png` },
        }),
    };

    return (
        <TemplateWindow
            id={TEMPLATES[type]}
            frame={frame}
            bindings={bindings}
        />
    );
};
