/**
 * The HC payday breakdown - Flash's `ClubSpecialInfoBubbleView`, the `club_center_special_info_xml`
 * bubble beside the club centre's post-it.
 *
 * The texts: `hccenter.breakdown.creditsspent` (`%credits%`); the factor from
 * `hccenter.breakdown.paydayfactor.percent` (`%percent%` = the percentage as an int, `%multiplier%`
 * the factor), or `hccenter.breakdown.paydayfactor` with the bare factor when the hotel has no
 * percent text; `hccenter.breakdown.streakbonus`; and `hccenter.breakdown.total` - the rewards'
 * sum and, as `%actual%`, the spent credits times the factor plus the streak bonus cut to two
 * decimals. Each fills its first placeholder only, as AS3's `String.replace` does.
 *
 * `positionWindow` placed it (`placement`, from the club centre): right of the post-it, or left of
 * it with the pointer turned right (`direction = "right"`) when the stage has no room on the right.
 * A press anywhere on it closes it (`onInput`'s `WME_DOWN`, the payday link opening its help page
 * first), and so does a click anywhere else (`onStageClick`).
 */
import { IScrKickbackData } from '@nitrodevco/nitro-packets';

import { useTranslation } from '#base/context/system';
import { FloatingPopup, Region, TemplateWindow } from '#base/theme';
import { replaceFirst } from '#base/utils';

import { catalogTemplateId } from '../page/catalogTemplates';

/** Where `positionWindow` put the bubble, in stage coordinates, and which way its pointer faces. */
export interface ClubCenterBreakdownPlacement {
    x: number;
    y: number;
    pointer: 'left' | 'right';
}

export interface CatalogClubCenterBreakdownViewProps {
    kickback: IScrKickbackData;
    placement: ClubCenterBreakdownPlacement;
    onPaydayHelp: () => void;
    onClose: () => void;
}

export const CatalogClubCenterBreakdownView = ({ kickback, placement, onPaydayHelp, onClose }: CatalogClubCenterBreakdownViewProps) => {
    const t = useTranslation();

    const percent = Math.trunc(kickback.kickbackPercentage * 100);
    const factorPercent = t('hccenter.breakdown.paydayfactor.percent', '');
    const factor = factorPercent.length
        ? replaceFirst(replaceFirst(factorPercent, '%percent%', percent), '%multiplier%', kickback.kickbackPercentage)
        : replaceFirst(t('hccenter.breakdown.paydayfactor', 'hccenter.breakdown.paydayfactor'), '%percent%', kickback.kickbackPercentage);
    const actual = Math.trunc(((kickback.kickbackPercentage * kickback.totalCreditsSpent) + kickback.creditRewardForStreakBonus) * 100) / 100;
    const total = Math.trunc(((kickback.creditRewardForMonthlySpent + kickback.creditRewardForStreakBonus) * 100) / 100);

    return (
        <FloatingPopup
            x={placement.x}
            y={placement.y}
            onOutsideClick={onClose}
        >
            {/* `onInput`'s `WME_DOWN` on any of its windows: the theme's bubble takes no handler from a binding. */}
            <Region onPointerDown={onClose}>
                <TemplateWindow
                    id={catalogTemplateId('club_center_special_info_xml')}
                    bindings={{
                        // `(_window as IBubbleWindow).direction`, from `positionWindow`.
                        '': { direction: placement.pointer },
                        info_creditsspent: { caption: replaceFirst(t('hccenter.breakdown.creditsspent', 'hccenter.breakdown.creditsspent'), '%credits%', kickback.totalCreditsSpent) },
                        info_factor: { caption: factor },
                        info_streakbonus: { caption: replaceFirst(t('hccenter.breakdown.streakbonus', 'hccenter.breakdown.streakbonus'), '%credits%', kickback.creditRewardForStreakBonus) },
                        info_total: { caption: replaceFirst(replaceFirst(t('hccenter.breakdown.total', 'hccenter.breakdown.total'), '%credits%', total), '%actual%', actual) },
                        // Opens the help page, and the press goes on to close the bubble.
                        special_infolink: { onPointerDown: onPaydayHelp },
                    }}
                />
            </Region>
        </FloatingPopup>
    );
};
