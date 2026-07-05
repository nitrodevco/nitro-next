import type { AvatarFigurePartType, AvatarPartSetType, IActionDefinition, IAssetAvatarPartSetItem, IAssetAvatarPartSets, IFigureSetData } from '@nitrodevco/nitro-api';

import type { ActionDefinition } from '../actions';
import { ActivePartSet, PartDefinition } from './parts';

export class PartSetsData implements IFigureSetData {
    private _parts: Map<string, PartDefinition> = new Map();
    private _activePartSets: Map<AvatarPartSetType, ActivePartSet> = new Map();

    public parse(data: IAssetAvatarPartSets): boolean {
        if (data.partSet && (data.partSet.length > 0)) {
            for (const part of data.partSet) {
                if (!part) continue;

                this._parts.set(part.setType, new PartDefinition(part));
            }
        }

        if (data.activePartSets && (data.activePartSets.length > 0)) {
            for (const activePart of data.activePartSets) {
                if (!activePart) continue;

                this._activePartSets.set(activePart.id, new ActivePartSet(activePart));
            }
        }

        return true;
    }

    public appendJSON(data: IAssetAvatarPartSets): boolean {
        if (data.partSet && (data.partSet.length > 0)) {
            for (const part of data.partSet) {
                if (!part) continue;

                this._parts.set(part.setType, new PartDefinition(part));
            }
        }

        if (data.activePartSets && (data.activePartSets.length > 0)) {
            for (const activePart of data.activePartSets) {
                if (!activePart) continue;

                this._activePartSets.set(activePart.id, new ActivePartSet(activePart));
            }
        }

        return false;
    }

    public getActiveParts(definition: IActionDefinition): AvatarFigurePartType[] {
        if (!definition.activePartSet) return [];

        return this._activePartSets.get(definition.activePartSet)?.parts ?? [];
    }

    public getPartDefinition(part: string): PartDefinition | undefined {
        return this._parts.get(part);
    }

    public addPartDefinition(item: IAssetAvatarPartSetItem): PartDefinition {
        let existing = this._parts.get(item.setType);

        if (!existing) {
            existing = new PartDefinition(item);

            this._parts.set(item.setType, existing);
        }

        return existing;
    }

    public getActivePartSet(action: ActionDefinition): ActivePartSet | undefined {
        if (!action.activePartSet) return undefined;

        return this._activePartSets.get(action.activePartSet);
    }

    public get parts(): Map<string, PartDefinition> {
        return this._parts;
    }

    public get activePartSets(): Map<AvatarPartSetType, ActivePartSet> {
        return this._activePartSets;
    }
}
