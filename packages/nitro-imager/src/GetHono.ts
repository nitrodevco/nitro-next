import { AvatarActionStateType, AvatarExpressionStates, AvatarGenderType, AvatarGestureStates, AvatarPostureStates, AvatarScaleType, AvatarSetType } from "@nitrodevco/nitro-api";
import { GetAvatarRenderManager } from "@nitrodevco/nitro-renderer";
import { Hono } from "hono";

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

    if (effectId !== undefined && effectId > 0) avatar.appendAction(AvatarActionStateType.Effect, effectId);

    if (frameNumber > 0) avatar.updateAnimationByFrames(frameNumber);

    let buffer = await avatar.getCroppedBase64Async(setType, false, 1);

    if (!buffer) return c.json({ error: '' }, 400);

    buffer = buffer.includes(',') ? buffer.split(',')[1] : buffer;

    c.header('Content-Type', `image/png`);

    return c.body(Buffer.from(buffer, 'base64'));
});

export const GetHono = () => hono;