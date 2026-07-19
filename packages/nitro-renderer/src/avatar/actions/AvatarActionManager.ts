import type { AvatarScaleType, IActiveActionData, IAssetAvatarActionData, IAssetAvatarActionOffset } from '@nitrodevco/nitro-api';

import { ActionDefinition } from './ActionDefinition';

export class AvatarActionManager {
    private _actions: Map<string, ActionDefinition> = new Map();
    private _defaultAction: ActionDefinition | undefined = undefined;

    public updateActions(data: IAssetAvatarActionData): void {
        if (data.actions) {
            for (const action of data.actions) {
                if (!action || !action.state) continue;

                const definition = new ActionDefinition(action);

                this._actions.set(definition.state, definition);
            }
        }

        if (data.actionOffsets) this.parseActionOffsets(data.actionOffsets);
    }

    private parseActionOffsets(data: IAssetAvatarActionOffset[]): void {
        if (!data || !data.length) return;

        for (const offset of data) {
            const action = this._actions.get(offset.action);

            if (!action) continue;

            for (const canvasOffset of offset.offsets) {
                const x = canvasOffset.x ?? 0;
                const y = canvasOffset.y ?? 0;
                const z = canvasOffset.z ?? 0;

                action.setOffsets(canvasOffset.size, canvasOffset.direction, [x, y, z]);
            }
        }
    }

    public getActionDefinition(id: string): ActionDefinition | undefined {
        for (const action of this._actions.values()) {
            if (!action || (action.id !== id as unknown)) continue;

            return action;
        }

        return undefined;
    }

    public getActionDefinitionWithState(state: string): ActionDefinition | undefined {
        return this._actions.get(state);
    }

    public getDefaultAction(): ActionDefinition | undefined {
        if (this._defaultAction) return this._defaultAction;

        for (const action of this._actions.values()) {
            if (!action || !action.isDefault) continue;

            this._defaultAction = action;

            return action;
        }

        return undefined;
    }

    public getCanvasOffsets(actions: IActiveActionData[], size: AvatarScaleType, direction: number): number[] {
        let canvasOffsets: number[] = [];

        for (const activeAction of actions) {
            if (!activeAction || !activeAction.type) continue;

            const action = this._actions.get(activeAction.type);
            const offsets = action && action.getOffsets(size, direction);

            if (offsets) canvasOffsets = offsets;
        }

        return canvasOffsets;
    }

    public sortActions(actions: IActiveActionData[]): IActiveActionData[] {
        actions = this.filterActions(actions);

        const validatedActions: IActiveActionData[] = [];

        for (const action of actions) {
            if (!action) continue;

            const definition = this._actions.get(action.type);

            if (!definition) continue;

            action.definition = definition;

            validatedActions.push(action);
        }

        validatedActions.sort(void this.sortByPrecedence);

        return validatedActions;
    }

    private filterActions(actions: IActiveActionData[]): IActiveActionData[] {
        let preventions: string[] = [];
        const activeActions: IActiveActionData[] = [];

        for (const action of actions) {
            if (!action) continue;

            const localAction = this._actions.get(action.type);

            if (localAction) preventions = preventions.concat(localAction.getPrevents(action.actionParameter));
        }

        for (const action of actions) {
            if (!action) continue;

            let actionType = action.type as string;

            if (action.type as string === 'fx') actionType = (actionType + ('.' + action.actionParameter));

            if (preventions.indexOf(actionType) >= 0) continue;

            activeActions.push(action);
        }

        return activeActions;
    }

    private sortByPrecedence(a: IActiveActionData, b: IActiveActionData): number {
        if (!a || !a.definition || !b || !b.definition) return 0;

        if (a.definition.precedence < b.definition.precedence) return 1;

        if (a.definition.precedence > b.definition.precedence) return -1;

        return 0;
    }
}
