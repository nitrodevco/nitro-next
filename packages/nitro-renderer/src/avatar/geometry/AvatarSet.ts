import type { AvatarBodyPartType, AvatarSetType, IAssetAvatarSet } from "@nitrodevco/nitro-api";

export class AvatarSet {
    private readonly _id: AvatarSetType;
    private readonly _isMain: boolean;
    private readonly _avatarSets: Map<AvatarSetType, AvatarSet> = new Map();
    private readonly _bodyParts: AvatarBodyPartType[] = [];
    private readonly _allBodyParts: AvatarBodyPartType[] = [];

    constructor(set: IAssetAvatarSet) {
        this._id = set.id;
        this._isMain = set.main ?? false;

        if (set.avatarSets?.length) for (const avatarSet of set.avatarSets) this._avatarSets.set(avatarSet.id, new AvatarSet(avatarSet));

        if (set.bodyParts?.length) for (const bodyPart of set.bodyParts) this._bodyParts.push(bodyPart.id);

        let bodyParts = [...this._bodyParts];

        for (const avatarSet of this._avatarSets.values()) {
            if (!avatarSet) continue;

            bodyParts = bodyParts.concat(avatarSet.getBodyParts());
        }

        this._allBodyParts = bodyParts;
    }

    public findAvatarSet(setType: AvatarSetType): AvatarSet | undefined {
        if (setType === this._id) return this;

        for (const avatarSet of this._avatarSets.values()) {
            if (!avatarSet) continue;

            const found = avatarSet.findAvatarSet(setType);

            if (found !== undefined) return found;
        }

        return undefined;
    }

    public getBodyParts(): AvatarBodyPartType[] {
        return [...this._allBodyParts];
    }

    public get id(): AvatarSetType {
        return this._id;
    }

    public get isMain(): boolean {
        if (this._isMain) return true;

        for (const avatarSet of this._avatarSets.values()) {
            if (avatarSet?.isMain) return true;
        }

        return false;
    }
}