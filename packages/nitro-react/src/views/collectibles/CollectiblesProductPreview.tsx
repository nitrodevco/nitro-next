/**
 * `tabs/subviews/CollectibleProductPreviewer` (`§_-NN§`) and the `product_image` window widget
 * (`ProductImageWidget` on `product_image.xml`): the set of windows a product preview is drawn in
 * - `product_preview` (a furni render or icon, an effect icon, a chat style), `badge_image_widget`,
 * `pet_image_widget`, `avatar_image_widget`, `effect_image_widget` (a room previewer with the user
 * wearing the effect, `EffectPreviewer`), `unknown_image` and `placeholder_image` - of which the
 * `CollectiblePreview` it is given shows one, or none.
 *
 * Each previewer passes the windows its layout has, at their rects; a result for a window it
 * lacks shows nothing, as the Flash setters return on a null window. How each widget draws follows
 * its window manager layout: the bitmap, badge and pet unstretched and centred (the badge and pet
 * zoomed by the layout's `zoom` vars, the pet halved when `shrink_on_overflow` finds it too big),
 * the avatar's full uncropped image stretched over its box.
 *
 * The effect previewer turns the avatar to direction 2 (`updateAvatarDirectionAndLocation(2, 2)`);
 * the port's room previewer centres its object itself, so the widget's `room_previewer:offsetx` /
 * `offsety` are not applied.
 */
import { AvatarGenderType, RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { GetRoomEngine } from '@nitrodevco/nitro-renderer';

import { RoomPreviewer } from '#base/components/room/RoomPreviewer';
import { CollectiblePreview } from '#base/context/collectibles';
import { useConfigValue } from '#base/context/system';
import { useChatStyle } from '#base/hooks';
import { BoxLayout, LayoutImage, Region, ThemeImage, useAvatarImageTexture, useTextureFromUrl } from '#base/theme';
import { useFurnitureImageTexture } from '#base/views/catalog/useFurnitureImageTexture';

import { CollectiblesChatBubblePreview } from './CollectiblesChatBubblePreview';
import { useCollectiblePetTexture } from './useCollectiblePetTexture';

export interface CollectiblesPreviewRect {
    left: number;
    top: number;
    width: number;
    height: number;
}

/** The previewer's windows, each at its layout rect. */
export interface CollectiblesPreviewSlots {
    /** `product_preview` / the grid item's `BITMAP`: unstretched, centred. */
    productPreview?: CollectiblesPreviewRect;
    placeholder?: CollectiblesPreviewRect & { src: string; centered: boolean };
    unknown?: CollectiblesPreviewRect & { src: string; stretched: boolean };
    badge?: CollectiblesPreviewRect & { zoom: number };
    /** `direction`: the widget's `pet_image:direction` in degrees, southeast (90) unless the layout says. */
    pet?: CollectiblesPreviewRect & { zoom: number; shrinkOnOverflow: boolean; direction?: number };
    avatar?: CollectiblesPreviewRect;
    effect?: CollectiblesPreviewRect & { roomId: number };
}

const rectLayout = ({ left, top, width, height }: CollectiblesPreviewRect): BoxLayout => ({ position: 'absolute', left, top, width, height });

const UNSTRETCHED_CENTER = { stretchedX: false, stretchedY: false, pivot: 'center' } as const;

/** `imageResult` of a furni: the room engine's icon, or its render at 64 facing 90 degrees. */
const FurniPreview = ({ preview, rect }: { preview: Extract<CollectiblePreview, { kind: 'furni' }>; rect: CollectiblesPreviewRect }) => {
    const { texture } = useFurnitureImageTexture(preview.icon ? undefined : preview.className, preview.colorIndex, 90, RoomGeometryScaleType.ZoomedIn);
    const iconUrl = preview.icon ? (preview.isWallItem ? GetRoomEngine().getFurnitureWallIconUrl(preview.classId, undefined) : GetRoomEngine().getFurnitureFloorIconUrl(preview.classId)) : undefined;

    if (preview.icon) {
        return (
            <ThemeImage
                name="product_preview"
                src={iconUrl}
                bitmap={UNSTRETCHED_CENTER}
                layout={rectLayout(rect)}
            />
        );
    }

    if (!texture) return null;

    return (
        <ThemeImage
            name="product_preview"
            texture={texture}
            bitmap={UNSTRETCHED_CENTER}
            layout={rectLayout(rect)}
        />
    );
};

/** `imageResult` of a chat style's `selectorPreview`. */
const ChatStyleSelectorPreview = ({ styleId, rect }: { styleId: number; rect: CollectiblesPreviewRect }) => {
    const style = useChatStyle(styleId);

    if (!style?.selectorPreviewTexture) return null;

    return (
        <ThemeImage
            name="product_preview"
            texture={style.selectorPreviewTexture}
            bitmap={UNSTRETCHED_CENTER}
            layout={rectLayout(rect)}
        />
    );
};

/** `badge_image_widget`: the badge's image from `badge.asset.url`, zoomed and centred. */
const BadgePreview = ({ badgeCode, slot }: { badgeCode: string; slot: NonNullable<CollectiblesPreviewSlots['badge']> }) => {
    const badgeUrl = useConfigValue<string>('badge.asset.url') ?? '';
    const texture = useTextureFromUrl(badgeCode.length ? badgeUrl.replace('%badgename%', badgeCode) : undefined);

    if (!texture) return null;

    return (
        <ThemeImage
            name="badge_image_widget"
            texture={texture}
            bitmap={{ ...UNSTRETCHED_CENTER, zoomX: slot.zoom, zoomY: slot.zoom }}
            layout={rectLayout(slot)}
        />
    );
};

/** `pet_image_widget`: `PetImageWidget.refreshBitmap`'s zoom, halved when it overflows and `shrink_on_overflow` is on. */
const PetPreview = ({ figure, slot }: { figure: string; slot: NonNullable<CollectiblesPreviewSlots['pet']> }) => {
    const texture = useCollectiblePetTexture(figure, slot.direction);

    if (!texture) return null;

    const zoom = (slot.shrinkOnOverflow && (((texture.width * slot.zoom) > slot.width) || ((texture.height * slot.zoom) > slot.height))) ? (slot.zoom * 0.5) : slot.zoom;

    return (
        <ThemeImage
            name="pet_image_widget"
            texture={texture}
            bitmap={{ ...UNSTRETCHED_CENTER, zoomX: zoom, zoomY: zoom }}
            layout={rectLayout(slot)}
        />
    );
};

/** `avatar_image_widget`: `AvatarImageWidget.refresh` - the full, uncropped large image facing direction 2, over its box. */
const AvatarPreview = ({ figure, gender, rect }: { figure: string; gender: string; rect: CollectiblesPreviewRect }) => {
    const { texture } = useAvatarImageTexture(figure, gender as AvatarGenderType, { direction: 2 });

    if (!texture) return null;

    return (
        <ThemeImage
            name="avatar_image_widget"
            texture={texture}
            bitmap={{}}
            layout={rectLayout(rect)}
        />
    );
};

/** `EffectPreviewer.update`: the user's figure wearing the effect in the widget's room previewer. */
const EffectPreview = ({ figure, gender, effectId, slot }: { figure: string; gender: string; effectId: number; slot: NonNullable<CollectiblesPreviewSlots['effect']> }) => (
    <Region
        name="effect_image_widget"
        layout={rectLayout(slot)}
    >
        <RoomPreviewer
            key={`${figure}:${effectId}`}
            roomId={slot.roomId}
            onReady={(api) => {
                api.addAvatar(figure, effectId, gender);
                api.rotateAvatar(false);
                api.rotateAvatar(false);
            }}
        />
    </Region>
);

export interface CollectiblesProductPreviewProps {
    preview: CollectiblePreview;
    slots: CollectiblesPreviewSlots;
}

export const CollectiblesProductPreview = ({ preview, slots }: CollectiblesProductPreviewProps) => {
    switch (preview.kind) {
        case 'placeholder':
            if (!slots.placeholder) return null;

            return (
                <ThemeImage
                    name="placeholder_image"
                    src={slots.placeholder.src}
                    bitmap={slots.placeholder.centered ? UNSTRETCHED_CENTER : { stretchedX: false, stretchedY: false }}
                    layout={rectLayout(slots.placeholder)}
                />
            );
        case 'unknown':
            if (!slots.unknown) return null;

            return (
                <ThemeImage
                    name="unknown_image"
                    src={slots.unknown.src}
                    bitmap={slots.unknown.stretched ? {} : UNSTRETCHED_CENTER}
                    layout={rectLayout(slots.unknown)}
                />
            );
        case 'furni':
            if (!slots.productPreview) return null;

            return (
                <FurniPreview
                    key={`${preview.className}:${preview.icon}`}
                    preview={preview}
                    rect={slots.productPreview}
                />
            );
        case 'effect_icon':
            if (!slots.productPreview) return null;

            return (
                <ThemeImage
                    name="product_preview"
                    src={LayoutImage(`effect-icons/fx_icon_${preview.effectId}.png`)}
                    bitmap={UNSTRETCHED_CENTER}
                    layout={rectLayout(slots.productPreview)}
                />
            );
        case 'chat_style_selector':
            if (!slots.productPreview) return null;

            return (
                <ChatStyleSelectorPreview
                    styleId={preview.styleId}
                    rect={slots.productPreview}
                />
            );
        case 'chat_style_bubble':
            if (!slots.productPreview) return null;

            return (
                <CollectiblesChatBubblePreview
                    styleId={preview.styleId}
                    userName={preview.userName}
                    layout={rectLayout(slots.productPreview) as BoxLayout & { width: number; height: number }}
                />
            );
        case 'badge':
            if (!slots.badge) return null;

            return (
                <BadgePreview
                    badgeCode={preview.badgeCode}
                    slot={slots.badge}
                />
            );
        case 'pet':
            if (!slots.pet) return null;

            return (
                <PetPreview
                    figure={preview.figure}
                    slot={slots.pet}
                />
            );
        case 'avatar':
            if (!slots.avatar) return null;

            return (
                <AvatarPreview
                    figure={preview.figure}
                    gender={preview.gender}
                    rect={slots.avatar}
                />
            );
        case 'effect':
            if (!slots.effect) return null;

            return (
                <EffectPreview
                    figure={preview.figure}
                    gender={preview.gender}
                    effectId={preview.effectId}
                    slot={slots.effect}
                />
            );
        default:
            return null;
    }
};
