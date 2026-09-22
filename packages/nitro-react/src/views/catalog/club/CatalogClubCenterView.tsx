/**
 * The HC centre - Flash's `ClubCenterView` (with `HabboClubCenter` around it), drawn from
 * `club_center.xml` (460x597, style 3 frame in `0x418db0`, margins 0/32/0/-10, draggable,
 * centred): the cover with the buy and earn buttons, the status row (club badge, status title and
 * info), the HC payday block and the monthly gift block in their list, the footer with the general
 * benefits and the illustration, the user's avatar in the `avatar` room previewer, and the payday
 * post-it over the list.
 *
 * `dataReceived` decides what they say. The status is `resolveClubStatus` (`hccenter.status.<status>`);
 * with no kickback data yet the gift block is hidden and nothing else is filled. Then the status
 * info fills `%timeleft%` (the purse's minutes until expiration), `%joindate%` and
 * `%streakduration%` (`FriendlyTime.getShortFriendlyTime`), the badge is the club badge
 * `BadgeResolver` found, the payday time is `hccenter.special.time.soon` under an hour, and the
 * post-it's amount and breakdown link show only when the month's and the streak's rewards add up
 * to more than 0. An active member with gifts waiting gets "redeem" and `hccenter.unclaimedgifts`,
 * everyone else "view" and `hccenter.gift.info`; "buy" says "extend" while active. Without
 * `hccenter.activity.enabled` the payday block, its post-it and the breakdown link are removed.
 *
 * The breakdown link opens `ClubSpecialInfoBubbleView` beside the post-it (`CatalogClubCenterBreakdownView`);
 * dragging the window closes it (`onRelocate`). The buy and gift buttons open the catalogue at
 * `hc_membership` and `club_gifts`, the info links the `habbopages/hcpayday` and
 * `habbopages/habboclub` links - which `openClientLink` only logs, as the port has no habbo pages
 * window (`HabboHelp`) to answer them. `btn_earn` stays hidden: only the offer centre's video offers show
 * it (`indicateVideoAvailable`), and the port has no video offer provider. The avatar is the full
 * figure facing 4 at twice its size from the previewer's corner (`RoomPreviewerWidget.showPreview`
 * scales the bitmap by 2 and nothing offsets it). `special_amount_icon`'s `asset_uri` is
 * `hc_center_icon_credits`, the embedded file of the published `hc_center_hc_center_icon_credits`,
 * which is the bitmap drawn.
 */
import { GetRenderer } from '@nitrodevco/nitro-renderer';
import { Container as PixiContainer } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { isClubKickbackEnabled, openClubCatalogPage, openClubHelpPage, removeClubCenter, showClubCenter } from '#base/commands';
import { useCatalogStore, useCatalogStoreApi } from '#base/context/catalog';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigData, useConfigValue, useTranslation } from '#base/context/system';
import { useOwnUserFigure, useOwnUserGender, useUserStore } from '#base/context/user';
import { Border, ButtonThick, Frame, getGlobalRect, LayoutImage, Region, ThemeImage, ThemeText, useAvatarImageTexture, WidgetSlot } from '#base/theme';
import { CLUB_STATUS_ACTIVE, GetFriendlyTime, resolveClubStatus } from '#base/utils';

import { CatalogClubCenterBreakdownView, ClubCenterBreakdownPlacement } from './CatalogClubCenterBreakdownView';

/** `ClubSpecialInfoBubbleView.MARGIN` and its window size (`club_center_special_info.xml`). */
const BREAKDOWN_MARGIN = 8;
const BREAKDOWN_WIDTH = 374;
const BREAKDOWN_HEIGHT = 146;

/** AS3 `String.replace(string, string)`: the first occurrence, with no `$` patterns. */
const replaceFirst = (text: string, search: string, replacement: string | number) => text.replace(search, () => String(replacement));

export const CatalogClubCenterView = () => {
    const kickback = useCatalogStore(x => x.clubKickbackData);
    const giftsAvailable = useCatalogStore(x => x.clubCenterGiftsAvailable);
    const badgeId = useCatalogStore(x => x.clubBadgeId);
    const subscription = useUserStore(x => x.clubSubscription);
    const figure = useOwnUserFigure();
    const gender = useOwnUserGender();
    const config = useConfigData();
    const badgeUrl = useConfigValue<string>('badge.asset.url') ?? '';
    const store = useCatalogStoreApi();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const postitRef = useRef<PixiContainer>(null);
    const [ breakdown, setBreakdown ] = useState<ClubCenterBreakdownPlacement | undefined>(undefined);
    const avatar = useAvatarImageTexture(figure, gender, { direction: 4 });

    useEffect(() => {
        showClubCenter(send, store, performance.now());
    }, [ send, store ]);

    const kickbackEnabled = isClubKickbackEnabled(config);
    const status = resolveClubStatus(subscription);
    const formatMinutes = (minutes: number) => GetFriendlyTime(t, minutes * 60, '.short');
    const formatDays = (days: number) => GetFriendlyTime(t, days * 86400, '.short');
    const isActive = (status === CLUB_STATUS_ACTIVE);

    let statusInfo = '';
    let paydayTime = '';
    let paydaySum = 0;

    if (kickback) {
        statusInfo = t(`hccenter.status.${status}.info`, `hccenter.status.${status}.info`);
        statusInfo = replaceFirst(statusInfo, '%timeleft%', formatMinutes(subscription.minutesUntilExpiration));
        statusInfo = replaceFirst(statusInfo, '%joindate%', kickback.firstSubscriptionDate);
        statusInfo = replaceFirst(statusInfo, '%streakduration%', formatDays(kickback.currentHcStreak));
        paydayTime = (kickback.timeUntilPayday < 60) ? t('hccenter.special.time.soon', 'hccenter.special.time.soon') : formatMinutes(kickback.timeUntilPayday);
        paydaySum = kickback.creditRewardForMonthlySpent + kickback.creditRewardForStreakBonus;
    }

    const showAmount = !!kickback && kickbackEnabled && (paydaySum > 0);
    const giftsWaiting = isActive && (giftsAvailable > 0);
    const giftInfo = giftsWaiting ? replaceFirst(t('hccenter.unclaimedgifts', 'hccenter.unclaimedgifts'), '%unclaimedgifts%', giftsAvailable) : t('hccenter.gift.info', 'hccenter.gift.info');

    /** `showPaydayBreakdownView`: away with it when it is up, otherwise `positionWindow` beside the post-it. */
    const toggleBreakdown = () => {
        if (breakdown) {
            setBreakdown(undefined);

            return;
        }

        const anchor = postitRef.current;

        if (!anchor || !kickback) return;

        const rect = getGlobalRect(anchor);
        const pointRight = (GetRenderer().screen.width < (rect.x + rect.width + BREAKDOWN_WIDTH + BREAKDOWN_MARGIN)) && (rect.x > (BREAKDOWN_WIDTH + BREAKDOWN_MARGIN));

        setBreakdown({
            x: pointRight ? (rect.x - (BREAKDOWN_WIDTH + BREAKDOWN_MARGIN)) : (rect.x + rect.width + BREAKDOWN_MARGIN),
            y: rect.y + (rect.height * 0.5) - (BREAKDOWN_HEIGHT * 0.5),
            pointer: pointRight ? 'right' : 'left',
        });
    };

    return (
        <>
            <Frame
                id="hc_center"
                variant="3"
                centered
                rememberPosition={false}
                caption={t('generic.hccenter')}
                tintColor="#418db0"
                dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
                resizeDirection="none"
                margins={[ 0, 32, 0, -10 ]}
                onClose={() => removeClubCenter(store)}
                onPositionChange={() => setBreakdown(undefined)}
                layout={{ position: 'absolute', width: 460, height: 597 }}
            >
                <Region layout={{ position: 'absolute', left: 0, width: 460, top: 0, flexDirection: 'column' }}>
                    <Region layout={{ width: 459, height: 137, flexShrink: 0, overflow: 'hidden' }}>
                        <ThemeImage
                            name="coverpic"
                            src={LayoutImage('catalog/hc_center_hc_center_cover.png')}
                            bitmap={{ stretchedX: false, stretchedY: false }}
                            layout={{ position: 'absolute', left: 0, width: 459, top: 1, height: 137 }}
                        />
                        <Region layout={{ position: 'absolute', left: 21, top: 85, height: 33, flexDirection: 'row', gap: 14 }}>
                            <ButtonThick
                                variant="6"
                                name="btn_buy"
                                tintColor="#54c32e"
                                textStyle="button_shiny_bold"
                                onPointerTap={() => openClubCatalogPage('hc_membership')}
                                layout={{ width: 121, height: 33, marginTop: -2, flexShrink: 0 }}
                            >
                                {t(isActive ? 'hccenter.btn.extend' : 'hccenter.btn.buy')}
                            </ButtonThick>
                        </Region>
                    </Region>
                    <Region
                        name="basic"
                        layout={{ width: 460, height: 75, flexShrink: 0 }}
                    >
                        <Region
                            name="hc_badge_container"
                            layout={{ position: 'absolute', left: 19, width: 50, top: 11, height: 50 }}
                        >
                            {(kickback && badgeId)
                                ? (
                                        <ThemeImage
                                            name="hc_badge"
                                            src={badgeUrl.replace('%badgename%', badgeId)}
                                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                                            layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                                        />
                                    )
                                : null}
                        </Region>
                        <Region layout={{ position: 'absolute', left: 72, width: 360, top: 7, height: 62, flexDirection: 'row', flexWrap: 'wrap' }}>
                            <ThemeText
                                name="status_title"
                                text={t(`hccenter.status.${status}`)}
                                textStyle="u_bold"
                                markup
                                clip
                                verticalAlign="top"
                                layout={{ width: 290, height: 16, flexShrink: 0 }}
                            />
                            <ThemeText
                                name="status_info"
                                text={statusInfo}
                                textStyle="u_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: 281 }}
                                markup
                                clip
                                verticalAlign="top"
                                layout={{ width: 285, height: 45, flexShrink: 0 }}
                            />
                        </Region>
                    </Region>
                    <Region layout={{ width: 420, height: 208, marginLeft: 20, flexShrink: 0, flexDirection: 'column' }}>
                        {kickbackEnabled && (
                            <Region
                                name="special_content"
                                layout={{ width: 420, height: 134, flexShrink: 0 }}
                            >
                                <Border
                                    variant="3"
                                    tintColor="#53a3cb"
                                    layout={{ position: 'absolute', left: 0, width: 412, top: 0, height: 128 }}
                                >
                                    <ThemeText
                                        name="special_title"
                                        text={t('hccenter.special.title')}
                                        textStyle="u_bold"
                                        textOptions={{ fill: '#ffffff', fontSize: 16 }}
                                        clip
                                        verticalAlign="top"
                                        layout={{ position: 'absolute', left: 16, width: 180, top: 16, height: 22 }}
                                    />
                                    <ThemeText
                                        name="special_info"
                                        text={t('hccenter.special.info')}
                                        textStyle="u_regular"
                                        textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 176 }}
                                        clip
                                        verticalAlign="top"
                                        layout={{ position: 'absolute', left: 16, width: 180, top: 36, height: 56 }}
                                    />
                                    <Region
                                        name="special_infolink"
                                        cursor="pointer"
                                        onPointerTap={() => openClubHelpPage(send, 'hcpayday')}
                                        layout={{ position: 'absolute', left: 16, width: 190, top: 100, height: 19 }}
                                    >
                                        <ThemeText
                                            text={t('hccenter.special.infolink')}
                                            textStyle="u_regular"
                                            textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 186 }}
                                            flashFormat={{ underline: true }}
                                            clip
                                            verticalAlign="top"
                                        />
                                    </Region>
                                </Border>
                            </Region>
                        )}
                        {kickback && (
                            <Border
                                variant="3"
                                name="gift_content"
                                tintColor="#54c32e"
                                layout={{ width: 412, height: 74, flexShrink: 0 }}
                            >
                                <ThemeText
                                    name="gift_title"
                                    text={t('hccenter.gift.title')}
                                    textStyle="u_bold"
                                    textOptions={{ fill: '#ffffff', fontSize: 16 }}
                                    clip
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 16, width: 250, top: 16, height: 22 }}
                                />
                                <ThemeText
                                    name="gift_info"
                                    text={giftInfo}
                                    textStyle="u_regular"
                                    textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 246 }}
                                    markup
                                    clip
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 16, width: 250, top: 36, height: 32 }}
                                />
                                <ButtonThick
                                    variant="5"
                                    name="btn_gift"
                                    tintColor="#3399cc"
                                    textStyle="button_shiny_bold"
                                    onPointerTap={() => openClubCatalogPage('club_gifts')}
                                    layout={{ position: 'absolute', left: 233, width: 154, top: 22, height: 33 }}
                                >
                                    {t(giftsWaiting ? 'hccenter.btn.gifts.redeem' : 'hccenter.btn.gifts.view')}
                                </ButtonThick>
                            </Border>
                        )}
                    </Region>
                    <Region
                        name="footer"
                        layout={{ width: 460, height: 139, flexShrink: 0, overflow: 'hidden' }}
                    >
                        <ThemeText
                            name="general_title"
                            text={t('hccenter.general.title')}
                            textStyle="u_bold"
                            textOptions={{ fill: '#4a8eb1', fontSize: 16 }}
                            clip
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 36, width: 190, top: 6, height: 22 }}
                        />
                        <ThemeText
                            name="general_info"
                            text={t('hccenter.general.info')}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: 170 }}
                            markup
                            clip
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 36, width: 174, top: 28, height: 97 }}
                        />
                        <Region
                            name="general_infolink"
                            cursor="pointer"
                            onPointerTap={() => openClubHelpPage(send, 'habboclub')}
                            layout={{ position: 'absolute', left: 36, width: 174, top: 118, height: 26 }}
                        >
                            <ThemeText
                                text={t('hccenter.general.infolink')}
                                textStyle="u_regular"
                                textOptions={{ fill: '#4a8eb1', wordWrap: true, wordWrapWidth: 170 }}
                                flashFormat={{ underline: true }}
                                clip
                                verticalAlign="top"
                            />
                        </Region>
                        <ThemeImage
                            name="hc_center_illustration"
                            src={LayoutImage('catalog/hc_center_hc_center_illustration.png')}
                            bitmap={{ stretchedX: false, stretchedY: false }}
                            layout={{ position: 'absolute', left: 256, width: 200, top: 10, height: 130 }}
                        />
                    </Region>
                </Region>
                <WidgetSlot
                    widgetType="room_previewer"
                    name="avatar"
                    options={{ 'room_previewer:offsety': '-30', 'room_previewer:zoom': '2' }}
                    layout={{ position: 'absolute', left: 360, width: 90, top: 14, height: 130, overflow: 'hidden' }}
                >
                    {avatar.texture && (
                        <ThemeImage
                            texture={avatar.texture}
                            scale={2}
                            layout={{ position: 'absolute', left: 0, top: 0 }}
                        />
                    )}
                </WidgetSlot>
                {kickbackEnabled && (
                    <Region
                        ref={postitRef}
                        name="special_content_postit"
                        layout={{ position: 'absolute', left: 218, width: 222, top: 204, height: 150 }}
                    >
                        <ThemeImage
                            name="hc_postit_bg"
                            src={LayoutImage('catalog/hc_center_hc_postit_bg.png')}
                            bitmap={{ stretchedX: false, stretchedY: false }}
                            layout={{ position: 'absolute', left: 0, width: 222, top: 0, height: 150 }}
                        />
                        <ThemeText
                            name="special_time_title"
                            text={t('hccenter.special.time.title')}
                            textStyle="u_bold"
                            textOptions={{ fill: '#683203', fontSize: 16 }}
                            clip
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 13, width: 190, top: 16, height: 22 }}
                        />
                        {!!kickback && (
                            <ThemeText
                                name="special_time_content"
                                text={paydayTime}
                                textStyle="u_regular"
                                textOptions={{ fill: '#683203', fontSize: 16 }}
                                markup
                                clip
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 47, width: 153, top: 41, height: 22 }}
                            />
                        )}
                        {showAmount && (
                            <>
                                <ThemeText
                                    name="special_amount_title"
                                    text={t('hccenter.special.amount.title')}
                                    textStyle="u_bold"
                                    textOptions={{ fill: '#683203', fontSize: 16 }}
                                    clip
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 13, width: 190, top: 68, height: 22 }}
                                />
                                <ThemeText
                                    name="special_amount_content"
                                    text={replaceFirst(t('hccenter.special.sum', 'hccenter.special.sum'), '%credits%', paydaySum)}
                                    textStyle="u_regular"
                                    textOptions={{ fill: '#683203', fontSize: 16 }}
                                    markup
                                    clip
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 47, width: 153, top: 95, height: 22 }}
                                />
                                <Region
                                    name="special_breakdown_link"
                                    cursor="pointer"
                                    onPointerTap={toggleBreakdown}
                                    layout={{ position: 'absolute', left: 17, width: 190, top: 120, flexDirection: 'row', justifyContent: 'flex-end' }}
                                >
                                    <ThemeText
                                        text={t('hccenter.breakdown.infolink')}
                                        textStyle="u_regular"
                                        textOptions={{ fill: '#4a8eb1', wordWrap: true, wordWrapWidth: 186, align: 'right' }}
                                        flashFormat={{ underline: true }}
                                        verticalAlign="top"
                                    />
                                </Region>
                            </>
                        )}
                        <ThemeImage
                            name="special_time_icon"
                            src={LayoutImage('catalog/hc_center_hc_center_timer.png')}
                            bitmap={{}}
                            layout={{ position: 'absolute', left: 7, width: 24, top: 41, height: 24 }}
                        />
                        {showAmount && (
                            <ThemeImage
                                name="special_amount_icon"
                                src={LayoutImage('catalog/hc_center_hc_center_icon_credits.png')}
                                bitmap={{}}
                                layout={{ position: 'absolute', left: 17, width: 24, top: 94, height: 24 }}
                            />
                        )}
                    </Region>
                )}
            </Frame>
            {breakdown && kickback && (
                <CatalogClubCenterBreakdownView
                    kickback={kickback}
                    placement={breakdown}
                    onPaydayHelp={() => openClubHelpPage(send, 'hcpayday')}
                    onClose={() => setBreakdown(undefined)}
                />
            )}
        </>
    );
};
