import { AvatarActionStateType, AvatarExpressionStates, AvatarGenderType, AvatarGeometryType, AvatarGestureStates, AvatarPostureStates, AvatarScaleType, AvatarSetType, IAvatarImage, RoomGeometryScaleType } from "@nitrodevco/nitro-api";
import { GetAvatarRenderManager, GetRenderer } from "@nitrodevco/nitro-renderer";
import { Hono } from "hono";
import { Container, Point, Sprite, Texture } from "pixi.js";

import { ParseEnum } from "./ParseEnum";
import { ParseIntInRange } from "./ParseIntInRange";

const hono = new Hono();

hono.get('/avatar', async (c) => {
    const query = c.req.query();
    const figure = query.figure ?? 'hd-99999-99999';
    const gender = query.gender as AvatarGenderType ?? AvatarGenderType.Male;
    const avatar = await GetAvatarRenderManager().createAvatarImageAsync(figure, AvatarScaleType.Large, gender);

    if (!avatar) return c.json({ error: '' }, 400);

    const setType = query.headOnly !== undefined ? AvatarSetType.Head : AvatarSetType.Full;
    const direction = ParseIntInRange(query.direction, 0, 7, 2);
    const headDirection = ParseIntInRange(query.headDirection, 0, 7, direction);
    const danceId = query.danceId !== undefined ? ParseIntInRange(query.danceId, 0, 4, 0) : undefined;
    const effectId = query.effectId !== undefined ? Number(query.effectId) || undefined : undefined;
    const frameNumber = query.frameNumber !== undefined ? Number(query.frameNumber) : 0;
    const animate = query.animate !== undefined ? true : false;

    avatar.setDirection(AvatarSetType.Full, direction);
    avatar.setDirection(AvatarSetType.Head, headDirection);
    avatar.initActionAppends();

    if (query.posture !== undefined) {
        let posture: AvatarActionStateType | undefined = query.posture as AvatarActionStateType;

        if (posture as string === 'wlk') posture = AvatarActionStateType.Walk;

        posture = ParseEnum(posture, AvatarActionStateType, undefined);

        if (posture && AvatarPostureStates.has(posture)) avatar.appendAction(AvatarActionStateType.Posture, posture);
    }

    if (query.expression !== undefined) {
        let expression: AvatarActionStateType | undefined = query.expression as AvatarActionStateType;

        if (expression as string === 'wav') expression = AvatarActionStateType.Wave;

        expression = ParseEnum(expression, AvatarActionStateType, undefined);

        if (expression && AvatarExpressionStates.has(expression)) avatar.appendAction(expression);
    }

    if (query.gesture !== undefined) {
        if (query.gesture === 'spk') {
            avatar.appendAction(AvatarActionStateType.Talk);
        } else if (query.gesture === 'eyb') {
            avatar.appendAction(AvatarActionStateType.Sleep);
        } else {
            const gesture = ParseEnum(query.gesture, AvatarActionStateType, undefined);

            if (gesture && AvatarGestureStates.has(gesture)) avatar.appendAction(AvatarActionStateType.Gesture, gesture);
        }
    }

    if (danceId !== undefined && danceId > 0) avatar.appendAction(AvatarActionStateType.Dance, danceId);

    if (effectId !== undefined && effectId > 0) {
        await GetAvatarRenderManager().downloadAvatarEffectAsync(effectId);

        avatar.appendAction(AvatarActionStateType.Effect, effectId);
    }

    avatar.endActionAppends();

    let totalFrames: number = 0;

    if (!animate) {
        if (frameNumber > 0) avatar.updateAnimationByFrames(frameNumber);

        totalFrames = 1;
    } else {
        totalFrames = (avatar.getTotalFrameCount() * 2) || 1;
    }

    const avatarCanvas = GetAvatarRenderManager().structure.getCanvas(AvatarScaleType.Large, avatar.mainAction.definition?.geometryType ?? AvatarGeometryType.Vertical);

    if (!avatarCanvas) return c.json({ error: '' }, 400);

    const container = new Container();
    const sprite = new Sprite(Texture.EMPTY);

    sprite.width = avatarCanvas.width;
    sprite.height = avatarCanvas.height;

    container.addChild(sprite);

    for (let i = 0; i < totalFrames; i++) {
        if (totalFrames && (i > 0)) avatar.updateAnimationByFrames(1);

        const texture = avatar.getImage(setType, false, 1);

        if (!texture) continue;

        const avatarSprite = new Sprite(texture);
        const avatarOffset = new Point();
        const canvasOffset = new Point();

        canvasOffset.x = ((sprite.width - texture.width) / 2);
        canvasOffset.y = ((sprite.height - texture.height) / 2);

        for (const sprite of avatar.getSprites()) {
            if (sprite.id !== 'avatar') continue;

            const layerData = avatar.getLayerData(sprite);

            avatarOffset.x = sprite.getDirectionOffsetX(direction);
            avatarOffset.y = sprite.getDirectionOffsetY(direction);

            if (!layerData) continue;

            avatarOffset.x += layerData.dx;
            avatarOffset.y += layerData.dy;
        }

        avatarSprite.x = avatarOffset.x;
        avatarSprite.y = avatarOffset.y;

        const sizeOffset = new Point(((texture.width - RoomGeometryScaleType.ZoomedIn) / 2), (texture.height - (RoomGeometryScaleType.ZoomedIn / 4)));
        const canvasWithOffset = new Point(canvasOffset.x + sizeOffset.x, canvasOffset.y + sizeOffset.y);

        //ProcessAvatarSprites(container, avatar, avatarOffset, canvasWithOffset, false);

        container.addChild(avatarSprite);

        //ProcessAvatarSprites(container, avatar, avatarOffset, canvasWithOffset, true);
    }

    let buffer = await GetRenderer().extract.base64(container);

    buffer = buffer.includes(',') ? buffer.split(',')[1] : buffer;

    container.destroy();
    avatar.dispose();

    c.header('Content-Type', `image/png`);

    return c.body(Buffer.from(buffer, 'base64'));
});

const ProcessAvatarSprites = (container: Container, avatar: IAvatarImage, avatarOffset: Point, canvasOffset: Point, frontSprites: boolean = true) => {
    for (const sprite of avatar.getSprites()) {
        if (sprite.id === 'avatar') continue;

        const layerData = avatar.getLayerData(sprite);
        const avatarDirection = avatar.getDirection();

        let offsetX = sprite.getDirectionOffsetX(avatarDirection);
        let offsetY = sprite.getDirectionOffsetY(avatarDirection);
        const offsetZ = sprite.getDirectionOffsetZ(avatarDirection);
        let direction = sprite.hasDirections ? avatarDirection : 0;
        let frame = 0;

        if (!frontSprites) {
            if (offsetZ >= 0) continue;
        }
        else if (offsetZ < 0) continue;

        if (layerData) {
            frame = layerData.animationFrame;
            offsetX = (offsetX + layerData.dx);
            offsetY = (offsetY + layerData.dy);
            direction = (direction + layerData.dd);
        }

        if (direction < 0) direction = (direction + 8);

        if (direction > 7) direction = (direction - 8);

        const assetName = `${avatar.getScale()}_${sprite.member}_${direction}_${frame}`;
        const asset = avatar.getAsset(assetName);

        if (!asset?.texture) continue;

        const addonSprite = new Sprite(asset.texture);

        addonSprite.x = (asset.offsetX - RoomGeometryScaleType.ZoomedIn / 2 + offsetX);
        addonSprite.y = (asset.offsetY + offsetY);

        // if(sprite.ink === 33) ctx.globalCompositeOperation = 'lighter';

        container.addChild(addonSprite);
    }
}

export const GetHono = () => hono;