/**
 * The open set of the collections tab - `tabs/subviews/CollectionView` in `collection_content` of
 * `collectible_view.xml`:
 *
 * - `collection_header_container`: the set's name (`collectibles.set.<id>`, its own name without
 *   one) and `collected/total` on the set's progress colour (`initHeader`);
 * - `preview_container`: the turning star, the previewer (`CollectibleProductPreviewer` with every
 *   window), and over it either the set's view - the completion box of its bonus or reward item
 *   (`bonus_or_reward_container`, with its claim button and, for a bonus with a claim period, the
 *   time bar) and its XP texts (`collection_progress_container`) - or the selected item's
 *   (`product_name_container`, whose hover shows `product_info_container`'s type / rarity / XP
 *   rows, and `product_progress_container`);
 * - `item_container`: the set's items, one `CollectibleItemRenderer` each; picking one previews
 *   it, picking it again goes back to the set.
 *
 * The time bar follows `updateBonusProgressBar`, redrawn once a second: while the claim period
 * runs it is filled by the time left, in colours with no alpha byte - so it shows empty - under
 * `collectibles.preview.time_left` and the friendly time; once it has passed, full red under
 * `collectibles.preview.bonus_claim_ended` with the snapshot's date.
 */
import { claimCollectionItem, hasCollectionBonusClaimWindow, selectCollectionItem, setCollectionProductInfoVisible } from '#base/commands';
import { CollectiblesCollectionView as CollectionViewState, COLLECTION_PREVIEW_STATUS_BONUS, COLLECTION_PREVIEW_STATUS_ITEM, formatCollectiblesDate, getCollectionProgressColor, useCollectiblesStore, wrapCollectionItem } from '#base/context/collectibles';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useSecondsClock } from '#base/hooks';
import { Border, Button, LayoutImage, Region, ScrollArea, ThemeImage, ThemeText } from '#base/theme';
import { GetFriendlyTime } from '#base/utils';

import { toCollectiblesCssColor } from './collectiblesColors';
import { CollectiblesItemCell } from './CollectiblesItemCell';
import { COLLECTIBLES_BG_STAR_ROTATE_SPEED, COLLECTIBLES_HUB_PREVIEW_SLOTS } from './collectiblesPreviewSlots';
import { CollectiblesProductPreview } from './CollectiblesProductPreview';
import { CollectiblesProgressBar } from './CollectiblesProgressBar';
import { CollectiblesRotatingImage } from './CollectiblesRotatingImage';

/** `CollectionView.BONUS_PROGRESS_*`. */
const BONUS_PROGRESS_ACTIVE_TOP_COLOR = 37130;
const BONUS_PROGRESS_ACTIVE_BOTTOM_COLOR = 228352;
const BONUS_PROGRESS_EXPIRED_TOP_COLOR = 4294913325;
const BONUS_PROGRESS_EXPIRED_BOTTOM_COLOR = 4289724416;
/** `progress_padded_bar`'s width in `padded_cont`. */
const COMPLETION_BAR_WIDTH = 280;

/** The background art every previewer of the hub draws under its windows. */
export const CollectiblesPreviewBackground = ({ starActive }: { starActive: boolean }) => (
    <>
        <ThemeImage
            src={LayoutImage('catalog/collectables_score_background.png')}
            bitmap={{}}
            alpha={0.3}
            layout={{ position: 'absolute', left: -15, width: 166, top: -8, height: 286 }}
        />
        <ThemeImage
            src={LayoutImage('catalog/collectables_score_background_right.png')}
            bitmap={{}}
            alpha={0.3}
            layout={{ position: 'absolute', left: 139, width: 166, top: -18, height: 286 }}
        />
        <ThemeImage
            src={LayoutImage('catalog/collectables_score_background_gradient2.png')}
            bitmap={{}}
            tint="#45ace2"
            alpha={0.7}
            layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 260 }}
        />
        <CollectiblesRotatingImage
            src={LayoutImage('catalog/bg_star_300x300.png')}
            speed={COLLECTIBLES_BG_STAR_ROTATE_SPEED}
            active={starActive}
            stretched={false}
            alpha={0.35}
            left={-5}
            top={-20}
            width={300}
            height={300}
        />
    </>
);

/** `product_info_container` with the rows `initInfoEntries` added. */
export const CollectiblesProductInfoList = ({ entries }: { entries: { key: string; value: string }[] }) => (
    <Region
        name="product_info_container"
        backgroundColor="#3b1829"
        backgroundAlpha={0.6}
        layout={{ position: 'absolute', left: 0, width: 290, top: 26, height: 194 }}
    >
        <Region
            name="product_info_list"
            layout={{ position: 'absolute', left: 24, width: 242, top: 24, height: 140, flexDirection: 'column', gap: 2 }}
        >
            {entries.map((entry, index) => (
                <Region
                    key={index}
                    name="product_info_entry_template"
                    backgroundColor="#110b14"
                    backgroundAlpha={0.733}
                    layout={{ height: 20, width: 242, flexShrink: 0, overflow: 'hidden' }}
                >
                    <ThemeText
                        text={entry.key}
                        textStyle="u_regular"
                        textOptions={{ fill: '#eb8f01', align: 'right' }}
                        name="product_info_key"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, width: 136, top: 1 }}
                    />
                    <Region
                        name="product_info_value"
                        alpha={0.8}
                        layout={{ position: 'absolute', left: 140, width: 102, top: 1, height: 20, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <ThemeText
                            text={entry.value}
                            textStyle="u_regular"
                            textOptions={{ fill: '#ffffff' }}
                            clip
                        />
                    </Region>
                </Region>
            ))}
        </Region>
    </Region>
);

export const CollectiblesCollectionView = ({ view }: { view: CollectionViewState }) => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const ready = useCollectiblesStore(x => x.collectionsReady);
    const collection = useCollectiblesStore(x => x.collections.find(entry => entry.data.collectionId === view.collectionId));
    const clock = useSecondsClock();

    if (!collection) return null;

    const { data } = collection;
    const collected = collection.collectedItemCount;
    const total = data.items.length;
    const complete = collected === total;
    const isItemPreview = view.previewStatus === COLLECTION_PREVIEW_STATUS_ITEM;
    const selectedItem = isItemPreview ? data.items[view.selectedItemIndex] : undefined;

    // `updateBonusProgressBar`.
    const now = performance.timeOrigin + clock;
    const isBonus = view.previewStatus === COLLECTION_PREVIEW_STATUS_BONUS;
    const claimWindow = isBonus && hasCollectionBonusClaimWindow(data.releasedTime, data.snapshotTime);
    const expired = claimWindow && (now >= data.snapshotTime);
    const timeLeft = Math.max(0, data.snapshotTime - now);
    const duration = data.snapshotTime - data.releasedTime;
    const fraction = (duration <= 0) ? 1 : Math.min(1, Math.max(0, timeLeft / duration));
    const barText = expired
        ? t('collectibles.preview.bonus_claim_ended', 'Bonus item claim period ended - %date%', { date: formatCollectiblesDate(data.snapshotTime) })
        : `${t('collectibles.preview.time_left', '')}: ${GetFriendlyTime(t, timeLeft / 1000)}`;

    return (
        <Region
            name="collection_content"
            layout={{ position: 'absolute', left: 195, width: 290, top: 3, height: 425 }}
        >
            <Border
                variant="3"
                name="collection_header_container"
                tintColor="#cbd1d8"
                layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 30 }}
            >
                <ThemeText
                    text={t(`collectibles.set.${data.collectionId}`, data.collectionName)}
                    textStyle="u_regular"
                    textOptions={{ fontSize: 16 }}
                    name="collection_name"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 4, top: 4 }}
                />
                <Region
                    name="progress_header_container"
                    layout={{ position: 'absolute', left: 248, width: 40, top: 2, height: 26 }}
                >
                    <Border
                        variant="3"
                        name="progress_color"
                        tintColor={toCollectiblesCssColor(getCollectionProgressColor(collected, total))}
                        layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 26 }}
                    />
                    <ThemeText
                        text={`${collected}/${total}`}
                        textStyle="u_regular"
                        textOptions={{ fill: '#ffffff', align: 'center' }}
                        name="progress_text"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 2, width: 36, top: 4 }}
                    />
                </Region>
            </Border>
            <Region
                name="preview_container"
                layout={{ position: 'absolute', left: 0, width: 290, top: 34, height: 260 }}
            >
                <Border
                    variant="3"
                    name="collection_preview_bg"
                    tintColor="#3d1f39"
                    layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 260, overflow: 'hidden' }}
                >
                    <CollectiblesPreviewBackground starActive={ready} />
                    <CollectiblesProductPreview
                        preview={view.preview}
                        slots={COLLECTIBLES_HUB_PREVIEW_SLOTS}
                    />
                    {isItemPreview && (
                        <Region
                            name="product_name_container"
                            backgroundColor="#000000"
                            backgroundAlpha={0.839}
                            onPointerOver={() => setCollectionProductInfoVisible(true)}
                            onPointerOut={() => setCollectionProductInfoVisible(false)}
                            layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 26 }}
                        >
                            <ThemeText
                                text={view.productName}
                                textStyle="u_regular"
                                textOptions={{ fill: '#ffffff', align: 'center' }}
                                name="preview_furni_name"
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 0, width: 290, top: 5 }}
                            />
                        </Region>
                    )}
                    {view.productInfoVisible && <CollectiblesProductInfoList entries={view.productInfoEntries} />}
                    {view.completionItem && (
                        <Region
                            name="bonus_or_reward_container"
                            layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 200 }}
                        >
                            <Region
                                name="completion_header_container"
                                backgroundColor="#000000"
                                backgroundAlpha={0.839}
                                layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: claimWindow ? 60 : 38 }}
                            >
                                <Region
                                    name="padded_cont"
                                    layout={{ position: 'absolute', left: 4, width: 282, top: 4, height: 52 }}
                                >
                                    <ThemeText
                                        text={t('collectibles.preview.completion_bonus')}
                                        textStyle="u_regular"
                                        textOptions={{ fill: '#ffd300', fontSize: 11, align: 'center' }}
                                        verticalAlign="top"
                                        layout={{ position: 'absolute', left: 0, width: 282, top: 0 }}
                                    />
                                    <ThemeText
                                        text={view.completionItemName}
                                        textStyle="u_regular"
                                        textOptions={{ fill: '#ffffff', align: 'center' }}
                                        name="reward_furni_name"
                                        verticalAlign="top"
                                        layout={{ position: 'absolute', left: 0, width: 282, top: 14 }}
                                    />
                                    {claimWindow && (
                                        <CollectiblesProgressBar
                                            left={0}
                                            top={34}
                                            width={282}
                                            paddedWidth={COMPLETION_BAR_WIDTH}
                                            fillWidth={expired ? COMPLETION_BAR_WIDTH : Math.trunc(COMPLETION_BAR_WIDTH * fraction)}
                                            topColor={expired ? BONUS_PROGRESS_EXPIRED_TOP_COLOR : BONUS_PROGRESS_ACTIVE_TOP_COLOR}
                                            bottomColor={expired ? BONUS_PROGRESS_EXPIRED_BOTTOM_COLOR : BONUS_PROGRESS_ACTIVE_BOTTOM_COLOR}
                                            text={barText}
                                            textWidth={282}
                                        />
                                    )}
                                </Region>
                            </Region>
                            {view.claimVisible && (
                                <Button
                                    variant="5"
                                    name="claim_button"
                                    tintColor="#01a101"
                                    disabled={!view.claimEnabled}
                                    onPointerTap={() => claimCollectionItem(send)}
                                    layout={{ position: 'absolute', left: 186, width: 97, top: 166, height: 30 }}
                                >
                                    {t('collectibles.claim')}
                                </Button>
                            )}
                        </Region>
                    )}
                    {!isItemPreview && (
                        <Region
                            name="collection_progress_container"
                            backgroundColor="#000000"
                            backgroundAlpha={0.667}
                            layout={{ position: 'absolute', left: 0, width: 290, top: 200, height: 60 }}
                        >
                            <ThemeText
                                text={t('collectibles.preview.score', '', { progress: `<font color="#00FF12">${data.collectionScore}</font>`, goal: String(data.collectionTotalScore) })}
                                textStyle="u_regular"
                                textOptions={{ fill: '#ffffff', wordWrap: true, wordWrapWidth: 286, align: 'center' }}
                                markup
                                name="preview_score_text"
                                verticalAlign="top"
                                layout={{ position: 'absolute', left: 0, width: 290, top: 3, minWidth: 290, maxWidth: 290, minHeight: 17, maxHeight: 17 }}
                            />
                            <Border
                                variant="3"
                                tintColor="#5a1003"
                                layout={{ position: 'absolute', left: 4, width: 282, top: 24, height: 32 }}
                            >
                                <ThemeText
                                    text={t(complete ? 'collectibles.preview.reward_collected' : 'collectibles.preview.reward', '', { amount: `<font color="#FFC800">${data.collectionBoostScore}</font>` })}
                                    textStyle="u_regular"
                                    textOptions={{ fill: '#ffffff', fontSize: 11, wordWrap: true, wordWrapWidth: 270, align: 'center' }}
                                    markup
                                    name="preview_reward_text"
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 4, width: 274, alignSelf: 'center', minWidth: 274, maxWidth: 274 }}
                                />
                            </Border>
                        </Region>
                    )}
                    {isItemPreview && selectedItem && (
                        <Region
                            name="product_progress_container"
                            backgroundColor="#000000"
                            backgroundAlpha={0.667}
                            layout={{ position: 'absolute', left: 0, width: 290, top: 220, height: 40 }}
                        >
                            <Border
                                variant="3"
                                tintColor="#5a1003"
                                layout={{ position: 'absolute', left: 4, width: 282, top: 4, height: 32 }}
                            >
                                <ThemeText
                                    text={t((selectedItem.amount > 0) ? 'collectibles.preview.product.complete' : 'collectibles.preview.product.incomplete', '', { amount: `<font color="#FFC800">${selectedItem.score}</font>` })}
                                    textStyle="u_regular"
                                    textOptions={{ fill: '#ffffff', fontSize: 11, wordWrap: true, wordWrapWidth: 270, align: 'center' }}
                                    markup
                                    name="procuct_score_text"
                                    verticalAlign="top"
                                    layout={{ position: 'absolute', left: 4, width: 274, alignSelf: 'center', minWidth: 274, maxWidth: 274 }}
                                />
                            </Border>
                        </Region>
                    )}
                </Border>
            </Region>
            <Region
                name="item_container"
                layout={{ position: 'absolute', left: 0, width: 290, top: 300, height: 123 }}
            >
                <ScrollArea
                    orientation="vertical"
                    variant="3"
                    layout={{ position: 'absolute', left: 0, width: 290, top: 0, height: 123 }}
                >
                    <Region
                        name="itemgrid_collection"
                        layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 1, width: '100%' }}
                    >
                        {data.items.map((item, index) => (
                            <CollectiblesItemCell
                                key={index}
                                kind="collection"
                                info={wrapCollectionItem(item)}
                                active={view.selectedItemIndex === index}
                                onSelect={() => selectCollectionItem(send, index)}
                            />
                        ))}
                    </Region>
                </ScrollArea>
            </Region>
        </Region>
    );
};
