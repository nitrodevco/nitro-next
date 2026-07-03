import type { IAssetAvatarSet } from "@nitrodevco/nitro-api";

export class AvatarSet {
    private readonly _id: string;
    private readonly _isMain: boolean;
    private readonly _avatarSets: Map<string, AvatarSet>;
    private readonly _bodyParts: string[];
    private readonly _allBodyParts: string[];

    constructor(set: IAssetAvatarSet) {
        this._id = set.id;
        this._isMain = set.main ?? false;
        this._avatarSets = new Map();
        this._bodyParts = [];
        this._allBodyParts = [];

        if (set.avatarSets?.length) {
            for (const avatarSet of set.avatarSets) {
                if (!avatarSet) continue;

                const childSet = new AvatarSet(avatarSet);
                this._avatarSets.set(childSet.id, childSet);
            }
        }

        if (set.bodyParts?.length) {
            for (const bodyPart of set.bodyParts) {
                if (!bodyPart) continue;

                this._bodyParts.push(bodyPart.id);
            }
        }

        let bodyParts = [...this._bodyParts];

        for (const avatarSet of this._avatarSets.values()) {
            if (!avatarSet) continue;

            bodyParts = bodyParts.concat(avatarSet.getBodyParts());
        }

        this._allBodyParts = bodyParts;
    }

    public findAvatarSet(id: string): AvatarSet | undefined {
        if (id === this._id) return this;

        for (const avatarSet of this._avatarSets.values()) {
            if (!avatarSet) continue;

            const found = avatarSet.findAvatarSet(id);

            if (found !== undefined) return found;
        }

        return undefined;
    }

    public getBodyParts(): string[] {
        return [...this._allBodyParts];
    }

    public get id(): string {
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