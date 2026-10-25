/**
 * What the preview host takes in a message: plain JSON from another page, read field by field into
 * the shape the packet's parser gives the client, so a draft can never hand a view what the
 * server could not have sent. Not a Flash port.
 */
import type { IRewardTrackData, IRewardTrackPrizeData, IRewardTrackTaskData, IRewardTrackTaskLevelData, RewardTracksMessageType } from '@nitrodevco/nitro-packets';

type Json = Record<string, unknown>;

const isObject = (value: unknown): value is Json => (typeof value === 'object') && (value !== null) && !Array.isArray(value);

const str = (value: unknown) => ((typeof value === 'string') ? value : (typeof value === 'number') ? String(value) : '');

/** A whole number, as the packet's `readInt` gives it. */
const int = (value: unknown) => ((typeof value === 'number') && Number.isFinite(value) ? Math.trunc(value) : 0);

const num = (value: unknown) => ((typeof value === 'number') && Number.isFinite(value) ? value : 0);

const bool = (value: unknown) => (value === true);

const list = <T>(value: unknown, read: (item: Json) => T): T[] => (Array.isArray(value) ? value.filter(isObject).map(read) : []);

const toLevel = (level: Json): IRewardTrackTaskLevelData => ({ requiredCount: int(level.requiredCount), pointsReward: int(level.pointsReward), premium: bool(level.premium) });

const toTask = (task: Json): IRewardTrackTaskData => ({
    id: str(task.id),
    actionType: str(task.actionType),
    parameter: str(task.parameter),
    progressCount: int(task.progressCount),
    premium: bool(task.premium),
    levels: list(task.levels, toLevel),
});

const toPrize = (prize: Json): IRewardTrackPrizeData => ({
    id: str(prize.id),
    requiredPoints: int(prize.requiredPoints),
    productItemTypeId: int(prize.productItemTypeId),
    rewardTypeId: str(prize.rewardTypeId),
    extraParams: str(prize.extraParams),
    rewardAmount: int(prize.rewardAmount),
    premium: bool(prize.premium),
    available: bool(prize.available),
    claimed: bool(prize.claimed),
});

const toTrack = (track: Json): IRewardTrackData => {
    const hasPremiumConfig = bool(track.hasPremiumConfig);

    return {
        id: str(track.id),
        theme: str(track.theme),
        points: int(track.points),
        hasPremiumConfig,
        // `RewardTrackDataParser`: the premium configuration only comes with the flag.
        taskPointsBoost: hasPremiumConfig ? num(track.taskPointsBoost) : 0,
        instantPoints: hasPremiumConfig ? int(track.instantPoints) : 0,
        costDiamonds: hasPremiumConfig ? int(track.costDiamonds) : 0,
        costCredits: hasPremiumConfig ? int(track.costCredits) : 0,
        premium: bool(track.premium),
        complete: bool(track.complete),
        premiumComplete: bool(track.premiumComplete),
        tasks: list(track.tasks, toTask),
        prizes: list(track.prizes, toPrize),
    };
};

/** A `RewardTracksMessage` as JSON, or undefined when it is not one. */
export const toRewardTracksMessage = (value: unknown): RewardTracksMessageType | undefined => {
    if (!isObject(value) || !Array.isArray(value.tracks)) return undefined;

    return { disabled: bool(value.disabled), tracks: list(value.tracks, toTrack), reload: bool(value.reload) };
};
