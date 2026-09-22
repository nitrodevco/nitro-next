/**
 * The NFT reward box - `CollectiblesRewardBoxView` on `collectible_reward.xml` (424 x 570, style 3
 * frame, content margins 0/33/-430/0): "contains", the reward's name, the reward in the
 * `product_image` widget over the turning star (20 degrees a second, `BG_STAR_ROTATE_SPEED`), the
 * rarity flag with the rarity upper-cased, the info text and the OK button. The close button and
 * OK both show the next reward waiting, or take the box down (`showNextRewardOrClose`).
 *
 * `setWindowColors` tints the frame and its `background` border with the rarity's colour
 * (`getRarityColor`, which finds none and always answers grey - see `getCollectibleRarityColor`).
 *
 * The `product_image` widget is `product_image.xml` stretched over its 300 x 300 box: every window
 * but the avatar and the effect previewer fills it, those two are centred (`centerWindow`), the
 * effect 50 lower.
 */
import { getCollectibleProductName, showNextCollectiblesReward } from '#base/commands';
import { getCollectibleRarityColor, useCollectiblesStore, wrapBaseItem } from '#base/context/collectibles';
import { useTranslation } from '#base/context/system';
import { Border, Button, Frame, LayoutImage, Region, ThemeImage, ThemeText } from '#base/theme';

import { toCollectiblesCssColor } from './collectiblesColors';
import { COLLECTIBLES_BG_STAR_ROTATE_SPEED } from './collectiblesPreviewSlots';
import { CollectiblesPreviewSlots, CollectiblesProductPreview } from './CollectiblesProductPreview';
import { CollectiblesRotatingImage } from './CollectiblesRotatingImage';

/** The effect previewer's temporary room for the reward box's `product_image`. */
const REWARD_BOX_PREVIEW_ROOM_ID = 1002;

/** `product_image.xml` in a 300 x 300 widget. */
const REWARD_PRODUCT_IMAGE_SLOTS: CollectiblesPreviewSlots = {
    productPreview: { left: 0, top: 0, width: 300, height: 300 },
    placeholder: { left: 0, top: 0, width: 300, height: 300, src: LayoutImage('shared/collectables_collection_default.png'), centered: true },
    unknown: { left: 0, top: 0, width: 300, height: 300, src: LayoutImage('shared/collectables_icon_curator_stamp_large.png'), stretched: false },
    badge: { left: 0, top: 0, width: 300, height: 300, zoom: 2 },
    pet: { left: 0, top: 0, width: 300, height: 300, zoom: 1, shrinkOnOverflow: false },
    avatar: { left: 105, top: 85, width: 90, height: 130 },
    effect: { left: 100, top: 70, width: 100, height: 260, roomId: REWARD_BOX_PREVIEW_ROOM_ID },
};

export const CollectiblesRewardBoxView = () => {
    const t = useTranslation();
    const reward = useCollectiblesStore(x => x.rewardBoxCurrent);
    const preview = useCollectiblesStore(x => x.rewardBoxPreview);
    const rarity = reward?.rarity ?? '';
    const color = toCollectiblesCssColor(getCollectibleRarityColor(rarity));

    return (
        <Frame
            variant="3"
            id="CollectibleReward"
            name="CollectibleReward"
            caption={t('collectibles.reward_box.notif.title')}
            tintColor={color}
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={showNextCollectiblesReward}
            resizeDirection="none"
            defaultPosition={{ x: 59, y: 79 }}
            layout={{ position: 'absolute', width: 424, height: 570 }}
            margins={[ 0, 33, -430, 0 ]}
        >
            <Border
                variant="3"
                name="background"
                tintColor={color}
                layout={{ position: 'absolute', left: 0, width: 424, top: 0, height: 537 }}
            />
            <Region
                name="top_container"
                layout={{ position: 'absolute', left: 0, width: 424, top: 0, height: 350, overflow: 'hidden' }}
            >
                <Region
                    name="collector_hub_background"
                    layout={{ position: 'absolute', left: -2, width: 428, top: 0, height: 565 }}
                >
                    <ThemeImage
                        name="gradient"
                        src={LayoutImage('shared/collectables_score_background_gradient.png')}
                        bitmap={{}}
                        tint="#000000"
                        alpha={0.5}
                        layout={{ position: 'absolute', left: 0, width: 428, top: 0, height: 348 }}
                    />
                    <Border
                        variant="3"
                        name="dimmer"
                        tintColor="#000000"
                        blend={0.5}
                        layout={{ position: 'absolute', left: 0, width: 428, top: 0, height: 348 }}
                    />
                </Region>
                <Region
                    name="text_container"
                    layout={{ position: 'absolute', left: 0, width: 424, top: 0, height: 58 }}
                >
                    <ThemeText
                        text={t('collectibles.reward_box.contains')}
                        textStyle="u_regular"
                        textOptions={{ fill: '#ffffff', fontSize: 18, align: 'center' }}
                        name="title_text"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, width: 424, top: 4 }}
                    />
                    <ThemeText
                        text={reward ? getCollectibleProductName(wrapBaseItem(reward)) : 'Product Name'}
                        textStyle="u_bold"
                        textOptions={{ fill: '#f3cd03', fontSize: 20, align: 'center' }}
                        name="product_name"
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 0, width: 424, top: 32 }}
                    />
                </Region>
                <Region
                    name="product_container"
                    layout={{ position: 'absolute', left: 62, width: 300, top: 25, height: 300 }}
                >
                    <CollectiblesRotatingImage
                        src={LayoutImage('catalog/bg_star_300x300.png')}
                        speed={COLLECTIBLES_BG_STAR_ROTATE_SPEED}
                        active
                        stretched
                        tint="#ffecac"
                        alpha={0.75}
                        left={0}
                        top={0}
                        width={300}
                        height={300}
                    />
                    <Region
                        name="product_image"
                        layout={{ position: 'absolute', left: 0, width: 300, top: 0, height: 300 }}
                    >
                        <CollectiblesProductPreview
                            preview={preview}
                            slots={REWARD_PRODUCT_IMAGE_SLOTS}
                        />
                    </Region>
                </Region>
            </Region>
            <Region
                name="bottom_container"
                layout={{ position: 'absolute', left: 0, width: 424, top: 348, height: 187, overflow: 'hidden' }}
            >
                <Border
                    variant="3"
                    name="highlight"
                    blend={0.1}
                    layout={{ position: 'absolute', left: 0, width: 424, top: -2, height: 50 }}
                />
                <ThemeText
                    text={t('collectibles.reward_box.info')}
                    textStyle="u_regular"
                    textOptions={{ fill: '#ffffff', fontSize: 14, align: 'center' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, width: 424, top: 80 }}
                />
                <Button
                    variant="3"
                    name="ok_button"
                    onPointerTap={showNextCollectiblesReward}
                    layout={{ position: 'absolute', left: 152, width: 120, top: 124, height: 30, minWidth: 120 }}
                >
                    {t('generic.ok')}
                </Button>
            </Region>
            <Region
                name="rarity_container"
                layout={{ position: 'absolute', left: 0, width: 424, top: 300, height: 96 }}
            >
                <ThemeImage
                    name="flag_image"
                    src={LayoutImage('catalog/collectables_reward_rarity_flag.png')}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                    layout={{ position: 'absolute', left: 0, width: 424, top: 0, height: 86 }}
                />
                <ThemeText
                    text={t('collectibles.item.rarity')}
                    textStyle="u_regular"
                    textOptions={{ fill: '#440300', fontSize: 14, align: 'center' }}
                    name="rarity_title"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, width: 424, top: 30 }}
                />
                <ThemeText
                    text={reward ? rarity.toUpperCase() : 'RARITY'}
                    textStyle="u_bold"
                    textOptions={{ fill: '#440300', fontSize: 18, align: 'center' }}
                    name="rarity_text"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, width: 424, top: 50 }}
                />
            </Region>
        </Frame>
    );
};
