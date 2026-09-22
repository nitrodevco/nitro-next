/**
 * The HC payday breakdown - Flash's `ClubSpecialInfoBubbleView`, drawn from
 * `club_center_special_info.xml`: a style 7 bubble (374x146, margins 3/36/3/3) pointing at the
 * club centre's post-it, holding the `0xeeeeee` block of the month's figures.
 *
 * The texts: `hccenter.breakdown.creditsspent` (`%credits%`); the factor from
 * `hccenter.breakdown.paydayfactor.percent` (`%percent%` = the percentage as an int, `%multiplier%`
 * the factor), or `hccenter.breakdown.paydayfactor` with the bare factor when the hotel has no
 * percent text; `hccenter.breakdown.streakbonus`; and `hccenter.breakdown.total` - the rewards'
 * sum and, as `%actual%`, the spent credits times the factor plus the streak bonus cut to two
 * decimals. Each fills its first placeholder only, as AS3's `String.replace` does.
 *
 * `positionWindow` placed it (`placement`, from the club centre): right of the post-it, or left of
 * it with the pointer turned right when the stage has no room on the right. A press anywhere on it
 * closes it (`onInput`, the payday link opening its help page first), and so does a click anywhere
 * else (`onStageClick`).
 */
import { IScrKickbackData } from '@nitrodevco/nitro-packets';

import { useTranslation } from '#base/context/system';
import { Border, Bubble, FloatingPopup, Region, ThemeText } from '#base/theme';

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

/** AS3 `String.replace(string, string)`: the first occurrence, with no `$` patterns. */
const replaceFirst = (text: string, search: string, replacement: string | number) => text.replace(search, () => String(replacement));

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
            <Bubble
                variant="7"
                pointer={placement.pointer}
                margins={[ 3, 36, 3, 3 ]}
                onPointerDown={onClose}
                layout={{ width: 374, height: 146 }}
            >
                <Region
                    name="main_content"
                    layout={{ position: 'absolute', left: 11, width: 345, top: -21 }}
                >
                    <Border
                        variant="3"
                        tintColor="#eeeeee"
                        layout={{ width: 345, height: 120 }}
                    >
                        <ThemeText
                            text={t('hccenter.breakdown.title')}
                            textStyle="u_bold"
                            clip
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 30 }}
                        />
                        <ThemeText
                            name="info_creditsspent"
                            text={replaceFirst(t('hccenter.breakdown.creditsspent', 'hccenter.breakdown.creditsspent'), '%credits%', kickback.totalCreditsSpent)}
                            textStyle="u_regular"
                            markup
                            clip
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, width: 340, top: 20, height: 30 }}
                        />
                        <ThemeText
                            name="info_factor"
                            text={factor}
                            textStyle="u_regular"
                            markup
                            clip
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, width: 340, top: 40, height: 30 }}
                        />
                        <ThemeText
                            name="info_streakbonus"
                            text={replaceFirst(t('hccenter.breakdown.streakbonus', 'hccenter.breakdown.streakbonus'), '%credits%', kickback.creditRewardForStreakBonus)}
                            textStyle="u_regular"
                            markup
                            clip
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, width: 340, top: 60, height: 30 }}
                        />
                        <Border
                            variant="1"
                            layout={{ position: 'absolute', left: 0, width: 340, top: 79, height: 1 }}
                        />
                        <ThemeText
                            name="info_total"
                            text={replaceFirst(replaceFirst(t('hccenter.breakdown.total', 'hccenter.breakdown.total'), '%credits%', total), '%actual%', actual)}
                            textStyle="u_regular"
                            markup
                            clip
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, width: 340, top: 80, height: 30 }}
                        />
                        <Region
                            name="special_infolink"
                            cursor="pointer"
                            onPointerDown={onPaydayHelp}
                            layout={{ position: 'absolute', left: 145, width: 190, top: 100, flexDirection: 'row', justifyContent: 'flex-end' }}
                        >
                            <ThemeText
                                text={t('hccenter.special.infolink')}
                                textStyle="u_regular"
                                textOptions={{ fill: '#666666', wordWrap: true, wordWrapWidth: 186, align: 'right' }}
                                flashFormat={{ underline: true }}
                                verticalAlign="top"
                            />
                        </Region>
                    </Border>
                </Region>
            </Bubble>
        </FloatingPopup>
    );
};
